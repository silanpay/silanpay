import { useState } from "react";
import {
  CreditCard,
  Download,
  Upload,
  TrendingUp,
  Calendar,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function BalancePage() {
  const [showBalance, setShowBalance] = useState(true);
  const [timeframe, setTimeframe] = useState("month");

  // Demo data for balance chart
  const balanceData = [
    { date: "Jan 1", balance: 5000, income: 1000, expenses: 500 },
    { date: "Jan 7", balance: 6200, income: 1500, expenses: 300 },
    { date: "Jan 14", balance: 7100, income: 2000, expenses: 800 },
    { date: "Jan 21", balance: 8300, income: 1800, expenses: 600 },
    { date: "Jan 28", balance: 8636.8, income: 2200, expenses: 1100 },
  ];

  const transactionSummary = [
    { label: "Total Income", amount: "₹8,500", icon: Download, color: "green" },
    { label: "Total Expenses", amount: "₹3,200", icon: Upload, color: "red" },
    { label: "Net Balance", amount: "₹8,636.80", icon: CreditCard, color: "blue" },
    { label: "Monthly Growth", amount: "+72.7%", icon: TrendingUp, color: "purple" },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Payment received from John Doe",
      amount: 2500,
      date: "Today, 2:30 PM",
      status: "completed",
    },
    {
      id: 2,
      type: "expense",
      description: "API charges - Monthly bill",
      amount: 199,
      date: "Today, 10:15 AM",
      status: "completed",
    },
    {
      id: 3,
      type: "income",
      description: "Subscription renewal - 5 users",
      amount: 4950,
      date: "Yesterday, 4:45 PM",
      status: "completed",
    },
    {
      id: 4,
      type: "expense",
      description: "Server maintenance",
      amount: 500,
      date: "2 days ago",
      status: "pending",
    },
    {
      id: 5,
      type: "income",
      description: "Refund from vendor",
      amount: 1500,
      date: "3 days ago",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Balance</h1>
          <p className="text-gray-600 mt-2">Track your account balance and financial overview</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
        </div>
      </div>

      {/* Current Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-blue-100 text-sm font-semibold mb-2">CURRENT BALANCE</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">₹8,636.80</span>
            </div>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div>
            <p className="text-blue-100 text-xs font-semibold mb-1">MONTHLY INCOME</p>
            <p className="text-xl font-bold">₹8,500</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs font-semibold mb-1">MONTHLY EXPENSES</p>
            <p className="text-xl font-bold">₹3,200</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs font-semibold mb-1">GROWTH</p>
            <p className="text-xl font-bold">+72.7%</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {transactionSummary.map((card, index) => {
          const Icon = card.icon;
          const colorClasses = {
            green: "bg-green-100 text-green-600",
            red: "bg-red-100 text-red-600",
            blue: "bg-blue-100 text-blue-600",
            purple: "bg-purple-100 text-purple-600",
          };
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className={`w-12 h-12 rounded-lg ₹{colorClasses[card.color]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{card.label}</p>
              <p className="text-2xl font-bold text-gray-900">{card.amount}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Balance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expenses */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#10b981" />
              <Bar dataKey="expenses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
          <p className="text-gray-600 text-sm mt-1">Your latest account activity</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ₹{
                        tx.type === "income" ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {tx.type === "income" ? (
                          <Download className={`w-5 h-5 text-green-600`} />
                        ) : (
                          <Upload className={`w-5 h-5 text-red-600`} />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`text-sm font-bold ₹{
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}>
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{tx.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ₹{
                      tx.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {tx.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
