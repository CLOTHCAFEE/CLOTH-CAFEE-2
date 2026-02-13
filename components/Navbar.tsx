
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ShieldCheck, User, Sparkles, Snowflake, Sun } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onLogoClick: () => void;
  onAdminClick: () => void;
  onShopClick: () => void;
  onProfileClick: () => void;
  onCartClick: () => void;
  onEliteClick: () => void;
  onWinterClick: () => void;
  onSummerClick: () => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onLogoClick, 
  onAdminClick, 
  onShopClick, 
  onProfileClick,
  onCartClick,
  onEliteClick,
  onWinterClick,
  onSummerClick,
  cartCount,
  searchQuery,
  onSearchChange
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-xl py-2 border-b border-white/5 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between relative h-12">
        
        {/* Left: Mobile Trigger & Desktop Links */}
        <div className="flex-1 flex items-center gap-6">
          <button 
            className="lg:hidden text-white hover:text-accent transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          
          <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
            <button onClick={onLogoClick} className="hover:text-accent transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
            </button>
            <button onClick={onWinterClick} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-sm border border-white/5">
              <Snowflake size={12} /> Winter
            </button>
            <button onClick={onSummerClick} className="flex items-center gap-1.5 hover:text-orange-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-sm border border-white/5">
              <Sun size={12} /> Summer
            </button>
            <button onClick={onEliteClick} className="flex items-center gap-2 text-accent bg-accent/5 border border-accent/20 px-4 py-1.5 rounded-sm hover:bg-accent hover:text-black transition-all font-black">
              <Sparkles size={12} /> Elite
            </button>
          </div>
        </div>

        {/* Center: Brand Logo */}
        <div 
          className={`flex-shrink-0 cursor-pointer group transition-all duration-500 absolute left-1/2 -translate-x-1/2 ${
            isSearchVisible ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
          onClick={onLogoClick}
        >
          <Logo className={`${isScrolled ? 'h-10' : 'h-16'} transition-all duration-500`} showText={!isScrolled} />
        </div>

        {/* Right: Search & Actions */}
        <div className="flex-1 flex items-center justify-end gap-5">
          {/* Search Toggle/Input */}
          <div className={`flex items-center gap-3 transition-all duration-500 ${isSearchVisible ? 'w-full max-w-xs' : 'w-10'}`}>
            <button 
              onClick={() => setIsSearchVisible(!isSearchVisible)} 
              className={`hover:text-accent transition-all p-2 rounded-full hover:bg-white/5 ${isSearchVisible ? 'text-accent' : 'text-white'}`}
            >
              <Search size={20} />
            </button>
            {isSearchVisible && (
              <div className="flex items-center flex-1 bg-white/5 border-b border-white/20 px-2 animate-fade-in">
                <input 
                  autoFocus
                  type="text"
                  placeholder="SEARCH DROPS..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-transparent border-none outline-none text-[10px] font-bold uppercase tracking-[0.2em] text-white w-full h-8 placeholder:text-zinc-600"
                />
                {searchQuery && (
                  <button onClick={() => onSearchChange('')} className="text-zinc-500 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>
            )}
          </div>

          {!isSearchVisible && (
            <div className="flex items-center gap-4">
              <button 
                onClick={onProfileClick} 
                className="hover:text-accent transition-all p-2 rounded-full hover:bg-white/5"
              >
                <User size={20} />
              </button>
              <button 
                onClick={onCartClick} 
                className="relative group p-2 rounded-full hover:bg-white/5"
              >
                <ShoppingBag size={20} className="group-hover:text-accent transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-accent text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[60] flex flex-col transition-all duration-700 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-8 flex justify-between items-center border-b border-white/5">
          <Logo className="h-10" showText={false} />
          <button onClick={() => setIsMenuOpen(false)} className="text-white bg-white/5 p-3 rounded-full hover:bg-accent hover:text-black transition-all">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center gap-10 text-4xl font-heading font-bold uppercase italic tracking-tighter overflow-y-auto py-10">
          <button className="hover:text-accent transition-colors" onClick={() => { setIsMenuOpen(false); onLogoClick(); }}>Home Hub</button>
          <button className="hover:text-blue-400 transition-colors" onClick={() => { setIsMenuOpen(false); onWinterClick(); }}>Winter Drops</button>
          <button className="hover:text-orange-400 transition-colors" onClick={() => { setIsMenuOpen(false); onSummerClick(); }}>Summer Fits</button>
          <button className="text-accent hover:text-white transition-colors" onClick={() => { setIsMenuOpen(false); onEliteClick(); }}>Elite Circle</button>
          {/* Fixed: Changing onShopNow to onShopClick to match interface */}
          <button className="hover:text-accent transition-colors" onClick={() => { setIsMenuOpen(false); onShopClick(); }}>All Catalog</button>
          <button className="hover:text-accent transition-colors" onClick={() => { setIsMenuOpen(false); onProfileClick(); }}>User Dashboard</button>
        </div>

        <div className="p-10 border-t border-white/5 flex flex-col gap-4">
           <button 
             onClick={() => { setIsMenuOpen(false); onAdminClick(); }}
             className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-black transition-all"
           >
             <ShieldCheck size={18} /> Admin Infrastructure
           </button>
           <p className="text-[8px] text-center text-zinc-600 uppercase font-bold tracking-[0.4em]">Brewing Style Daily // Est. 2025</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
