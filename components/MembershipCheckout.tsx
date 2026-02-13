
import React, { useState } from 'react';
import { PaymentMethod, MembershipRequest } from '../types';
import { ArrowLeft, CreditCard, ShieldCheck, Crown, Banknote, CheckCircle2 } from 'lucide-react';

interface MembershipCheckoutProps {
  onBack: () => void;
  onSubmit: (request: MembershipRequest) => void;
}

const FORMSPREE_URL = "https://formspree.io/f/xqedpdge";

const MembershipCheckout: React.FC<MembershipCheckoutProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    transactionId: ''
  });
  const [method, setMethod] = useState<PaymentMethod>('bKash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const request: MembershipRequest = {
      id: 'MEM-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      paymentMethod: method,
      transactionId: formData.transactionId,
      status: 'Pending',
      date: new Date().toLocaleDateString()
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `New Elite Membership Request: ${request.id}`,
          type: 'Membership Activation',
          ...request
        })
      });

      if (response.ok) {
        onSubmit(request);
      } else {
        throw new Error("Formspree submisson failed");
      }
    } catch (error) {
      console.error("Membership Submission Error:", error);
      alert("Failed to process request. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24 animate-fade-in max-w-4xl">
      <button onClick={onBack} className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors uppercase font-bold tracking-widest text-[10px] mb-12 group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Membership Info
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-5xl font-bold uppercase italic tracking-tighter">Elite <span className="text-accent">Activation</span></h1>
            <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-[10px]">Secure your spot in the inner circle for ৳1000/year.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input required placeholder="FULL NAME" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white uppercase text-xs tracking-widest outline-none focus:border-accent" />
            <input required type="email" placeholder="EMAIL ADDRESS" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white uppercase text-xs tracking-widest outline-none focus:border-accent" />
            <input required type="tel" placeholder="PHONE NUMBER" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-zinc-900/50 border border-white/10 p-4 text-white uppercase text-xs tracking-widest outline-none focus:border-accent" />
            
            <div className="space-y-4 pt-4">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Select Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                {['bKash', 'Nagad', 'Rocket'].map(m => (
                  <button key={m} type="button" onClick={() => setMethod(m as PaymentMethod)} className={`py-4 border font-heading font-bold uppercase tracking-widest text-xs transition-all ${method === m ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-zinc-500'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-accent/20 p-6 space-y-4">
              <p className="text-[10px] font-bold text-accent uppercase tracking-widest leading-relaxed">
                Send ৳1000 to our {method} Merchant: <br />
                <span className="text-white text-xl font-heading">017XXXXXXXX</span>
              </p>
              <div className="relative">
                <CreditCard className="absolute left-4 top-4 text-zinc-500" size={16} />
                <input required placeholder="TRANSACTION ID (TRXID)" value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})} className="w-full bg-black border border-white/20 p-4 pl-12 text-white uppercase text-xs tracking-widest outline-none focus:border-accent" />
              </div>
            </div>

            <button disabled={isSubmitting} className="w-full bg-accent text-black font-heading font-bold py-6 uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3">
              {isSubmitting ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <><ShieldCheck size={20} /> Request Activation</>}
            </button>
          </form>
        </div>

        <div className="hidden lg:block">
           <div className="bg-zinc-900/30 border border-white/5 p-12 sticky top-32 rounded-sm space-y-8">
              <Crown size={48} className="text-accent" />
              <h3 className="font-heading text-3xl font-bold uppercase italic tracking-tight">Inner Circle Benefits</h3>
              <ul className="space-y-6">
                 {[
                   'Permanent 10% Discount',
                   'Triple Rewards Points',
                   'Early Access to Drops',
                   'Member-Only Events'
                 ].map(b => (
                   <li key={b} className="flex items-center gap-4 text-zinc-400 font-bold uppercase text-[10px] tracking-widest">
                     <CheckCircle2 size={16} className="text-accent" /> {b}
                   </li>
                 ))}
              </ul>
              <div className="pt-8 border-t border-white/5">
                 <p className="text-[8px] text-zinc-600 uppercase font-bold tracking-[0.2em] leading-relaxed">
                   Membership is non-refundable. Verified manually by our baristas within 24 hours.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCheckout;
