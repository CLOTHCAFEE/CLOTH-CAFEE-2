
import React from 'react';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="font-heading text-5xl font-bold uppercase tracking-tighter italic">
              Categories
            </h2>
            <div className="h-1 w-24 bg-accent" />
          </div>
          <p className="text-zinc-500 max-w-sm text-sm uppercase tracking-widest font-semibold">
            Filtered by aesthetic. Built for performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[700px]">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group relative overflow-hidden rounded-sm cursor-pointer min-h-[400px]"
            >
              <img 
                src={category.imageUrl} 
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-0 left-0 p-10 w-full space-y-4">
                <div className="overflow-hidden">
                  <span className="block text-accent font-heading font-bold uppercase tracking-widest text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    {category.tagline}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="font-heading text-4xl font-bold uppercase italic leading-none">
                    {category.name}
                  </h3>
                  <div className="bg-white p-3 rounded-full text-black transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
