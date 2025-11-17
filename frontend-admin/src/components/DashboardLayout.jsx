import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Zap,
  FileText,
  CreditCard,
  Grid3X3,
  Search,
  Bell,
  HelpCircle,
  Settings2,
  Moon,
  Sun,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [testMode, setTestMode] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for dark mode preference
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) {
      return JSON.parse(stored);
    }
    // Check system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const mainNavigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Balance", href: "/balance", icon: CreditCard },
    { name: "Transactions", href: "/transactions", icon: FileText },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Product Catalog", href: "/products", icon: Grid3X3 },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Invoice", href: "/invoice", icon: FileText },
  ];

  const otherNavigation = [
    { name: "Developers", href: "/developers", icon: Zap },
    { name: "Affiliates", href: "/affiliates", icon: Users },
    { name: "Setup", href: "/setup", icon: Settings },
    { name: "Design", href: "/design", icon: Grid3X3 },
  ];

  // Update dark mode in localStorage and apply to document
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb";
    }
  }, [darkMode]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationsOpen(false);
      setProfileMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const NavLink = ({ item, onClick }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        onClick={onClick}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
          transition-colors duration-200
          ${
            isActive
              ? darkMode
                ? "bg-primary-900 text-primary-300"
                : "bg-primary-50 text-primary-600"
              : darkMode
              ? "text-gray-300 hover:bg-slate-800"
              : "text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        <Icon
          className={`w-5 h-5 ${
            isActive
              ? darkMode
                ? "text-primary-300"
                : "text-primary-600"
              : darkMode
              ? "text-gray-500"
              : "text-gray-500"
          }`}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-slate-950" : "bg-gray-50"}`}>
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div
          className={`flex flex-col h-screen ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
          } border-r overflow-y-auto`}
        >
          {/* Logo */}
          <div
            className={`h-16 flex items-center px-6 ${
              darkMode ? "border-slate-800" : "border-gray-200"
            } border-b`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">SP</span>
              </div>
              <span
                className={`text-lg font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Silanpay
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div>
              <p
                className={`px-4 text-xs font-semibold ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } uppercase tracking-wider mb-2`}
              >
                Main
              </p>
              <div className="space-y-1">
                {mainNavigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            </div>

            {/* Others Section */}
            <div className="mt-6">
              <p
                className={`px-4 text-xs font-semibold ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                } uppercase tracking-wider mb-2`}
              >
                Others
              </p>
              <div className="space-y-1">
                {otherNavigation.map((item) => (
                  <NavLink key={item.name} item={item} />
                ))}
              </div>
            </div>
          </nav>

          {/* User info */}
          <div
            className={`${
              darkMode ? "border-slate-800 bg-slate-800/50" : "border-gray-200 bg-white"
            } border-t p-4 space-y-3`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">
                    {adminUser.name?.charAt(0) || "A"}
                  </span>
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {adminUser.name || "Admin"}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    } truncate`}
                  >
                    {adminUser.email || "admin@example.com"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium ${
                darkMode
                  ? "text-red-400 hover:bg-red-900/30"
                  : "text-red-600 hover:bg-red-50"
              } rounded-lg transition-colors`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 flex w-64 flex-col ${
              darkMode ? "bg-slate-900" : "bg-white"
            }`}
          >
            {/* Mobile Header */}
            <div
              className={`h-16 flex items-center justify-between px-6 ${
                darkMode ? "border-slate-800" : "border-gray-200"
              } border-b`}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Dyser
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <div>
                <p
                  className={`px-4 text-xs font-semibold ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider mb-2`}
                >
                  Main
                </p>
                <div className="space-y-1">
                  {mainNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p
                  className={`px-4 text-xs font-semibold ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider mb-2`}
                >
                  Others
                </p>
                <div className="space-y-1">
                  {otherNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      onClick={() => setSidebarOpen(false)}
                    />
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile User Section */}
            <div
              className={`${
                darkMode ? "border-slate-800" : "border-gray-200"
              } border-t p-4`}
            >
              <button
                onClick={handleLogout}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium ${
                  darkMode
                    ? "text-red-400 hover:bg-red-900/30"
                    : "text-red-600 hover:bg-red-50"
                } rounded-lg`}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 min-h-screen">
        {/* Top Navbar */}
        <nav
          className={`sticky top-0 z-30 ${
            darkMode
              ? "bg-slate-800 border-slate-700 shadow-lg"
              : "bg-white border-gray-200 shadow-sm"
          } border-b`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left Section - Menu & Search */}
              <div className="flex items-center gap-4 flex-1">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden p-2 ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-slate-700"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  } rounded-lg transition`}
                >
                  <Menu className="h-6 w-6" />
                </button>

                {/* Search Bar */}
                <div className="hidden sm:flex flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Search..."
                      className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm transition ${
                        darkMode
                          ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                      } border`}
                    />
                  </div>
                </div>
              </div>

              {/* Right Section - Controls & Profile */}
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Search Icon (Mobile) */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`sm:hidden p-2 ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-slate-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  } rounded-lg transition`}
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Test Mode Toggle */}
                <div
                  className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border transition ${
                    darkMode
                      ? "bg-blue-900/30 border-blue-700/50"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        testMode ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        darkMode ? "text-blue-300" : "text-blue-700"
                      }`}
                    >
                      {testMode ? "Test Mode" : "Live"}
                    </span>
                  </div>
                  <button
                    onClick={() => setTestMode(!testMode)}
                    className={`ml-1 p-1 rounded transition ${
                      darkMode
                        ? "hover:bg-blue-800/50"
                        : "hover:bg-blue-100"
                    }`}
                  >
                    <Settings2
                      className={`w-4 h-4 ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Help Icon */}
                <button
                  className={`p-2 rounded-lg transition ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-slate-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNotificationsOpen(!notificationsOpen);
                    }}
                    className={`p-2 rounded-lg transition relative ${
                      darkMode
                        ? "text-gray-400 hover:text-white hover:bg-slate-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  </button>

                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-80 rounded-lg border shadow-lg overflow-hidden ${
                        darkMode
                          ? "bg-slate-800 border-slate-700"
                          : "bg-white border-gray-200"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className={`p-4 ${
                          darkMode
                            ? "border-slate-700 bg-slate-800"
                            : "border-gray-200 bg-white"
                        } border-b`}
                      >
                        <h3
                          className={`font-semibold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Notifications
                        </h3>
                      </div>
                      <div
                        className={`divide-y ${
                          darkMode ? "divide-slate-700" : "divide-gray-200"
                        } max-h-96 overflow-y-auto`}
                      >
                        <div
                          className={`p-4 transition cursor-pointer ${
                            darkMode
                              ? "hover:bg-slate-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            New transaction received
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            ₹250.00 from John Doe
                          </p>
                        </div>
                        <div
                          className={`p-4 transition cursor-pointer ${
                            darkMode
                              ? "hover:bg-slate-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            User verification completed
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            1 hour ago
                          </p>
                        </div>
                        <div
                          className={`p-4 transition cursor-pointer ${
                            darkMode
                              ? "hover:bg-slate-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <p
                            className={`text-sm font-medium ${
                              darkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            System update available
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            Please review the changes
                          </p>
                        </div>
                      </div>
                      <div
                        className={`p-3 border-t text-center ${
                          darkMode
                            ? "border-slate-700 bg-slate-800"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Settings Icon */}
                <button
                  className={`p-2 rounded-lg transition ${
                    darkMode
                      ? "text-gray-400 hover:text-white hover:bg-slate-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Settings2 className="w-5 h-5" />
                </button>

                {/* Dark Mode Toggle - FULLY FUNCTIONAL */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDarkMode();
                  }}
                  className={`p-2 rounded-lg transition ${
                    darkMode
                      ? "text-yellow-400 hover:bg-slate-700 bg-slate-700/50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileMenuOpen(!profileMenuOpen);
                    }}
                    className={`flex items-center gap-2 p-1 rounded-lg transition ${
                      darkMode
                        ? "hover:bg-slate-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-sm">
                      <span className="text-white font-bold text-xs">
                        {adminUser.name?.charAt(0) || "A"}
                      </span>
                    </div>
                    <span
                      className={`hidden sm:inline text-sm font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {adminUser.name || "Admin"}
                    </span>
                  </button>

                 {/* Profile Dropdown Menu */}
{profileMenuOpen && (
  <div
    className={`absolute right-0 mt-2 w-56 rounded-lg border shadow-lg overflow-hidden ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-gray-200"
    }`}
    onClick={(e) => e.stopPropagation()}
  >
    <div
      className={`p-4 ${
        darkMode
          ? "border-slate-700 bg-slate-800"
          : "border-gray-200 bg-white"
      } border-b`}
    >
      <p
        className={`text-sm font-semibold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {adminUser.name || "Admin"}
      </p>
      <p
        className={`text-xs mt-1 ${
          darkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {adminUser.email || "admin@example.com"}
      </p>
    </div>
    <div
      className={`divide-y ${
        darkMode ? "divide-slate-700" : "divide-gray-200"
      }`}
    >
      <Link
        to="/account-settings"
        onClick={() => setProfileMenuOpen(false)}
        className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-2 ${
          darkMode
            ? "text-gray-300 hover:bg-slate-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Settings className="w-4 h-4" />
        Account Settings
      </Link>
      <Link
        to="/help-support"
        onClick={() => setProfileMenuOpen(false)}
        className={`w-full text-left px-4 py-2.5 text-sm transition flex items-center gap-2 ${
          darkMode
            ? "text-gray-300 hover:bg-slate-700"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <HelpCircle className="w-4 h-4" />
        Help & Support
      </Link>
    </div>
    <div
      className={`p-2 ${
        darkMode
          ? "border-slate-700 bg-slate-800"
          : "border-gray-200 bg-white"
      } border-t`}
    >
      <button
        onClick={handleLogout}
        className={`w-full px-4 py-2.5 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2 ${
          darkMode
            ? "text-red-400 hover:bg-red-900/30"
            : "text-red-600 hover:bg-red-50"
        }`}
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  </div>
)}


                </div>
              </div>
            </div>

            {/* Mobile Search Bar */}
            {searchOpen && (
              <div className="mt-3 sm:hidden">
                <div className="relative">
                  <Search
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm transition border ${
                      darkMode
                        ? "bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Main Content Area */}
        <main
          className={`p-4 sm:p-6 lg:p-8 ${
            darkMode ? "bg-slate-950" : "bg-gray-50"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
