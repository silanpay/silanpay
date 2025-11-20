import React, { useState, useEffect } from "react";
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Download,
    Loader2,
} from "lucide-react";
import { dashboardService } from "../../services/api";
import toast from "react-hot-toast";

const AnalyticsPage = () => {
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState("month");
    const [analytics, setAnalytics] = useState({
        monthlyData: {},
        categoryBreakdown: {},
        totalEarnings: 0,
        totalExpenses: 0,
    });

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await dashboardService.getAnalytics(range);
            if (response.success) {
                setAnalytics(response.analytics);
            }
        } catch (error) {
            console.error("Error fetching analytics:", error);
            toast.error("Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, [range]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Prepare chart data
    const monthlyChartData = Object.entries(analytics.monthlyData || {}).map(([month, data]) => ({
        month: months[parseInt(month)],
        earnings: data.earnings / 100,
        expenses: data.expenses / 100,
    }));

    const maxValue = Math.max(
        ...monthlyChartData.map(d => Math.max(d.earnings, d.expenses)),
        1
    );

    // Category breakdown data
    const categoryData = Object.entries(analytics.categoryBreakdown || {}).map(([category, amount]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        amount: amount / 100,
        percentage: ((amount / analytics.totalExpenses) * 100).toFixed(1),
    })).sort((a, b) => b.amount - a.amount);

    const categoryColors = {
        Food: "bg-red-500",
        Shopping: "bg-blue-500",
        Bills: "bg-yellow-500",
        Transfer: "bg-green-500",
        Subscription: "bg-purple-500",
        Other: "bg-gray-500",
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Track your earnings and expenses over time
                    </p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                    </select>
                    <button
                        onClick={() => toast.success("Export feature coming soon!")}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">
                                ₹{(analytics.totalEarnings / 100).toLocaleString()}
                            </p>
                            <p className="mt-1 text-sm text-emerald-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                Income received
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-emerald-600" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">
                                ₹{(analytics.totalExpenses / 100).toLocaleString()}
                            </p>
                            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                Amount spent
                            </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Net Savings</p>
                            <p className="mt-2 text-2xl font-semibold text-gray-900">
                                ₹{((analytics.totalEarnings - analytics.totalExpenses) / 100).toLocaleString()}
                            </p>
                            <p className="mt-1 text-sm text-blue-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" />
                                {(((analytics.totalEarnings - analytics.totalExpenses) / analytics.totalEarnings) * 100).toFixed(1)}% saved
                            </p>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Earnings vs Expenses Chart */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Earnings vs Expenses
                            </h3>
                            <p className="text-sm text-gray-600">Monthly comparison</p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                                <span className="text-gray-700">Earnings</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-gray-700">Expenses</span>
                            </div>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="space-y-4">
                        {monthlyChartData.map((data) => (
                            <div key={data.month}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-600">{data.month}</span>
                                    <div className="flex gap-4 text-xs">
                                        <span className="text-emerald-600">₹{data.earnings.toLocaleString()}</span>
                                        <span className="text-red-600">₹{data.expenses.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="flex gap-1 h-8">
                                    <div
                                        className="bg-emerald-500 rounded transition-all hover:bg-emerald-600"
                                        style={{ width: `${(data.earnings / maxValue) * 100}%` }}
                                    ></div>
                                    <div
                                        className="bg-red-500 rounded transition-all hover:bg-red-600"
                                        style={{ width: `${(data.expenses / maxValue) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                        Spending by Category
                    </h3>
                    <div className="space-y-4">
                        {categoryData.length > 0 ? (
                            categoryData.map((cat) => (
                                <div key={cat.category}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                                        <div className="text-sm">
                                            <span className="font-semibold text-gray-900">₹{cat.amount.toLocaleString()}</span>
                                            <span className="text-gray-500 ml-2">({cat.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`${categoryColors[cat.category] || 'bg-gray-500'} h-2 rounded-full transition-all`}
                                            style={{ width: `${cat.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>No spending data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
