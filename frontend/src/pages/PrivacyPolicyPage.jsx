import React from "react";
import Header from "../components/layout/Header";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      <section className="py-12 bg-white">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Page Title */}
          <h1 className="mb-6 text-4xl font-bold text-gray-900">
            Privacy Policy
          </h1>

          <p className="mb-8 text-gray-600">Last updated: October 2025</p>

          <div className="p-8 space-y-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
            <p className="text-gray-700">
              We value your privacy. This policy explains what data we collect,
              how we use it, and your rights.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
              1. Information We Collect
            </h2>
            <p className="text-gray-700">
              We collect account details, contact information, and usage data
              necessary to provide our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
              2. How We Use Information
            </h2>
            <p className="text-gray-700">
              We use data to deliver and improve services, provide support,
              ensure security, and comply with laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">
              3. Data Sharing
            </h2>
            <p className="text-gray-700">
              We do not sell personal data. Limited sharing occurs with trusted
              processors under strict data protection agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">4. Your Rights</h2>
            <p className="text-gray-700">
              You may access, correct, or delete your data, subject to legal
              requirements and verification.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900">5. Contact</h2>
            <p className="text-gray-700">
              For privacy inquiries, contact{" "}
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

export default PrivacyPolicyPage;
