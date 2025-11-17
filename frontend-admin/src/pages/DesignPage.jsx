import { Palette, Download, Eye, Code } from "lucide-react";

export default function DesignPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Design & Branding</h1>
        <p className="text-gray-600 mt-2">Customize your checkout experience</p>
      </div>

      {/* Color Scheme */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Brand Colors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Primary", color: "#3b82f6" },
            { name: "Secondary", color: "#10b981" },
            { name: "Accent", color: "#f59e0b" },
            { name: "Danger", color: "#ef4444" },
          ].map((item) => (
            <div key={item.name} className="text-center">
              <div
                className="w-full h-32 rounded-lg mb-2 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition"
                style={{ backgroundColor: item.color }}
              ></div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-600 font-mono">{item.color}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Logo & Assets */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Logo & Assets</h2>
        <div className="space-y-4">
          {[
            { name: "Logo (Light)", type: "PNG / SVG" },
            { name: "Logo (Dark)", type: "PNG / SVG" },
            { name: "Favicon", type: "ICO / PNG" },
            { name: "Email Header", type: "PNG / JPG" },
          ].map((asset) => (
            <div
              key={asset.name}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                <p className="text-xs text-gray-600">{asset.type}</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                Upload
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Page Preview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Checkout Preview
        </h2>
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 aspect-video flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Checkout</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          Custom CSS
        </h2>
        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
          placeholder="/* Add your custom CSS here */"
          defaultValue={`/* Custom Checkout Styles */
.checkout-button {
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
}

.checkout-input {
  border-radius: 8px;
  padding: 12px;
}`}
        ></textarea>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Save Changes
        </button>
      </div>
    </div>
  );
}
