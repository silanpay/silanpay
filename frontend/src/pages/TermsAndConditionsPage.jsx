import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const TermsAndConditionsPage = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try direct path first, then URL-encoded fallback
    fetch("/Terms & Condition.txt")
      .then((res) => {
        if (!res.ok) throw new Error("direct path failed");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        fetch("/Terms%20%26%20Condition.txt")
          .then((res2) => {
            if (!res2.ok)
              throw new Error(`Failed to load terms (${res2.status})`);
            return res2.text();
          })
          .then((text2) => {
            setContent(text2);
            setLoading(false);
          })
          .catch((e) => {
            setError(
              e instanceof Error ? e.message : "Unable to load content."
            );
            setLoading(false);
          });
      });
  }, []);

  // Simple inline markdown emphasis parser for **bold**, *italic*, etc.
  const parseInline = (text) => {
    const nodes = [];
    const regex = /(\*\*([^*]+)\*\*)|(__([^_]+)__)|(\*([^*]+)\*)|(_([^_]+)_)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      if (start > lastIndex) {
        nodes.push(text.slice(lastIndex, start));
      }
      if (match[1] || match[3]) {
        const val = match[2] || match[4] || "";
        nodes.push(<strong key={`b-${start}`}>{val}</strong>);
      } else if (match[5] || match[7]) {
        const val = match[6] || match[8] || "";
        nodes.push(<em key={`i-${start}`}>{val}</em>);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }

    return nodes;
  };

  const rendered = useMemo(() => {
    if (!content) return null;

    const lines = content.split(/\r?\n/);
    const elements = [];
    let inUl = false;
    let inOl = false;
    let ulItems = [];
    let olItems = [];
    let paragraphBuffer = [];

    const flushLists = () => {
      if (inUl) {
        elements.push(
          <ul
            className="pl-6 space-y-2 list-disc"
            key={`ul-${elements.length}`}
          >
            {ulItems.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        );
      }
      if (inOl) {
        elements.push(
          <ol
            className="pl-6 space-y-2 list-decimal"
            key={`ol-${elements.length}`}
          >
            {olItems.map((item, idx) => (
              <li key={idx} className="text-gray-700">
                {item}
              </li>
            ))}
          </ol>
        );
      }
    };

    const flushParagraph = (idxKey) => {
      if (paragraphBuffer.length > 0) {
        const joined = paragraphBuffer.join(" ").replace(/\s+/g, " ");
        elements.push(
          <p className="leading-7 text-gray-700 text-base" key={`p-${idxKey}`}>
            {parseInline(joined)}
          </p>
        );
        paragraphBuffer = [];
      }
    };

    lines.forEach((raw, idx) => {
      const line = raw;

      // Headings
      const h1 = line.match(/^#\s+(.+)/);
      const h2 = line.match(/^##\s+(.+)/);
      const h3 = line.match(/^###\s+(.+)/);
      if (h1 || h2 || h3) {
        if (inUl || inOl) {
          flushLists();
          inUl = false;
          inOl = false;
          ulItems = [];
          olItems = [];
        }
        flushParagraph(idx);
        const headingMatch = h1 || h2 || h3;
        const title = headingMatch ? headingMatch[1] : "";
        const id = title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");

        if (h1) {
          elements.push(
            <div
              className="flex items-center gap-3 mt-2 mb-6"
              key={`h1-${idx}`}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: "#228DCE" }}
              >
                {idx + 1}
              </div>
              <h1
                id={id}
                className="text-3xl font-bold md:text-4xl"
                style={{ color: "#212439" }}
              >
                {parseInline(title)}
              </h1>
            </div>
          );
        } else if (h2) {
          elements.push(
            <h2
              id={id}
              className="mt-8 mb-4 text-2xl font-semibold flex items-center gap-3"
              style={{ color: "#212439" }}
              key={`h2-${idx}`}
            >
              <div
                className="w-8 h-0.5"
                style={{ backgroundColor: "#228DCE" }}
              ></div>
              {parseInline(title)}
            </h2>
          );
        } else if (h3) {
          elements.push(
            <h3
              id={id}
              className="mt-6 mb-3 text-xl font-semibold"
              style={{ color: "#212439" }}
              key={`h3-${idx}`}
            >
              {parseInline(title)}
            </h3>
          );
        }
        return;
      }

      // Unordered list item
      if (/^\-\s+/.test(line)) {
        flushParagraph(idx);
        if (!inUl) {
          if (inOl) {
            flushLists();
            inOl = false;
            olItems = [];
          }
          inUl = true;
        }
        ulItems.push(
          <span key={`li-${idx}`}>
            {parseInline(line.replace(/^\-\s+/, ""))}
          </span>
        );
        return;
      }

      // Ordered list item
      if (/^\d+\.\s+/.test(line)) {
        flushParagraph(idx);
        if (!inOl) {
          if (inUl) {
            flushLists();
            inUl = false;
            ulItems = [];
          }
          inOl = true;
        }
        olItems.push(
          <span key={`oli-${idx}`}>
            {parseInline(line.replace(/^\d+\.\s+/, ""))}
          </span>
        );
        return;
      }

      // Blank line
      if (line.trim() === "") {
        if (inUl || inOl) {
          flushLists();
          inUl = false;
          inOl = false;
          ulItems = [];
          olItems = [];
        }
        flushParagraph(idx);
        elements.push(<div className="h-4" key={`sp-${idx}`} />);
        return;
      }

      // Normal paragraph
      paragraphBuffer.push(line.trim());
    });

    if (inUl || inOl) flushLists();
    flushParagraph(lines.length + 1);

    return <article className="space-y-4">{elements}</article>;
  }, [content]);

  return (
    <div className="min-h-screen text-gray-900 bg-white font-outfit">
      <Header />

      <section className="py-12 bg-white">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <div
              className="inline-block px-6 py-2 mb-4 text-sm font-semibold text-white rounded-full"
              style={{ backgroundColor: "#228DCE" }}
            >
              Legal Agreement
            </div>
            <h1
              className="mb-4 text-4xl font-bold"
              style={{ color: "#212439" }}
            >
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600">
              Silan Software Private Limited
            </p>
          </div>

          {/* Content Container */}
          <div
            className="p-8 bg-white border-2 shadow-lg rounded-2xl"
            style={{ borderColor: "#228DCE" }}
          >
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">Loading terms...</p>
              </div>
            )}
            {error && (
              <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 font-semibold">Error: {error}</p>
              </div>
            )}
            {!loading && !error && rendered && (
              <div
                className="prose prose-sm max-w-none"
                style={{ color: "#374151" }}
              >
                {rendered}
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div
            className="p-6 mt-8 text-center border-2 rounded-2xl"
            style={{ borderColor: "#228DCE", backgroundColor: "#f8f9fa" }}
          >
            <p className="text-sm text-gray-600">
              For any questions regarding these Terms & Conditions, please
              contact us at{" "}
              <a
                href="mailto:info@silanpay.com"
                className="font-semibold transition-colors hover:underline"
                style={{ color: "#228DCE" }}
              >
                info@silanpay.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />

      {/* ===== SCROLL TO TOP BUTTON ===== */}
      <ScrollToTop />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
        }
      `}</style>
    </div>
  );
};

export default TermsAndConditionsPage;
