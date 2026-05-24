import React, { useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useLenisContext } from "../context/useLenisContext";

const Home = () => {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const { lenis, scrollToId } = useLenisContext();

  useLayoutEffect(() => {
    const glow = glowRef.current;
    if (glow) {
      const drift = gsap.to(glow, {
        x: 30,
        y: 20,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      return () => drift.kill();
    }
    return undefined;
  }, []);

  const navigate = useCallback(
    (id) => {
      scrollToId(id)
      setMenuOpen(false)
    },
    [scrollToId]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-subtitle", { autoAlpha: 0, y: 32 });
      gsap.set(".hero-tagline", { autoAlpha: 0, y: 36 });
      gsap.set(".hero-resume-btn", { autoAlpha: 0, scale: 0.8 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-greeting", { autoAlpha: 0, duration: 0.55 }, 0);
      /* Full line as one element — per-char background-clip:text clips italic “A” */
      tl.from(
        ".hero-name-row",
        { autoAlpha: 0, y: 28, duration: 0.9, ease: "power3.out" },
        0.28
      );
      tl.to(".hero-subtitle", { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, 0.85);
      tl.to(".hero-tagline", { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, 1.35);
      tl.to(
        ".hero-resume-btn",
        { autoAlpha: 1, scale: 1, duration: 0.65, ease: "back.out(1.25)" },
        1.85
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero-section section-divider">
      <div className="hero-glow-wrap" aria-hidden="true">
        <div ref={glowRef} className="hero-glow" />
      </div>

      <div className="hero-inner">
        <p className="hero-greeting">Hi! I am</p>

        <h1 className="hero-name-row m-0">Ameer Hamza</h1>

        <h2 className="hero-subtitle m-0">A Software Engineer</h2>

        <p className="hero-tagline">
          I build full-stack web apps with the MERN stack — focused on clean architecture and shipping things that actually work.
        </p>
      </div>

      <div className="flex items-center gap-4 justify-around ">
        <button
        onClick={() => navigate('projects')}
        className="hero-resume-btn relative z-[1] hover:cursor-pointer"
      >
        <span className="block">See My Work</span>
      </button>
      <a
        href="/public/resume.pdf"
        download="Ameer-Hamza-Resume.pdf"
        className="hero-resume-btn relative z-[1]"
      >
        <span className="hr-a block">Download Resume</span>
        <span className="hr-b text-sm">Click to Get My CV</span>
      </a>
      </div>
      
    </section>
  );
};

export default Home;
