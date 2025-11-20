import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
    BarChart3,
    Bell,
    Home,
    Layers,
    LogOut,
    Menu,
    PieChart,
    Search,
    Settings,
    X,
    Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { verificationService } from "../../services/api";
import toast from "react-hot-toast";

const NAV_ITEMS = [
    { label: "Overview", icon: Home, path: "/dashboard", end: true },
    { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { label: "Cards", icon: Layers, path: "/dashboard/cards" },
    { label: "Transactions", icon: PieChart, path: "/dashboard/transactions" },
    { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // We don't need to block access here anymore, as we will show the banner on the Overview page
    // But we might want to fetch status to show a badge or something

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center w-10 h-10 text-base font-bold text-white rounded-lg"
                                style={{
                                    background:
                                        "linear-gradient(to bottom right, #238dcf, #1a6fa8)",
                                }}
                            >
                                SP
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                    Silan Pay
                                </p>
                                <p className="text-sm font-semibold text-gray-900">
                                    Finance OS
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.path}
                                end={item.end}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "text-gray-900"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`
                                }
                                style={({ isActive }) =>
                                    isActive
                                        ? {
                                            backgroundColor: "#f0f9ff",
                                            color: "#238dcf",
                                        }
                                        : {}
                                }
                            >
                                <item.icon
                                    className={`w-5 h-5 ${window.location.pathname === item.path
                                        ? "text-[#238dcf]"
                                        : "text-gray-400"
                                        }`}
                                    style={
                                        window.location.pathname === item.path
                                            ? { color: "#238dcf" }
                                            : {}
                                    }
                                />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div
                                className="flex items-center justify-center w-10 h-10 text-white rounded-full"
                                style={{
                                    background:
                                        "linear-gradient(to bottom right, #238dcf, #1a6fa8)",
                                }}
                            >
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.name || "User"}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || "user@example.com"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-red-600 transition-colors rounded-lg hover:bg-red-50"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                {/* Top Header (Mobile Only) */}
                <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 lg:hidden">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-lg"
                            style={{
                                background:
                                    "linear-gradient(to bottom right, #238dcf, #1a6fa8)",
                            }}
                        >
                            SP
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                            Silan Pay
                        </span>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-500 rounded-lg hover:bg-gray-100"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
