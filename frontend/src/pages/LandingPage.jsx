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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/layout/Header";
import AboutUs from "../components/AboutUs";
import ScrollToTop from "../components/common/ScrollToTop";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const servicesRef = useRef(null);
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const heroContainerRef = useRef(null);

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


  // Floating cards animation
  useEffect(() => {
    // Animate all floating cards with staggered animation
    gsap.to(".floating-card-upi", {
      y: -30,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".floating-card-card", {
      y: -35,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5,
    });

    gsap.to(".floating-card-wallet", {
      y: -25,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    gsap.to(".floating-card-qr", {
      y: -30,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });

    gsap.to(".floating-card-success", {
      y: -28,
      duration: 3.3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* ===== HERO SECTION WITH 3D MOBILE ===== */}
      <section ref={heroContainerRef} className="py-12 bg-white overflow-hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Centered Badge */}
          <div className="flex justify-center mb-8">
            <div
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full"
              style={{ backgroundColor: "#e8f4fb", color: "#228DCE" }}
            >
              <span
                className="w-2 h-2 mr-2 rounded-full"
                style={{ backgroundColor: "#228DCE" }}
              ></span>
              Accelerate Your Business Success Smooth Onboarding
            </div>
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

            {/* Right - Realistic 3D Mobile Phone with Animated Floating Cards */}
            <div className="flex justify-center lg:justify-end relative w-full" style={{ minHeight: "600px", maxHeight: "700px" }}>
              <div
                ref={phoneRef}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1500px",
                  transform: "translateZ(0)",
                }}
                className="relative z-10"
              >
                {/* === REALISTIC MOBILE PHONE START === */}
                <div
                  className="relative"
                  style={{
                    width: "260px",
                    height: "520px",
                    borderRadius: "2.5rem",
                    background:
                      "linear-gradient(120deg, #212439 70%, #228DCE 120%)",
                    boxShadow:
                      "0 20px 40px 0 rgba(34,141,206,0.20), 0 0 0 7px #f4f8fb inset, 0 2px 32px 0 #21243980",
                    border: "3px solid #e8f4fb",
                    zIndex: 1,
                  }}
                >
                  {/* Glass reflection */}
                  <div
                    className="absolute left-0 top-0 z-20"
                    style={{
                      width: "100%",
                      height: "40%",
                      background:
                        "linear-gradient(110deg,rgba(255,255,255,0.06) 60%, rgba(255,255,255,0.15) 100%)",
                    }}
                  ></div>

                  {/* Realistic notch */}
                  <div
                    className="absolute left-1/2 z-30"
                    style={{
                      top: "12px",
                      transform: "translateX(-50%)",
                      width: "65px",
                      height: "16px",
                      background: "#23273D",
                      borderRadius: "0 0 18px 18px",
                      boxShadow: "0 2px 5px #21243955",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                    }}
                  >
                    {/* Speaker */}
                    <div
                      style={{
                        width: "32px",
                        height: "3px",
                        backgroundColor: "#828999",
                        borderRadius: "2px",
                      }}
                    ></div>
                    {/* Camera */}
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#474e60",
                        borderRadius: "50%",
                        marginLeft: "8px",
                        border: "2px solid #222834",
                      }}
                    ></div>
                  </div>

                  {/* Screen */}
                  <div
                    className="relative"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "34px",
                      bottom: "30px",
                      background:
                        "linear-gradient(180deg,#f9fafc 40%,#e5f0f9 100%,#fff 120%)",
                      borderRadius: "1.8rem",
                      margin: "0 8px",
                      overflow: "hidden",
                      boxShadow: "0 1px 1.5px #cbe3f7 inset",
                      zIndex: 5,
                    }}
                  >
                    {/* Status bar */}
                    <div
                      className="flex items-center justify-between px-3 pt-1 pb-1 text-xs font-medium"
                      style={{
                        color: "#3e4a68",
                        letterSpacing: "0.02em",
                        fontWeight: 600,
                      }}
                    >
                      <span className="text-[10px]">9:41</span>
                      <div className="flex items-center gap-0.5">
                        <div
                          style={{
                            width: "16px",
                            height: "6px",
                            border: "1px solid #5c708a",
                            borderRadius: "1px",
                            position: "relative",
                            marginRight: "1px",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              width: "6px",
                              height: "100%",
                              background: "#5c708a",
                              borderRadius: "0 1px 1px 0",
                            }}
                          ></div>
                        </div>
                        <span style={{ color: "#10b981", fontWeight: 700, fontSize: "8px" }}>
                          ● ● ●
                        </span>
                      </div>
                    </div>

                    {/* Inside the screen content */}
                    <div className="px-3 pt-1.5 pb-2 w-full flex flex-col gap-1.5">
                      <div className="text-center py-0.5">
                        <h1 className="text-lg font-bold tracking-wide">
                          <span style={{ color: "#212439" }}>Silan</span>
                          <span style={{ color: "#228DCE" }}>Pay</span>
                        </h1>
                        <p className="text-[9px] text-blue-800 font-medium opacity-80 mt-0.5">
                          Digital Payment
                        </p>
                      </div>

                      {/* Main feature */}
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg,#fff 80%,#e8f4fb 120%)",
                          border: "1px solid #228DCE",
                        }}
                        className="rounded-lg py-2 px-1.5 mb-0.5 shadow-sm"
                      >
                        <div className="mb-1 text-lg">📱</div>
                        <h2 className="font-bold text-gray-900 text-[12px] mb-0.5">
                          Scan & Pay
                        </h2>
                        <p className="text-[10px] text-gray-600">
                          Instant QR
                        </p>
                      </div>

                      {/* QR Code */}
                      <div
                        className="bg-white border border-blue-100 rounded-lg px-2 py-2 mx-auto shadow-inner"
                        style={{ width: "fit-content" }}
                      >
                        <svg width="50" height="50" viewBox="0 0 120 120">
                          <rect width="120" height="120" fill="white" rx="8" />
                          <rect width="30" height="30" fill="#212439" />
                          <rect x="3" y="3" width="24" height="24" fill="white" />
                          <rect x="6" y="6" width="18" height="18" fill="#228DCE" />
                          <rect x="90" width="30" height="30" fill="#212439" />
                          <rect x="93" y="3" width="24" height="24" fill="white" />
                          <rect x="96" y="6" width="18" height="18" fill="#228DCE" />
                          <rect y="90" width="30" height="30" fill="#212439" />
                          <rect x="3" y="93" width="24" height="24" fill="white" />
                          <rect x="6" y="96" width="18" height="18" fill="#228DCE" />
                          {[...Array(18)].map((_, i) => (
                            <rect
                              key={i}
                              x={35 + (i % 4) * 12}
                              y={35 + Math.floor(i / 4) * 12}
                              width="7"
                              height="7"
                              fill={i % 3 === 0 ? "#228DCE" : "#212439"}
                            />
                          ))}
                        </svg>
                      </div>

                      {/* Feature icons */}
                      <div className="flex justify-between mt-1 gap-1">
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-blue-50 shadow p-1">
                            <CreditCard size={12} color="#228DCE" />
                          </div>
                          <span className="text-[8px] text-blue-800 font-semibold mt-0.5">
                            Card
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-green-50 shadow p-1">
                            <Smartphone size={12} color="#10b981" />
                          </div>
                          <span className="text-[8px] text-green-700 font-semibold mt-0.5">
                            UPI
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-yellow-50 shadow p-1">
                            <WalletIcon size={12} color="#f59e0b" />
                          </div>
                          <span className="text-[8px] text-yellow-700 font-semibold mt-0.5">
                            Wallet
                          </span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="rounded-full bg-purple-50 shadow p-1">
                            <QrCode size={12} color="#8b5cf6" />
                          </div>
                          <span className="text-[8px] text-purple-700 font-semibold mt-0.5">
                            QR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Home Bar */}
                  <div
                    className="absolute left-1/2 z-30"
                    style={{
                      bottom: "10px",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      style={{
                        width: "55px",
                        height: "5px",
                        borderRadius: "5px",
                        background:
                          "linear-gradient(90deg,#e8f4fb 0%,#228DCE 100%)",
                        boxShadow: "0 2px 5px #228DCE44",
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  {/* Subtle shadow backdrop */}
                  <div
                    className="absolute left-1/2"
                    style={{
                      width: "70%",
                      bottom: "-30px",
                      height: "35px",
                      background:
                        "radial-gradient(ellipse at center,#228DCE30 65%, transparent 80%)",
                      filter: "blur(7px)",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                    }}
                  ></div>
                </div>
                {/* === REALISTIC MOBILE PHONE END === */}

                {/* ===== ANIMATED FLOATING FINTECH CARDS (OPTIMIZED SIZE & POSITION - AWAY FROM MOBILE) ===== */}

                {/* UPI Payment Card - TOP RIGHT */}
                <div
                  className="floating-card-upi absolute -right-32 top-4 lg:top-8 bg-white rounded-xl p-2.5 shadow-lg border border-gray-100"
                  style={{
                    width: "130px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg"
                      style={{ backgroundColor: "#228DCE" }}
                    >
                      <Smartphone size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">UPI</p>
                      <p className="text-[10px] text-gray-600">Live</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">₹4,580</p>
                </div>

                {/* Card Payment Card - LEFT (AWAY FROM MOBILE) */}
                <div
                  className="floating-card-card absolute -left-28 top-24 lg:top-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-2.5 shadow-lg border border-green-200"
                  style={{
                    width: "120px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500"
                    >
                      <CreditCard size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Card</p>
                      <p className="text-[10px] text-gray-600">Active</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">₹926.67</p>
                </div>

                {/* Wallet Card - TOP CENTER */}
                <div
                  className="floating-card-wallet absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl px-3 py-2 shadow-lg border border-purple-200"
                  style={{
                    width: "fit-content",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500"
                    >
                      <WalletIcon size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Wallet</p>
                      <p className="text-[9px] text-gray-600">₹12.4k</p>
                    </div>
                  </div>
                </div>

                {/* QR Code Card - RIGHT BOTTOM (AWAY FROM MOBILE) */}
                <div
                  className="floating-card-qr absolute -right-32 bottom-16 lg:bottom-20 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-2.5 shadow-lg border border-orange-200"
                  style={{
                    width: "120px",
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500"
                    >
                      <QrCode size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">QR Pay</p>
                      <p className="text-[10px] text-gray-600">Scanned</p>
                    </div>
                  </div>
                </div>

                {/* Transaction Success Card - LEFT BOTTOM (AWAY FROM MOBILE) */}
                <div
                  className="floating-card-success absolute -left-28 bottom-24 lg:bottom-32 bg-white rounded-xl px-2.5 py-2 shadow-lg border-2"
                  style={{
                    borderColor: "#10b981",
                    width: "fit-content",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <CheckCircle size={16} style={{ color: "#10b981" }} />
                    <p className="text-xs font-bold text-gray-900">Success</p>
                  </div>
                  <p className="text-[8px] text-gray-600 mt-0.5">Confirmed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR SERVICES - STICKY SCROLL ANIMATION ===== */}
      <section
        ref={containerRef}
        className="relative bg-gradient-to-b from-white to-gray-50"
        style={{ height: `${services.length * 50}vh` }}
      >
        <div className="sticky top-0 flex items-center justify-center h-screen overflow-hidden">
          <div className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-0 text-center">
              <div
                className="inline-block px-6 py-2 mb-3 text-sm font-semibold rounded-full"
                style={{ backgroundColor: "#e8f4fb", color: "#228DCE" }}
              >
                Comprehensive business solutions
              </div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">
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

            {/* Cards Stack */}
            <div
              className="relative flex items-center justify-center w-full max-w-6xl mx-auto"
              style={{ minHeight: "70vh" }}
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

                      <div className="relative p-8 md:p-12">
                        <div className="flex items-start mb-6 space-x-6">
                          <div
                            className={`flex items-center justify-center flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg`}
                          >
                            <IconComponent className="w-10 h-10 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                              {service.title}
                            </h3>
                            <p className="text-base font-medium text-gray-500 md:text-lg">
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
                                (e.currentTarget.style.backgroundColor =
                                  "#e8f4fb")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  "#f9fafb")
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

            {/* <div className="flex justify-center mt-6 space-x-3">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCardIndex === index ? "w-8" : "w-2 bg-gray-300"
                  }`}
                  style={
                    activeCardIndex === index
                      ? { backgroundColor: "#228DCE" }
                      : {}
                  }
                />
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* ===== COMPREHENSIVE PAYMENT SOLUTIONS ===== */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Comprehensive Payment Solutions
          </h2>
          <p className="mb-12 text-lg text-gray-600">
            Accept payments through 100+ methods including QR codes, UPI, cards,
            wallets, and more.
          </p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: "QR Code Payments", icon: QrCode },
              { name: "UPI", icon: Smartphone },
              { name: "Wallets", icon: WalletIcon },
              { name: "Net Banking", icon: Building2 },
              { name: "NEFT/RTGS", icon: ArrowLeftRight },
              { name: "Cards", icon: CreditCard },
            ].map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="p-4 transition-colors duration-200 border border-gray-100 rounded-lg bg-gray-50"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e8f4fb")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f9fafb")
                  }
                >
                  <div className="flex flex-col items-center space-y-2">
                    <IconComponent
                      className="w-6 h-6"
                      style={{ color: "#228DCE" }}
                    />
                    <div className="text-sm font-medium text-center text-gray-700">
                      {method.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      {/* ===== T+1 SETTLEMENT ===== */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                T+1 Settlement
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                Get your money faster with our T+1 settlement feature. Funds are
                credited to your account within one business day of transaction.
              </p>
              <div className="space-y-4">
                {[
                  "T+1 settlement for QR code payments",
                  "Next business day processing for all transactions",
                  "Fast fund availability within 24 hours",
                  "Automated reconciliation",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle
                      className="flex-shrink-0"
                      size={20}
                      style={{ color: "#228DCE" }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="p-8 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #e8f4fb 0%, #d4ebf7 100%)",
              }}
            >
              <div className="text-center">
                <div
                  className="mb-2 text-4xl font-bold"
                  style={{ color: "#228DCE" }}
                >
                  T+1
                </div>
                <div className="mb-4 text-lg text-gray-600">
                  Settlement Time
                </div>
                <div className="text-sm text-gray-500">
                  Your funds are available the same day
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GET TO KNOW OUR STORY ===== */}
      <section className="py-16 bg-white">
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
      </section>

      {/* ===== ABOUT US COMPONENT ===== */}
      <AboutUs />

      {/* ===== MISSION, VISION & CORE VALUES ===== */}
      <section className="py-20 bg-white">
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
      </section>

      {/* ===== OUR PRODUCTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div
            className="inline-block px-6 py-2 mb-6 text-white rounded-lg"
            style={{ backgroundColor: "#228DCE" }}
          >
            <span className="font-semibold">Our Products</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Innovative solutions designed to streamline your business operations
            and enhance customer experience.
          </h2>
        </div>
      </section>

      {/* ===== UNLOCK BUSINESS GROWTH ===== */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Unlock access to{" "}
              <span style={{ color: "#228DCE" }}>
                limitless business growth
              </span>
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              We're more than a payments partner. Get smoother payment processes
              and offer an outstanding experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4">
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

          <div className="p-8 bg-white border border-gray-100 shadow-xl rounded-2xl">
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
          </div>
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
      <section className="py-16" style={{ backgroundColor: "#228DCE" }}>
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

          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-900"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* ===== CONTACT & SUPPORT SECTION ===== */}
      <section className="py-16" style={{ backgroundColor: "#228DCE" }}>
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

          <div className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-900"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2" size={20} />
            </Link>
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;