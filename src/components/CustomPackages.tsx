import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Car,
  Sparkles,
  Check,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck,
  Palmtree,
  Mountain,
  Waves,
  Sun,
  Coffee,
  ShoppingBag,
  Zap,
  Trees,
  LifeBuoy,
  Utensils,
  ChevronRight,
  RefreshCw,
  Copy,
} from 'lucide-react';
import {
  DESTINATION_OPTIONS,
  EXPERIENCE_OPTIONS,
  VEHICLE_OPTIONS,
} from '../data/customTrip';
import {
  generateCustomTripMessage,
  generateCustomTripWhatsAppUrl,
  BALIFINDER_ADMIN_WHATSAPP,
} from '../utils/booking';
import { CustomTripRequest } from '../types';

export const CustomPackages: React.FC = () => {
  // Form states
  const [contactName, setContactName] = useState('');
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [pickupLocation, setPickupLocation] = useState('Seminyak / Airport');

  // Multi-select destinations
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    'Ubud',
    'Kintamani & Batur',
    'Uluwatu',
  ]);

  // Multi-select experiences
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([
    'Cultural & Temple Experiences',
    'Nature & Waterfalls',
  ]);

  // Vehicle preference
  const [selectedVehicle, setSelectedVehicle] = useState('Standard Private Car (Avanza / Ertiga)');

  // Additional options
  const [hotelPickup, setHotelPickup] = useState(true);
  const [airportTransfer, setAirportTransfer] = useState(true);
  const [tourGuide, setTourGuide] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');

  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const toggleDestination = (name: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const toggleExperience = (name: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(name) ? prev.filter((e) => e !== name) : [...prev, name]
    );
  };

  // Compile full request
  const customTrip: CustomTripRequest = {
    contactName: contactName || 'Guest Traveler',
    startDate,
    days,
    travelers,
    pickupLocation,
    destinations: selectedDestinations,
    experiences: selectedExperiences,
    vehiclePreference: selectedVehicle,
    specialRequests: [
      hotelPickup ? 'Hotel pickup included' : null,
      airportTransfer ? 'Airport transfer included' : null,
      tourGuide ? 'Licensed English tour guide requested' : null,
      specialRequests.trim() || null,
    ]
      .filter(Boolean)
      .join(', '),
    adminPhone: BALIFINDER_ADMIN_WHATSAPP,
  };

  const customTripMessage = generateCustomTripMessage(customTrip);
  const whatsappUrl = generateCustomTripWhatsAppUrl(customTrip);

  const handleSendWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(customTripMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDestinationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palmtree':
        return <Palmtree className="w-4 h-4 text-emerald-600" />;
      case 'Mountain':
        return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'Waves':
        return <Waves className="w-4 h-4 text-blue-600" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-orange-600" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-purple-600" />;
      case 'Sun':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      default:
        return <MapPin className="w-4 h-4 text-rose-500" />;
    }
  };

  const getExperienceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case 'SunMedium':
        return <Sun className="w-4 h-4 text-orange-500" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-red-500" />;
      case 'Trees':
        return <Trees className="w-4 h-4 text-emerald-600" />;
      case 'LifeBuoy':
        return <LifeBuoy className="w-4 h-4 text-blue-500" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-rose-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
          PERSONALIZED TRAVEL EXPERIENCE
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Custom Trip Builder
          </h1>
          <p className="text-sm text-gray-500">
            Build your dream itinerary and request a quotation via WhatsApp.
          </p>
        </div>
      </div>

      {/* Main Grid: Form on Left, Live Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Trip Builder Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* STEP 1: Travel Information */}
          <section className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E53E5C] font-black text-sm flex items-center justify-center">
                1
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  Travel Information
                </h2>
                <p className="text-xs text-gray-500">
                  When and with whom are you exploring Bali?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Start Date</span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#E53E5C] text-sm bg-gray-50/50"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Trip Duration: {days} {days === 1 ? 'Day' : 'Days'}</span>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5, 7, 10].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDays(d)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                        days === d
                          ? 'bg-[#E53E5C] text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>Number of Travelers</span>
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-bold text-sm text-gray-900">
                      {travelers}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTravelers(Math.min(15, travelers + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {travelers <= 4 ? 'Small private group' : 'Family / large party'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Pickup Location in Bali</span>
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder="e.g. Airport, Seminyak, or Ubud Hotel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#E53E5C] text-sm bg-gray-50/50"
                />
              </div>
            </div>
          </section>

          {/* STEP 2: Destinations (Multi-Select) */}
          <section className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E53E5C] font-black text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    Destinations to Explore
                  </h2>
                  <p className="text-xs text-gray-500">
                    Select the key Bali areas you want on your itinerary ({selectedDestinations.length} selected)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDestinations([])}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                Clear
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {DESTINATION_OPTIONS.map((dest) => {
                const isSelected = selectedDestinations.includes(dest.name);
                return (
                  <div
                    key={dest.id}
                    onClick={() => toggleDestination(dest.name)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E53E5C] bg-[#FDF2F4]/40 shadow-xs ring-1 ring-[#E53E5C]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          {getDestinationIcon(dest.icon)}
                          <span className="font-bold text-sm text-gray-900">
                            {dest.name}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#E53E5C] text-white'
                              : 'border border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 line-clamp-2">
                        {dest.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap gap-1">
                      {dest.highlights.slice(0, 2).map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded-md"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 3: Travel Experiences (Multi-Select) */}
          <section className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E53E5C] font-black text-sm flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">
                    Travel Experiences & Activities
                  </h2>
                  <p className="text-xs text-gray-500">
                    What vibes and experiences do you want to enjoy? ({selectedExperiences.length} selected)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXPERIENCE_OPTIONS.map((exp) => {
                const isSelected = selectedExperiences.includes(exp.name);
                return (
                  <div
                    key={exp.id}
                    onClick={() => toggleExperience(exp.name)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-[#E53E5C] bg-[#FDF2F4]/40 shadow-xs ring-1 ring-[#E53E5C]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div className="mt-0.5 p-2 rounded-xl bg-white border border-gray-100 shadow-2xs">
                      {getExperienceIcon(exp.icon)}
                    </div>
                    <div className="grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs sm:text-sm text-gray-900">
                          {exp.name}
                        </h3>
                        <div
                          className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ml-2 ${
                            isSelected
                              ? 'bg-[#E53E5C] text-white'
                              : 'border border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-3" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 4: Transportation Vehicle */}
          <section className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E53E5C] font-black text-sm flex items-center justify-center">
                4
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  Vehicle Preference
                </h2>
                <p className="text-xs text-gray-500">
                  Select your preferred vehicle type for the tour
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {VEHICLE_OPTIONS.map((veh) => {
                const isSelected = selectedVehicle === veh.name;
                return (
                  <div
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh.name)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#E53E5C] bg-[#FDF2F4]/40 shadow-xs ring-1 ring-[#E53E5C]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-gray-900">
                          {veh.name}
                        </span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#E53E5C] bg-[#E53E5C]'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {veh.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-600 bg-white/80 p-2 rounded-xl border border-gray-100">
                      <span className="font-semibold text-gray-800">{veh.capacity}</span>
                      <span>•</span>
                      <span>{veh.luggage}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* STEP 5: Additional Requirements */}
          <section className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-7 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-8 rounded-xl bg-[#FDF2F4] text-[#E53E5C] font-black text-sm flex items-center justify-center">
                5
              </span>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  Special Requirements & Contact
                </h2>
                <p className="text-xs text-gray-500">
                  Add specific requests for the BaliFinder admin to customize your quote
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hotelPickup}
                    onChange={(e) => setHotelPickup(e.target.checked)}
                    className="w-4 h-4 text-[#E53E5C] rounded-sm focus:ring-[#E53E5C]"
                  />
                  <span className="font-semibold text-gray-800">Hotel Pickup / Drop</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={airportTransfer}
                    onChange={(e) => setAirportTransfer(e.target.checked)}
                    className="w-4 h-4 text-[#E53E5C] rounded-sm focus:ring-[#E53E5C]"
                  />
                  <span className="font-semibold text-gray-800">Airport Transfer</span>
                </label>

                <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tourGuide}
                    onChange={(e) => setTourGuide(e.target.checked)}
                    className="w-4 h-4 text-[#E53E5C] rounded-sm focus:ring-[#E53E5C]"
                  />
                  <span className="font-semibold text-gray-800">Licensed Tour Guide</span>
                </label>
              </div>

              {/* Contact Name & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Your Name (for quotation)
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#E53E5C] text-sm bg-gray-50/50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">
                    Notes & Special Wishes
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Baby chair, vegetarian warungs, drone filming..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#E53E5C] text-sm bg-gray-50/50"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Dynamic Custom Trip Summary & WhatsApp Quotation */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-150 p-6 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#E53E5C]">
                Dynamic Itinerary
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 font-bold px-2.5 py-1 rounded-full">
                Custom Quote
              </span>
            </div>

            {/* Trip Parameters */}
            <div className="py-4 space-y-3 text-xs border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Trip Duration</span>
                <span className="font-bold text-gray-900">{days} Days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Travel Start</span>
                <span className="font-bold text-gray-900">{startDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Travelers</span>
                <span className="font-bold text-gray-900">{travelers} Guests</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Pickup</span>
                <span className="font-bold text-gray-900 truncate max-w-[160px]">
                  {pickupLocation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-bold text-gray-900 truncate max-w-[160px]">
                  {selectedVehicle.split('(')[0]}
                </span>
              </div>
            </div>

            {/* Destinations list */}
            <div className="py-3 border-b border-gray-100">
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-2">
                Selected Destinations ({selectedDestinations.length})
              </span>
              {selectedDestinations.length === 0 ? (
                <p className="text-xs text-amber-600 italic">No destinations chosen yet.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedDestinations.map((d) => (
                    <span
                      key={d}
                      className="bg-[#FDF2F4] text-[#E53E5C] text-xs font-semibold px-2.5 py-1 rounded-lg"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Experiences list */}
            <div className="py-3 border-b border-gray-100">
              <span className="text-[11px] uppercase font-bold text-gray-400 block mb-2">
                Experiences ({selectedExperiences.length})
              </span>
              {selectedExperiences.length === 0 ? (
                <p className="text-xs text-gray-400 italic">General sightseeing.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedExperiences.map((e) => (
                    <span
                      key={e}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-md"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Quotation Notice */}
            <div className="py-3">
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  BaliFinder Admin will review your customized itinerary, pair you with a top verified local freelance driver, and provide an all-inclusive quotation.
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleSendWhatsApp}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Request Custom Quotation</span>
            </button>

            {/* Secondary actions */}
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <button
                onClick={handleCopyMessage}
                className="text-gray-500 hover:text-gray-800 flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Message'}</span>
              </button>
              <span className="text-gray-300">•</span>
              <button
                onClick={() => setShowPreviewModal(true)}
                className="text-gray-500 hover:text-gray-800 font-semibold"
              >
                Preview WhatsApp Text
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center text-xs text-gray-500">
            💬 Sent directly to BaliFinder Admin at <span className="font-semibold text-gray-700">+62 811-388-9900</span>
          </div>
        </div>
      </div>

      {/* Preview Dialog Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-150">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">
                Custom Quotation Message Preview
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <pre className="text-xs font-mono text-gray-800 bg-gray-50 p-4 rounded-2xl border border-gray-200 whitespace-pre-wrap max-h-72 overflow-y-auto leading-relaxed">
              {customTripMessage}
            </pre>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={handleCopyMessage}
                className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-100"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  handleSendWhatsApp();
                }}
                className="px-5 py-2 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#20ba59] flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Open in WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
