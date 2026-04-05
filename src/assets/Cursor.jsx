import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);
  const xTo = useRef(null);
  const yTo = useRef(null);
  const fxTo = useRef(null);
  const fyTo = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const touch = "ontouchstart" in window;
    setEnabled(fine && !touch);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const follower = followerRef.current;
    if (!dot || !follower) return undefined;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    xTo.current = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    yTo.current = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    fxTo.current = gsap.quickTo(follower, "x", { duration: 0.5, ease: "power3.out" });
    fyTo.current = gsap.quickTo(follower, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
      fxTo.current(e.clientX);
      fyTo.current(e.clientY);
    };

    const onEnter = () => {
      follower.classList.add("is-hover");
      gsap.to(follower, { scale: 2, duration: 0.35, ease: "power2.out" });
    };

    const onLeave = () => {
      follower.classList.remove("is-hover");
      gsap.to(follower, { scale: 1, duration: 0.35, ease: "power2.out" });
    };

    window.addEventListener("mousemove", move);

    const interactive = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
}
