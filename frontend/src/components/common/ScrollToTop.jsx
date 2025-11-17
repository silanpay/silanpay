import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const BRAND_BLUE = "#228DCE";
const BRAND_BLUE_HOVER = "#1a6fa8";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed z-50 p-3 text-white transition-all duration-300 rounded-full shadow-lg bottom-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: BRAND_BLUE,
            boxShadow: `0 10px 25px rgba(34, 141, 206, 0.3)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = BRAND_BLUE_HOVER;
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = BRAND_BLUE;
            e.currentTarget.style.transform = "scale(1)";
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
