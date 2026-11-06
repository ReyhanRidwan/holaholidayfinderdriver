import React from 'react';
import {
  Users,
  Car,
  MapPin,
  Sparkles,
  ShoppingBag,
  Globe,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Currency } from '../types';

export type NavPage =
  | 'find-driver'
  | 'tour-packages'
  | 'community'
  | 'destinations'
  | 'attractions'
  | 'shopping'
  | 'more';

interface SidebarProps {
  activePage: NavPage;
  onSelectPage: (page: NavPage) => void;
  currency: Currency;
  onToggleCurrency: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenAdminModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  currency,
  onToggleCurrency,
  isOpenMobile,
  onCloseMobile,
  onOpenAdminModal,
}) => {
  const navItems: { id: NavPage; label: string; icon: React.ReactNode; isPrimary?: boolean }[] = [
    {
      id: 'community',
      label: 'Community',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'find-driver',
      label: 'Find a driver',
      icon: <Car className="w-5 h-5" />,
      isPrimary: true,
    },
    {
      id: 'destinations',
      label: 'Destinations',
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: 'attractions',
      label: 'Attractions & activities',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'shopping',
      label: 'Shopping & souvenirs',
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: 'tour-packages',
      label: 'Tour packages',
      icon: <Globe className="w-5 h-5" />,
      isPrimary: true,
    },
    {
      id: 'more',
      label: 'More',
      icon: <Menu className="w-5 h-5" />,
    },
  ];

  const handleNavClick = (id: NavPage) => {
    onSelectPage(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between px-2 mb-8">
            <button
              onClick={() => handleNavClick('find-driver')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
              aria-label="BaliFinder Home"
            >
              {/* Logo Emblem: Red circle with stylized bird/compass pin */}
              <div className="w-9 h-9 rounded-full bg-[#E53E5C] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <span className="text-[26px] font-black tracking-tight text-gray-900 font-['Plus_Jakarta_Sans',sans-serif]">
                finder
              </span>
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[14.5px] font-medium transition-all text-left ${
                    isActive
                      ? 'bg-[#FDF2F4] text-[#E53E5C] font-semibold'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className={isActive ? 'text-[#E53E5C]' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.id === 'tour-packages' && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md">
                      Custom
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-gray-100 space-y-3 px-2">
          {/* Currency Switcher */}
          <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2 rounded-xl">
            <span className="font-medium text-gray-600">Currency</span>
            <button
              onClick={onToggleCurrency}
              className="px-2.5 py-1 bg-white border border-gray-200 rounded-lg font-bold text-gray-800 hover:border-gray-400 transition-colors shadow-2xs"
            >
              {currency === 'IDR' ? '🇮🇩 IDR (Rp)' : '🇺🇸 USD ($)'}
            </button>
          </div>

          {/* Admin Onboarding Info Trigger */}
          <button
            onClick={onOpenAdminModal}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-xl transition-all shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Admin Driver Management</span>
          </button>

          <p className="text-[11px] text-gray-400 text-center">
            BaliFinder Demo • WhatsApp Direct
          </p>
        </div>
      </aside>
    </>
  );
};
