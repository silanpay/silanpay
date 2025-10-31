import React from "react";
import Header from "../components/layout/Header";

const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      <section className="py-12 bg-white">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Page Title */}
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            Refund Policy
          </h1>

          <p className="mb-8 text-gray-600">Last updated: October 2025</p>

          <div className="p-8 space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <p className="text-gray-700">
              This policy outlines the eligibility and procedures for refunds
              relating to our products and services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">1. Eligibility</h2>
            <p className="text-gray-700">
              Refunds are considered for duplicate payments or proven service
              issues.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">2. Request Process</h2>
            <p className="text-gray-700">
              Submit a request to{" "}
              <a
                href="mailto:support@silansoftware.com"
                className="text-blue-600 hover:underline"
              >
                support@silansoftware.com
              </a>{" "}
              with transaction details within 7 days.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">3. Processing Time</h2>
            <p className="text-gray-700">
              Approved refunds are processed within 5–7 business days to the
              original payment method.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">4. Contact</h2>
            <p className="text-gray-700">
              For refund-related queries, contact{" "}
              <a
                href="mailto:support@silansoftware.com"
                className="text-blue-600 hover:underline"
              >
                support@silansoftware.com
              </a>{" "}
              or call <span className="font-medium">+91-8984289279</span>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
