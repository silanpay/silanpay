import React, { useState, useEffect } from "react";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    Target,
    CreditCard,
    ArrowUpRight,
    Activity,
    Loader2,
    RefreshCw,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { dashboardService, goalService, verificationService } from "../../services/api";
import OnboardingBanner from "../../components/dashboard/OnboardingBanner";
import toast from "react-hot-toast";

const OverviewPage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState({
        balance: 0,
        balanceChange: 0,
        spending: 0,
        spendingChange: 0,
        goals: 0,
        goalsChange: 0,
        income: 0,
        incomeChange: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [verification, setVerification] = useState(null);

    // Fetch dashboard data
    const fetchDashboardData = async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);
            else setRefreshing(true);

            // Fetch stats, recent activity, and verification status
            const [statsData, activityData, verificationData] = await Promise.all([
                dashboardService.getStats(),
                dashboardService.getRecentActivity(5),
                verificationService.getStatus(),
            ]);

            if (statsData.success) {
                setStats(statsData.stats);
            }

            if (activityData.success) {
                // Format activity data
                const formattedActivity = activityData.transactions.map((t) => ({
                    id: t._id,
                    type: t.type === "payment" ? "payment" : "spending",
                    description: t.description,
                    amount: t.type === "payment" ? `+₹${t.amount.toLocaleString()}` : `-₹${t.amount.toLocaleString()}`,
                    time: formatTimeAgo(new Date(t.transactionDate)),
                    status: t.status,
                }));
                setRecentActivity(formattedActivity);
            }

            if (verificationData.success) {
                setVerification(verificationData.verification);
            }

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Failed to load dashboard data");
            // Use cached data from localStorage if available
            const cachedStats = localStorage.getItem('dashboardStats');
            if (cachedStats) {
                setStats(JSON.parse(cachedStats));
            }
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();

        // Auto-refresh every 60 seconds
        const interval = setInterval(() => {
            fetchDashboardData(false);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // Save stats to localStorage
    useEffect(() => {
        if (stats.balance > 0) {
            localStorage.setItem('dashboardStats', JSON.stringify(stats));
        }
    }, [stats]);

    // Format time ago
    const formatTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    };

    const statCards = [
        {
            label: "Total Balance",
            value: `₹${(stats.balance / 100).toLocaleString()}`,
            change: stats.balanceChange,
            icon: DollarSign,
            color: "emerald",
        },
        {
            label: "Monthly Spending",
            value: `₹${(stats.spending / 100).toLocaleString()}`,
            change: stats.spendingChange,
            icon: TrendingDown,
            color: "red",
        },
        {
            label: "Active Goals",
            value: stats.goals.toString(),
            change: stats.goalsChange,
            icon: Target,
            color: "blue",
        },
        {
            label: "Monthly Income",
            value: `₹${(stats.income / 100).toLocaleString()}`,
            change: stats.incomeChange,
            icon: TrendingUp,
            color: "green",
        },
    ];

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="h-8 bg-gray-200 rounded w-48"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-white rounded-lg border border-gray-200"></div>
                    ))}
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="h-64 bg-white rounded-lg border border-gray-200"></div>
                    <div className="lg:col-span-2 h-64 bg-white rounded-lg border border-gray-200"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Onboarding Banner */}
            <OnboardingBanner verification={verification} />

            {/* Header with Refresh */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                    <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
                </div>
                <button
                    onClick={() => fetchDashboardData(false)}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, index) => (
                    <div
                        key={card.label}
                        className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-gray-900">
                                    {card.value}
                                </p>
                                <div className="flex items-center gap-1 mt-2">
                                    {card.change >= 0 ? (
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500" />
                                    )}
                                    <span
                                        className={`text-sm font-medium ${card.change >= 0 ? "text-emerald-600" : "text-red-600"
                                            }`}
                                    >
                                        {Math.abs(card.change)}%
                                    </span>
                                    <span className="text-sm text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <div className={`p-3 rounded-lg bg-${card.color}-50`}>
                                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Quick Actions */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Quick Actions
                    </h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between px-4 py-3 text-left bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                            <span className="font-medium">Send Money</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => window.location.href = '/dashboard/cards'}
                            className="w-full flex items-center justify-between px-4 py-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                            <span className="font-medium">Add Card</span>
                            <CreditCard className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => window.location.href = '/dashboard/analytics'}
                            className="w-full flex items-center justify-between px-4 py-3 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                        >
                            <span className="font-medium">View Reports</span>
                            <Activity className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === "payment"
                                                ? "bg-emerald-50"
                                                : "bg-red-50"
                                                }`}
                                        >
                                            {activity.type === "payment" ? (
                                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                            ) : (
                                                <TrendingDown className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                    <p
                                        className={`text-sm font-semibold ${activity.amount.startsWith("+")
                                            ? "text-emerald-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {activity.amount}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                <p>No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewPage;
