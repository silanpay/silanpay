import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Upload,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const transactions = [
    {
      id: "TXN001",
      type: "income",
      description: "Payment from Acme Corp",
      category: "Client Payment",
      amount: 5000,
      date: "2025-01-17",
      time: "2:30 PM",
      status: "completed",
      reference: "INV-2025-001",
    },
    {
      id: "TXN002",
      type: "expense",
      description: "AWS Cloud Services",
      category: "Infrastructure",
      amount: 299.99,
      date: "2025-01-17",
      time: "10:15 AM",
      status: "completed",
      reference: "AWS-2025-01",
    },
    {
      id: "TXN003",
      type: "income",
      description: "Subscription Payment - 10 users",
      category: "Subscription",
      amount: 1000,
      date: "2025-01-16",
      time: "8:45 AM",
      status: "completed",
      reference: "SUB-2025-001",
    },
    {
      id: "TXN004",
      type: "expense",
      description: "Slack Enterprise Plan",
      category: "Software",
      amount: 450,
      date: "2025-01-15",
      time: "3:20 PM",
      status: "completed",
      reference: "SLACK-2025",
    },
    {
      id: "TXN005",
      type: "income",
      description: "Refund - Cancelled Order",
      category: "Refund",
      amount: 250,
      date: "2025-01-15",
      time: "11:00 AM",
      status: "pending",
      reference: "REF-2025-001",
    },
    {
      id: "TXN006",
      type: "expense",
      description: "Office Supplies",
      category: "Operations",
      amount: 125.50,
      date: "2025-01-14",
      time: "1:15 PM",
      status: "completed",
      reference: "OFF-2025-001",
    },
    {
      id: "TXN007",
      type: "income",
      description: "Contract Completion Payment",
      category: "Project",
      amount: 7500,
      date: "2025-01-14",
      time: "9:00 AM",
      status: "completed",
      reference: "PROJ-2025-001",
    },
    {
      id: "TXN008",
      type: "expense",
      description: "Team Training",
      category: "HR",
      amount: 800,
      date: "2025-01-13",
      time: "4:30 PM",
      status: "completed",
      reference: "HR-2025-001",
    },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">View and manage all your transactions</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 w-fit">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by description or reference..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Transaction
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ₹{
                          tx.type === "income"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {tx.type === "income" ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {tx.description}
                        </p>
                        <p className="text-xs text-gray-500">{tx.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p
                      className={`text-sm font-bold ₹{
                        tx.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.type === "income" ? "+" : "-"}₹{tx.amount.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <p>{tx.date}</p>
                      <p className="text-xs text-gray-500">{tx.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ₹{
                        tx.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {tx.status === "completed" ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-mono text-gray-600">{tx.reference}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm font-medium text-gray-700">
            Showing page <span className="font-bold">{page}</span> of{" "}
            <span className="font-bold">{totalPages}</span> •{" "}
            <span className="text-gray-600 ml-2">
              {filteredTransactions.length} total transactions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
