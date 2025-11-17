import { useState } from "react";
import {
  Code2,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
} from "lucide-react";

export default function DevelopersPage() {
  const [showKeys, setShowKeys] = useState({});
  const [copiedKey, setCopiedKey] = useState(null);

  const apiKeys = [
  {
    id: 1,
    name: "Production API Key",
    key: "pk_live_example_key_12345678",
    status: "active",
    created: "2025-01-01",
    lastUsed: "2025-01-17",
    requests: 125420,
  },
  {
    id: 2,
    name: "Sandbox Testing",
    key: "pk_test_example_key_12345678",
    status: "active",
    created: "2024-12-15",
    lastUsed: "2025-01-17",
    requests: 45320,
  },
  {
    id: 3,
    name: "Mobile App Integration",
    key: "pk_mobile_example_key_12345678",
    status: "inactive",
    created: "2024-10-01",
    lastUsed: "2025-01-10",
    requests: 12450,
  },
];


  const toggleKeyVisibility = (id) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key) => {
    const visible = key.slice(-8);
    const masked = "*".repeat(key.length - 8);
    return masked + visible;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developers</h1>
          <p className="mt-2 text-gray-600">Manage API keys and integrations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 w-fit">
          <Plus className="w-4 h-4" />
          New API Key
        </button>
      </div>

      {/* Documentation Section */}
      <div className="p-8 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <div className="flex items-start gap-4">
          <Code2 className="flex-shrink-0 w-6 h-6 mt-1 text-blue-600" />
          <div className="flex-1">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              API Documentation
            </h2>
            <p className="mb-4 text-gray-600">
              Get started with our REST API to integrate payment processing into your application.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                View Docs
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                API Reference
              </a>
              <a
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Webhooks
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">API Keys</h2>
          <p className="mt-1 text-sm text-gray-600">
            Your secret keys for API authentication
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="p-6 transition hover:bg-gray-50">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900">
                    {apiKey.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Created on {apiKey.created}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    apiKey.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {apiKey.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Key Display */}
              <div className="flex items-center justify-between p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50">
                <code className="font-mono text-sm text-gray-700">
                  {showKeys[apiKey.id] ? apiKey.key : maskKey(apiKey.key)}
                </code>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                    className="p-2 text-gray-600 transition rounded-lg hover:text-gray-900 hover:bg-white"
                  >
                    {showKeys[apiKey.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className="p-2 text-gray-600 transition rounded-lg hover:text-gray-900 hover:bg-white"
                  >
                    {copiedKey === apiKey.key ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-gray-200 sm:grid-cols-3">
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-600">
                    REQUESTS
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {(apiKey.requests / 1000).toFixed(1)}K
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-600">
                    LAST USED
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {apiKey.lastUsed}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold text-gray-600">
                    CREATED
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {apiKey.created}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 transition rounded-lg bg-blue-50 hover:bg-blue-100">
                  Regenerate
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 transition rounded-lg bg-gray-50 hover:bg-gray-100">
                  Edit
                </button>
                <button className="p-2 text-red-600 transition rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Quick Start</h2>
        </div>
        <div className="p-6">
          <div className="p-4 overflow-x-auto font-mono text-sm text-gray-100 bg-gray-900 rounded-lg">
            <pre>{`// Initialize SDK
import SilanPay from 'silarpay-sdk';

const payment = new SilanPay({
  apiKey: 'sk_live_...',
});

// Create payment
const result = await payment.createPayment({
  amount: 10000,
  currency: 'USD',
  customerEmail: 'customer@example.com'
});`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
