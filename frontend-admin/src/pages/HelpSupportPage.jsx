import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  BookOpen,
  Zap,
  Send,
} from "lucide-react";

export default function HelpSupportPage() {
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const faqs = [
    {
      id: 1,
      category: "Getting Started",
      question: "How do I create an account?",
      answer:
        "To create an account, click on the Sign Up button on the homepage and fill in your details. You'll receive a verification email to confirm your account.",
    },
    {
      id: 2,
      category: "Getting Started",
      question: "How do I verify my account?",
      answer:
        "After registration, check your email for a verification link. Click the link to verify your account. If you don't receive it, check your spam folder or request a new verification email.",
    },
    {
      id: 3,
      category: "Payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards, debit cards, bank transfers, and digital wallets like Apple Pay and Google Pay.",
    },
    {
      id: 4,
      category: "Payments",
      question: "How long do transactions take?",
      answer:
        "Most transactions are processed instantly. Bank transfers may take 1-3 business days depending on your bank.",
    },
    {
      id: 5,
      category: "Billing",
      question: "How can I update my billing information?",
      answer:
        "Go to Account Settings > Billing Information to update your payment method and billing address.",
    },
    {
      id: 6,
      category: "Billing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription anytime from your account settings. Your cancellation will take effect at the end of your current billing cycle.",
    },
    {
      id: 7,
      category: "Technical",
      question: "What are the API rate limits?",
      answer:
        "Our API supports up to 1000 requests per minute for most endpoints. Enterprise plans have higher limits.",
    },
    {
      id: 8,
      category: "Technical",
      question: "Is the API documentation available?",
      answer:
        "Yes, comprehensive API documentation is available in the Developers section. We also provide SDK for popular programming languages.",
    },
    {
      id: 9,
      category: "Security",
      question: "How is my data secured?",
      answer:
        "We use industry-standard encryption (SSL/TLS) and comply with PCI DSS standards. All data is stored securely in encrypted databases.",
    },
    {
      id: 10,
      category: "Security",
      question: "Do you offer two-factor authentication?",
      answer:
        "Yes, two-factor authentication is available for all accounts. We recommend enabling it for enhanced security.",
    },
  ];

  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "support@silanpay.com",
      responseTime: "2-4 hours",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our support team",
      contact: "+1 (555) 123-4567",
      responseTime: "Immediate",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our team",
      contact: "Available 9 AM - 6 PM",
      responseTime: "< 5 minutes",
    },
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Complete guides and tutorials",
      link: "#",
    },
    {
      icon: FileText,
      title: "Knowledge Base",
      description: "Articles and how-to guides",
      link: "#",
    },
    {
      icon: Zap,
      title: "API Reference",
      description: "Technical API documentation",
      link: "#",
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const faqCategories = ["All", ...new Set(faqs.map((f) => f.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Get answers to common questions and reach our support team</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {[
          { id: "faq", label: "FAQ", icon: BookOpen },
          { id: "support", label: "Contact Support", icon: Mail },
          { id: "contact", label: "Send Message", icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Tab */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition"
                >
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="text-left">
                      <p className="text-xs font-semibold text-blue-600 mb-1">
                        {faq.category}
                      </p>
                      <h3 className="text-base font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>

                  {expandedFAQ === faq.id && (
                    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === "support" && (
        <div className="space-y-6">
          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {channel.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-mono text-gray-900">
                      {channel.contact}
                    </p>
                    <p className="text-xs text-gray-600">
                      Response time: {channel.responseTime}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Other Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={index}
                    href={resource.link}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition flex items-center gap-4"
                  >
                    <Icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {resource.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Contact Tab */}
      {activeTab === "contact" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <form className="space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing Question</option>
                  <option>Feature Request</option>
                  <option>Bug Report</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  rows="8"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Max 10MB per file
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-600 text-center mt-4">
              We typically respond within 2-4 hours during business hours.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
