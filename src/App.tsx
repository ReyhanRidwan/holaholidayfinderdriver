import React, { useState } from 'react';
import { MOCK_DRIVERS } from './data/drivers';
import { Driver, Currency } from './types';
import { Sidebar, NavPage } from './components/Sidebar';
import { Header } from './components/Header';
import { FindDriverPage } from './components/FindDriverPage';
import { CustomPackages } from './components/CustomPackages';
import { PlaceholderPages } from './components/PlaceholderPages';
import { DriverProfileModal } from './components/DriverProfileModal';
import { BookingModal } from './components/BookingModal';
import { AdminDriverModal } from './components/AdminDriverModal';

export default function App() {
  // Navigation & View States
  const [activePage, setActivePage] = useState<NavPage>('find-driver');
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all');
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Driver states
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [activeDriverIds, setActiveDriverIds] = useState<Set<string>>(
    () => new Set(MOCK_DRIVERS.map((d) => d.id))
  );
  const [savedDriverIds, setSavedDriverIds] = useState<Set<string>>(new Set());

  // Modals
  const [profileModalDriver, setProfileModalDriver] = useState<Driver | null>(null);
  const [bookingModalDriver, setBookingModalDriver] = useState<Driver | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Save / Bookmark driver toggle
  const handleToggleSaveDriver = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedDriverIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Quick book button on card
  const handleQuickBook = (driver: Driver, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookingModalDriver(driver);
  };

  // Admin toggle visibility
  const handleToggleDriverVisibility = (id: string) => {
    setActiveDriverIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Filter visible drivers based on admin toggle
  const visibleDrivers = drivers.filter((d) => activeDriverIds.has(d.id));

  return (
    <div className="min-h-screen bg-[#FDFDFE] text-gray-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        activePage={activePage}
        onSelectPage={(page) => {
          setActivePage(page);
          if (page === 'find-driver') {
            setSelectedCommunity('all');
          }
        }}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'IDR' ? 'USD' : 'IDR'))}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
      />

      {/* 2. Main Content Area (Offset by 240px on lg screens) */}
      <div className="lg:pl-[240px] min-h-screen flex flex-col">
        {/* Top Header */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          savedDriversCount={savedDriverIds.size}
          onNavigateToCustomPackages={() => setActivePage('tour-packages')}
        />

        {/* Dynamic Page Views */}
        <main className="grow p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'find-driver' && (
            <FindDriverPage
              drivers={visibleDrivers}
              currency={currency}
              savedDriverIds={savedDriverIds}
              onToggleSaveDriver={handleToggleSaveDriver}
              onSelectDriver={(driver) => setProfileModalDriver(driver)}
              onQuickBook={handleQuickBook}
              selectedCommunity={selectedCommunity}
              onSelectCommunity={(community) => setSelectedCommunity(community)}
            />
          )}

          {activePage === 'tour-packages' && <CustomPackages />}

          {activePage !== 'find-driver' && activePage !== 'tour-packages' && (
            <PlaceholderPages
              type={activePage}
              onFindDriverForCommunity={(community) => {
                setSelectedCommunity(community);
                setActivePage('find-driver');
              }}
              onNavigateToFindDriver={() => {
                setSelectedCommunity('all');
                setActivePage('find-driver');
              }}
              onNavigateToCustomPackages={() => setActivePage('tour-packages')}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white py-8 px-4 sm:px-8 text-xs text-gray-500 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#E53E5C] flex items-center justify-center text-white">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <span className="font-extrabold text-gray-900 text-sm">finder</span>
              <span className="text-gray-300">|</span>
              <span>Bali Freelance Driver Directory & Custom Travel Platform</span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => setIsAdminModalOpen(true)}
                className="hover:text-gray-800 transition-colors font-semibold"
              >
                Admin Control
              </button>
              <span>•</span>
              <button
                onClick={() => setActivePage('tour-packages')}
                className="hover:text-gray-800 transition-colors font-semibold"
              >
                Custom Packages
              </button>
              <span>•</span>
              <a
                href="https://wa.me/628113889900"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-600 hover:text-emerald-700 font-bold"
              >
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* 3. Driver Profile Modal */}
      <DriverProfileModal
        driver={profileModalDriver}
        currency={currency}
        onClose={() => setProfileModalDriver(null)}
        onOpenBooking={(driver) => setBookingModalDriver(driver)}
      />

      {/* 4. Booking Request Form Modal with direct WhatsApp integration */}
      <BookingModal
        driver={bookingModalDriver}
        onClose={() => setBookingModalDriver(null)}
      />

      {/* 5. Admin Driver Management Modal */}
      <AdminDriverModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        drivers={drivers}
        activeDriverIds={activeDriverIds}
        onToggleDriverVisibility={handleToggleDriverVisibility}
      />
    </div>
  );
}
