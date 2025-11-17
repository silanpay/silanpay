import { useState } from "react";
import { Users, TrendingUp, DollarSign, Link2, Copy, CheckCircle } from "lucide-react";

export default function AffiliatesPage() {
  const [copiedLink, setCopiedLink] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(text);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const affiliates = [
    {
      id: 1,
      name: "Tech Influencer Co",
      referralLink: "https://silanpay.com?ref=tech_influencer_001",
      signups: 45,
      revenue: 12500,
      commission: 3750,
      status: "active",
      joinDate: "2024-11-01",
    },
    {
      id: 2,
      name: "Marketing Agency Pro",
      referralLink: "https://silanpay.com?ref=marketing_pro_002",
      signups: 32,
      revenue: 8900,
      commission: 2670,
      status: "active",
      joinDate: "2024-12-15",
    },
    {
      id: 3,
      name: "Dev Community",
      referralLink: "https://silanpay.com?ref=dev_community_003",
      signups: 78,
      revenue: 21400,
      commission: 6420,
      status: "active",
      joinDate: "2024-10-20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Affiliates</h1>
          <p className="text-gray-600 mt-2">Manage affiliate partnerships and commissions</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit">
          Add Affiliate
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Total Affiliates</h3>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {affiliates.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Total Signups</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {affiliates.reduce((sum, a) => sum + a.signups, 0)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Total Revenue</h3>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ₹{affiliates
              .reduce((sum, a) => sum + a.revenue, 0)
              .toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">
              Total Commissions
            </h3>
            <DollarSign className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ₹{affiliates
              .reduce((sum, a) => sum + a.commission, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Affiliates List */}
      <div className="space-y-6">
        {affiliates.map((affiliate) => (
          <div
            key={affiliate.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {affiliate.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Member since {affiliate.joinDate}
                </p>
              </div>
              <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {affiliate.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Referral Link */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link2 className="w-4 h-4 text-gray-400" />
                <code className="text-sm text-gray-700 font-mono">
                  {affiliate.referralLink}
                </code>
              </div>
              <button
                onClick={() => copyToClipboard(affiliate.referralLink)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white transition"
              >
                {copiedLink === affiliate.referralLink ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  SIGNUPS
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {affiliate.signups}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  REVENUE
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{affiliate.revenue.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  COMMISSION
                </p>
                <p className="text-lg font-bold text-green-600">
                  ₹{affiliate.commission.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  RATE
                </p>
                <p className="text-lg font-bold text-gray-900">30%</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                View Details
              </button>
              <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
