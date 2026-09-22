import React from 'react';
import { HERO_IMAGE } from '../assets/mseAssets';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  locationCity: string;
  onSelectStartpaket: () => void;
}

export const Hero: React.FC<HeroProps> = ({ locationCity, onSelectStartpaket }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Andrea Szabo – MSE"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay gradients for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50 md:to-transparent"></div>
        <div className="absolute inset-0 bg-navy/50 md:hidden"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl text-center md:text-left fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-green-light px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-green-light" />
            <span>Massage · Sport · Ernährung von Andrea Szabo</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.12]">
            Ein Körper, in dem du dich<br />
            <span className="text-green">gerne zuhause</span> fühlst.
          </h1>

          <p className="text-xl md:text-2xl font-bold text-gray-100 mb-4 drop-shadow-md">
            Massage, Training und Ernährung aus einer Hand – abgestimmt auf dein Ziel.
          </p>

          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto md:mx-0 font-normal leading-relaxed">
            Für weniger Schmerzen, mehr Energie, bessere Bewegung und mehr Leistung.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
            <a
              href="#startpaket"
              className="w-full sm:w-auto bg-green text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-navy transition-all shadow-xl transform hover:-translate-y-1 text-center border-2 border-green hover:border-white inline-flex items-center justify-center gap-2"
            >
              <span>Startpaket sichern</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#angebot"
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all text-center"
            >
              Unser Ansatz
            </a>
          </div>

          {/* Quick bullet trust points */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-y-2 gap-x-6 justify-center md:justify-start text-xs md:text-sm text-gray-200 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green" /> Kein Ärzte-Hopping
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green" /> Individuelle Abstimmung
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green" /> Nachhaltige Resultate
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
