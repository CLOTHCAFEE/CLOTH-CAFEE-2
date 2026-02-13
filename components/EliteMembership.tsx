
import React from 'react';
import { Sparkles, Zap, ShieldCheck, Crown, ArrowRight, Star, Clock } from 'lucide-react';

interface EliteMembershipProps {
  isElite: boolean;
  onJoin: () => void;
  onBack: () => void;
}

const EliteMembership: React.FC<EliteMembershipProps> = ({ isElite, onJoin, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6 animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-24">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 px-4 py-2 rounded-full mb-4">
            <Crown size={16} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Cloth Cafe Inner Circle</span>
          </div>
          <h1 className="font-heading text-7xl md:text-9xl font-bold uppercase italic tracking-tighter leading-none">
            Elite <span className="text-accent">Member</span>
          </h1>
          <p className="text-zinc-500 uppercase font-bold tracking-[0.4em] text-xs max-w-2xl mx-auto leading-relaxed">
            Not just a membership. A commitment to the culture of freshly pressed style.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-zinc-900/40 border border-white/5 p-10 space-y-6 group hover:border-accent/30 transition-all duration-500">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-sm text-accent group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase italic">Lifetime 10% OFF</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest leading-relaxed">
              Automatic discount applied to every single drop. Forever. No minimum spend required.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-10 space-y-6 group hover:border-accent/30 transition-all duration-500">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-sm text-accent group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase italic">Early Access</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest leading-relaxed">
              Get notified and shop limited drops 2 hours before the public release. Never miss a Grail.
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-10 space-y-6 group hover:border-accent/30 transition-all duration-500">
            <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-sm text-accent group-hover:scale-110 transition-transform">
              <Star size={24} />
            </div>
            <h3 className="font-heading text-2xl font-bold uppercase italic">3X Cafe Points</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest leading-relaxed">
              Earn reward points at triple the speed. More points means more free style for you.
            </p>
          </div>
        </div>

        {/* Call to Action Card */}
        <div className="relative overflow-hidden bg-zinc-900 border border-white/10 p-12 md:p-20 text-center rounded-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <Crown size={64} className="mx-auto text-accent animate-pulse" />
            <div className="space-y-4">
              <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase italic tracking-tighter">
                {isElite ? "Welcome to the Inner Circle" : "Become a Legend"}
              </h2>
              <p className="text-zinc-400 text-sm uppercase tracking-widest leading-relaxed">
                {isElite 
                  ? "Your account is fully activated. Enjoy your permanent 10% discount and exclusive benefits." 
                  : "Join thousands of style enthusiasts who have secured their spot in the Cloth Cafe elite tier."
                }
              </p>
            </div>

            {isElite ? (
              <button 
                onClick={onBack}
                className="bg-white text-black font-heading font-bold px-12 py-6 uppercase tracking-widest text-lg hover:bg-accent transition-all shadow-2xl"
              >
                Continue Shopping
              </button>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={onJoin}
                  className="bg-accent text-black font-heading font-bold px-12 py-6 uppercase tracking-[0.2em] text-lg hover:bg-white transition-all shadow-2xl group flex items-center gap-4 mx-auto"
                >
                  Join For ৳1000/Year <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Secure Payment // Instant Activation</p>
              </div>
            )}
          </div>

          {/* Decorative background elements */}
          <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none">
            <Crown size={300} />
          </div>
        </div>

        <div className="mt-16 text-center">
          <button onClick={onBack} className="text-zinc-600 hover:text-white uppercase font-bold tracking-[0.3em] text-[10px] transition-colors">
            Back to Home Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default EliteMembership;
