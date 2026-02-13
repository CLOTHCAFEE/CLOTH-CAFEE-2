
import React, { useState } from 'react';
import { CartItem, Order, PaymentMethod, Member } from '../types';
import { ArrowLeft, CheckCircle, Truck, User, MapPin, Phone, Mail, CreditCard, Banknote, ShieldCheck, Sparkles, Minus, Plus, ShoppingBag, Crown, Ticket, MessageSquare, Info, ArrowRight, Building2 } from 'lucide-react';

interface CheckoutPageProps {
  logoUrl?: string;
  items: CartItem[];
  userPoints: number;
  activeMembers: Member[];
  onOrderCreated: (order: Order) => void;
  onCancel: () => void;
}

const FORMSPREE_URL = "https://formspree.io/f/xqedpdge";

const CheckoutPage: React.FC<CheckoutPageProps> = ({ logoUrl, items, userPoints, activeMembers, onOrderCreated, onCancel }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    altPhone: '',
    address: '',
    thana: '',
    district: '',
    area: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [transactionId, setTransactionId] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [membershipCodeInput, setMembershipCodeInput] = useState('');
  const [isEliteValidated, setIsEliteValidated] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalEarnablePoints = items.reduce((sum, item) => sum + (item.product.rewardPoints * item.quantity), 0);
  
  const handleValidateCode = () => {
    const isValid = activeMembers.some(m => m.membershipCode.toUpperCase() === membershipCodeInput.toUpperCase());
    if (isValid) {
      setIsEliteValidated(true);
      alert("Elite Access Code Applied: 10% Discount Activated.");
    } else {
      setIsEliteValidated(false);
      alert("Invalid Code. Please check your Elite Membership Registry.");
    }
  };
  
  const eliteDiscount = isEliteValidated ? Math.floor(subtotal * 0.1) : 0;
  const maxRedeemablePoints = Math.min(userPoints, (subtotal - eliteDiscount) * 100);
  const pointsDiscountAmount = usePoints ? Math.floor(maxRedeemablePoints / 100) : 0;
  const finalPrice = subtotal - eliteDiscount - pointsDiscountAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod !== 'COD' && !transactionId) {
      alert("Please provide the Transaction ID for verification.");
      return;
    }

    setStep('processing');
    
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      altPhone: formData.altPhone,
      address: formData.address,
      thana: formData.thana,
      district: formData.district,
      area: formData.area,
      instructions: formData.instructions,
      items: items,
      totalPrice: finalPrice,
      status: 'Pending',
      paymentMethod: paymentMethod,
      transactionId: transactionId || undefined,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      pointsEarned: totalEarnablePoints,
      pointsUsed: usePoints ? maxRedeemablePoints : 0,
      discountAmount: pointsDiscountAmount + eliteDiscount
    };

    // Prepare data for Formspree
    const itemsSummary = items.map(i => `${i.product.name} (Size: ${i.size}) x${i.quantity}`).join(', ');
    const formspreeData = {
      orderId: newOrder.id,
      customer: newOrder.customerName,
      email: newOrder.email,
      phone: newOrder.phone,
      address: `${newOrder.address}, ${newOrder.area}, ${newOrder.thana}, ${newOrder.district}`,
      items: itemsSummary,
      totalPrice: `৳${newOrder.totalPrice}`,
      payment: newOrder.paymentMethod,
      trxId: newOrder.transactionId || 'COD',
      instructions: newOrder.instructions || 'None'
    };

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formspreeData)
      });

      if (response.ok) {
        onOrderCreated(newOrder);
        setStep('success');
      } else {
        throw new Error("Formspree submisson failed");
      }
    } catch (error) {
      console.error("Order Submission Error:", error);
      alert("Something went wrong while securing your drop. Please try again.");
      setStep('payment');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (step === 'success') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-fade-in py-24">
        <div className="w-32 h-32 mb-8 bg-zinc-900 border border-accent/20 flex items-center justify-center rounded-sm shadow-2xl overflow-hidden">
          {logoUrl ? <img src={logoUrl} className="w-full h-full object-contain" alt="Success" /> : <CheckCircle size={48} className="text-accent" />}
        </div>
        <h2 className="font-heading text-6xl font-bold uppercase mb-4 tracking-tighter italic text-accent">Style Secured.</h2>
        <p className="text-zinc-400 max-w-md tracking-wide uppercase text-sm mb-4 leading-relaxed font-bold">
          Your drop has been recorded. Our baristas are preparing your freshly pressed gear.
        </p>
        <button 
          onClick={onCancel}
          className="bg-white text-black font-heading font-bold px-12 py-5 uppercase tracking-widest hover:bg-accent transition-all shadow-2xl mt-8"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-7xl">
      <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-8">
        <div>
          <button 
            onClick={step === 'payment' ? () => setStep('shipping') : onCancel}
            className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors uppercase font-bold tracking-widest text-[10px] mb-4 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            {step === 'payment' ? 'Back to Shipping' : 'Cancel Checkout'}
          </button>
          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase italic tracking-tighter leading-none">
            Checkout <span className="text-accent">Portal</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          {step === 'shipping' && (
            <form onSubmit={handleToPayment} className="space-y-12 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <User size={20} className="text-accent" />
                  <h3 className="font-heading text-xl font-bold uppercase tracking-widest text-white">Contact Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                    <input required name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="E.G. JOHN DOE" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="EMAIL@EXAMPLE.COM" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Phone Number</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="017XXXXXXXX" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Alt Phone (Optional)</label>
                    <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleInputChange} placeholder="019XXXXXXXX" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <MapPin size={20} className="text-accent" />
                  <h3 className="font-heading text-xl font-bold uppercase tracking-widest text-white">Shipping Details</h3>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">District / জেলা</label>
                      <input required name="district" value={formData.district} onChange={handleInputChange} placeholder="E.G. DHAKA" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Thana / Upazila / থানা</label>
                      <input required name="thana" value={formData.thana} onChange={handleInputChange} placeholder="E.G. BANANI" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Area / পাড়া</label>
                      <input required name="area" value={formData.area} onChange={handleInputChange} placeholder="E.G. BLOCK-E" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">House / Road / Flat</label>
                      <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="E.G. HOUSE-12, ROAD-5" className="w-full bg-zinc-900/50 border border-white/10 p-4 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Special Instructions (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-zinc-600" size={14} />
                      <textarea name="instructions" value={formData.instructions} onChange={handleInputChange} rows={3} placeholder="E.G. PLEASE CALL BEFORE DELIVERY" className="w-full bg-zinc-900/50 border border-white/10 p-4 pl-12 text-xs uppercase tracking-widest focus:border-accent outline-none transition-all resize-none" />
                    </div>
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-white text-black font-heading font-bold py-6 uppercase tracking-[0.2em] hover:bg-accent transition-all shadow-xl flex items-center justify-center gap-3">
                Continue To Payment <ArrowRight size={20} />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleFinalOrder} className="space-y-8 animate-fade-in">
              <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-sm space-y-4">
                 <div className="flex items-center gap-3 mb-2">
                    <Crown size={20} className="text-accent" />
                    <p className="text-[10px] font-bold uppercase text-accent tracking-widest">Elite Membership Code</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="relative flex-1">
                       <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                       <input 
                         type="text" 
                         value={membershipCodeInput} 
                         onChange={(e) => setMembershipCodeInput(e.target.value)}
                         placeholder="ENTER ACCESS CODE" 
                         className="w-full bg-black border border-white/20 p-4 pl-12 text-xs font-heading font-bold tracking-widest text-white outline-none focus:border-accent" 
                       />
                    </div>
                    <button 
                      type="button" 
                      onClick={handleValidateCode}
                      className="bg-accent text-black px-6 py-4 font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"
                    >
                       Apply Code
                    </button>
                 </div>
                 {isEliteValidated && (
                   <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest animate-fade-in">
                      <CheckCircle size={14} /> 10% Membership Discount Applied
                   </div>
                 )}
              </div>

              {userPoints >= 100 && (
                 <div className="bg-accent/5 border border-accent/20 p-6 rounded-sm space-y-4">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <Sparkles size={24} className="text-accent" />
                          <div>
                             <p className="text-[10px] font-bold uppercase text-accent tracking-widest leading-none">Redeem Points</p>
                             <p className="text-xs font-bold text-white mt-1 uppercase">You have {userPoints} points available</p>
                          </div>
                       </div>
                       <button 
                         type="button"
                         onClick={() => setUsePoints(!usePoints)}
                         className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${usePoints ? 'bg-accent text-black' : 'border border-white/10 text-white hover:border-white'}`}
                       >
                          {usePoints ? 'Points Applied' : 'Use Points'}
                       </button>
                    </div>
                 </div>
              )}

              <div className="space-y-6">
                <h3 className="font-heading text-xl font-bold uppercase tracking-widest text-white/90">Select Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['COD', 'bKash', 'Nagad', 'Rocket'].map((method) => (
                    <label key={method} className={`cursor-pointer border p-6 flex items-center gap-4 transition-all ${paymentMethod === method ? 'bg-white text-black border-white' : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:border-white/30'}`}>
                      <input type="radio" name="payment" className="hidden" onClick={() => setPaymentMethod(method as PaymentMethod)} />
                      {method === 'COD' ? <Banknote size={24} /> : <div className="font-heading font-black text-xl italic">{method}</div>}
                      <span className="font-heading font-bold uppercase text-sm">{method}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod !== 'COD' && (
                  <div className="bg-zinc-900 p-8 border border-accent/20 rounded-sm space-y-6 animate-fade-in relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-accent/5 pointer-events-none -rotate-12 translate-x-1/4">
                       <CreditCard size={180} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-2 text-accent">
                         <Info size={16} />
                         <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Merchant Payment Details</p>
                      </div>
                      <p className="text-sm font-bold text-white uppercase tracking-widest">
                        Send ৳{finalPrice}.00 via <span className="text-accent">{paymentMethod}</span> to: <br />
                        <span className="text-3xl font-heading text-white tracking-tighter">017XXXXXXXX</span>
                      </p>
                      <div className="space-y-2 pt-4">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Transaction ID (TrxID)</label>
                        <input required value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="ENTER TRXID FROM SMS" className="w-full bg-black border border-white/20 p-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-all text-white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-accent text-black font-heading font-bold py-6 uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl">
                PLACE ORDER & PAY ৳{finalPrice}.00
              </button>
            </form>
          )}

          {step === 'processing' && (
             <div className="h-64 flex flex-col items-center justify-center space-y-6 text-center animate-pulse">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="font-heading text-xl uppercase tracking-widest text-zinc-500">Securing your style drop...</p>
             </div>
          )}
        </div>

        <div className="lg:col-span-5">
           <div className="bg-zinc-900/30 border border-white/5 p-8 sticky top-32">
              <h3 className="font-heading text-2xl font-bold uppercase tracking-tight italic border-b border-white/10 pb-6 mb-8">Order Brief</h3>
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 scrollbar-hide">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-4 group">
                    <div className="w-16 h-20 flex-shrink-0 border border-white/10 overflow-hidden">
                      <img src={item.product.imageUrl} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading font-bold uppercase text-sm leading-tight group-hover:text-accent transition-colors">{item.product.name}</h4>
                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Size: <span className="text-white">{item.size}</span> x{item.quantity}</p>
                      <p className="text-accent text-xs font-bold mt-1">৳{item.product.price * item.quantity}.00</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                  <span>Merchant Subtotal</span>
                  <span className="text-white">৳{subtotal}.00</span>
                </div>
                {eliteDiscount > 0 && (
                   <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-accent">
                      <span>Elite Discount (10% Code)</span>
                      <span>-৳{eliteDiscount}.00</span>
                   </div>
                )}
                {pointsDiscountAmount > 0 && (
                   <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-red-500">
                      <span>Points Discount</span>
                      <span>-৳{pointsDiscountAmount}.00</span>
                   </div>
                )}
                <div className="flex justify-between text-3xl font-heading font-bold text-white pt-6 border-t border-white/5 mt-6">
                  <span className="uppercase italic tracking-tighter">Total</span>
                  <span className="text-accent">৳{finalPrice}.00</span>
                </div>
                <div className="bg-accent/10 p-4 flex items-center gap-3 mt-6">
                   <ShieldCheck size={18} className="text-accent" />
                   <span className="text-[8px] font-black text-accent uppercase tracking-widest">Express Shipping & Taxes Included</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
