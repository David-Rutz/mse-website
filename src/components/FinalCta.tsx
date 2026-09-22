import React from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

interface FinalCtaProps {
  onSelectStartpaket: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onSelectStartpaket }) => {
  return (
    <section className="py-24 md:py-32 bg-navy text-white text-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-[700px] h-[350px] bg-green/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          Bereit für den ersten Schritt?
        </h2>

        <p className="text-xl md:text-2xl text-green font-bold mb-8">
          Dein Ziel beginnt nicht nächste Woche.
        </p>

        <div className="bg-white/10 backdrop-blur-sm border border-white/15 inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-2xl mb-10 font-medium text-sm sm:text-base text-gray-100">
          <Clock className="w-4 h-4 text-green" />
          <span>30 Min. Kennenlernen + 30 Min. Massage</span>
        </div>

        <button
          type="button"
          onClick={onSelectStartpaket}
          className="inline-flex items-center gap-3 bg-green text-white px-10 py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-white hover:text-navy transition-all shadow-2xl transform hover:-translate-y-1 mb-6 uppercase tracking-wider cursor-pointer border-2 border-green hover:border-white"
        >
          <span>Startpaket sichern</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs sm:text-sm text-gray-400">
          Unverbindlich und ohne automatische Verlängerung. Nur einmal pro Person.
        </p>
      </div>
    </section>
  );
};
