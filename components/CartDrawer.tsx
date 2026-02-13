
import React from 'react';
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemove: (cartId: string) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove,
  onCheckout 
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalPoints = items.reduce((sum, item) => sum + (item.product.rewardPoints * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand border-l border-white/10 z-[101] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-accent" />
              <h2 className="font-heading text-2xl font-bold uppercase italic tracking-tight">Your Bag</h2>
            </div>
            <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} className="text-zinc-700" />
                </div>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Your bag is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="bg-accent text-black font-heading font-bold px-8 py-3 uppercase tracking-widest text-xs hover:bg-white transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.cartId} className="flex gap-4 group">
                  <div className="w-24 h-32 bg-zinc-900 flex-shrink-0 border border-white/5 overflow-hidden">
                    <img src={item.product.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-heading font-bold uppercase italic tracking-tight text-white leading-tight">{item.product.name}</h4>
                        <button 
                          onClick={() => onRemove(item.cartId)}
                          className="text-zinc-600 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Size: {item.size}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-white/10 rounded-sm">
                        <button 
                          onClick={() => onUpdateQuantity(item.cartId, -1)}
                          className="p-1.5 text-zinc-500 hover:text-white"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-[10px] font-bold text-white">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.cartId, 1)}
                          className="p-1.5 text-zinc-500 hover:text-white"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-heading text-lg font-bold text-accent">৳{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/40 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>Subtotal</span>
                  <span className="text-white">৳{subtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-accent/80">
                  <span className="flex items-center gap-2"><Sparkles size={12} /> Points Earned</span>
                  <span>+{totalPoints} Pts</span>
                </div>
                <div className="h-[1px] bg-white/5 w-full my-4" />
                <div className="flex justify-between items-center text-2xl font-heading font-bold">
                  <span className="uppercase italic tracking-tighter">Total</span>
                  <span className="text-accent">৳{subtotal}</span>
                </div>
              </div>

              <button 
                onClick={onCheckout}
                className="w-full bg-white text-black font-heading font-bold py-5 uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-accent transition-all group shadow-2xl"
              >
                Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-600">
                Secure SSL Encryption // Free Shipping Over ৳1000
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
