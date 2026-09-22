export type ModalType = 
  | 'massage'
  | 'sport'
  | 'ernaehrung'
  | 'preise'
  | 'booking'
  | 'impressum'
  | 'datenschutz'
  | 'kontakt'
  | null;

export interface BookingDetails {
  serviceId: string;
  serviceTitle: string;
  price?: string;
  duration?: string;
}

export interface ProgramItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  subtitle: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
}

export interface SinglePriceCategory {
  category: string;
  items: {
    name: string;
    description?: string;
    details: string;
  }[];
  note?: {
    title: string;
    subtitle: string;
  };
}

export interface CalendarSettings {
  provider: 'google' | 'calendly' | 'calcom' | 'custom';
  calendarUrl: string;
  directRedirect: boolean;
  notificationEmail: string;
  notificationPhone: string;
  locationCity: string;
  slotDurationMinutes: number;
  bufferMinutes: number;
  pinCode: string;
  requirePin: boolean;
  availableDays: number[]; // 1=Mo, 2=Di, 3=Mi, 4=Do, 5=Fr, 6=Sa
  workingHoursStart: string;
  workingHoursEnd: string;
}

export interface BookingRecord {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  serviceTitle: string;
  price?: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: 'neu' | 'bestaetigt' | 'abgeschlossen' | 'storniert';
  locationCity: string;
}

