import React from 'react';
import { MessageSquare, Sparkles, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface StartpaketProps {
  onBookStartpaket: () => void;
}

export const Startpaket: React.FC<StartpaketProps> = ({ onBookStartpaket }) => {
  return (
    <section id="startpaket" className="py-20 md:py-28 bg-navy text-white relative overflow-hidden scroll-mt-16">
      {/* Decorative ambient lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-navy-light/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white text-navy rounded-3xl shadow-2xl overflow-hidden md:flex border-4 border-white/10">
          <div className="p-8 sm:p-10 md:p-14 md:w-2/3 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 bg-green/10 text-green font-bold px-4 py-1.5 rounded-full mb-4 self-start text-xs uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kennenlern-Angebot</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight">
              MSE Startpaket
            </h2>
            <p className="text-xl font-bold text-gray-500 mb-6">
              Dein Einstieg in die Veränderung.
            </p>

            <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
              Du bist dir noch nicht sicher, wo du anfangen sollst?<br className="hidden sm:inline" />
              Lass uns gemeinsam auf deine aktuelle Situation schauen und deinem Körper die nötige Aufmerksamkeit schenken.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green/15 text-green flex items-center justify-center mr-4 mt-0.5 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-1 text-navy">
                    30 Min. persönliches Gespräch
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Ziele, Beschwerden, Bewegung, Ernährung.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-green/15 text-green flex items-center justify-center mr-4 mt-0.5 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-1 text-navy">
                    30 Min. Massage
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Gezielte Behandlung oder Regeneration.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-lightgray p-8 sm:p-10 md:p-14 md:w-1/3 flex flex-col justify-center items-center text-center border-t md:border-t-0 md:border-l border-gray-200">
            <div className="mb-3">
              <span className="text-green uppercase tracking-wider text-xs font-black bg-green/10 px-3 py-1 rounded-full">
                Kennenlern-Angebot
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-navy mb-3 tracking-tight">
              Gespräch &amp; Massage
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-8">
              Einmaliges Kennenlern-Paket für Neukunden.
            </p>

            <button
              type="button"
              onClick={onBookStartpaket}
              className="w-full bg-green text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-navy transition-all shadow-lg transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Jetzt sichern</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
