
import { Product, Category, Brand } from './types';

export const BRANDS: Brand[] = [
  { id: '1', name: 'PREMIUM COTTON', logo: 'COTTON' },
  { id: '2', name: 'ORGANIC BLEND', logo: 'ORGANIC' },
  { id: '3', name: 'STREET BREW', logo: 'STREET' },
  { id: '4', name: 'CAFE EXCLUSIVE', logo: 'CAFE' },
  { id: '5', name: 'URBAN ROAST', logo: 'ROAST' },
  { id: '6', name: 'SILK TOUCH', logo: 'SILK' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'winter',
    name: 'Winter Collection',
    tagline: 'Stay Warm, Stay Street',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 'graphic',
    name: 'Graphic Drops',
    tagline: 'Wearable Art',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop'
  },
  {
    id: 'essentials',
    name: 'The Essentials',
    tagline: 'Daily Fresh Brew',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1287&auto=format&fit=crop'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'ESPRESSO BLACK OVERSIZED',
    price: 450,
    category: 'T-Shirts',
    collection: 'Summer',
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1287&auto=format&fit=crop',
    stock: 12,
    rewardPoints: 450
  },
  {
    id: 'p2',
    name: 'LATTE CREAM ESSENTIAL',
    price: 350,
    category: 'T-Shirts',
    collection: 'Summer',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop',
    stock: 8,
    rewardPoints: 350
  },
  {
    id: 'p3',
    name: 'MOCHA GRAPHIC TEE',
    price: 550,
    category: 'T-Shirts',
    collection: 'Summer',
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1470&auto=format&fit=crop',
    stock: 5,
    rewardPoints: 550
  },
  {
    id: 'p4',
    name: 'ARCTIC HEAVY HOODIE',
    price: 1200,
    category: 'Hoodies',
    collection: 'Winter',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1287&auto=format&fit=crop',
    stock: 15,
    rewardPoints: 1200,
    isBestSelling: true
  },
  {
    id: 'p5',
    name: 'MIDNIGHT PUFFER JACKET',
    price: 2500,
    category: 'Jackets',
    collection: 'Winter',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1287&auto=format&fit=crop',
    stock: 7,
    rewardPoints: 2500
  },
  {
    id: 'p6',
    name: 'SANDSTORM OVERSIZED',
    price: 450,
    category: 'T-Shirts',
    collection: 'Summer',
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1364&auto=format&fit=crop',
    stock: 20,
    rewardPoints: 450
  }
];
