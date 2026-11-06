import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  MessageSquare,
  ChevronDown,
  Menu,
  Check,
  User,
  Heart,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  savedDriversCount: number;
  onNavigateToSaved?: () => void;
  onNavigateToCustomPackages?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  savedDriversCount,
  onNavigateToCustomPackages,
}) => {
  const [selectedLang, setSelectedLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'ID', name: 'Bahasa Indonesia' },
    { code: 'JA', name: '日本語 (Japanese)' },
    { code: 'DE', name: 'Deutsch (German)' },
    { code: 'FR', name: 'Français (French)' },
  ];

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 sm:px-8 border-b border-gray-100 bg-white sticky top-0 z-30">
      {/* Mobile Hamburger & Logo text */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-hidden"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#E53E5C] flex items-center justify-center text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            finder
          </span>
        </div>
      </div>

      {/* Center / Left status (Desktop) */}
      <div className="hidden lg:flex items-center gap-2 text-xs text-gray-400">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Direct WhatsApp Booking Platform • Freelance Driver Network</span>
      </div>

      {/* Right controls matching screenshot */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E53E5C] rounded-full ring-2 ring-white" />
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h4 className="font-bold text-sm text-gray-900">Notifications</h4>
                <span className="text-[11px] text-[#E53E5C] font-semibold">2 new</span>
              </div>
              <div className="divide-y divide-gray-50 text-xs py-2 space-y-2">
                <div className="pt-2">
                  <p className="font-semibold text-gray-800">Peak Season in Bali Reminder</p>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    We recommend contacting drivers 2-3 days in advance for Ubud and Uluwatu tours.
                  </p>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-gray-800">Direct WhatsApp Verified</p>
                  <p className="text-gray-500 text-[11px] mt-0.5">
                    All listed freelance drivers respond directly via their personal WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message bubble icon */}
        <button
          onClick={() => {
            window.open('https://wa.me/628113889900?text=Hello%20BaliFinder%20Admin!%20I%20have%20a%20question%20about%20booking%20a%20driver.', '_blank');
          }}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors relative"
          title="Direct support on WhatsApp"
          aria-label="Direct support"
        >
          <MessageSquare className="w-5 h-5" />
        </button>

        {/* Language Selector */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-expanded={isLangOpen}
            aria-label="Select Language"
          >
            <span>{selectedLang}</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSelectedLang(lang.code);
                    setIsLangOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-gray-50 text-gray-700"
                >
                  <span>{lang.name}</span>
                  {selectedLang === lang.code && (
                    <Check className="w-3.5 h-3.5 text-[#E53E5C]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* My Account Menu */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="flex items-center gap-2 py-1.5 px-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
            aria-expanded={isAccountOpen}
            aria-label="My account"
          >
            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline-block">My account</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 text-xs animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="font-bold text-gray-900">Guest Traveler</p>
                <p className="text-gray-400 text-[11px]">No login needed to book</p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    onNavigateToCustomPackages?.();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-left"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E53E5C]" />
                  <span>Build Custom Package</span>
                </button>

                <div className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Saved Drivers</span>
                  </div>
                  <span className="bg-rose-50 text-rose-600 font-bold px-1.5 py-0.5 rounded-full text-[10px]">
                    {savedDriversCount}
                  </span>
                </div>

                <a
                  href="https://wa.me/628113889900"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
                >
                  <span>WhatsApp Concierge</span>
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
