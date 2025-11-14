import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  CheckCircle,
  ArrowRight,
  Bell,
  Shield,
  RefreshCw,
  Filter,
  Code,
  Activity,
} from "lucide-react";
import Header from "../components/layout/Header";
import ScrollToTop from "../components/common/ScrollToTop";

const WebhooksPage = () => {
  const features = [
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description:
        "Receive instant updates for all payment events in real-time",
    },
    {
      icon: RefreshCw,
      title: "Automatic Retries",
      description:
        "Smart retry logic with exponential backoff for failed deliveries",
    },
    {
      icon: Shield,
      title: "Secure Signatures",
      description: "HMAC-SHA256 signatures to verify webhook authenticity",
    },
    {
      icon: Filter,
      title: "Event Filtering",
      description: "Subscribe only to the events you need",
    },
  ];

  const events = [
    {
      name: "payment.success",
      description: "Payment completed successfully",
      color: "green",
    },
    {
      name: "payment.failed",
      description: "Payment failed or declined",
      color: "red",
    },
    {
      name: "payment.pending",
      description: "Payment is pending",
      color: "yellow",
    },
    {
      name: "refund.processed",
      description: "Refund has been processed",
      color: "blue",
    },
    {
      name: "payout.success",
      description: "Payout completed successfully",
      color: "green",
    },
    {
      name: "payout.failed",
      description: "Payout failed",
      color: "red",
    },
    {
      name: "customer.created",
      description: "New customer created",
      color: "purple",
    },
    {
      name: "subscription.created",
      description: "New subscription created",
      color: "indigo",
    },
  ];

  const benefits = [
    "Zero polling required",
    "Instant event notifications",
    "Multiple webhook URLs",
    "Detailed event logs",
    "Webhook testing tools",
    "Custom headers support",
    "IP whitelisting available",
    "Webhook replay functionality",
  ];

  const retrySchedule = [
    { attempt: "1st", delay: "Immediate" },
    { attempt: "2nd", delay: "5 minutes" },
    { attempt: "3rd", delay: "15 minutes" },
    { attempt: "4th", delay: "1 hour" },
    { attempt: "5th", delay: "6 hours" },
    { attempt: "6th", delay: "24 hours" },
  ];

  return (
    <div className="min-h-screen bg-white font-outfit">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-indigo-50 to-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-indigo-100 rounded-2xl">
              <Zap className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900">Webhooks</h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Stay synchronized with real-time event notifications. Get instant
              updates for all payment events directly to your server with secure
              webhooks.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform bg-indigo-600 rounded-xl hover:bg-indigo-700 hover:scale-105 hover:shadow-xl"
              >
                Setup Webhooks
              </Link>
              <Link
                to="/documentation"
                className="px-8 py-4 text-lg font-semibold text-indigo-600 transition-all duration-300 border-2 border-indigo-600 rounded-xl hover:bg-indigo-50"
              >
                View Documentation
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
              Webhook Features
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Enterprise-grade webhook infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 transition-all duration-300 transform bg-gray-50 rounded-xl hover:shadow-lg hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-lg">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
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

      {/* Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Webhook Events
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Subscribe to the events that matter to your business
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="p-4 transition-all duration-300 bg-white rounded-lg hover:shadow-md"
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-3 h-3 rounded-full bg-${event.color}-500 mr-3`}
                  ></div>
                  <span className="font-mono text-sm font-semibold text-gray-900">
                    {event.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/documentation"
              className="inline-flex items-center px-6 py-3 font-semibold text-indigo-600 transition-all border-2 border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Easy Implementation
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                Configure webhooks in your dashboard and start receiving events
              </p>

              <div className="p-6 mb-8 bg-gray-900 rounded-xl">
                <div className="mb-2 text-sm text-gray-400">
                  Example Webhook Payload
                </div>
                <pre className="overflow-x-auto text-sm text-gray-100">
                  {`{
  "event": "payment.success",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": "pay_abc123xyz",
    "amount": 1000,
    "currency": "INR",
    "status": "success",
    "customer": {
      "email": "customer@example.com",
      "phone": "+919876543210"
    }
  }
}`}
                </pre>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  Verify Signature
                </h3>
                <div className="p-6 bg-gray-900 rounded-xl">
                  <div className="mb-2 text-sm text-gray-400">
                    Node.js Example
                  </div>
                  <pre className="overflow-x-auto text-sm text-gray-100">
                    {`const crypto = require('crypto');

function verifyWebhook(payload, signature) {
  const secret = 'YOUR_WEBHOOK_SECRET';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return hash === signature;
}`}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-6 text-4xl font-bold text-gray-900">
                Automatic Retry Logic
              </h2>
              <p className="mb-8 text-xl text-gray-600">
                We ensure your webhooks are delivered even if your server is
                temporarily unavailable
              </p>

              <div className="p-6 mb-8 bg-gradient-to-br from-indigo-50 to-white rounded-xl border-2 border-indigo-100">
                <div className="flex items-center mb-4">
                  <Activity className="w-6 h-6 mr-2 text-indigo-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    Retry Schedule
                  </h3>
                </div>
                <div className="space-y-3">
                  {retrySchedule.map((retry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white rounded-lg"
                    >
                      <span className="font-semibold text-gray-900">
                        {retry.attempt} Attempt
                      </span>
                      <span className="text-gray-600">{retry.delay}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Response Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Return 200 OK
                      </div>
                      <div className="text-sm text-gray-600">
                        Acknowledge receipt with HTTP 200
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Respond quickly
                      </div>
                      <div className="text-sm text-gray-600">
                        Within 5 seconds to avoid timeout
                      </div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Code className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">
                        Idempotent handling
                      </div>
                      <div className="text-sm text-gray-600">
                        Handle duplicate events gracefully
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white">
            Start Using Webhooks Today
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-indigo-100">
            Set up real-time event notifications in minutes
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-indigo-600 transition-all duration-300 transform bg-white rounded-xl hover:scale-105 hover:shadow-2xl"
          >
            Configure Webhooks
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
};

export default WebhooksPage;
