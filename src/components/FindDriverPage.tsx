import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ChevronDown,
  X,
  SlidersHorizontal,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Driver, Currency } from '../types';
import { COMMUNITIES, LANGUAGES, SERVICE_AREAS, SERVICE_TYPES } from '../data/drivers';
import { filterDrivers } from '../utils/booking';
import { DriverCard } from './DriverCard';

interface FindDriverPageProps {
  drivers: Driver[];
  currency: Currency;
  savedDriverIds: Set<string>;
  onToggleSaveDriver: (id: string, e: React.MouseEvent) => void;
  onSelectDriver: (driver: Driver) => void;
  onQuickBook: (driver: Driver, e: React.MouseEvent) => void;
  selectedCommunity: string;
  onSelectCommunity: (community: string) => void;
}

export const FindDriverPage: React.FC<FindDriverPageProps> = ({
  drivers,
  currency,
  savedDriverIds,
  onToggleSaveDriver,
  onSelectDriver,
  onQuickBook,
  selectedCommunity,
  onSelectCommunity,
}) => {
  // Search & filter states matching screenshot
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceArea, setServiceArea] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  // Filtered driver list
  const filteredDrivers = useMemo(() => {
    return filterDrivers(drivers, {
      community: selectedCommunity === 'all' ? undefined : selectedCommunity,
      searchQuery,
      serviceArea,
      language: selectedLanguage,
      serviceType: selectedService,
    });
  }, [drivers, selectedCommunity, searchQuery, serviceArea, selectedLanguage, selectedService]);

  const hasActiveFilters =
    selectedCommunity !== 'all' ||
    searchQuery.trim() !== '' ||
    serviceArea.trim() !== '' ||
    selectedLanguage !== 'all' ||
    selectedService !== 'all';

  const resetFilters = () => {
    onSelectCommunity('all');
    setSearchQuery('');
    setServiceArea('');
    setSelectedLanguage('all');
    setSelectedService('all');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section matching screenshot */}
      <div>
        <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
          FIND YOUR TRAVEL COMPANION
        </p>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Meet the drivers
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Explore profiles or narrow down your search.
          </p>
        </div>
      </div>

      {/* 2. Community Shortcuts matching screenshot */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
        <span className="text-xs sm:text-sm font-semibold text-gray-700 mr-1.5 shrink-0">
          Driver communities
        </span>

        {/* All Communities reset chip */}
        <button
          onClick={() => onSelectCommunity('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            selectedCommunity === 'all'
              ? 'bg-[#E53E5C] text-white border-[#E53E5C] shadow-xs'
              : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
          }`}
        >
          All
        </button>

        {/* Community Chips with ↗ arrow */}
        {COMMUNITIES.map((c) => {
          const isSelected = selectedCommunity.toLowerCase() === c.id.toLowerCase();
          return (
            <button
              key={c.id}
              onClick={() => onSelectCommunity(isSelected ? 'all' : c.id)}
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs sm:text-sm transition-all border ${
                isSelected
                  ? 'bg-[#FDF2F4] text-[#E53E5C] border-[#E53E5C] font-bold shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 font-medium'
              }`}
            >
              <span>{c.label}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </button>
          );
        })}
      </div>

      {/* 3. Search and Filter Bar matching screenshot 4 input boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white p-3.5 sm:p-4 rounded-3xl border border-gray-150 shadow-xs">
        {/* Input 1: Driver name */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-700 mb-1.5">
            Driver name
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Who are you looking for?"
              className="w-full bg-[#F4F5F7] hover:bg-[#ebeef2] focus:bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-gray-300 focus:outline-hidden transition-all pr-8"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Input 2: Service area */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-700 mb-1.5">
            Service area
          </label>
          <div className="relative">
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="Type a location..."
              className="w-full bg-[#F4F5F7] hover:bg-[#ebeef2] focus:bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-gray-300 focus:outline-hidden transition-all pr-8"
            />
            {serviceArea ? (
              <button
                onClick={() => setServiceArea('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <MapPin className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Input 3: Language */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-700 mb-1.5">
            Language
          </label>
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full appearance-none bg-[#F4F5F7] hover:bg-[#ebeef2] focus:bg-white text-xs sm:text-sm text-gray-800 px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-gray-300 focus:outline-hidden transition-all pr-8 cursor-pointer"
            >
              <option value="all">All languages</option>
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Input 4: Service */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-gray-700 mb-1.5">
            Service
          </label>
          <div className="relative">
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full appearance-none bg-[#F4F5F7] hover:bg-[#ebeef2] focus:bg-white text-xs sm:text-sm text-gray-800 px-3.5 py-2.5 rounded-2xl border border-transparent focus:border-gray-300 focus:outline-hidden transition-all pr-8 cursor-pointer"
            >
              <option value="all">All services</option>
              {SERVICE_TYPES.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Drivers Count Indicator & Filter Badges */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          {filteredDrivers.length} {filteredDrivers.length === 1 ? 'driver' : 'drivers'} to explore
          {selectedCommunity !== 'all' && (
            <span className="ml-1 text-gray-800 font-bold">in {selectedCommunity}</span>
          )}
        </p>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-[#E53E5C] hover:text-[#c42845] flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* 5. Driver Listing Grid matching 4-column layout */}
      {filteredDrivers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDrivers.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              currency={currency}
              isSaved={savedDriverIds.has(driver.id)}
              onToggleSave={onToggleSaveDriver}
              onSelectDriver={onSelectDriver}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">
              No drivers match your criteria
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Try adjusting your service area or search query, or clear your filters to view all verified freelance drivers.
            </p>
          </div>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#E53E5C] hover:bg-[#c42845] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            View All Drivers
          </button>
        </div>
      )}
    </div>
  );
};
