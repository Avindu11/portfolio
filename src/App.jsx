import { Atom, Coffee, CoffeeIcon, DatabaseZap, FileBracesCorner, FileCodeCorner, Hexagon, Leaf, Palette } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';

// --- GSAP & Icon Script Loader ---
// We need to dynamically load GSAP since we're in a single-file environment.
// In a real project, you'd add this to your index.html.
const loadScript = (src, onLoad) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onLoad;
  document.body.appendChild(script);
};

// --- Icons (using Lucide) ---
// Since we can't import, we'll use inline SVGs for key icons.
// A real project would use `lucide-react`.

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const LayersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const BugIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 12c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2Z"/>
        <path d="M14 12v2a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-2"/>
        <path d="m14 9-2-5"/>
        <path d="m10 9-2-5"/>
        <path d="m8 14 1-3"/>
        <path d="m16 14-1-3"/>
        <path d="M4 9h.01"/>
        <path d="M20 9.5c0 .35-.02.7-.06 1.04l-3.34 9.11a.5.5 0 0 1-.9.3l-3-4.01a.5.5 0 0 1 .37-.8l3.41 1.14a.5.5 0 0 0 .63-.63l-1.14-3.41a.5.5 0 0 1 .8-.37l4.01 3c.18.14.3.36.3.6Z"/>
        <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
        <path d="M12 16V4a2 2 0 0 0-2-2h-2"/>
        <path d="M12 16v2a2 2 0 0 0 2 2h2"/>
        <path d="M12 16v2a2 2 0 0 1-2 2H8"/>
    </svg>
);

// --- NEW ICONS ---

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m11.31-2.83a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"></ellipse>
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"></ellipse>
  </svg>
);

const JavaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"></path>
    <path d="M14 19c0 1.1-.9 2-2 2s-2-.9-2-2v-2h4v2Z"></path>
    <path d="M14 3v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V3h4Z"></path>
    <path d="M4 11h2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2h2"></path>
    <path d="M4 19h16v-2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2Z"></path>
    <path d="M4 7h16V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2Z"></path>
  </svg>
);

const NodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.47 1.12a1 1 0 0 0-.94 0L3.6 5.31a1 1 0 0 0-.6 1.39l5.44 9.4a1 1 0 0 0 1.3 1.03l2.8-.5a1 1 0 0 1 1.09.21l4.4 4.4a1 1 0 0 0 1.41-1.41l-4.4-4.4a1 1 0 0 1-.21-1.09l.5-2.8a1 1 0 0 0-1.03-1.3L5.31 3.6a1 1 0 0 0-1.39.6Z"></path>
    <path d="m14.3 5.3 4.45 4.45-3.05 3.05-4.45-4.45 3.05-3.05Z"></path>
  </svg>
);

const MysqlIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 11h.01"></path>
    <path d="M3 5.5A3.5 3.5 0 0 1 6.5 2H18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6.5a4.5 4.5 0 0 1-1.42-8.79A3.5 3.5 0 0 1 3 5.5Z"></path>
    <path d="M12 15a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3Z"></path>
  </svg>
);

const JsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 18H12V2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2Z"></path>
    <path d="M8 18H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4v16Z"></path>
    <path d="M10 18v-2a2 2 0 1 0-4 0v2"></path>
  </svg>
);

const CssIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 9.5a2.5 2.5 0 0 1 5 0"/>
    <path d="M10 14.5a2.5 2.5 0 0 1 5 0"/>
    <path d="M7 20s-2-1.5-2-4V8s0-4 2-4"/>
    <path d="M17 4s2 1.5 2 4v8s0 4-2 4"/>
  </svg>
);

const ServerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);


// --- Custom Cursor Component ---
const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;
    if (!dot || !outline) return;

    // Load GSAP
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", () => {
      if (!window.gsap) return;

      const moveCursor = (e) => {
        window.gsap.to(dot, {
          duration: 0.1,
          x: e.clientX,
          y: e.clientY,
          ease: "power3.out",
        });
        window.gsap.to(outline, {
          duration: 0.4,
          x: e.clientX,
          y: e.clientY,
          ease: "power3.out",
        });
      };

      const addHover = () => {
        window.gsap.to(outline, {
          duration: 0.3,
          scale: 1.5,
          opacity: 0.4,
          backgroundColor: '#3b82f6', // blue-500
          ease: "power3.out",
        });
        window.gsap.to(dot, {
          duration: 0.3,
          scale: 0.5,
          ease: "power3.out",
        });
      };

      const removeHover = () => {
        window.gsap.to(outline, {
          duration: 0.3,
          scale: 1,
          opacity: 0.2,
          backgroundColor: 'transparent',
          ease: "power3.out",
        });
        window.gsap.to(dot, {
          duration: 0.3,
          scale: 1,
          ease: "power3.out",
        });
      };

      window.addEventListener("mousemove", moveCursor);

      // We need to re-query for targets periodically as components mount
      const setupHoverListeners = () => {
        const hoverTargets = document.querySelectorAll(
          'a, button, [data-hoverable="true"]'
        );
        hoverTargets.forEach((target) => {
          // Avoid adding duplicate listeners
          if (target.dataset.hoverListenersAdded === 'true') return;
          target.addEventListener("mouseenter", addHover);
          target.addEventListener("mouseleave", removeHover);
          target.dataset.hoverListenersAdded = 'true';
        });
      };

      // Initial setup
      setupHoverListeners();

      // Re-run setup after a delay to catch mounted components
      const intervalId = setInterval(setupHoverListeners, 1000);

      return () => {
        window.removeEventListener("mousemove", moveCursor);
        clearInterval(intervalId); // Clear interval on unmount
        // Clean up listeners
        document.querySelectorAll('[data-hoverable="true"]').forEach((target) => {
          target.removeEventListener("mouseenter", addHover);
          target.removeEventListener("mouseleave", removeHover);
          delete target.dataset.hoverListenersAdded;
        });
      };
    });
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full z-[1000] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        ref={cursorOutlineRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-blue-400 rounded-full z-[1000] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-20"
      ></div>
    </>
  );
};

// --- Header Component ---
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Refs for GSAP
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);
  const gsapTimelineRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" }, // NEW LINK
    { name: "Contact", href: "#contact" },
  ];

  // GSAP Animation for Mobile Menu
  useEffect(() => {
    // Ensure GSAP is loaded
    if (window.gsap && mobileMenuRef.current && mobileLinksRef.current.length > 0) {
      gsapTimelineRef.current = window.gsap.timeline({ paused: true })
        .fromTo(mobileMenuRef.current, 
          { y: '-100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
        .fromTo(mobileLinksRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' },
          "-=0.3" // Start this animation 0.3s before the previous one ends
        );
    }
  }, [mobileLinksRef.current]); // Rerun if refs change (though they shouldn't)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Play/Reverse GSAP animation when state changes
  useEffect(() => {
    if (gsapTimelineRef.current) {
      if (isMobileMenuOpen) {
        gsapTimelineRef.current.play();
      } else {
        gsapTimelineRef.current.reverse();
      }
    }
  }, [isMobileMenuOpen]);
  
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <a href="#home" className="text-2xl font-bold text-white transition-colors hover:text-blue-400">
            Avindu
          </a>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-blue-400 focus:outline-none z-50 relative"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div> {/* End of h-20 flex container */}
      </div> {/* End of max-w-7xl container */}

      {/* Mobile Menu Panel - GSAP Animated */}
      <div
        ref={mobileMenuRef}
        className={`
          md:hidden absolute top-0 left-0 right-0 bg-black/90 backdrop-blur-lg
          pt-20 shadow-lg invisible
        `}
      >
        <div className="flex flex-col items-center space-y-4 py-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              ref={el => mobileLinksRef.current[index] = el}
              href={link.href}
              onClick={handleLinkClick}
              className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-md text-lg font-medium transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      {/* This div creates the glassmorphism and border effect */}
      <div className="absolute inset-0 -z-10 bg-black/30 backdrop-blur-md border-b border-white/10"></div>
    </nav>
  );
};

// --- [RE-ADDED] Hero Background Lines ---
const HeroBackgroundLines = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent opacity-30 animate-line-flow-1"></div>
    <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent opacity-30 animate-line-flow-2"></div>
    <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-30 animate-line-flow-3"></div>
  </div>
);

// --- [RE-ADDED] Hero Section Component ---
const HeroSection = () => {
  const titleRef = useRef(null);
  const pRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Check if GSAP is loaded
    if (window.gsap) {
      // Animate Title
      window.gsap.fromTo(
        titleRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.2,
        }
      );

      // Animate Paragraph
      window.gsap.fromTo(
        pRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.8,
        }
      );
      
      // Animate Image
      window.gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 1.0,
        }
      );
    }
  }, []);

  // Split title for animation
  const title = "From Concept to Code: I Engineer Solutions";
  const splitTitle = title.split(" ").map((word, i) => (
    <span key={i} className="inline-block mr-[0.25em]">
      {word === "Solutions" ? (
        <span className="text-blue-400">{word}</span>
      ) : (
        word
      )}
    </span>
  ));

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 sm:px-10 lg:px-12 pt-20 md:pt-0">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[100vw] h-[100vh] sm:w-[800px] sm:h-[800px] bg-radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15), transparent 60%)"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="text-center md:text-left">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ transform: "translateZ(0)" }} // Promotes to new layer
          >
            {splitTitle}
          </h1>
          <p ref={pRef} className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto md:mx-0">
            I don't just build websites or apps <br />
            I build intelligent systems that solve your specific problems. <br />
            Whether you need to streamline operations, engage your customers, or launch a new idea, I deliver clean, high-performance code that gets results.
          </p>
        </div>
        <div ref={imageRef} className="flex justify-center relative">
          <HeroBackgroundLines />
          {/* Add your photo here */}
          <img 
            src="https://res.cloudinary.com/do9mg0abd/image/upload/v1763026820/me_o9k44c.jpg" 
            alt="Avindu Vidusanka"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full object-cover border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20 relative z-10"
          />
        </div>
      </div>
    </section>
  );
};

// --- [RE-ADDED] UseOnScreen (IntersectionObserver) Hook ---
const useOnScreen = (options) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options && options.triggerOnce && ref) {
          observer.unobserve(ref);
        }
      }
    }, options);

    const currentRef = ref;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

// --- [RE-ADDED] Animated Section Title ---
const SectionTitle = ({ children }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });
  return (
    <h2 
      ref={ref} 
      className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      style={{ transform: "translateZ(0)" }}
    >
      {children}
    </h2>
  );
}

// --- [RE-ADDED] Animated Gradient Text ---
const AnimatedGradientText = ({ children }) => (
  <span className="
    relative
    inline-block
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-blue-400
    via-cyan-400
    to-blue-400
    animate-text-pan
  ">
    {children}
  </span>
);


// --- [RE-ADDED] About Section ("What I Do") ---
const AboutSection = () => {
   const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>What I Do</SectionTitle>
        <div 
          ref={ref} 
          className={`
            max-w-3xl mx-auto text-center
            transition-all duration-700 ease-out 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            I am a <AnimatedGradientText>Full-Stack Developer</AnimatedGradientText> with deep expertise in both the <AnimatedGradientText>JavaScript</AnimatedGradientText> and <AnimatedGradientText>Java</AnimatedGradientText> ecosystems. I architect and build complete, robust, and scalable applications from the ground up.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- [RE-ADDED] Interactive Card Component (for Projects/Services) ---
const InteractiveCard = ({ children, className }) => {
  const cardRef = useRef(null);
  const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      data-hoverable="true"
      onMouseMove={handleMouseMove}
      className={`
        relative p-8 rounded-xl bg-neutral-900 border border-neutral-800
        transition-all duration-300
        group
        overflow-hidden
        transform
        transition-all duration-700 ease-out
        flex flex-col
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className || ''}
      `}
      style={{'--card-delay': (Math.random() * 0.3) + 's'}}
    >
      {/* Background Mouse-Following Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 80%)"
        }}
      ></div>

      {/* Border Glow */}
      <div 
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.2), transparent 80%)"
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col" ref={ref}>
        {children}
      </div>
    </div>
  );
};

// --- [RE-ADDED] Projects Section ---
const ProjectsSection = () => {
  const projects = [
    {
      title: "Modern E-commerce SPA",
      description: "A lightning-fast Single-Page Application (SPA) built for a modern shopping experience. The React frontend provides an instant, app-like feel, while the backend runs on a secure and scalable Java Spring Boot REST API. Uses Hibernate for robust data management and MySQL for storage.",
      github: "https://github.com/Avindu11", // Update link
      demo: "https://youtu.be/AQWz9ntBiJg", // Update link
      imageUrl: "https://res.cloudinary.com/do9mg0abd/image/upload/v1763026820/agro-cart_zwepm2.png"
    },
    {
      title: "Dynamic E-commerce App (PHP)",
      description: "A complete, from-scratch e-commerce solution built with server-side PHP and a MySQL database. Features a full content management system (CMS) for products, secure user authentication, and a custom shopping cart and checkout process.",
      github: "https://github.com/Avindu11", // Update link
      demo: null, // No demo link
      imageUrl: "https://res.cloudinary.com/do9mg0abd/image/upload/v1763026820/glamours_tsrukn.png"
    }
  ];

  const CardButton = ({ href, text, icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-hoverable="true"
      className="flex items-center space-x-2 text-sm text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>Featured Projects</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <InteractiveCard key={index} className="p-0 min-h-[420px]">
              {/* Image as background */}
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover rounded-xl z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-xl z-10"></div>
              
              {/* Content on top */}
              <div className="relative z-20 p-8 flex flex-col flex-grow h-full justify-end">
                <div className="flex-grow">
                  {/* Empty div to push content down */}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-6">{project.description}</p>
                </div>
                <div className="flex space-x-4"> {/* Removed border-t */}
                  {project.github && (
                    <CardButton href={project.github} text="GitHub" icon={<GithubIcon />} />
                  )}
                  {project.demo && (
                    <CardButton href={project.demo} text="Demo" icon={<PlayIcon />} />
                  )}
                </div>
              </div>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- [RE-ADDED] Floating Orbs Component ---
const FloatingOrbs = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600 rounded-full opacity-10 filter blur-3xl animate-blob"></div>
    <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-600 rounded-full opacity-10 filter blur-3xl animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600 rounded-full opacity-10 filter blur-3xl animate-blob animation-delay-4000"></div>
  </div>
);

// --- [RE-ADDED] Services Section ---
const ServicesSection = () => {
  const services = [
    { icon: <CodeIcon />, title: "Frontend Development", description: "Crafting responsive, high-performance user interfaces with modern tech." },
    { icon: <DatabaseIcon />, title: "Backend Development", description: "Building secure, scalable, and robust server-side logic and APIs." },
    { icon: <LayersIcon />, title: "Full-Stack Development", description: "Handling the entire development lifecycle, from database to UI." },
    { icon: <BugIcon />, title: "Bug Fixing", description: "Debugging and resolving complex issues to improve application stability." },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <FloatingOrbs />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <SectionTitle>My Services</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <InteractiveCard key={index} className="h-full">
              <div className="text-blue-400 mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm flex-grow">{service.description}</p>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- [RE-ADDED] Skills Section ---
const SkillsSection = () => {
  const skills = [
    { name: "HTML", icon: <FileCodeCorner /> },
    { name: "CSS", icon: <Palette /> },
    { name: "JavaScript", icon: <FileBracesCorner /> },
    { name: "React", icon: <Atom /> },
    { name: "Node", icon: <Hexagon /> },
    { name: "Express", icon: <ServerIcon /> },
    { name: "Sequelize ORM", icon: <DatabaseIcon /> },
    { name: "Java", icon: <CoffeeIcon /> },
    { name: "Spring Boot", icon: <Leaf /> },
    { name: "Hibernate", icon: <DatabaseIcon /> },
    { name: "MySQL", icon: <DatabaseZap /> },
  ];

  // Duplicate skills for seamless marquee
  const skillsRow = [...skills, ...skills];

  const SkillChip = ({ text, icon }) => (
    <div
      data-hoverable="true"
      className="flex items-center space-x-3 bg-neutral-800 text-gray-300 px-5 py-3 rounded-full font-medium transition-colors hover:bg-blue-600 hover:text-white"
    >
      <span className="text-blue-400">{icon}</span>
      <span>{text}</span>
    </div>
  );

  return (
    <section id="skills" className="py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>My Tech Stack</SectionTitle>
      </div>
      <div className="relative flex flex-col gap-6 mt-8">
        <div className="flex w-max animate-marquee-slow space-x-6">
          {skillsRow.map((skill, index) => (
            <SkillChip key={`row1-${index}`} text={skill.name} icon={skill.icon} />
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse space-x-6">
          {skillsRow.map((skill, index) => (
            <SkillChip key={`row2-${index}`} text={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- About Me Section (RENAMED to BioSection) ---
const BioSection = () => {
  return (
    <section id="bio" className="py-24"> {/* ID CHANGED */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>About Me</SectionTitle>
        <div className="max-w-3xl mx-auto">
          <InteractiveCard className="text-left">
            <h3 className="text-2xl font-semibold text-white mb-4">Avindu Vidusanka</h3>
            <p className="text-base text-gray-300 mb-4">
              I’m from Sri Lanka and I’m passionate about building modern web applications using JavaScript and Java.
            </p>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};

// --- NEW Experience & Education Section ---
const ExperienceSection = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });

  const timelineItems = [
    {
      type: "Education",
      title: "B.Sc. (Hons) in Software Engineering",
      source: "Java Institute for Advanced Technology",
      date: "2023 - 2026",
      // description: "Graduated with honors. Focused on software engineering, database management, and web development.",
    },
    {
      type: "Experience",
      title: "Co-Founder",
      source: "Codehive LK",
      date: "2023 - Present",
      // description: "Developed and maintained web applications using React, Node.js, and Java Spring Boot. Collaborated with cross-functional teams.",
    },
    {
      type: "Experience",
      title: "Trainee Engineer",
      source: "Hexalyte Innovations Pvt Ltd.",
      date: "2025 - 2025",
      // description: "",
    },
  ];

  const TimelineItem = ({ item, isLast }) => {
    const [itemRef, isItemVisible] = useOnScreen({ threshold: 0.5, triggerOnce: true });
    
    return (
      <div ref={itemRef} className="flex gap-x-6 relative">
        {/* Vertical Line */}
        {!isLast && (
          <div className="absolute left-[11px] top-10 bottom-0 w-0.5 bg-neutral-700"></div>
        )}
        
        {/* Icon & Circle */}
        <div className={`relative z-10 flex-shrink-0 transition-all duration-700 ${isItemVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="w-6 h-6 rounded-full bg-blue-500 ring-4 ring-neutral-900 flex items-center justify-center">
            {item.type === "Experience" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={`flex-grow pb-12 transition-all duration-700 ${isItemVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
          <p className="text-sm text-blue-400 mb-1">{item.date}</p>
          <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
          <p className="text-base text-gray-400 mb-3">{item.source}</p>
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>
    );
  };

  return (
    <section id="experience" className="py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>Experience & Education</SectionTitle>
        <div ref={ref} className="max-w-3xl mx-auto">
          {timelineItems.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              isLast={index === timelineItems.length - 1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Contact Section ---
const ContactSection = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1, triggerOnce: true });
  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-12">
        <SectionTitle>Contact Me</SectionTitle>
        <div 
          ref={ref} 
          className={`text-center mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <p className="text-base text-gray-300 mb-4">
            Have a project in mind or want to connect? Feel free to reach out.
          </p>
          <a
            href="mailto:your-email@example.com" // Update this
            data-hoverable="true"
            className="inline-block text-lg font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            avindu2019@gmail.com
          </a>
        </div>
        <form 
          ref={ref}
          className={`space-y-6 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
          <StyledInput id="name" type="text" label="Name" />
          <StyledInput id="email" type="email" label="Email" />
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              data-hoverable="true"
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              data-hoverable="true"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const StyledInput = ({ id, type, label }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      data-hoverable="true"
      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
    />
  </div>
);

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Avindu Vidusanka. All rights reserved.</p>
        {/* Add social links here */}
      </div>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      {/* This style block is a HACK for the single-file environment.
        In a real project, this would be in your global CSS file.
        It must be here to load the font and set base styles. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        html {
          scroll-behavior: smooth;
        }
        /* Custom cursor hides the default one */
        * {
          cursor: none;
        }
        /* Hide custom cursor on mobile */
        @media (max-width: 768px) {
          .fixed.top-0.left-0 {
            display: none;
          }
          * {
            cursor: auto;
          }
        }
        
        /* Animation for floating orbs */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        /* Animation for skills marquee */
        @keyframes marquee-slow {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
        
        /* NEW: Animation for hero lines */
        @keyframes line-flow-1 {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-line-flow-1 {
          animation: line-flow-1 8s linear infinite;
          animation-delay: 1s;
        }
        
        @keyframes line-flow-2 {
          0% { transform: translateY(100%); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-line-flow-2 {
          animation: line-flow-2 8s linear infinite;
          animation-delay: 3s;
        }
        
        @keyframes line-flow-3 {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .animate-line-flow-3 {
          animation: line-flow-3 10s linear infinite;
          animation-delay: 2s;
        }

        /* NEW: Animation for gradient text */
        @keyframes text-pan {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        .animate-text-pan {
          background-size: 200%;
          animation: text-pan 3s linear infinite;
        }
      `}</style>
      
      <CustomCursor />
      <Header />
      <main>
        <HeroSection />
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <AboutSection />
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <ProjectsSection />
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <ServicesSection />
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <SkillsSection />
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <ExperienceSection /> {/* NEW SECTION ADDED */}
        <hr className="border-t border-neutral-800/50 max-w-7xl mx-auto" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}