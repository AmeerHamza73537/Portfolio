import React, { useCallback, useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useLenisContext } from "../context/useLenisContext";

const Home = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const { lenis, scrollToId } = useLenisContext();

  // 3D signature piece — replaces the old static glow blob
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    if (!canvas || !wrap) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let w = wrap.clientWidth;
    let h = wrap.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6.2;

    const group = new THREE.Group();
    scene.add(group);

    const GOLD = 0xe8c547;
    const ORANGE = 0xe07b39;
    const CREAM = 0xf5f0e8;

    const icoEdges = new THREE.EdgesGeometry(
      new THREE.IcosahedronGeometry(1.55, 1)
    );
    const icoMat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.5,
    });
    const icoLines = new THREE.LineSegments(icoEdges, icoMat);
    group.add(icoLines);

    const dodecEdges = new THREE.EdgesGeometry(
      new THREE.DodecahedronGeometry(2.25, 0)
    );
    const dodecMat = new THREE.LineBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.16,
    });
    const dodecLines = new THREE.LineSegments(dodecEdges, dodecMat);
    group.add(dodecLines);

    const particleCount = 130;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.7 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particleMat = new THREE.PointsMaterial({
      color: CREAM,
      size: 0.028,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    if (!reduceMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const handleResize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const spin = reduceMotion ? 0.0004 : 0.0016;
      icoLines.rotation.y += spin;
      icoLines.rotation.x += spin * 0.5;
      dodecLines.rotation.y -= spin * 0.45;
      particles.rotation.y += spin * 0.3;

      if (!reduceMotion) {
        const targetX = mouseY * 0.22;
        const targetY = mouseX * 0.32;
        group.rotation.x += (targetX - group.rotation.x) * 0.05;
        group.rotation.y += (targetY - group.rotation.y) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      icoEdges.dispose();
      icoMat.dispose();
      dodecEdges.dispose();
      dodecMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const navigate = useCallback(
    (id) => {
      scrollToId(id);
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
        <canvas ref={canvasRef} className="hero-canvas" />
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
          onClick={() => navigate("projects")}
          className="hero-resume-btn relative z-[1] hover:cursor-pointer"
        >
          <span className="block">See My Work</span>
        </button>
        <a
          href="/resume.pdf"
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