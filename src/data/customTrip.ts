export interface DestinationOption {
  id: string;
  name: string;
  tagline: string;
  region: string;
  icon: string;
  image: string;
  highlights: string[];
}

export interface ExperienceOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  capacity: string;
  luggage: string;
  description: string;
  recommendedFor: string;
}

export const DESTINATION_OPTIONS: DestinationOption[] = [
  {
    id: 'ubud',
    name: 'Ubud',
    tagline: 'Art, culture, lush rainforests & monkey sanctuaries',
    region: 'Central Bali',
    icon: 'Palmtree',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    highlights: ['Tegallalang Rice Terraces', 'Sacred Monkey Forest', 'Campuhan Ridge Walk'],
  },
  {
    id: 'kintamani',
    name: 'Kintamani & Batur',
    tagline: 'Active volcano views, crater lake & highland coffee',
    region: 'Northeast Bali',
    icon: 'Mountain',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    highlights: ['Mount Batur Caldera', 'Lake Batur Hot Springs', 'Akasa Panorama Cafe'],
  },
  {
    id: 'uluwatu',
    name: 'Uluwatu',
    tagline: 'Dramatic limestone sea cliffs, surf & fire dance',
    region: 'South Bukit',
    icon: 'Waves',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=600&q=80',
    highlights: ['Uluwatu Cliff Temple', 'Kecak Fire Dance', 'Melasti Beach'],
  },
  {
    id: 'canggu',
    name: 'Canggu & Pererenan',
    tagline: 'Vibrant beach clubs, bohemian cafes & surf breaks',
    region: 'Southwest Bali',
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=600&q=80',
    highlights: ['Echo Beach Sunsets', 'Atlas & Finn’s Clubs', 'Trendy Cafes'],
  },
  {
    id: 'seminyak',
    name: 'Seminyak',
    tagline: 'Chic fashion boutiques, fine dining & beach lounges',
    region: 'Southwest Bali',
    icon: 'ShoppingBag',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    highlights: ['Double Six Beach', 'Eat Street Oberoi', 'Sunset Beach Clubs'],
  },
  {
    id: 'nusa-penida',
    name: 'Nusa Penida Island',
    tagline: 'Spectacular T-Rex cliffs, manta rays & turquoise coves',
    region: 'Offshore Island',
    icon: 'Compass',
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
    highlights: ['Kelingking T-Rex Cliff', 'Broken Beach & Angels Billabong', 'Crystal Bay'],
  },
  {
    id: 'tanah-lot',
    name: 'Tanah Lot',
    tagline: 'Iconic offshore ocean temple and dramatic waves',
    region: 'Tabanan Regency',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80',
    highlights: ['Pura Tanah Lot Temple', 'Batu Bolong Sunset', 'Cultural Performance'],
  },
  {
    id: 'bedugul',
    name: 'Bedugul & Munduk',
    tagline: 'Misty mountain lakes, floating pagoda & waterfalls',
    region: 'North-Central Bali',
    icon: 'CloudRain',
    image: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?auto=format&fit=crop&w=600&q=80',
    highlights: ['Ulun Danu Beratan Temple', 'Banyumala Twin Waterfalls', 'Munduk Coffee Estates'],
  },
  {
    id: 'amed',
    name: 'Amed & East Bali',
    tagline: 'Coral reef snorkeling, diving & Mount Agung views',
    region: 'East Bali',
    icon: 'Fish',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    highlights: ['USAT Liberty Shipwreck', 'Tirta Gangga Water Palace', 'Lempuyang Gate of Heaven'],
  },
];

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  {
    id: 'cultural',
    name: 'Cultural & Temple Experiences',
    description: 'Ancient temples, holy water purification rituals, Balinese traditional dance',
    icon: 'Sparkles',
  },
  {
    id: 'beach',
    name: 'Beach & Coastal Vibes',
    description: 'Hidden white sand coves, dramatic limestone cliffs, romantic seaside sunsets',
    icon: 'SunMedium',
  },
  {
    id: 'adventure',
    name: 'Adventure & Thrills',
    description: 'ATV quad bikes through jungle mud, Ayung river rafting, volcano sunrise treks',
    icon: 'Zap',
  },
  {
    id: 'nature',
    name: 'Nature & Waterfalls',
    description: 'Jungle ravines, cascading waterfalls, UNESCO rice terraces, volcanic calderas',
    icon: 'Trees',
  },
  {
    id: 'watersports',
    name: 'Water Sports & Marine',
    description: 'Snorkeling with sea turtles, scuba diving, surf lessons, jet ski & parasailing',
    icon: 'LifeBuoy',
  },
  {
    id: 'shopping',
    name: 'Shopping & Artisan Crafts',
    description: 'Celuk silver artisans, Mas woodcarvers, Sukawati art markets, boutique lanes',
    icon: 'ShoppingBag',
  },
  {
    id: 'food',
    name: 'Food & Culinary Tasting',
    description: 'Authentic Balinese cooking classes, Jimbaran grilled seafood, kopi luwak tasting',
    icon: 'Utensils',
  },
];

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'standard',
    name: 'Standard Private Car (Avanza / Ertiga)',
    capacity: 'Up to 4 Passengers',
    luggage: '2-3 Medium Suitcases',
    description: 'Agile, fully air-conditioned MPV ideal for solo travelers, couples, or small families.',
    recommendedFor: 'Couples & small groups',
  },
  {
    id: 'family',
    name: 'Comfort Family MPV (Toyota Innova Reborn)',
    capacity: 'Up to 6 Passengers',
    luggage: '4 Large Suitcases',
    description: 'Superior suspension, plush reclining seats, spacious legroom, and dual-zone air cooling.',
    recommendedFor: 'Families & long-distance island touring',
  },
  {
    id: 'premium',
    name: 'Premium Luxury (Toyota Alphard / Fortuner)',
    capacity: 'Up to 5 Passengers',
    luggage: '3-4 Suitcases',
    description: 'Executive captain seats, privacy tints, power ottoman seats, and ultra-smooth ride.',
    recommendedFor: 'VIP, honeymooners & business travelers',
  },
  {
    id: 'group',
    name: 'Group Van (Toyota HiAce Premio)',
    capacity: 'Up to 12-14 Passengers',
    luggage: '8-10 Suitcases',
    description: 'High-roof commuter van with dedicated individual overhead air vents and wide aisle.',
    recommendedFor: 'Large families, friend groups & wedding parties',
  },
];
