import React, { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { useLenisContext } from "../context/useLenisContext.js";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skill", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

function NavLinkItem({ item, onNavigate }) {
  const lineRef = useRef(null);

  const onEnter = useCallback(() => {
    if (lineRef.current) {
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.out" });
    }
  }, []);

  const onLeave = useCallback(() => {
    if (lineRef.current) {
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    }
  }, []);

  return (
    <li>
      <button
        type="button"
        className="nav-link-btn"
        onClick={() => onNavigate(item.id)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <span className="relative inline-block">
          {item.name}
          <span ref={lineRef} className="nav-underline" aria-hidden="true" />
        </span>
      </button>
    </li>
  );
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lenis, scrollToId } = useLenisContext();

  useEffect(() => {
    if (!lenis) return undefined;
    const off = lenis.on("scroll", (l) => {
      const next = l.scroll > 72;
      setScrolled((prev) => (prev === next ? prev : next));
    });
    return () => off();
  }, [lenis]);

  const navigate = useCallback(
    (id) => {
      scrollToId(id);
      setMenuOpen(false);
    },
    [scrollToId]
  );

  return (
    <nav
      id="navbar"
      className={`nav-shell ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="site-container flex justify-between items-center text-[#f5f0e8]">
        <p
          className="nav-logo cursor-pointer m-0"
          onClick={() => navigate("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate("home");
            }
          }}
        >
          Portfolio
        </p>

        <ul className="hidden md:flex gap-8 items-center list-none m-0 p-0">
          {links.map((item) => (
            <NavLinkItem key={item.id} item={item} onNavigate={navigate} />
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-[#7a7a7a] text-3xl bg-transparent border-0 p-0 cursor-pointer leading-none"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#242424] bg-[rgba(12,12,12,0.97)] backdrop-blur-[24px] flex flex-col items-center gap-3 py-5">
          {links.map((item) => (
            <button
              key={item.id}
              type="button"
              className="nav-mobile-btn"
              onClick={() => navigate(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
