import { useQuery } from "@tanstack/react-query";
import {
  Users,
  UserCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  FileText,
  Settings,
  ShoppingCart,
  Tag,
  ExternalLink,
  CheckCircle2,
  Code,
} from "lucide-react";
import { adminAPI } from "../services/api";
import { format } from "date-fns";

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => adminAPI.getStats().then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      trend: "+12%",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
      trend: "+5%",
    },
    {
      title: "New Users (30d)",
      value: stats?.newUsers || 0,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      trend: "+23%",
    },
    {
      title: "Total Admins",
      value: stats?.totalAdmins || 0,
      icon: Activity,
      color: "bg-orange-100 text-orange-600",
      trend: "0%",
    },
  ];

  const setupCards = [
    {
      title: "Create Product Catalog",
      description: "Customize products and pricing model with complete control",
      icon: ShoppingCart,
      color: "bg-teal-100 text-teal-600",
      borderColor: "border-teal-200",
      link: "/setup/products",
      docLink: "/docs/products",
    },
    {
      title: "Setup Checkout",
      description: "Configure checkout experience, add photos, and customize flow",
      icon: Settings,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
      link: "/setup/checkout",
      docLink: "/docs/checkout",
    },
    {
      title: "Create Discount",
      description: "Setup discount strategies, coupons, and promotional campaigns",
      icon: Tag,
      color: "bg-amber-100 text-amber-600",
      borderColor: "border-amber-200",
      link: "/setup/discounts",
      docLink: "/docs/discounts",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Account Setup Header Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-8 border border-indigo-200 shadow-sm">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Account Setup</h1>
          <p className="text-gray-600 text-lg">
            Get ready to sell with the help of our team's friendly insights!
          </p>
        </div>

        {/* Balance and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Balance Card */}
          <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="mb-4">
              <h3 className="text-xs font-bold text-gray-600 uppercase tracking-widest">
                Account Balance
              </h3>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  ₹{(stats?.balance || 8636.8).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Account Completion</span>
                <span className="text-sm font-bold text-teal-600">75%</span>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full w-3/4 shadow-sm"></div>
              </div>
            </div>

            {/* Checkmark List */}
            <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-xs text-gray-600">Email verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-xs text-gray-600">Account created</span>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          {statCards.slice(0, 3).map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
                <p className="text-sm text-gray-600 mt-2">{stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Getting Started Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Getting Started</h2>
          <p className="text-gray-600 text-base max-w-2xl">
            Develop products, subscriptions, and checkout integration. Manage invoicing, oversee subscription lifecycle, and conduct thorough integration testing.
          </p>
        </div>

        {/* Setup Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {setupCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className={`bg-white rounded-xl border-2 ${card.borderColor} p-6 shadow-sm hover:shadow-lg transition-all duration-200 group cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {card.description}
                </p>

                <button className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors group/link">
                  View Docs
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Explore Documentation Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Explore Documentation
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                Get complete guides, API references, code examples, and integration support
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg">
              View Docs
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Users Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
          <p className="text-gray-600 text-sm mt-1">Latest registered customers</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {!stats?.recentUsers || stats?.recentUsers?.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">No recent users yet</p>
                <p className="text-sm text-gray-500 mt-1">Users will appear here as they register</p>
              </div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats?.recentUsers?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-sm">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {user._id?.slice(-6) || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            user.isActive ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            user.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-600">
            Showing <span className="font-semibold">{stats?.recentUsers?.length || 0}</span> recent users
          </p>
        </div>
      </div>
    </div>
  );
}
