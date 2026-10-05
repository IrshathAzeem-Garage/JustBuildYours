import React from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import WhatWeBuild from './sections/WhatWeBuild';
import Samples from './sections/Samples';
import Values from './sections/Values';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-primary-text font-sans antialiased selection:bg-primary-text selection:text-white flex flex-col justify-between">
      {/* Sticky Studio Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <WhatWeBuild />
        <Samples />
        <Values />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      {/* Minimal Studio Footer */}
      <Footer />
    </div>
  );
}
