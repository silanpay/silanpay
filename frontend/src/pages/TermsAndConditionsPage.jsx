import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";

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
          <ul className="pl-6 space-y-1 list-disc" key={`ul-${elements.length}`}>
            {ulItems}
          </ul>
        );
      }
      if (inOl) {
        elements.push(
          <ol
            className="pl-6 space-y-1 list-decimal"
            key={`ol-${elements.length}`}
          >
            {olItems}
          </ol>
        );
      }
    };

    const flushParagraph = (idxKey) => {
      if (paragraphBuffer.length > 0) {
        const joined = paragraphBuffer.join(" ").replace(/\s+/g, " ");
        elements.push(
          <p className="leading-7 text-gray-800" key={`p-${idxKey}`}>
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
            <h1
              id={id}
              className="mt-2 mb-4 text-3xl font-bold md:text-4xl"
              key={`h1-${idx}`}
            >
              {parseInline(title)}
            </h1>
          );
        } else if (h2) {
          elements.push(
            <h2
              id={id}
              className="mt-8 mb-3 text-2xl font-semibold"
              key={`h2-${idx}`}
            >
              {parseInline(title)}
            </h2>
          );
        } else if (h3) {
          elements.push(
            <h3
              id={id}
              className="mt-6 mb-2 text-xl font-semibold"
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
          <li key={`li-${idx}`}>{parseInline(line.replace(/^\-\s+/, ""))}</li>
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
          <li key={`oli-${idx}`}>
            {parseInline(line.replace(/^\d+\.\s+/, ""))}
          </li>
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
        elements.push(<div className="h-2" key={`sp-${idx}`} />);
        return;
      }

      // Normal paragraph
      paragraphBuffer.push(line.trim());
    });

    if (inUl || inOl) flushLists();
    flushParagraph(lines.length + 1);

    return <article className="space-y-2">{elements}</article>;
  }, [content]);

  return (
    <div className="min-h-screen text-gray-900 bg-white font-outfit">
      <Header />
      <section className="py-12 bg-white">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">
              Terms & Conditions
            </h1>
          </header>

          <div className="w-full p-6 bg-white border border-gray-100 shadow-lg rounded-2xl md:p-8">
            {loading && <p className="text-gray-600">Loading terms...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && rendered}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditionsPage;
