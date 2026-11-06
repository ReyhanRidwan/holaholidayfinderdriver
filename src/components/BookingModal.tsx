import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  Calendar,
  Users,
  MapPin,
  Car,
  FileText,
  Copy,
  Check,
  ExternalLink,
  QrCode,
} from 'lucide-react';
import { Driver, BookingRequest } from '../types';
import {
  generateDriverBookingMessage,
  generateDriverWhatsAppUrl,
} from '../utils/booking';

interface BookingModalProps {
  driver: Driver | null;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ driver, onClose }) => {
  if (!driver) return null;

  // Form states
  const [fullName, setFullName] = useState('');
  const [travelDate, setTravelDate] = useState(() => {
    // Default to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [passengers, setPassengers] = useState(2);
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [serviceType, setServiceType] = useState('Full Day Tour (10 Hours)');
  const [additionalRequests, setAdditionalRequests] = useState('');

  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentBooking: BookingRequest = {
    driverName: driver.name,
    driverPhone: driver.whatsappNumber,
    fullName: fullName || 'Guest',
    travelDate: travelDate || 'To be confirmed',
    passengers,
    pickupLocation: pickupLocation || 'Bali Hotel / Villa',
    destination: destination || 'Custom Itinerary / Sightseeing',
    serviceType,
    additionalRequests,
  };

  const previewMessage = generateDriverBookingMessage(currentBooking);
  const whatsappUrl = generateDriverWhatsAppUrl(currentBooking);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!pickupLocation.trim()) {
      setErrorMsg('Please enter your pickup location');
      return;
    }

    setErrorMsg('');
    // Open driver's WhatsApp in new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(previewMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[94vh] flex flex-col my-auto border border-gray-150">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 to-[#25D366] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/20 border-2 border-white/60 shrink-0">
              <img
                src={driver.profileImage}
                alt={driver.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-100">
                Direct WhatsApp Booking
              </span>
              <h2 className="text-xl font-bold tracking-tight">
                Book {driver.name}
              </h2>
              <p className="text-xs text-emerald-100">
                Direct to driver: {driver.whatsappDisplay}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close booking form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} id="booking-form" className="space-y-4 text-xs">
            {/* Guest Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Travel Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Passengers & Service Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>Number of Passengers</span>
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                >
                  {Array.from({ length: driver.passengerCapacity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Passenger' : 'Passengers'} (Max {driver.passengerCapacity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-gray-400" />
                  <span>Service Type</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                >
                  <option value="Full Day Tour (10 Hours)">Full Day Tour (10 Hours)</option>
                  <option value="Half Day Tour (5 Hours)">Half Day Tour (5 Hours)</option>
                  <option value="Airport Pickup / Drop-off">Airport Pickup / Drop-off</option>
                  <option value="Custom Multi-day Tour">Custom Multi-day Tour</option>
                  <option value="Temple & Waterfall Sightseeing">Temple & Waterfall Sightseeing</option>
                </select>
              </div>
            </div>

            {/* Pickup & Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Pickup Location in Bali *</span>
                </label>
                <input
                  type="text"
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Maya Sanur Resort / Seminyak Villa"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Destination / Desired Route</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Ubud Waterfalls, Kintamani, or Uluwatu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
                />
              </div>
            </div>

            {/* Additional Requests */}
            <div>
              <label className="block font-bold text-gray-700 text-xs mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                <span>Special Requests (Optional)</span>
              </label>
              <textarea
                rows={2}
                value={additionalRequests}
                onChange={(e) => setAdditionalRequests(e.target.value)}
                placeholder="e.g. Baby car seat needed, large luggage, quiet driver, photography help..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 bg-gray-50/50 text-gray-900 text-sm"
              />
            </div>
          </form>

          {/* Generated WhatsApp Message Preview */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Message Preview</span>
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap bg-white/90 p-3 rounded-xl border border-emerald-100/70 leading-relaxed max-h-36 overflow-y-auto">
              {previewMessage}
            </pre>
            <p className="text-[11px] text-gray-500 mt-2">
              Clicking below will open WhatsApp directly with <span className="font-semibold text-gray-800">{driver.name}</span> with this message prefilled.
            </p>
          </div>

          {/* QR Code toggle for mobile handoff */}
          {showQr && (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-center space-y-2">
              <p className="font-bold text-xs text-gray-800">
                Scan with your phone to open WhatsApp directly:
              </p>
              <div className="inline-block p-2 bg-white rounded-xl shadow-xs border border-gray-200">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                    whatsappUrl
                  )}`}
                  alt="WhatsApp QR Code"
                  className="w-36 h-36"
                />
              </div>
              <p className="text-[11px] text-gray-500">
                Opens chat with {driver.whatsappDisplay}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:px-8 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-200/50 transition-colors"
          >
            <QrCode className="w-4 h-4 text-gray-500" />
            <span>{showQr ? 'Hide QR Code' : 'Scan on Mobile QR'}</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="booking-form"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Continue to WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
