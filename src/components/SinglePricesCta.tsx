import React from 'react';
import { Tag, ArrowRight } from 'lucide-react';

interface SinglePricesCtaProps {
  onOpenPricesModal: () => void;
}

export const SinglePricesCta: React.FC<SinglePricesCtaProps> = ({ onOpenPricesModal }) => {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lightgray flex items-center justify-center text-navy">
            <Tag className="w-5 h-5 text-green" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-navy">
            Du suchst nur einzelne Termine?
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenPricesModal}
          className="bg-white border-2 border-navy text-navy px-8 py-3.5 rounded-full font-bold hover:bg-navy hover:text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <span>Gesamte Preisliste ansehen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
