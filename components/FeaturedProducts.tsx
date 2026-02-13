
import React from 'react';
import { Product } from '../types';
import { Sparkles, ShoppingCart, Flame, SearchX } from 'lucide-react';

const ProductCard: React.FC<{ 
  product: Product; 
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}> = ({ product, onClick, onAddToCart }) => (
  <div className="group space-y-4 cursor-pointer" onClick={onClick}>
    <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 rounded-sm">
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Badges Container */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {product.isBestSelling && (
          <div className="bg-orange-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-2xl animate-pulse">
            <Flame size={12} fill="currentColor" /> Best Selling
          </div>
        )}
        <div className="bg-black text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest border border-white/20 backdrop-blur-md">
          Special Brew
        </div>
        <div className="bg-accent text-black px-2 py-1 text-[8px] font-black uppercase tracking-tighter flex items-center gap-1 shadow-xl">
          <Sparkles size={10} /> +{product.rewardPoints} Points
        </div>
      </div>

      {/* Add to Cart Quick Button */}
      <button 
        onClick={onAddToCart}
        className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:scale-110 shadow-2xl z-10"
        title="Quick Add to Cart"
      >
        <ShoppingCart size={18} />
      </button>

      {/* View Details Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="bg-white text-black font-heading font-bold py-3 px-6 uppercase tracking-widest text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform">
          View Details
        </span>
      </div>
    </div>

    <div className="flex justify-between items-start pt-2 px-1">
      <div>
        <h4 className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-accent transition-colors uppercase">
          {product.name}
        </h4>
        <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium mt-1">
          {product.category === 'Hoodies' ? 'Heavyweight Tee' : product.category}
        </p>
      </div>
      <div className="text-right">
        <span className="font-heading text-xl font-bold text-accent block">
          ৳{product.price}
        </span>
      </div>
    </div>
  </div>
);

interface FeaturedProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onViewAll?: () => void;
  title?: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onProductSelect, onQuickAdd, onViewAll, title = "Featured" }) => {
  return (
    <section className="bg-black py-24 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="font-heading text-5xl font-bold uppercase italic tracking-tighter">
            {title === "Best Selling" ? "Best Selling Product" : title} <span className="text-zinc-600">Menu</span>
          </h2>
          {title === "Featured" && onViewAll && (
            <button 
              onClick={onViewAll}
              className="text-sm font-bold uppercase tracking-widest border-b-2 border-accent pb-1 hover:text-accent transition-colors"
            >
              View All Drops
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 flex flex-col items-center justify-center gap-6">
            <SearchX size={48} className="text-zinc-800" />
            <div className="space-y-2">
              <p className="text-zinc-500 uppercase font-bold tracking-[0.3em] text-xs">No matching drops found in the cafe.</p>
              <p className="text-[10px] text-zinc-700 uppercase font-bold tracking-widest">Try adjusting your search terms or exploring all collections.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={() => onProductSelect(product)} 
                onAddToCart={(e) => {
                  e.stopPropagation();
                  onQuickAdd(product);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
