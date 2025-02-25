import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Story } from './components/Story';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <Story />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;