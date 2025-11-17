import React from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      {/* Main Footer Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center mb-4 space-x-2 sm:mb-6">
              <span className="text-4xl font-bold text-white">SilanPay</span>
            </Link>
            <p className="max-w-md mb-4 text-sm text-gray-300 sm:mb-6 sm:text-base">
              Empowering businesses with secure, fast, and reliable payment
              solutions. Join thousands of merchants who trust SilanPay for
              their payment needs.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://wa.me/918984289279"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-colors bg-green-600 rounded-full hover:bg-green-700 w-9 h-9 sm:w-10 sm:h-10"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.facebook.com/SilanSoftware"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-colors bg-blue-600 rounded-full hover:bg-blue-700 w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://x.com/SilanSoftware/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-colors rounded-full bg-sky-500 hover:bg-sky-600 w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/silanpay/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-colors bg-blue-700 rounded-full hover:bg-blue-800 w-9 h-9 sm:w-10 sm:h-10"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/silan_software_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-colors bg-pink-600 rounded-full hover:bg-pink-700 w-9 h-9 sm:w-10 sm:h-10"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">
              Products
            </h4>
            <ul className="space-y-2 text-sm sm:space-y-3 sm:text-base">
              {[
                "UPI Payments",
                "QR Code Payments",
                "Payment Gateway",
                "API Integration",
                "Instant Payouts",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to="#"
                    className="text-gray-300 transition-colors hover:text-primary-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-base font-semibold text-white sm:mb-6 sm:text-lg">
              Company
            </h4>
            <ul className="space-y-2 text-sm sm:space-y-3 sm:text-base">
              {[
                { name: "About Us", to: "/about-us" },
                { name: "Contact Us", to: "/contact-us" },
                { name: "Privacy Policy", to: "/privacy-policy" },
                { name: "Terms & Conditions", to: "/terms" },
                { name: "Refund Policy", to: "/refund-policy" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="text-gray-300 transition-colors hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-6 border-t border-gray-800 sm:py-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center">
            <div className="text-xs text-center text-gray-400 sm:text-sm">
              © 2025 Silansoftware Private Limited. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
