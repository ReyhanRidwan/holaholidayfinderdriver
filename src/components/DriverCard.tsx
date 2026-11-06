import React from 'react';
import {
  Users,
  Car,
  Star,
  CheckCircle2,
  Heart,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { Driver, Currency } from '../types';
import { formatCurrency } from '../utils/booking';

interface DriverCardProps {
  driver: Driver;
  currency: Currency;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectDriver: (driver: Driver) => void;
  onQuickBook: (driver: Driver, e: React.MouseEvent) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  currency,
  isSaved,
  onToggleSave,
  onSelectDriver,
  onQuickBook,
}) => {
  const price = currency === 'IDR' ? driver.dailyPriceIdr : driver.dailyPriceUsd;

  return (
    <div
      onClick={() => onSelectDriver(driver)}
      className="group bg-white rounded-2xl border border-gray-150 hover:border-gray-300 hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col overflow-hidden text-left"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 rounded-t-2xl">
        <img
          src={driver.profileImage}
          alt={driver.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => onToggleSave(driver.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            isSaved
              ? 'bg-rose-500 text-white'
              : 'bg-black/30 hover:bg-black/50 text-white'
          }`}
          aria-label={isSaved ? 'Remove from saved' : 'Save driver'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Verified Community Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{driver.community}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-md text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-xs">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{driver.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col grow justify-between">
        <div>
          {/* Driver Title matching screenshot */}
          <h3 className="font-bold text-gray-900 text-[17px] leading-snug group-hover:text-[#E53E5C] transition-colors line-clamp-1">
            {driver.name}
          </h3>

          {/* Languages spoken */}
          <p className="text-gray-500 text-xs font-normal mt-0.5 mb-2">
            {driver.languages.join(', ')}
          </p>

          {/* Bio / Tagline Snippet matching screenshot */}
          <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed mb-3">
            {driver.tagline}
          </p>
        </div>

        {/* Vehicle & Price Footer */}
        <div className="pt-3 border-t border-gray-100 mt-auto">
          {/* Vehicle & Seats info */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2.5">
            <div className="flex items-center gap-1 text-gray-700 font-medium">
              <Car className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate max-w-[130px]">{driver.vehicleType}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span>{driver.passengerCapacity} seats</span>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase font-semibold text-gray-400 block tracking-wider">
                Starting from
              </span>
              <span className="text-sm font-extrabold text-gray-900">
                {formatCurrency(price, currency)}
                <span className="text-[11px] font-normal text-gray-500"> /day</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => onQuickBook(driver, e)}
                className="flex items-center gap-1 bg-[#25D366] hover:bg-[#20ba59] text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95"
                title="Book via WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Book</span>
              </button>

              <div className="w-7 h-7 rounded-xl bg-gray-100 group-hover:bg-[#FDF2F4] group-hover:text-[#E53E5C] text-gray-400 flex items-center justify-center transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
