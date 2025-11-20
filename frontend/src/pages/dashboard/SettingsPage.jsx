import React, { useState } from "react";
import {
    User,
    Mail,
    Phone,
    Lock,
    Key,
    Bell,
    Shield,
    Save,
    Loader2,
    Check,
    X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [saving, setSaving] = useState(false);

    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [notifications, setNotifications] = useState({
        email: true,
        transactions: true,
        security: true,
        marketing: false,
    });

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "api", label: "API Keys", icon: Key },
    ];

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // TODO: Implement API call to update profile
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }

        setSaving(true);

        try {
            // TODO: Implement API call to change password
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Password changed successfully!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error("Failed to change password");
        } finally {
            setSaving(false);
        }
    };

    const handleToggleNotification = async (key) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
        toast.success("Notification preferences updated!");
    };

    const handleGenerateApiKey = () => {
        toast.success("API key generation feature coming soon!");
    };

    // Password strength meter
    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: "" };
        if (password.length < 6) return { strength: 25, label: "Weak", color: "bg-red-500" };
        if (password.length < 10) return { strength: 50, label: "Fair", color: "bg-yellow-500" };
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { strength: 75, label: "Good", color: "bg-blue-500" };
        return { strength: 100, label: "Strong", color: "bg-emerald-500" };
    };

    const passwordStrength = getPasswordStrength(passwordData.newPassword);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                    ? "border-emerald-600 text-emerald-600"
                                    : "border-transparent text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                {activeTab === "profile" && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Profile Information
                        </h3>

                        <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, name: e.target.value })
                                        }
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, email: e.target.value })
                                        }
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) =>
                                            setProfileData({ ...profileData, phone: e.target.value })
                                        }
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Security Settings
                        </h3>

                        <form onSubmit={handleChangePassword} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <Lock className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                        }
                                        placeholder="Enter current password"
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <Lock className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                                        }
                                        placeholder="Enter new password"
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
                                    />
                                </div>
                                {passwordData.newPassword && (
                                    <div className="mt-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-600">Password strength:</span>
                                            <span className={`text-xs font-medium ${passwordStrength.strength === 100 ? 'text-emerald-600' :
                                                    passwordStrength.strength >= 75 ? 'text-blue-600' :
                                                        passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`${passwordStrength.color} h-2 rounded-full transition-all`}
                                                style={{ width: `${passwordStrength.strength}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-transparent">
                                    <Lock className="w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                                        }
                                        placeholder="Confirm new password"
                                        className="flex-1 bg-transparent text-sm text-gray-900 focus:outline-none placeholder-gray-400"
                                    />
                                    {passwordData.confirmPassword && (
                                        <div>
                                            {passwordData.newPassword === passwordData.confirmPassword ? (
                                                <Check className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <X className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <h4 className="text-sm font-medium text-blue-900 mb-1">
                                    Two-Factor Authentication
                                </h4>
                                <p className="text-xs text-blue-700 mb-3">
                                    Add an extra layer of security to your account
                                </p>
                                <button
                                    type="button"
                                    onClick={() => toast.success("2FA setup coming soon!")}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Enable 2FA →
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Update Password
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Notification Preferences
                        </h3>

                        <div className="space-y-4">
                            {[
                                { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
                                { key: "transactions", label: "Transaction Alerts", desc: "Get notified of all transactions" },
                                { key: "security", label: "Security Alerts", desc: "Important account security updates" },
                                { key: "marketing", label: "Marketing Emails", desc: "Promotional content and offers" },
                            ].map((item) => (
                                <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                        <p className="text-xs text-gray-600">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={notifications[item.key]}
                                            onChange={() => handleToggleNotification(item.key)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "api" && (
                    <div className="p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">API Keys</h3>

                        <div className="space-y-4">
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm font-medium text-gray-900">Production API Key</p>
                                    <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                                        Active
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-gray-300 rounded">
                                        sk_live_xxxxxxxxxxxxxxxxxxxx
                                    </code>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText("sk_live_xxxxxxxxxxxxxxxxxxxx");
                                            toast.success("API key copied!");
                                        }}
                                        className="px-3 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleGenerateApiKey}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
                            >
                                <Key className="w-4 h-4" />
                                Generate New Key
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
