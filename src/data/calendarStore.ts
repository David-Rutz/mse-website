import { CalendarSettings, BookingRecord } from '../types';

export const DEFAULT_CALENDAR_SETTINGS: CalendarSettings = {
  provider: 'google',
  calendarUrl: 'https://calendar.google.com/calendar/appointments/schedules',
  directRedirect: false,
  notificationEmail: 'david_alvarez@hotmail.ch',
  notificationPhone: '+41 44 123 45 67',
  locationCity: 'Zürich',
  slotDurationMinutes: 60,
  bufferMinutes: 15,
  pinCode: '1234',
  requirePin: false,
  availableDays: [1, 2, 3, 4, 5, 6], // Mo - Sa
  workingHoursStart: '07:30',
  workingHoursEnd: '19:30',
};

const SETTINGS_KEY = 'mse_calendar_settings_v1';
const BOOKINGS_KEY = 'mse_calendar_bookings_v1';

export function getCalendarSettings(): CalendarSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_CALENDAR_SETTINGS;
    return { ...DEFAULT_CALENDAR_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CALENDAR_SETTINGS;
  }
}

export function saveCalendarSettings(settings: CalendarSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save calendar settings', err);
  }
}

export function getBookings(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    if (!raw) {
      // Seed with initial realistic bookings for demonstration
      const initialBookings: BookingRecord[] = [
        {
          id: 'b-101',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          fullName: 'Laura Berisha',
          email: 'laura.b@bluewin.ch',
          phone: '+41 79 342 11 88',
          serviceTitle: 'MSE Startpaket (CHF 89)',
          price: 'CHF 89',
          date: new Date(Date.now() + 3600000 * 48).toISOString().split('T')[0],
          timeSlot: '10:30',
          message: 'Verspannungen im Nacken nach Homeoffice.',
          status: 'bestaetigt',
          locationCity: 'Zürich',
        },
        {
          id: 'b-102',
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
          fullName: 'Thomas Keller',
          email: 'keller.thomas@gmx.ch',
          phone: '+41 76 890 23 45',
          serviceTitle: 'Sportmassage 60 Min (CHF 125)',
          price: 'CHF 125',
          date: new Date(Date.now() + 3600000 * 72).toISOString().split('T')[0],
          timeSlot: '17:00',
          message: 'Regeneration nach Halbmarathon-Vorbereitung.',
          status: 'neu',
          locationCity: 'Zürich',
        },
      ];
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
      return initialBookings;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveBookings(bookings: BookingRecord[]): void {
  try {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch (err) {
    console.error('Failed to save bookings', err);
  }
}

export function addBooking(booking: Omit<BookingRecord, 'id' | 'createdAt'>): BookingRecord {
  const current = getBookings();
  const newBooking: BookingRecord = {
    ...booking,
    id: `b-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updated = [newBooking, ...current];
  saveBookings(updated);
  return newBooking;
}

export function updateBookingStatus(id: string, status: BookingRecord['status']): void {
  const current = getBookings();
  const updated = current.map((b) => (b.id === id ? { ...b, status } : b));
  saveBookings(updated);
}

export function deleteBooking(id: string): void {
  const current = getBookings();
  const updated = current.filter((b) => b.id !== id);
  saveBookings(updated);
}

// Generate Google Calendar Add URL
export function createGoogleCalendarUrl(booking: {
  title: string;
  date: string;
  timeSlot: string;
  locationCity: string;
  notes?: string;
}): string {
  try {
    const [hours, minutes] = (booking.timeSlot || '10:00').split(':').map(Number);
    const dateObj = new Date(booking.date);
    dateObj.setHours(hours || 10, minutes || 0, 0, 0);

    const endDate = new Date(dateObj.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatGDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const details = encodeURIComponent(
      `Termin bei MSE – Massage, Sport & Ernährung.\nAngebot: ${booking.title}\nStandort: ${booking.locationCity}\nNotiz: ${booking.notes || 'Keine Notiz'}`
    );
    const location = encodeURIComponent(`MSE Praxis, ${booking.locationCity}`);
    const summary = encodeURIComponent(`MSE Termin: ${booking.title}`);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${summary}&dates=${formatGDate(dateObj)}/${formatGDate(endDate)}&details=${details}&location=${location}`;
  } catch {
    return 'https://calendar.google.com';
  }
}

// Generate and trigger download of .ics file
export function downloadIcsFile(booking: {
  title: string;
  date: string;
  timeSlot: string;
  locationCity: string;
  customerName?: string;
}): void {
  try {
    const [hours, minutes] = (booking.timeSlot || '10:00').split(':').map(Number);
    const start = new Date(booking.date);
    start.setHours(hours || 10, minutes || 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const formatIcsDate = (d: Date) =>
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MSE Massage Sport Ernaehrung//CH',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@mse.ch`,
      `DTSTAMP:${formatIcsDate(new Date())}Z`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:MSE Termin: ${booking.title}`,
      `DESCRIPTION:Termin bei MSE – Massage, Sport & Ernährung\\nStandort: ${booking.locationCity}\\nKunde: ${booking.customerName || 'Kunde'}`,
      `LOCATION:MSE Praxis, ${booking.locationCity}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `MSE-Termin-${booking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Failed to create ICS download', err);
  }
}
