import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Lock,
  Globe,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const PrivacyPolicyPage = () => {
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
              Legal & Privacy
            </div>
            <h1
              className="mb-4 text-4xl font-bold"
              style={{ color: "#212439" }}
            >
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              Silan Software Private Limited
            </p>
          </div>

          {/* Introduction Section */}
          <div
            className="p-8 mb-8 border-2 shadow-lg rounded-2xl"
            style={{ borderColor: "#228DCE", backgroundColor: "#f8f9fa" }}
          >
            <p className="mb-4 text-gray-700 leading-relaxed">
              <strong>Silan Software Private Limited</strong>, a company duly
              incorporated under the provisions of the Companies Act, 2013,
              bearing{" "}
              <strong>
                Corporate Identification Number (CIN): U72900OR2020PTC033921
              </strong>
              , and having its registered office at{" "}
              <strong>
                Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar – 751013,
                Odisha, India
              </strong>
              , and <strong>GST No: 21ABECS3045H1ZP</strong>, operates as a
              Fintech and Software Development Company, offering a suite of
              digital solutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy governs the manner in which we collect,
              process, use, store, and safeguard personal and sensitive data of
              individuals and entities who access or use our digital platforms.
            </p>
          </div>

          {/* Policy Content */}
          <div className="space-y-6">
            {/* 1. Legal Framework */}
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
                Legal Framework and Applicable Laws
              </h2>
              <p className="mb-4 text-gray-700">
                Silan Software conducts its business in accordance with the
                following Acts, Rules, and Regulations of India:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>Companies Act, 2013</li>
                <li>Information Technology Act, 2000</li>
                <li>
                  Information Technology (Reasonable Security Practices and
                  Procedures and Sensitive Personal Data or Information) Rules,
                  2011
                </li>
                <li>Digital Personal Data Protection Act, 2023 (DPDP Act)</li>
                <li>Payment and Settlement Systems Act, 2007</li>
                <li>Prevention of Money Laundering Act, 2002 (PMLA)</li>
                <li>
                  Reserve Bank of India (RBI) Guidelines on Payment Aggregators
                  and Payment Gateways (March 2020)
                </li>
                <li>Consumer Protection Act, 2019</li>
                <li>Indian Contract Act, 1872</li>
                <li>Right to Information Act, 2005</li>
                <li>Indian Penal Code, 1860</li>
              </ul>
            </div>

            {/* 2. Collection of Information */}
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
                Collection of Information
              </h2>
              <p className="mb-4 text-gray-700">
                We collect, store, and process information to facilitate our
                business services:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Personal Information:</strong> Name, email address,
                    phone number, address, and identification details such as
                    PAN, Aadhaar, or Passport.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Business Information:</strong> Company name, GSTIN,
                    CIN, business type, and incorporation documents.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Financial Information:</strong> Bank account
                    details, UPI IDs, transaction details, and payment history.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Technical Data:</strong> Device ID, IP address,
                    browser type, system logs, and usage data.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>KYC and Compliance Data:</strong> Identity proofs,
                    cancelled cheques, and other information required under RBI
                    and PMLA guidelines.
                  </span>
                </li>
              </ul>
            </div>

            {/* 3. Use of Information */}
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
                Use of Information
              </h2>
              <p className="mb-4 text-gray-700">
                Your information is used solely for legitimate business
                purposes, including:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>Providing digital and payment-related services</li>
                <li>Verifying user identity and conducting KYC/AML checks</li>
                <li>Processing transactions and settlements</li>
                <li>Monitoring and preventing fraud or misuse</li>
                <li>Complying with legal and regulatory requirements</li>
                <li>Enhancing user experience and customer support</li>
                <li>Conducting internal audits and risk assessments</li>
              </ul>
            </div>

            {/* 4. Data Protection and Security */}
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
                Data Protection and Security Practices
              </h2>
              <p className="mb-4 text-gray-700">
                Silan Software implements Reasonable Security Practices and
                Procedures including:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>End-to-end encryption (SSL/TLS) for data transmission</li>
                <li>AES-256 encryption for sensitive information</li>
                <li>Regular security audits and vulnerability testing</li>
                <li>Restricted data access for authorized personnel only</li>
                <li>Two-Factor Authentication (2FA) for platform access</li>
                <li>
                  ISO/IEC 27001:2013 information security standards compliance
                </li>
              </ul>
            </div>

            {/* 5. Data Retention and Deletion */}
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
                Data Retention and Deletion
              </h2>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    We retain data only as long as required to fulfill
                    contractual and regulatory obligations.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    After the retention period, all personal data is anonymized
                    or permanently deleted in accordance with Indian data
                    protection laws.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    Users may request deletion by writing to{" "}
                    <a
                      href="mailto:info@silanpay.com"
                      style={{ color: "#228DCE", fontWeight: "bold" }}
                    >
                      info@silanpay.com
                    </a>
                    , subject to statutory requirements.
                  </span>
                </li>
              </ul>
            </div>

            {/* 6. Disclosure of Information */}
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
                Disclosure of Information
              </h2>
              <p className="mb-4 text-gray-700">
                We may share your personal data only under the following
                conditions:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>
                  With banks, financial institutions, or NPCI for transaction
                  processing
                </li>
                <li>
                  With regulatory bodies such as RBI, MCA, FIU-IND, or GST
                  Department
                </li>
                <li>
                  With third-party service providers bound by Non-Disclosure
                  Agreements (NDAs)
                </li>
                <li>
                  In response to legal requests, subpoenas, or judicial orders
                </li>
                <li>
                  To protect rights, property, or safety of Silan Software, its
                  users, or the public
                </li>
              </ul>
              <p className="mt-4 text-gray-700 font-semibold">
                We do not sell, rent, or trade your personal data under any
                circumstances.
              </p>
            </div>

            {/* 7. Cookies and Tracking */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  7
                </span>
                Cookies and Tracking
              </h2>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>
                  Our Platform uses cookies to improve performance and analyze
                  website traffic
                </li>
                <li>You can disable cookies in your browser settings</li>
                <li>
                  Some site features may not function properly without cookies
                </li>
              </ul>
            </div>

            {/* 8. User Rights */}
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
                User Rights under Indian Law
              </h2>
              <p className="mb-4 text-gray-700">
                As per the Digital Personal Data Protection Act, 2023, you have
                the following rights:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Right to Access:</strong> Obtain a copy of your
                    stored data
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Right to Correction:</strong> Update inaccurate or
                    incomplete data
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Right to Deletion:</strong> Request deletion of data
                    (subject to legal obligations)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Right to Withdraw Consent:</strong> Stop data
                    processing at any time
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span
                    className="flex-shrink-0 w-2 h-2 mt-2 rounded-full"
                    style={{ backgroundColor: "#228DCE" }}
                  ></span>
                  <span>
                    <strong>Right to Grievance Redressal:</strong> File a
                    complaint if your data rights are violated
                  </span>
                </li>
              </ul>
            </div>

            {/* 9. Grievance Redressal */}
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
                  9
                </span>
                Grievance Redressal and Data Protection Officer
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  In compliance with Rule 5(9) of the Information Technology
                  Rules, 2011 and Section 10 of the DPDP Act, 2023, Silan
                  Software has appointed a Grievance cum Nodal Officer.
                </p>
                <div className="p-4 bg-white rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Building2
                      className="flex-shrink-0 mt-0.5"
                      size={18}
                      style={{ color: "#228DCE" }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Name</p>
                      <p className="text-gray-700">Mr. Trilochan Tarai</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail
                      className="flex-shrink-0 mt-0.5"
                      size={18}
                      style={{ color: "#228DCE" }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:info@silanpay.com"
                        style={{ color: "#228DCE" }}
                      >
                        info@silanpay.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone
                      className="flex-shrink-0 mt-0.5"
                      size={18}
                      style={{ color: "#228DCE" }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-700">+91-89842 89279</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="flex-shrink-0 mt-0.5"
                      size={18}
                      style={{ color: "#228DCE" }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-700">
                        Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar –
                        751013, Odisha, India
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Response Time:</strong> Within 15 working days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 10. Intellectual Property Rights */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  10
                </span>
                Intellectual Property Rights
              </h2>
              <p className="text-gray-700">
                All intellectual property rights, including the Platform design,
                content, code, and trademarks, belong exclusively to Silan
                Software Private Limited. No user shall copy, modify, or
                distribute our materials without written authorization.
              </p>
            </div>

            {/* 11. Limitation of Liability */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  11
                </span>
                Limitation of Liability
              </h2>
              <p className="mb-4 text-gray-700">
                While we implement advanced safeguards, Silan Software shall not
                be held liable for:
              </p>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>Unauthorized access due to third-party breaches</li>
                <li>Internet transmission errors beyond our control</li>
                <li>Data loss caused by force majeure or cyberattacks</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Users agree to indemnify the Company against any misuse or
                violation arising from their actions.
              </p>
            </div>

            {/* 12. Governing Law */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  12
                </span>
                Governing Law and Jurisdiction
              </h2>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>
                  This Privacy Policy shall be governed by the laws of India
                </li>
                <li>
                  The exclusive jurisdiction for any legal proceedings shall
                  rest with the competent courts of Bhubaneswar, Odisha
                </li>
              </ul>
            </div>

            {/* 13. Updates to the Policy */}
            <div className="p-8 bg-white border border-gray-200 shadow-md rounded-2xl">
              <h2
                className="mb-4 text-2xl font-bold flex items-center gap-3"
                style={{ color: "#212439" }}
              >
                <span
                  className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                  style={{ backgroundColor: "#228DCE" }}
                >
                  13
                </span>
                Updates to the Policy
              </h2>
              <ul className="space-y-2 ml-6 list-disc text-gray-700">
                <li>
                  This Privacy Policy may be updated periodically without prior
                  notice
                </li>
                <li>
                  All revisions will take effect immediately upon publication on
                  our website
                </li>
                <li>We encourage users to review this page regularly</li>
              </ul>
            </div>

            {/* 14. Contact Information */}
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
                  14
                </span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="flex-shrink-0 mt-1"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-700">
                      Plot No-741, 2nd Floor, Jayadev Vihar, Bhubaneswar –
                      751013, Odisha, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <span className="text-gray-700">+91-89842 89279</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <a
                    href="mailto:info@silanpay.com"
                    style={{ color: "#228DCE" }}
                  >
                    info@silanpay.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe
                    className="flex-shrink-0"
                    size={20}
                    style={{ color: "#228DCE" }}
                  />
                  <a
                    href="https://www.silanpay.com/"
                    target="_blank"
                    rel="noopener noreferrer"
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
          </div>

          {/* Footer Note */}
          <div
            className="p-6 mt-8 text-center border-2 rounded-2xl"
            style={{ borderColor: "#228DCE", backgroundColor: "#f8f9fa" }}
          >
            <p className="text-sm text-gray-600">
              For any concerns or clarifications regarding this Privacy Policy,
              please contact us at{" "}
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
      <Footer />

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

export default PrivacyPolicyPage;
