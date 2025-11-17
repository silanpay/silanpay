import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const BRAND_BLUE = "#228DCE";
const BRAND_BLUE_HOVER = "#1a6fa8";
const BRAND_LIGHT_BG = "#e8f4fb";

const UPIPaymentPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold" style={{ color: BRAND_BLUE }}>
            UPI Payment Solutions
          </h1>
          <p className="max-w-4xl mx-auto text-xl leading-relaxed text-gray-600">
            Experience seamless UPI pay-in and pay-out services designed for
            businesses and consumers. Our platform ensures real-time
            transactions with enhanced security, making digital payments faster,
            more reliable, and user-friendly.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2">
          {/* UPI Pay-in */}
          <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              1. UPI Pay-in
            </h2>
            <div className="space-y-4">
              {[
                "Businesses can integrate UPI to accept payments instantly.",
                "Customers can pay directly from bank accounts using a UPI ID.",
                "Supports multiple payment methods (UPI apps, mobile wallets, QR codes).",
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle
                    className="flex-shrink-0 mt-1"
                    size={20}
                    style={{ color: BRAND_BLUE }}
                  />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* UPI Pay-out */}
          <div className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              2. UPI Pay-out
            </h2>
            <div className="space-y-4">
              {[
                "Enables businesses to make instant payouts to customers, vendors, or suppliers.",
                "Supports simultaneous disbursements to multiple UPI accounts for bulk payments.",
                "Allows tracking transaction statuses for smooth fund transfers.",
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle
                    className="flex-shrink-0 mt-1"
                    size={20}
                    style={{ color: BRAND_BLUE }}
                  />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="mb-16">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-900">
            How UPI Services Work
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "1. Integration",
                description:
                  "Assistance with seamless integration via APIs and SDKs.",
              },
              {
                step: "2. Transaction Initiation",
                description:
                  "Customers initiate pay-ins via UPI apps; businesses initiate pay-outs via the platform.",
              },
              {
                step: "3. Authentication",
                description:
                  "Both pay-ins and pay-outs are secured with two-factor authentication, including UPI PIN.",
              },
              {
                step: "4. Processing",
                description:
                  "Real-time transaction processing facilitated by the UPI network.",
              },
              {
                step: "5. Confirmation",
                description:
                  "A confirmation message is sent to both payer and payee upon successful completion.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start p-6 space-x-4 bg-gray-50 rounded-xl"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white rounded-full"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {item.step}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="p-12 text-center text-white rounded-2xl"
          style={{ backgroundColor: BRAND_BLUE }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">#SimplifyPayments</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold">
              Elevate Your Business with SilanPay
            </h2>
            <p className="mb-8 text-xl" style={{ color: BRAND_LIGHT_BG }}>
              Join 10,000+ businesses that trust SilanPay for lightning-fast,
              secure payment processing.
            </p>

            <div className="flex flex-col items-center justify-center mb-8 space-y-4 md:flex-row md:space-y-0 md:space-x-8">
              {["Fast Integration", "99.9% Uptime", "24/7 Support"].map(
                (feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle size={20} />
                    <span>{feature}</span>
                  </div>
                )
              )}
            </div>

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white transition-colors duration-200 rounded-lg shadow-lg"
              style={{ backgroundColor: "#1a1a1a" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2d2d2d")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UPIPaymentPage;
