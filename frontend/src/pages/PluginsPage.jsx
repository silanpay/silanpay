import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  CheckCircle,
  ArrowRight,
  ShoppingCart,
  Code,
  Zap,
  Download,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const PluginsPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Quick Installation",
      description: "Install and configure in minutes without any coding",
    },
    {
      icon: Code,
      title: "Customizable",
      description: "Fully customizable to match your brand and requirements",
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Ready",
      description: "Built specifically for online stores and marketplaces",
    },
    {
      icon: Package,
      title: "Regular Updates",
      description:
        "Continuously updated with new features and security patches",
    },
  ];

  const plugins = [
    {
      name: "WooCommerce",
      icon: ShoppingCart,
      description: "Complete payment solution for WooCommerce stores",
      downloads: "50K+",
      rating: "4.8",
      color: "purple",
      platforms: ["WordPress"],
    },
    {
      name: "Shopify",
      icon: Package,
      description: "Native Shopify app for seamless checkout",
      downloads: "30K+",
      rating: "4.9",
      color: "green",
      platforms: ["Shopify"],
    },
    {
      name: "Magento",
      icon: Code,
      description: "Enterprise-grade plugin for Magento stores",
      downloads: "15K+",
      rating: "4.7",
      color: "orange",
      platforms: ["Magento 2"],
    },
    {
      name: "WordPress",
      icon: Package,
      description: "Universal WordPress payment plugin",
      downloads: "80K+",
      rating: "4.8",
      color: "blue",
      platforms: ["WordPress"],
    },
    {
      name: "PrestaShop",
      icon: ShoppingCart,
      description: "PrestaShop payment module",
      downloads: "10K+",
      rating: "4.6",
      color: "pink",
      platforms: ["PrestaShop"],
    },
    {
      name: "OpenCart",
      icon: Code,
      description: "OpenCart payment extension",
      downloads: "8K+",
      rating: "4.5",
      color: "cyan",
      platforms: ["OpenCart"],
    },
  ];

  const benefits = [
    "No coding required",
    "One-click installation",
    "Auto-updates included",
    "Mobile responsive design",
    "Multiple payment methods",
    "Refund management",
    "Order status sync",
    "Detailed analytics",
    "Test mode available",
    "Multi-currency support",
    "Webhook notifications",
    "24/7 technical support",
  ];

  const integrationSteps = [
    {
      step: "1",
      title: "Download Plugin",
      description: "Download the plugin for your platform",
    },
    {
      step: "2",
      title: "Install & Activate",
      description: "Upload and activate in your admin panel",
    },
    {
      step: "3",
      title: "Configure Settings",
      description: "Add your API keys and configure options",
    },
    {
      step: "4",
      title: "Start Accepting",
      description: "Start accepting payments immediately",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-teal-100 rounded-2xl">
              <Package className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              Payment Plugins
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Ready-to-use payment plugins for popular e-commerce platforms. No
              coding required - just install, configure, and start accepting
              payments.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-teal-600 rounded-xl hover:bg-teal-700 hover:scale-105 hover:shadow-xl"
              >
                Download Plugins
              </Link>
              <Link
                to="/documentation"
                className="px-8 py-4 text-lg font-semibold text-teal-600 transition-all duration-300 border-2 border-teal-600 rounded-xl hover:bg-teal-50"
              >
                Installation Guides
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
              Why Our Plugins?
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Built for e-commerce, designed for simplicity
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-teal-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-teal-600" />
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

      {/* Plugins Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Available Plugins
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Plugins for all major e-commerce platforms
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plugins.map((plugin, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-white rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`flex items-center justify-center w-12 h-12 bg-${plugin.color}-100 rounded-lg`}
                  >
                    <plugin.icon
                      className={`w-6 h-6 text-${plugin.color}-600`}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-bold text-gray-900">
                      {plugin.rating}
                    </span>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {plugin.name}
                </h3>
                <p className="mb-4 text-gray-600">{plugin.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <Download className="w-4 h-4 mr-1" />
                    {plugin.downloads} downloads
                  </div>
                  <Link
                    to="/register"
                    className="font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Download →
                  </Link>
                </div>
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
                Everything You Need
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Feature-rich plugins with everything needed for online payments
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-teal-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Quick Integration
              </h2>
              <div className="space-y-4">
                {integrationSteps.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 transition-all bg-gray-50 rounded-xl hover:shadow-md"
                  >
                    <div className="flex items-center justify-center w-10 h-10 mr-4 text-lg font-bold text-white bg-teal-600 rounded-full flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl border-2 border-teal-200">
                <h3 className="mb-3 text-lg font-bold text-gray-900">
                  Need Custom Integration?
                </h3>
                <p className="mb-4 text-gray-700">
                  Our team can build custom plugins for your specific platform
                  or requirements.
                </p>
                <Link
                  to="/contact-us"
                  className="inline-flex items-center font-semibold text-teal-600 hover:text-teal-700"
                >
                  Contact Sales
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
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
              <div className="text-4xl font-bold text-teal-600">200K+</div>
              <div className="mt-2 text-gray-600">Total Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">4.8★</div>
              <div className="mt-2 text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">6+</div>
              <div className="mt-2 text-gray-600">Platforms Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600">24/7</div>
              <div className="mt-2 text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Start Accepting Payments in Minutes
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-teal-100">
            Download our plugin for your platform and go live today
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-teal-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
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

export default PluginsPage;
