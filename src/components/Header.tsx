import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, MapPin, Calendar, Clock, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenModal: (modalId: 'massage' | 'sport' | 'ernaehrung' | 'preise' | 'booking') => void;
  locationCity: string;
  onChangeLocation: (city: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal, locationCity, onChangeLocation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const swissCities = ['Zürich', 'Winterthur', 'Bern', 'Basel', 'Luzern', 'St. Gallen'];

  return (
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100/60 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <a href="#" className="block focus:outline-none" aria-label="MSE Startseite">
              <Logo className="h-11 sm:h-12 md:h-14 w-auto" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-7 items-center">
            <a href="#angebot" className="text-sm font-bold text-navy hover:text-green transition-colors">
              Angebot
            </a>
            <a href="#programme" className="text-sm font-bold text-navy hover:text-green transition-colors">
              Programme
            </a>
            <a href="#firmen" className="text-sm font-bold text-navy hover:text-green transition-colors">
              Firmen &amp; Vereine
            </a>
            <a href="#mitgliedschaft" className="text-sm font-bold text-navy hover:text-green transition-colors">
              Mitgliedschaft
            </a>
            <button
              id="preise-btn"
              type="button"
              onClick={() => onOpenModal('preise')}
              className="text-sm font-bold text-navy hover:text-green transition-colors cursor-pointer"
            >
              Preise
            </button>
            <a href="#ueber-uns" className="text-sm font-bold text-navy hover:text-green transition-colors">
              Über Andrea
            </a>
            <button
              type="button"
              onClick={() => onOpenModal('booking')}
              className="bg-green text-white px-6 py-2.5 rounded-full font-bold hover:bg-navy transition-all shadow-md transform hover:-translate-y-0.5 text-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Termin buchen</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenModal('booking')}
              className="bg-green text-white text-xs px-3.5 py-2 rounded-full font-bold hover:bg-navy transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Buchen</span>
            </button>
            <button
              id="mobile-menu-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-navy hover:text-green focus:outline-none p-2 rounded-lg"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="lg:hidden bg-white border-t border-gray-100 shadow-xl w-full">
          <div className="px-5 pt-3 pb-6 space-y-2 flex flex-col">
            <a
              href="#angebot"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl"
            >
              Angebot
            </a>
            <a
              href="#programme"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl"
            >
              Programme
            </a>
            <a
              href="#firmen"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl"
            >
              Firmen &amp; Vereine
            </a>
            <a
              href="#mitgliedschaft"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl"
            >
              Mitgliedschaft
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('preise');
              }}
              className="w-full text-left px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl cursor-pointer"
            >
              Preise &amp; Tarife
            </button>
            <a
              href="#ueber-uns"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-bold text-navy hover:bg-lightgray rounded-xl"
            >
              Über Andrea
            </a>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  onOpenModal('booking');
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-green text-white py-3.5 rounded-xl font-bold text-center hover:bg-navy transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Termin buchen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
