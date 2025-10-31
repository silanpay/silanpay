import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "../components/layout/Header";
import AboutUs from "../components/AboutUs";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
            <span className="w-2 h-2 mr-2 bg-blue-600 rounded-full"></span>
            About Us
          </div>
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            Get to Know{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
              Our Story
            </span>
          </h1>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
            We're a team of passionate professionals dedicated to delivering
            exceptional results and creating meaningful experiences for our
            clients.
          </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                icon: "📄",
                number: "100+",
                label: "Payment Modes",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: "😊",
                number: "500+",
                label: "Happy Customers",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: "✅",
                number: "100%",
                label: "Safe And Secure",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: "🔄",
                number: "98%",
                label: "Transaction Success Rates",
                color: "bg-blue-100 text-blue-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-8 text-center transition-shadow duration-300 border border-gray-100 bg-gray-50 rounded-xl hover:shadow-lg"
              >
                <div
                  className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="mb-2 text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Component */}
      <AboutUs />

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">
              #SimplifyPayments
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-white">
            Elevate Your Business with SilanPay
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-blue-100">
            Join 10,000+ businesses that trust SilanPay for lightning-fast,
            secure payment processing with QR code integration.
          </p>

          <div className="flex flex-col items-center justify-center mb-8 space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            {["Fast Integration", "99.9% Uptime", "24/7 Support"].map(
              (feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-white"
                >
                  <CheckCircle size={20} />
                  <span>{feature}</span>
                </div>
              )
            )}
          </div>

          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg bg-slate-800 hover:bg-slate-900"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Products */}
            <div>
              <h4 className="mb-4 text-lg font-bold text-blue-600">
                Products
                <div className="w-8 h-0.5 bg-blue-600 mt-1"></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="/upi-payments"
                    className="transition-colors hover:text-blue-600"
                  >
                    UPI Payments
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors hover:text-blue-600"
                  >
                    IMPS Transfer
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors hover:text-blue-600"
                  >
                    API Integration
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="transition-colors hover:text-blue-600"
                  >
                    Wallet
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-4 text-lg font-bold text-blue-600">
                Company
                <div className="w-8 h-0.5 bg-blue-600 mt-1"></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="/about-us"
                    className="transition-colors hover:text-blue-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="transition-colors hover:text-blue-600"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="transition-colors hover:text-blue-600"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="transition-colors hover:text-blue-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund-policy"
                    className="transition-colors hover:text-blue-600"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Developers */}
            <div>
              <h4 className="mb-4 text-lg font-bold text-blue-600">
                Developers
                <div className="w-8 h-0.5 bg-blue-600 mt-1"></div>
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <Link
                    to="#"
                    className="transition-colors hover:text-blue-600"
                  >
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Info */}
          <div className="pt-8 mt-12 border-t border-gray-200">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="flex items-center mb-4 space-x-3 md:mb-0">
                <span className="text-2xl font-bold">
                  <span className="text-slate-800">Silan</span>
                  <span className="text-blue-600">Pay</span>
                </span>
              </div>
              <div className="text-sm text-center text-gray-600 md:text-right">
                <p>📍 Plot No-741, 2nd Floor, Jayadev Vihar, 751013</p>
                <p>📍 Bhubaneswar, Odisha</p>
                <p>📞 Call +91-89842 89279</p>
                <p>🏢 Silansoftware Private Limited</p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gray-200">
            <p>
              &copy; 2025 Silansoftware Private Limited. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
