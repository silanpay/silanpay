import React, { useState, useEffect, useRef } from "react";
// import QRCode from ".../components/public";
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
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShoppingCart,
  QrCode,
  Wallet as WalletIcon,
  Clock,
  CalendarDays,
  Activity,
  Star,
  Users,
  TrendingUp,
  Award,
  Target,
  Coffee,
  PlayCircle,
  ChevronRight,
  Sparkles,
  Repeat,
  Bell,
  Copy,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

gsap.registerPlugin(ScrollTrigger);

// Quick Integration Card Component with Language Switching
const QuickIntegrationCard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("nodejs");
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    nodejs: `// Initialize SilanPay
import SilanPay from 'silanpay-sdk';

const silanpay = new SilanPay({
  apiKey: 'your_api_key',
  environment: 'production'
});

// Create payment
const payment = await silanpay.createPayment({
  amount: 1000,
  currency: 'INR',
  orderId: 'ORD123',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210'
  }
});`,
    php: `<?php
// Initialize SilanPay
require_once('vendor/autoload.php');

use SilanPay\\SilanPay;

$silanpay = new SilanPay([
    'apiKey' => 'your_api_key',
    'environment' => 'production'
]);

// Create payment
$payment = $silanpay->createPayment([
    'amount' => 1000,
    'currency' => 'INR',
    'orderId' => 'ORD123',
    'customer' => [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'phone' => '+919876543210'
    ]
]);`,
    python: `# Initialize SilanPay
from silanpay import SilanPay

silanpay = SilanPay(
    api_key='your_api_key',
    environment='production'
)

# Create payment
payment = silanpay.create_payment(
    amount=1000,
    currency='INR',
    order_id='ORD123',
    customer={
        'name': 'John Doe',
        'email': 'john@example.com',
        'phone': '+919876543210'
    }
)`,
  };

  const languageNames = {
    nodejs: "Node.js",
    php: "PHP",
    python: "Python",
  };

  // Handle copy to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[selectedLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative p-4 transition-all duration-500 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-primary-300 animate-fadeInLeft group">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-lg shadow-md w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Quick Integration
            </h3>
            <p className="text-xs text-gray-500">Ready in minutes</p>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white transition-all bg-teal-600 rounded-md hover:bg-teal-700 hover:scale-105"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Language Selection Tabs */}
      <div className="flex gap-1.5 mb-3">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setSelectedLanguage("nodejs");
            setCopied(false);
          }}
          className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-all ${
            selectedLanguage === "nodejs"
              ? "bg-primary-500 text-white shadow-md"
              : "bg-primary-50 text-primary-700 hover:bg-primary-100"
          }`}
        >
          Node.js
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setSelectedLanguage("php");
            setCopied(false);
          }}
          className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-all ${
            selectedLanguage === "php"
              ? "bg-green-500 text-white shadow-md"
              : "bg-green-50 text-green-700 hover:bg-green-100"
          }`}
        >
          PHP
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setSelectedLanguage("python");
            setCopied(false);
          }}
          className={`flex-1 px-2 py-1.5 text-xs font-bold rounded-md transition-all ${
            selectedLanguage === "python"
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
          }`}
        >
          Python
        </button>
      </div>

      {/* Code Display */}
      <div className="mb-3 overflow-hidden border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-xs font-medium text-gray-600">
              {languageNames[selectedLanguage]}
            </span>
          </div>
        </div>
        <div className="p-3 overflow-x-auto max-h-64">
          <pre className="font-mono text-xs leading-relaxed text-gray-800">
            {codeExamples[selectedLanguage]}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-teal-600" />
          <span>Quick Setup</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-600" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [counters, setCounters] = useState({
    customers: 0,
    uptime: 0,
    processed: 0,
    support: 0,
  });

  // Animation refs
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const partnersRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const qrCode = "/QR CODE.jpg";

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        customers: Math.floor(10000 * progress),
        uptime: Math.floor(99.9 * progress * 10) / 10,
        processed: Math.floor(100 * progress),
        support: progress >= 1 ? 24 : Math.floor(24 * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({
          customers: 10000,
          uptime: 99.9,
          processed: 100,
          support: 24,
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Data for various sections
  const stats = [
    {
      number:
        counters.customers >= 10000
          ? "10K+"
          : `${Math.floor(counters.customers / 1000)}K+`,
      label: "Happy Customers",
      icon: Users,
    },
    {
      number: `${counters.uptime.toFixed(1)}%`,
      label: "Uptime",
      icon: Activity,
    },
    {
      number:
        counters.processed >= 100 ? "₹100Cr+" : `₹${counters.processed}Cr+`,
      label: "Processed",
      icon: TrendingUp,
    },
    {
      number: counters.support >= 24 ? "24/7" : `${counters.support}/7`,
      label: "Support",
      icon: Clock,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Payments",
      description:
        "Lightning-fast UPI payments with real-time confirmation and settlement",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption and fraud protection for all your transactions",
    },
    {
      icon: Code,
      title: "Easy Integration",
      description: "Simple APIs and SDKs for seamless integration in minutes",
    },
    {
      icon: Globe,
      title: "Multi-Platform",
      description: "Works across web, mobile, and all major payment platforms",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Comprehensive dashboard with insights and transaction analytics",
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Round-the-clock customer support and technical assistance",
    },
  ];

  const services = [
    {
      icon: QrCode,
      title: "QR Code Payments",
      description:
        "Dynamic and static QR codes for instant payment collection in minutes with no setup required",
    },
    {
      icon: Smartphone,
      title: "UPI Integration",
      description:
        "Complete UPI payment gateway integration with all apps including Google Pay, PhonePe, Paytm, and more",
    },
    {
      icon: CreditCard,
      title: "Payment Gateway",
      description:
        "Full-featured payment gateway supporting all major cards and wallets including Visa, Mastercard, and more",
    },
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description:
        "Custom payment solutions for large enterprises and busine with advanced reporting and analytics",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "TechStart Solutions",
      text: "SilanPay has revolutionized our payment process. The integration was seamless and the support team is fantastic!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      company: "E-Commerce Plus",
      text: "Amazing service! Our transaction success rate increased by 15% after switching to SilanPay.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      company: "Retail Chain Co.",
      text: "The real-time analytics and reporting features have helped us optimize our business operations significantly.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹999",
      period: "/month",
      description: "Perfect for small businesses",
      features: [
        "Up to 1,000 transactions/month",
        "Basic UPI integration",
        "Email support",
        "Standard analytics",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "₹2,999",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 10,000 transactions/month",
        "Full payment gateway",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited transactions",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation with parallax
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // Payment card float animation
      gsap.to(".payment-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Stats animation on scroll with bounce
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, scale: 0.5, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Features section cards with stagger
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-section",
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Services cards slide in from sides
      gsap.fromTo(
        ".service-card",
        { opacity: 0, x: -50, rotateY: -15 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // How It Works section
      gsap.fromTo(
        ".step-card",
        { opacity: 0, scale: 0.8, rotateX: -20 },
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".how-it-works-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pricing cards pop in
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, scale: 0.7, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Testimonials slide in
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, x: 100, rotateY: 45 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Contact cards bounce in
      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Section headings fade in from top
      gsap.utils.toArray(".section-heading").forEach((heading) => {
        gsap.fromTo(
          heading,
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Badges and icons rotate in
      gsap.utils.toArray(".badge-animate").forEach((badge) => {
        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0, rotate: -180 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badge,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Button hover effect with GSAP
      gsap.utils.toArray(".cta-button").forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ===== 1. HERO SECTION ===== */}
      <section
        ref={heroRef}
        className="relative -mt-16 overflow-hidden bg-white"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="min-h-[calc(100vh-4rem)] flex items-center pt-20 pb-12 md:pt-24 md:pb-16">
            <div className="grid items-center w-full grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
              {/* Left Side - Content */}
              <div className="space-y-6 text-center lg:text-left">
                {/* Trust Badge */}
                <div className="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-full text-primary-700 border-primary-100 bg-primary-50 hero-content">
                  <Shield className="w-4 h-4 mr-2" />
                  Trusted by 1,000+ Businesses
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl hero-content">
                  Secure Payments 100%
                  <span className="block text-primary-600">Made Simple</span>
                </h1>

                {/* Subtitle */}
                <p className="max-w-lg mx-auto text-lg leading-relaxed text-gray-600 sm:text-xl lg:mx-0 hero-content">
                  Accept payments seamlessly with our reliable UPI, QR codes,
                  and payment gateway solutions. Start processing payments in
                  minutes.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row lg:justify-start hero-content">
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary-600 text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 button-ripple cta-button"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 pt-6 sm:gap-6 sm:pt-8 lg:grid-cols-4 hero-content">
                  {stats.map((stat, index) => {
                    const colors = [
                      "bg-purple-500",
                      "bg-emerald-500",
                      "bg-orange-500",
                      "bg-rose-500",
                    ];
                    return (
                      <div
                        key={index}
                        className={`text-center lg:text-left stat-item animate-fadeInUp delay-${
                          (index + 1) * 100
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 mx-auto mb-2 transition-all duration-300 rounded-lg shadow-lg ${colors[index]} sm:w-12 sm:h-12 lg:mx-0 animate-pulse`}
                        >
                          <stat.icon className="w-5 h-5 text-white transition-transform duration-300 sm:w-6 sm:h-6 group-hover:scale-110" />
                        </div>
                        <div className="text-xl font-bold text-gray-900 sm:text-2xl">
                          {stat.number}
                        </div>
                        <div className="text-xs text-gray-600 sm:text-sm">
                          {stat.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Professional Payment Card */}
              <div className="flex justify-center mt-8 lg:justify-end lg:mt-0">
                <div className="relative w-full max-w-sm mx-auto payment-card lg:mx-0">
                  {/* Card Container */}
                  <div className="overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-xl hover:shadow-2xl rounded-xl sm:rounded-2xl hover:scale-105">
                    {/* Card Header */}
                    <div className="p-3 text-white sm:p-4 bg-primary-500">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center justify-center rounded-lg w-7 h-7 sm:w-8 sm:h-8 bg-white/20">
                            <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold sm:text-base">
                              SilanPay
                            </h3>
                            <p className="text-[10px] sm:text-xs text-primary-100">
                              Payment Gateway
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-primary-100">
                            Success Rate
                          </div>
                          <div className="text-lg font-bold">99.9%</div>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs">Live & Processing</span>
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="p-4">
                      <h4 className="mb-2 text-xs font-semibold text-center text-gray-900 sm:mb-3 sm:text-sm">
                        Supported Payment Methods
                      </h4>

                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {[
                          {
                            icon: QrCode,
                            name: "QR",
                            color: "text-purple-600",
                            id: "qr",
                          },
                          {
                            icon: Smartphone,
                            name: "UPI",
                            color: "text-primary-600",
                            id: "upi",
                          },
                          {
                            icon: CreditCard,
                            name: "Cards",
                            color: "text-green-600",
                            id: "cards",
                          },
                          {
                            icon: WalletIcon,
                            name: "Wallets",
                            color: "text-orange-600",
                            id: "wallets",
                          },
                          {
                            icon: Building2,
                            name: "Banking",
                            color: "text-cyan-600",
                            id: "banking",
                          },
                          {
                            icon: Globe,
                            name: "More",
                            color: "text-gray-600",
                            id: "more",
                          },
                        ].map((method, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                            className={`p-2 text-center transition-all rounded-lg cursor-pointer ${
                              selectedPaymentMethod === method.id
                                ? "bg-primary-100 border-2 border-primary-500 shadow-md"
                                : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                            }`}
                          >
                            <method.icon
                              className={`w-5 h-5 ${method.color} mx-auto mb-1`}
                            />
                            <div className="text-xs font-medium text-gray-700">
                              {method.name}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Dynamic Content Area */}
                      <div className="mb-4 min-h-[120px] transition-all duration-300">
                        {selectedPaymentMethod === "qr" && (
                          <div className="p-4 space-y-3 border-2 border-purple-200 rounded-lg bg-purple-50 animate-fadeIn">
                            <div className="flex items-center justify-center">
                              <div className="p-3 bg-white rounded-lg shadow-md">
                                {/* <QrCode className="w-20 h-20 text-purple-600" /> */}
                                <img
                                  src={qrCode}
                                  alt="QR Code"
                                  className="w-20 h-20"
                                />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-semibold text-gray-800">
                                Scan QR Code
                              </p>
                              <p className="text-xs text-gray-600">
                                Quick & secure payment
                              </p>
                            </div>
                          </div>
                        )}

                        {selectedPaymentMethod === "upi" && (
                          <div className="p-4 space-y-3 border-2 rounded-lg border-primary-200 bg-primary-50 animate-fadeIn">
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-800">
                                Enter UPI ID
                              </label>
                              <input
                                type="text"
                                placeholder="yourname@upi"
                                className="w-full px-3 py-2 text-sm border-2 rounded-lg border-primary-300 focus:outline-none focus:border-primary-500"
                              />
                            </div>
                            <button className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700">
                              Verify UPI ID
                            </button>
                          </div>
                        )}

                        {selectedPaymentMethod === "cards" && (
                          <div className="p-4 space-y-3 border-2 border-green-200 rounded-lg bg-green-50 animate-fadeIn">
                            <div className="flex items-center justify-around mb-2">
                              <div className="px-3 py-1 text-xs font-semibold text-white rounded bg-primary-600">
                                VISA
                              </div>
                              <div className="px-3 py-1 text-xs font-semibold text-white bg-orange-600 rounded">
                                MasterCard
                              </div>
                              <div className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded">
                                RuPay
                              </div>
                            </div>
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full px-3 py-2 text-sm border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="MM/YY"
                                  className="flex-1 px-3 py-2 text-sm border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                />
                                <input
                                  type="text"
                                  placeholder="CVV"
                                  className="flex-1 px-3 py-2 text-sm border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedPaymentMethod === "wallets" && (
                          <div className="p-4 space-y-3 border-2 border-orange-200 rounded-lg bg-orange-50 animate-fadeIn">
                            <p className="text-sm font-semibold text-center text-gray-800">
                              Select Wallet
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "Paytm",
                                "PhonePe",
                                "Google Pay",
                                "Amazon Pay",
                              ].map((wallet, idx) => (
                                <button
                                  key={idx}
                                  className="px-3 py-2 text-xs font-semibold text-gray-700 transition-colors bg-white border-2 border-orange-300 rounded-lg hover:bg-orange-100"
                                >
                                  {wallet}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedPaymentMethod === "banking" && (
                          <div className="p-4 space-y-3 border-2 rounded-lg border-cyan-200 bg-cyan-50 animate-fadeIn">
                            <label className="text-sm font-semibold text-gray-800">
                              Select Your Bank
                            </label>
                            <select className="w-full px-3 py-2 text-sm border-2 rounded-lg border-cyan-300 focus:outline-none focus:border-cyan-500">
                              <option>Choose Bank</option>
                              <option>State Bank of India</option>
                              <option>HDFC Bank</option>
                              <option>ICICI Bank</option>
                              <option>Axis Bank</option>
                              <option>Kotak Mahindra Bank</option>
                            </select>
                            <button className="w-full px-4 py-2 text-sm font-semibold text-white transition-colors rounded-lg bg-cyan-600 hover:bg-cyan-700">
                              Continue to Net Banking
                            </button>
                          </div>
                        )}

                        {selectedPaymentMethod === "more" && (
                          <div className="p-4 space-y-3 border-2 border-gray-200 rounded-lg bg-gray-50 animate-fadeIn">
                            <p className="text-sm font-semibold text-center text-gray-800">
                              More Payment Options
                            </p>
                            <div className="space-y-2">
                              {["EMI Options", "Pay Later"].map(
                                (option, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-lg"
                                  >
                                    <span className="text-xs font-medium text-gray-700">
                                      {option}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {!selectedPaymentMethod && (
                          <div className="flex items-center justify-center h-[120px] text-center animate-fadeIn">
                            <div className="space-y-2">
                              <div className="flex justify-center">
                                <div className="p-3 bg-gray-100 rounded-full">
                                  <CreditCard className="w-8 h-8 text-gray-400" />
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-600">
                                Select a payment method above
                              </p>
                              <p className="text-xs text-gray-500">
                                Click to see how it works
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary-600">
                            10K+
                          </div>
                          <div className="text-xs text-gray-500">Merchants</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            99.9%
                          </div>
                          <div className="text-xs text-gray-500">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            24/7
                          </div>
                          <div className="text-xs text-gray-500">Support</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Success Badge */}
                  <div className="absolute flex items-center justify-center w-12 h-12 bg-green-500 rounded-full shadow-lg -top-3 -right-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATES SECTION ===== */}
      <section className="py-4 overflow-hidden border-gray-200 sm:py-6 bg-gray-50 border-y">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-3 text-center sm:mb-4">
            <p className="text-[10px] font-medium tracking-wider text-gray-500 uppercase sm:text-xs">
              Certifications & Recognitions
            </p>
          </div>

          <div className="relative">
            {/* Scrolling container */}
            <div className="flex animate-scroll-slow">
              {/* First set of certificates */}
              {[
                {
                  src: "/certificates/startupodisa.png",
                  alt: "Startup Odisha",
                  href: "https://startupodisha.gov.in/",
                },
                {
                  src: "/certificates/digitaindia.png",
                  alt: "Digital India",
                  href: "https://www.digitalindia.gov.in/",
                },
                {
                  src: "/certificates/isocertificate.png",
                  alt: "ISO",
                  href: "https://www.iso.org/home.html",
                },
                {
                  src: "/certificates/msme.png",
                  alt: "MSME Certified",
                  href: "https://www.msme.gov.in/",
                },
              ].map((cert, index) => (
                <a
                  key={`first-${index}`}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 transition-all duration-300 sm:px-6 group hover:scale-105"
                >
                  <div className="p-2 transition-all bg-white rounded-lg shadow-sm sm:p-3 group-hover:shadow-md">
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      className="object-contain w-auto h-8 transition-opacity opacity-60 sm:h-10 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                </a>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                {
                  src: "/certificates/startupodisa.png",
                  alt: "Startup Odisha",
                  href: "https://startupodisha.gov.in/",
                },
                {
                  src: "/certificates/digitaindia.png",
                  alt: "Digital India",
                  href: "https://www.digitalindia.gov.in/",
                },
                {
                  src: "/certificates/isocertificate.png",
                  alt: "ISO",
                  href: "https://www.iso.org/home.html",
                },
                {
                  src: "/certificates/msme.png",
                  alt: "MSME Certified",
                  href: "https://www.msme.gov.in/",
                },
              ].map((cert, index) => (
                <a
                  key={`second-${index}`}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 transition-all duration-300 sm:px-6 group hover:scale-105"
                >
                  <div className="p-2 transition-all bg-white rounded-lg shadow-sm sm:p-3 group-hover:shadow-md">
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      className="object-contain w-auto h-8 transition-opacity opacity-60 sm:h-10 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                </a>
              ))}
              {/* Duplicate set 3 for seamless loop */}
              {[
                {
                  src: "/certificates/startupodisa.png",
                  alt: "Startup Odisha",
                  href: "https://startupodisha.gov.in/",
                },
                {
                  src: "/certificates/digitaindia.png",
                  alt: "Digital India",
                  href: "https://www.digitalindia.gov.in/",
                },
                {
                  src: "/certificates/isocertificate.png",
                  alt: "ISO",
                  href: "https://www.iso.org/home.html",
                },
                {
                  src: "/certificates/msme.png",
                  alt: "MSME Certified",
                  href: "https://www.msme.gov.in/",
                },
              ].map((cert, index) => (
                <a
                  key={`third-${index}`}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 transition-all duration-300 sm:px-6 group hover:scale-105"
                >
                  <div className="p-2 transition-all bg-white rounded-lg shadow-sm sm:p-3 group-hover:shadow-md">
                    <img
                      src={cert.src}
                      alt={cert.alt}
                      className="object-contain w-auto h-8 transition-opacity opacity-60 sm:h-10 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll-slow {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll-slow {
          animation: scroll-slow 30s linear infinite;
        }
        
        .animate-scroll-slow:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      {/* ===== 2. FEATURES SECTION ===== */}
      <section
        ref={featuresRef}
        className="py-12 sm:py-16 md:py-20 lg:py-24 features-section bg-gray-50"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            {/* <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-primary-700 rounded-full bg-primary-50 badge-animate">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Why Choose SilanPay
            </div> */}
            <h2 className="px-4 mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl section-heading">
              Built for Modern Businesses
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
              Everything you need to accept payments, manage transactions, and
              grow your business - all in one powerful platform.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const featureColors = [
                "bg-primary-600",
                "bg-teal-600",
                "bg-indigo-600",
                "bg-amber-600",
                "bg-pink-600",
                "bg-cyan-600",
              ];
              return (
                <div
                  key={index}
                  className={`p-6 transition-all duration-300 transform bg-white shadow-lg sm:p-8 feature-card card-glow rounded-xl sm:rounded-2xl hover:shadow-xl hover:-translate-y-2 animate-fadeInUp delay-${
                    ((index % 6) + 1) * 100
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-12 h-12 mb-4 transition-transform duration-300 shadow-lg ${featureColors[index]} sm:mb-6 sm:w-14 sm:h-14 rounded-xl group-hover:scale-110 animate-scaleIn`}
                  >
                    <feature.icon className="w-6 h-6 text-white transition-all duration-300 sm:w-7 sm:h-7 group-hover:rotate-6" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* View All Features Button */}
          <div className="mt-8 text-center sm:mt-10 md:mt-12 animate-fadeInUp delay-600">
            <Link
              to="/features"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white transition-all duration-300 transform bg-primary-600 button-ripple cta-button sm:px-8 sm:py-4 sm:text-lg rounded-xl hover:bg-primary-700 hover:scale-105 hover:shadow-xl"
            >
              View All Features
              <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 3. SERVICES SECTION ===== */}
      <section ref={servicesRef} className="py-24 bg-white services-section">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            {/* <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-green-700 rounded-full bg-green-50 badge-animate">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Our Services
            </div> */}
            <h2 className="px-4 mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl section-heading">
              Complete Payment Solutions
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
              From UPI payments to enterprise solutions, we have everything you
              need to handle payments efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const serviceColors = [
                "bg-violet-600",
                "bg-lime-600",
                "bg-fuchsia-600",
                "bg-sky-600",
              ];
              return (
                <div
                  key={index}
                  className="p-6 transition-all duration-500 transform sm:p-8 group bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-2xl hover:-translate-y-3 service-card card-glow"
                >
                  <div
                    className={`flex items-center justify-center mb-4 transition-all duration-300 shadow-lg ${serviceColors[index]} w-14 h-14 sm:w-16 sm:h-16 sm:mb-6 rounded-xl group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <service.icon className="text-white w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-gray-900 sm:mb-4 sm:text-xl">
                    {service.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:mb-6 sm:text-base">
                    {service.description}
                  </p>
                  <div className="mb-4 font-semibold text-primary-600">
                    {service.price}
                  </div>
                  <Link
                    to="/services"
                    className="inline-flex items-center font-medium transition-colors text-primary-600 hover:text-primary-700"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* View All Services Button */}
          <div className="mt-8 text-center sm:mt-10 md:mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white transition-all duration-300 transform bg-primary-600 button-ripple cta-button sm:px-8 sm:py-4 sm:text-lg rounded-xl hover:bg-primary-700 hover:scale-105 hover:shadow-xl"
            >
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 4. HOW IT WORKS SECTION ===== */}
      <section className="py-12 bg-white sm:py-16 md:py-20 lg:py-24 how-it-works-section">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            {/* <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-primary-700 rounded-full bg-primary-50 badge-animate">
              <Rocket className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Integration Process
            </div> */}
            <h2 className="px-4 mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl section-heading">
              Get Started in 3 Simple Steps
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
              From registration to first transaction - complete setup in under
              10 minutes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-10 sm:gap-8 sm:mb-12 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description:
                  "Create your account with business details. Complete KYC verification instantly using Aadhaar and PAN.",
                details: [
                  "Email verification",
                  "Business documents upload",
                  "Bank account linking",
                ],
                time: "3 minutes",
                icon: Users,
                color: "bg-red-600",
              },
              {
                step: "02",
                title: "API Integration",
                description:
                  "Copy your API keys and integrate using our SDKs. Test in sandbox mode before going live.",
                details: [
                  "Get API credentials",
                  "Choose SDK (Node/PHP/Python)",
                  "Test transactions",
                ],
                time: "5 minutes",
                icon: Code,
                color: "bg-green-600",
              },
              {
                step: "03",
                title: "Go Live",
                description:
                  "Switch to production mode and start accepting real payments. Monitor everything from dashboard.",
                details: [
                  "Enable live mode",
                  "Configure webhooks",
                  "Start accepting payments",
                ],
                time: "2 minutes",
                icon: CheckCircle,
                color: "bg-yellow-600",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="h-full p-8 transition-all duration-500 border border-gray-200 bg-gray-50 rounded-2xl hover:border-primary-300 hover:shadow-2xl hover:-translate-y-2 step-card">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-5xl font-bold text-primary-100">
                      {step.step}
                    </div>
                    <div
                      className={`flex items-center justify-center shadow-lg ${step.color} w-14 h-14 rounded-xl`}
                    >
                      <step.icon className="text-white w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full text-primary-700 bg-primary-100">
                    <Clock className="w-4 h-4 mr-2" />
                    {step.time}
                  </div>
                </div>
                {index < 2 && (
                  <div className="absolute hidden transform -translate-y-1/2 lg:block top-1/2 -right-4">
                    <ArrowRight className="w-8 h-8 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Code Example */}
          <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 transition-transform bg-red-500 rounded-full hover:scale-110"></div>
                <div className="w-3 h-3 transition-transform bg-yellow-500 rounded-full hover:scale-110"></div>
                <div className="w-3 h-3 transition-transform bg-green-500 rounded-full hover:scale-110"></div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-400">
                  integration.js
                </span>
                <button
                  onClick={() => {
                    const code = `const silanpay = require('silanpay');\n\n// Initialize with API key\nsilanpay.configure({\n  apiKey: 'your_api_key_here',\n  environment: 'production'\n});\n\n// Create payment\nconst payment = await silanpay.payments.create({\n  amount: 1000,\n  currency: 'INR',\n  email: 'customer@example.com',\n  phone: '9876543210'\n});`;
                    navigator.clipboard.writeText(code);
                    const btn = event.currentTarget;
                    const icon = btn.querySelector("svg");
                    icon.style.display = "none";
                    btn.querySelector(".check-icon").style.display = "block";
                    setTimeout(() => {
                      icon.style.display = "block";
                      btn.querySelector(".check-icon").style.display = "none";
                    }, 2000);
                  }}
                  className="flex items-center px-3 py-1.5 space-x-2 text-sm font-medium text-white transition-all duration-300 bg-primary-600 rounded-lg hover:bg-primary-700 hover:scale-105 group"
                >
                  <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <Check className="hidden w-4 h-4 check-icon" />
                  <span>Copy Code</span>
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="relative p-6">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-purple-500"></div>
              <pre className="overflow-x-auto text-sm leading-relaxed">
                <code className="text-green-400">
                  <div className="mb-2">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-yellow-300">silanpay</span> ={" "}
                    <span className="text-purple-400">require</span>(
                    <span className="text-orange-400">'silanpay'</span>);
                  </div>

                  <div className="mb-2">
                    <span className="text-gray-500">
                      // Initialize with API key
                    </span>
                  </div>

                  <div className="mb-2">
                    <span className="text-yellow-300">silanpay</span>.
                    <span className="text-blue-400">configure</span>({`{`}
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">apiKey</span>:{" "}
                    <span className="text-orange-400">'your_api_key_here'</span>
                    ,
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">environment</span>:{" "}
                    <span className="text-orange-400">'production'</span>
                  </div>

                  <div className="mb-4">{`}`});</div>

                  <div className="mb-2">
                    <span className="text-gray-500">// Create payment</span>
                  </div>

                  <div className="mb-2">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-yellow-300">payment</span> ={" "}
                    <span className="text-purple-400">await</span>{" "}
                    <span className="text-yellow-300">silanpay</span>.
                    <span className="text-blue-400">payments</span>.
                    <span className="text-blue-400">create</span>({`{`}
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">amount</span>:{" "}
                    <span className="text-pink-400">1000</span>,
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">currency</span>:{" "}
                    <span className="text-orange-400">'INR'</span>,
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">email</span>:{" "}
                    <span className="text-orange-400">
                      'customer@example.com'
                    </span>
                    ,
                  </div>

                  <div className="pl-4 mb-2">
                    <span className="text-cyan-300">phone</span>:{" "}
                    <span className="text-orange-400">'9876543210'</span>
                  </div>

                  <div>{`}`});</div>
                </code>
              </pre>
            </div>

            {/* Footer Badge */}
            <div className="absolute top-4 right-4">
              {/* <div className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-primary-500 to-purple-500 animate-pulse">
                Live Example
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. ADVANCED FEATURES SECTION ===== */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            {/* <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-primary-700 rounded-full bg-primary-50 badge-animate">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Powerful Features
            </div> */}
            <h2 className="px-4 mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl section-heading">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 sm:text-lg md:text-xl animate-fadeInUp">
              Built-in tools and features that help you grow your business
              faster
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-10 sm:gap-8 sm:mb-12 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Advanced Security",
                description:
                  "Multi-layer security with AI-powered fraud detection and real-time risk monitoring",
                features: [
                  "PCI DSS Level 1 certified",
                  "256-bit SSL encryption",
                  "Two-factor authentication",
                ],
                badge: "Bank-Grade",
                color: "blue",
                iconBg: "bg-indigo-600",
              },
              {
                icon: BarChart3,
                title: "Smart Dashboard",
                description:
                  "Intuitive analytics dashboard with real-time insights and customizable reports",
                features: [
                  "Live transaction monitoring",
                  "Revenue analytics",
                  "Custom report builder",
                ],
                badge: "Real-Time",
                color: "green",
                iconBg: "bg-emerald-600",
              },
              {
                icon: Repeat,
                title: "Auto Reconciliation",
                description:
                  "Automated settlement reconciliation that saves hours of manual work",
                features: [
                  "Instant settlement matching",
                  "Discrepancy alerts",
                  "Automated reporting",
                ],
                badge: "Automated",
                color: "purple",
                iconBg: "bg-purple-600",
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description:
                  "Multi-channel alerts for transactions, settlements, and important events",
                features: [
                  "Email & SMS alerts",
                  "Webhook integration",
                  "Custom notification rules",
                ],
                badge: "Instant",
                color: "orange",
                iconBg: "bg-orange-600",
              },
              {
                icon: Users,
                title: "Team Management",
                description:
                  "Role-based access control with detailed permissions for team members",
                features: [
                  "Multi-user accounts",
                  "Custom role creation",
                  "Activity logs & audit trail",
                ],
                badge: "Collaborative",
                color: "indigo",
                iconBg: "bg-cyan-600",
              },
              {
                icon: TrendingUp,
                title: "Business Intelligence",
                description:
                  "AI-powered insights to optimize payment success rates and revenue",
                features: [
                  "Success rate optimization",
                  "Customer behavior analysis",
                  "Predictive analytics",
                ],
                badge: "AI-Powered",
                color: "pink",
                iconBg: "bg-pink-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-6 transition-all duration-500 bg-white border-2 border-gray-200 rounded-2xl hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2 group card-glow animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute top-4 right-4 px-3 py-1 bg-${feature.color}-100 text-${feature.color}-700 text-xs font-bold rounded-full animate-pulse`}
                >
                  {feature.badge}
                </div>
                <div
                  className={`flex items-center justify-center w-14 h-14 mb-4 ${feature.iconBg} rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                >
                  <feature.icon className="text-white w-7 h-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-600">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Integration & Support */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Quick Integration */}
            <QuickIntegrationCard />

            {/* 24/7 Support - Compact Redesigned */}
            <div className="relative p-4 overflow-hidden transition-all duration-500 bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-primary-300 animate-fadeInRight group">
              <div className="relative">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-lg shadow-md w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        24/7 Support
                      </h3>
                      <p className="text-xs font-medium text-gray-600">
                        We're always here to help
                      </p>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold text-green-700">
                      Live Now
                    </span>
                  </div>
                </div>

                <p className="mb-3 text-xs leading-relaxed text-gray-700">
                  Get instant support from our expert team anytime, anywhere.
                  We're committed to your success.
                </p>

                {/* Contact Options Grid */}
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {/* Phone Support */}
                  <a
                    href="tel:+918984289279"
                    className="flex items-center p-2 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 hover:border-primary-300 hover:shadow-md group/item"
                  >
                    <div className="flex items-center justify-center mr-2 rounded-md w-7 h-7 bg-primary-100">
                      <Phone className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">
                        Phone Support
                      </div>
                      <div className="text-xs text-gray-600">
                        +91 89842 89279
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 transition-all duration-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-primary-600" />
                  </a>

                  {/* WhatsApp/Live Chat */}
                  <button
                    onClick={() =>
                      window.open("https://wa.me/918984289279", "_blank")
                    }
                    className="flex items-center w-full p-2 text-left transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 hover:border-green-300 hover:shadow-md group/item"
                  >
                    <div className="flex items-center justify-center mr-2 bg-green-100 rounded-md w-7 h-7">
                      <MessageCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">
                        Live Chat
                      </div>
                      <div className="text-xs text-gray-600">
                        Instant assistance available
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 transition-all duration-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-green-600" />
                  </button>

                  {/* Email Support */}
                  <a
                    href="mailto:info@silanpay.com"
                    className="flex items-center p-2 transition-all duration-200 border border-gray-200 rounded-lg bg-gray-50 hover:border-teal-300 hover:shadow-md group/item"
                  >
                    <div className="flex items-center justify-center mr-2 bg-teal-100 rounded-md w-7 h-7">
                      <Mail className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-900">
                        Email Support
                      </div>
                      <div className="text-xs text-gray-600">
                        info@silanpay.com
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 transition-all duration-200 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:text-teal-600" />
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-gray-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mx-auto mt-10 mb-1 rounded-md w-7 h-7 bg-primary-100">
                      <Clock className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">
                      &lt; 30s
                    </div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mx-auto mt-10 mb-1 bg-green-100 rounded-md w-7 h-7">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">99.9%</div>
                    <div className="text-xs text-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mx-auto mt-10 mb-1 bg-teal-100 rounded-md w-7 h-7">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                    </div>
                    <div className="text-xs font-bold text-gray-900">24/7</div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. ADVANCED PAYMENT FEATURES ===== */}
      <section className="py-12 bg-white sm:py-16 md:py-20 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center sm:mb-12 md:mb-16">
            {/* <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-indigo-700 rounded-full bg-indigo-50">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Advanced Capabilities
            </div> */}
            <h2 className="px-4 mb-4 text-2xl font-bold text-gray-900 section-heading sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              Next-Generation Payment Technology
            </h2>
            <p className="max-w-3xl px-4 mx-auto text-base text-gray-600 animate-fadeInUp sm:text-lg md:text-xl">
              Cutting-edge features that give you a competitive advantage
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2">
            {/* Feature 1: Instant Settlement */}
            <div className="relative p-8 overflow-hidden transition-all duration-500 border-2 border-primary-200 bg-primary-50 rounded-3xl hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInLeft card-glow">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-transform duration-500 rounded-full bg-primary-200/30 group-hover:scale-150"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 shadow-lg bg-amber-600 group-hover:scale-110 group-hover:rotate-6 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Instant Settlement
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  Get your money in real-time. No more waiting for T+1 or T+2
                  days. Settlement happens instantly to your bank account.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/80 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      0 min
                    </div>
                    <div className="text-sm text-gray-600">Settlement Time</div>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary-600">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Availability</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Dynamic Routing */}
            <div className="relative p-8 overflow-hidden transition-all duration-500 border-2 border-purple-200 bg-purple-50 rounded-3xl hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInRight card-glow">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-transform duration-500 rounded-full bg-purple-200/30 group-hover:scale-150"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 shadow-lg bg-fuchsia-600 group-hover:scale-110 group-hover:rotate-6 rounded-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Smart Payment Routing
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  AI-powered routing automatically selects the best payment
                  gateway for each transaction to maximize success rates.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white/80 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-600">
                      +18%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="p-3 bg-white/80 rounded-xl backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-600">
                      Auto
                    </div>
                    <div className="text-sm text-gray-600">Optimization</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Recurring Payments */}
            <div
              className="relative p-8 overflow-hidden transition-all duration-500 border-2 border-green-200 bg-green-50 rounded-3xl hover:border-green-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInLeft card-glow"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-transform duration-500 rounded-full bg-green-200/30 group-hover:scale-150"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 shadow-lg bg-lime-600 group-hover:scale-110 group-hover:rotate-6 rounded-2xl">
                  <Repeat className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Subscription Management
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  Complete subscription billing system with automatic retries,
                  dunning management, and flexible pricing models.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-green-600 rounded-full"></div>
                    Daily, weekly, monthly, yearly plans
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-green-600 rounded-full"></div>
                    Automated invoice generation
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-green-600 rounded-full"></div>
                    Trial period & proration support
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 4: Split Payments */}
            <div
              className="relative p-8 overflow-hidden transition-all duration-500 border-2 border-orange-200 bg-orange-50 rounded-3xl hover:border-orange-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInRight card-glow"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 transition-transform duration-500 rounded-full bg-orange-200/30 group-hover:scale-150"></div>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 shadow-lg bg-rose-600 group-hover:scale-110 group-hover:rotate-6 rounded-2xl">
                  <ArrowLeftRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  Multi-Party Split
                </h3>
                <p className="mb-6 leading-relaxed text-gray-700">
                  Split payments instantly between multiple vendors, partners,
                  or accounts with customizable rules and ratios.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-orange-600 rounded-full"></div>
                    Instant multi-account transfer
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-orange-600 rounded-full"></div>
                    Percentage or fixed amount splits
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 mr-3 bg-orange-600 rounded-full"></div>
                    Perfect for marketplaces
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 border border-gray-200 bg-gray-50 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg shadow-md bg-violet-600">
                    <QrCode className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900">Dynamic QR Codes</h4>
              </div>
              <p className="text-sm text-gray-600">
                Generate unique QR codes for each transaction with auto-expiry
                and amount validation.
              </p>
            </div>

            <div className="p-6 border border-gray-200 bg-gray-50 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg shadow-md bg-emerald-600">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900">Payment Links</h4>
              </div>
              <p className="text-sm text-gray-600">
                Share payment links via SMS, email, or WhatsApp. No coding
                required, instant setup.
              </p>
            </div>

            <div className="p-6 border border-gray-200 bg-gray-50 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 mr-3 bg-white rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 mr-2 rounded-lg shadow-md bg-amber-600">
                    <RefreshCw className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h4 className="font-bold text-gray-900">Auto Refunds</h4>
              </div>
              <p className="text-sm text-gray-600">
                Instant automated refunds with customizable rules and approval
                workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. SMART FEATURES & AUTOMATION ===== */}
      <section ref={partnersRef} className="py-24 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            {/* <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-purple-700 rounded-full bg-purple-50 badge-animate">
              <Rocket className="w-4 h-4 mr-2" />
              Smart Automation
            </div> */}
            <h2 className="mb-6 text-4xl font-bold text-gray-900 section-heading md:text-5xl">
              Intelligent Features That Work For You
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 animate-fadeInUp">
              Powerful automation and smart features to streamline your payment
              operations
            </p>
          </div>

          {/* Main Features */}
          <div className="grid grid-cols-1 gap-8 mb-16 lg:grid-cols-2">
            {/* Smart Routing */}
            <div className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 rounded-3xl hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInUp card-glow">
              <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 transition-transform duration-500 bg-purple-100 rounded-full opacity-50 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 bg-indigo-600 shadow-lg rounded-2xl group-hover:rotate-6 group-hover:scale-110">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1 text-xs font-bold text-purple-700 transition-all duration-300 bg-purple-100 rounded-full animate-pulse">
                    AI-Powered
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Intelligent Payment Routing
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Automatically route transactions through the most optimal
                  payment gateway based on success rates, costs, and performance
                  metrics.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      Success Rate Increase
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      +25%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      Cost Optimization
                    </span>
                    <span className="text-lg font-bold text-purple-600">
                      -15%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Retry */}
            <div
              className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 rounded-3xl hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInUp card-glow"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 transition-transform duration-500 rounded-full opacity-50 bg-primary-100 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 shadow-lg bg-sky-600 rounded-2xl group-hover:rotate-6 group-hover:scale-110">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1 text-xs font-bold transition-all duration-300 rounded-full text-primary-700 bg-primary-100 animate-pulse">
                    Automated
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Smart Retry Mechanism
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Automatically retry failed transactions with intelligent
                  timing and alternate payment methods to maximize recovery
                  rates.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      Recovery Rate
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      35%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-medium text-gray-700">
                      Retry Attempts
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      3-5x
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Monitoring */}
            <div
              className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 rounded-3xl hover:border-green-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInUp card-glow"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 transition-transform duration-500 bg-green-100 rounded-full opacity-50 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 bg-green-600 shadow-lg rounded-2xl group-hover:rotate-6 group-hover:scale-110">
                    <Activity className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1 text-xs font-bold text-green-700 transition-all duration-300 bg-green-100 rounded-full animate-pulse">
                    Real-Time
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Live Transaction Monitoring
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Monitor all transactions in real-time with instant alerts for
                  suspicious activities, failures, or anomalies.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center p-3 text-sm text-gray-700 rounded-lg bg-gray-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-green-500" />
                    Instant fraud detection & alerts
                  </div>
                  <div className="flex items-center p-3 text-sm text-gray-700 rounded-lg bg-gray-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-green-500" />
                    Live dashboard with KPIs
                  </div>
                </div>
              </div>
            </div>

            {/* Webhooks & APIs */}
            <div
              className="relative overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 rounded-3xl hover:border-orange-400 hover:shadow-2xl hover:-translate-y-2 group animate-fadeInUp card-glow"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 transition-transform duration-500 bg-orange-100 rounded-full opacity-50 group-hover:scale-150"></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 bg-orange-600 shadow-lg rounded-2xl group-hover:rotate-6 group-hover:scale-110">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <span className="px-4 py-1 text-xs font-bold text-orange-700 transition-all duration-300 bg-orange-100 rounded-full animate-pulse">
                    Developer-Ready
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Advanced Webhook System
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  Get real-time updates for every transaction event with our
                  reliable webhook system and comprehensive APIs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center p-3 text-sm text-gray-700 rounded-lg bg-gray-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-orange-500" />
                    99.99% delivery guarantee
                  </div>
                  <div className="flex items-center p-3 text-sm text-gray-700 rounded-lg bg-gray-50">
                    <CheckCircle className="flex-shrink-0 w-5 h-5 mr-3 text-orange-500" />
                    20+ event types supported
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Smart Features */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 transition-all duration-500 bg-white border-2 border-gray-200 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:-translate-y-2 animate-fadeInUp card-glow">
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-transform duration-300 bg-purple-600 shadow-lg rounded-xl hover:rotate-6 hover:scale-110">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">
                Fraud Prevention
              </h4>
              <p className="mb-4 text-sm text-gray-600">
                AI-powered fraud detection with real-time risk scoring and
                automatic blocking
              </p>
              <div className="flex items-center text-sm font-semibold text-indigo-600">
                <span>99.8% Accuracy</span>
              </div>
            </div>

            <div
              className="p-6 transition-all duration-500 bg-white border-2 border-gray-200 rounded-2xl hover:border-pink-300 hover:shadow-xl hover:-translate-y-2 animate-fadeInUp card-glow"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-transform duration-300 shadow-lg bg-rose-600 rounded-xl hover:rotate-6 hover:scale-110">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">
                Predictive Analytics
              </h4>
              <p className="mb-4 text-sm text-gray-600">
                Forecast transaction volumes, identify trends, and optimize your
                payment strategy
              </p>
              <div className="flex items-center text-sm font-semibold text-pink-600">
                <span>ML-Powered Insights</span>
              </div>
            </div>

            <div
              className="p-6 transition-all duration-500 bg-white border-2 border-gray-200 rounded-2xl hover:border-teal-300 hover:shadow-xl hover:-translate-y-2 animate-fadeInUp card-glow"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-transform duration-300 shadow-lg bg-cyan-600 rounded-xl hover:rotate-6 hover:scale-110">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-bold text-gray-900">
                Instant Settlements
              </h4>
              <p className="mb-4 text-sm text-gray-600">
                Get your money instantly with our real-time settlement system -
                no waiting period
              </p>
              <div className="flex items-center text-sm font-semibold text-teal-600">
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 8. ABOUT SECTION ===== */}
      <section ref={aboutRef} className="py-24 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              {/* <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-orange-700 rounded-full bg-orange-50">
                <Heart className="w-4 h-4 mr-2" />
                About SilanPay
              </div> */}
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Built by Developers, for Developers
              </h2>
              <p className="mb-8 text-xl leading-relaxed text-gray-600">
                We understand the challenges of building payment systems because
                we've been there. That's why we created SilanPay - to make
                payments simple, secure, and scalable for every business.
              </p>

              <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                {[
                  {
                    icon: Rocket,
                    title: "Innovation First",
                    description: "Cutting-edge payment technology",
                    bg: "bg-orange-600",
                  },
                  {
                    icon: Shield,
                    title: "Security Focus",
                    description: "Bank-grade security standards",
                    bg: "bg-primary-600",
                  },
                  {
                    icon: Users,
                    title: "Customer Centric",
                    description: "24/7 dedicated support",
                    bg: "bg-green-600",
                  },
                  {
                    icon: Globe,
                    title: "Global Ready",
                    description: "Built for worldwide scale",
                    bg: "bg-purple-600",
                  },
                ].map((value, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform duration-300 rounded-lg shadow-lg ${value.bg} hover:scale-110 hover:rotate-6`}
                    >
                      <value.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-gray-900">
                        {value.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center font-semibold transition-all duration-300 text-primary-600 hover:text-primary-700 hover:translate-x-2 animate-fadeInLeft"
              >
                Learn more about our story
                <ChevronRight className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 transform bg-primary-400 rounded-3xl rotate-6 opacity-20 animate-float"></div>
              <div className="relative p-8 bg-white shadow-2xl rounded-3xl animate-scaleIn">
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-transform duration-300 bg-teal-600 shadow-xl rounded-2xl hover:rotate-12 hover:scale-110 animate-pulse">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    Silansoftware Pvt. Ltd.
                  </h3>
                  <p className="mb-8 text-gray-600">
                    Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar, Odisha
                    751013
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-primary-600">
                        2015
                      </div>
                      <div className="text-sm text-gray-600">Founded</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="text-2xl font-bold text-primary-600">
                        20+
                      </div>
                      <div className="text-sm text-gray-600">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CONTACT SECTION ===== */}
      <section ref={contactRef} className="py-24 bg-gray-50 contact-section">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            {/* <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-red-700 rounded-full bg-red-50 badge-animate">
              <Phone className="w-4 h-4 mr-2" />
              Get In Touch
            </div> */}
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl section-heading">
              Ready to Get Started?
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Have questions? Our team is here to help you get started with
              SilanPay.
            </p>
          </div>

          <div className="grid max-w-5xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 contact-card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 shadow-lg bg-sky-600 rounded-2xl">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Phone Support
              </h3>
              <p className="mb-4 text-gray-600">
                Get instant help from our support team
              </p>
              <p className="text-lg font-semibold text-primary-600">
                +91 89842 89279
              </p>
              <p className="mt-2 text-sm text-gray-500">Mon-Fri, 9AM-6PM IST</p>
            </div>

            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 contact-card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 shadow-lg bg-lime-600 rounded-2xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Email Us</h3>
              <p className="mb-4 text-gray-600">Send us your queries anytime</p>
              <p className="text-lg font-semibold text-green-600">
                info@silanpay.com
              </p>
              <p className="mt-2 text-sm text-gray-500">24/7 Response</p>
            </div>

            <div className="p-8 text-center transition-all duration-500 bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 contact-card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 shadow-lg bg-fuchsia-600 rounded-2xl">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Live Chat
              </h3>
              <p className="mb-4 text-gray-600">
                Chat with our experts instantly
              </p>
              <button className="px-6 py-2 font-semibold text-white transition-all duration-300 bg-purple-600 rounded-lg hover:bg-purple-700 hover:scale-105 button-ripple cta-button animate-scaleIn">
                Start Chat
              </button>
              <p className="mt-2 text-sm text-gray-500">Available 24/7</p>
            </div>
          </div>

          <div className="max-w-4xl p-6 mx-auto mt-10 bg-white shadow-xl sm:mt-12 md:mt-16 rounded-2xl sm:rounded-3xl sm:p-8 md:p-12">
            <div className="mb-6 text-center sm:mb-8">
              <h3 className="mb-2 text-xl font-bold text-gray-900 sm:text-2xl">
                Visit Our Office
              </h3>
              <p className="text-gray-600">Come meet us in person</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 shadow-lg bg-amber-600 rounded-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <p className="mb-2 text-lg font-medium text-gray-900">
                Silansoftware Private Limited
              </p>
              <p className="text-gray-600">
                Plot No-741, 2nd Floor, Jayadev Vihar
              </p>
              <p className="text-gray-600">Bhubaneswar, Odisha 751013</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-white bg-gray-900">
        {/* Main Footer Content */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2">
              <Link to="/" className="flex items-center mb-4 space-x-2 sm:mb-6">
                {/* <img
                  src="/silanpaylogo.png"
                  alt="SilanPay logo"
                  className="w-auto h-8 sm:h-10"
                /> */}
                <span className="text-4xl font-bold text-white">SilanPay</span>
              </Link>
              <p className="max-w-md mb-4 text-sm text-gray-300 sm:mb-6 sm:text-base">
                Empowering businesses with secure, fast, and reliable payment
                solutions. Join thousands of merchants who trust SilanPay for
                their payment needs.
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="https://wa.me/918984289279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors bg-green-600 rounded-full hover:bg-green-700 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.facebook.com/SilanSoftware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors bg-blue-600 rounded-full hover:bg-blue-700 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://x.com/SilanSoftware/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors rounded-full bg-sky-500 hover:bg-sky-600 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/silanpay/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors bg-blue-700 rounded-full hover:bg-blue-800 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.instagram.com/silan_software_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-colors bg-pink-600 rounded-full hover:bg-pink-700 w-9 h-9 sm:w-10 sm:h-10"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">
                Products
              </h4>
              <ul className="space-y-2 text-sm sm:space-y-3 sm:text-base">
                {[
                  "UPI Payments",
                  "QR Code Payments",
                  "Payment Gateway",
                  "API Integration",
                  "Instant Payouts",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to="#"
                      className="text-gray-300 transition-colors hover:text-primary-400"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">
                Company
              </h4>
              <ul className="space-y-2 text-sm sm:space-y-3 sm:text-base">
                {[
                  { name: "About Us", to: "/about-us" },
                  { name: "Contact Us", to: "/contact-us" },
                  { name: "Privacy Policy", to: "/privacy-policy" },
                  { name: "Terms & Conditions", to: "/terms" },
                  { name: "Refund Policy", to: "/refund-policy" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="text-gray-300 transition-colors hover:text-primary-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-800 sm:py-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <div className="text-xs text-center text-gray-400 sm:text-sm">
                © 2025 Silansoftware Private Limited. All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTop />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Animation delays for staggered effects */
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .hero-content {
          animation: slideInUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Staggered animation delays */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }

        /* Hover effects */
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .stat-item {
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: scale(1.05) translateY(-4px);
        }

        /* Gradient animation */
        .gradient-animate {
          background: linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6);
          background-size: 300% 300%;
          animation: gradient 8s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Shimmer effect */
        .shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }

        /* Card hover glow */
        .card-glow {
          transition: all 0.3s ease;
          position: relative;
        }

        .card-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
        }

        .card-glow:hover::before {
          opacity: 1;
        }

        /* Button ripple effect */
        .button-ripple {
          position: relative;
          overflow: hidden;
        }

        .button-ripple::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .button-ripple:hover::after {
          width: 300px;
          height: 300px;
        }

        /* Responsive animations */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (max-width: 768px) {
          .hero-content {
            animation-duration: 0.6s;
          }
          
          .feature-card:hover {
            transform: translateY(-4px) scale(1.01);
          }
        }
      `,
        }}
      />
    </div>
  );
};

export default LandingPage;
