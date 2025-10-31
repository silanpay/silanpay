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

  // Dropdown data
  const productsDropdownSections = [
    {
      heading: "Payments",
      items: [
        { name: "UPI Payments", href: "/upi-payments" },
        { name: "Payment Links", href: "/payment-links" },
        { name: "QR Code Payments", href: "/qr" },
        { name: "Subscriptions & Recurring", href: "/subscriptions" },
        { name: "Invoices", href: "/invoices" },
        { name: "Smart Routing", href: "/smart-routing" },
      ],
    },
    {
      heading: "Payouts",
      items: [
        { name: "Bulk Payouts (UPI/IMPS/NEFT)", href: "/payouts" },
        { name: "Vendor/Partner Settlements", href: "/settlements" },
        { name: "Refunds", href: "/refunds" },
      ],
    },
    {
      heading: "Accounts",
      items: [
        { name: "Virtual Accounts", href: "/virtual-accounts" },
        { name: "Escrow/Split Payments", href: "/split-payments" },
        { name: "Wallets", href: "/wallet" },
      ],
    },
    {
      heading: "Risk & Compliance",
      items: [
        { name: "Fraud & Risk Engine", href: "/risk" },
        { name: "KYC/Onboarding", href: "/kyc" },
        { name: "Disputes/Chargebacks", href: "/disputes" },
      ],
    },
  ];

  // Icons based on item name (updated color to #228DCE)
  const getItemIcon = (name) => {
    const iconColor = "#228DCE";
    switch (name) {
      case "UPI Payments":
        return <CreditCard size={16} style={{ color: iconColor }} />;
      case "Payment Links":
        return <LinkIcon size={16} style={{ color: iconColor }} />;
      case "QR Code Payments":
        return <QrCode size={16} style={{ color: iconColor }} />;
      case "Subscriptions & Recurring":
        return <Repeat size={16} style={{ color: iconColor }} />;
      case "Invoices":
        return <FileText size={16} style={{ color: iconColor }} />;
      case "Smart Routing":
        return <Shuffle size={16} style={{ color: iconColor }} />;
      case "Bulk Payouts (UPI/IMPS/NEFT)":
        return <Send size={16} style={{ color: iconColor }} />;
      case "Vendor/Partner Settlements":
        return <Users size={16} style={{ color: iconColor }} />;
      case "Refunds":
        return <RotateCcw size={16} style={{ color: iconColor }} />;
      case "Virtual Accounts":
        return <Building2 size={16} style={{ color: iconColor }} />;
      case "Escrow/Split Payments":
        return <Scale size={16} style={{ color: iconColor }} />;
      case "Wallets":
        return <Wallet size={16} style={{ color: iconColor }} />;
      case "Fraud & Risk Engine":
        return <ShieldCheck size={16} style={{ color: iconColor }} />;
      case "KYC/Onboarding":
        return <UserCheck size={16} style={{ color: iconColor }} />;
      case "Disputes/Chargebacks":
        return <Scale size={16} style={{ color: iconColor }} />;
      default:
        return <Circle size={16} style={{ color: iconColor }} />;
    }
  };

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
          {/* ✅ Logo with Image + Text (Responsive & Animated) - CLOSER SPACING */}
          <Link to="/" className="flex items-center gap-0">
            <img
              src="/src/assets/splogo.png"
              alt="SilanPay logo"
              className="object-contain w-auto h-8 sm:h-10"
            />
            <div className="flex items-baseline text-lg font-bold sm:text-2xl">
              <span style={{ color: "#212439" }}>Silan</span>
              <span style={{ color: "#228DCE" }}>Pay</span>
            </div>
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-[720px]"
                        onMouseEnter={handleProductsEnter}
                        onMouseLeave={handleProductsLeave}
                      >
                        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
                          {productsDropdownSections.map((section) => (
                            <div key={section.heading}>
                              <div className="mb-3 text-sm font-semibold text-gray-600 uppercase">
                                {section.heading}
                              </div>
                              <ul className="space-y-2">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="flex items-center gap-2 px-2 py-1 text-gray-700 rounded-md hover:text-[#228DCE] hover:bg-gray-50"
                                    >
                                      {getItemIcon(item.name)}
                                      <span>{item.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ✅ Developers Dropdown */}
                    {link.name === "Developers" && isDevelopersDropdownOpen && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-[360px]"
                        onMouseEnter={handleDevelopersEnter}
                        onMouseLeave={handleDevelopersLeave}
                      >
                        <div className="p-6">
                          <div className="mb-3 text-sm font-semibold text-gray-600 uppercase">
                            Developer Tools
                          </div>
                          <ul className="space-y-2">
                            {["API & SDKs", "Webhooks", "Plugins (Shopify/WordPress/etc.)"].map((name) => (
                              <li key={name}>
                                <div className="block px-2 py-1 text-gray-700 rounded-md hover:text-[#228DCE] hover:bg-gray-50">
                                  {name}
                                </div>
                              </li>
                            ))}
                          </ul>
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

            {/* ✅ Mobile Navigation Links */}
            <div className="flex flex-col p-4 space-y-6">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.hasDropdown ? (
                    <div>
                      <div className="mb-2 font-semibold text-gray-900">{link.name}</div>
                      {link.name === "Products" && (
                        <div className="ml-2 space-y-5">
                          {productsDropdownSections.map((section) => (
                            <div key={section.heading}>
                              <div className="mb-2 text-sm font-semibold text-gray-600 uppercase">
                                {section.heading}
                              </div>
                              <ul className="space-y-2">
                                {section.items.map((item) => (
                                  <li key={item.name}>
                                    <Link
                                      to={item.href}
                                      className="flex items-center gap-2 text-gray-700 hover:text-[#228DCE]"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {getItemIcon(item.name)}
                                      <span>{item.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-900 hover:text-[#228DCE]"
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


