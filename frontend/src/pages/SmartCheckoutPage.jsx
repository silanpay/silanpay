import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const SmartCheckoutPage = () => {
  const features = [
    {
      icon: Zap,
      title: "One-Click Checkout",
      description:
        "Reduce cart abandonment with lightning-fast checkout experience",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description:
        "Fully responsive design that works perfectly on all devices",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "PCI DSS compliant with advanced fraud detection",
    },
    {
      icon: Globe,
      title: "Multiple Payment Options",
      description: "Support for UPI, cards, wallets, net banking, and more",
    },
  ];

  const benefits = [
    "Increase conversion rate by 40%",
    "Reduce checkout time by 70%",
    "Auto-fill customer details",
    "Guest checkout available",
    "Save cards for future use",
    "Real-time payment status",
    "Customizable checkout UI",
    "Built-in analytics dashboard",
  ];

  const integrationSteps = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your account and get API keys",
    },
    {
      step: "2",
      title: "Integrate",
      description: "Add our SDK or API to your website",
    },
    {
      step: "3",
      title: "Go Live",
      description: "Start accepting payments instantly",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-purple-100 rounded-2xl">
              <ShoppingCart className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Smart Checkout
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Boost your conversions with our intelligent checkout solution.
              One-click payments, auto-fill forms, and seamless experience
              across all devices.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-purple-600 rounded-xl hover:bg-purple-700 hover:scale-105 hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact-us"
                className="px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-xl hover:bg-purple-50"
              >
                View Demo
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
              Why Smart Checkout?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Features that make your checkout experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-purple-600" />
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
                  <div className="mb-6 text-center">
                    <div className="text-5xl font-bold text-purple-600">
                      40%
                    </div>
                    <div className="mt-2 text-xl text-gray-900">
                      Higher Conversion
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      Compared to standard checkout
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        70%
                      </div>
                      <div className="text-xs text-gray-600">
                        Faster Checkout
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        50%
                      </div>
                      <div className="text-xs text-gray-600">
                        Less Cart Abandonment
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Maximize Your Revenue
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Our smart checkout is designed to increase conversions and
                reduce friction
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Get Started in Minutes
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Simple 3-step integration process
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {integrationSteps.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-2xl font-bold text-white bg-purple-600 rounded-full">
                  {item.step}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
                {index < integrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-purple-200" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/docs"
              className="inline-flex items-center px-6 py-3 font-semibold text-purple-600 transition-all border-2 border-purple-600 rounded-lg hover:bg-purple-50"
            >
              View Documentation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Boost Your Conversions?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-purple-100">
            Start accepting payments with our smart checkout today
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default SmartCheckoutPage;
