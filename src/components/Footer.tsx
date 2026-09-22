import React from 'react';
import { Logo } from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';
import { DEFAULT_PRACTICE_INFO } from '../data/mseData';

interface FooterProps {
  locationCity: string;
  onOpenModal: (modalId: 'preise' | 'impressum' | 'datenschutz' | 'kontakt') => void;
  onOpenSecretAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ locationCity, onOpenModal, onOpenSecretAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 border-t-4 border-green pb-24 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Practice Info */}
          <div className="md:col-span-1">
            <div className="bg-white px-4 py-3 rounded-2xl inline-block mb-6 shadow-sm">
              <Logo className="h-12 sm:h-14 w-auto" />
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green shrink-0" />
                <span>{DEFAULT_PRACTICE_INFO.street}</span>
              </p>
              <p className="pl-6">
                8000 {locationCity} (Schweiz)
              </p>
              <p className="mt-4 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green shrink-0" />
                <a href={`tel:${DEFAULT_PRACTICE_INFO.phone}`} className="hover:text-white transition-colors">
                  {DEFAULT_PRACTICE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green shrink-0" />
                <a href={`mailto:${DEFAULT_PRACTICE_INFO.email}`} className="hover:text-white transition-colors">
                  {DEFAULT_PRACTICE_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#angebot" className="hover:text-green transition-colors">
                  Angebot &amp; Säulen
                </a>
              </li>
              <li>
                <a href="#programme" className="hover:text-green transition-colors">
                  Programme
                </a>
              </li>
              <li>
                <a href="#firmen" className="hover:text-green transition-colors font-medium text-green-light">
                  Firmen &amp; Vereine
                </a>
              </li>
              <li>
                <a href="#mitgliedschaft" className="hover:text-green transition-colors">
                  Mitgliedschaft
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('preise')}
                  className="hover:text-green transition-colors font-medium text-left cursor-pointer"
                >
                  Preise &amp; Tarife
                </button>
              </li>
              <li>
                <a href="#ueber-uns" className="hover:text-green transition-colors">
                  Über Andrea Szabo
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Rechtliches &amp; Intern
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('kontakt')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Kontakt &amp; Standort
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('impressum')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Impressum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenModal('datenschutz')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Datenschutz
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="#secret"
                  onClick={(e) => {
                    if (onOpenSecretAdmin) {
                      e.preventDefault();
                      onOpenSecretAdmin();
                    }
                  }}
                  className="text-xs text-gray-400 hover:text-green transition-colors flex items-center gap-1.5"
                  title="Kalender verknüpfen und Buchungen verwalten"
                >
                  <span>🔒</span>
                  <span>Secret Kalender-Verwaltung</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Practice Hours */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
              Öffnungszeiten
            </h4>
            <div className="text-xs sm:text-sm text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Montag – Freitag:</span>
                <span className="font-semibold text-gray-200">07:30 – 19:30</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag:</span>
                <span className="font-semibold text-gray-200">08:00 – 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag:</span>
                <span className="text-gray-500">Geschlossen</span>
              </div>
              <p className="pt-2 text-xs text-green font-medium">
                Termine nach vorheriger Vereinbarung
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          &copy; {currentYear} MSE – Massage, Sport &amp; Ernährung | Andrea Szabo. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
};
