import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  CreditCard,
  Repeat,
  Send,
  ShoppingCart,
  Wallet,
  Building2,
  Zap,
  Smartphone,
  Code,
  Package,
  FileText,
  ChevronDown,
  Clock,
} from "lucide-react";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.2 } },
};

// Toast notification variants
const toastVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isDevelopersDropdownOpen, setIsDevelopersDropdownOpen] =
    useState(false);

  // Mobile dropdown states
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileDevelopersOpen, setIsMobileDevelopersOpen] = useState(false);

  // Toast notification state
  const [showComingSoonToast, setShowComingSoonToast] = useState(false);

  const productsCloseTimerRef = useRef(null);
  const developersCloseTimerRef = useRef(null);

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

  // Show "Coming Soon" toast
  const handleComingSoon = (e) => {
    e.preventDefault();
    setShowComingSoonToast(true);
    setTimeout(() => {
      setShowComingSoonToast(false);
    }, 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = originalOverflow);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const productCards = [
    { name: "UPI", icon: CreditCard, href: "/upi-payments", comingSoon: false },
    {
      name: "Collection",
      icon: Repeat,
      href: "/collection-service",
      comingSoon: false,
    },
    { name: "Payout", icon: Send, href: "/payouts", comingSoon: false },
    {
      name: "Checkout",
      icon: ShoppingCart,
      href: "/smart-checkout",
      comingSoon: false,
    },
    { name: "Wallet", icon: Wallet, href: "/wallet", comingSoon: false },
    {
      name: "Gateway",
      icon: Building2,
      href: "/payment-gateway",
      comingSoon: false,
    },
    { name: "Sound Box", icon: Zap, href: "/sound-box", comingSoon: false }, // ✅ Now Active
    {
      name: "Mobile App",
      icon: Smartphone,
      href: "/mobile-app",
      comingSoon: true,
    }, // 🔥 Coming Soon
  ];

  const developerCards = [
    { name: "API & SDKs", icon: Code, href: "/api-sdks" },
    { name: "Webhooks", icon: Zap, href: "/webhooks" },
    { name: "Plugins", icon: Package, href: "/plugins" },
    { name: "Documentation", icon: FileText, href: "/documentation" },
  ];

  const navLinks = [
    { name: "Products", href: "#", hasDropdown: true },
    { name: "Developers", href: "#", hasDropdown: true },
  ];

  const headerBgClass = isScrolled
    ? "bg-white/90 shadow-md"
    : "bg-white/70 shadow-sm";

  // Product Card Component (handles coming soon)
  const ProductCard = ({ product, index, isMobile = false }) => {
    const IconComponent = product.icon;

    if (product.comingSoon) {
      return (
        <button
          onClick={handleComingSoon}
          className={`group flex flex-col items-center bg-white border-2 border-gray-200 rounded-xl p-3 h-28 justify-center transition-all duration-300 hover:bg-[#fff5e6] hover:border-[#ff9800] hover:shadow-md relative overflow-hidden ${
            isMobile
              ? "active:bg-[#fff5e6] active:border-[#ff9800] active:scale-95"
              : ""
          }`}
        >
          {/* "Coming Soon" Badge */}
          <div className="absolute top-1 right-1 bg-gradient-to-r from-[#ff9800] to-[#ff6b00] text-white text-[8px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            SOON
          </div>

          <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 bg-gradient-to-br from-[#fff5e6] to-[#ffe8cc] group-hover:scale-110 transition-transform">
            <IconComponent size={22} className="text-[#ff9800]" />
          </div>
          <p className="text-[11px] font-semibold text-center text-gray-800 group-hover:text-[#ff9800]">
            {product.name}
          </p>
        </button>
      );
    }

    return (
      <Link
        to={product.href}
        onClick={
          isMobile
            ? () => {
                setIsMobileMenuOpen(false);
                setIsMobileProductsOpen(false);
              }
            : undefined
        }
        className={`group flex flex-col items-center bg-white border border-gray-200 rounded-xl p-3 h-28 justify-center transition-all duration-300 hover:bg-[#e8f4fb] hover:border-[#228DCE] hover:shadow-md ${
          isMobile
            ? "border-2 active:bg-[#e8f4fb] active:border-[#228DCE] active:scale-95"
            : ""
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 bg-gradient-to-br from-[#e6f3ff] to-[#f5f9ff] group-hover:scale-110 transition-transform ${
            isMobile ? "group-active:scale-90" : ""
          }`}
        >
          <IconComponent size={22} className="text-[#228DCE]" />
        </div>
        <p
          className={`text-[11px] font-semibold text-center text-gray-800 group-hover:text-[#228DCE] ${
            isMobile ? "group-active:text-[#228DCE]" : ""
          }`}
        >
          {product.name}
        </p>
      </Link>
    );
  };

  return (
    <>
      <header
        className={`w-full sticky top-0 z-[1000] backdrop-blur-md border-b border-gray-200 ${headerBgClass}`}
      >
        <nav className="px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ✅ Logo */}
            <Link to="/" className="flex items-center gap-0">
              <img
                src="/silanpaylogo.png"
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
                      <button className="flex items-center space-x-1 text-gray-700 hover:text-[#228DCE] transition-colors duration-200">
                        <span>{link.name}</span>
                        <ChevronDown size={16} />
                      </button>

                      {/* 🟢 PRODUCTS DROPDOWN */}
                      <AnimatePresence>
                        {link.name === "Products" && isProductsDropdownOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-[70px] left-1/2 -translate-x-1/2 w-[720px] bg-[#f7faf9] rounded-2xl shadow-2xl border border-gray-200 z-[9999] overflow-hidden"
                            onMouseEnter={handleProductsEnter}
                            onMouseLeave={handleProductsLeave}
                          >
                            <div className="flex">
                              {/* Left Info */}
                              <div className="w-1/3 bg-[#edf6f3] p-5 border-r border-gray-200 flex flex-col justify-between">
                                <div>
                                  <h3 className="mb-3 text-base font-bold text-gray-900">
                                    Products
                                  </h3>
                                  <p className="text-sm leading-tight text-gray-600">
                                    Discover our payment solutions.
                                  </p>
                                </div>
                                <Link
                                  to="/products"
                                  className="mt-4 text-[#228DCE] font-semibold text-sm hover:underline"
                                >
                                  Know More →
                                </Link>
                              </div>

                              {/* Right Grid */}
                              <div className="w-2/3 p-5">
                                <div className="grid grid-cols-4 gap-3">
                                  {productCards.map((product, index) => (
                                    <ProductCard
                                      key={index}
                                      product={product}
                                      index={index}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 🟣 DEVELOPERS DROPDOWN */}
                      <AnimatePresence>
                        {link.name === "Developers" &&
                          isDevelopersDropdownOpen && (
                            <motion.div
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="fixed top-[70px] left-1/2 -translate-x-1/2 max-w-[580px] w-full bg-[#f7faf9] rounded-2xl shadow-2xl border border-gray-200 z-[9999]"
                              onMouseEnter={handleDevelopersEnter}
                              onMouseLeave={handleDevelopersLeave}
                            >
                              <div className="flex">
                                <div className="w-1/3 bg-[#edf6f3] p-5 border-r border-gray-200 flex flex-col justify-between">
                                  <div>
                                    <h3 className="mb-2 text-base font-bold text-gray-900">
                                      Developers
                                    </h3>
                                    <p className="text-sm leading-tight text-gray-600">
                                      Build & integrate faster.
                                    </p>
                                  </div>
                                  <Link
                                    to="/developers"
                                    className="mt-3 text-[#228DCE] font-semibold text-sm hover:underline"
                                  >
                                    Explore Docs →
                                  </Link>
                                </div>

                                {/* Right Grid */}
                                <div className="w-2/3 p-5 max-h-[300px] overflow-auto">
                                  <div className="grid grid-cols-2 gap-4">
                                    {developerCards.map((item, index) => (
                                      <Link
                                        key={index}
                                        to={item.href}
                                        className="group flex flex-col items-center bg-white border border-gray-200 rounded-xl p-3 h-24 justify-center transition-all duration-300 hover:bg-[#e8f4fb] hover:border-[#228DCE] hover:shadow-md"
                                      >
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1 bg-gradient-to-br from-[#e6f3ff] to-[#f5f9ff] group-hover:scale-110 transition-transform">
                                          <item.icon
                                            size={20}
                                            className="text-[#228DCE]"
                                          />
                                        </div>
                                        <p className="text-[11px] font-semibold text-center text-gray-800 group-hover:text-[#228DCE]">
                                          {item.name}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-700 hover:text-[#228DCE] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* ✅ Sign In & Sign Up Buttons */}
              <div className="flex items-center ml-4 space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 font-medium hover:text-[#228DCE] transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-[#228DCE] text-white font-semibold rounded-lg hover:bg-[#1a7ab8] transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* ✅ Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#228DCE] active:scale-90 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* ✅ Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="lg:hidden fixed inset-0 z-[9999] bg-white overflow-y-auto min-h-screen px-4 pb-8"
              >
                <div className="flex items-center justify-between pt-4 pb-6 border-b border-gray-200">
                  <span className="text-lg font-semibold text-gray-900">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-700 hover:text-[#228DCE] active:scale-90 transition-all duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-6 space-y-8"
                >
                  {/* Products Dropdown */}
                  <div>
                    <button
                      onClick={() =>
                        setIsMobileProductsOpen(!isMobileProductsOpen)
                      }
                      className="w-full flex items-center justify-between text-base font-bold text-gray-900 hover:text-[#228DCE] active:text-[#228DCE] active:scale-95 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#f0f9ff]"
                    >
                      Products
                      <ChevronDown
                        size={20}
                        className={`transform transition-transform duration-300 ${
                          isMobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobileProductsOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="grid grid-cols-2 gap-3 mt-4"
                        >
                          {productCards.map((product, index) => (
                            <ProductCard
                              key={index}
                              product={product}
                              index={index}
                              isMobile={true}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Developers Dropdown */}
                  <div>
                    <button
                      onClick={() =>
                        setIsMobileDevelopersOpen(!isMobileDevelopersOpen)
                      }
                      className="w-full flex items-center justify-between text-base font-bold text-gray-900 hover:text-[#228DCE] active:text-[#228DCE] active:scale-95 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#f0f9ff]"
                    >
                      Developers
                      <ChevronDown
                        size={20}
                        className={`transform transition-transform duration-300 ${
                          isMobileDevelopersOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobileDevelopersOpen && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="grid grid-cols-2 gap-3 mt-4"
                        >
                          {developerCards.map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsMobileDevelopersOpen(false);
                              }}
                              className="group flex flex-col items-center bg-[#f9fafb] border-2 border-gray-200 rounded-xl p-3 h-28 justify-center active:bg-[#e8f4fb] active:border-[#228DCE] active:scale-95 transition-all duration-200 hover:bg-[#f5f9fc] hover:border-[#228DCE]/50"
                            >
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 bg-gradient-to-br from-[#e6f3ff] to-[#f5f9ff] group-active:scale-90 group-hover:scale-105 transition-transform duration-200">
                                <item.icon
                                  size={22}
                                  className="text-[#228DCE]"
                                />
                              </div>
                              <p className="text-[11px] font-semibold text-gray-800 group-hover:text-[#228DCE] group-active:text-[#228DCE]">
                                {item.name}
                              </p>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About */}
                  <div>
                    <Link
                      to="/about-us"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-900 font-semibold hover:text-[#228DCE] active:text-[#228DCE] px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[#f0f9ff] active:bg-[#e8f4fb] active:scale-95"
                    >
                      About Us →
                    </Link>
                  </div>

                  {/* Sign In & Sign Up Buttons */}
                  <div className="pt-6 space-y-3 border-t border-gray-200">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-6 py-3 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-[#228DCE] hover:text-[#228DCE] active:scale-95 transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-6 py-3 bg-[#228DCE] text-white font-semibold rounded-lg hover:bg-[#1a7ab8] active:scale-95 transition-all duration-200 shadow-md"
                    >
                      Sign Up
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* 🔔 COMING SOON TOAST NOTIFICATION */}
      <AnimatePresence>
        {showComingSoonToast && (
          <motion.div
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 bg-gradient-to-r from-[#ff9800] to-[#ff6b00] text-white px-6 py-4 rounded-2xl shadow-2xl"
          >
            <Clock size={24} className="animate-pulse" />
            <div>
              <p className="text-sm font-bold">Coming Soon!</p>
              <p className="text-xs opacity-90">
                This feature will be available shortly
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
