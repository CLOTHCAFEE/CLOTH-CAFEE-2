
import React, { useState } from 'react';
import { Coffee, CheckCircle2, Loader2 } from 'lucide-react';

const FORMSPREE_URL = "https://formspree.io/f/xqedpdge";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: "New Newsletter Subscription",
          email: email,
          source: "Website Newsletter Form"
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Newsletter failed");
      }
    } catch (error) {
      console.error("Newsletter Error:", error);
      alert("Could not subscribe at this time. Please try again later.");
      setStatus('idle');
    }
  };

  return (
    <section className="bg-accent text-black py-24">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="font-heading text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            Get Your <br /> Fix
          </h2>
          <p className="text-black font-semibold uppercase tracking-widest text-sm max-w-md">
            Join the Cloth Cafe loyalty program. Be the first to know about new drops, secret menus, and limited-run T-shirts.
          </p>
        </div>

        <div className="relative">
          {status === 'success' ? (
            <div className="bg-black text-accent p-10 flex flex-col items-center justify-center space-y-4 animate-fade-in border border-black shadow-2xl">
              <CheckCircle2 size={48} />
              <h3 className="font-heading text-2xl font-bold uppercase tracking-widest">Subscription Secured!</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Check your inbox for our next drop.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-1 bg-black text-white px-8 py-6 uppercase font-heading font-bold tracking-widest focus:outline-none placeholder:text-zinc-600 border border-transparent focus:border-black/20"
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="bg-black text-accent p-6 hover:bg-zinc-900 transition-colors flex items-center justify-center min-w-[80px]"
              >
                {status === 'loading' ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <Coffee size={24} />
                )}
              </button>
            </form>
          )}
          <p className="mt-4 text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">
            By joining, you agree to receive our weekly style brews.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
