import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AboutUs from "../components/AboutUs";
import ScrollToTop from "../components/common/ScrollToTop";

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
      {/* ===== FOOTER ===== */}
      <Footer />
      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTop />{" "}
      <style>{`
                   @keyframes float {
                     0%, 100% {
                       transform: translateY(0px);
                     }
                     50% {
                       transform: translateY(-20px);
                     }
                   }
                   
                   @media (prefers-reduced-motion: no-preference) {
                     * {
                       scroll-behavior: smooth;
                     }
                   }
                 `}</style>
    </div>
  );
};

export default AboutUsPage;
