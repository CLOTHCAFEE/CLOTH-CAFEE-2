
import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowLeft, ShoppingBag, Info, PackageOpen, Sparkles } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onProceedToCheckout: (size: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onProceedToCheckout }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleStartCheckout = () => {
    if (product.stock <= 0) {
      alert("Sorry, this item is out of stock!");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    onProceedToCheckout(selectedSize);
  };

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-accent transition-colors uppercase font-bold tracking-widest text-xs mb-12 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Gallery
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image Section */}
        <div className="space-y-6">
          <div className="aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm border border-white/5 shadow-2xl">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-accent font-heading font-bold tracking-[0.3em] text-xs uppercase block">
                {product.stock > 0 ? 'In Stock / Freshly Brewed' : 'Sold Out / Roasting More'}
              </span>
              {product.stock > 0 && (
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded-sm flex items-center gap-1 font-bold uppercase tracking-widest text-zinc-400">
                  <PackageOpen size={10} /> {product.stock} Units Available
                </span>
              )}
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase italic tracking-tighter leading-none mb-4">
              {product.name}
            </h1>
            <div className="flex items-end gap-6">
               <p className="text-4xl font-heading font-bold text-accent">৳{product.price}.00</p>
               <div className="bg-accent/10 border border-accent/20 px-3 py-2 rounded-sm flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-accent" />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Earn {product.rewardPoints} Points</span>
                     <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter mt-1">Redeemable on next drop</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Select Size</span>
                <button className="text-[10px] underline text-zinc-500 hover:text-white uppercase font-bold tracking-widest">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map(size => (
                  <button
                    key={size}
                    disabled={product.stock <= 0}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border flex items-center justify-center font-heading font-bold transition-all disabled:opacity-20 ${
                      selectedSize === size 
                        ? 'bg-accent border-accent text-black' 
                        : 'border-white/20 text-white hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Info size={14} /> Description
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed tracking-wide uppercase font-light">
                Crafted from 280GSM heavyweight organic cotton. Featuring a boxy fit, dropped shoulders, and our signature high-density screen print. Every tee is pre-shrunk and treated with a silicone wash for that premium "cafe soft" feel.
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button 
              onClick={handleStartCheckout}
              disabled={product.stock <= 0}
              className="w-full bg-white text-black font-heading font-bold text-lg py-6 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-accent transition-all transform active:scale-[0.98] disabled:opacity-50 shadow-xl"
            >
              {product.stock <= 0 ? (
                'Out Of Stock'
              ) : (
                <>Proceed To Checkout <ShoppingBag size={20} /></>
              )}
            </button>
            <p className="text-center text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
              Free Express Shipping on Orders Over ৳1000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
