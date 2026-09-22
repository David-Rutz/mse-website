import React from 'react';
import { Check, ShieldCheck, Award, MapPin } from 'lucide-react';

interface TrustBarProps {
  locationCity: string;
}

export const TrustBar: React.FC<TrustBarProps> = ({ locationCity }) => {
  return (
    <section className="bg-navy py-6 text-white border-b-4 border-green shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm md:text-base font-bold text-center">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-green" />
            </div>
            <span>Ganzheitliche Betreuung</span>
          </div>

          <div className="hidden sm:block text-gray-500">•</div>

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
              <Award className="w-4 h-4 text-green" />
            </div>
            <span>Zertifizierte Expertise</span>
          </div>

          <div className="hidden sm:block text-gray-500">•</div>

          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green" />
            </div>
            <span>Zentral in {locationCity}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
