"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Critical application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#FAF7F2", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ textAlign: "center", maxWidth: 420 }}>
            <h1 style={{ fontSize: 28, fontWeight: 300, color: "#2F2F2F", marginBottom: 12 }}>
              We're experiencing technical difficulties
            </h1>
            <p style={{ fontSize: 15, color: "#6B6355", marginBottom: 28, lineHeight: 1.6 }}>
              Our team has been notified. Please try refreshing, or call us directly to place your order.
            </p>
            <button
              onClick={() => unstable_retry()}
              style={{
                padding: "12px 28px",
                borderRadius: 999,
                backgroundColor: "#B54E32",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
              }}
            >
              Reload
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
