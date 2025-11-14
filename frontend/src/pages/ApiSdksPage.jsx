import React from "react";
import { Link } from "react-router-dom";
import {
  Code,
  CheckCircle,
  ArrowRight,
  Book,
  Terminal,
  Package,
  FileCode,
  Zap,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const ApiSdksPage = () => {
  const features = [
    {
      icon: Code,
      title: "RESTful APIs",
      description:
        "Simple, intuitive REST APIs with comprehensive documentation",
    },
    {
      icon: Package,
      title: "Multiple SDKs",
      description: "Native SDKs for Node.js, Python, PHP, Java, and more",
    },
    {
      icon: Book,
      title: "Complete Documentation",
      description: "Detailed guides, API references, and code examples",
    },
    {
      icon: Zap,
      title: "Quick Integration",
      description: "Get started in minutes with our easy-to-use libraries",
    },
  ];

  const sdks = [
    {
      name: "Node.js",
      icon: Terminal,
      description: "Official SDK for Node.js applications",
      installation: "npm install silanpay-node",
      color: "green",
    },
    {
      name: "Python",
      icon: FileCode,
      description: "Python SDK for Django, Flask, and more",
      installation: "pip install silanpay-python",
      color: "blue",
    },
    {
      name: "PHP",
      icon: Code,
      description: "PHP SDK for Laravel, WordPress, etc.",
      installation: "composer require silanpay/php-sdk",
      color: "purple",
    },
    {
      name: "Java",
      icon: Package,
      description: "Java SDK for Spring Boot and Android",
      installation: "implementation 'com.silanpay:sdk:1.0.0'",
      color: "orange",
    },
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/payments/create",
      description: "Create a new payment",
    },
    {
      method: "GET",
      endpoint: "/api/payments/:id",
      description: "Get payment details",
    },
    {
      method: "POST",
      endpoint: "/api/payouts/transfer",
      description: "Initiate a payout",
    },
    {
      method: "GET",
      endpoint: "/api/transactions",
      description: "List all transactions",
    },
    {
      method: "POST",
      endpoint: "/api/refunds/create",
      description: "Process a refund",
    },
    {
      method: "GET",
      endpoint: "/api/customers/:id",
      description: "Get customer details",
    },
  ];

  const benefits = [
    "99.99% API uptime guarantee",
    "Rate limiting & throttling support",
    "Automatic retry mechanism",
    "Webhook notifications",
    "Test & live API keys",
    "Postman collections included",
    "TypeScript support",
    "Comprehensive error handling",
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-purple-100 rounded-2xl">
              <Code className="w-10 h-10 text-purple-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              APIs & SDKs
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Powerful, developer-friendly APIs and SDKs to integrate payments
              seamlessly into your application. Build faster with our
              comprehensive tooling.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-purple-600 rounded-xl hover:bg-purple-700 hover:scale-105 hover:shadow-xl"
              >
                Get API Keys
              </Link>
              <Link
                to="/documentation"
                className="px-8 py-4 text-lg font-semibold text-purple-600 transition-all duration-300 border-2 border-purple-600 rounded-xl hover:bg-purple-50"
              >
                View Documentation
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
              Developer-First Approach
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Built by developers, for developers
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

      {/* SDKs Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Official SDKs
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Native libraries for your favorite programming languages
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sdks.map((sdk, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-white rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mb-4 bg-${sdk.color}-100 rounded-lg`}
                >
                  <sdk.icon className={`w-6 h-6 text-${sdk.color}-600`} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {sdk.name}
                </h3>
                <p className="mb-4 text-gray-600">{sdk.description}</p>
                <div className="p-3 font-mono text-sm bg-gray-900 rounded-lg text-gray-100">
                  {sdk.installation}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/documentation"
              className="inline-flex items-center px-6 py-3 font-semibold text-purple-600 transition-all border-2 border-purple-600 rounded-lg hover:bg-purple-50"
            >
              View All SDKs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* API Endpoints Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Popular API Endpoints
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Simple and intuitive REST API endpoints for all payment
                operations
              </p>
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="p-4 transition-all duration-300 bg-gray-50 rounded-lg hover:shadow-md"
                  >
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-lg ${
                          endpoint.method === "POST"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="ml-3 font-mono text-sm text-gray-900">
                        {endpoint.endpoint}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {endpoint.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Quick Start Example
              </h2>
              <div className="p-6 bg-gray-900 rounded-xl">
                <div className="mb-2 text-sm text-gray-400">
                  Node.js Example
                </div>
                <pre className="overflow-x-auto text-sm text-gray-100">
                  {`const SilanPay = require('silanpay-node');

const silanpay = new SilanPay({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET'
});

// Create a payment
const payment = await silanpay.payments.create({
  amount: 1000,
  currency: 'INR',
  customer: {
    email: 'customer@example.com',
    phone: '+919876543210'
  },
  redirect_url: 'https://yoursite.com/success'
});

console.log(payment.payment_url);`}
                </pre>
              </div>
              <div className="mt-6">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  What You Get
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Ready to Start Building?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-purple-100">
            Get your API keys and start integrating payments today
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

export default ApiSdksPage;
