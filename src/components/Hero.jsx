import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  // --- Master GSAP Refs ---
  const heroContainerRef = useRef(null);
  
  // Left Typography Column
  const badgeRef = useRef(null);
  const titleLinesRef = useRef([]);
  titleLinesRef.current = [];
  const textContentRef = useRef(null);
  const ctaGroupRef = useRef(null);

  // Right Bento Box Grid
  const bentoCardsRef = useRef([]);
  bentoCardsRef.current = [];
  const imageScalesRef = useRef([]);
  imageScalesRef.current = [];

  // Helper functions to safely populate arrays during render
  const addToTitle = (el) => { if (el && !titleLinesRef.current.includes(el)) titleLinesRef.current.push(el); };
  const addToBento = (el) => { if (el && !bentoCardsRef.current.includes(el)) bentoCardsRef.current.push(el); };
  const addToImages = (el) => { if (el && !imageScalesRef.current.includes(el)) imageScalesRef.current.push(el); };

  useEffect(() => {
    // --- The Master Orchestration Timeline ---
    // This timeline ensures everything loads in a perfectly organized, sequential manner.
    const tl = gsap.timeline({ 
      defaults: { ease: 'power4.out' },
      delay: 0.1 // Slight delay to ensure DOM is ready
    });

    // 1. Bento Box Cards Reveal (Staggered wipe from bottom to top)
    tl.fromTo(
      bentoCardsRef.current,
      { y: 100, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, stagger: 0.15 }
    )
    
    // 2. Inner Image Zoom-Out (Simultaneous with card reveal for a cinematic feel)
    .fromTo(
      imageScalesRef.current,
      { scale: 1.4 },
      { scale: 1, duration: 2, ease: 'power3.out' },
      "<" // Start at exactly the same time as the previous animation
    )

    // 3. Left Column: Small Top Badge
    .fromTo(
      badgeRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8 },
      "-=1.2"
    )

    // 4. Left Column: Huge Master Title (Line by line slide up)
    .fromTo(
      titleLinesRef.current,
      { y: 80, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, transformOrigin: '0% 50% -50' },
      "-=1.0"
    )

    // 5. Left Column: Paragraph Text
    .fromTo(
      textContentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.8"
    )

    // 6. Left Column: Buttons & Action Area
    .fromTo(
      ctaGroupRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.6"
    );

  }, []);

  return (
    <section 
      ref={heroContainerRef}
      id="home" 
      // pt-32 ensures no overlap with the fixed navbar.
      className="relative w-full min-h-[100dvh] bg-[#0c0101] flex items-center pt-32 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      
      {/* MASTER GRID LAYOUT 
        12 columns total. 5 for text, 7 for the image bento box.
      */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: HIGHLY STRUCTURED TYPOGRAPHY  */}
        {/* ========================================== */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1 mt-8 lg:mt-0 pt-4">
          
          {/* Top Badge */}
          <div ref={badgeRef} className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Est. 2018</span>
          </div>
          
          {/* Staggered Master Title */}
          <h1 className="text-[3rem] sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black text-white leading-[1] uppercase tracking-tight perspective-1000">
            <div className="overflow-hidden pb-2">
              <span ref={addToTitle} className="block">Mastering</span>
            </div>
            <div className="overflow-hidden pb-2">
              <span ref={addToTitle} className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                The Art
              </span>
            </div>
            <div className="overflow-hidden pb-2">
              <span ref={addToTitle} className="block">Of Coffee.</span>
            </div>
          </h1>
          
          {/* Paragraph content wrapped in a clean, bordered box */}
          <div ref={textContentRef} className="mt-10 border-l border-white/20 pl-6 py-2">
            <p className="text-base sm:text-lg text-white/60 max-w-md font-light leading-relaxed">
              Experience the pinnacle of coffee culture. We source the top 1% of single-origin beans globally, meticulously roasting them in-house to deliver a cup of unparalleled clarity and depth.
            </p>
          </div>
          
          {/* Call to Action Group */}
          <div ref={ctaGroupRef} className="mt-12 flex flex-col sm:flex-row gap-6 sm:items-center">
            <button className="relative px-8 py-4 bg-white text-[#0c0101] font-bold uppercase tracking-widest text-xs transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              Order Online
            </button>
            <button className="group px-8 py-4 bg-transparent text-white font-bold uppercase tracking-widest text-xs border border-white/20 hover:border-amber-500 transition-colors duration-300 flex items-center justify-center gap-3">
              Explore Menu
              <span className="group-hover:translate-x-2 transition-transform duration-300 text-amber-500">→</span>
            </button>
          </div>

        </div>


        {/* ========================================== */}
        {/* RIGHT COLUMN: BENTO BOX IMAGE GRID         */}
        {/* ========================================== */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 order-1 lg:order-2">
          
          {/* BENTO CARD 1: Large Panoramic Banner (Spans 2 columns) */}
          <div 
            ref={addToBento}
            className="sm:col-span-2 relative h-[35vh] lg:h-[45vh] rounded-[2rem] overflow-hidden bg-[#1a0505] border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img 
              ref={addToImages}
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop" 
              alt="Cafe Interior Main" 
              className="w-full h-full object-cover object-center"
            />
            {/* Absolute positioned info overlay */}
            <div className="absolute bottom-6 left-8 z-20">
              <p className="text-white text-2xl font-bold">The Flagship</p>
              <p className="text-white/70 text-sm font-light mt-1">Downtown Roastery</p>
            </div>
          </div>

          {/* BENTO CARD 2: Vertical Portrait */}
          <div 
            ref={addToBento}
            className="relative h-[30vh] lg:h-[35vh] rounded-[2rem] overflow-hidden bg-[#1a0505] border border-white/5 group"
          >
            <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/10 transition-colors duration-500"></div>
            <img 
              ref={addToImages}
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop" 
              alt="Barista Pouring" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* BENTO CARD 3: Glassmorphism Info / Stat Card */}
          <div 
            ref={addToBento}
            className="relative h-[30vh] lg:h-[35vh] rounded-[2rem] overflow-hidden bg-[#1a0505]/40 backdrop-blur-xl border border-white/10 flex flex-col justify-between p-8"
          >
            {/* Top Row of Card */}
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                {/* SVG Coffee Bean Icon */}
                <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">Daily Roast</p>
            </div>
            
            {/* Bottom Row of Card */}
            <div>
              <p className="text-4xl lg:text-5xl font-black text-white mb-2">24<span className="text-2xl text-white/50 font-light">hrs</span></p>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                Maximum time from our roasting drum to your cup. We guarantee peak freshness.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;