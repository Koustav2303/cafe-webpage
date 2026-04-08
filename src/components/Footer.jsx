import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const topContentRef = useRef(null);
  const lettersRef = useRef([]);
  lettersRef.current = [];

  const addToLetters = (el) => {
    if (el && !lettersRef.current.includes(el)) {
      lettersRef.current.push(el);
    }
  };

  // The massive text we want to animate letter by letter
  const brandName = "CAFE AURA";

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%", // Triggers when the top of the footer is 20% from the bottom of the screen
      }
    });

    // 1. Fade and slide up the top content (Newsletter & Links)
    tl.fromTo(
      topContentRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
    )
    
    // 2. Cinematic Staggered Reveal for the massive letters
    .fromTo(
      lettersRef.current,
      { y: 150, opacity: 0, rotateX: -45 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        duration: 1.2, 
        stagger: 0.05, 
        ease: 'back.out(1.2)' 
      },
      "-=0.6" // Start before the top content finishes
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="relative w-full bg-[#050000] border-t border-white/5 pt-20 pb-8 overflow-hidden flex flex-col justify-between"
    >
      
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100vw] h-[50vh] bg-amber-600/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full relative z-10 flex-grow flex flex-col justify-between">
        
        {/* --- TOP HALF: Newsletter & Navigation --- */}
        <div ref={topContentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Newsletter Column */}
          <div className="lg:col-span-5 flex flex-col">
            <h3 className="text-2xl font-black text-white uppercase tracking-widest mb-4">
              Join the <span className="text-amber-500">Culture.</span>
            </h3>
            <p className="text-white/50 font-light text-sm mb-8 max-w-sm leading-relaxed">
              Subscribe to receive exclusive access to rare micro-lot releases, private tasting events, and brewing masterclasses.
            </p>
            
            <form className="relative group max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                required
                className="w-full bg-transparent border-b border-white/20 py-3 pr-12 text-white text-sm font-light focus:outline-none focus:border-transparent peer"
                placeholder="Enter your email address..."
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 peer-focus:scale-x-100"></div>
              <button 
                type="submit"
                className="absolute right-0 bottom-3 text-white/50 hover:text-amber-500 transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">Explore</p>
              <a href="#home" className="text-white/60 hover:text-white text-sm transition-colors">Home</a>
              <a href="#menu" className="text-white/60 hover:text-white text-sm transition-colors">Our Menu</a>
              <a href="#story" className="text-white/60 hover:text-white text-sm transition-colors">The Story</a>
              <a href="#locations" className="text-white/60 hover:text-white text-sm transition-colors">Sanctuaries</a>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">Socials</p>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Instagram</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Twitter (X)</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">LinkedIn</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Spotify Playlist</a>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-4">
              <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">Legal</p>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Shipping</a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM HALF: Massive Typography Reveal --- */}
        <div className="w-full border-b border-white/10 pb-8 mb-8 flex flex-col items-center justify-center overflow-hidden perspective-1000">
          <h1 className="flex justify-between w-full text-[12vw] xl:text-[14vw] font-black text-white leading-none uppercase tracking-tighter select-none cursor-default">
            {brandName.split('').map((char, index) => (
              <span 
                key={index} 
                ref={addToLetters}
                className={`inline-block transition-transform duration-300 hover:text-amber-500 hover:-translate-y-4 ${char === ' ' ? 'w-[4vw]' : ''}`}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* --- Final Copyright Row --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-white/30 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Cafe Aura. All Rights Reserved.</p>
          <p>Designed & Engineered with Precision By KOUSTAV.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;