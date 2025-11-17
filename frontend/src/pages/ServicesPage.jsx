import React from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  Smartphone,
  CreditCard,
  Building2,
  ArrowRight,
  Repeat,
  Wallet,
  Globe,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const ServicesPage = () => {
  const services = [
    {
      icon: QrCode,
      title: "QR Code Payments",
      description:
        "Dynamic and static QR codes for instant payment collection. Generate unlimited QR codes for your business.",
      price: "Starting at ₹999/month",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Unlimited QR code generation",
        "Real-time payment notifications",
        "Detailed transaction analytics",
        "Custom branding on QR codes",
        "Print-ready QR formats",
        "Bulk QR generation",
      ],
    },
    {
      icon: Smartphone,
      title: "UPI Integration",
      description:
        "Complete UPI payment gateway integration supporting all major UPI apps including Google Pay, PhonePe, Paytm.",
      price: "Starting at ₹1,499/month",
      gradient: "from-green-500 to-green-600",
      features: [
        "All UPI apps supported",
        "Instant settlements (T+1)",
        "99.9% success rate",
        "24/7 transaction monitoring",
        "Auto reconciliation",
        "UPI AutoPay for subscriptions",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Gateway",
      description:
        "Full-featured payment gateway supporting credit cards, debit cards, net banking, and international payments.",
      price: "Starting at ₹2,999/month",
      gradient: "from-purple-500 to-purple-600",
      features: [
        "Multiple payment methods",
        "PCI DSS compliant security",
        "Easy API integration",
        "Recurring payment support",
        "International payments",
        "EMI options available",
      ],
    },
    {
      icon: Wallet,
      title: "Digital Wallets",
      description:
        "Accept payments from all popular digital wallets including Paytm, PhonePe, Amazon Pay, and more.",
      price: "Starting at ₹1,999/month",
      gradient: "from-orange-500 to-orange-600",
      features: [
        "All major wallets supported",
        "One-click payments",
        "Instant refunds",
        "Wallet balance check",
        "Cashback integration",
        "Loyalty programs",
      ],
    },
    {
      icon: Repeat,
      title: "Subscription Billing",
      description:
        "Automated recurring billing for subscription-based businesses with flexible billing cycles.",
      price: "Starting at ₹1,499/month",
      gradient: "from-indigo-500 to-indigo-600",
      features: [
        "Flexible billing cycles",
        "Auto-retry on failure",
        "Dunning management",
        "Proration support",
        "Trial period management",
        "Invoice generation",
      ],
    },
    {
      icon: Globe,
      title: "International Payments",
      description:
        "Accept payments from customers worldwide with multi-currency support and global payment methods.",
      price: "Starting at ₹3,999/month",
      gradient: "from-pink-500 to-pink-600",
      features: [
        "100+ currencies supported",
        "Global payment methods",
        "FX rate management",
        "Multi-language checkout",
        "Local payment options",
        "Cross-border compliance",
      ],
    },
    {
      icon: Building2,
      title: "Enterprise Solutions",
      description:
        "Custom payment solutions tailored for large enterprises with dedicated support and advanced features.",
      price: "Custom pricing",
      gradient: "from-red-500 to-red-600",
      features: [
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee (99.99%)",
        "Advanced fraud detection",
        "White-label solution",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Our Services
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Complete payment solutions for businesses of all sizes. From
              startups to enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 mb-6 transition-all duration-300 bg-gradient-to-br ${service.gradient} rounded-xl group-hover:scale-110 group-hover:rotate-3`}
                >
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 mr-2 bg-blue-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-700"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="p-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl">
              <h2 className="mb-4 text-4xl font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
                Join thousands of businesses already using SilanPay for their
                payment needs.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-xl"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/contact-us"
                  className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-600"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default ServicesPage;
