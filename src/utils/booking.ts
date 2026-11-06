import { BookingRequest, CustomTripRequest, Driver } from '../types';

export const BALIFINDER_ADMIN_WHATSAPP = '628113889900';

/**
 * Clean phone number to digits only for WhatsApp wa.me links
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Generates the direct WhatsApp booking message for a specific driver
 */
export function generateDriverBookingMessage(booking: BookingRequest): string {
  const parts = [
    `Hello! I found your profile on BaliFinder and would like to book your driving service.`,
    ``,
    `Name: ${booking.fullName}`,
    `Travel Date: ${booking.travelDate}`,
    `Passengers: ${booking.passengers}`,
    `Pickup Location: ${booking.pickupLocation}`,
    `Destination: ${booking.destination}`,
    `Service: ${booking.serviceType}`,
  ];

  if (booking.additionalRequests && booking.additionalRequests.trim().length > 0) {
    parts.push(`Special Requests: ${booking.additionalRequests.trim()}`);
  }

  parts.push(``);
  parts.push(`Are you available on this date?`);

  return parts.join('\n');
}

/**
 * Generates full WhatsApp URL for direct booking with a driver
 */
export function generateDriverWhatsAppUrl(booking: BookingRequest): string {
  const phone = sanitizePhoneNumber(booking.driverPhone);
  const text = generateDriverBookingMessage(booking);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Generates the WhatsApp message for Custom Packages inquiry to Admin
 */
export function generateCustomTripMessage(trip: CustomTripRequest): string {
  const destList = trip.destinations.length > 0 ? trip.destinations.join(', ') : 'Flexible / Recommended by Driver';
  const expList = trip.experiences.length > 0 ? trip.experiences.join(', ') : 'General Bali Sightseeing';

  const parts = [
    `Hello BaliFinder Admin! I created a custom trip itinerary on BaliFinder and would like a quotation and driver recommendation.`,
    ``,
    `Trip Overview:`,
    trip.contactName ? `• Guest Name: ${trip.contactName}` : null,
    `• Duration: ${trip.days} ${trip.days === 1 ? 'Day' : 'Days'}`,
    `• Start Date: ${trip.startDate || 'Flexible'}`,
    `• Travelers: ${trip.travelers} ${trip.travelers === 1 ? 'person' : 'people'}`,
    `• Pickup Location: ${trip.pickupLocation || 'Airport / Hotel'}`,
    `• Selected Destinations: ${destList}`,
    `• Preferred Experiences: ${expList}`,
    `• Vehicle Preference: ${trip.vehiclePreference}`,
  ].filter(Boolean) as string[];

  if (trip.specialRequests && trip.specialRequests.trim().length > 0) {
    parts.push(`• Special Requests: ${trip.specialRequests.trim()}`);
  }

  parts.push(``);
  parts.push(`Please connect me with a suitable driver and quotation. Thank you!`);

  return parts.join('\n');
}

/**
 * Generates full WhatsApp URL for custom trip builder to BaliFinder admin
 */
export function generateCustomTripWhatsAppUrl(trip: CustomTripRequest): string {
  const phone = sanitizePhoneNumber(trip.adminPhone || BALIFINDER_ADMIN_WHATSAPP);
  const text = generateCustomTripMessage(trip);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Formats price in Indonesian Rupiah or USD
 */
export function formatCurrency(amount: number, currency: 'IDR' | 'USD' = 'IDR'): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US')}`;
  }
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export interface DriverFilters {
  searchQuery?: string;
  serviceArea?: string;
  language?: string;
  serviceType?: string;
  community?: string;
}

/**
 * Filters a list of drivers by community, search name, service area, language, and service
 */
export function filterDrivers(drivers: Driver[], filters: DriverFilters): Driver[] {
  return drivers.filter((driver) => {
    // Community filter
    if (filters.community && filters.community !== 'all') {
      const commMatch = driver.community.toLowerCase() === filters.community.toLowerCase();
      if (!commMatch) return false;
    }

    // Search query (driver name or tagline or bio)
    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = driver.name.toLowerCase().includes(q);
      const bioMatch = driver.bio.toLowerCase().includes(q);
      const tagMatch = driver.tagline.toLowerCase().includes(q);
      const communityMatch = driver.community.toLowerCase().includes(q);
      if (!nameMatch && !bioMatch && !tagMatch && !communityMatch) return false;
    }

    // Service area filter
    if (filters.serviceArea && filters.serviceArea.trim().length > 0) {
      const area = filters.serviceArea.toLowerCase().trim();
      const areaMatch = driver.serviceAreas.some((a) => a.toLowerCase().includes(area));
      if (!areaMatch) return false;
    }

    // Language filter
    if (filters.language && filters.language !== 'all') {
      const langMatch = driver.languages.some(
        (l) => l.toLowerCase() === filters.language!.toLowerCase()
      );
      if (!langMatch) return false;
    }

    // Service type filter
    if (filters.serviceType && filters.serviceType !== 'all') {
      const serviceMatch = driver.services.some((s) =>
        s.name.toLowerCase().includes(filters.serviceType!.toLowerCase())
      );
      if (!serviceMatch) return false;
    }

    return true;
  });
}
