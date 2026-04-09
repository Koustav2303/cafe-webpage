import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'The Reserve', href: '#menu' },
  { name: 'Lineage', href: '#story' },
  { name: 'Sanctuaries', href: '#locations' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const menuItemsRef = useRef([]);
  menuItemsRef.current = [];
  const socialItemsRef = useRef([]);
  socialItemsRef.current = [];
  const tl = useRef(null);

  const addToMenu = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el);
    }
  };

  const addToSocial = (el) => {
    if (el && !socialItemsRef.current.includes(el)) {
      socialItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.set(overlayRef.current, { clipPath: 'circle(0% at 100% 0%)', visibility: 'hidden' });
    gsap.set(menuItemsRef.current, { y: 100, opacity: 0, rotateX: -30 });
    gsap.set(socialItemsRef.current, { y: 20, opacity: 0 });

    tl.current = gsap.timeline({ paused: true })
      .to(overlayRef.current, {
        visibility: 'visible',
        clipPath: 'circle(150% at 100% 0%)',
        duration: 1,
        ease: 'power4.inOut'
      })
      .to(line1Ref.current, { y: 8, rotate: 45, duration: 0.4, ease: 'power3.inOut' }, 0)
      .to(line2Ref.current, { scaleX: 0, opacity: 0, duration: 0.4, ease: 'power3.inOut' }, 0)
      .to(line3Ref.current, { y: -8, rotate: -45, duration: 0.4, ease: 'power3.inOut' }, 0)
      .to(menuItemsRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out'
      }, "-=0.6")
      .to(socialItemsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out'
      }, "-=0.8");

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current.reverse();
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const btn = document.querySelector('.nav-magnetic-btn');
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${hasScrolled ? 'py-4 bg-[#050000]/80 backdrop-blur-2xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' : 'py-8 bg-transparent border-b border-transparent'}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          <a href="#home" className="relative z-[110] group flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center group-hover:border-amber-500 transition-colors duration-500">
              <div className="w-3 h-3 rounded-full bg-amber-500 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.8)] transition-shadow duration-500"></div>
            </div>
            <span className="text-2xl font-black tracking-widest text-white uppercase drop-shadow-lg">
              Cafe<span className="text-amber-500">Aura</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.href}
                className="group relative px-2 py-2 overflow-hidden"
              >
                <span className="relative z-10 text-white/70 group-hover:text-amber-400 text-[10px] tracking-[0.3em] font-bold uppercase transition-colors duration-300">
                  {link.name}
                </span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:block relative z-[110]">
            <button className="nav-magnetic-btn px-8 py-4 bg-amber-500 text-[#050000] font-black uppercase tracking-[0.2em] text-[10px] rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-colors duration-300">
              Reserve Table
            </button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden relative z-[110] flex flex-col justify-center gap-1.5 w-12 h-12 bg-white/5 backdrop-blur-md rounded-full border border-white/10 p-3 focus:outline-none group"
          >
            <span ref={line1Ref} className="w-full h-[2px] bg-amber-500 block origin-center transition-colors group-hover:bg-white"></span>
            <span ref={line2Ref} className="w-full h-[2px] bg-amber-500 block origin-center transition-colors group-hover:bg-white"></span>
            <span ref={line3Ref} className="w-full h-[2px] bg-amber-500 block origin-center transition-colors group-hover:bg-white"></span>
          </button>

        </div>
      </nav>

      <div 
        ref={overlayRef} 
        className="fixed inset-0 w-full h-[100dvh] bg-[#0a0101] z-[90] flex flex-col justify-center px-6 lg:px-24 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-[0.15]">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noise-menu">
              <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix values="0 0 0 0 0.96 0 0 0 0 0.62 0 0 0 0 0.04 0 0 0 0.4 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise-menu)"/>
          </svg>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#2a0808]/40 rounded-full blur-[150px] pointer-events-none z-0"></div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col h-full justify-center mt-12">
          <div className="flex flex-col gap-6 perspective-1000">
            {navLinks.map((link, index) => (
              <div key={index} className="overflow-hidden">
                <a 
                  ref={addToMenu}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-8 w-max outline-none"
                >
                  <span className="text-amber-500/30 font-black text-2xl lg:text-4xl tracking-tighter group-hover:text-amber-500 transition-colors duration-500">
                    0{index + 1}
                  </span>
                  <span className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-white uppercase tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-500 transform group-hover:translate-x-6 inline-block">
                    {link.name}
                  </span>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-10 flex flex-col sm:flex-row justify-between gap-10">
            <div className="flex gap-8">
              {['Instagram', 'Twitter', 'LinkedIn'].map((social, i) => (
                <a 
                  key={i} 
                  ref={addToSocial}
                  href="#" 
                  className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-amber-500 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
            
            <div ref={addToSocial} className="flex flex-col gap-2">
              <p className="text-white/40 text-[9px] uppercase tracking-widest font-bold">General Inquiries</p>
              <a href="mailto:hello@cafeaura.com" className="text-white text-sm hover:text-amber-500 transition-colors">
                hello@cafeaura.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Navbar;