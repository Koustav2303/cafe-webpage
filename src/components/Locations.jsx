import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locationsData = [
  {
    id: 1,
    name: "Downtown Flagship",
    address: "142 Espresso Avenue, Metro District",
    hours: "Mon-Sun: 6AM - 9PM",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Riverside Pavilion",
    address: "88 Waterway Walk, West Bank",
    hours: "Mon-Sat: 7AM - 8PM",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "The Neon Roastery",
    address: "505 Midnight Alley, Cyber Ward",
    hours: "24/7 Service",
    image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Botanical Kiosk",
    address: "Greenhouse 4, City Gardens",
    hours: "Wed-Sun: 8AM - 4PM",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop"
  }
];

const Locations = () => {
  // State to track which card is currently expanded. Default to the first one.
  const [activeId, setActiveId] = useState(1);
  
  // GSAP Refs
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const addToCards = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;

    // 1. Entrance Animation for the Header
    gsap.fromTo(
      headerRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: "top 75%", // Triggers when section is 25% into the viewport
        }
      }
    );

    // 2. Entrance Animation for the Accordion Cards
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="locations" className="relative w-full min-h-screen bg-[#0c0101] py-24 lg:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-full flex flex-col">
        
        {/* --- Header Section --- */}
        <div ref={headerRef} className="mb-12 lg:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[1px] bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Sanctuaries</span>
          </div>
          <h2 className="text-[3rem] sm:text-5xl lg:text-7xl font-black text-white leading-tight uppercase tracking-tighter">
            Find Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
              Atmosphere.
            </span>
          </h2>
        </div>

        {/* --- Interactive Accordion Gallery --- */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-[70vh] lg:h-[60vh] w-full">
          {locationsData.map((loc) => {
            const isActive = activeId === loc.id;

            return (
              <div
                key={loc.id}
                ref={addToCards}
                onMouseEnter={() => setActiveId(loc.id)}
                onClick={() => setActiveId(loc.id)} // For mobile tap support
                className={`
                  relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isActive ? 'lg:flex-[4] flex-[3] shadow-[0_0_40px_rgba(245,158,11,0.15)]' : 'lg:flex-[1] flex-[1] grayscale-[80%] hover:grayscale-0'}
                `}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <div className={`absolute inset-0 transition-opacity duration-700 z-10 ${isActive ? 'bg-gradient-to-t from-[#0c0101] via-[#0c0101]/40 to-transparent' : 'bg-black/60'}`}></div>
                  <img 
                    src={loc.image} 
                    alt={loc.name} 
                    className="w-full h-full object-cover object-center transform scale-110"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 lg:p-10">
                  
                  {/* Vertical Text (Visible when NOT active on desktop) */}
                  <div className={`
                    absolute bottom-10 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 whitespace-nowrap hidden lg:block transition-opacity duration-300
                    ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                  `}>
                    <h3 className="text-white text-2xl font-bold uppercase tracking-widest">{loc.name}</h3>
                  </div>

                  {/* Active Details (Visible when active) */}
                  <div className={`
                    transition-all duration-700 delay-100 transform
                    ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
                  `}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase">Open Now</p>
                    </div>
                    <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 uppercase">{loc.name}</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-12">
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Location</p>
                        <p className="text-white/80 font-light">{loc.address}</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-[10px] mb-1">Hours</p>
                        <p className="text-white/80 font-light">{loc.hours}</p>
                      </div>
                    </div>
                    
                    <button className="mt-8 px-8 py-3 bg-white/10 hover:bg-amber-500 hover:text-[#0c0101] text-white backdrop-blur-sm border border-white/20 hover:border-transparent transition-all duration-300 uppercase tracking-widest text-xs font-bold rounded-full">
                      Get Directions
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Locations;