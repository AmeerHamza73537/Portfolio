import { useEffect, useState } from "react";
import React from "react";
export default function Cursor() {
  const [dotPos, setDotPos] = useState({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Cursor position update
  useEffect(() => {
    const moveHandler = (e) => {
      setDotPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  // Smooth trailing for circle
  useEffect(() => {
    const follow = () => {
      setCirclePos((prev) => ({
        x: prev.x + (dotPos.x - prev.x) * 0.1,
        y: prev.y + (dotPos.y - prev.y) * 0.1,
      }));
      requestAnimationFrame(follow);
    };
    follow();
  }, [dotPos]);

  // Detect hover on links & buttons
  useEffect(() => {
    const targets = document.querySelectorAll("a, button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => setHovering(true));
      el.addEventListener("mouseleave", () => setHovering(false));
    });
  }, []);

  return (
    <>
      {/* Small Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999]"
        style={{ transform: `translate(${dotPos.x}px, ${dotPos.y}px)` }}
      />

      {/* Big Circle */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          hovering ? "w-16 h-16 bg-purple-500/30" : "w-10 h-10 bg-purple-500/20"
        }`}
        style={{
          transform: `translate(${circlePos.x - 20}px, ${circlePos.y - 20}px)`,
        }}
      />
    </>
  );
}
