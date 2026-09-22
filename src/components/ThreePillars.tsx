import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PILLARS_DATA } from '../data/mseData';

interface ThreePillarsProps {
  onOpenModal: (modalId: 'massage' | 'sport' | 'ernaehrung') => void;
}

export const ThreePillars: React.FC<ThreePillarsProps> = ({ onOpenModal }) => {
  return (
    <section id="angebot" className="py-20 md:py-28 bg-lightgray scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-navy font-bold text-xs uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-green" />
            <span>Das MSE Dreiklang-Prinzip</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">
            Drei Bereiche. Ein Ziel.
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Klicke auf die Bereiche, um mehr über Methoden, Behandlungsansätze und deine persönlichen Ziele zu erfahren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* MASSAGE CARD */}
          <div
            onClick={() => onOpenModal('massage')}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer border border-gray-100 transform hover:-translate-y-1"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={PILLARS_DATA.massage.image}
                alt="Massage bei MSE"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Bereich 01
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-navy mb-3">MASSAGE</h3>
              <p className="text-gray-800 font-bold mb-3">{PILLARS_DATA.massage.headline}</p>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {PILLARS_DATA.massage.description}
              </p>
              <div className="inline-flex items-center text-green font-bold group-hover:text-navy transition-colors pt-4 border-t border-gray-100">
                <span>Methoden & Ziele ansehen</span>
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* SPORT CARD */}
          <div
            onClick={() => onOpenModal('sport')}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer border border-gray-100 transform hover:-translate-y-1"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={PILLARS_DATA.sport.image}
                alt="Sport und Training bei MSE"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Bereich 02
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-navy mb-3">SPORT</h3>
              <p className="text-gray-800 font-bold mb-3">{PILLARS_DATA.sport.headline}</p>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {PILLARS_DATA.sport.description}
              </p>
              <div className="inline-flex items-center text-green font-bold group-hover:text-navy transition-colors pt-4 border-t border-gray-100">
                <span>Methoden & Ziele ansehen</span>
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* ERNÄHRUNG CARD */}
          <div
            onClick={() => onOpenModal('ernaehrung')}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer border border-gray-100 transform hover:-translate-y-1"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={PILLARS_DATA.ernaehrung.image}
                alt="Gesunde Ernährung bei MSE"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-300"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Bereich 03
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-black text-navy mb-3">ERNÄHRUNG</h3>
              <p className="text-gray-800 font-bold mb-3">{PILLARS_DATA.ernaehrung.headline}</p>
              <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                {PILLARS_DATA.ernaehrung.description}
              </p>
              <div className="inline-flex items-center text-green font-bold group-hover:text-navy transition-colors pt-4 border-t border-gray-100">
                <span>Methoden & Ziele ansehen</span>
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
