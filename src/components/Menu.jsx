import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const signatureDrinks = [
  {
    id: 1,
    title: "Ethiopian Yirgacheffe",
    subtitle: "Pour Over",
    notes: "Jasmine, Lemon, Bergamot",
    roast: "Light",
    price: "$6.50",
    image: "https://www.artisansmokehouse.co.uk/cdn/shop/files/Single-Origin-Coffee-Coffee-Cup-Artisan-Smokehouse.jpg?v=1687348226&width=1000",
    region: "Sidamo Zone",
    altitude: "1,700m - 2,200m",
    farm: "Konga Cooperative",
    process: "Washed & Sun-Dried"
  },
  {
    id: 2,
    title: "Guatemalan Antigua",
    subtitle: "Espresso",
    notes: "Dark Chocolate, Apple, Smoke",
    roast: "Medium-Dark",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
    region: "Antigua Valley",
    altitude: "1,500m",
    farm: "Finca Medina",
    process: "Fully Washed"
  },
  {
    id: 3,
    title: "Sumatra Mandheling",
    subtitle: "French Press",
    notes: "Earthy, Cedar, Bell Pepper",
    roast: "Dark",
    price: "$5.50",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop",
    region: "Mount Leuser",
    altitude: "1,200m - 1,500m",
    farm: "Lintong Nihuta",
    process: "Wet-Hulled"
  },
  {
    id: 4,
    title: "Costa Rican Tarrazú",
    subtitle: "Cold Brew",
    notes: "Honey, Citrus, Vanilla",
    roast: "Medium",
    price: "$7.00",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
    region: "San Marcos",
    altitude: "1,300m - 1,600m",
    farm: "Hacienda La Minita",
    process: "Honey Processed"
  },
  {
    id: 5,
    title: "Panama Geisha",
    subtitle: "Chemex",
    notes: "Mango, Peach, Jasmine",
    roast: "Light",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop",
    region: "Boquete",
    altitude: "1,600m+",
    farm: "Hacienda Esmeralda",
    process: "Natural"
  },
  {
    id: 6,
    title: "Colombian Supremo",
    subtitle: "Aeropress",
    notes: "Caramel, Green Apple, Cocoa",
    roast: "Medium",
    price: "$6.00",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop",
    region: "Huila",
    altitude: "1,400m - 1,900m",
    farm: "San Agustin",
    process: "Washed"
  },
  {
  id: 7,
  title: "Kenyan AA Nyeri",
  subtitle: "Pour Over",
  notes: "Blackcurrant, Grapefruit, Honey",
  roast: "Light",
  price: "$6.80",
  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
  region: "Nyeri",
  altitude: "1,700m - 2,000m",
  farm: "Gichathaini Factory",
  process: "Washed"
},
{
  id: 8,
  title: "Brazil Santos",
  subtitle: "Espresso",
  notes: "Chocolate, Nuts, Low Acidity",
  roast: "Medium",
  price: "$4.20",
  image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop",
  region: "Minas Gerais",
  altitude: "800m - 1,200m",
  farm: "Fazenda Santa Lucia",
  process: "Natural"
},
{
  id: 9,
  title: "Rwanda Bourbon",
  subtitle: "Drip",
  notes: "Orange, Brown Sugar, Floral",
  roast: "Light",
  price: "$5.90",
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
  region: "Gakenke",
  altitude: "1,800m",
  farm: "Abakundakawa Coop",
  process: "Washed"
},
{
  id: 10,
  title: "Honduras Marcala",
  subtitle: "French Press",
  notes: "Toffee, Plum, Cocoa",
  roast: "Medium",
  price: "$5.20",
  image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop",
  region: "La Paz",
  altitude: "1,200m - 1,600m",
  farm: "COMSA",
  process: "Organic Washed"
},
{
  id: 11,
  title: "Peru Cajamarca",
  subtitle: "Pour Over",
  notes: "Apple, Caramel, Almond",
  roast: "Medium",
  price: "$5.80",
  image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
  region: "Cajamarca",
  altitude: "1,300m - 1,800m",
  farm: "Coop Norandino",
  process: "Washed"
},
{
  id: 12,
  title: "Nicaragua Jinotega",
  subtitle: "Cold Brew",
  notes: "Chocolate, Citrus, Spice",
  roast: "Medium-Dark",
  price: "$5.60",
  image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1000&auto=format&fit=crop",
  region: "Jinotega",
  altitude: "1,100m - 1,500m",
  farm: "Finca La Bastilla",
  process: "Washed"
},
{
  id: 13,
  title: "El Salvador Pacamara",
  subtitle: "Chemex",
  notes: "Peach, Honey, Floral",
  roast: "Light",
  price: "$7.20",
  image: "https://beanoffire.com/cdn/shop/files/11_-_productshoot1070.jpg?v=1731383131&width=1920",
  region: "Apaneca",
  altitude: "1,400m",
  farm: "Finca El Injerto",
  process: "Washed"
},
{
  id: 14,
  title: "Burundi Kayanza",
  subtitle: "Aeropress",
  notes: "Berry, Tea, Citrus",
  roast: "Light",
  price: "$6.40",
  image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1000&auto=format&fit=crop",
  region: "Kayanza",
  altitude: "1,700m - 2,000m",
  farm: "Heza Washing Station",
  process: "Washed"
},
{
  id: 15,
  title: "Tanzania Peaberry",
  subtitle: "Pour Over",
  notes: "Black Tea, Citrus, Berry",
  roast: "Medium",
  price: "$6.10",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPdxTvwtWzBFz9I3eJLbyIfDhXIt5ALvC2uw&s",
  region: "Kilimanjaro",
  altitude: "1,400m - 1,800m",
  farm: "Various Smallholders",
  process: "Washed"
},
{
  id: 16,
  title: "Uganda Bugisu",
  subtitle: "French Press",
  notes: "Dark Chocolate, Spice",
  roast: "Dark",
  price: "$4.80",
  image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1000&auto=format&fit=crop",
  region: "Mount Elgon",
  altitude: "1,300m - 2,200m",
  farm: "Bugisu Coop",
  process: "Washed"
},
{
  id: 17,
  title: "India Monsooned Malabar",
  subtitle: "Espresso",
  notes: "Earthy, Spice, Low Acidity",
  roast: "Medium-Dark",
  price: "$5.00",
  image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop",
  region: "Karnataka",
  altitude: "900m - 1,200m",
  farm: "Various Estates",
  process: "Monsooned"
},
{
  id: 18,
  title: "Vietnam Robusta",
  subtitle: "Drip",
  notes: "Strong, Bitter, Chocolate",
  roast: "Dark",
  price: "$3.50",
  image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
  region: "Dak Lak",
  altitude: "500m",
  farm: "Local Farms",
  process: "Natural"
},
{
  id: 19,
  title: "Papua New Guinea",
  subtitle: "Pour Over",
  notes: "Tropical Fruit, Cocoa",
  roast: "Medium",
  price: "$6.70",
  image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1000&auto=format&fit=crop",
  region: "Eastern Highlands",
  altitude: "1,500m",
  farm: "Sigri Estate",
  process: "Washed"
},
{
  id: 20,
  title: "Mexico Chiapas",
  subtitle: "French Press",
  notes: "Chocolate, Nutty, Mild",
  roast: "Medium",
  price: "$5.10",
  image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1000&auto=format&fit=crop",
  region: "Chiapas",
  altitude: "1,200m",
  farm: "Finca Irlanda",
  process: "Washed"
},
{
  id: 21,
  title: "Bolivia Yungas",
  subtitle: "Chemex",
  notes: "Floral, Citrus, Honey",
  roast: "Light",
  price: "$7.00",
  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop",
  region: "Yungas",
  altitude: "1,600m",
  farm: "Caranavi Coop",
  process: "Washed"
},
{
  id: 22,
  title: "Ecuador Loja",
  subtitle: "Pour Over",
  notes: "Stone Fruit, Caramel",
  roast: "Light",
  price: "$6.90",
  image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1000&auto=format&fit=crop",
  region: "Loja",
  altitude: "1,800m",
  farm: "Finca La Papaya",
  process: "Washed"
},
{
  id: 23,
  title: "Thailand Doi Chang",
  subtitle: "Drip",
  notes: "Nutty, Chocolate, Sweet",
  roast: "Medium",
  price: "$5.40",
  image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
  region: "Chiang Rai",
  altitude: "1,200m",
  farm: "Doi Chang Village",
  process: "Washed"
},
{
  id: 24,
  title: "Laos Bolaven Plateau",
  subtitle: "French Press",
  notes: "Cocoa, Spice, Herbal",
  roast: "Medium-Dark",
  price: "$4.90",
  image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=1000&auto=format&fit=crop",
  region: "Bolaven Plateau",
  altitude: "1,300m",
  farm: "Local Farms",
  process: "Washed"
},
{
  id: 25,
  title: "Philippines Benguet",
  subtitle: "Pour Over",
  notes: "Citrus, Brown Sugar",
  roast: "Medium",
  price: "$5.70",
  image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop",
  region: "Benguet",
  altitude: "1,400m",
  farm: "Smallholders",
  process: "Washed"
},
{
  id: 26,
  title: "Nepal Himalaya",
  subtitle: "Aeropress",
  notes: "Floral, Tea-like, Citrus",
  roast: "Light",
  price: "$7.50",
  image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=1000&auto=format&fit=crop",
  region: "Nuwakot",
  altitude: "1,800m",
  farm: "Himalayan Coffee",
  process: "Washed"
}
];

const Menu = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const bgTextRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const track = trackRef.current;
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.1);

        gsap.to(bgTextRef.current, {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });

        gsap.to(introRef.current, {
          opacity: 0,
          x: -150,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600",
            scrub: true
          }
        });

        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none"
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        });

        const cards = gsap.utils.toArray('.menu-card');
        
        cards.forEach((card) => {
          const image = card.querySelector('.menu-card-image');
          const content = card.querySelector('.menu-card-content');
          
          gsap.to(image, {
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          });

          gsap.to(content, {
            xPercent: -5,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          });

          const xTo = gsap.quickTo(card, "rotateY", { duration: 0.6, ease: "power3.out" });
          const yTo = gsap.quickTo(card, "rotateX", { duration: 0.6, ease: "power3.out" });

          const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            xTo((mouseX / (rect.width / 2)) * 8);
            yTo((mouseY / (rect.height / 2)) * -8);
          };

          const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
          };

          card.addEventListener('mousemove', handleMouseMove);
          card.addEventListener('mouseleave', handleMouseLeave);
          
          card._cleanup = () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
          };
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const cards = gsap.utils.toArray('.menu-card');
        cards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      const cards = document.querySelectorAll('.menu-card');
      cards.forEach(card => card._cleanup && card._cleanup());
    };
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="relative w-full lg:h-[100dvh] bg-[#050000] overflow-hidden py-24 lg:py-0 selection:bg-amber-500 selection:text-black">
      
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-15">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="menu-noise">
            <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.96 0 0 0 0 0.62 0 0 0 0 0.04 0 0 0 0.4 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#menu-noise)"/>
        </svg>
      </div>

      <div className="absolute top-1/4 right-0 w-[70vw] h-[70vw] lg:w-[50vw] lg:h-[50vw] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] lg:w-[40vw] lg:h-[40vw] bg-[#2a0808]/30 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="absolute top-[10%] left-0 w-[300vw] z-0 overflow-hidden select-none pointer-events-none opacity-[0.04]">
        <div ref={bgTextRef} className="whitespace-nowrap text-[30vh] font-black uppercase tracking-tighter text-white leading-none">
          THE RESERVE COLLECTION • THE RESERVE COLLECTION • THE RESERVE COLLECTION
        </div>
      </div>

      <div className="lg:absolute lg:top-0 lg:left-0 w-full h-full flex flex-col lg:flex-row z-10 items-center">
        
        <div ref={introRef} className="w-full lg:w-[35vw] flex-shrink-0 px-6 lg:px-16 flex flex-col justify-center h-auto lg:h-full relative z-20 mb-16 lg:mb-0">
          <div className="flex items-center gap-5 mb-8">
            <span className="w-16 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
            <span className="text-amber-500 text-xs font-black tracking-[0.4em] uppercase drop-shadow-md">The Reserve</span>
          </div>
          <h2 className="text-[clamp(3.5rem,7vw,7rem)] font-black text-white leading-[0.85] uppercase tracking-tighter drop-shadow-2xl">
            Signature<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
              Pours.
            </span>
          </h2>
          <p className="mt-8 text-white/60 max-w-md text-base lg:text-lg font-light leading-relaxed border-l border-amber-500/40 pl-6 relative backdrop-blur-sm">
            <span className="absolute -left-[4px] top-3 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)]"></span>
            An uncompromising selection of the world's most distinguished microlots. Each profile is rigorously engineered to showcase the absolute pinnacle of its terroir.
          </p>
        </div>

        <div 
          ref={trackRef} 
          className="w-full lg:w-max flex flex-col lg:flex-row items-center gap-10 lg:gap-20 px-6 lg:px-0 lg:pr-[25vw] z-20"
        >
          {signatureDrinks.map((drink, index) => (
            <div 
              key={drink.id} 
              className="menu-card w-full sm:w-[80vw] lg:w-[38vw] h-[65vh] lg:h-[75vh] flex-shrink-0 group relative perspective-1000 transform-style-3d"
            >
              <div className="absolute inset-0 rounded-[2rem] lg:rounded-[2.5rem] bg-[#0a0101] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col">
                
                <div className="relative h-[50%] lg:h-[55%] w-full overflow-hidden bg-[#120202]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0101] via-transparent to-black/50 z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img 
                      src={drink.image} 
                      alt={drink.title} 
                      className="menu-card-image absolute inset-0 w-full h-full object-cover transform scale-110 group-hover:scale-125 transition-transform duration-[2s] ease-out origin-center"
                    />
                  </div>
                  
                  <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-20 flex flex-col items-end">
                    <div className="bg-[#050000]/90 backdrop-blur-xl px-5 py-2 lg:px-6 lg:py-3 rounded-full border border-white/10 shadow-2xl">
                      <span className="text-amber-500 font-black tracking-widest text-lg lg:text-xl">{drink.price}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-20 font-black text-white/20 text-6xl lg:text-8xl tracking-tighter leading-none pointer-events-none select-none mix-blend-overlay">
                    0{index + 1}
                  </div>
                </div>

                <div className="menu-card-content relative h-[50%] lg:h-[45%] w-full p-6 lg:p-10 flex flex-col justify-between z-20 bg-[#0a0101]">
                  <div className="relative">
                    <div className="absolute -top-20 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] group-hover:bg-amber-500/20 transition-colors duration-700 pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-amber-500 text-[9px] lg:text-[10px] font-black tracking-[0.3em] uppercase drop-shadow-md">
                        {drink.subtitle}
                      </p>
                      <p className="text-white/60 text-[9px] lg:text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 bg-white/5 px-3 py-1 rounded-full backdrop-blur-md">
                        {drink.roast} Roast
                      </p>
                    </div>
                    
                    <h3 className="text-2xl lg:text-4xl font-black text-white mb-5 uppercase tracking-tight group-hover:text-amber-400 transition-colors duration-500">
                      {drink.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:gap-x-6 lg:gap-y-5 border-t border-white/10 pt-4 lg:pt-5">
                      <div>
                        <p className="text-white/30 uppercase tracking-widest text-[8px] lg:text-[9px] font-bold mb-1">Origin</p>
                        <p className="text-white/90 font-light text-[11px] lg:text-xs truncate">{drink.region}</p>
                      </div>
                      <div>
                        <p className="text-white/30 uppercase tracking-widest text-[8px] lg:text-[9px] font-bold mb-1">Farm / Co-op</p>
                        <p className="text-white/90 font-light text-[11px] lg:text-xs truncate">{drink.farm}</p>
                      </div>
                      <div>
                        <p className="text-white/30 uppercase tracking-widest text-[8px] lg:text-[9px] font-bold mb-1">Altitude</p>
                        <p className="text-white/90 font-light text-[11px] lg:text-xs truncate">{drink.altitude}</p>
                      </div>
                      <div>
                        <p className="text-white/30 uppercase tracking-widest text-[8px] lg:text-[9px] font-bold mb-1">Process</p>
                        <p className="text-white/90 font-light text-[11px] lg:text-xs truncate">{drink.process}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6 pt-5 border-t border-white/5 relative">
                    <span className="w-8 h-[1px] bg-amber-500/50 group-hover:bg-amber-500 transition-colors duration-500"></span>
                    <p className="text-white/70 font-light text-[11px] lg:text-xs tracking-wide leading-relaxed truncate pr-20">
                      <span className="text-amber-500 font-bold uppercase tracking-widest text-[9px] lg:text-[10px] mr-2">Notes</span>
                      {drink.notes}
                    </p>
                    
                    <button className="absolute right-0 bottom-1 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 bg-amber-500 text-[#050000] px-5 py-2 rounded-full font-black text-[9px] lg:text-[10px] uppercase tracking-widest hover:bg-white shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                      Select
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 border-[1.5px] border-transparent group-hover:border-amber-500/30 rounded-[2rem] lg:rounded-[2.5rem] pointer-events-none transition-colors duration-700"></div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                  <div className="w-full h-full bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-[1.2s] ease-out"></div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Menu;