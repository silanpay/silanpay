import { useState } from "react";
import {
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Download,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const [reportType, setReportType] = useState("revenue");
  const [timeframe, setTimeframe] = useState("month");

  const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 28000, profit: 17000 },
    { month: "Feb", revenue: 52000, expenses: 30000, profit: 22000 },
    { month: "Mar", revenue: 48000, expenses: 25000, profit: 23000 },
    { month: "Apr", revenue: 61000, expenses: 32000, profit: 29000 },
    { month: "May", revenue: 55000, expenses: 28000, profit: 27000 },
    { month: "Jun", revenue: 67000, expenses: 35000, profit: 32000 },
  ];

  const categoryData = [
    { name: "Subscriptions", value: 45, fill: "#3b82f6" },
    { name: "API Usage", value: 25, fill: "#10b981" },
    { name: "Add-ons", value: 20, fill: "#f59e0b" },
    { name: "Custom", value: 10, fill: "#8b5cf6" },
  ];

  const customerData = [
    { month: "Jan", new: 12, active: 145, churn: 3 },
    { month: "Feb", new: 18, active: 160, churn: 2 },
    { month: "Mar", new: 15, active: 173, churn: 1 },
    { month: "Apr", new: 22, active: 194, churn: 3 },
    { month: "May", new: 19, active: 210, churn: 2 },
    { month: "Jun", new: 25, active: 232, churn: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Analytics and business insights</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 w-fit">
          <Download className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="revenue">Revenue Report</option>
              <option value="customers">Customer Report</option>
              <option value="products">Product Report</option>
            </select>
          </div>

          {/* Timeframe */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Range
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              <input
                type="date"
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Total Revenue</h3>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹328,000</p>
          <p className="text-xs text-green-600 font-semibold mt-2">
            +12.5% vs last period
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Avg Order</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹1,450</p>
          <p className="text-xs text-green-600 font-semibold mt-2">
            +5.2% vs last period
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Conversion</h3>
            <PieChartIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3.2%</p>
          <p className="text-xs text-green-600 font-semibold mt-2">
            +0.8% vs last period
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-600">Churn Rate</h3>
            <LineChartIcon className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">1.2%</p>
          <p className="text-xs text-green-600 font-semibold mt-2">
            -0.3% vs last period
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" />
              <Bar dataKey="expenses" fill="#ef4444" />
              <Bar dataKey="profit" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `₹{name}: ₹{value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-₹{index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Customer Growth */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Customer Metrics
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="churn" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
