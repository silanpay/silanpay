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
import Header from "../components/layout/Header";
import AboutUs from "../components/AboutUs";
import ScrollToTop from "../components/common/ScrollToTop";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LandingPage = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const servicesRef = useRef(null);
  const containerRef = useRef(null);

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

  // Scroll handler for sticky cards
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

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Centered Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full" style={{ backgroundColor: '#e8f4fb', color: '#228DCE' }}>
              <span className="w-2 h-2 mr-2 rounded-full" style={{ backgroundColor: '#228DCE' }}></span>
              Empowering Digital Financial Solutions
            </div>
          </div>

          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <div className="space-y-10 text-center lg:text-center">
              <h1 className="text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
                Transform Your Business with
                <span style={{ color: '#228DCE' }}>
                  {" "}
                  Smart Payment Solutions
                </span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Experience lightning-fast payments, seamless integrations, and
                enterprise-grade security.
              </p>

              {/* Key Benefits */}
              <div className="grid max-w-2xl grid-cols-1 gap-4 mx-auto sm:grid-cols-2">
                {[
                  { text: "Instant Settlement", icon: Zap },
                  { text: "Bank-Grade Security", icon: Lock },
                  { text: "48-Hour Integration", icon: Rocket },
                  { text: "Real-Time Analytics", icon: BarChart },
                  { text: "100+ Payment Methods", icon: CreditCard },
                  { text: "Global Reach", icon: Globe },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center space-x-3"
                    >
                      <IconComponent className="flex-shrink-0 w-5 h-5" style={{ color: '#228DCE' }} />
                      <span className="text-lg text-gray-700">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#228DCE' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1a6fa8'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#228DCE'}
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transition-colors duration-200 border-2 rounded-lg shadow-lg hover:shadow-xl"
                  style={{ color: '#228DCE', borderColor: '#228DCE' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#e8f4fb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  View Documentation
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center pt-8 space-x-6">
                <div className="text-sm text-gray-500">Trusted by</div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-semibold text-gray-700">
                    100+
                  </div>
                  <div className="text-sm text-gray-500">Businesses</div>
                  <div className="text-sm font-semibold text-gray-700">
                    ₹2.4k+
                  </div>
                  <div className="text-sm text-gray-500">Processed</div>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Orbital Design */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-[500px] lg:h-[600px] flex items-center justify-center">
                {/* Central Circle - DECREASED SIZE */}
                <div className="relative z-10 flex flex-col items-center justify-center w-48 h-48 rounded-full shadow-2xl" style={{ background: `linear-gradient(135deg, #228DCE 0%, #1a6fa8 100%)` }}>
                  <div className="text-center text-white">
                    <div className="mb-1 text-2xl font-bold">SilanPay</div>
                    <div className="text-xs opacity-90">Payment Solutions</div>
                  </div>
                </div>

                {/* Orbital Rings - DARKER & MORE VISIBLE */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Ring 1 - Darker */}
                  <div className="absolute w-[320px] h-[320px] border-[3px] rounded-full opacity-60 animate-spin-slow" style={{ borderColor: '#228DCE', borderStyle: 'dashed' }}></div>
                  
                  {/* Ring 2 - Darker */}
                  <div className="absolute w-[420px] h-[420px] border-[3px] rounded-full opacity-40 animate-spin-slower" style={{ borderColor: '#228DCE', borderStyle: 'dashed' }}></div>
                </div>

                {/* Floating Icons with Orbital Animation */}
                {/* UPI Icon */}
                <div className="absolute animate-orbit-1">
                  <div className="flex items-center px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
                    <Smartphone className="w-5 h-5" style={{ color: '#228DCE' }} />
                    <span className="text-sm font-semibold text-gray-700">UPI</span>
                  </div>
                </div>

                {/* QR Code Icon */}
                <div className="absolute animate-orbit-2">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                    <QrCode className="w-6 h-6 text-purple-600" />
                  </div>
                </div>

                {/* Payment Link Icon */}
                <div className="absolute animate-orbit-3">
                  <div className="flex items-center px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
                    <LinkIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">Payment Links</span>
                  </div>
                </div>

                {/* API Icon */}
                <div className="absolute animate-orbit-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                    <Code className="w-6 h-6 text-orange-600" />
                  </div>
                </div>

                {/* Cards Icon */}
                <div className="absolute animate-orbit-5">
                  <div className="flex items-center px-4 py-2 space-x-2 bg-white rounded-full shadow-lg">
                    <CreditCard className="w-5 h-5" style={{ color: '#228DCE' }} />
                    <span className="text-sm font-semibold text-gray-700">Cards</span>
                  </div>
                </div>

                {/* Wallet Icon */}
                <div className="absolute animate-orbit-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                    <WalletIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute w-3 h-3 rounded-full top-10 left-10 animate-float-1" style={{ backgroundColor: '#228DCE', opacity: 0.6 }}></div>
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-20 right-16 animate-float-2"></div>
                <div className="absolute w-3 h-3 bg-green-400 rounded-full bottom-16 left-20 animate-float-3"></div>
                <div className="absolute w-2 h-2 bg-orange-400 rounded-full bottom-20 right-12 animate-float-1"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Services - Sticky Scroll Animation */}
      <section
        ref={containerRef}
        className="relative bg-gradient-to-b from-white to-gray-50"
        style={{ height: `${services.length * 100}vh` }}
      >
        <div className="sticky top-0 flex items-center justify-center h-screen overflow-hidden">
          <div className="w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Section Header - INSIDE the sticky container */}
            <div className="mb-8 text-center">
              <div className="inline-block px-6 py-2 mb-3 text-sm font-semibold rounded-full" style={{ backgroundColor: '#e8f4fb', color: '#228DCE' }}>
                Comprehensive business solutions
              </div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 lg:text-4xl">
                Empowering your business with{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #228DCE, #228DCE)' }}>
                  SilanPay
                </span>
              </h2>
              <p className="max-w-2xl mx-auto text-base text-gray-600">
                Scroll to explore our comprehensive services
              </p>
            </div>

            {/* Cards Stack */}
            <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto" style={{ minHeight: "70vh" }}>
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isActive = index === activeCardIndex;
                const isPast = index < activeCardIndex;
                
                // Calculate card position
                const translateY = isPast ? -120 : isActive ? 0 : (index - activeCardIndex) * 20;
                const scale = isActive ? 1 : 0.95 - (index - activeCardIndex) * 0.02;
                const opacity = isPast ? 0 : isActive ? 1 : Math.max(0.3, 1 - (index - activeCardIndex) * 0.2);
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
                    {/* CARD - Increased size and padding */}
                    <div className="relative w-full max-w-5xl overflow-hidden bg-white border-2 border-gray-100 shadow-2xl rounded-3xl">
                      {/* Animated Background Gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 rounded-3xl`}
                      ></div>

                      {/* Content - ALL INSIDE CARD */}
                      <div className="relative p-8 md:p-12">
                        {/* Header */}
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
                            <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: '#228DCE' }}>
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-semibold text-gray-400">
                              {index + 1} / {services.length}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="mb-8 text-lg leading-relaxed text-gray-600">
                          {service.description}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-3">
                          {service.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-start p-4 space-x-3 transition-colors rounded-xl bg-gray-50"
                              style={{ ':hover': { backgroundColor: '#e8f4fb' } }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f4fb'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                            >
                              <CheckCircle
                                className="flex-shrink-0 mt-1"
                                size={20}
                                style={{ color: '#228DCE' }}
                              />
                              <span className="text-sm font-medium leading-snug text-gray-900">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                          <div className="text-sm text-gray-500">
                            {isActive && activeCardIndex < services.length - 1 
                              ? "Scroll down to see next service" 
                              : isActive && activeCardIndex === services.length - 1
                              ? "Last service - scroll to continue"
                              : ""}
                          </div>
                          <ArrowRight className="w-6 h-6" style={{ color: '#228DCE' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Dots - INSIDE sticky container */}
            <div className="flex justify-center mt-6 space-x-3">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeCardIndex === index
                      ? "w-8"
                      : "w-2 bg-gray-300"
                  }`}
                  style={activeCardIndex === index ? { backgroundColor: '#228DCE' } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA after services */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <p className="mb-6 text-xl text-gray-600">
            Each service is tailored to your specific needs and objectives,
            ensuring that we deliver solutions that are aligned with your
            goals and drive meaningful results.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: '#228DCE' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1a6fa8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#228DCE'}
          >
            Get Started Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Comprehensive Payment Solutions */}
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
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e8f4fb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <IconComponent className="w-6 h-6" style={{ color: '#228DCE' }} />
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

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Join thousands of businesses that trust SilanPay for their
              payment processing needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Rajesh Kumar",
                company: "TechStart Solutions",
                role: "CEO",
                content:
                  "SilanPay transformed our payment processing. The integration was seamless and the support team is exceptional. We've seen a 40% increase in successful transactions.",
                rating: 5,
                avatar: "RK",
              },
              {
                name: "Priya Sharma",
                company: "E-commerce Plus",
                role: "Operations Head",
                content:
                  "The real-time analytics and instant settlements have been game-changers for our business. SilanPay's platform is incredibly reliable and user-friendly.",
                rating: 5,
                avatar: "PS",
              },
              {
                name: "Amit Patel",
                company: "Digital Services Co.",
                role: "CTO",
                content:
                  "The API documentation is excellent and the webhook integration works flawlessly. We were up and running in just 2 days. Highly recommended!",
                rating: 5,
                avatar: "AP",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-lg text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-6 italic text-gray-600">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full" style={{ backgroundColor: '#e8f4fb' }}>
                    <span className="font-semibold" style={{ color: '#228DCE' }}>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* T+1 Settlement */}
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
                      style={{ color: '#228DCE' }}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e8f4fb 0%, #d4ebf7 100%)' }}>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold" style={{ color: '#228DCE' }}>
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

      {/* Get to Know Our Story */}
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
                  style={index === 0 ? { borderColor: '#228DCE', borderWidth: '2px' } : {}}
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ backgroundColor: '#228DCE' }}>
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

      {/* About Us Component */}
      <AboutUs />

      {/* Mission, Vision & Core Values */}
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
            {/* Our Vision */}
            <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e8f4fb 0%, #d4ebf7 100%)' }}>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To create a cashless economy where every business, regardless of
                size, can access secure, reliable and innovative digital payment
                solutions that drive growth and financial inclusion.
              </p>
            </div>

            {/* Our Mission */}
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

          {/* Core Values */}
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
                    <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full" style={{ backgroundColor: '#228DCE' }}>
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

      {/* Our Products */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="inline-block px-6 py-2 mb-6 text-white rounded-lg" style={{ backgroundColor: '#228DCE' }}>
            <span className="font-semibold">Our Products</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Innovative solutions designed to streamline your business operations
            and enhance customer experience.
          </h2>
        </div>
      </section>

      {/* Unlock Business Growth */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Unlock access to{" "}
              <span style={{ color: '#228DCE' }}>
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
              { name: "Webhook Integration", icon: LinkIcon, color: "bg-cyan-100" },
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

          {/* Payment Dashboard Card */}
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
                    <span className="font-semibold" style={{ color: '#228DCE' }}>98.5%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: "98.5%", backgroundColor: '#228DCE' }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Revenue Analytics
                </h4>
                <div className="text-2xl font-bold" style={{ color: '#228DCE' }}>₹3.1M</div>
                <div className="text-sm" style={{ color: '#228DCE' }}>
                  +12% from last month
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">
                  Active Transactions
                </h4>
                <div className="text-2xl font-bold" style={{ color: '#228DCE' }}>1,247</div>
                <div className="text-sm text-gray-600">Processing now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Fintechs */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Built for fintechs.{" "}
            <span style={{ color: '#228DCE' }}>Trusted by Businesses.</span>
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
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full" style={{ backgroundColor: '#e8f4fb' }}>
                      <IconComponent className="w-8 h-8" style={{ color: '#228DCE' }} />
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

      {/* Final CTA Section */}
      <section className="py-16" style={{ backgroundColor: '#228DCE' }}>
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Elevate Your Business with SilanPay
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl" style={{ color: '#e8f4fb' }}>
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

      {/* Contact & Support Section */}
      <section className="py-16" style={{ backgroundColor: '#228DCE' }}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-xl" style={{ color: '#e8f4fb' }}>
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
              <p className="mb-2" style={{ color: '#e8f4fb' }}>+91 98765 43210</p>
              <p className="text-sm" style={{ color: '#d4ebf7' }}>Mon-Fri, 9AM-6PM IST</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Email Support
              </h3>
              <p className="mb-2" style={{ color: '#e8f4fb' }}>support@silansoftware.com</p>
              <p className="text-sm" style={{ color: '#d4ebf7' }}>24/7 Response</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Live Chat
              </h3>
              <p className="mb-2" style={{ color: '#e8f4fb' }}>Available 24/7</p>
              <p className="text-sm" style={{ color: '#d4ebf7' }}>Instant Support</p>
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

      {/* Footer */}
      <footer className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Products */}
            <div>
              <h4 className="mb-4 text-lg font-bold" style={{ color: '#228DCE' }}>
                Products
                <div className="w-8 h-0.5 mt-1" style={{ backgroundColor: '#228DCE' }}></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="/upi-payments"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    UPI Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    IMPS Transfer
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    API Integration
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-lg font-bold" style={{ color: '#228DCE' }}>
                Company
                <div className="w-8 h-0.5 mt-1" style={{ backgroundColor: '#228DCE' }}></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="/about-us"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h4 className="mb-4 text-lg font-bold" style={{ color: '#228DCE' }}>
                Developers
                <div className="w-8 h-0.5 mt-1" style={{ backgroundColor: '#228DCE' }}></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="#"
                    className="transition-colors"
                    onMouseEnter={(e) => e.target.style.color = '#228DCE'}
                    onMouseLeave={(e) => e.target.style.color = '#374151'}
                  >
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Info */}
          <div className="pt-8 mt-12 border-t border-gray-200">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex items-center mb-4 space-x-3 md:mb-0">
                <span className="text-2xl font-bold">
                  <span style={{ color: '#212439' }}>Silan</span>
                  <span style={{ color: '#228DCE' }}>Pay</span>
                </span>
              </div>
              <div className="text-sm text-center text-gray-600 md:text-right">
                <p>📍 Plot No-741, 2nd Floor, Jayadev Vihar, 751013</p>
                <p>📍 Bhubaneswar, Odisha</p>
                <p>📞 Call: +91-89842 89279</p>
                <p>🏢 Silansoftware Private Limited</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gray-200">
            <p>
              &copy; 2025 Silansoftware Private Limited. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
