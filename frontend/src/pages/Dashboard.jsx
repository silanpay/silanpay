import React, { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  CreditCard,
  DollarSign,
  Home,
  Layers,
  LogOut,
  Mail,
  PieChart,
  Search,
  Settings,
  Target,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { label: "Overview", icon: Home, id: "overview" },
  { label: "Analytics", icon: BarChart3, id: "analytics" },
  { label: "Cards", icon: Layers, id: "cards" },
  { label: "Transactions", icon: PieChart, id: "transactions" },
  { label: "Settings", icon: Settings, id: "settings" },
];

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef({});

  const insightCards = [
    {
      label: "Total Balance",
      value: "₹82,62,000",
      delta: "+8% vs last month",
      accent: "from-indigo-500 to-indigo-600",
      icon: DollarSign,
    },
    {
      label: "Total Spending",
      value: "₹54,87,000",
      delta: "-2% vs last month",
      accent: "from-amber-500 to-amber-600",
      icon: PieChart,
    },
    {
      label: "Active Goals",
      value: "06",
      delta: "3 milestones this week",
      accent: "from-emerald-500 to-emerald-600",
      icon: Target,
    },
  ];

  const cards = [
    {
      type: "Master Card",
      currency: "₹",
      balance: "28,57,200",
      label: "Domestic",
      status: "Active",
      last4: "2879",
    },
    {
      type: "Credit Card",
      currency: "₹",
      balance: "12,14,800",
      label: "Forex",
      status: "Disabled",
      last4: "1034",
    },
    {
      type: "Business Card",
      currency: "₹",
      balance: "58,62,900",
      label: "Corporate",
      status: "Active",
      last4: "5621",
    },
  ];

  const transactions = [
    {
      id: "DE254839",
      customer: "Esther Howard",
      email: "howard@gmail.com",
      date: "28 Dec 2025",
      amount: "₹5,82,479.00",
      stage: "Success",
    },
    {
      id: "DE254840",
      customer: "Kristin Watson",
      email: "watson@gmail.com",
      date: "14 Feb 2025",
      amount: "₹2,35,241.00",
      stage: "Pending",
    },
  ];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  const monitoringData = {
    earnings: [22, 28, 35, 30, 40, 32, 44, 38, 48],
    expenses: [18, 24, 30, 28, 20, 25, 31, 29, 33],
  };

  const maxValue = Math.max(...monitoringData.earnings, ...monitoringData.expenses);
  const getPath = (values) =>
    values
      .map((value, index) => {
        const x = (index / (values.length - 1)) * 100;
        const y = 100 - (value / maxValue) * 100;
        return `${index === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    NAV_ITEMS.forEach((item) => {
      const node = sectionRefs.current[item.id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const node = sectionRefs.current[id];
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100">
      <div className="flex w-full gap-6 px-4 py-6 lg:px-10">
        {/* Sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 flex-shrink-0 rounded-3xl bg-slate-900/70 p-6 shadow-2xl shadow-indigo-900/30 lg:block">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center justify-center w-12 h-12 text-lg font-semibold text-white rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-500">
              SP
            </div>
            <div>
              <p className="text-xs tracking-wide uppercase text-slate-400">
                Silan Pay
              </p>
              <p className="text-lg font-semibold text-white">Finance OS</p>
            </div>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.id)}
                className={`flex w-full items-center justify-between rounded-3xl px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === item.id
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="p-4 mt-10 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-sm font-semibold text-white">Upgrade Pro</p>
            <p className="mt-1 text-xs text-indigo-100">
              Unlock reminders, AI budgeting and personalised alerts.
            </p>
            <button className="w-full px-4 py-2 mt-4 text-sm font-semibold text-indigo-900 bg-white rounded-2xl">
              Get Pro
            </button>
          </div>

          <button
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 mt-8 text-sm font-medium transition border text-rose-300 rounded-3xl border-white/10 hover:bg-rose-500/10"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 space-y-10">
          {/* Top bar */}
          <header className="flex flex-col gap-4 p-6 border rounded-3xl border-white/5 bg-white/5 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-300">Financial Command Center</p>
              <h1 className="text-2xl font-semibold text-white">
                Hey welcome back, {user?.name ?? "Eleanor"} 👋
              </h1>
            </div>
            <div className="flex items-center flex-1 gap-3 lg:max-w-md">
              <div className="flex items-center flex-1 gap-2 px-4 py-2 border rounded-3xl border-white/10">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  placeholder="Search anything here..."
                  className="w-full text-sm bg-transparent text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
              </div>
              <button className="p-3 transition border rounded-3xl border-white/10 text-slate-200 hover:bg-white/10">
                <Bell className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center w-12 h-12 text-lg font-semibold text-white rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600">
                {user?.name?.[0] ?? "E"}
              </div>
            </div>
          </header>

          {/* Insight cards */}
          <section
            id="overview"
            ref={(el) => {
              sectionRefs.current.overview = el;
            }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {insightCards.map((card) => (
              <div
                key={card.label}
                className="p-6 border shadow-2xl rounded-3xl border-white/5 bg-slate-900/60 backdrop-blur shadow-indigo-900/30"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${card.accent} p-3 text-white`}
                  >
                    <card.icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="mt-4 text-3xl font-semibold text-white">
                  {card.value}
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-400">
                  {card.delta}
                </p>
              </div>
            ))}
          </section>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* Monitoring chart */}
            <section
              id="analytics"
              ref={(el) => {
                sectionRefs.current.analytics = el;
              }}
              className="p-6 border shadow-2xl rounded-3xl border-white/5 bg-slate-900/60 backdrop-blur shadow-indigo-900/30 xl:col-span-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Monitoring Overview</p>
                  <p className="text-xs text-slate-500">Earning & Expenses</p>
                </div>
                <button className="px-3 py-1 text-xs font-medium border rounded-3xl border-white/10 text-slate-200">
                  Monthly
                </button>
              </div>

              <div className="mt-6">
                <div className="flex gap-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-indigo-300">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                    Earning
                  </span>
                  <span className="flex items-center gap-1 text-rose-300">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Expenses
                  </span>
                </div>
              </div>

              <div className="p-6 mt-6 border rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-white/5">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="w-full h-52"
                >
                  <path
                    d={getPath(monitoringData.expenses)}
                    fill="none"
                    strokeWidth="2"
                    stroke="rgba(248,113,113,0.6)"
                  />
                  <path
                    d={getPath(monitoringData.earnings)}
                    fill="none"
                    strokeWidth="2.5"
                    stroke="rgba(79,70,229,0.9)"
                  />
                </svg>
                <div className="flex justify-between mt-4 text-xs text-slate-500">
                  {months.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Cards */}
            <section
              id="cards"
              ref={(el) => {
                sectionRefs.current.cards = el;
              }}
              className="p-6 space-y-4 border shadow-2xl rounded-3xl border-white/5 bg-slate-900/60 backdrop-blur shadow-indigo-900/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">My Cards</p>
                <button className="px-4 py-2 text-xs font-semibold text-white bg-indigo-500 rounded-3xl shadow-indigo-900/40">
                  Add New Card
                </button>
              </div>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.type}
                    className="rounded-3xl border border-white/5 bg-white/[0.03] p-4 shadow-inner shadow-black/20"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <p className="text-lg font-semibold text-white">
                        {card.currency} {card.balance}
                      </p>
                      <span
                        className={`text-xs font-medium ${
                          card.status === "Active"
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{card.label}</p>
                    <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
                      <div className="flex items-center gap-2 text-slate-300">
                        <CreditCard className="w-4 h-4" />
                        {card.type}
                      </div>
                      <p>•••• {card.last4}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Recent transactions */}
          <section
            id="transactions"
            ref={(el) => {
              sectionRefs.current.transactions = el;
            }}
            className="p-6 border shadow-2xl rounded-3xl border-white/5 bg-slate-900/60 backdrop-blur shadow-indigo-900/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Recent Transaction
                </p>
                <p className="text-xs text-slate-500">
                  Monitoring your latest financial activity
                </p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-4 py-2 border rounded-3xl border-white/10">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    placeholder="Search..."
                    className="w-32 text-sm bg-transparent text-slate-200 placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button className="px-4 py-2 text-xs font-medium border rounded-3xl border-white/10 text-slate-200">
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-500">
                    <th className="py-3 font-medium">Deal ID</th>
                    <th className="py-3 font-medium">Customer Name</th>
                    <th className="py-3 font-medium">Customer Email</th>
                    <th className="py-3 font-medium">Date</th>
                    <th className="py-3 font-medium">Amount</th>
                    <th className="py-3 font-medium">Deal Stage</th>
                    <th className="py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-slate-200">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-t border-white/5">
                      <td className="py-4">{tx.id}</td>
                      <td className="py-4">{tx.customer}</td>
                      <td className="py-4">{tx.email}</td>
                      <td className="py-4">{tx.date}</td>
                      <td className="py-4">{tx.amount}</td>
                      <td className="py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            tx.stage === "Success"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-amber-500/20 text-amber-300"
                          }`}
                        >
                          {tx.stage}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="px-3 py-1 text-xs border rounded-full border-white/10 text-slate-300">
                          ...
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section
            id="settings"
            ref={(el) => {
              sectionRefs.current.settings = el;
            }}
            className="p-6 text-center border border-dashed rounded-3xl border-white/10 text-slate-400"
          >
            Settings panel coming soon.
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
