import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "./lenisContext.js";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();
  const [lenisInst, setLenisInst] = useState(null);

  const scrollToId = useCallback((id, offset = -90) => {
    const el = document.getElementById(id);
    const lenis = lenisRef.current;
    if (el && lenis) {
      lenis.scrollTo(el, { offset, lerp: 0.12 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const api = useMemo(
    () => ({
      lenis: lenisInst,
      scrollToId,
    }),
    [lenisInst, scrollToId]
  );

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.085,
    });
    lenisRef.current = lenis;
    setLenisInst(lenis);

    const offScroll = lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      offScroll();
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInst(null);
      ScrollTrigger.refresh();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [location.pathname]);

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
