import React from "react";
import { Link } from "react-router-dom";
import {
  Send,
  CheckCircle,
  ArrowRight,
  Users,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const PayoutsPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Payouts",
      description:
        "Transfer funds to bank accounts, UPI, and wallets instantly 24x7",
    },
    {
      icon: Users,
      title: "Bulk Payouts",
      description:
        "Send money to multiple recipients simultaneously with CSV upload",
    },
    {
      icon: Shield,
      title: "Secure Transfers",
      description:
        "Bank-grade encryption and fraud detection for all transactions",
    },
    {
      icon: Globe,
      title: "Multiple Modes",
      description: "Support for IMPS, NEFT, RTGS, UPI, and wallet transfers",
    },
  ];

  const useCases = [
    {
      title: "Vendor Payments",
      description: "Pay your vendors and suppliers instantly",
      icon: Users,
    },
    {
      title: "Salary Disbursement",
      description: "Automate employee salary payments",
      icon: Send,
    },
    {
      title: "Refunds",
      description: "Process customer refunds quickly",
      icon: ArrowRight,
    },
    {
      title: "Commission Payouts",
      description: "Pay affiliates and partners automatically",
      icon: CheckCircle,
    },
  ];

  const benefits = [
    "Process unlimited payouts 24/7",
    "Real-time status tracking",
    "Auto-retry on failures",
    "Detailed transaction reports",
    "API integration available",
    "Multi-level approval workflow",
    "Compliance & reconciliation",
    "Dedicated account manager",
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-green-100 rounded-2xl">
              <Send className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Instant Payouts
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Send money to anyone, anywhere, anytime. Fast, secure, and
              reliable payout solution for businesses of all sizes.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-green-600 rounded-xl hover:bg-green-700 hover:scale-105 hover:shadow-xl"
              >
                Start Free Trial
              </Link>
              <Link
                to="/contact-us"
                className="px-8 py-4 text-lg font-semibold text-green-600 transition-all duration-300 border-2 border-green-600 rounded-xl hover:bg-green-50"
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
              Everything you need for seamless payout management
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-green-600" />
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
              Perfect For Every Use Case
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              From vendor payments to salary disbursements
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 text-center transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                  <useCase.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Why Choose Our Payout Solution?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Fast, secure, and reliable payout processing with advanced
                features
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md p-8 bg-gradient-to-br from-green-50 to-white shadow-2xl rounded-2xl">
                <h3 className="mb-6 text-2xl font-bold text-center text-gray-900">
                  Payout Statistics
                </h3>
                <div className="space-y-6">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <div className="text-3xl font-bold text-green-600">
                      ₹100Cr+
                    </div>
                    <div className="text-sm text-gray-600">Monthly Payouts</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow">
                    <div className="text-3xl font-bold text-blue-600">50K+</div>
                    <div className="text-sm text-gray-600">
                      Daily Transactions
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow">
                    <div className="text-3xl font-bold text-purple-600">
                      99.9%
                    </div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Start Sending Payouts Today
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-green-100">
            Join thousands of businesses using our payout solution
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-green-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default PayoutsPage;
