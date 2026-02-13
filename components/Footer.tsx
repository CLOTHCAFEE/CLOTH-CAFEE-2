
import React from 'react';
import { Instagram, Twitter, MessageCircle, Facebook, Shield } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  logoUrl?: string;
  onAdminClick: () => void;
  onBestSellingClick?: () => void;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
  };
}

const Footer: React.FC<FooterProps> = ({ onAdminClick, onBestSellingClick, socialLinks }) => {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex flex-col items-start">
              <Logo className="h-16 w-fit mb-4" />
              <div className="mt-4">
                <button 
                  onClick={onAdminClick}
                  className="flex items-center gap-2 text-[10px] tracking-[0.3em] font-bold uppercase text-accent border border-accent/20 px-4 py-2 hover:bg-accent hover:text-black transition-all"
                >
                  <Shield size={12} /> Admin Portal
                </button>
                <span className="text-[8px] tracking-[0.2em] font-light mt-2 uppercase text-zinc-600 block">
                  Est. 2025 // Global Brew
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-xs">
              Brewing style since 2025. We believe in high-quality cotton, architectural silhouettes, and the perfect graphic drop.
            </p>
            <div className="flex gap-4">
              <a href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href={socialLinks.twitter || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href={socialLinks.whatsapp || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                <MessageCircle size={18} />
              </a>
              <a href={socialLinks.facebook || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-black transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6">
            <h4 className="font-heading text-xl font-bold uppercase italic text-accent">Menu</h4>
            <ul className="space-y-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              <li>
                <button 
                  onClick={(e) => { e.preventDefault(); onBestSellingClick?.(); }} 
                  className="hover:text-white transition-colors uppercase text-left"
                >
                  Best Selling Product
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Oversized Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Essentials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Limited Drops</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading text-xl font-bold uppercase italic text-accent">Customer Care</h4>
            <ul className="space-y-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Track Shipment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Fabric Care</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Barista</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading text-xl font-bold uppercase italic text-accent">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Trade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2025 CLOTH CAFE APPAREL. ALL RIGHTS RESERVED.</p>
          <p>FRESHLY PRESSED // BREWED FOR THE WORLD</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
