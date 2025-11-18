import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Book,
  Code,
  Zap,
  Shield,
  Globe,
  Terminal,
  FileText,
  ChevronRight,
  Search,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const DocumentationPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const quickStartGuides = [
    {
      title: "Getting Started",
      description: "Set up your SilanPay account and make your first API call",
      icon: Zap,
      link: "#getting-started",
      time: "5 min",
    },
    {
      title: "Authentication",
      description: "Learn how to authenticate your API requests securely",
      icon: Shield,
      link: "#authentication",
      time: "10 min",
    },
    {
      title: "Integration Guide",
      description: "Step-by-step guide to integrate SilanPay into your application",
      icon: Code,
      link: "#integration",
      time: "15 min",
    },
    {
      title: "Testing & Sandbox",
      description: "Test your integration in our sandbox environment",
      icon: Terminal,
      link: "#testing",
      time: "8 min",
    },
  ];

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/payments/create",
      description: "Create a new payment transaction",
      category: "Payments",
    },
    {
      method: "GET",
      endpoint: "/api/v1/payments/{id}",
      description: "Retrieve payment details by ID",
      category: "Payments",
    },
    {
      method: "POST",
      endpoint: "/api/v1/payouts/initiate",
      description: "Initiate a payout to beneficiary",
      category: "Payouts",
    },
    {
      method: "GET",
      endpoint: "/api/v1/transactions",
      description: "List all transactions with filters",
      category: "Transactions",
    },
    {
      method: "POST",
      endpoint: "/api/v1/webhooks/register",
      description: "Register a webhook endpoint",
      category: "Webhooks",
    },
  ];

  const sdkExamples = [
    {
      language: "JavaScript",
      code: `const silanpay = require('silanpay-node');

const client = new silanpay.Client({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  environment: 'sandbox'
});

// Create a payment
const payment = await client.payments.create({
  amount: 10000,
  currency: 'INR',
  customer: {
    email: 'customer@example.com',
    phone: '+919876543210'
  },
  method: 'UPI'
});

console.log(payment);`,
      id: "js-example",
    },
    {
      language: "Python",
      code: `import silanpay

# Initialize client
client = silanpay.Client(
    api_key='your_api_key',
    api_secret='your_api_secret',
    environment='sandbox'
)

# Create a payment
payment = client.payments.create(
    amount=10000,
    currency='INR',
    customer={
        'email': 'customer@example.com',
        'phone': '+919876543210'
    },
    method='UPI'
)

print(payment)`,
      id: "python-example",
    },
    {
      language: "PHP",
      code: `<?php
require 'vendor/autoload.php';

use SilanPay\\Client;

// Initialize client
$client = new Client([
    'api_key' => 'your_api_key',
    'api_secret' => 'your_api_secret',
    'environment' => 'sandbox'
]);

// Create a payment
$payment = $client->payments->create([
    'amount' => 10000,
    'currency' => 'INR',
    'customer' => [
        'email' => 'customer@example.com',
        'phone' => '+919876543210'
    ],
    'method' => 'UPI'
]);

print_r($payment);`,
      id: "php-example",
    },
  ];

  const resources = [
    {
      title: "API Reference",
      description: "Complete API documentation with all endpoints and parameters",
      icon: Book,
      link: "/docs/api-reference",
    },
    {
      title: "SDKs & Libraries",
      description: "Official SDKs for Node.js, Python, PHP, Ruby, and more",
      icon: Code,
      link: "/docs/sdks",
    },
    {
      title: "Webhooks",
      description: "Real-time notifications for payment events",
      icon: Zap,
      link: "/docs/webhooks",
    },
    {
      title: "Security Best Practices",
      description: "Keep your integration secure and PCI compliant",
      icon: Shield,
      link: "/docs/security",
    },
    {
      title: "Postman Collection",
      description: "Import our collection to test APIs quickly",
      icon: Globe,
      link: "/docs/postman",
    },
    {
      title: "Code Examples",
      description: "Real-world implementation examples and use cases",
      icon: FileText,
      link: "/docs/examples",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
     <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#228DCE] to-[#1a6fa8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold">Developer Documentation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to integrate SilanPay's payment solutions into your application
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guides */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Start Guides</h2>
          <p className="text-xl text-gray-600">Get up and running in minutes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStartGuides.map((guide, index) => {
            const IconComponent = guide.icon;
            return (
              <a
                key={index}
                href={guide.link}
                className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#228DCE] hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-[#228DCE]/10 to-[#1a6fa8]/10 rounded-xl group-hover:scale-110 transition-transform">
                    <IconComponent className="text-[#228DCE]" size={24} />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {guide.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#228DCE]">
                  {guide.title}
                </h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
                <div className="mt-4 flex items-center text-[#228DCE] font-semibold">
                  <span className="text-sm">Read more</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular API Endpoints</h2>
            <p className="text-xl text-gray-600">Explore our most used APIs</p>
          </div>

          <div className="space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-[#228DCE] hover:bg-blue-50/50 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        endpoint.method === "POST"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-sm font-mono text-gray-800 group-hover:text-[#228DCE]">
                      {endpoint.endpoint}
                    </code>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                      {endpoint.category}
                    </span>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-[#228DCE]" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 ml-16">{endpoint.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/docs/api-reference"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#228DCE] text-white font-semibold rounded-lg hover:bg-[#1a7ab8] transition-all shadow-lg hover:shadow-xl"
            >
              View Full API Reference
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* SDK Examples */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Code Examples</h2>
          <p className="text-xl text-gray-600">Implementation examples in your favorite language</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {sdkExamples.map((example, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-800">
                <span className="text-white font-semibold">{example.language}</span>
                <button
                  onClick={() => copyToClipboard(example.code, example.id)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === example.id ? (
                    <>
                      <Check size={16} />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <p className="text-xl text-gray-600">Tools and guides to help you succeed</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Link
                  key={index}
                  to={resource.link}
                  className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#228DCE]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-br from-[#228DCE]/10 to-[#1a6fa8]/10 rounded-xl group-hover:scale-110 transition-transform">
                      <IconComponent className="text-[#228DCE]" size={24} />
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-[#228DCE] ml-auto" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#228DCE]">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#228DCE] to-[#1a6fa8] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign up for a free account and start accepting payments in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-[#228DCE] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;