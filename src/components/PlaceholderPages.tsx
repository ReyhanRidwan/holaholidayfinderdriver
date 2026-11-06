import React from 'react';
import {
  Users,
  MapPin,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Car,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { COMMUNITIES } from '../data/drivers';

interface PlaceholderProps {
  type: 'community' | 'destinations' | 'attractions' | 'shopping' | 'more';
  onFindDriverForCommunity?: (community: string) => void;
  onNavigateToFindDriver: () => void;
  onNavigateToCustomPackages: () => void;
}

export const PlaceholderPages: React.FC<PlaceholderProps> = ({
  type,
  onFindDriverForCommunity,
  onNavigateToFindDriver,
  onNavigateToCustomPackages,
}) => {
  if (type === 'community') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
            LOCAL DRIVER COLLECTIVES
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Bali Driver Communities
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            BaliFinder organizes freelance drivers into trusted regional associations. Each community enforces safety standards, local route expertise, and fair transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMMUNITIES.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-gray-150 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-2xl bg-[#FDF2F4] text-[#E53E5C] flex items-center justify-center font-black">
                    <Users className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Collective
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {c.label}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Regional Base: {c.area}
                </p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified freelance members</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Direct WhatsApp contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Regulated fair tourist rates</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onFindDriverForCommunity?.(c.id)}
                className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 hover:border-gray-400 font-bold text-xs text-gray-800 transition-colors"
              >
                <span>View {c.label} Drivers</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E53E5C]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'destinations') {
    const destinations = [
      {
        name: 'Ubud Highlands',
        desc: 'Sacred temples, emerald rice terraces, Campuhan ridge walk, monkey sanctuaries.',
        tag: 'Cultural Heart',
        img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Uluwatu & South Peninsula',
        desc: 'Towering ocean cliffs, dramatic Kecak fire dance, Melasti beach, Padang Padang surf.',
        tag: 'Cliffs & Beaches',
        img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Kintamani & Mount Batur',
        desc: 'Active volcanic caldera, crater lake vistas, organic Arabica coffee farms, hot springs.',
        tag: 'Volcano & Highland',
        img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Canggu & Seminyak',
        desc: 'Sunset beach lounges, world-class restaurants, artisan coffee spots, lively nightlife.',
        tag: 'Coastal Lifestyle',
        img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Bedugul & Munduk',
        desc: 'Lake Beratan floating temple, lush Twin Lake lookouts, roaring jungle waterfalls.',
        tag: 'Misty Mountains',
        img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80',
      },
      {
        name: 'Nusa Penida Island',
        desc: 'Dramatic T-Rex cliff, white sand lagoons, giant manta ray snorkeling.',
        tag: 'Offshore Wonder',
        img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      },
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
              EXPLORE BALI BY REGION
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Popular Destinations
            </h1>
          </div>
          <button
            onClick={onNavigateToCustomPackages}
            className="text-xs font-bold text-[#E53E5C] hover:underline flex items-center gap-1"
          >
            <span>Create multi-destination trip</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  {dest.tag}
                </span>
              </div>
              <div className="p-5 flex flex-col grow justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1.5">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {dest.desc}
                  </p>
                </div>
                <button
                  onClick={onNavigateToFindDriver}
                  className="mt-4 flex items-center justify-between text-xs font-bold text-[#E53E5C] hover:text-[#c42845] pt-3 border-t border-gray-100"
                >
                  <span>Find drivers serving this area</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'attractions') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
            UNMISSABLE EXPERIENCES
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Attractions & Activities
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Top things to see in Bali with your private driver escorting you safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-3">
            <span className="text-2xl">🌋</span>
            <h3 className="font-bold text-lg text-gray-900">Mount Batur Sunrise</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Early 2:00 AM private pickup from your villa to the starting point. Watch the sun rise over the crater and clouds.
            </p>
            <button
              onClick={onNavigateToFindDriver}
              className="text-xs font-bold text-[#E53E5C] flex items-center gap-1 hover:underline pt-2"
            >
              <span>Book sunrise transfer</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-3">
            <span className="text-2xl">🌊</span>
            <h3 className="font-bold text-lg text-gray-900">Gianyar Waterfalls Trail</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Explore Tukad Cepung, Tibumana, and Tegenungan in comfort with air-conditioned breaks between jungle treks.
            </p>
            <button
              onClick={onNavigateToFindDriver}
              className="text-xs font-bold text-[#E53E5C] flex items-center gap-1 hover:underline pt-2"
            >
              <span>Explore waterfall drivers</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-3">
            <span className="text-2xl">🔥</span>
            <h3 className="font-bold text-lg text-gray-900">Uluwatu Kecak Sunset</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Experience the hypnotic vocal trance choir on the 70-meter cliff followed by a fresh seafood dinner on Jimbaran beach.
            </p>
            <button
              onClick={onNavigateToFindDriver}
              className="text-xs font-bold text-[#E53E5C] flex items-center gap-1 hover:underline pt-2"
            >
              <span>Find Jimbaran drivers</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'shopping') {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        <div>
          <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
            LOCAL ARTISANS & MARKETS
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shopping & Souvenirs
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Discover authentic Balinese craftsmanship, silver jewelry, batik textiles, and organic coffee.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              Celuk Gold & Silver Village
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Generations of silversmiths crafting intricate filigree jewelry at wholesale workshop prices.
            </p>
            <span className="text-xs font-semibold text-gray-400">Location: Gianyar Regency</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              Sukawati & Ubud Art Markets
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Traditional rattan bags, handcrafted wooden statues, linen beachwear, and Balinese paintings.
            </p>
            <span className="text-xs font-semibold text-gray-400">Location: Gianyar & Ubud</span>
          </div>
        </div>
      </div>
    );
  }

  // 'more' page
  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl">
      <div>
        <p className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-1">
          ABOUT THE PLATFORM
        </p>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          About BaliFinder
        </h1>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-xs space-y-4 text-xs text-gray-600 leading-relaxed">
        <p>
          <strong className="text-gray-900">BaliFinder</strong> is a driver discovery platform connecting international tourists directly with verified local freelance drivers in Bali.
        </p>
        <p>
          Unlike rigid ride-hailing apps or high-commission travel agencies, BaliFinder allows travelers to view detailed profiles, examine vehicle specifications, check spoken languages, and book drivers directly via personal WhatsApp with 100% transparent pricing.
        </p>
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 space-y-2 text-gray-800 font-medium">
          <p>✨ Direct WhatsApp Communication — No Middleman Delays</p>
          <p>🚗 Inspected Vehicles — Sanitized Daily with Cold AC</p>
          <p>🏝️ Authentic Local Guidance — Discover Hidden Gems</p>
          <p>📋 Custom Packages — Tailored Multi-day Island Expeditions</p>
        </div>
      </div>
    </div>
  );
};
