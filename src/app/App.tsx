import { useEffect, useRef } from "react";
import Frame48 from "@/imports/Frame156/index";

export default function App() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current) return;

    // Shimmer: add class when purple spans enter viewport
    const spans = frameRef.current.querySelectorAll<HTMLElement>(
      "span.text-\\[\\#7f317f\\]"
    );
    const shimmerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("llmd-shimmer");
          }
        });
      },
      { threshold: 0.5 }
    );
    spans.forEach((span) => shimmerObserver.observe(span));

    // Fade-up: add visible class when section blocks enter viewport
    const sections = frameRef.current.querySelectorAll<HTMLElement>(
      ".llmd-frame > div > div:nth-child(5) > div > div > div"
    );
    sections.forEach((el) => el.classList.add("llmd-fade-up"));

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("llmd-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((el) => fadeObserver.observe(el));

    return () => {
      shimmerObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        /* Background bands fill the full viewport width */
        .llmd-frame > div > div:nth-child(-n+3) {
          width: 100% !important;
          left: 0 !important;
          right: 0 !important;
        }

        /* Center the content column (Frame74 is the 5th child) */
        .llmd-frame > div > div:nth-child(5) {
          left: 50% !important;
          right: auto !important;
          transform: translateX(-50%);
        }

        /* Center the navbar inner content */
        .llmd-frame > div > div:nth-child(4) {
          left: 0 !important;
          right: 0 !important;
        }

        /* Filled purple buttons */
        div.bg-\\[\\#7f317f\\].rounded-\\[8px\\] {
          cursor: pointer;
          transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        div.bg-\\[\\#7f317f\\].rounded-\\[8px\\]:hover {
          background-color: #5e2460;
          transform: translateY(-2px);
        }

        /* Outlined button (Explore the performance data) */
        div.rounded-\\[8px\\][class*="px-"][class*="justify-center"]:not([class*="bg-"]) {
          cursor: pointer;
          transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        div.rounded-\\[8px\\][class*="px-"][class*="justify-center"]:not([class*="bg-"]):hover {
          background-color: rgba(127, 49, 127, 0.08);
          transform: translateY(-2px);
        }

        /* Card "Get started" text links */
        p.text-\\[\\#7f317f\\] {
          cursor: pointer;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        p.text-\\[\\#7f317f\\]:hover {
          color: #5e2460;
          text-decoration: none;
        }

        /* Release updates card — no hover (targeted by unique h-[519px]) */
        div.bg-\\[\\#f2f4f8\\].h-\\[519px\\] {
          cursor: default !important;
          transition: none !important;
        }
        div.bg-\\[\\#f2f4f8\\].h-\\[519px\\]:hover {
          background-color: #f2f4f8 !important;
        }

        /* Well-Lit path cards */
        div.bg-\\[\\#f2f4f8\\].rounded-\\[8px\\] {
          cursor: pointer;
          transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        div.bg-\\[\\#f2f4f8\\].rounded-\\[8px\\]:hover {
          background-color: #DDE1E6;
        }
        div.bg-\\[\\#f2f4f8\\].rounded-\\[8px\\]:hover > div.border-\\[\\#dde1e6\\] {
          border-color: #C1C7CD;
        }

        /* Hardware section card borders */
        div.aspect-\\[920\\/307\\] div.border-\\[\\#f2f4f8\\] {
          border-color: #4D5358 !important;
        }

        /* Stat cards: lift up 24px on hover */
        div.aspect-\\[3\\/4\\] {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        div.aspect-\\[3\\/4\\]:hover {
          transform: translateY(-24px);
        }

        /* Visible scrollbar on the release commit list.
           Note: do NOT set the standard 'scrollbar-width' property — when present,
           Chromium ignores ::-webkit-scrollbar and renders a thin overlay bar that
           macOS hides when idle. Relying on ::-webkit-scrollbar forces a persistent
           classic scrollbar that stays visible while content overflows. */
        .llmd-commit-scroll {
          scrollbar-gutter: stable;
        }
        .llmd-commit-scroll::-webkit-scrollbar {
          width: 8px;
          -webkit-appearance: none;
        }
        .llmd-commit-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .llmd-commit-scroll::-webkit-scrollbar-thumb {
          background: #c1c7cd;
          border-radius: 4px;
        }
        .llmd-commit-scroll::-webkit-scrollbar-thumb:hover {
          background: #a2a9b0;
        }

        /* Fade-up: hidden until in view */
        .llmd-fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .llmd-fade-up.llmd-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes llmd-shimmer {
          0% {
            background-position: 120% center;
            animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
          50% {
            background-position: -20% center;
            animation-timing-function: step-start;
          }
          50.01% {
            background-position: 120% center;
            animation-timing-function: linear;
          }
          100% {
            background-position: 120% center;
          }
        }

        .llmd-shimmer {
          background: linear-gradient(
            90deg,
            #7f317f 30%,
            #c078c0 50%,
            #7f317f 70%
          );
          background-size: 200% 100%;
          background-position: 120% center;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: llmd-shimmer 6s linear infinite;
        }
      `}</style>
      <div ref={frameRef} className="llmd-frame w-full min-h-[4400px] overflow-x-clip">
        <Frame48 />
      </div>
    </>
  );
}
