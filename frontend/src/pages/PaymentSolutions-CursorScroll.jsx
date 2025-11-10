import { useRef, useEffect, useState } from "react";
import {
  QrCode,
  Smartphone,
  WalletIcon,
  Building2,
  ArrowLeftRight,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const PaymentSolutionsWithCursorScroll = () => {
  const paymentsRef = useRef(null);
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Smooth scroll function
  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 400; // pixels to scroll
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mouse down - start dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - (trackRef.current?.offsetLeft || 0));
    setScrollLeft(trackRef.current?.scrollLeft || 0);
    if (trackRef.current) {
      trackRef.current.style.cursor = "grabbing";
    }
  };

  // Mouse move - drag scroll
  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const x = e.pageX - (trackRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5; // 1.5 = scroll-fast multiplier

    if (trackRef.current) {
      trackRef.current.scrollLeft = scrollLeft - walk;
      trackRef.current.style.cursor = "grabbing";
    }
  };

  // Mouse up - stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
      checkScroll();
    }
  };

  // Mouse leave - stop dragging
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  };

  // Wheel scroll
  const handleWheel = (e) => {
    if (trackRef.current) {
      e.preventDefault();
      trackRef.current.scrollLeft += e.deltaY > 0 ? 100 : -100;
      checkScroll();
    }
  };

  // On scroll
  const handleScroll = () => {
    checkScroll();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("mousedown", handleMouseDown);
    track.addEventListener("mousemove", handleMouseMove);
    track.addEventListener("mouseup", handleMouseUp);
    track.addEventListener("mouseleave", handleMouseLeave);
    track.addEventListener("wheel", handleWheel, { passive: false });
    track.addEventListener("scroll", handleScroll);

    // Initial check
    checkScroll();

    return () => {
      track.removeEventListener("mousedown", handleMouseDown);
      track.removeEventListener("mousemove", handleMouseMove);
      track.removeEventListener("mouseup", handleMouseUp);
      track.removeEventListener("mouseleave", handleMouseLeave);
      track.removeEventListener("wheel", handleWheel);
      track.removeEventListener("scroll", handleScroll);
    };
  }, [isDragging, startX, scrollLeft]);

  const paymentMethods = [
    {
      name: "QR Code Payments",
      icon: QrCode,
      color: "bg-purple-50",
      description: "Scan & Pay in seconds",
      longDesc:
        "Enable instant payments through dynamic & static QR codes. Perfect for retail, restaurants, and service businesses.",
      tags: ["Dynamic QR", "Instant Scan", "Auto Reconcile"],
      tagColors: [
        "bg-blue-50 text-blue-600",
        "bg-green-50 text-green-600",
        "bg-purple-50 text-purple-600",
      ],
    },
    {
      name: "UPI",
      icon: Smartphone,
      color: "bg-cyan-50",
      description: "Direct bank transfers",
      longDesc:
        "Accept payments from any UPI app with instant confirmation. India's fastest-growing payment method.",
      tags: ["24/7 Available", "Instant Transfer", "Secure"],
      tagColors: [
        "bg-cyan-50 text-cyan-600",
        "bg-teal-50 text-teal-600",
        "bg-emerald-50 text-emerald-600",
      ],
    },
    {
      name: "Wallets",
      icon: WalletIcon,
      color: "bg-indigo-50",
      description: "Digital wallet convenience",
      longDesc:
        "Support all major digital wallets with seamless integration. Tap into the digital-first customer base.",
      tags: ["Multiple Wallets", "Fast Checkout", "Secure"],
      tagColors: [
        "bg-indigo-50 text-indigo-600",
        "bg-pink-50 text-pink-600",
        "bg-red-50 text-red-600",
      ],
    },
    {
      name: "Net Banking",
      icon: Building2,
      color: "bg-emerald-50",
      description: "Bank-grade security",
      longDesc:
        "Direct integration with 100+ banks for secure online transactions. Trusted by millions.",
      tags: ["100+ Banks", "Secure", "Verified"],
      tagColors: [
        "bg-emerald-50 text-emerald-600",
        "bg-green-50 text-green-600",
        "bg-teal-50 text-teal-600",
      ],
    },
    {
      name: "NEFT/RTGS",
      icon: ArrowLeftRight,
      color: "bg-yellow-50",
      description: "Large value transfers",
      longDesc:
        "Handle high-value transactions with enterprise-grade security. Perfect for B2B payments.",
      tags: ["High Value", "Secure Transfer", "B2B Ready"],
      tagColors: [
        "bg-yellow-50 text-yellow-600",
        "bg-amber-50 text-amber-600",
        "bg-orange-50 text-orange-600",
      ],
    },
    {
      name: "Cards",
      icon: CreditCard,
      color: "bg-pink-50",
      description: "Global payment acceptance",
      longDesc:
        "Accept credit & debit cards from all major networks. International payment ready.",
      tags: ["All Networks", "Global", "Instant"],
      tagColors: [
        "bg-pink-50 text-pink-600",
        "bg-rose-50 text-rose-600",
        "bg-red-50 text-red-600",
      ],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Comprehensive Payment Solutions
        </h2>
        <p className="mb-12 text-lg text-gray-600">
          Accept payments through 10+ methods including QR codes, UPI, cards,
          wallets, and more.
        </p>

        {/* Scroll Container */}
        <div ref={paymentsRef} className="relative mt-6 overflow-hidden group">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-0 md:opacity-70"
            title="Scroll Left"
          >
            <ChevronLeft size={24} className="text-[#228DCE]" />
          </button>

          {/* Track (Scrollable Container) */}
          <div
            ref={trackRef}
            className="relative overflow-x-auto overflow-y-hidden scroll-smooth"
            style={{
              scrollBehavior: "smooth",
              cursor: "grab",
            }}
          >
            <div className="flex items-stretch gap-8 px-6 py-8 will-change-transform min-w-min">
              {paymentMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className={`min-w-[320px] sm:min-w-[380px] md:min-w-[420px] lg:min-w-[480px] relative overflow-hidden transform transition-all duration-300 ease-out bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] ${method.color} p-8 lg:p-10 select-none`}
                    style={{ userSelect: "none" }}
                  >
                    <div className="flex flex-col h-full justify-between items-center min-h-[380px] text-center">
                      <div>
                        <div className="flex flex-col items-center space-y-6">
                          {/* Icon */}
                          <div
                            className="flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 rounded-2xl transform transition-transform hover:scale-110"
                            style={{
                              background: "linear-gradient(135deg,#228DCE 0%, #1a6fa8 100%)",
                            }}
                          >
                            <IconComponent className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                          </div>

                          {/* Title & Description */}
                          <div>
                            <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                              {method.name}
                            </div>
                            <div className="text-base lg:text-lg text-gray-500 font-medium">
                              {method.description}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="mt-10 space-y-6">
                          <div className="text-base lg:text-lg text-gray-700 leading-relaxed px-4">
                            {method.longDesc}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap justify-center gap-3">
                            {method.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className={`px-4 py-2 text-sm font-medium ${method.tagColors[tagIndex]} rounded-full transform transition-transform hover:scale-105 select-none`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-0 md:opacity-70"
            title="Scroll Right"
          >
            <ChevronRight size={24} className="text-[#228DCE]" />
          </button>

          {/* Hint Text */}
        </div>
      </div>

      {/* Hide scrollbar styling */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default PaymentSolutionsWithCursorScroll;