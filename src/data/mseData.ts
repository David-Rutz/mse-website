import { ProgramItem, SinglePriceCategory } from '../types';

export const DEFAULT_PRACTICE_INFO = {
  name: 'MSE – Massage, Sport & Ernährung',
  owner: 'Andrea Szabo',
  title: 'Gründerin & Inhaberin MSE',
  city: 'Zürich & Umgebung',
  street: 'Mobil & vor Ort',
  zipCity: 'Schweiz',
  phone: '+41 44 123 45 67',
  email: 'info@mse.ch',
  qualifications: 'Med. Masseur EFA / Dipl. Personaltrainer / Ernährungsberatung',
  background: 'Jahrelange Erfahrung im Leistungs-, Vereins- & Breitensport',
};

export const CORPORATE_OFFER = {
  tag: 'FÜR FIRMEN & VEREINE',
  title: 'Gesundheit fürs Team.',
  lead: 'MSE kommt zu euch.',
  offerName: 'Firmen-Massagetag',
  description: 'Kurze Massagen direkt im Betrieb.',
  price: 'Ab CHF 480',
  priceUnit: 'pro Halbtag',
  fullPriceText: 'Ab CHF 480 pro Halbtag',
  benefits: [
    '15–20 Min. gezielte Nacken-, Schulter- & Rückenmassagen',
    'Direkt am Arbeitsplatz im diskreten Besprechungsraum',
    'Komplettes Equipment (mobiler Massagestuhl/Liege) wird von MSE mitgebracht',
    'Steigert Mitarbeiterzufriedenheit, Fokus & senkt krankheitsbedingte Ausfälle',
    'Auch für Sportvereine, Turniere & Trainingslager massgeschneidert buchbar',
  ],
};

export const PILLARS_DATA = {
  massage: {
    id: 'massage',
    tag: 'Bereich 01',
    title: 'MASSAGE',
    modalTitle: 'Massage Details',
    headline: 'Regeneration, Entspannung und gezielte Behandlung.',
    lead: 'Wir lösen nicht nur Verspannungen, wir suchen die Ursache.',
    description: 'Wir unterstützen deinen Körper dabei, Blockaden zu lösen und Schmerzen nachhaltig zu lindern.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: [
      { name: 'Sportmassage', description: 'Zur Vorbereitung oder optimalen Regeneration.' },
      { name: 'Klassische Massage', description: 'Löst tiefsitzende Verspannungen.' },
      { name: 'Triggerpunkt-Therapie', description: 'Gezielte Schmerzbehandlung.' },
      { name: 'Faszienbehandlung', description: 'Für mehr Beweglichkeit im Alltag.' },
    ],
    benefits: [
      'Schmerzfreiheit & Entlastung',
      'Schnellere Regeneration',
      'Stressabbau & Wohlbefinden',
      'Bessere Gelenk-Beweglichkeit',
    ],
  },
  sport: {
    id: 'sport',
    tag: 'Bereich 02',
    title: 'SPORT',
    modalTitle: 'Personal Training',
    headline: 'Training, das zu dir und deinem Alltag passt.',
    lead: 'Training, das deinen Körper fordert, aber nicht überlastet.',
    description: 'Ein klarer Plan – vom gesundheitsorientierten Wiedereinstieg bis zur sportlichen Leistungssteigerung.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: [
      { name: 'Bewegungsanalyse', description: 'Ist-Zustand und Dysbalancen erkennen.' },
      { name: '1:1 Personal Training', description: '100% Fokus auf deine Übungsausführung.' },
      { name: 'Trainingspläne', description: 'Massgeschneidert für Zuhause oder dein Gym.' },
    ],
    benefits: [
      'Kraft- und Muskelaufbau',
      'Nachhaltige Gewichtsreduktion',
      'Prävention vor Verletzungen',
      'Leistungssteigerung (Wettkampf)',
    ],
  },
  ernaehrung: {
    id: 'ernaehrung',
    tag: 'Bereich 03',
    title: 'ERNÄHRUNG',
    modalTitle: 'Ernährung',
    headline: 'Keine Crash-Diäten. Keine unnötigen Verbote.',
    lead: 'Treibstoff für deinen Alltag, ohne strenge Verbote.',
    description: 'Wir entwickeln einen Ansatz, der zu deinem Alltag, deinen Zielen und deinem Training passt.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    services: [
      { name: 'Ernährungsanalyse', description: 'Wir schauen, was du aktuell isst.' },
      { name: 'Alltagsplanung', description: 'Rezepte und Pläne, die wenig Zeit kosten.' },
      { name: 'Sporternährung', description: 'Optimiere deine Leistung rund ums Training.' },
    ],
    benefits: [
      'Mehr Energie im Arbeitsalltag',
      'Gesundes Gewichtsmanagement',
      'Bessere muskuläre Erholung',
      'Kein Jojo-Effekt mehr',
    ],
  },
};

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'schmerzfrei',
    name: 'SCHMERZFREI',
    duration: '6 Wochen',
    price: 'CHF 690',
    subtitle: 'Für Menschen mit Nacken-, Rücken- oder Schulterbeschwerden.',
    features: [
      '6 × Massage à 60 Minuten',
      'Übungsplan für zuhause',
      '2 Kontrolltermine',
    ],
  },
  {
    id: 'reset',
    name: 'RESET',
    duration: '8 Wochen',
    price: "CHF 1'290",
    subtitle: 'Für Menschen, die Gewicht verlieren, fitter werden und neu starten möchten.',
    badge: 'Beliebteste Wahl',
    isPopular: true,
    features: [
      'Ernährungsanalyse & Plan',
      '4 × Personal Training',
      '4 × Massage',
      '3 × Ernährungs-Check-in',
      'Begleitung per Chat',
    ],
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    duration: '12 Wochen',
    price: "CHF 1'890",
    subtitle: 'Für Sportler mit einem konkreten Ziel oder zur Wettkampfvorbereitung.',
    features: [
      'Bewegungsanalyse',
      '6 × Personal Training',
      '6 × Sportmassage',
      'Wettkampf-Ernährungsplan',
      '4 × Check-in & Chat',
    ],
  },
];

export const SINGLE_PRICES: SinglePriceCategory[] = [
  {
    category: 'Massage',
    items: [
      {
        name: 'Sportmassage',
        details: '30 Min – CHF 70 | 60 Min – CHF 125 | 90 Min – CHF 175',
      },
      {
        name: 'Klassisch / Entspannung',
        details: '60 Min – CHF 120 | 90 Min – CHF 170',
      },
      {
        name: 'Triggerpunkt / Faszien',
        details: '45 Min – CHF 100',
      },
    ],
    note: {
      title: "10er-Abo Massage (60 Min): CHF 1'125",
      subtitle: '10 bezahlen – 11 erhalten.',
    },
  },
  {
    category: 'Sport',
    items: [
      {
        name: 'Personal Training',
        details: '60 Min – CHF 120',
      },
      {
        name: 'Bewegungs-/Haltungsanalyse',
        details: '75 Min – CHF 160',
      },
    ],
  },
  {
    category: 'Ernährung',
    items: [
      {
        name: 'Erstgespräch',
        details: '75 Min – CHF 150',
      },
      {
        name: 'Folgetermin',
        details: '45 Min – CHF 90',
      },
    ],
  },
];

export const LIGHTBOX_PRICES = [
  {
    category: 'Startpaket',
    items: [
      { name: 'MSE Startpaket (30 Min. Gespräch + 30 Min. Massage)', price: 'CHF 89' },
    ],
  },
  {
    category: 'Massage & Manuelle Therapie',
    items: [
      { name: 'Sportmassage (30 Min.)', price: 'CHF 70' },
      { name: 'Sportmassage (60 Min.)', price: 'CHF 125' },
      { name: 'Sportmassage (90 Min.)', price: 'CHF 175' },
      { name: 'Klassische Massage / Entspannung (60 Min.)', price: 'CHF 120' },
      { name: 'Klassische Massage / Entspannung (90 Min.)', price: 'CHF 170' },
      { name: 'Triggerpunkt- / Faszientherapie (45 Min.)', price: 'CHF 100' },
      { name: '10er-Abo Massage (10 × 60 Min.)', price: "CHF 1'125" },
    ],
  },
  {
    category: 'Sport & Personal Training',
    items: [
      { name: 'Personal Training (60 Min.)', price: 'CHF 120' },
      { name: 'Bewegungs- & Haltungsanalyse (75 Min.)', price: 'CHF 160' },
      { name: '10er-Abo Personal Training (10 × 60 Min.)', price: "CHF 1'100" },
    ],
  },
  {
    category: 'Ernährungsberatung',
    items: [
      { name: 'Ernährungsberatung Erstgespräch (75 Min.)', price: 'CHF 150' },
      { name: 'Ernährungsberatung Folgetermin (45 Min.)', price: 'CHF 90' },
    ],
  },
  {
    category: 'Programme',
    items: [
      { name: 'Schmerzfrei-Programm (6 Wochen)', price: 'CHF 690' },
      { name: 'Reset-Programm (8 Wochen)', price: "CHF 1'290" },
      { name: 'Performance-Programm (12 Wochen)', price: "CHF 1'890" },
    ],
  },
  {
    category: 'Mitgliedschaften (Monatsabos)',
    items: [
      { name: 'MSE Regular (1× monatlich 60 Min. Massage)', price: 'CHF 195 / Monat' },
      { name: 'MSE All-in-One (2× Massage + 1× Training / Monat)', price: 'CHF 390 / Monat' },
    ],
  },
  {
    category: 'Für Firmen & Vereine',
    items: [
      { name: 'Firmen-Massagetag (Halbtag vor Ort)', price: 'Ab CHF 480 pro Halbtag' },
      { name: 'Firmen-Massagetag (Ganztag vor Ort)', price: 'Ab CHF 890 pro Ganztag' },
      { name: 'Vereinsbetreuung', price: 'Auf Anfrage' },
    ],
  },
];

export const MEMBERSHIPS_DATA = [
  {
    id: 'mse-regular',
    name: 'MSE REGULAR',
    tag: 'Monatliche Betreuung',
    price: 'CHF 195',
    period: 'pro Monat',
    description: 'Für kontinuierliche Schmerzfreiheit und regelmässige Regeneration.',
    features: [
      '1 × Massage à 60 Min. pro Monat',
      'Laufender Übungs- und Dehnungsplan',
      '10% Rabatt auf alle weiteren Einzeltermine',
      'Jederzeit monatlich kündbar',
    ],
  },
  {
    id: 'mse-all-in-one',
    name: 'MSE ALL-IN-ONE',
    tag: 'Ganzheitlich & Nachhaltig',
    price: 'CHF 390',
    period: 'pro Monat',
    popular: true,
    description: 'Dein vollständiges monatliches Paket für Körper, Training und Ernährung.',
    features: [
      '2 × Massage à 60 Min. pro Monat',
      '1 × 1:1 Personal Training pro Monat',
      'Monatlicher Ernährungs- & Ziel-Check',
      'Laufender WhatsApp / Chat-Support',
      '15% Rabatt auf zusätzliche Einheiten',
    ],
  },
];
