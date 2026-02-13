
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  logoUrl?: string;
  title: string;
  tagline: string;
  backgroundImage?: string;
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ title, tagline, backgroundImage, onShopNow }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage || "https://images.unsplash.com/photo-1550991152-12a20139121b?q=80&w=2070&auto=format&fit=crop"} 
          alt="Streetwear Hero" 
          className="w-full h-full object-cover brightness-[0.4] animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8 max-w-5xl">
        <div className="space-y-4 flex flex-col items-center">
          <Logo 
            className="h-32 md:h-48 mb-6 animate-fade-in opacity-0" 
            style={{ animationDelay: '0.1s' }} 
            showText={false}
          />
          <span className="text-accent font-heading font-bold tracking-[0.4em] uppercase text-sm md:text-base animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            Freshly Pressed Collection // 2025
          </span>
          <h1 className="font-heading text-6xl md:text-9xl font-bold uppercase italic tracking-tighter leading-none animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
            {title}
          </h1>
          <p className="text-zinc-400 font-sans text-sm md:text-lg max-w-2xl mx-auto uppercase tracking-widest font-medium animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
            {tagline}
          </p>
        </div>

        <div className="pt-8 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          <button 
            onClick={onShopNow}
            className="group relative bg-white text-black font-heading font-bold text-lg md:text-xl py-6 px-12 uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-accent"
          >
            <span className="relative z-10 flex items-center gap-3">
              Shop Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
