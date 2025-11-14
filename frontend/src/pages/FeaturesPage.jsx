import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Shield,
  Code,
  Globe,
  BarChart3,
  Heart,
  RefreshCw,
  Bell,
  Lock,
  Smartphone,
  Clock,
  CheckCircle,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const FeaturesPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Payments",
      description:
        "Lightning-fast UPI payments with real-time confirmation and instant settlement within 24 hours.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Advanced 256-bit encryption, PCI DSS compliance, and fraud protection for all transactions.",
      color: "green",
    },
    {
      icon: Code,
      title: "Easy Integration",
      description:
        "Simple RESTful APIs, SDKs for popular languages, and comprehensive documentation.",
      color: "purple",
    },
    {
      icon: Globe,
      title: "Multi-Platform Support",
      description:
        "Works seamlessly across web, mobile (iOS/Android), and all major payment platforms.",
      color: "indigo",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description:
        "Comprehensive dashboard with detailed insights, transaction analytics, and custom reports.",
      color: "orange",
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support via chat, email, and phone with dedicated account managers.",
      color: "pink",
    },
    {
      icon: RefreshCw,
      title: "Auto Reconciliation",
      description:
        "Automatic matching of payments with orders, reducing manual effort and errors.",
      color: "teal",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Real-time alerts for payments, refunds, and important events via email, SMS, and webhooks.",
      color: "red",
    },
    {
      icon: Lock,
      title: "Advanced Fraud Detection",
      description:
        "AI-powered fraud detection system that blocks suspicious transactions automatically.",
      color: "yellow",
    },
    {
      icon: Smartphone,
      title: "Mobile SDKs",
      description:
        "Native SDKs for iOS and Android with customizable UI and seamless integration.",
      color: "cyan",
    },
    {
      icon: Clock,
      title: "Fast Settlement",
      description:
        "T+1 settlement for most transactions with instant settlement available for premium plans.",
      color: "lime",
    },
    {
      icon: CheckCircle,
      title: "High Success Rate",
      description:
        "Industry-leading 99.9% success rate with intelligent retry mechanisms for failed payments.",
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    indigo: "bg-indigo-100 text-indigo-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600",
    teal: "bg-teal-100 text-teal-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    cyan: "bg-cyan-100 text-cyan-600",
    lime: "bg-lime-100 text-lime-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };

  const advancedFeatures = [
    {
      title: "Intelligent Routing",
      description:
        "Smart routing to multiple payment gateways ensures maximum success rate",
    },
    {
      title: "Dynamic Pricing",
      description:
        "Flexible pricing rules based on payment method, amount, and customer segments",
    },
    {
      title: "Subscription Management",
      description:
        "Complete subscription billing with trials, proration, and dunning management",
    },
    {
      title: "Split Payments",
      description:
        "Automatically split payments between multiple vendors or accounts",
    },
    {
      title: "Webhooks",
      description:
        "Real-time webhooks for all events with automatic retry on failure",
    },
    {
      title: "Custom Reports",
      description:
        "Generate custom reports with filters, exports, and scheduled delivery",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Powerful Features
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Everything you need to accept payments, manage transactions, and
              grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 mb-6 rounded-xl transition-transform hover:scale-110 ${
                    colorClasses[feature.color]
                  }`}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Advanced Capabilities
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Enterprise-grade features for businesses that need more
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-lg"
              >
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-12 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Ready to Experience These Features?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
              Start accepting payments in minutes with our easy setup process.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link
                to="/docs"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default FeaturesPage;
