import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneNumber,
  generateDriverBookingMessage,
  generateDriverWhatsAppUrl,
  generateCustomTripMessage,
  generateCustomTripWhatsAppUrl,
  formatCurrency,
  filterDrivers,
} from './booking';
import { Driver } from '../types';

test('sanitizePhoneNumber removes spaces, dashes, plus signs', () => {
  assert.equal(sanitizePhoneNumber('+62 812-3456-7890'), '6281234567890');
  assert.equal(sanitizePhoneNumber('(0361) 123-456'), '0361123456');
});

test('generateDriverBookingMessage formats all fields matching specification', () => {
  const message = generateDriverBookingMessage({
    driverName: 'Bali De Tour',
    driverPhone: '+62 812-3456-7890',
    fullName: 'John',
    travelDate: '15 November 2026',
    passengers: 4,
    pickupLocation: 'Seminyak',
    destination: 'Ubud',
    serviceType: 'Private Driver',
    additionalRequests: 'Need baby car seat',
  });

  assert.ok(message.includes('Hello! I found your profile on BaliFinder'));
  assert.ok(message.includes('Name: John'));
  assert.ok(message.includes('Travel Date: 15 November 2026'));
  assert.ok(message.includes('Passengers: 4'));
  assert.ok(message.includes('Pickup Location: Seminyak'));
  assert.ok(message.includes('Destination: Ubud'));
  assert.ok(message.includes('Service: Private Driver'));
  assert.ok(message.includes('Special Requests: Need baby car seat'));
  assert.ok(message.includes('Are you available on this date?'));
});

test('generateDriverWhatsAppUrl creates valid wa.me URL with phone and encoded query', () => {
  const url = generateDriverWhatsAppUrl({
    driverName: 'Betul Nyoman',
    driverPhone: '+62 819-9988-7766',
    fullName: 'Sarah Jenkins',
    travelDate: '2026-11-20',
    passengers: 2,
    pickupLocation: 'Canggu',
    destination: 'Kintamani & Batur',
    serviceType: 'Full Day Tour',
  });

  assert.ok(url.startsWith('https://wa.me/6281999887766?text='));
  assert.ok(url.includes(encodeURIComponent('Sarah Jenkins')));
  assert.ok(url.includes(encodeURIComponent('Kintamani & Batur')));
});

test('generateCustomTripMessage builds comprehensive admin quotation request', () => {
  const msg = generateCustomTripMessage({
    startDate: '2026-12-01',
    days: 4,
    travelers: 3,
    pickupLocation: 'Ngurah Rai Airport',
    destinations: ['Ubud', 'Kintamani', 'Uluwatu'],
    experiences: ['Cultural experiences', 'Water sports'],
    vehiclePreference: 'Toyota Innova Reborn',
    specialRequests: 'Elderly friendly pace',
    contactName: 'Michael',
  });

  assert.ok(msg.includes('Hello BaliFinder Admin!'));
  assert.ok(msg.includes('Guest Name: Michael'));
  assert.ok(msg.includes('Duration: 4 Days'));
  assert.ok(msg.includes('Travelers: 3 people'));
  assert.ok(msg.includes('Selected Destinations: Ubud, Kintamani, Uluwatu'));
  assert.ok(msg.includes('Toyota Innova Reborn'));
});

test('filterDrivers properly handles search, community, area, and language', () => {
  const mockDrivers: Driver[] = [
    {
      id: 'd1',
      name: 'Bali De Tour',
      community: 'Ubud',
      languages: ['English'],
      tagline: 'Your go-to travel partner',
      bio: 'Professional driver in Ubud',
      profileImage: '/img1.jpg',
      vehicleType: 'Toyota Avanza',
      vehicleModel: 'Avanza 2023',
      passengerCapacity: 4,
      luggageCapacity: 3,
      serviceAreas: ['Ubud', 'Gianyar', 'Denpasar'],
      services: [{ name: 'Full Day Tour', priceIdr: 600000, priceUsd: 40, duration: '10h', description: '' }],
      dailyPriceIdr: 600000,
      dailyPriceUsd: 40,
      whatsappNumber: '+6281234567891',
      whatsappDisplay: '+62 812-3456-7891',
      rating: 4.9,
      reviewsCount: 30,
      yearsExperience: 5,
      isVerified: true,
      vehicleGallery: [],
      tourHighlights: [],
      inclusions: [],
    },
    {
      id: 'd2',
      name: 'Betul Nyoman',
      community: 'Denpasar',
      languages: ['English', 'Indonesian'],
      tagline: 'Hello Betul is here',
      bio: 'Enthusiastic driver from Denpasar',
      profileImage: '/img2.jpg',
      vehicleType: 'Toyota Innova',
      vehicleModel: 'Innova Reborn',
      passengerCapacity: 6,
      luggageCapacity: 4,
      serviceAreas: ['Jimbaran', 'Kuta', 'Seminyak'],
      services: [{ name: 'Airport Transfer', priceIdr: 300000, priceUsd: 20, duration: '2h', description: '' }],
      dailyPriceIdr: 750000,
      dailyPriceUsd: 50,
      whatsappNumber: '+6281234567892',
      whatsappDisplay: '+62 812-3456-7892',
      rating: 4.95,
      reviewsCount: 42,
      yearsExperience: 7,
      isVerified: true,
      vehicleGallery: [],
      tourHighlights: [],
      inclusions: [],
    },
  ];

  // Community test
  assert.equal(filterDrivers(mockDrivers, { community: 'Ubud' }).length, 1);
  assert.equal(filterDrivers(mockDrivers, { community: 'Denpasar' })[0].name, 'Betul Nyoman');
  assert.equal(filterDrivers(mockDrivers, { community: 'all' }).length, 2);

  // Search query
  assert.equal(filterDrivers(mockDrivers, { searchQuery: 'tour' })[0].name, 'Bali De Tour');

  // Service area
  assert.equal(filterDrivers(mockDrivers, { serviceArea: 'Kuta' })[0].name, 'Betul Nyoman');

  // Language
  assert.equal(filterDrivers(mockDrivers, { language: 'Indonesian' }).length, 1);
});

test('formatCurrency outputs expected strings', () => {
  assert.equal(formatCurrency(600000, 'IDR'), 'Rp 600.000');
  assert.equal(formatCurrency(45, 'USD'), '$45');
});
