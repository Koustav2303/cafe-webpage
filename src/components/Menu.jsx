import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// --- Dummy Data for our Premium Menu ---
const signatureDrinks = [
  {
    id: 1,
    title: "Ethiopian Yirgacheffe",
    subtitle: "Pour Over",
    notes: "Jasmine, Lemon, Bergamot",
    roast: "Light",
    price: "$6.50",
    image: "https://blueapplecoffee.com/cdn/shop/products/Untitleddesign_67_1024x1024.png?v=1658153427"
  },
  {
    id: 2,
    title: "Guatemalan Antigua",
    subtitle: "Espresso",
    notes: "Dark Chocolate, Apple, Smoke",
    roast: "Medium-Dark",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Sumatra Mandheling",
    subtitle: "French Press",
    notes: "Earthy, Cedar, Bell Pepper",
    roast: "Dark",
    price: "$5.50",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Costa Rican Tarrazú",
    subtitle: "Cold Brew",
    notes: "Honey, Citrus, Vanilla",
    roast: "Medium",
    price: "$7.00",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop"
  }
];

const Menu = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    // Calculate the total distance the track needs to move horizontally
    const getScrollAmount = () => {
      let trackWidth = track.scrollWidth;
      return -(trackWidth - window.innerWidth);
    };

    // 1. The Main Horizontal Scroll Animation
    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    // 2. The ScrollTrigger that links scrolling down to moving right
    ScrollTrigger.create({
      trigger: section,
      start: "top top", // When the top of the section hits the top of the viewport
      end: () => `+=${getScrollAmount() * -1}`, // Scroll distance equals the track width
      pin: true, // Lock the screen in place!
      animation: tween,
      scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
      invalidateOnRefresh: true, // Recalculates on window resize
      
      // 3. Update the custom progress bar as we scroll
      onUpdate: (self) => {
        gsap.to(progressBar, {
          scaleX: self.progress, // scaleX goes from 0 to 1 based on scroll progress
          ease: "none",
          duration: 0.1
        });
      }
    });

    // Cleanup function to kill ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="menu" 
      className="relative w-full h-[100dvh] bg-[#0c0101] overflow-hidden"
    >
      {/* Top Custom Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          ref={progressBarRef} 
          className="h-full bg-amber-500 origin-left scale-x-0"
        ></div>
      </div>

      {/* THE TRACK: This div is massively wide. It holds all the content
        and is what actually moves to the left via GSAP.
      */}
      <div 
        ref={trackRef} 
        className="flex h-full w-max items-center pl-[5vw] pr-[20vw]"
      >
        
        {/* --- Track Intro Title --- */}
        <div className="w-[80vw] md:w-[50vw] flex-shrink-0 pr-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">The Collection</span>
          </div>
          <h2 className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-white leading-[0.85] uppercase tracking-tighter">
            Signature
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Pours.
            </span>
          </h2>
          <p className="mt-8 text-white/50 max-w-sm text-lg font-light leading-relaxed">
            Keep scrolling to explore our meticulously curated selection of single-origin roasts and brewing methods.
          </p>
        </div>

        {/* --- The Menu Cards --- */}
        <div className="flex gap-8 sm:gap-16 px-8">
          {signatureDrinks.map((drink) => (
            <div 
              key={drink.id} 
              className="w-[75vw] sm:w-[45vw] lg:w-[30vw] h-[70vh] flex-shrink-0 group cursor-pointer relative"
            >
              {/* Image Container with precise styling to match the Hero's Bento boxes */}
              <div className="w-full h-[65%] rounded-[2rem] overflow-hidden bg-[#1a0505] border border-white/5 relative mb-6">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={drink.image} 
                  alt={drink.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Floating Price Tag */}
                <div className="absolute top-6 right-6 z-20 bg-[#0c0101]/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <span className="text-amber-500 font-bold tracking-wider">{drink.price}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col">
                <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                  {drink.subtitle} • {drink.roast} Roast
                </p>
                <h3 className="text-3xl lg:text-4xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {drink.title}
                </h3>
                <p className="text-white/60 font-light text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] mr-2">Tasting Notes:</span>
                  {drink.notes}
                </p>
              </div>

              {/* Hover Underline Effect */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 mt-6 overflow-hidden">
                <div className="w-full h-full bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Menu;