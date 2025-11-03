import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  CreditCard,
  Link as LinkIcon,
  QrCode,
  Repeat,
  FileText,
  Shuffle,
  Send,
  Users,
  RotateCcw,
  Wallet,
  Building2,
  ShieldCheck,
  UserCheck,
  Scale,
  ChevronDown,
  Circle,
  TrendingUp,
  DollarSign,
  Smartphone,
  ShoppingCart,
  Zap,
  Code,
  Webhook,
  Package,
} from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isDevelopersDropdownOpen, setIsDevelopersDropdownOpen] = useState(false);
  const productsCloseTimerRef = useRef(null);
  const developersCloseTimerRef = useRef(null);

  // Hover logic for dropdowns
  const handleProductsEnter = () => {
    clearTimeout(productsCloseTimerRef.current);
    setIsProductsDropdownOpen(true);
  };
  const handleProductsLeave = () => {
    productsCloseTimerRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 150);
  };
  const handleDevelopersEnter = () => {
    clearTimeout(developersCloseTimerRef.current);
    setIsDevelopersDropdownOpen(true);
  };
  const handleDevelopersLeave = () => {
    developersCloseTimerRef.current = setTimeout(() => {
      setIsDevelopersDropdownOpen(false);
    }, 150);
  };

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = originalOverflow);
    }
  }, [isMobileMenuOpen]);

  // Sticky header shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Product cards data
  const productCards = [
    {
      name: "UPI",
      icon: CreditCard,
      href: "/upi-payments",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Collection",
      icon: Repeat,
      href: "/collection-service",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Payout",
      icon: Send,
      href: "/payouts",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Checkout",
      icon: ShoppingCart,
      href: "/smart-checkout",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Wallet",
      icon: Wallet,
      href: "/wallet",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Gateway",
      icon: Building2,
      href: "/payment-gateway",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Sound Box",
      icon: Zap,
      href: "/sound-box",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Mobile App",
      icon: Smartphone,
      href: "/mobile-app",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
  ];

  // Developer cards data - GRID LAYOUT
  const developerCards = [
    {
      name: "API & SDKs",
      icon: Code,
      href: "/api-sdks",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Webhooks",
      icon: Zap,
      href: "/webhooks",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Plugins",
      icon: Package,
      href: "/plugins",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
    {
      name: "Documentation",
      icon: FileText,
      href: "/documentation",
      bgColor: "#e8f4fb",
      iconColor: "#212439",
    },
  ];

  const navLinks = [
    { name: "Products", href: "#", hasDropdown: true },
    { name: "Developers", href: "#", hasDropdown: true },
    { name: "About Us", href: "/about-us", hasDropdown: false },
  ];

  const headerBgClass = isScrolled ? "bg-white/90 shadow-md" : "bg-white/70 shadow-sm";

  return (
    <header className={`w-full sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 ${headerBgClass}`}>
      <nav className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* ✅ Logo with Image + Text */}
          <Link to="/" className="flex items-center gap-0">
            <img
              src="/public/assets/silanpaylogo.png"
              alt="SilanPay logo"
              className="object-contain w-auto h-8 sm:h-10"
            />
          </Link>

          {/* ✅ Desktop Navigation */}
          <div className="items-center hidden space-x-8 lg:flex">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.hasDropdown ? (
                  <div
                    onMouseEnter={() => {
                      if (link.name === "Products") handleProductsEnter();
                      if (link.name === "Developers") handleDevelopersEnter();
                    }}
                    onMouseLeave={() => {
                      if (link.name === "Products") handleProductsLeave();
                      if (link.name === "Developers") handleDevelopersLeave();
                    }}
                  >
                    <button className="flex items-center space-x-1 text-gray-700 transition-colors duration-200 hover:text-[#228DCE]">
                      <span>{link.name}</span>
                      <ChevronDown size={16} />
                    </button>

                    {/* ✅ Products Dropdown */}
                    {link.name === "Products" && isProductsDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
                        style={{ width: "520px" }}
                        onMouseEnter={handleProductsEnter}
                        onMouseLeave={handleProductsLeave}
                      >
                        {/* Dropdown Container */}
                        <div className="p-8">
                          {/* Title */}
                          <div className="mb-6">
                            <h3 className="text-lg font-bold" style={{ color: "#212439" }}>
                              Products
                            </h3>
                          </div>

                          {/* Grid Layout - 4 Columns */}
                          <div className="grid grid-cols-4 gap-5">
                            {productCards.map((product, index) => (
                              <Link
                                key={index}
                                to={product.href}
                                className="group flex flex-col items-center"
                              >
                                <div
                                  className="w-full rounded-2xl p-5 h-40 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-2"
                                  style={{
                                    borderColor: "#228DCE",
                                    backgroundColor: "#f8f9fa",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#e8f4fb";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                                  }}
                                >
                                  {/* Icon Background */}
                                  <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all"
                                    style={{ backgroundColor: product.bgColor }}
                                  >
                                    <product.icon
                                      size={32}
                                      style={{ color: product.iconColor }}
                                    />
                                  </div>

                                  {/* Product Name */}
                                  <p className="text-sm font-semibold text-center" style={{ color: "#212439" }}>
                                    {product.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ✅ Developers Dropdown - GRID BOX LAYOUT */}
                    {link.name === "Developers" && isDevelopersDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50"
                        style={{ width: "520px" }}
                        onMouseEnter={handleDevelopersEnter}
                        onMouseLeave={handleDevelopersLeave}
                      >
                        {/* Dropdown Container */}
                        <div className="p-8">
                          {/* Title */}
                          <div className="mb-6">
                            <h3 className="text-lg font-bold" style={{ color: "#212439" }}>
                              Developer Tools
                            </h3>
                          </div>

                          {/* Grid Layout - 2 Columns */}
                          <div className="grid grid-cols-2 gap-5">
                            {developerCards.map((item, index) => (
                              <Link
                                key={index}
                                to={item.href}
                                className="group flex flex-col items-center"
                              >
                                <div
                                  className="w-full rounded-2xl p-5 h-40 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-2"
                                  style={{
                                    borderColor: "#228DCE",
                                    backgroundColor: "#f8f9fa",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#e8f4fb";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                                  }}
                                >
                                  {/* Icon Background */}
                                  <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all"
                                    style={{ backgroundColor: item.bgColor }}
                                  >
                                    <item.icon
                                      size={32}
                                      style={{ color: item.iconColor }}
                                    />
                                  </div>

                                  {/* Item Name */}
                                  <p className="text-sm font-semibold text-center" style={{ color: "#212439" }}>
                                    {item.name}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className="text-gray-700 transition-colors duration-200 hover:text-[#228DCE]"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 transition-colors duration-200 hover:text-[#228DCE]"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ✅ Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-[9999] bg-white overflow-y-auto min-h-screen">
            <div className="flex items-center justify-between px-4 pt-4 pb-8 border-b border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#228DCE]"
              >
                <X size={24} />
              </button>
            </div>

            {/* ✅ Mobile Navigation - Grid Layout */}
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <div className="mb-4 font-semibold text-gray-900 text-lg">{link.name}</div>

                      {link.name === "Products" && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {productCards.map((product, index) => (
                            <Link
                              key={index}
                              to={product.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="group"
                            >
                              <div
                                className="rounded-xl p-4 h-32 flex flex-col items-center justify-center transition-all border-2"
                                style={{
                                  borderColor: "#228DCE",
                                  backgroundColor: "#f8f9fa",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#e8f4fb";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                                }}
                              >
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                                  style={{ backgroundColor: product.bgColor }}
                                >
                                  <product.icon
                                    size={24}
                                    style={{ color: product.iconColor }}
                                  />
                                </div>
                                <p className="text-xs font-semibold text-center" style={{ color: "#212439" }}>
                                  {product.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {link.name === "Developers" && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {developerCards.map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="group"
                            >
                              <div
                                className="rounded-xl p-4 h-32 flex flex-col items-center justify-center transition-all border-2"
                                style={{
                                  borderColor: "#228DCE",
                                  backgroundColor: "#f8f9fa",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = "#e8f4fb";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                                }}
                              >
                                <div
                                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-2"
                                  style={{ backgroundColor: item.bgColor }}
                                >
                                  <item.icon
                                    size={24}
                                    style={{ color: item.iconColor }}
                                  />
                                </div>
                                <p className="text-xs font-semibold text-center" style={{ color: "#212439" }}>
                                  {item.name}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-900 hover:text-[#228DCE] block py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
