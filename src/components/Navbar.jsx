import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Refs
  const menuRef = useRef(null);
  const linkRefs = useRef([]);
  linkRefs.current = [];
  
  const topLineRef = useRef(null);
  const midLineRef = useRef(null);
  const botLineRef = useRef(null);
  
  const tl = useRef(gsap.timeline({ paused: true }));

  const addToRefs = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Initial setup: move the menu off-screen to the top
    gsap.set(menuRef.current, { yPercent: -100, display: 'none' });

    // 1. Hamburger X Animation
    tl.current
      .to(midLineRef.current, { opacity: 0, duration: 0.2 }, 0)
      .to(topLineRef.current, { y: 9, rotation: 45, duration: 0.3, ease: 'power2.inOut' }, 0)
      .to(botLineRef.current, { y: -9, rotation: -45, duration: 0.3, ease: 'power2.inOut' }, 0)

      // 2. Premium Slide-Down Menu Overlay
      .to(menuRef.current, {
        yPercent: 0,
        display: 'flex', // GSAP turns it visible
        duration: 0.7,
        ease: 'power4.inOut'
      }, 0)

      // 3. Springy Staggered Text Reveal
      .fromTo(
        linkRefs.current,
        { y: 60, opacity: 0, rotationX: -20 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'back.out(1.7)' // Adds a cool bounce effect
        },
        "-=0.3" // Starts slightly before the background finishes dropping
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden'; // Lock scrolling
    } else {
      tl.current.reverse();
      document.body.style.overflow = 'auto'; // Unlock scrolling
    }
  }, [isOpen]);

  const navLinks = ['Home', 'Menu', 'Our Story', 'Locations', 'Contact'];

  return (
    <>
      {/* MAIN NAVBAR (z-50) 
        We use backdrop-blur to make it look like frosted glass 
      */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a0303]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="text-2xl font-bold tracking-widest text-amber-500 uppercase cursor-pointer drop-shadow-lg hover:scale-105 transition-transform">
            Cafe<span className="text-white">Aura</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-white/80 hover:text-amber-400 text-sm tracking-wider font-medium transition-all duration-300 relative group"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden flex flex-col justify-between w-8 h-[20px] focus:outline-none"
          >
            <span ref={topLineRef} className="w-full h-[2px] bg-amber-500 origin-center rounded-full"></span>
            <span ref={midLineRef} className="w-full h-[2px] bg-amber-500 rounded-full"></span>
            <span ref={botLineRef} className="w-full h-[2px] bg-amber-500 origin-center rounded-full"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY (z-40) 
        Sits exactly underneath the navbar, taking up the full screen.
        Initial display is 'none' to prevent flashing on load.
      */}
      <div 
        ref={menuRef} 
        style={{ display: 'none' }} 
        className="fixed top-0 left-0 w-full h-[100dvh] bg-[#0a0101]/95 backdrop-blur-xl flex-col justify-center items-center z-40 md:hidden"
      >
        <div className="flex flex-col space-y-10 text-center perspective-1000">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              ref={addToRefs}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-light tracking-wide text-white/90 hover:text-amber-400 hover:scale-110 transition-all duration-300 drop-shadow-[0_0_15px_rgba(245,158,11,0)] hover:drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;