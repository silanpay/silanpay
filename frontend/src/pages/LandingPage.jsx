import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  CreditCard,
  Building2,
  Shield,
  Smartphone,
  Code,
  Tag,
  BarChart3,
  RefreshCw,
  ArrowLeftRight,
  Smile,
  Store,
  Package,
  Monitor,
  GraduationCap,
  Zap,
  Lock,
  Rocket,
  BarChart,
  Globe,
  Wrench,
  CheckCircle as CheckIcon,
  Heart,
  Link as LinkIcon,
  Phone,
  Mail,
  MessageCircle,
  ShoppingCart,
  QrCode,
  Wallet as WalletIcon,
  Clock,
  CalendarDays,
  Activity,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/layout/Header";
import AboutUs from "../components/AboutUs";
import ScrollToTop from "../components/common/ScrollToTop";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PaymentSolutionsWithCursorScroll from './PaymentSolutions-CursorScroll';




gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const servicesRef = useRef(null);
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const heroContainerRef = useRef(null);
  const paymentsRef = useRef(null);
  const trackRef = useRef(null);
  const autoTweenRef = useRef(null);
  const resumeTimeoutRef = useRef(null);
  const settlementCardRef = useRef(null);
  const settlementContentRef = useRef(null);
  // Unlock Business Growth section refs
  const unlockSectionRef = useRef(null);
  const unlockCardsRef = useRef(null);

  // GSAP Settlement Section Animation
  useEffect(() => {
    const card = settlementCardRef.current;
    const content = settlementContentRef.current;
    if (!card || !content) return;

    // Create a timeline for the settlement card
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // Animate the card
    tl.fromTo(card, 
      { 
        y: 100,
        opacity: 0,
        rotate: 15,
        scale: 0.8
      },
      { 
        y: 0,
        opacity: 1,
        rotate: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      }
    );

    // Create a timeline for the content
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: "top center+=100",
        end: "center center",
        scrub: 1,
      }
    });

    // Animate the content elements
    contentTl.fromTo(content.querySelectorAll('.feature-card'),
      {
        y: 50,
        opacity: 0,
        stagger: 0.2
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
      }
    );

    return () => {
      tl.kill();
      contentTl.kill();
    };
  }, []);

  // Unlock Business Growth - GSAP ScrollTrigger animation (pin + stagger)
  useEffect(() => {
    const section = unlockSectionRef.current;
    const container = unlockCardsRef.current;
    if (!section || !container) return;

    const cards = container.querySelectorAll('.unlock-card');
    const dashboard = container.querySelector('.dashboard-card');

    // Pin the section and animate cards in with a stagger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
        pinSpacing: false,
      }
    });

    tl.fromTo(cards,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.14, ease: 'power3.out' }
    );

    // subtle floating pulse for dashboard card
    if (dashboard) {
      gsap.to(dashboard, { y: -10, repeat: -1, yoyo: true, duration: 3.2, ease: 'sine.inOut' });
    }

    // small parallax on background blobs (if any)
    const blobs = section.querySelectorAll('.bg-blob');
    if (blobs.length) {
      blobs.forEach((b, i) => {
        gsap.to(b, { y: (i % 2 === 0 ? -20 : 20), duration: 10 + i * 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(s => s.kill());
    };
  }, []);

  // Services data
  const services = [
    {
      icon: Globe,
      title: "UPI Payment Collection",
      subtitle: "Accept payments instantly",
      description:
        "Efficient, secure, real-time UPI payment solutions for quick and hassle-free transactions. Accept payments instantly through India's most popular payment method with industry-leading success rates.",
      features: [
        "Real-time UPI payments with instant confirmation",
        "T+1 settlement for faster fund availability",
        "99.8% transaction success rates",
        "Easy API integration with comprehensive documentation",
        "Support for all major UPI apps",
        "Automated reconciliation and reporting",
      ],
      color: "from-[#228DCE] to-[#1a6fa8]",
      bgColor: "bg-[#e8f4fb]",
    },
    {
      icon: Wrench,
      title: "API Integration Service",
      subtitle: "Powerful developer tools",
      description:
        "Seamless API integration solutions to enhance system functionality. We cover strategic planning, development, deployment, and maintenance for optimal performance with 24/7 technical support.",
      features: [
        "RESTful API with JSON responses",
        "Comprehensive SDK for multiple languages",
        "Strategic planning and consultation",
        "Seamless deployment and monitoring",
        "Performance optimization and caching",
        "24/7 technical support and documentation",
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      subtitle: "Lightning-fast bulk transfers",
      description:
        "Innovation, security, and efficiency in delivering seamless payout services via UPI and IMPS. Enhanced transaction speed and reliability for all your payout needs with real-time tracking.",
      features: [
        "Instant UPI payouts in under 5 seconds",
        "IMPS transfers 24/7 including holidays",
        "Bulk payout processing for multiple recipients",
        "Real-time status tracking and notifications",
        "Automated retry mechanism for failed transactions",
        "Comprehensive dashboard with analytics",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: CheckIcon,
      title: "Payment Solution Provider",
      subtitle: "Complete payment ecosystem",
      description:
        "Innovative and secure payment solutions for streamlining transactions. Online and mobile payment processing for businesses of all sizes with enterprise-grade security and compliance.",
      features: [
        "Multi-channel payment acceptance",
        "Mobile and web SDK integration",
        "PCI DSS Level 1 compliance",
        "Advanced fraud detection and prevention",
        "Scalable infrastructure for high volume",
        "Customizable checkout experience",
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // GSAP 3D Mobile Animation
  useEffect(() => {
    const phone = phoneRef.current;
    const hero = heroContainerRef.current;

    if (!phone || !hero) return;

    // Scroll-triggered animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    scrollTl
      .fromTo(
        phone,
        {
          opacity: 0,
          rotationY: 90,
          rotationX: 20,
          z: -200,
          scale: 0.8,
        },
        {
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          scale: 1,
          duration: 1,
        }
      )
      .to(
        phone,
        {
          rotationY: 360,
          duration: 3,
        },
        0
      )
      .to(
        phone,
        {
          y: -40,
          duration: 2,
        },
        0.2
      )
      .to(
        phone,
        {
          y: 0,
          duration: 2,
        },
        2.2
      );

    // Mouse follow effect
    const handleMouseMove = (e) => {
      if (!phone) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      gsap.to(phone, {
        rotationY: (x / centerX) * 10,
        rotationX: (y / centerY) * -10,
        duration: 0.8,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      scrollTl.kill();
    };
  }, []);

// Scroll handler for sticky cards - SMOOTH VERSION
useEffect(() => {
  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollProgress = -rect.top / (rect.height - window.innerHeight);

    // Calculate which card should be active based on scroll
    const cardIndex = Math.min(
      Math.floor(scrollProgress * services.length),
      services.length - 1
    );

    setActiveCardIndex(Math.max(0, cardIndex));
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [services.length]);

  // Payments track: autoplay left<>right and user-controlled via scroll/touch
  useEffect(() => {
    const section = paymentsRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const updateSizes = () => ({
      containerWidth: section.offsetWidth,
      trackWidth: track.scrollWidth,
    });

    let { containerWidth, trackWidth } = updateSizes();
    const minX = Math.min(0, containerWidth - trackWidth); // negative or 0
    const maxX = 0;

    // Enhanced autoplay: continuous smooth movement
    const autoplayDistance = Math.abs(minX);
    autoTweenRef.current = gsap.timeline({ repeat: -1 })
      .to(track, {
        x: -autoplayDistance,
        duration: 15,
        ease: "none",
      })
      .to(track, {
        x: 0,
        duration: 0.1,
        ease: "none",
      });

    // Helper: check section in viewport
    const isInView = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // Wheel handler: scroll down -> cards move left, scroll up -> move right
    const onWheel = (e) => {
      if (!isInView()) return;
      // Read current x
      const currentX = gsap.getProperty(track, "x");
      // deltaY positive when scrolling down; we want translate left on down -> negative change
      const delta = -e.deltaY * 1.5; // sensitivity
      let newX = currentX + delta;
      newX = gsap.utils.clamp(minX, maxX, newX);

      // Pause autoplay while user interacts
      if (autoTweenRef.current && autoTweenRef.current.isActive()) {
        autoTweenRef.current.pause();
      }

      gsap.to(track, { x: newX, duration: 0.6, ease: "power3.out" });

      // resume autoplay after inactivity
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        autoTweenRef.current && autoTweenRef.current.play();
      }, 1200);
    };

    // Touch handlers for mobile
    let lastTouchX = null;
    const onTouchStart = (e) => {
      if (!isInView()) return;
      lastTouchX = e.touches[0].clientX;
      autoTweenRef.current && autoTweenRef.current.pause();
    };
    const onTouchMove = (e) => {
      if (lastTouchX == null) return;
      const touchX = e.touches[0].clientX;
      const delta = touchX - lastTouchX; // positive when moving right
      const currentX = gsap.getProperty(track, "x");
      let newX = currentX + delta;
      newX = gsap.utils.clamp(minX, maxX, newX);
      gsap.set(track, { x: newX });
      lastTouchX = touchX;
    };
    const onTouchEnd = () => {
      lastTouchX = null;
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        autoTweenRef.current && autoTweenRef.current.play();
      }, 900);
    };

    // Recalculate sizes on resize
    const onResize = () => {
      ({ containerWidth, trackWidth } = updateSizes());
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (autoTweenRef.current) {
        autoTweenRef.current.kill();
        autoTweenRef.current = null;
      }
      clearTimeout(resumeTimeoutRef.current);
    };
  }, []);


  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* ===== HERO SECTION WITH 3D MOBILE ===== */}
      <section className="py-2 bg-white overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12 ml-14">
          </div>

          <div
            className="grid items-center grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2"
            style={{ perspective: "1200px" }}
          >
            {/* Left Content */}
            <div className="space-y-8 lg:space-y-10 text-center lg:text-center">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                Transform Your Business with
                <span style={{ color: "#228DCE" }}>
                  {" "}
                  Smart Payment Solutions
                </span>
              </h1>

              <div className="flex flex-col justify-center gap-3 lg:gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: "#228DCE" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#1a6fa8")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#228DCE")
                  }
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold transition-colors duration-200 border-2 rounded-lg shadow-lg hover:shadow-xl"
                  style={{ color: "#228DCE", borderColor: "#228DCE" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#e8f4fb")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  View Documentation
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center pt-2 lg:pt-4 space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                <div className="text-xs lg:text-sm text-gray-500">Trusted by</div>
                <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                  <div className="text-sm lg:text-base font-semibold text-gray-700">
                    100+
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    Businesses
                  </div>
                  <div className="text-sm lg:text-base font-semibold text-gray-700">
                    ₹2.4k+
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    Processed
                  </div>
                </div>
              </div>
            </div>

 <div className="flex justify-center lg:justify-end">
  <div className="relative w-full max-w-lg h-[500px] lg:h-[600px] flex items-center justify-center">
    {/* Central Circle - RESPONSIVE */}
    <div className="relative z-10 flex flex-col items-center justify-center w-40 h-40 lg:w-48 lg:h-48 rounded-full shadow-2xl" style={{ background: `linear-gradient(135deg, #228DCE 0%, #1a6fa8 100%)` }}>
      <div className="text-center text-white">
        <div className="mb-1 text-lg lg:text-2xl font-bold">SilanPay</div>
        <div className="text-xs opacity-90">Payment Solutions</div>
      </div>
    </div>

    {/* Orbital Rings Container */}
    <div className="absolute inset-0 flex items-center justify-center">
      {/* MOBILE: Ring 1 - Inner Ring */}
      <div 
        className="absolute border-2 rounded-full opacity-60"
        style={{ 
          borderColor: '#228DCE', 
          borderStyle: 'dashed',
          width: '200px',
          height: '200px',
          animation: 'spin-orbit 20s linear infinite',
          display: 'block',
          '@media (min-width: 1024px)': {
            display: 'none'
          }
        }}
      />

      {/* MOBILE: Ring 2 - Outer Ring */}
      <div 
        className="absolute border-2 rounded-full opacity-40"
        style={{ 
          borderColor: '#228DCE', 
          borderStyle: 'dashed',
          width: '300px',
          height: '300px',
          animation: 'spin-orbit-reverse 30s linear infinite',
          display: 'block',
          '@media (min-width: 1024px)': {
            display: 'none'
          }
        }}
      />

      {/* DESKTOP: Ring 1 - Inner Ring - ALWAYS SHOW */}
      <div 
        style={{ 
          position: 'absolute',
          borderColor: '#228DCE', 
          borderStyle: 'dashed',
          borderWidth: '3px',
          borderRadius: '50%',
          width: '300px',
          height: '300px',
          opacity: 0.6,
          animation: 'spin-orbit 20s linear infinite'
        }}
      />

      {/* DESKTOP: Ring 2 - Outer Ring - ALWAYS SHOW */}
      <div 
        style={{ 
          position: 'absolute',
          borderColor: '#228DCE', 
          borderStyle: 'dashed',
          borderWidth: '3px',
          borderRadius: '50%',
          width: '420px',
          height: '420px',
          opacity: 0.4,
          animation: 'spin-orbit-reverse 30s linear infinite'
        }}
      />
    </div>

    {/* Floating Icons with Orbital Animation */}
    {/* UPI Icon */}
    <div className="absolute animate-orbit-1 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center px-3 lg:px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
        <Smartphone className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#228DCE' }} />
        <span className="text-xs lg:text-sm font-semibold text-gray-700">UPI</span>
      </div>
    </div>

    {/* QR Code Icon */}
    <div className="absolute animate-orbit-2 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-full shadow-lg">
        <QrCode className="w-5 lg:w-6 h-5 lg:h-6 text-purple-600" />
      </div>
    </div>

    {/* Payment Link Icon */}
    <div className="absolute animate-orbit-3 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center px-3 lg:px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
        <LinkIcon className="w-4 lg:w-5 h-4 lg:h-5 text-green-600" />
        <span className="text-xs lg:text-sm font-semibold text-gray-700">Payment Links</span>
      </div>
    </div>

    {/* API Icon */}
    <div className="absolute animate-orbit-4 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-full shadow-lg">
        <Code className="w-5 lg:w-6 h-5 lg:h-6 text-orange-600" />
      </div>
    </div>

    {/* Cards Icon */}
    <div className="absolute animate-orbit-5 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center px-3 lg:px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
        <CreditCard className="w-4 lg:w-5 h-4 lg:h-5" style={{ color: '#228DCE' }} />
        <span className="text-xs lg:text-sm font-semibold text-gray-700">Cards</span>
      </div>
    </div>

    {/* Wallet Icon */}
    <div className="absolute animate-orbit-6 scale-75 lg:scale-100 origin-center">
      <div className="flex items-center justify-center w-10 lg:w-12 h-10 lg:h-12 bg-white rounded-full shadow-lg">
        <WalletIcon className="w-5 lg:w-6 h-5 lg:h-6 text-indigo-600" />
      </div>
    </div>

    {/* Floating Decorative Elements */}
    <div className="absolute w-2 lg:w-3 h-2 lg:h-3 rounded-full top-10 left-10 animate-float-1" style={{ backgroundColor: '#228DCE', opacity: 0.6 }}></div>
    <div className="absolute w-1.5 lg:w-2 h-1.5 lg:h-2 bg-purple-400 rounded-full top-20 right-16 animate-float-2"></div>
    <div className="absolute w-2 lg:w-3 h-2 lg:h-3 bg-green-400 rounded-full bottom-16 left-20 animate-float-3"></div>
    <div className="absolute w-1.5 lg:w-2 h-1.5 lg:h-2 bg-orange-400 rounded-full bottom-20 right-12 animate-float-1"></div>
  </div>
</div>

          </div>
        </div>
      </section>

      
{/* ===== OUR SERVICES - STICKY SCROLL ANIMATION (DESKTOP) / PLAIN LIST (MOBILE) ===== */}
<section
  ref={containerRef}
  className="relative bg-gradient-to-b from-white to-gray-50"
>
  {/* ===== DESKTOP VIEW - With Sticky Effects ===== */}
  <div
    className="hidden lg:block"
    style={{ height: `${services.length * 30}vh` }}
  >
    {/* Header Section - Desktop */}
<div className="relative z-10 bg-gradient-to-b from-white to-transparent pt-12 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <div
          className="inline-block px-6 py-2 mb-4 text-sm font-semibold rounded-full"
          style={{ backgroundColor: "#e8f4fb", color: "#228DCE" }}
        >
          Comprehensive business solutions
        </div>
        <h2 className="mb-3 text-4xl font-bold text-gray-900">
          Empowering your business with{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #228DCE, #228DCE)",
            }}
          >
            SilanPay
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-base text-gray-600">
          Scroll to explore our comprehensive services
        </p>
      </div>
    </div>

    {/* Sticky Container - Desktop Only */}
    <div className="sticky top-0 flex items-center justify-center h-screen overflow-hidden">
      <div className="w-full px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Cards Stack */}
        <div
          className="relative flex items-center justify-center w-full max-w-6xl mx-auto"
          style={{ minHeight: "65vh" }}
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isActive = index === activeCardIndex;
            const isPast = index < activeCardIndex;

            const translateY = isPast
              ? -120
              : isActive
              ? 0
              : (index - activeCardIndex) * 20;
            const scale = isActive
              ? 1
              : 0.95 - (index - activeCardIndex) * 0.02;
            const opacity = isPast
              ? 0
              : isActive
              ? 1
              : Math.max(0.3, 1 - (index - activeCardIndex) * 0.2);
            const zIndex = services.length - Math.abs(index - activeCardIndex);

            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center w-full transition-all duration-500 ease-out"
                style={{
                  transform: `translateY(${translateY}%) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                <div className="relative w-full max-w-5xl overflow-hidden bg-white border-2 border-gray-100 shadow-2xl rounded-3xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-3xl`}
                  ></div>

                  <div className="relative p-12">
                    <div className="flex items-start mb-6 space-x-6">
                      <div
                        className={`flex items-center justify-center flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
                      >
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-4xl font-bold text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-lg font-medium text-gray-500">
                          {service.subtitle}
                        </p>
                      </div>
                      <div className="flex flex-col items-center flex-shrink-0 space-y-2">
                        <div
                          className="flex items-center justify-center w-10 h-10 rounded-full"
                          style={{ backgroundColor: "#228DCE" }}
                        >
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-400">
                          {index + 1} / {services.length}
                        </span>
                      </div>
                    </div>

                    <p className="mb-8 text-lg leading-relaxed text-gray-600">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start p-4 space-x-3 transition-colors rounded-xl bg-gray-50"
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e8f4fb")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f9fafb")
                          }
                        >
                          <CheckCircle
                            className="flex-shrink-0 mt-1"
                            size={20}
                            style={{ color: "#228DCE" }}
                          />
                          <span className="text-sm font-medium leading-snug text-gray-900">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-500">
                        {isActive && activeCardIndex < services.length - 1
                          ? "Scroll down to see next service"
                          : isActive &&
                            activeCardIndex === services.length - 1
                          ? "Last service - scroll to continue"
                          : ""}
                      </div>
                      <ArrowRight
                        className="w-6 h-6"
                        style={{ color: "#228DCE" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>

  {/* ===== MOBILE & TABLET VIEW - Plain Vertical List (No Sticky) ===== */}
  <div className="lg:hidden">
    {/* Header Section - Mobile */}
    <div className="relative z-10 bg-gradient-to-b from-white to-transparent pt-10 pb-6 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div
          className="inline-block px-4 md:px-6 py-2 mb-3 md:mb-4 text-xs md:text-sm font-semibold rounded-full"
          style={{ backgroundColor: "#e8f4fb", color: "#228DCE" }}
        >
          Comprehensive business solutions
        </div>
        <h2 className="mb-2 md:mb-3 text-2xl md:text-3xl font-bold text-gray-900">
          Empowering your business with{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(to right, #228DCE, #228DCE)",
            }}
          >
            SilanPay
          </span>
        </h2>
      </div>
    </div>

    {/* Plain Vertical List - Mobile & Tablet */}
    <div className="py-8 md:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="relative w-full overflow-hidden bg-white border border-gray-100 shadow rounded-2xl p-4 md:p-6"
              >
                <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-12 md:w-14 h-12 md:h-14 rounded-lg bg-gradient-to-br ${service.color}`}
                  >
                    <IconComponent className="w-6 md:w-7 h-6 md:h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-gray-500">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs md:text-sm leading-relaxed text-gray-600 mb-3 md:mb-4">
                  {service.description}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div
                      key={idx}
                      className="text-[10px] md:text-xs font-semibold px-2 md:px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "#e8f4fb",
                        color: "#228DCE",
                      }}
                    >
                      {feature.split(" ")[0]}
                    </div>
                  ))}
                </div>

                {/* Card number - Desktop info for reference */}
                <div className="mt-3 text-xs text-gray-400">
                  Service {index + 1} of {services.length}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ===== COMPREHENSIVE PAYMENT SOLUTIONS ===== */}
      {/* <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Comprehensive Payment Solutions
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            Accept payments through 10+ methods including QR codes, UPI, cards,
            wallets, and more.
          </p>

          <div ref={paymentsRef} className="relative mt-6 overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-stretch gap-8 px-6 py-8 will-change-transform"
              style={{ touchAction: "pan-y", transform: "translateX(0)" }}
            >
              {[
                { name: "QR Code Payments", icon: QrCode, color: "bg-purple-50" },
                { name: "UPI", icon: Smartphone, color: "bg-cyan-50" },
                { name: "Wallets", icon: WalletIcon, color: "bg-indigo-50" },
                { name: "Net Banking", icon: Building2, color: "bg-emerald-50" },
                { name: "NEFT/RTGS", icon: ArrowLeftRight, color: "bg-yellow-50" },
                { name: "Cards", icon: CreditCard, color: "bg-pink-50" },
              ].map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className={`min-w-[320px] sm:min-w-[380px] md:min-w-[420px] lg:min-w-[480px] relative overflow-hidden transform transition-all duration-300 ease-out bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] ${method.color} p-8 lg:p-10`}
                  >
                    <div className="flex flex-col h-full justify-between items-center min-h-[380px] text-center">
                      <div>
                        <div className="flex flex-col items-center space-y-6">
                          <div className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-2xl transform transition-transform hover:scale-110" 
                               style={{ background: 'linear-gradient(135deg,#228DCE 0%, #1a6fa8 100%)' }}>
                            <IconComponent className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{method.name}</div>
                            <div className="text-base lg:text-lg text-gray-500 font-medium">
                              {method.name === "QR Code Payments" && "Scan & Pay in seconds"}
                              {method.name === "UPI" && "Direct bank transfers"}
                              {method.name === "Wallets" && "Digital wallet convenience"}
                              {method.name === "Net Banking" && "Bank-grade security"}
                              {method.name === "NEFT/RTGS" && "Large value transfers"}
                              {method.name === "Cards" && "Global payment acceptance"}
                            </div>
                          </div>
                        </div>

                        <div className="mt-10 space-y-6">
                          <div className="text-base lg:text-lg text-gray-700 leading-relaxed px-4">
                            {method.name === "QR Code Payments" && "Enable instant payments through dynamic & static QR codes. Perfect for retail, restaurants, and service businesses."}
                            {method.name === "UPI" && "Accept payments from any UPI app with instant confirmation. India's fastest-growing payment method."}
                            {method.name === "Wallets" && "Support all major digital wallets with seamless integration. Tap into the digital-first customer base."}
                            {method.name === "Net Banking" && "Direct integration with 100+ banks for secure online transactions. Trusted by millions."}
                            {method.name === "NEFT/RTGS" && "Handle high-value transactions with enterprise-grade security. Perfect for B2B payments."}
                            {method.name === "Cards" && "Accept credit & debit cards from all major networks. International payment ready."}
                          </div>
                          
                          <div className="flex flex-wrap justify-center gap-3">
                            {method.name === "QR Code Payments" && (
                              <>
                                <span className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-full transform transition-transform hover:scale-105">Dynamic QR</span>
                                <span className="px-4 py-2 text-sm font-medium bg-green-50 text-green-600 rounded-full transform transition-transform hover:scale-105">Instant Scan</span>
                                <span className="px-4 py-2 text-sm font-medium bg-purple-50 text-purple-600 rounded-full transform transition-transform hover:scale-105">Auto Reconcile</span>
                              </>
                            )}
                            {method.name === "UPI" && (
                              <>
                                <span className="px-4 py-2 text-sm font-medium bg-cyan-50 text-cyan-600 rounded-full transform transition-transform hover:scale-105">24/7 Available</span>
                                <span className="px-4 py-2 text-sm font-medium bg-teal-50 text-teal-600 rounded-full transform transition-transform hover:scale-105">Instant Transfer</span>
                                <span className="px-4 py-2 text-sm font-medium bg-emerald-50 text-emerald-600 rounded-full transform transition-transform hover:scale-105">Secure</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>  
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section> */}
      <PaymentSolutionsWithCursorScroll />

      
      {/* ===== T+0 & T+1 SETTLEMENT ===== */}
      <section className="min-h-screen flex items-center py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-12 -right-12 bg-blue-50 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute w-96 h-96 bottom-0 left-0 bg-cyan-50 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-50 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-10">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div ref={settlementContentRef} className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">Rapid Settlement System</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Get Paid Faster with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  T+0 & T+1
                </span>{" "}
                Settlement
              </h2>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience lightning-fast settlements. Your funds are credited to your account within the same day or next business day of transaction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Instant Settlement",
                    description: "Get T+0 settlement for selected payment methods",
                    icon: Zap,
                    color: "bg-green-50 text-green-600"
                  },
                  {
                    title: "Next Day Funds",
                    description: "T+1 settlement for all other transactions",
                    icon: CalendarDays,
                    color: "bg-blue-50 text-blue-600"
                  },
                  {
                    title: "Auto Reconciliation",
                    description: "Automated matching and settlement process",
                    icon: RefreshCw,
                    color: "bg-purple-50 text-purple-600"
                  },
                  {
                    title: "Real-time Tracking",
                    description: "Monitor settlement status 24/7",
                    icon: Activity,
                    color: "bg-amber-50 text-amber-600"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Interactive Settlement Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-3xl transform rotate-6 blur"></div>
              <div ref={settlementCardRef} className="relative p-8 rounded-2xl bg-white shadow-2xl border border-gray-100">
                <div className="space-y-6">
                  {/* Settlement Time Display */}
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-600">
                      <span className="animate-pulse mr-2">●</span>
                      <span className="font-medium">Processing Live</span>
                    </div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
                      T+0 & T+1
                    </div>
                    <div className="text-xl text-gray-600">Settlement Time</div>
                  </div>

                  {/* Animated Progress Timeline */}
                  <div className="space-y-4 pt-6">
                    {[
                      { time: "10:00 AM", status: "Payment Received", amount: "₹25,000" },
                      { time: "10:01 AM", status: "Processing", amount: "In Progress" },
                      { time: "10:15 AM", status: "Settlement Initiated", amount: "Pending" },
                      { time: "11:00 AM", status: "Funds Available", amount: "Completed" }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 text-sm text-gray-500">{step.time}</div>
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{step.status}</div>
                          <div className="text-sm text-gray-500">{step.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Real-time Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="p-4 rounded-xl bg-gray-50">
                      <div className="text-sm text-gray-500">Today's Settlements</div>
                      <div className="text-2xl font-bold text-gray-900">₹12.4M</div>
                      <div className="text-sm text-green-600">+12.5%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-50">
                      <div className="text-sm text-gray-500">Success Rate</div>
                      <div className="text-2xl font-bold text-gray-900">99.9%</div>
                      <div className="text-sm text-green-600">+0.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GET TO KNOW OUR STORY ===== */}
      {/* <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Get to Know Our Story
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-600">
            We're a team of passionate professionals dedicated to delivering
            exceptional results and creating meaningful experiences for our
            clients.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              { number: "100+", label: "Payment Modes", icon: CreditCard },
              { number: "500+", label: "Happy Customers", icon: Smile },
              { number: "100%", label: "Safe And Secure", icon: Shield },
              {
                number: "98%",
                label: "Transaction Success Rates",
                icon: ArrowLeftRight,
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-lg p-8 border ${
                    index === 0 ? "" : "border-gray-100"
                  }`}
                  style={
                    index === 0
                      ? { borderColor: "#228DCE", borderWidth: "2px" }
                      : {}
                  }
                >
                  <div
                    className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="mb-2 text-3xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}



      {/* ===== ABOUT US COMPONENT ===== */}
      <AboutUs />

      {/* ===== MISSION, VISION & CORE VALUES ===== */}
      {/* <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              Our Mission & Vision
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Driving innovation in digital payments to create a more connected
              and efficient financial ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2">
            <div
              className="p-8 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, #e8f4fb 0%, #d4ebf7 100%)",
              }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To create a cashless economy where every business, regardless of
                size, can access secure, reliable and innovative digital payment
                solutions that drive growth and financial inclusion.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                At Silansoftware Private Limited, our mission is to
                revolutionize the payment ecosystem by providing secure,
                seamless, and innovative payment solutions that empower
                businesses to grow, expand, and succeed in the digital economy.
              </p>
            </div>
          </div>

          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold text-gray-900">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: "Innovative Payment Solutions",
                description:
                  "We are committed to delivering cutting-edge, reliable payment gateway services that cater to the evolving needs of businesses of all sizes. By leveraging advanced technology, we ensure fast and secure transactions.",
                icon: Rocket,
                color: "from-purple-50 to-violet-50",
              },
              {
                title: "Focus on Security",
                description:
                  "Security is at the core of everything we do. Our top priority is safeguarding every transaction, ensuring that all payment data is encrypted and protected against fraud and cyber threats.",
                icon: Lock,
                color: "from-red-50 to-pink-50",
              },
              {
                title: "Customer-Centric Approach",
                description:
                  "We aim to build long-lasting relationships with our clients by providing personalized, user-friendly payment solutions that enhance customer experience.",
                icon: Heart,
                color: "from-blue-50 to-cyan-50",
              },
              {
                title: "Seamless Integration",
                description:
                  "Our platform is designed to integrate effortlessly with a wide range of business models, offering easy API integrations for merchants, retailers, and developers.",
                icon: LinkIcon,
                color: "from-green-50 to-teal-50",
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${value.color} rounded-2xl p-8 border border-gray-100`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full"
                      style={{ backgroundColor: "#228DCE" }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-3 text-xl font-bold text-gray-900">
                        {value.title}
                      </h4>
                      <p className="leading-relaxed text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* ===== OUR PRODUCTS ===== */}
      {/* <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Innovative solutions designed to streamline your business operations
            and enhance customer experience.
          </h2>
        </div>
      </section> */}

      {/* ===== UNLOCK BUSINESS GROWTH ===== */}
      <section className="py-15 bg-gray-50">
        <div className="px-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-5xl font-bold text-gray-900">
              Unlock access to{" "}
              <span style={{ color: "#228DCE" }}>
                limitless business growth
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              We're more than a payments partner. Get smoother payment processes
              and offer an outstanding experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 mb-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Realtime Analytics",
                icon: BarChart3,
                color: "bg-[#e8f4fb]",
              },
              {
                name: "Instant Refunds",
                icon: RefreshCw,
                color: "bg-green-100",
              },
              {
                name: "Advanced Fraud Protection",
                icon: Shield,
                color: "bg-red-100",
              },
              {
                name: "QR Code Payments",
                icon: Smartphone,
                color: "bg-purple-100",
              },
              {
                name: "UPI Integration",
                icon: Building2,
                color: "bg-orange-100",
              },
              {
                name: "Webhook Integration",
                icon: LinkIcon,
                color: "bg-cyan-100",
              },
              { name: "Mobile SDK", icon: Code, color: "bg-pink-100" },
              {
                name: "White-label Solutions",
                icon: Tag,
                color: "bg-indigo-100",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 transition-shadow duration-300 bg-white border border-gray-100 shadow-md rounded-xl hover:shadow-lg"
                >
                  <div
                    className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <IconComponent className="w-6 h-6 text-gray-700" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {feature.name}
                  </h4>
                </div>
              );
            })}
          </div>

          {/* <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Payment Dashboard
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Realtime transaction monitoring
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Success Rate</span>
                    <span
                      className="font-semibold"
                      style={{ color: "#228DCE" }}
                    >
                      98.5%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "98.5%", backgroundColor: "#228DCE" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Revenue Analytics
                </h4>
                <div className="text-2xl font-bold" style={{ color: "#228DCE" }}>
                  ₹3.1M
                </div>
                <div className="text-sm" style={{ color: "#228DCE" }}>
                  +12% from last month
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Active Transactions
                </h4>
                <div className="text-2xl font-bold" style={{ color: "#228DCE" }}>
                  1,247
                </div>
                <div className="text-sm text-gray-600">Processing now</div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* ===== BUILT FOR FINTECHS ===== */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Built for fintechs.{" "}
            <span style={{ color: "#228DCE" }}>Trusted by Businesses.</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Lending",
                description: "Smart disbursement + automated EMI collection",
                icon: CreditCard,
              },
              {
                title: "Marketplaces",
                description:
                  "Virtual account mapping + instant vendor settlement",
                icon: Store,
              },
              {
                title: "D2C",
                description:
                  "Subscription collections + digital soundbox confirmations",
                icon: Package,
              },
              {
                title: "SaaS Platform",
                description:
                  "Invoice-based collections + bill tagging & reconciliation",
                icon: Monitor,
              },
              {
                title: "E-commerce",
                description:
                  "Secure payments with fraud control and instant settlement",
                icon: ShoppingCart,
              },
              {
                title: "EduTech",
                description:
                  "Your data is securely encrypted. Customise dashboards to focus on what matters most to you.",
                icon: GraduationCap,
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="p-8 transition-shadow duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl"
                >
                  <div className="text-center">
                    <div
                      className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full"
                      style={{ backgroundColor: "#e8f4fb" }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: "#228DCE" }}
                      />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-20" style={{ backgroundColor: "#228DCE" }}>
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Elevate Your Business with SilanPay
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl" style={{ color: "#e8f4fb" }}>
            Join 10,000+ businesses that trust SilanPay for lightning-fast,
            secure payment processing with QR code integration.
          </p>

          <div className="flex flex-col items-center justify-center mb-8 space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {["Fast Integration", "99.9% Uptime", "24/7 Support"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-white"
                >
                  <CheckCircle size={20} />
                  <span>{feature}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== CONTACT & SUPPORT SECTION ===== */}
      <section className="py-1" style={{ backgroundColor: "#228DCE" }}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl" style={{ color: "#e8f4fb" }}>
              Get in touch with our team for personalized assistance and support
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Phone Support
              </h3>
              <p className="mb-2" style={{ color: "#e8f4fb" }}>
                +91 98765 43210
              </p>
              <p className="text-sm" style={{ color: "#d4ebf7" }}>
                Mon-Fri, 9AM-6PM IST
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Email Support
              </h3>
              <p className="mb-2" style={{ color: "#e8f4fb" }}>
                info@silanpay.com
              </p>
              <p className="text-sm" style={{ color: "#d4ebf7" }}>
                24/7 Response
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Live Chat
              </h3>
              <p className="mb-2" style={{ color: "#e8f4fb" }}>
                Available 24/7
              </p>
              <p className="text-sm" style={{ color: "#d4ebf7" }}>
                Instant Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
<footer>
  {/* Dark Background Section */}
  <div style={{ backgroundColor: "#212439" }}>
    <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {/* Products */}
        <div>
          <h4
            className="mb-4 text-lg font-bold"
            style={{ color: "#228DCE" }}
          >
            Products
            <div
              className="w-8 h-0.5 mt-1"
              style={{ backgroundColor: "#228DCE" }}
            ></div>
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link
                to="/upi-payments"
                className="transition-colors hover:text-[#228DCE]"
              >
                UPI Payments
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="transition-colors hover:text-[#228DCE]"
              >
                IMPS Transfer
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="transition-colors hover:text-[#228DCE]"
              >
                API Integration
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="transition-colors hover:text-[#228DCE]"
              >
                Wallet
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4
            className="mb-4 text-lg font-bold"
            style={{ color: "#228DCE" }}
          >
            Company
            <div
              className="w-8 h-0.5 mt-1"
              style={{ backgroundColor: "#228DCE" }}
            ></div>
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link
                to="/about-us"
                className="transition-colors hover:text-[#228DCE]"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="transition-colors hover:text-[#228DCE]"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="transition-colors hover:text-[#228DCE]"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="transition-colors hover:text-[#228DCE]"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/refund-policy"
                className="transition-colors hover:text-[#228DCE]"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Developers */}
        <div>
          <h4
            className="mb-4 text-lg font-bold"
            style={{ color: "#228DCE" }}
          >
            Developers
            <div
              className="w-8 h-0.5 mt-1"
              style={{ backgroundColor: "#228DCE" }}
            ></div>
          </h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>
              <Link
                to="#"
                className="transition-colors hover:text-[#228DCE]"
              >
                API Documentation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  {/* ===== CERTIFICATES & BADGES SECTION ===== */}
  <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-blue-700 py-8">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-white mb-2">
          Certifications & Recognitions
        </h3>
        <p className="text-sm text-gray-300">
          We are recognized by leading organizations in India
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
        {/* DPIIT Startup India */}
        <div className="flex items-center justify-center">
          <a
            href="https://startupodisha.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src="/certificates/startupodisa.png"
              alt="Startup Odisha"
              className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Digital India */}
        <div className="flex items-center justify-center">
          <a
            href="https://www.digitalindia.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src="/certificates/digitaindia.png"
              alt="Digital India"
              className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* Make In India */}
        <div className="flex items-center justify-center">
          <a
            href="https://www.iso.org/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src="/certificates/isocertificate.png"
              alt="ISO"
              className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>

        {/* MSME Registration */}
        <div className="flex items-center justify-center">
          <a
            href="https://www.msme.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <img
              src="/certificates/msme.png"
              alt="MSME Certified"
              className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* Company Info - Logo Right, Address Left - White Background Full Width */}
  <div
    className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-t"
    style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
  >
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between md:flex-row">
        {/* Address on Left */}
        <div className="mb-4 text-sm text-center text-gray-700 md:text-left md:mb-0">
          <p>📍 Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar, Odisha 751013</p>
          <p>📞 Call: +91-89842 89279</p>
          <p>🏢 Silansoftware Private Limited</p>
        </div>

        {/* Logo on Right */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/silanpaylogo.png"
              alt="SilanPay logo"
              className="object-contain w-auto h-10 sm:h-12"
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
  
  {/* Copyright - Full Width with Pay Color */}
  <div
    className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] text-sm text-center"
    style={{
      backgroundColor: "#228DCE",
      borderColor: "rgba(255, 255, 255, 0.2)",
    }}
  >
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>
        &copy; 2025{" "}
        <Link
          to="https://www.silansoft.com/"
          className="text-white hover:underline transition-colors"
        >
          Silansoftware Private Limited
        </Link>
        . All Rights Reserved.
      </p>
    </div>
  </div>
</footer>


      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTop />

      <style>{`
        /* subtle float used elsewhere */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        /* Unlock section entrance animation */
        @keyframes unlock-entrance {
          0% { opacity: 0; transform: translateY(18px) scale(0.995); }
          60% { opacity: 1; transform: translateY(-6px) scale(1.002); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Dashboard initial pop */
        @keyframes dashboard-entrance {
          0% { opacity: 0; transform: translateY(20px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Gentle float for the dashboard once visible */
        @keyframes dashboard-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Unlock cards base styles */
        .unlock-card {
          opacity: 0;
          transform-origin: center;
          animation: unlock-entrance 700ms cubic-bezier(.2,.9,.2,1) forwards;
          transition: box-shadow 220ms ease, transform 220ms ease;
        }

        /* Slight hover lift */
        .unlock-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
        }

        /* Dashboard card enters slightly later and then floats */
        .dashboard-card {
          opacity: 0;
          /* first run entrance, then start floating (float has a delay) */
          animation: dashboard-entrance 850ms cubic-bezier(.2,.9,.2,1) 140ms forwards,
                     dashboard-float 4s ease-in-out infinite 1200ms;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * { scroll-behavior: auto !important; }
          .unlock-card, .dashboard-card, .bg-blob { animation: none !important; transition: none !important; }
        }

        @media (prefers-reduced-motion: no-preference) {
          * { scroll-behavior: smooth; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;