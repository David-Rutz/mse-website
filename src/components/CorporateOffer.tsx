import React from 'react';
import { Building2, Users, CheckCircle, Calendar, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { CORPORATE_OFFER } from '../data/mseData';

interface CorporateOfferProps {
  onBookCorporate: (name: string, price: string) => void;
}

export const CorporateOffer: React.FC<CorporateOfferProps> = ({ onBookCorporate }) => {
  return (
    <section id="firmen" className="py-20 md:py-28 bg-white border-t border-gray-100 scroll-mt-20 relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-navy/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/10 text-green font-bold text-xs uppercase tracking-widest mb-4">
            <Building2 className="w-4 h-4" />
            <span>{CORPORATE_OFFER.tag}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-navy tracking-tight mb-4">
            {CORPORATE_OFFER.title}
          </h2>

          <p className="text-2xl sm:text-3xl font-bold text-green mb-4">
            {CORPORATE_OFFER.lead}
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gesunde, schmerzfreie und motivierte Mitarbeitende oder Vereinsmitglieder. Andrea Szabo bringt professionelle mobile Massage direkt zu euch vor Ort.
          </p>
        </div>

        {/* Featured Offer Card */}
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-navy via-navy to-navy-light rounded-[32px] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-navy/30">
          {/* Subtle Decorative Badge */}
          <div className="absolute top-0 right-0 bg-green text-white font-bold text-xs uppercase tracking-wider px-6 py-2 rounded-bl-2xl shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vor-Ort Service</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Offer Details */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-green-light block mb-2">
                Exklusives Firmenangebot
              </span>

              <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                {CORPORATE_OFFER.offerName}
              </h3>

              <p className="text-xl font-medium text-gray-200 mb-6">
                {CORPORATE_OFFER.description}
              </p>

              {/* Benefits Checklist */}
              <ul className="space-y-3 mb-8">
                {CORPORATE_OFFER.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-100">
                    <CheckCircle className="w-5 h-5 text-green-light shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-green-light" />
                  <span>Flexible Zeiteinteilung</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Users className="w-4 h-4 text-green-light" />
                  <span>Für KMU, Start-ups &amp; Vereine</span>
                </div>
              </div>
            </div>

            {/* Price & Action Box */}
            <div className="lg:col-span-5 bg-white text-navy rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between text-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-green bg-green/10 px-3 py-1 rounded-full inline-block mb-3">
                  Firmen- &amp; Vereins-Service
                </span>
                <div className="text-2xl sm:text-3xl font-black text-navy tracking-tight mb-2">
                  Einsatz vor Ort
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 pb-6 border-b border-gray-100">
                  Inkl. Vorbereitung, mobilem Therapiestuhl/Liege &amp; Verbrauchsmaterial. Individuelle Ganztages- oder Regel-Tarife auf Anfrage.
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={() => onBookCorporate(CORPORATE_OFFER.offerName, CORPORATE_OFFER.fullPriceText)}
                  className="w-full bg-green hover:bg-navy text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-base cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Massagetag anfragen</span>
                </button>
                <a
                  href={`mailto:info@mse.ch?subject=${encodeURIComponent('Anfrage Firmen-Massagetag')}`}
                  className="w-full block text-xs font-semibold text-gray-500 hover:text-navy transition-colors py-1"
                >
                  Oder direkt per E-Mail anfragen &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
