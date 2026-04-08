import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  // --- Master Refs ---
  const sectionRef = useRef(null);
  
  // Left Typography Refs
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Right Fanning Gallery Refs
  const galleryContainerRef = useRef(null);
  const card1Ref = useRef(null); // Bottom card
  const card2Ref = useRef(null); // Middle card
  const card3Ref = useRef(null); // Top card (Main)

  useEffect(() => {
    // --------------------------------------------------------
    // 1. ENTRANCE ANIMATION TIMELINE
    // --------------------------------------------------------
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.2 });

    // Text Reveal (Sliding up from an invisible mask)
    tl.fromTo(
      [titleLine1Ref.current, titleLine2Ref.current],
      { y: 100, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
      { y: 0, opacity: 1, clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.4, stagger: 0.15 }
    )
    
    // Paragraph and Buttons Fade In
    .fromTo(
      [textRef.current, ctaRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2 },
      "-=1"
    )

    // Gallery Cards Drop In (Stacked)
    .fromTo(
      card1Ref.current,
      { y: -150, opacity: 0, rotation: -15 },
      { y: 0, opacity: 1, rotation: -6, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.2"
    )
    .fromTo(
      card2Ref.current,
      { y: -150, opacity: 0, rotation: 10 },
      { y: 0, opacity: 1, rotation: 4, duration: 1.2, ease: "back.out(1.2)" },
      "-=1.0"
    )
    .fromTo(
      card3Ref.current,
      { y: -150, opacity: 0, scale: 1.1 },
      { y: 0, opacity: 1, scale: 1, rotation: -2, duration: 1.2, ease: "back.out(1.2)" },
      "-=0.8"
    );

    // --------------------------------------------------------
    // 2. THE FANNING HOVER INTERACTION
    // --------------------------------------------------------
    const container = galleryContainerRef.current;
    
    const handleMouseEnter = () => {
      // Fan the cards outward
      gsap.to(card1Ref.current, { x: -80, y: 20, rotation: -12, duration: 0.6, ease: "power3.out" });
      gsap.to(card2Ref.current, { x: 80, y: -20, rotation: 12, duration: 0.6, ease: "power3.out" });
      gsap.to(card3Ref.current, { scale: 1.05, duration: 0.6, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      // Return to stacked position
      gsap.to(card1Ref.current, { x: 0, y: 0, rotation: -6, duration: 0.8, ease: "power3.out" });
      gsap.to(card2Ref.current, { x: 0, y: 0, rotation: 4, duration: 0.8, ease: "power3.out" });
      gsap.to(card3Ref.current, { scale: 1, duration: 0.8, ease: "power3.out" });
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="relative w-full min-h-[100dvh] bg-[#120202] overflow-hidden flex items-center pt-24 lg:pt-0"
    >
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 right-0 w-[70vw] h-[70vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0 transform translate-x-1/3 -translate-y-1/3"></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 relative z-10 items-center min-h-[calc(100vh-6rem)] py-12 lg:py-0">
        
        {/* ========================================================= */}
        {/* LEFT COLUMN: ELEGANT TYPOGRAPHY                           */}
        {/* ========================================================= */}
        <div className="flex flex-col justify-center order-2 lg:order-1 relative z-20">
          
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Est. 2018</span>
          </div>
          
          <h1 className="flex flex-col text-white font-black uppercase tracking-tighter">
            <div className="overflow-hidden pb-2">
              <span ref={titleLine1Ref} className="block text-4xl sm:text-5xl lg:text-6xl tracking-wide font-light text-white/90">
                The Fine Art Of
              </span>
            </div>
            <div className="overflow-hidden pb-4">
              <span ref={titleLine2Ref} className="block text-6xl sm:text-7xl lg:text-[5.5rem] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                Roasting.
              </span>
            </div>
          </h1>
          
          <div ref={textRef} className="mt-8 border-l border-amber-500/30 pl-6">
            <p className="text-base lg:text-lg text-white/60 max-w-md font-light leading-relaxed">
              We source the top 1% of single-origin beans globally. Meticulously roasted in-house to deliver unparalleled clarity, depth, and perfection in every single cup.
            </p>
          </div>
          
          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-6">
            <button className="relative px-10 py-5 bg-amber-500 text-[#120202] font-black uppercase tracking-widest text-xs rounded-sm hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 group overflow-hidden">
              <span className="relative z-10">Order Online</span>
              <div className="absolute inset-0 w-full h-full bg-white/30 -translate-x-[150%] skew-x-[-45deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out z-0"></div>
            </button>
            <button className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-amber-500 hover:text-amber-500 transition-colors duration-300 rounded-sm">
              Discover Menu
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: STACKED FANNING GALLERY                     */}
        {/* ========================================================= */}
        <div 
          ref={galleryContainerRef}
          className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center order-1 lg:order-2 cursor-pointer perspective-1000"
        >
          
          {/* CARD 1: Background Left (Latte Art) */}
          <div 
            ref={card1Ref}
            className="absolute w-[60%] sm:w-[50%] lg:w-[55%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#120202] z-10"
          >
            <div className="absolute inset-0 bg-[#120202]/40 z-10 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop" 
              alt="Pouring Coffee" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD 2: Background Right (Cafe Interior) */}
          <div 
            ref={card2Ref}
            className="absolute w-[60%] sm:w-[50%] lg:w-[55%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#120202] z-20"
          >
            <div className="absolute inset-0 bg-[#120202]/30 z-10 mix-blend-multiply"></div>
            <img 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop" 
              alt="Cafe Interior" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* CARD 3: Foreground Main (Coffee Beans / Roaster) */}
          <div 
            ref={card3Ref}
            className="absolute w-[65%] sm:w-[55%] lg:w-[60%] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-[#120202] z-30 flex flex-col justify-end p-6"
          >
            {/* Dark gradient overlay so text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120202] via-transparent to-transparent z-10 opacity-90"></div>
            <img 
              src="https://5.imimg.com/data5/SELLER/Default/2021/9/WK/WS/VC/5504430/fresh-roasted-coffee-beans.jpg" 
              alt="Fresh Roasted Beans" 
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            
            {/* Overlay Info on the main card */}
            <div className="relative z-20">
               <div className="w-10 h-10 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/50 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p className="text-amber-500 text-[10px] font-black tracking-widest uppercase mb-1">Our Process</p>
              <p className="text-white text-xl lg:text-2xl font-black">Daily Fresh Roasts</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;