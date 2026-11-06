export interface DriverService {
  name: string;
  priceIdr: number;
  priceUsd: number;
  duration: string;
  description: string;
}

export interface Driver {
  id: string;
  name: string;
  community: string;
  languages: string[];
  tagline: string;
  bio: string;
  profileImage: string;
  coverImage?: string;
  vehicleType: string;
  vehicleModel: string;
  passengerCapacity: number;
  luggageCapacity: number;
  serviceAreas: string[];
  services: DriverService[];
  dailyPriceIdr: number;
  dailyPriceUsd: number;
  whatsappNumber: string;
  whatsappDisplay: string;
  rating: number;
  reviewsCount: number;
  yearsExperience: number;
  isVerified: boolean;
  vehicleGallery: string[];
  tourHighlights: string[];
  inclusions: string[];
}

export interface BookingRequest {
  driverName: string;
  driverPhone: string;
  fullName: string;
  travelDate: string;
  passengers: number;
  pickupLocation: string;
  destination: string;
  serviceType: string;
  additionalRequests?: string;
}

export interface CustomTripRequest {
  startDate: string;
  days: number;
  travelers: number;
  pickupLocation: string;
  destinations: string[];
  experiences: string[];
  vehiclePreference: string;
  specialRequests?: string;
  contactName?: string;
  adminPhone?: string;
}

export type Currency = 'IDR' | 'USD';
