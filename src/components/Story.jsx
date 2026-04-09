import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyContent = [
  {
    id: "01",
    title: "The Genesis",
    text: "It started with a simple obsession: to find the perfect cup. In 2018, we left our corporate jobs, packed our bags, and traveled to the high-altitude farms of Ethiopia and Colombia. We spent months learning from multi-generational farmers about soil, shade, and the delicate art of harvesting.",
    image: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Ethical Sourcing",
    text: "We believe great coffee shouldn't come at the expense of the people who grow it. We bypass the commodity market entirely, practicing Direct Trade. This ensures our farming partners receive well above fair-trade wages, allowing them to reinvest in their land and their communities.",
    image: "https://www.leocoffee.co.in/cdn/shop/articles/close-up-arabica-coffee-farmer-s-hands-picking-beans-plant-his-farm-colombia.jpg?v=1687327891"
  },
  {
    id: "03",
    title: "The Roasting Science",
    text: "Roasting is where chemistry meets intuition. In our downtown roastery, we utilize custom-modified cast-iron drum roasters. We profile every single batch using advanced thermal mapping to highlight the intrinsic floral, fruity, or chocolatey notes unique to each bean's origin.",
    image: "https://www.aboutcoffee.org/wp-content/uploads/2024/10/roasted-coffee-being-emptied-out-of-roaster-into-cooling-tray.jpg"
  }
];

const Story = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const chaptersRef = useRef([]);
  chaptersRef.current = [];

  const addToChapters = (el) => {
    if (el && !chaptersRef.current.includes(el)) {
      chaptersRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.header-text-line span',
        { y: 150, opacity: 0, rotateX: -45 },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 1.5, 
          stagger: 0.1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: true
          }
        }
      );

      chaptersRef.current.forEach((chapter, i) => {
        const imageContainer = chapter.querySelector('.chapter-image-container');
        const image = chapter.querySelector('img');
        const content = chapter.querySelector('.chapter-content');
        const number = chapter.querySelector('.chapter-number');

        gsap.fromTo(
          imageContainer,
          { clipPath: 'inset(15% 15% 15% 15% round 3rem)', scale: 1.05 },
          { 
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', 
            scale: 1, 
            duration: 1.8, 
            ease: 'expo.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 70%'
            }
          }
        );

        gsap.to(image, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        gsap.fromTo(
          content,
          { y: 100, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 60%'
            }
          }
        );

        gsap.fromTo(
          number,
          { x: i % 2 === 0 ? -150 : 150, opacity: 0, rotateZ: i % 2 === 0 ? -15 : 15 },
          { 
            x: 0, 
            opacity: 0.05, 
            rotateZ: 0,
            duration: 2, 
            ease: 'power4.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 80%'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="relative w-full bg-[#200404] text-white overflow-hidden py-32 lg:py-48 selection:bg-amber-500 selection:text-[#200404]">
      
      <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-black/50 to-transparent z-0 pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/5 z-0 hidden lg:block">
        <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-500 to-transparent"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div ref={headerRef} className="flex flex-col items-center justify-center text-center mb-32 lg:mb-56">
          <div className="flex items-center gap-6 mb-8">
            <span className="w-16 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
            <span className="text-amber-500 text-sm font-black tracking-[0.5em] uppercase">Lineage & Legacy</span>
            <span className="w-16 h-[2px] bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
          </div>
          
          <h2 className="text-[clamp(4rem,9vw,10rem)] font-black text-white leading-[0.85] uppercase tracking-tighter drop-shadow-2xl flex flex-col items-center perspective-1000">
            <div className="header-text-line overflow-hidden pb-4">
              <span className="block drop-shadow-lg">Relentless</span>
            </div>
            <div className="header-text-line overflow-hidden pb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                Pursuit.
              </span>
            </div>
          </h2>
        </div>

        <div className="flex flex-col gap-32 lg:gap-56 relative">
          {storyContent.map((chapter, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={chapter.id} 
                ref={addToChapters}
                className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-0`}
              >
                
                <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-[-5%]' : 'left-[-5%]'} text-[40vw] lg:text-[30vw] font-black text-white leading-none z-0 pointer-events-none select-none chapter-number`}>
                  {chapter.id}
                </div>

                <div className={`w-full lg:w-[60%] h-[50vh] lg:h-[80vh] relative z-10 chapter-image-container overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10`}>
                  <div className="absolute inset-0 bg-[#200404]/30 z-10 mix-blend-multiply pointer-events-none"></div>
                  <img 
                    src={chapter.image} 
                    alt={chapter.title} 
                    className="absolute -top-[15%] left-0 w-full h-[130%] object-cover"
                  />
                </div>

                <div className={`w-[95%] lg:w-[45%] relative z-20 chapter-content -mt-20 lg:mt-0 ${isEven ? 'lg:-ml-16' : 'lg:-mr-16'} self-end lg:self-auto`}>
                  <div className="bg-[#200404]/80 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 lg:p-16 overflow-hidden group">
                    
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-500/10 rounded-full blur-[50px] group-hover:bg-amber-500/20 transition-colors duration-700 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-8">
                      <span className="text-amber-500 font-black tracking-widest text-4xl lg:text-5xl opacity-40">
                        {chapter.id}
                      </span>
                      <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)] animate-pulse"></div>
                      </div>
                    </div>

                    <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tight leading-tight">
                      {chapter.title}
                    </h3>
                    
                    <p className="text-white/70 font-light text-base lg:text-lg leading-relaxed mb-10">
                      {chapter.text}
                    </p>

                    <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-full bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out"></div>
                    </div>
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

export default Story;