import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const PricingPage = () => {
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
        "Single merchant account",
        "Basic API access",
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
        "Multiple merchant accounts",
        "Webhook integration",
        "Dedicated account manager",
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
        "24/7 dedicated support",
        "Advanced security features",
        "SLA guarantee (99.9%)",
        "Custom reporting",
        "White-label solution",
        "Multi-currency support",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Choose the plan that fits your business needs. No hidden fees,
              cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 bg-white border-2 rounded-2xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 ${
                  plan.popular
                    ? "border-blue-600 shadow-xl scale-105"
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 flex items-center px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-bl-xl rounded-tr-xl">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-xl text-gray-600">{plan.period}</span>
                  )}
                </div>

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mt-0.5 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`block w-full py-3 text-center font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg transform hover:scale-105"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  q: "Can I change plans later?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, UPI, net banking, and wallets.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No, there are no setup fees. You only pay the monthly subscription.",
                },
                {
                  q: "What if I exceed my transaction limit?",
                  a: "You'll be notified and can upgrade your plan or pay a small overage fee.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-gray-200 rounded-xl"
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default PricingPage;
