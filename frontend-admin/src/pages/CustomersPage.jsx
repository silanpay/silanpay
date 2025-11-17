import { useState } from "react";
import {
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  UserCheck,
  UserX,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@acmecorp.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Corporation",
      location: "New York, USA",
      status: "active",
      joinDate: "2024-01-15",
      totalSpent: 15000,
      lastTransaction: "2025-01-17",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@techstart.io",
      phone: "+1 (555) 234-5678",
      company: "TechStart Inc",
      location: "San Francisco, USA",
      status: "active",
      joinDate: "2024-03-22",
      totalSpent: 8500,
      lastTransaction: "2025-01-16",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@globaltech.com",
      phone: "+1 (555) 345-6789",
      company: "Global Tech Solutions",
      location: "Austin, USA",
      status: "active",
      joinDate: "2024-05-10",
      totalSpent: 22000,
      lastTransaction: "2025-01-17",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@innovate.co",
      phone: "+1 (555) 456-7890",
      company: "Innovate Labs",
      location: "Boston, USA",
      status: "inactive",
      joinDate: "2024-02-14",
      totalSpent: 5000,
      lastTransaction: "2024-12-20",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@enterprise.biz",
      phone: "+1 (555) 567-8901",
      company: "Enterprise Solutions",
      location: "Chicago, USA",
      status: "active",
      joinDate: "2024-06-01",
      totalSpent: 31000,
      lastTransaction: "2025-01-15",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa@startup.dev",
      phone: "+1 (555) 678-9012",
      company: "Startup Dev",
      location: "Seattle, USA",
      status: "active",
      joinDate: "2024-07-19",
      totalSpent: 4500,
      lastTransaction: "2025-01-14",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">Manage your customer relationships and accounts</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit">
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedCustomers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-600">{customer.company}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ₹{
                  customer.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {customer.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {customer.location}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  TOTAL SPENT
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ₹{customer.totalSpent.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  MEMBER SINCE
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {new Date(customer.joinDate).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "short",
                  })}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium">
                View Details
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition text-sm font-medium">
                Send Invoice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            Showing page <span className="font-bold">{page}</span> of{" "}
            <span className="font-bold">{totalPages}</span> •{" "}
            <span className="text-gray-600 ml-2">
              {filteredCustomers.length} total customers
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
      )}
    </div>
  );
}
