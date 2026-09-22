import React from 'react';
import { AlertCircle, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy/5 text-navy text-xs md:text-sm font-bold mb-4">
          <AlertCircle className="w-4 h-4 text-green" />
          <span>Ursachen verstehen</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-12">
          Kennst du das?
        </h2>

        <div className="space-y-6 text-lg md:text-xl text-gray-600 font-medium mb-16">
          <p className="p-3 hover:bg-lightgray/70 rounded-2xl transition-colors">
            Dein Nacken oder Rücken ist ständig verspannt.
          </p>
          <p className="p-3 hover:bg-lightgray/70 rounded-2xl transition-colors">
            Die Massage hilft – aber nach ein paar Tagen ist alles wieder da.
          </p>
          <p className="p-3 hover:bg-lightgray/70 rounded-2xl transition-colors">
            Du trainierst, kommst aber nicht richtig weiter.
          </p>
          <p className="p-3 hover:bg-lightgray/70 rounded-2xl transition-colors">
            Du möchtest Gewicht verlieren, weisst aber nicht, wo anfangen.
          </p>
        </div>

        <div className="bg-lightgray p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-36 h-36 bg-green/10 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-navy/5 rounded-full -ml-12 -mb-12 pointer-events-none"></div>

          <h3 className="text-2xl md:text-3xl font-black text-navy mb-4 relative z-10">
            Das Problem ist oft nicht nur ein einzelner Bereich.
          </h3>
          <p className="text-xl text-gray-800 font-bold mb-2 relative z-10">
            Dein Körper funktioniert als Ganzes.
          </p>
          <p className="text-lg text-gray-600 relative z-10 max-w-xl mx-auto">
            Deshalb arbeitet MSE auch ganzheitlich: Wir verbinden manuelle Behandlung mit zielgerichteter Bewegung und passender Ernährung.
          </p>
        </div>
      </div>
    </section>
  );
};
