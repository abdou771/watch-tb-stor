import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'mens', name: "Men's Watches", color: '#1A1A1A', textColor: '#F8F9FA' },
  { id: 'womens', name: "Women's Watches", color: '#F4E8D1', textColor: '#4A3B22' },
  { id: 'kids', name: "Kids' Watches", color: '#7B2FBE', textColor: '#FFFFFF' },
  { id: 'smart', name: "Smart Watches", color: '#1E293B', textColor: '#60A5FA' },
  { id: 'luxury', name: "Luxury Watches", color: '#3B0918', textColor: '#EAB308' },
  { id: 'sparkly', name: "Women's Sparkly", color: '#FDE1E3', textColor: '#B91C1C' },
];

const products = {
  mens: [
    { name: "Casio Edifice EFR-573", brand: "Casio", price: "18,500", image: '/images/mens-watch.png', gradientFrom: '#2a2a2a', gradientTo: '#0a0a0a' },
    { name: "Seiko 5 Sports SNZF17", brand: "Seiko", price: "32,000", image: '/images/mens-watch-2.png', gradientFrom: '#1a3a5c', gradientTo: '#0d1f33' },
    { name: "Orient Kamasu Diver", brand: "Orient", price: "45,900", image: '/images/mens-watch-3.png', gradientFrom: '#1a4a2e', gradientTo: '#0d2718' },
    { name: "Citizen Eco-Drive AT", brand: "Citizen", price: "67,000", image: '/images/mens-watch-4.png', gradientFrom: '#3a3a3a', gradientTo: '#1a1a1a' }
  ],
  womens: [
    { name: "Casio Sheen SHE-3049", brand: "Casio", price: "14,200", image: '/images/womens-watch.png', gradientFrom: '#d4a853', gradientTo: '#a8762a' },
    { name: "Michael Kors Runway", brand: "Michael Kors", price: "38,500", image: '/images/womens-watch-2.png', gradientFrom: '#c8963e', gradientTo: '#8a6020' },
    { name: "Fossil Carlie Mini", brand: "Fossil", price: "22,000", image: '/images/womens-watch-3.png', gradientFrom: '#e8c47a', gradientTo: '#c8a040' },
    { name: "Seiko Coutura Solar", brand: "Seiko", price: "52,800", image: '/images/womens-watch-4.png', gradientFrom: '#b8843a', gradientTo: '#7a5018' }
  ],
  kids: [
    { name: "Casio G-Shock Baby", brand: "Casio", price: "9,500", image: '/images/kids-1.png', gradientFrom: '#9b3deb', gradientTo: '#6620b0' },
    { name: "LEGO Kids Time Teacher", brand: "LEGO", price: "4,800", image: '/images/kids-2.png', gradientFrom: '#c84bfc', gradientTo: '#8a1abf' },
    { name: "Tikkers Activity Tracker", brand: "Tikkers", price: "6,200", image: '/images/kids-3.png', gradientFrom: '#5e20a8', gradientTo: '#3d1070' },
    { name: "Sekonda Colour Splash", brand: "Sekonda", price: "7,900", image: '/images/kids-4.png', gradientFrom: '#a040e0', gradientTo: '#702aaa' }
  ],
  smart: [
    { name: "Xiaomi Mi Band 8 Pro", brand: "Xiaomi", price: "22,500", image: '/images/smart-1.png', gradientFrom: '#1e3a5f', gradientTo: '#0a1f3a' },
    { name: "Samsung Galaxy Watch6", brand: "Samsung", price: "68,000", image: '/images/smart-2.png', gradientFrom: '#162d4a', gradientTo: '#0a1a2e' },
    { name: "Huawei Watch GT4", brand: "Huawei", price: "45,200", image: '/images/smart-3.png', gradientFrom: '#1a2a42', gradientTo: '#0d1826' },
    { name: "Apple Watch SE 2nd Gen", brand: "Apple", price: "98,000", image: '/images/smart-4.png', gradientFrom: '#243855', gradientTo: '#10202f' }
  ],
  luxury: [
    { name: "TAG Heuer Carrera", brand: "TAG Heuer", price: "285,000", image: '/images/luxury-watch.png', gradientFrom: '#4a1020', gradientTo: '#1a0008' },
    { name: "Longines Conquest", brand: "Longines", price: "168,000", image: '/images/luxury-2.png', gradientFrom: '#3d0a18', gradientTo: '#200010' },
    { name: "Tissot Le Locle Auto", brand: "Tissot", price: "152,000", image: '/images/luxury-3.png', gradientFrom: '#560c22', gradientTo: '#2a0810' },
    { name: "Rado DiaStar Original", brand: "Rado", price: "345,000", image: '/images/luxury-4.png', gradientFrom: '#420e1c', gradientTo: '#1e0610' }
  ],
  sparkly: [
    { name: "Swarovski Crystalline", brand: "Swarovski", price: "42,000", image: '/images/sparkly-1.png', gradientFrom: '#f8b4bc', gradientTo: '#e06070' },
    { name: "Anne Klein Diamond", brand: "Anne Klein", price: "18,500", image: '/images/sparkly-2.png', gradientFrom: '#fcc8cc', gradientTo: '#e88090' },
    { name: "Guess W0149L3 Crystal", brand: "Guess", price: "28,900", image: '/images/sparkly-3.png', gradientFrom: '#f4a0b0', gradientTo: '#d86080' },
    { name: "DKNY Soho Glitz", brand: "DKNY", price: "34,500", image: '/images/sparkly-4.png', gradientFrom: '#f0b8c0', gradientTo: '#e07088' }
  ]
};

const ProductCard = ({ product, index, catTextColor }: {
  product: { name: string; brand: string; price: string; image: string; gradientFrom: string; gradientTo: string };
  index: number;
  catTextColor: string;
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div
      data-testid={`card-product-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex flex-col bg-white/10 backdrop-blur-md rounded-[24px] p-4 shadow-xl border border-white/20 overflow-hidden"
    >
      <div
        className="w-full h-64 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})` }}
      >
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 opacity-60">
            <Clock size={56} style={{ color: catTextColor }} className="group-hover:scale-110 transition-transform duration-500" />
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: catTextColor }}>{product.brand}</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-xs uppercase tracking-wider mb-1 opacity-70" style={{ color: catTextColor }}>{product.brand}</p>
        <h3 className="font-semibold text-lg leading-tight mb-2" style={{ color: catTextColor }}>{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <p className="font-bold text-xl" style={{ color: catTextColor }}>
            {product.price} <span className="text-sm opacity-80">DZD</span>
          </p>
          <Button
            data-testid={`button-cart-${index}`}
            variant="secondary"
            size="sm"
            className="rounded-full shadow-md bg-white/20 hover:bg-white/40 text-inherit backdrop-blur"
            style={{ color: catTextColor }}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const Section = ({ category, productsList }: {
  category: { id: string; name: string; color: string; textColor: string };
  productsList: { name: string; brand: string; price: string; image: string; gradientFrom: string; gradientTo: string }[];
}) => (
  <section
    id={category.id}
    className="py-24 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center relative overflow-hidden"
    style={{ backgroundColor: category.color }}
  >
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16 max-w-4xl"
    >
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: category.textColor }}>
        {category.name}
      </h2>
      <div className="h-1 w-24 rounded-full" style={{ backgroundColor: category.textColor, opacity: 0.5 }}></div>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {productsList.map((product, idx) => (
        <ProductCard
          key={product.name}
          product={product}
          index={idx}
          catTextColor={category.textColor}
        />
      ))}
    </div>
  </section>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(categories[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F0F2F5] min-h-screen text-gray-900 font-sans selection:bg-gray-800 selection:text-white">
      
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#1E2024]/90 backdrop-blur-xl border-b border-white/10 py-4 px-6 md:px-12 flex items-center justify-between shadow-2xl shadow-black/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Clock className="text-white" size={28} />
          <span className="text-2xl font-bold tracking-tighter text-white">Watch TB</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === cat.id 
                  ? 'bg-white text-black shadow-lg scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <Button variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white hidden sm:flex">
          <ShoppingCart className="mr-2" size={16} />
          Cart (0)
        </Button>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-[#E8EAED] to-[#D1D5DB]">
        
        {/* Animated decorative circles */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-64 -right-64 w-[800px] h-[800px] rounded-full border border-gray-300/50"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-96 -left-64 w-[1000px] h-[1000px] rounded-full border border-gray-300/30"
        />

        <div className="max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-gray-900/5 text-gray-800 font-semibold text-sm mb-6 tracking-widest uppercase border border-gray-900/10">
              Algeria's Premier Boutique
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900">
              Timeless <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                Elegance.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Curated luxury timepieces for those who value precision, craftsmanship, and bold style.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="rounded-full bg-gray-900 hover:bg-black text-white px-8 h-14 text-lg shadow-xl shadow-gray-900/20"
                onClick={() => scrollTo('mens')}
              >
                Explore Collection
                <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-gray-300 bg-white/50 hover:bg-white text-gray-900 px-8 h-14 text-lg backdrop-blur-sm"
              >
                Our Story
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Float */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-tr from-gray-400/20 to-gray-100/10 rounded-full backdrop-blur-3xl border border-white/50 flex items-center justify-center shadow-2xl"
          >
            <Clock size={200} className="text-gray-800/20 drop-shadow-lg" />
          </motion.div>
        </motion.div>
      </section>

      {/* Categories Sections */}
      {categories.map(cat => (
        <Section key={cat.id} category={cat} productsList={products[cat.id]} />
      ))}

      {/* Footer / Welcome */}
      <footer className="bg-[#111214] text-white py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Clock size={48} className="mx-auto mb-8 text-gray-500" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Welcome to Watch TB</h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 font-light">
            Your premier destination for exceptional timepieces. Whether you're looking for elegance, precision, or a bold statement, we have the perfect watch for every wrist. Discover timeless craftsmanship from the world's finest watchmakers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-16 border-t border-white/10 pt-16">
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Visit Us</h4>
              <p className="text-gray-400">123 Luxury Avenue<br/>Algiers, Algeria 16000</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
              <p className="text-gray-400">contact@watchtb.dz<br/>+213 555 123 456</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Hours</h4>
              <p className="text-gray-400">Mon - Sat: 10:00 - 20:00<br/>Sunday: Closed</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Watch TB. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}