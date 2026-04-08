import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  
  // Magnetic Button Refs
  const buttonWrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonTextRef = useRef(null);

  useEffect(() => {
    // --- 1. Scroll Entrance Animations ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(
      titleRef.current.children,
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
    )
    .fromTo(
      formRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      "-=0.8"
    );

    // --- 2. Magnetic Button Logic ---
    const wrapper = buttonWrapperRef.current;
    const button = buttonRef.current;
    const text = buttonTextRef.current;

    // Create quick setters for maximum performance during mousemove
    const xTo = gsap.quickTo(button, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const textXTo = gsap.quickTo(text, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(text, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = wrapper.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the button wrapper
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Move the button (stronger pull) and the text (weaker pull for parallax)
      xTo(x * 0.4);
      yTo(y * 0.4);
      textXTo(x * 0.2);
      textYTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      // Snap back to dead center
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-[#050000] border-t border-white/5 pt-24 lg:pt-32 flex flex-col justify-between min-h-screen">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-amber-900/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 flex-grow">
        
        {/* --- LEFT COLUMN: Typography --- */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-amber-500"></span>
            <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Private Tastings</span>
          </div>
          
          <h2 ref={titleRef} className="text-[4rem] sm:text-[6rem] lg:text-[7.5rem] font-black text-white leading-[0.85] uppercase tracking-tighter perspective-1000">
            <div className="overflow-hidden pb-2"><span className="block origin-top-left">Reserve</span></div>
            <div className="overflow-hidden pb-2">
              <span className="block origin-top-left text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
                Your
              </span>
            </div>
            <div className="overflow-hidden pb-2"><span className="block origin-top-left">Table.</span></div>
          </h2>
          
          <p className="mt-12 text-lg text-white/50 max-w-md font-light leading-relaxed">
            Join us for an exclusive omakase-style coffee tasting. Experience rare micro-lots roasted exclusively for our private guests.
          </p>

          {/* Contact Details */}
          <div className="mt-16 flex flex-col sm:flex-row gap-12 border-t border-white/10 pt-10">
            <div>
              <p className="text-white/30 uppercase tracking-widest text-[10px] mb-2 font-bold">General Inquiries</p>
              <a href="mailto:hello@cafeaura.com" className="text-white/80 hover:text-amber-500 transition-colors text-lg">hello@cafeaura.com</a>
            </div>
            <div>
              <p className="text-white/30 uppercase tracking-widest text-[10px] mb-2 font-bold">Reservations</p>
              <a href="tel:+18005550199" className="text-white/80 hover:text-amber-500 transition-colors text-lg">+1 (800) 555-0199</a>
            </div>
          </div>
        </div>


        {/* --- RIGHT COLUMN: Highly Engineered Form --- */}
        <div className="lg:col-span-5 flex flex-col justify-start pt-4 lg:pt-12">
          <form ref={formRef} className="w-full flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Custom Input: Name */}
            <div className="relative group">
              <input 
                type="text" 
                id="name" 
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl font-light focus:outline-none focus:border-transparent peer"
                placeholder=" "
              />
              <label htmlFor="name" className="absolute left-0 top-4 text-white/40 text-xl font-light transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-amber-500 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:tracking-widest peer-valid:uppercase">
                Your Name
              </label>
              {/* Animated Bottom Line */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 peer-focus:scale-x-100"></div>
            </div>

            {/* Custom Input: Email */}
            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                required
                className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl font-light focus:outline-none focus:border-transparent peer"
                placeholder=" "
              />
              <label htmlFor="email" className="absolute left-0 top-4 text-white/40 text-xl font-light transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-amber-500 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:tracking-widest peer-valid:uppercase">
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 peer-focus:scale-x-100"></div>
            </div>

            {/* Custom Input: Date/Party Size */}
            <div className="flex gap-6">
              <div className="relative group w-1/2">
                <input 
                  type="text" 
                  id="date" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl font-light focus:outline-none focus:border-transparent peer"
                  placeholder=" "
                />
                <label htmlFor="date" className="absolute left-0 top-4 text-white/40 text-xl font-light transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-amber-500 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:tracking-widest peer-valid:uppercase">
                  Date
                </label>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 peer-focus:scale-x-100"></div>
              </div>

              <div className="relative group w-1/2">
                <input 
                  type="number" 
                  id="guests" 
                  required
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white text-xl font-light focus:outline-none focus:border-transparent peer"
                  placeholder=" "
                />
                <label htmlFor="guests" className="absolute left-0 top-4 text-white/40 text-xl font-light transition-all duration-300 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-amber-500 peer-focus:tracking-widest peer-focus:uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-white/40 peer-valid:tracking-widest peer-valid:uppercase">
                  Guests
                </label>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-amber-500 scale-x-0 origin-left transition-transform duration-500 peer-focus:scale-x-100"></div>
              </div>
            </div>

            {/* --- Magnetic Submit Button --- */}
            <div className="mt-8 flex justify-start">
              {/* The wrapper provides the "hover zone" */}
              <div 
                ref={buttonWrapperRef} 
                className="relative w-48 h-48 flex items-center justify-center rounded-full cursor-pointer group"
              >
                {/* The actual button circle */}
                <button 
                  ref={buttonRef}
                  type="submit"
                  className="absolute w-36 h-36 bg-amber-500 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-amber-400 focus:outline-none pointer-events-none"
                >
                  {/* The text inside the button */}
                  <span 
                    ref={buttonTextRef} 
                    className="text-[#050000] font-black uppercase tracking-[0.2em] text-xs text-center leading-relaxed"
                  >
                    Request <br/> Booking
                  </span>
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
      

    </section>
  );
};

export default Contact;