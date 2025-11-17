import { useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ShoppingCart,
  TrendingUp,
  Star,
} from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const products = [
    {
      id: 1,
      name: "Starter Package",
      category: "Subscription",
      description: "Basic payment processing for small businesses",
      price: 99,
      billing: "monthly",
      users: 10,
      features: 15,
      rating: 4.8,
      sales: 324,
      status: "active",
    },
    {
      id: 2,
      name: "Professional Plan",
      category: "Subscription",
      description: "Advanced features for growing businesses",
      price: 299,
      billing: "monthly",
      users: 50,
      features: 35,
      rating: 4.9,
      sales: 512,
      status: "active",
    },
    {
      id: 3,
      name: "Enterprise Solution",
      category: "Enterprise",
      description: "Custom payment solutions for enterprise clients",
      price: 1999,
      billing: "monthly",
      users: "Unlimited",
      features: "All",
      rating: 5.0,
      sales: 89,
      status: "active",
    },
    {
      id: 4,
      name: "API Access",
      category: "Add-on",
      description: "REST API access for custom integrations",
      price: 199,
      billing: "monthly",
      users: "Unlimited",
      features: 20,
      rating: 4.7,
      sales: 156,
      status: "active",
    },
    {
      id: 5,
      name: "White Label Solution",
      category: "Enterprise",
      description: "Fully customizable white label payment platform",
      price: 4999,
      billing: "monthly",
      users: "Unlimited",
      features: "All",
      rating: 4.9,
      sales: 12,
      status: "active",
    },
    {
      id: 6,
      name: "Support Package",
      category: "Add-on",
      description: "24/7 premium support and onboarding",
      price: 499,
      billing: "monthly",
      users: "Unlimited",
      features: 5,
      rating: 4.6,
      sales: 98,
      status: "inactive",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          <p className="text-gray-600 mt-2">Manage your products and services</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                  {product.status === "inactive" && (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {product.name}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-gray-900">
                  {product.rating}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            {/* Price */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price}
                </span>
                <span className="text-sm text-gray-600">
                  /{product.billing}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  USERS
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {product.users}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 font-semibold mb-1">
                  SALES
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-lg font-bold text-gray-900">
                    {product.sales}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium flex items-center justify-center gap-1">
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
