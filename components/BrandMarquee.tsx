
import React from 'react';
import { BRANDS } from '../data';

const BrandMarquee: React.FC = () => {
  return (
    <div className="bg-black py-16 border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...BRANDS, ...BRANDS].map((brand, idx) => (
          <div 
            key={`${brand.id}-${idx}`}
            className="flex items-center mx-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default"
          >
            <span className="font-heading text-4xl md:text-6xl font-black tracking-tighter italic mr-4">
              {brand.logo}
            </span>
            <span className="text-accent text-3xl">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandMarquee;
