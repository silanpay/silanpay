import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      <section className="py-12 bg-white">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div
              className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-white rounded-full"
              style={{ backgroundColor: "#228DCE" }}
            >
              Legal Policy
            </div>
            <h1 className="mb-4 text-4xl font-bold" style={{ color: "#212439" }}>
              Refund & Cancellation Policy
            </h1>
            <p className="text-lg text-gray-600">
              Silan Software Private Limited
            </p>
          </div>

          {/* Introduction */}
          <div
            className="p-8 mb-8 border-2 shadow-lg rounded-2xl"
            style={{ borderColor: "#228DCE", backgroundColor: "#f8f9fa" }}
          >
            <p className="text-lg leading-relaxed text-gray-700">
              At <strong>Silan Software Private Limited</strong>, we strive to ensure
              smooth, secure, and transparent payment experiences for all our users,
              merchants, and partners. This Refund & Cancellation Policy outlines the
              terms under which refunds or cancellations may be processed for transactions
              facilitated through our payment systems or services.
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-8">
            {/* 1. General Policy */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  1
                </span>
                General Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All transactions processed through our digital payment solutions, including
                payment gateways, virtual accounts, UPI, and payout systems, are considered{" "}
                <strong>final and non-reversible</strong>, except in cases of verified
                technical errors or duplicate transactions.
              </p>
            </div>

            {/* 2. Eligibility for Refunds */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  2
                </span>
                Eligibility for Refunds
              </h2>
              <p className="mb-4 text-gray-700">
                Refunds may be considered under the following circumstances:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Duplicate Transaction:</strong> If a customer is charged twice
                    for the same transaction due to a system error.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Failed Transaction:</strong> If the amount is debited from the
                    customer's account but not credited to the intended recipient.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Cancelled Services:</strong> If services were not provided
                    after payment due to operational or technical issues.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-gray-700">
                In such cases, the refund will be processed only after verification and
                confirmation from the respective payment gateway, bank, or financial
                institution.
              </p>
            </div>

            {/* 3. Refund Process */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  3
                </span>
                Refund Process
              </h2>
              <ol className="space-y-3 ml-6 list-decimal">
                <li className="text-gray-700">
                  The customer must raise a refund request by contacting our support team at{" "}
                  <a
                    href="mailto:support@silansoftware.in"
                    className="font-semibold transition-colors hover:underline"
                    style={{ color: "#228DCE" }}
                  >
                    support@silansoftware.in
                  </a>{" "}
                  within <strong>7 working days</strong> of the transaction date.
                </li>
                <li className="text-gray-700">
                  Upon successful validation, the refund will be initiated within{" "}
                  <strong>5–10 business days</strong> through the original payment method.
                </li>
                <li className="text-gray-700">
                  The time taken for the amount to reflect in your account depends on your
                  bank or payment provider's policies.
                </li>
              </ol>
            </div>

            {/* 4. Non-Refundable Transactions */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  4
                </span>
                Non-Refundable Transactions
              </h2>
              <p className="mb-4 text-gray-700">
                Refunds will not be provided in the following cases:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    Transactions resulting from customer error, including incorrect UPI ID
                    or account details.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>Payments made for services already rendered or processed.</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    Unauthorized transactions caused by customer negligence (e.g., sharing
                    OTP, passwords, or account details).
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Cancellation Policy */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  5
                </span>
                Cancellation Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Once a transaction has been successfully initiated or processed, it{" "}
                <strong>cannot be cancelled</strong>. For subscription-based or recurring
                payment services, cancellations must be requested at least{" "}
                <strong>3 working days</strong> before the next billing cycle.
              </p>
            </div>

            {/* 6. Dispute Resolution */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  6
                </span>
                Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If there is a dispute regarding any transaction, you may contact our support
                team. We will review the issue in coordination with our banking and payment
                partners and aim to resolve it promptly.
              </p>
            </div>

            {/* 7. Contact Information */}
            <div
              className="p-8 border-2 shadow-lg rounded-2xl"
              style={{ borderColor: "#228DCE", backgroundColor: "#e8f4fb" }}
            >
              <h2
                className="mb-6 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  7
                </span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building2
                    className="flex-shrink-0 mt-1"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <div>
                    <p className="font-semibold" style={{ color: "#212439" }}>
                      Silan Software Private Limited
                    </p>
                    <p className="text-sm text-gray-600">
                      Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar, Odisha – 751013
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="flex-shrink-0" size={20} style={{ color: "#228DCE" }} />
                  <span className="text-gray-700">+91-89842 89279</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="flex-shrink-0" size={20} style={{ color: "#228DCE" }} />
                  <a
                    href="mailto:info@silanpay.com"
                    className="transition-colors hover:underline"
                    style={{ color: "#228DCE" }}
                  >
                    info@silanpay.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <a
                    href="https://www.silanpay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:underline"
                    style={{ color: "#228DCE" }}
                  >
                    www.silanpay.com
                  </a>
                </div>
              </div>
              <div className="pt-6 mt-6 space-y-2 border-t border-gray-300">
                <p className="text-sm text-gray-700">
                  <strong>CIN:</strong> U72900OR2020PTC033921
                </p>
                <p className="text-sm text-gray-700">
                  <strong>GST No:</strong> 21ABECS3045H1ZP
                </p>
              </div>
            </div>

            {/* 8. Legal Compliance */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  8
                </span>
                Legal Compliance
              </h2>
              <p className="text-gray-700 leading-relaxed">
                This policy is governed by and constructed in accordance with the laws of
                India, under the <strong>Companies Act, 2013</strong> and{" "}
                <strong>Information Technology Act, 2000</strong>. All disputes are subject
                to the jurisdiction of <strong>Bhubaneswar, Odisha</strong> courts only.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div
            className="p-6 mt-8 text-center border-2 rounded-2xl"
            style={{ borderColor: "#228DCE", backgroundColor: "#f8f9fa" }}
          >
            <p className="text-sm text-gray-600">
              For any questions or clarifications regarding this policy, please contact us
              at{" "}
              <a
                href="mailto:info@silanpay.com"
                className="font-semibold transition-colors hover:underline"
                style={{ color: "#228DCE" }}
              >
                info@silanpay.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer>
        {/* Dark Background Section */}
        <div style={{ backgroundColor: "#212439" }}>
          <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {/* Products */}
              <div>
                <h4
                  className="mb-4 text-lg font-bold"
                  style={{ color: "#228DCE" }}
                >
                  Products
                  <div
                    className="w-8 h-0.5 mt-1"
                    style={{ backgroundColor: "#228DCE" }}
                  ></div>
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      to="/upi-payments"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      UPI Payments
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      IMPS Transfer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      API Integration
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      Wallet
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4
                  className="mb-4 text-lg font-bold"
                  style={{ color: "#228DCE" }}
                >
                  Company
                  <div
                    className="w-8 h-0.5 mt-1"
                    style={{ backgroundColor: "#228DCE" }}
                  ></div>
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      to="/about-us"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact-us"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/refund-policy"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      Refund Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Developers */}
              <div>
                <h4
                  className="mb-4 text-lg font-bold"
                  style={{ color: "#228DCE" }}
                >
                  Developers
                  <div
                    className="w-8 h-0.5 mt-1"
                    style={{ backgroundColor: "#228DCE" }}
                  ></div>
                </h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li>
                    <Link
                      to="#"
                      className="transition-colors hover:text-[#228DCE]"
                    >
                      API Documentation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ===== CERTIFICATES & BADGES SECTION ===== */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 border-t border-blue-700 py-8">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Certifications & Recognitions
              </h3>
              <p className="text-sm text-gray-300">
                We are recognized by leading organizations in India
              </p>
            </div>

            {/* Certificates Grid */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {/* Startup Odisha */}
              <div className="flex items-center justify-center">
                <a
                  href="https://startupodisha.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src="/certificates/startupodisa.png"
                    alt="Startup Odisha"
                    className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </div>

              {/* Digital India */}
              <div className="flex items-center justify-center">
                <a
                  href="https://www.digitalindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src="/certificates/digitaindia.png"
                    alt="Digital India"
                    className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </div>

              {/* ISO Certificate */}
              <div className="flex items-center justify-center">
                <a
                  href="https://www.iso.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src="/certificates/isocertificate.png"
                    alt="ISO"
                    className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </div>

              {/* MSME Registration */}
              <div className="flex items-center justify-center">
                <a
                  href="https://www.msme.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <img
                    src="/certificates/msme.png"
                    alt="MSME Certified"
                    className="h-16 md:h-20 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company Info - Logo Right, Address Left - White Background Full Width */}
        <div
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white border-t"
          style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between md:flex-row">
              {/* Address on Left */}
              <div className="mb-4 text-sm text-center text-gray-700 md:text-left md:mb-0">
                <p>📍 Plot No-741, 2nd Floor, Jayadev Vihar, 751013</p>
                <p> Bhubaneswar, Odisha</p>
                <p>📞 Call: +91-89842 89279</p>
                <p>🏢 Silansoftware Private Limited</p>
              </div>

              {/* Logo on Right */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src="/silanpaylogo.png"
                    alt="SilanPay logo"
                    className="object-contain w-auto h-10 sm:h-12"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Full Width with Pay Color */}
        <div
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] text-sm text-center"
          style={{
            backgroundColor: "#228DCE",
            borderColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <p style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              &copy; 2025{" "}
              <Link
                to="/"
                className="text-white hover:underline transition-colors"
              >
                Silansoftware Private Limited
              </Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTop />

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

export default RefundPolicyPage;
