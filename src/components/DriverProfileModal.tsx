import React from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Car,
  Users,
  Briefcase,
  MapPin,
  Globe,
  Clock,
  ShieldCheck,
  Check,
  MessageCircle,
  Share2,
  Calendar,
} from 'lucide-react';
import { Driver, Currency } from '../types';
import { formatCurrency } from '../utils/booking';

interface DriverProfileModalProps {
  driver: Driver | null;
  currency: Currency;
  onClose: () => void;
  onOpenBooking: (driver: Driver) => void;
}

export const DriverProfileModal: React.FC<DriverProfileModalProps> = ({
  driver,
  currency,
  onClose,
  onOpenBooking,
}) => {
  if (!driver) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link to driver profile copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto border border-gray-150">
        {/* Modal Header Bar with Close & Share */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-105"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-full shadow-md backdrop-blur-md transition-all hover:scale-105"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto grow">
          {/* Cover & Profile Banner */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-r from-emerald-800 to-teal-900 overflow-hidden">
            {driver.coverImage && (
              <img
                src={driver.coverImage}
                alt={driver.name}
                className="w-full h-full object-cover opacity-60"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div className="flex items-end gap-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-white shadow-xl bg-white shrink-0">
                  <img
                    src={driver.profileImage}
                    alt={driver.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white pb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-[#E53E5C] text-white px-2 py-0.5 rounded-md font-semibold">
                      {driver.community}
                    </span>
                    {driver.isVerified && (
                      <span className="flex items-center gap-1 text-[11px] bg-white/20 backdrop-blur-md text-emerald-300 px-2 py-0.5 rounded-md font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Freelance
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                    {driver.name}
                  </h2>
                </div>
              </div>

              {/* Rating on desktop */}
              <div className="hidden sm:flex flex-col items-end text-white pb-1">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-xl">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-extrabold text-sm">{driver.rating}</span>
                  <span className="text-xs text-gray-200">({driver.reviewsCount} reviews)</span>
                </div>
                <span className="text-xs text-gray-300 mt-1">
                  {driver.yearsExperience} years on the road
                </span>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Tagline Alert */}
            <div className="bg-[#FDF2F4] border border-[#FAD7DD] rounded-2xl p-4 text-[#8A1A2F] text-sm leading-relaxed flex items-start gap-3">
              <span className="text-xl">🌴</span>
              <div>
                <p className="font-semibold text-xs uppercase tracking-wider text-[#E53E5C] mb-0.5">
                  Driver Note
                </p>
                <p className="font-medium text-gray-800">{driver.tagline}</p>
              </div>
            </div>

            {/* Quick Spec Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2.5">
                <Car className="w-4 h-4 text-[#E53E5C]" />
                <div>
                  <span className="text-gray-400 block text-[10px]">VEHICLE</span>
                  <span className="font-bold text-gray-800">{driver.vehicleType}</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#E53E5C]" />
                <div>
                  <span className="text-gray-400 block text-[10px]">CAPACITY</span>
                  <span className="font-bold text-gray-800">{driver.passengerCapacity} Passengers</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-[#E53E5C]" />
                <div>
                  <span className="text-gray-400 block text-[10px]">LUGGAGE</span>
                  <span className="font-bold text-gray-800">{driver.luggageCapacity} Large Bags</span>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#E53E5C]" />
                <div>
                  <span className="text-gray-400 block text-[10px]">LANGUAGES</span>
                  <span className="font-bold text-gray-800">{driver.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* About Driver */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5">
                About {driver.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {driver.bio}
              </p>
            </div>

            {/* Vehicle & Gallery */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Vehicle Details & Fleet
                </h3>
                <span className="text-xs text-gray-500 font-medium">
                  {driver.vehicleModel}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {driver.vehicleGallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-100"
                  >
                    <img
                      src={img}
                      alt={`${driver.name} vehicle ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#E53E5C]" />
                <span>Primary Service Areas in Bali</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {driver.serviceAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Available Services & Pricing */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#E53E5C]" />
                <span>Available Services & Standard Pricing</span>
              </h3>
              <div className="space-y-3">
                {driver.services.map((svc, idx) => {
                  const sPrice = currency === 'IDR' ? svc.priceIdr : svc.priceUsd;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-150 hover:border-gray-300 hover:bg-gray-50/50 transition-all gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900 text-sm">
                            {svc.name}
                          </h4>
                          <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">
                            {svc.duration}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {svc.description}
                        </p>
                      </div>
                      <div className="sm:text-right shrink-0">
                        <span className="text-base font-extrabold text-gray-900">
                          {formatCurrency(sPrice, currency)}
                        </span>
                        <span className="text-xs text-gray-400 block">
                          all-inclusive rate
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Always Included</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  {driver.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>Favorite Tour Itineraries</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-600">
                  {driver.tourHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E53E5C] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="p-4 sm:px-8 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[11px] uppercase font-bold text-gray-400 block tracking-wider">
              Standard Daily Tour
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                {formatCurrency(
                  currency === 'IDR' ? driver.dailyPriceIdr : driver.dailyPriceUsd,
                  currency
                )}
              </span>
              <span className="text-xs text-gray-500">/ 10 hours</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${driver.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                `Hello ${driver.name}! I found your profile on BaliFinder and would like to ask about your driving services.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-400 text-gray-800 font-bold px-4 py-3 rounded-2xl text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Quick WhatsApp</span>
            </a>

            {/* Open Full Booking Form */}
            <button
              onClick={() => {
                onClose();
                onOpenBooking(driver);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold px-6 py-3 rounded-2xl text-sm transition-all shadow-md active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book This Driver</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
