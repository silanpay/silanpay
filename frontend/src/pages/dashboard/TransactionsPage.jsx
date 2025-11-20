import React, { useState, useEffect } from "react";
import {
    Search,
    Filter,
    Download,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    X,
    Loader2,
    Calendar,
} from "lucide-react";
import { transactionService } from "../../services/api";
import toast from "react-hot-toast";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [filters, setFilters] = useState({
        status: "",
        type: "",
        category: "",
        startDate: "",
        endDate: "",
    });
    const [showFilters, setShowFilters] = useState(false);

    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const params = {
                page: currentPage,
                limit: 10,
                search: searchTerm,
                ...filters,
            };

            const response = await transactionService.getAll(params);
            if (response.success) {
                setTransactions(response.transactions);
                setTotalPages(response.totalPages);
                setTotalTransactions(response.totalTransactions);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentPage, searchTerm, filters]);

    const getStatusColor = (status) => {
        switch (status) {
            case "success":
                return "bg-emerald-100 text-emerald-700";
            case "pending":
                return "bg-amber-100 text-amber-700";
            case "failed":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters({ ...filters, [key]: value });
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setFilters({
            status: "",
            type: "",
            category: "",
            startDate: "",
            endDate: "",
        });
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handleExport = () => {
        toast.success("Export functionality coming soon!");
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        View and manage all your transactions
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg flex-1 max-w-md">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full text-sm bg-transparent placeholder-gray-400 focus:outline-none text-gray-700"
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                        {(filters.status || filters.type || filters.category) && (
                            <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-700 rounded-full">
                                Active
                            </span>
                        )}
                    </button>
                    {(filters.status || filters.type || filters.category || searchTerm) && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="grid gap-4 md:grid-cols-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <option value="">All</option>
                                <option value="success">Success</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => handleFilterChange("type", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <option value="">All</option>
                                <option value="payment">Payment</option>
                                <option value="spending">Spending</option>
                                <option value="transfer">Transfer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange("category", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            >
                                <option value="">All</option>
                                <option value="food">Food</option>
                                <option value="shopping">Shopping</option>
                                <option value="bills">Bills</option>
                                <option value="transfer">Transfer</option>
                                <option value="subscription">Subscription</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => handleFilterChange("startDate", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Transactions Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <Search className="w-12 h-12 mb-3 opacity-30" />
                        <p>No transactions found</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 font-medium text-gray-700">
                                            <div className="flex items-center gap-2">
                                                Date
                                                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 font-medium text-gray-700">Description</th>
                                        <th className="px-6 py-3 font-medium text-gray-700">Type</th>
                                        <th className="px-6 py-3 font-medium text-gray-700">Category</th>
                                        <th className="px-6 py-3 font-medium text-gray-700">Amount</th>
                                        <th className="px-6 py-3 font-medium text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {transactions.map((txn) => (
                                        <tr key={txn._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-600">
                                                {new Date(txn.transactionDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900">{txn.description}</td>
                                            <td className="px-6 py-4 text-gray-600 capitalize">{txn.type}</td>
                                            <td className="px-6 py-4 text-gray-600 capitalize">{txn.category}</td>
                                            <td className="px-6 py-4 font-medium">
                                                <span
                                                    className={
                                                        txn.type === "payment" ? "text-emerald-600" : "text-red-600"
                                                    }
                                                >
                                                    {txn.type === "payment" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                                        txn.status
                                                    )}`}
                                                >
                                                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <p className="text-sm text-gray-600">
                                Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalTransactions)} of{" "}
                                {totalTransactions} transactions
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let page;
                                        if (totalPages <= 5) {
                                            page = i + 1;
                                        } else if (currentPage <= 3) {
                                            page = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            page = totalPages - 4 + i;
                                        } else {
                                            page = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 text-sm font-medium rounded-lg ${currentPage === page
                                                        ? "bg-emerald-600 text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TransactionsPage;
