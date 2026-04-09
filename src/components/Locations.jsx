import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locationsData = [
  { id: "01", name: "The Foundry", city: "Metropolis", address: "142 Espresso Ave, Industrial Dist", hours: "Mon-Sun: 6AM - 10PM", vibe: "Brutalist & Energetic", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000&auto=format&fit=crop", coords: "40.7128° N, 74.0060° W" },
  { id: "02", name: "Riverside Pavilion", city: "West Bank", address: "88 Waterway Walk, Financial Sector", hours: "Mon-Sat: 7AM - 8PM", vibe: "Minimalist & Serene", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop", coords: "34.0522° N, 118.2437° W" },
  { id: "03", name: "Neon Roastery", city: "Cyber Ward", address: "505 Midnight Alley, Underground", hours: "Open 24/7", vibe: "Dark & Cinematic", image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=2000&auto=format&fit=crop", coords: "51.5074° N, 0.1278° W" },
  { id: "04", name: "Botanical Kiosk", city: "City Gardens", address: "Greenhouse 4, Conservatory", hours: "Wed-Sun: 8AM - 4PM", vibe: "Lush & Organic", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop", coords: "35.6762° N, 139.6503° E" },
  { id: "05", name: "Altitude Bar", city: "Highrise Dist", address: "Level 42, The Spire", hours: "Mon-Fri: 7AM - 7PM", vibe: "Elevated & Corporate", image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=2000&auto=format&fit=crop", coords: "41.8781° N, 87.6298° W" },
  { id: "06", name: "Heritage Reserve", city: "Old Town", address: "18 Cobblestone Lane", hours: "Tue-Sun: 9AM - 6PM", vibe: "Classic & Refined", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop", coords: "48.8566° N, 2.3522° E" },
  { id: "07", name: "Velvet Brew", city: "Downtown", address: "22 Artisan Street, Block A", hours: "Mon-Sun: 7AM - 9PM", vibe: "Warm & Cozy", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop", coords: "37.7749° N, 122.4194° W" },
  { id: "08", name: "Solaris Café", city: "Sunset Blvd", address: "301 Golden Ray Ave", hours: "Mon-Fri: 6AM - 6PM", vibe: "Bright & Airy", image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000&auto=format&fit=crop", coords: "34.0522° N, 118.2437° W" },
  { id: "09", name: "Midnight Drip", city: "Noir District", address: "77 Shadow Lane", hours: "Open 24/7", vibe: "Moody & Underground", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=2000&auto=format&fit=crop", coords: "52.5200° N, 13.4050° E" },
  { id: "10", name: "Harbor Lights", city: "Seaside Port", address: "9 Dockside Pier", hours: "Mon-Sun: 8AM - 8PM", vibe: "Breezy & Nautical", image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=2000&auto=format&fit=crop", coords: "36.1699° N, 115.1398° W" },
  { id: "11", name: "The Copper Cup", city: "Founders Sq", address: "14 Legacy Road", hours: "Tue-Sun: 7AM - 5PM", vibe: "Rustic & Vintage", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2000&auto=format&fit=crop", coords: "40.4406° N, 79.9959° W" },
  { id: "12", name: "Zenith Lounge", city: "Skyline", address: "Penthouse 5, Aurora Tower", hours: "Mon-Fri: 9AM - 9PM", vibe: "Luxury & Modern", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop", coords: "25.7617° N, 80.1918° W" }
];

const Locations = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        const horizontalTween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            animation: gsap.to(track, { x: getScrollAmount, ease: "none" }),
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.to(progressRef.current, { scaleX: self.progress, ease: "none", duration: 0.1 });
            }
          }
        });

        const cards = gsap.utils.toArray('.desktop-card');
        cards.forEach((card) => {
          const img = card.querySelector('.parallax-img');
          const content = card.querySelector('.card-content');
          
          gsap.fromTo(img, 
            { xPercent: -15 }, 
            { 
              xPercent: 15, 
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );

          gsap.fromTo(content,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 80%",
                end: "left 40%",
                scrub: true
              }
            }
          );
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const mobileCards = gsap.utils.toArray('.mobile-card');
        mobileCards.forEach((card) => {
          const img = card.querySelector('.parallax-img-mobile');
          
          gsap.fromTo(card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );

          gsap.to(img, {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="locations" className="relative w-full bg-[#050000] overflow-hidden selection:bg-amber-500 selection:text-black">
      
      <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-[0.15]">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noise-locations">
            <feTurbulence type="fractalNoise" baseFrequency=".015" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.96 0 0 0 0 0.62 0 0 0 0 0.04 0 0 0 0.3 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-locations)"/>
        </svg>
      </div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] lg:w-[50vw] lg:h-[50vw] bg-amber-600/10 rounded-full blur-[180px] pointer-events-none z-0"></div>

      <div className="hidden lg:block relative z-10 h-screen w-full">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
          <div ref={progressRef} className="h-full bg-amber-500 origin-left scale-x-0"></div>
        </div>

        <div ref={trackRef} className="flex h-full w-max items-center pl-[10vw] pr-[20vw] gap-16 xl:gap-24">
          
          <div className="w-[30vw] flex-shrink-0 flex flex-col justify-center pr-10">
            <div className="flex items-center gap-5 mb-8">
              <span className="w-16 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]"></span>
              <span className="text-amber-500 text-xs font-black tracking-[0.4em] uppercase">Sanctuaries</span>
            </div>
            <h2 className="text-[5rem] xl:text-[7rem] font-black text-white leading-[0.85] uppercase tracking-tighter drop-shadow-2xl mb-8">
              Find Your<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
                Atmosphere.
              </span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed border-l border-amber-500/40 pl-6">
              Twelve meticulously crafted spaces. Designed to elevate the ritual of drinking coffee. Scroll to explore our global outposts.
            </p>
          </div>

          {locationsData.map((loc) => (
            <div key={loc.id} className="desktop-card w-[45vw] xl:w-[40vw] h-[75vh] flex-shrink-0 relative group rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-[#0a0101]">
              
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050000]/60 to-[#050000] z-10 pointer-events-none"></div>
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="parallax-img absolute -left-[20%] top-0 w-[140%] h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out origin-center"
                />
              </div>

              <div className="absolute top-10 left-10 z-20 overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
                <span className="block font-black text-white text-[15rem] leading-none tracking-tighter transform -translate-y-12">
                  {loc.id}
                </span>
              </div>

              <div className="card-content absolute inset-0 z-30 p-12 xl:p-16 flex flex-col justify-end">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-500 text-[10px] font-black tracking-widest uppercase">
                    {loc.vibe}
                  </span>
                  <span className="px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 text-[10px] font-bold tracking-widest uppercase">
                    {loc.city}
                  </span>
                </div>

                <h3 className="text-5xl xl:text-6xl font-black text-white mb-8 uppercase tracking-tighter drop-shadow-2xl">
                  {loc.name}
                </h3>

                <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/10 pt-8 mb-10 bg-[#050000]/40 backdrop-blur-md p-6 rounded-2xl">
                  <div>
                    <p className="text-white/40 uppercase tracking-widest text-[9px] font-bold mb-1.5">Coordinates</p>
                    <p className="text-white/90 font-light text-xs tracking-wide">{loc.coords}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-widest text-[9px] font-bold mb-1.5">Address</p>
                    <p className="text-white/90 font-light text-xs tracking-wide">{loc.address}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-widest text-[9px] font-bold mb-1.5">Hours</p>
                    <p className="text-white/90 font-light text-xs tracking-wide">{loc.hours}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="w-full py-4 bg-amber-500 text-[#050000] font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      Reserve
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/30 rounded-[3rem] pointer-events-none transition-colors duration-700 z-40"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden relative z-10 w-full px-6 py-24 flex flex-col gap-12">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[2px] bg-amber-500"></span>
            <span className="text-amber-500 text-[10px] font-black tracking-[0.4em] uppercase">Global Outposts</span>
          </div>
          <h2 className="text-[3.5rem] font-black text-white leading-[0.85] uppercase tracking-tighter mb-6">
            Find Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Atmosphere.
            </span>
          </h2>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            Twelve meticulously crafted architectural spaces. Scroll to explore the collection.
          </p>
        </div>

        {locationsData.map((loc) => (
          <div key={loc.id} className="mobile-card w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0a0101] flex flex-col relative group">
            
            <div className="relative w-full h-[40vh] overflow-hidden bg-[#120202]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0a0101] z-10"></div>
              <img 
                src={loc.image} 
                alt={loc.name} 
                className="parallax-img-mobile absolute -top-[15%] left-0 w-full h-[130%] object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute top-6 left-6 z-20">
                <span className="px-3 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white font-bold tracking-widest text-[9px] uppercase">
                  {loc.city}
                </span>
              </div>
              <div className="absolute top-4 right-6 z-20">
                <span className="font-black text-white/30 text-6xl tracking-tighter mix-blend-overlay">{loc.id}</span>
              </div>
            </div>

            <div className="relative w-full p-6 sm:p-8 flex flex-col bg-[#0a0101] z-20 -mt-6">
              <p className="text-amber-500 text-[10px] font-black tracking-widest uppercase mb-3">
                {loc.vibe}
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                {loc.name}
              </h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6">
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[8px] font-bold mb-1">Address</p>
                  <p className="text-white/90 font-light text-[11px] leading-snug">{loc.address}</p>
                </div>
                <div>
                  <p className="text-white/40 uppercase tracking-widest text-[8px] font-bold mb-1">Hours</p>
                  <p className="text-white/90 font-light text-[11px]">{loc.hours}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-white/40 uppercase tracking-widest text-[8px] font-bold mb-1">Coordinates</p>
                  <p className="text-white/90 font-light text-[11px]">{loc.coords}</p>
                </div>
              </div>

              <button className="w-full mt-8 py-4 bg-amber-500 text-[#050000] font-black uppercase tracking-[0.2em] text-[11px] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.25)] active:scale-95 transition-transform">
                Reserve Table
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Locations;