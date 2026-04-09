import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LegendaryHero = () => {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const vaporRef = useRef(null);
  const kineticRow1Ref = useRef(null);
  const kineticRow2Ref = useRef(null);
  const mainTitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaBlockRef = useRef(null);
  const featuredImageWrapperRef = useRef(null);
  const featuredImageRef = useRef(null);
  const bentoGridRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      entranceTl
        .fromTo(bgImageRef.current, { scale: 1.2, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 2.5 })
        .fromTo(vaporRef.current, { opacity: 0 }, { opacity: 0.2, duration: 3 }, '-=2')
        .fromTo('.kinetic-row span', { yPercent: 100 }, { yPercent: 0, duration: 1.5, stagger: 0.05 }, '-=2.5')
        .fromTo(featuredImageWrapperRef.current, { xPercent: 50, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.8, ease: 'power4.out' }, '-=1.8')
        .fromTo(featuredImageRef.current, { scale: 1.2 }, { scale: 1, duration: 2 }, '-=1.8')
        .fromTo('.main-title-line span', { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: 0.1 }, '-=1.5')
        .fromTo(descriptionRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, '-=1')
        .fromTo(ctaBlockRef.current.children, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 }, '-=0.8')
        .fromTo('.bento-item', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, '-=0.8')
        .fromTo(statsRef.current.children, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 }, '-=0.5');

      gsap.to(kineticRow1Ref.current, { xPercent: -15, scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to(kineticRow2Ref.current, { xPercent: 15, scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      
      gsap.to(featuredImageRef.current, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: featuredImageWrapperRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.bento-image', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: bentoGridRef.current, start: 'top bottom', end: 'bottom top', scrub: true } });

      const ctaButton = document.querySelector('.magnetic-btn');
      const ctaButtonText = ctaButton.querySelector('span');

      ctaButton.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ctaButton.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(ctaButton, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: 'power2.out' });
        gsap.to(ctaButtonText, { x: x * 0.15, y: y * 0.15, duration: 0.6, ease: 'power2.out' });
      });

      ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        gsap.to(ctaButtonText, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bentoItems = [
    { type: 'image', src: 'https://scitechdaily.com/images/Pouring-Coffee-Cup.jpg', alt: 'Pour over coffee', title: 'Precision Brewing' },
    { type: 'text', title: 'Ethical Sourcing', content: 'Direct trade partnerships with sustainable farms globally.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600', alt: 'Latte art', title: 'Artisan Craft' },
    { type: 'text', title: 'Roastery Events', content: 'Cupping sessions, barista workshops, and live jazz nights.' },
  ];

  const statItems = [
    { value: '15+', label: 'Single Origins' },
    { value: '4.9', label: 'User Rating' },
    { value: '24h', label: 'Roast to Cup' },
  ];

  return (
    <section ref={sectionRef} id="home" className="relative w-full min-h-screen bg-[#0a0101] text-white overflow-hidden pb-24 selection:bg-amber-500 selection:text-black">
      
      <div ref={bgImageRef} className="absolute inset-0 z-0 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2000" alt="Cafe Background" className="w-full h-full object-cover mix-blend-luminosity" />
        <div className="absolute inset-0 bg-[#0a0101]/85"></div>
      </div>

      <div ref={vaporRef} className="absolute inset-0 z-0 pointer-events-none mix-blend-screen">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="b">
            <feTurbulence type="fractalNoise" baseFrequency=".015" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0.96 0 0 0 0 0.62 0 0 0 0 0.04 0 0 0 0.3 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#b)" opacity=".5"/>
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-amber-900/15 rounded-full blur-[160px] pointer-events-none z-0"></div>

      <div className="absolute top-[15%] left-0 w-full z-0 overflow-hidden select-none pointer-events-none opacity-60">
        <div ref={kineticRow1Ref} className="kinetic-row whitespace-nowrap text-[20vh] lg:text-[25vh] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(245,158,11,0.2)] leading-none mb-4">
          {[...Array(5)].map((_, i) => <span key={`row1-${i}`} className="inline-block mr-16">Ritual Experience Culture Community&nbsp;</span>)}
        </div>
        <div ref={kineticRow2Ref} className="kinetic-row whitespace-nowrap text-[20vh] lg:text-[25vh] font-black uppercase tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(245,158,11,0.2)] leading-none">
          {[...Array(5)].map((_, i) => <span key={`row2-${i}`} className="inline-block mr-16">Atmosphere Craft Passion Senses&nbsp;</span>)}
        </div>
      </div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-16 relative z-10 grid grid-cols-1 xl:grid-cols-[1.2fr,1fr] gap-16 lg:gap-24 items-start pt-32">
        
        <div className="xl:sticky xl:top-32 xl:pt-10">
          <div className="flex items-center gap-5 mb-10">
            <span className="w-16 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
            <span className="text-amber-500 text-xs font-black tracking-[0.4em] uppercase drop-shadow-md">Est. 2018 / Specialty Roasters</span>
          </div>

          <h1 ref={mainTitleRef} className="text-white font-black uppercase tracking-tighter mb-10">
            <div className="main-title-line overflow-hidden leading-[0.9] pb-2 text-[clamp(4rem,9vw,9rem)]">
              <span className="block drop-shadow-2xl">Awaken</span>
            </div>
            <div className="main-title-line overflow-hidden leading-[0.9] pb-4 text-[clamp(4rem,9vw,9rem)]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">Your Senses</span>
            </div>
            <div className="main-title-line overflow-hidden leading-[1.1] text-[clamp(2rem,4vw,3.5rem)] font-light normal-case tracking-normal text-white/80 mt-2">
              <span className="block">to the finer nuances of coffee culture</span>
            </div>
          </h1>

          <p ref={descriptionRef} className="text-lg lg:text-xl text-white/70 max-w-2xl font-light leading-relaxed mb-16 border-l-2 border-amber-500/40 pl-8 relative backdrop-blur-[2px]">
             <span className="absolute -left-[5px] top-3 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.9)]"></span>
            At Cafe Aura, we treat coffee as an art form. From sourcing microlots to the final pour, every step is a precise calibration designed to deliver an unparalleled flavor journey. Discover roasts that tell a story.
          </p>

          <div ref={ctaBlockRef} className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-24">
            <button className="magnetic-btn relative px-12 py-6 bg-amber-500 text-[#0a0101] font-black uppercase tracking-[0.2em] text-sm rounded-full overflow-hidden shadow-[0_15px_30px_rgba(245,158,11,0.2)] group">
              <span className="relative z-10 block transition-colors duration-500 group-hover:text-amber-500">Order Your Ritual</span>
              <div className="absolute inset-0 bg-[#1f0a0a] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
            </button>
            <a href="#menu" className="group text-white uppercase tracking-widest text-sm font-bold flex items-center gap-4 hover:text-amber-500 transition-colors">
              <span className="w-8 h-[2px] bg-white/20 group-hover:bg-amber-500 group-hover:w-16 transition-all duration-300"></span>
              Explore the Menu Collection
            </a>
          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-8 lg:gap-12 pt-12 border-t border-white/10 max-w-xl">
            {statItems.map((stat, i) => (
              <div key={i} className="relative group cursor-default">
                <p className="text-5xl lg:text-6xl font-black text-white leading-none mb-3 tracking-tighter group-hover:text-amber-500 transition-colors duration-300 drop-shadow-lg">{stat.value}</p>
                <p className="text-[10px] lg:text-xs text-amber-500/80 uppercase tracking-[0.25em] font-bold">{stat.label}</p>
                <div className="absolute -bottom-6 left-0 w-0 h-[2px] bg-amber-500 group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pt-10 xl:pt-0">
          <div ref={featuredImageWrapperRef} className="relative aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/5 mb-8 lg:mb-10 group cursor-pointer">
            <img ref={featuredImageRef} src="https://coffeeza.in/cdn/shop/articles/Coffee_Beans_Blog_3888x.jpg?v=1670838724" alt="Specialty Coffee Beans" className="absolute -top-[15%] left-0 w-full h-[130%] object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0101] via-[#0a0101]/60 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-8 left-8 right-8 lg:bottom-12 lg:left-12 lg:right-12 z-20 pointer-events-none transform group-hover:-translate-y-2 transition-transform duration-500">
              <p className="text-amber-500 text-xs font-black tracking-[0.3em] uppercase mb-3 drop-shadow-md">Featured Microlot</p>
              <h3 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tight mb-4 drop-shadow-lg leading-tight">Ethiopia Yirgacheffe Anaerobic</h3>
              <p className="text-white/80 font-light max-w-xl text-sm lg:text-base leading-relaxed drop-shadow-md">Notes of blueberry, jasmine, and bergamot. Complex, vibrant acidity with a silky body.</p>
            </div>
            <div className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
              <svg className="w-6 h-6 text-white transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </div>

          <div ref={bentoGridRef} className="grid grid-cols-2 gap-4 lg:gap-8">
            {bentoItems.map((item, i) => (
              <div key={i} className={`bento-item relative rounded-3xl overflow-hidden shadow-2xl border border-white/5 group ${item.type === 'image' ? 'aspect-square' : 'bg-[#150404]/80 p-6 lg:p-8 flex flex-col justify-between backdrop-blur-xl hover:bg-[#1f0a0a]/90 transition-colors duration-500'}`}>
                {item.type === 'image' ? (
                  <>
                    <img src={item.src} alt={item.alt} className="bento-image absolute -top-[15%] left-0 w-full h-[130%] object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0101] via-transparent to-transparent opacity-90 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-end p-6 lg:p-8 z-20 pointer-events-none">
                      <h4 className="text-lg lg:text-xl font-bold text-white uppercase tracking-tight drop-shadow-lg transform group-hover:-translate-y-1 transition-transform duration-500">{item.title}</h4>
                    </div>
                  </>
                ) : (
                  <>
                    <h4 className="text-lg lg:text-xl font-black text-amber-500 uppercase tracking-widest mb-4 border-b border-amber-500/20 pb-4">{item.title}</h4>
                    <p className="text-white/70 font-light text-xs lg:text-sm leading-relaxed">{item.content}</p>
                    <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-amber-500/30 group-hover:bg-amber-500 transition-colors duration-500"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegendaryHero;