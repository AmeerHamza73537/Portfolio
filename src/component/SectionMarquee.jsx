import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const MARQUEE_TEXT =
  "FULL STACK ENGINEER · MERN STACK · PROBLEM SOLVER · OPEN TO WORK · ";

export default function SectionMarquee() {
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const tween = gsap.to(inner, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      className="marquee-wrap border-y border-[#242424] bg-[#0c0c0c] overflow-hidden select-none"
      aria-hidden="true"
    >
      <div ref={innerRef} className="marquee-inner flex w-max will-change-transform">
        <span className="marquee-text font-['DM_Sans',sans-serif] font-extrabold text-[clamp(2.5rem,12vw,5rem)] leading-none text-[#1c1c1c] whitespace-nowrap py-3 md:py-4 shrink-0">
          {MARQUEE_TEXT}
        </span>
        <span className="marquee-text font-['DM_Sans',sans-serif] font-extrabold text-[clamp(2.5rem,12vw,5rem)] leading-none text-[#1c1c1c] whitespace-nowrap py-3 md:py-4 shrink-0">
          {MARQUEE_TEXT}
        </span>
      </div>
    </div>
  );
}
