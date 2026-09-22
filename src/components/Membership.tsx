import React from 'react';
import { Check, Repeat, Sparkles, ArrowRight } from 'lucide-react';
import { MEMBERSHIPS_DATA } from '../data/mseData';

interface MembershipProps {
  onBookMembership: (membershipName: string, price: string) => void;
}

export const Membership: React.FC<MembershipProps> = ({ onBookMembership }) => {
  return (
    <section id="mitgliedschaft" className="py-20 md:py-28 bg-lightgray border-t border-gray-200/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-navy font-bold text-xs uppercase tracking-wider mb-3 shadow-xs">
            <Repeat className="w-3.5 h-3.5 text-green" />
            <span>Nachhaltige Kontinuität</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            MSE Mitgliedschaft & Abos
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            Gesundheit ist kein Einmal-Projekt. Mit unseren Monatsmitgliedschaften sicherst du dir regelmässige Regeneration und planbare Betreuung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {MEMBERSHIPS_DATA.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 sm:p-10 flex flex-col transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-white border-2 border-green shadow-xl'
                    : 'bg-white border border-gray-200/80 shadow-sm hover:shadow-md'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 right-8 bg-green text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Empfehlung</span>
                  </div>
                )}

                <div className="mb-6">
                  <span className="text-xs font-bold text-green uppercase tracking-wider">{plan.tag}</span>
                  <h3 className="text-2xl font-black text-navy mt-1">{plan.name}</h3>
                  <div className="mt-3 inline-flex items-center gap-2 bg-navy/5 text-navy font-bold text-xs uppercase px-3 py-1.5 rounded-lg">
                    <span>Monatliche Begleitung</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{plan.description}</p>
                </div>

                <ul className="space-y-3.5 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm sm:text-base text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-green/15 text-green flex items-center justify-center mr-3 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onBookMembership(plan.name, plan.price)}
                  className={`w-full py-3.5 px-4 font-bold rounded-xl text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isPopular
                      ? 'bg-green text-white hover:bg-navy shadow-md'
                      : 'bg-lightgray text-navy hover:bg-navy hover:text-white'
                  }`}
                >
                  <span>{plan.name} anfragen</span>
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
