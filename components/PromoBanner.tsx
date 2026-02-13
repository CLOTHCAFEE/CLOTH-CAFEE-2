
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  title: string;
  imageUrl: string;
  onAction: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ title, imageUrl, onAction }) => {
  return (
    <section className="relative w-full h-[60vh] flex items-center overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl} 
          alt="Promotional Banner" 
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-4">
             <div className="h-[2px] w-12 bg-accent" />
             <span className="text-accent font-heading font-bold uppercase tracking-[0.4em] text-xs">Exclusives</span>
          </div>
          <h2 className="font-heading text-5xl md:text-7xl font-bold uppercase italic tracking-tighter leading-tight text-white drop-shadow-2xl">
            {title}
          </h2>
          <button 
            onClick={onAction}
            className="group flex items-center gap-4 text-white font-heading font-bold uppercase tracking-widest text-sm border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-all"
          >
            Explore Drop <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Decorative side text */}
      <div className="absolute right-0 bottom-0 py-12 px-6 hidden md:block">
        <span className="text-[12rem] font-heading font-black text-white/5 uppercase italic tracking-tighter leading-none select-none">
          CAFE
        </span>
      </div>
    </section>
  );
};

export default PromoBanner;
