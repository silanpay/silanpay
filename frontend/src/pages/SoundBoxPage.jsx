import React from "react";
import { Link } from "react-router-dom";
import {
  Volume2,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Battery,
  MessageSquare,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const SoundBoxPage = () => {
  const features = [
    {
      icon: Volume2,
      title: "Instant Voice Alerts",
      description: "Get instant audio confirmation for every payment received",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "Voice alerts in 11+ Indian languages for better accessibility",
    },
    {
      icon: Zap,
      title: "Bluetooth Connectivity",
      description: "Easy wireless connection with your smartphone",
    },
    {
      icon: Battery,
      title: "Long Battery Life",
      description: "Up to 7 days of battery backup on a single charge",
    },
  ];

  const benefits = [
    "No internet required after setup",
    "Works with all payment apps",
    "Loud & clear sound quality",
    "Portable & lightweight design",
    "Water & dust resistant (IP53)",
    "Automatic payment detection",
    "Multiple sound volume levels",
    "LED payment indicators",
  ];

  const specifications = [
    { label: "Battery", value: "2000mAh Li-ion" },
    { label: "Backup", value: "Up to 7 days" },
    { label: "Connectivity", value: "Bluetooth 5.0" },
    { label: "Languages", value: "11+ Indian languages" },
    { label: "Volume", value: "85 dB max" },
    { label: "Weight", value: "120 grams" },
    { label: "Warranty", value: "1 year" },
    { label: "Protection", value: "IP53 rated" },
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: "Small Shops",
      description:
        "Perfect for kirana stores, grocery shops, and local businesses",
    },
    {
      icon: Zap,
      title: "Restaurants",
      description: "Instant payment confirmation while serving customers",
    },
    {
      icon: Shield,
      title: "Service Providers",
      description: "Salons, clinics, and service centers",
    },
    {
      icon: Globe,
      title: "Street Vendors",
      description: "Mobile vendors, food stalls, and hawkers",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-amber-100 rounded-2xl">
              <Volume2 className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              SilanPay Sound Box
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Never miss a payment! Get instant voice confirmation for every UPI
              payment received. Works with all payment apps in 11+ languages.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-amber-600 rounded-xl hover:bg-amber-700 hover:scale-105 hover:shadow-xl"
              >
                Order Now - ₹999
              </Link>
              <Link
                to="/contact-us"
                className="px-8 py-4 text-lg font-semibold text-amber-600 transition-all duration-300 border-2 border-amber-600 rounded-xl hover:bg-amber-50"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Key Features
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Designed for Indian merchants with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-amber-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Perfect For
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Trusted by thousands of merchants across India
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 text-center transition-all duration-300 transform bg-white rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-amber-100 rounded-full">
                  <useCase.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Specifications */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Why Merchants Love It
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                The most reliable sound box for instant payment notifications
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white transition-all bg-amber-600 rounded-lg hover:bg-amber-700"
                >
                  Get Your Sound Box
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Technical Specifications
              </h2>
              <div className="p-8 bg-gray-50 rounded-2xl">
                <div className="grid grid-cols-1 gap-6">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-medium text-gray-600">
                        {spec.label}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-white text-center">
                  <div className="text-3xl font-bold mb-2">₹999</div>
                  <div className="text-amber-100">One-time purchase</div>
                  <div className="text-sm text-amber-100 mt-1">
                    Free delivery | 1 year warranty
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600">1L+</div>
              <div className="mt-2 text-gray-600">Active Devices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">4.8★</div>
              <div className="mt-2 text-gray-600">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">11+</div>
              <div className="mt-2 text-gray-600">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">7 Days</div>
              <div className="mt-2 text-gray-600">Battery Life</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-amber-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Never Miss a Payment Again!
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-amber-100">
            Get your SilanPay Sound Box today and experience hassle-free payment
            tracking
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-amber-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Order Now - ₹999
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <div className="mt-6 text-amber-100">
            Free delivery • 7-day return policy • 1-year warranty
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default SoundBoxPage;
