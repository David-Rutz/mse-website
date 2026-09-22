import React from 'react';
import { ANDREA_PORTRAIT } from '../assets/mseAssets';
import { Award, Zap, HeartHandshake } from 'lucide-react';
import { DEFAULT_PRACTICE_INFO } from '../data/mseData';

interface AboutUsProps {
  locationCity: string;
}

export const AboutUs: React.FC<AboutUsProps> = ({ locationCity }) => {
  return (
    <section id="ueber-uns" className="py-20 md:py-32 bg-lightgray border-y border-gray-200 overflow-hidden relative scroll-mt-20">
      <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-green/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-12 gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 mb-16 lg:mb-0 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img
                src={ANDREA_PORTRAIT}
                alt="Andrea Szabo – Gründerin MSE"
                className="w-full h-auto object-cover aspect-[4/5]"
              />
            </div>

            {/* Decorative Badge */}
            <div className="absolute -bottom-8 -right-6 sm:-right-8 z-20 bg-navy text-white p-6 rounded-3xl shadow-xl border-4 border-white flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-green">Andrea Szabo</span>
              <span className="text-xs font-bold text-gray-200 uppercase tracking-wider mt-0.5">Gründerin &amp; Therapeutin</span>
            </div>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-navy font-bold text-xs uppercase tracking-wider mb-4 shadow-xs">
              <HeartHandshake className="w-3.5 h-3.5 text-green" />
              <span>Persönliche Betreuung durch Andrea Szabo</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-navy mb-8 tracking-tight">
              Über Andrea Szabo &amp; MSE
            </h2>

            <div className="prose prose-lg text-gray-700 mb-10">
              <p className="mb-4 text-xl font-medium leading-relaxed">
                Ich bin <b>Andrea Szabo</b> – und MSE ist aus meiner tiefen Überzeugung entstanden, dass Massage, Bewegung und Ernährung untrennbar zusammengehören.
              </p>
              <p className="mb-4 leading-relaxed text-base sm:text-lg text-gray-600">
                Ich begleite Menschen dabei, sich wieder wohl in ihrer Haut zu fühlen, schmerzfrei durch den Tag zu gehen und ihre persönlichen sportlichen und gesundheitlichen Ziele mit Freude zu erreichen. Bei mir gibt es keine starren Dogmen, sondern individuelle Begleitung, die sich nahtlos in dein Leben integriert.
              </p>
              <blockquote className="font-bold text-navy text-lg sm:text-xl border-l-4 border-green pl-6 py-3 my-8 bg-white/70 rounded-r-2xl shadow-xs italic">
                &ldquo;Es geht um einen Weg, der zu dir und deinem Alltag passt und den du mit Freude und Leichtigkeit langfristig gehen kannst.&rdquo;
                <footer className="text-sm font-semibold text-gray-500 mt-2 not-italic">— Andrea Szabo, MSE</footer>
              </blockquote>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                <div className="w-10 h-10 rounded-xl bg-green/15 text-green flex items-center justify-center mr-4 shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1 text-base">Qualifikationen</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {DEFAULT_PRACTICE_INFO.qualifications}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start">
                <div className="w-10 h-10 rounded-xl bg-green/15 text-green flex items-center justify-center mr-4 shrink-0 mt-0.5">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1 text-base">Hintergrund</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {DEFAULT_PRACTICE_INFO.background}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
