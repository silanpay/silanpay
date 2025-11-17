import React from "react";
import { Link } from "react-router-dom";
import {
  Repeat,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  Shield,
  Zap,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const CollectionServicePage = () => {
  const features = [
    {
      icon: Repeat,
      title: "Automated Collections",
      description:
        "Automatically collect payments from customers with smart reminders and follow-ups",
    },
    {
      icon: Clock,
      title: "Scheduled Payments",
      description:
        "Set up recurring payment schedules for subscriptions and EMIs",
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description:
        "Bank-grade security with PCI DSS compliance for all transactions",
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description:
        "Real-time alerts for successful payments and failed attempts",
    },
  ];

  const benefits = [
    "Reduce payment collection time by 60%",
    "Automated reminder system",
    "Multiple payment method support",
    "Detailed collection analytics",
    "Custom branding on payment pages",
    "Bulk collection capabilities",
  ];

  const pricingTiers = [
    {
      name: "Basic",
      price: "₹1,499",
      period: "/month",
      features: [
        "Up to 500 collections/month",
        "Email & SMS reminders",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Professional",
      price: "₹3,999",
      period: "/month",
      popular: true,
      features: [
        "Up to 5,000 collections/month",
        "Advanced reminders",
        "Detailed analytics",
        "Priority support",
        "Custom branding",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited collections",
        "White-label solution",
        "Dedicated manager",
        "24/7 support",
        "API access",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-blue-100 rounded-2xl">
              <Repeat className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Collection Service
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Automate your payment collections with intelligent reminders,
              scheduled payments, and seamless tracking. Reduce late payments
              and improve cash flow.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-xl hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact-us"
                className="px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 border-2 border-blue-600 rounded-xl hover:bg-blue-50"
              >
                Schedule Demo
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
              Powerful Features
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need to streamline payment collections
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-blue-600" />
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
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Why Choose Our Collection Service?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Improve your cash flow and reduce manual effort with our
                automated collection system.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-8 bg-white shadow-2xl rounded-2xl">
                <div className="mb-6 text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    60% Faster
                  </h3>
                  <p className="text-gray-600">
                    Average collection time reduced
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Simple Pricing
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative p-8 transition-all duration-300 transform bg-white border-2 rounded-2xl hover:shadow-xl hover:-translate-y-2 ${
                  tier.popular
                    ? "border-blue-600 shadow-lg scale-105"
                    : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </div>
                )}
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-600">{tier.period}</span>
                  )}
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block w-full py-3 text-center font-semibold rounded-lg transition-all ${
                    tier.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Automate Your Collections?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
            Join thousands of businesses using our collection service to improve
            cash flow
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default CollectionServicePage;
