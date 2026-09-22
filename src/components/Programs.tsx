import React from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import { PROGRAMS_DATA } from '../data/mseData';
import { ProgramItem } from '../types';

interface ProgramsProps {
  onSelectProgram: (program: ProgramItem) => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onSelectProgram }) => {
  return (
    <section id="programme" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/5 text-navy font-bold text-xs uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-green fill-green" />
            <span>Ganzheitliche Begleitung</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Programme
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            Einzelne Termine tun gut. Echte Veränderung braucht einen Plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROGRAMS_DATA.map((program) => {
            const isPopular = program.isPopular;

            if (isPopular) {
              return (
                <div
                  key={program.id}
                  className="bg-navy rounded-3xl p-8 shadow-2xl transform lg:-translate-y-4 flex flex-col relative border-4 border-navy transition-transform duration-300"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green text-white px-6 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md whitespace-nowrap">
                    {program.badge || 'Beliebteste Wahl'}
                  </div>

                  <div className="mb-8 mt-4 text-white">
                    <h3 className="text-2xl font-black tracking-tight">{program.name}</h3>
                    <p className="text-green font-bold mb-4">{program.duration}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{program.subtitle}</p>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow text-white">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green/20 text-green flex items-center justify-center mr-3 mt-0.5 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span className="text-sm sm:text-base font-medium text-gray-100">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onSelectProgram(program)}
                    className="w-full py-4 px-4 bg-green text-white font-bold rounded-xl text-center hover:bg-white hover:text-navy transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>MSE Reset starten</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            }

            return (
              <div
                key={program.id}
                className="bg-lightgray rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-navy tracking-tight">{program.name}</h3>
                  <p className="text-gray-500 font-bold mb-4">{program.duration}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{program.subtitle}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-green/15 text-green flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelectProgram(program)}
                  className="w-full py-4 px-4 bg-white border-2 border-navy text-navy font-bold rounded-xl text-center hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{program.name === 'SCHMERZFREI' ? 'Schmerzfrei starten' : 'Performance starten'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
