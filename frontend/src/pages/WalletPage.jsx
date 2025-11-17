import React from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Send,
  QrCode,
  Gift,
  TrendingUp,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const WalletPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Transfers",
      description:
        "Send and receive money instantly to any bank account or UPI ID",
    },
    {
      icon: QrCode,
      title: "QR Code Payments",
      description: "Scan and pay at any merchant or generate your own QR code",
    },
    {
      icon: Gift,
      title: "Cashback & Rewards",
      description:
        "Earn cashback on every transaction and unlock exclusive rewards",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Multi-layer security with 2FA and encrypted transactions",
    },
  ];

  const useCases = [
    {
      icon: Send,
      title: "Person-to-Person Transfers",
      description:
        "Send money to friends and family instantly without any charges",
    },
    {
      icon: QrCode,
      title: "Merchant Payments",
      description:
        "Pay at stores, restaurants, and online merchants seamlessly",
    },
    {
      icon: TrendingUp,
      title: "Bill Payments",
      description:
        "Pay utility bills, recharges, and subscriptions from your wallet",
    },
    {
      icon: Gift,
      title: "Shopping & E-commerce",
      description: "One-click checkout on all your favorite shopping platforms",
    },
  ];

  const benefits = [
    "Zero transaction fees on P2P transfers",
    "Instant bank settlements",
    "Multi-currency support",
    "Split bills with friends",
    "Transaction history & analytics",
    "Set spending limits",
    "Auto top-up from bank account",
    "Scheduled payments",
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-orange-100 rounded-2xl">
              <Wallet className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Digital Wallet
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Your complete payment solution in one place. Store money, send
              instantly, pay anywhere, and earn cashback on every transaction.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-orange-600 rounded-xl hover:bg-orange-700 hover:scale-105 hover:shadow-xl"
              >
                Create Wallet
              </Link>
              <Link
                to="/contact-us"
                className="px-8 py-4 text-lg font-semibold text-orange-600 transition-all duration-300 border-2 border-orange-600 rounded-xl hover:bg-orange-50"
              >
                Learn More
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
              Wallet Features
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Everything you need for seamless digital payments
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-orange-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-orange-600" />
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
              How You Can Use It
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Multiple ways to pay and get paid
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="p-6 text-center transition-all duration-300 transform bg-white rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-orange-100 rounded-full">
                  <useCase.icon className="w-8 h-8 text-orange-600" />
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Why Choose Our Wallet?
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Experience the most feature-rich digital wallet in India
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="p-8 mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-2xl">
                  <div className="flex items-center justify-between mb-4 text-white">
                    <span className="text-sm font-medium">SILAN WALLET</span>
                    <Wallet className="w-8 h-8" />
                  </div>
                  <div className="mt-8">
                    <div className="mb-2 text-sm text-orange-100">
                      Available Balance
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ₹ 25,430.00
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      <div className="text-xs text-orange-100">Cashback</div>
                      <div className="text-lg font-bold text-white">₹ 847</div>
                    </div>
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      <div className="text-xs text-orange-100">Rewards</div>
                      <div className="text-lg font-bold text-white">
                        2,340 pts
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">
                      150+
                    </div>
                    <div className="text-xs text-gray-600">Transactions</div>
                  </div>
                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">
                      ₹50K+
                    </div>
                    <div className="text-xs text-gray-600">Saved</div>
                  </div>
                  <div className="p-4 text-center bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">4.9★</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Start Your Digital Wallet Journey
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-orange-100">
            Join millions of users who trust our wallet for their daily
            transactions
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-orange-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Create Free Wallet
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default WalletPage;
