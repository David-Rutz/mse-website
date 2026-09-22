import React from 'react';
import { LOGO_DARK, LOGO_LIGHT } from '../assets/mseAssets';

interface LogoProps {
  className?: string;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 md:h-12', lightMode = false }) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={lightMode ? LOGO_LIGHT : LOGO_DARK}
        alt="MSE – Massage, Sport & Ernährung"
        className="h-full w-auto max-w-full object-contain"
      />
    </div>
  );
};
