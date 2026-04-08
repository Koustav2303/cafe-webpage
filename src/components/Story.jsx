import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyContent = [
  {
    id: "01",
    title: "The Genesis",
    text: "It started with a simple obsession: to find the perfect cup. In 2018, we left our corporate jobs, packed our bags, and traveled to the high-altitude farms of Ethiopia and Colombia. We spent months learning from multi-generational farmers about soil, shade, and the delicate art of harvesting."
  },
  {
    id: "02",
    title: "Ethical Sourcing",
    text: "We believe great coffee shouldn't come at the expense of the people who grow it. We bypass the commodity market entirely, practicing Direct Trade. This ensures our farming partners receive well above fair-trade wages, allowing them to reinvest in their land and their communities."
  },
  {
    id: "03",
    title: "The Roasting Science",
    text: "Roasting is where chemistry meets intuition. In our downtown roastery, we utilize custom-modified cast-iron drum roasters. We profile every single batch using advanced thermal mapping to highlight the intrinsic floral, fruity, or chocolatey notes unique to each bean's origin."
  }
];

const Story = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);
  const textBlocksRef = useRef([]);
  textBlocksRef.current = [];

  const addToTextBlocks = (el) => {
    if (el && !textBlocksRef.current.includes(el)) {
      textBlocksRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    
    // 1. Cinematic Image Parallax (Tied to the scroll of the entire section)
    ScrollTrigger.create({
      trigger: section,
      start: "top bottom", // Starts when the section enters the bottom of the screen
      end: "bottom top",   // Ends when the section leaves the top of the screen
      scrub: 1,            // Smooth scrubbing
      animation: gsap.fromTo(
        imageRef.current,
        { scale: 1, y: -50 }, 
        { scale: 1.15, y: 50, ease: "none" } // Image scales up and moves down slightly
      )
    });

    // 2. Text Blocks Reveal Animation
    textBlocksRef.current.forEach((block, index) => {
      gsap.fromTo(
        block,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%", // Triggers when the top of the block hits 85% down the viewport
            toggleActions: "play none none reverse" // Fades out if you scroll back up
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="story" className="relative w-full bg-[#0c0101] text-white z-10 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-32 flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* --- LEFT COLUMN: Sticky Image --- */}
        <div className="lg:w-[45%] relative">
          {/* The 'sticky' class locks this container to the top of the screen 
            while the user scrolls through the text on the right. 
            'top-32' prevents it from hiding under your navbar.
          */}
          <div 
            ref={imageContainerRef}
            className="sticky top-32 w-full h-[50vh] lg:h-[75vh] rounded-[2rem] overflow-hidden bg-[#1a0505] border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 bg-black/30 z-10 mix-blend-overlay"></div>
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1000&auto=format&fit=crop" 
              alt="Coffee Farm" 
              className="w-full h-[120%] object-cover object-center origin-center" // Height 120% gives room for the parallax y-movement
            />
            
            {/* Overlay Badge */}
            <div className="absolute bottom-8 left-8 z-20 backdrop-blur-md bg-black/40 border border-white/10 px-6 py-4 rounded-xl">
              <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-1">Origin</p>
              <p className="text-white text-xl font-black">Antioquia, Colombia</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Scrolling Narrative --- */}
        <div className="lg:w-[55%] flex flex-col">
          
          <div className="mb-16 lg:mb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-amber-500"></span>
              <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Our Roots</span>
            </div>
            <h2 className="text-[3rem] sm:text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
              Pursuit of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Perfection.</span>
            </h2>
          </div>

          {/* Map through the story content */}
          <div className="flex flex-col gap-24 lg:gap-40 pb-16 lg:pb-32">
            {storyContent.map((block) => (
              <div 
                key={block.id} 
                ref={addToTextBlocks}
                className="relative pl-8 sm:pl-16 border-l border-white/10"
              >
                {/* Floating Chapter Number */}
                <span className="absolute -left-[2px] top-0 text-white/10 font-black text-6xl sm:text-8xl leading-none -translate-x-full select-none">
                  {block.id}
                </span>
                
                {/* Custom dot on the border line */}
                <span className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase tracking-wide">
                  {block.title}
                </h3>
                <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed max-w-lg">
                  {block.text}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Story;