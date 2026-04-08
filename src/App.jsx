import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Story from './components/Story';
import Locations from './components/Locations';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    // The main wrapper sets the global dark background, text color, and 
    // prevents any horizontal scrolling caused by GSAP animations.
    // It also adds a custom amber highlight color when users select text.
    <div className="min-h-screen bg-[#0c0101] text-white overflow-x-hidden selection:bg-amber-500 selection:text-[#0c0101]">
      
      {/* 1. The Fixed Navigation Bar */}
      <Navbar />
      
      {/* 2. The Landing Section (Organized Bento Grid) */}
      <Hero />
      
      {/* 3. The Horizontal Scrolling Signature Menu */}
      <Menu />
      
      {/* 4. The Sticky Split-Screen Story/About Section */}
      <Story />
      
      {/* 5. The Interactive Accordion Map/Locations */}
      <Locations />
      
      {/* 6. The Magnetic Booking Form */}
      <Contact />
      
      {/* 7. The Cinematic GSAP Typography Footer */}
      <Footer />
      
    </div>
  );
}

export default App;