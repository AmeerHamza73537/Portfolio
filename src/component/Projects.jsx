import { useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectData } from "../project/ProjectData.jsx";
import { useLenisContext } from "../context/useLenisContext.js";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const TAU = Math.PI * 2;
const CARD_ACCENTS = ["#e8c547", "#e07b39", "#d8b84a", "#f0a060"];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const PROJECTS_STYLES = `
  .p3d-section {
    position: relative;
    width: 100%;
    height: 100svh;
    min-height: 660px;
    overflow: hidden;
    border-bottom: 1px solid var(--divider);
    background:
      radial-gradient(circle at 50% 50%, rgba(232, 197, 71, 0.055), transparent 34%),
      linear-gradient(180deg, #0c0c0c 0%, #10100f 48%, #0c0c0c 100%);
    isolation: isolate;
  }

  .p3d-section::before,
  .p3d-section::after {
    content: "";
    position: absolute;
    z-index: 0;
    pointer-events: none;
    border-radius: 50%;
  }

  .p3d-section::before {
    width: min(74vw, 960px);
    aspect-ratio: 1;
    left: 50%;
    top: 52%;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(232, 197, 71, 0.06);
    box-shadow:
      0 0 100px rgba(232, 197, 71, 0.025),
      inset 0 0 100px rgba(232, 197, 71, 0.02);
  }

  .p3d-section::after {
    width: 38vw;
    height: 38vw;
    max-width: 520px;
    max-height: 520px;
    right: -18vw;
    bottom: -25vw;
    background: rgba(224, 123, 57, 0.04);
    filter: blur(80px);
  }

  .p3d-webgl {
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    pointer-events: none;
  }

  .p3d-head {
    position: absolute;
    z-index: 20;
    top: clamp(5.5rem, 11vh, 7.75rem);
    left: max(1rem, calc((100vw - 1200px) / 2 + 1.5rem));
    right: max(1rem, calc((100vw - 1200px) / 2 + 1.5rem));
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
    pointer-events: none;
  }

  .p3d-heading {
    margin: 0.65rem 0 0;
    max-width: 670px;
    color: var(--cream);
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 4rem);
    font-style: italic;
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.035em;
  }

  .p3d-heading span {
    background: var(--gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .p3d-head-note {
    max-width: 210px;
    margin: 0.25rem 0 0;
    color: var(--muted);
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.65;
    letter-spacing: 0.12em;
    text-align: right;
    text-transform: uppercase;
  }

  .p3d-viewport {
    position: absolute;
    z-index: 5;
    inset: clamp(8.5rem, 17vh, 11rem) 0 clamp(4.5rem, 8vh, 6rem);
    perspective: 1300px;
    perspective-origin: 50% 48%;
  }

  .p3d-stage {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    will-change: transform;
    pointer-events: none;
  }

  .p3d-card {
    --card-accent: var(--gold);
    position: absolute;
    top: 54%;
    left: 50%;
    width: clamp(330px, 31vw, 450px);
    height: clamp(440px, 61vh, 610px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(245, 240, 232, 0.09);
    border-radius: 1rem;
    background: #141414;
    color: var(--cream);
    opacity: 0;
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.38);
    will-change: transform, opacity;
    pointer-events: none;
    transition:
      border-color 0.45s ease,
      box-shadow 0.45s ease;
  }

  .p3d-card::before {
    content: "";
    position: absolute;
    z-index: 4;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--card-accent), transparent);
    opacity: 0.2;
    transform: scaleX(0.45);
    transition: opacity 0.45s ease, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .p3d-card.is-active {
    pointer-events: auto;
    border-color: color-mix(in srgb, var(--card-accent) 28%, transparent);
    box-shadow:
      0 38px 90px rgba(0, 0, 0, 0.62),
      0 16px 54px rgba(232, 197, 71, 0.09);
  }

  .p3d-card.is-active::before {
    opacity: 0.95;
    transform: scaleX(1);
  }

  .p3d-media {
    position: relative;
    height: 38%;
    min-height: 150px;
    overflow: hidden;
    flex: 0 0 auto;
    background:
      linear-gradient(135deg, rgba(232, 197, 71, 0.16), rgba(224, 123, 57, 0.035) 58%),
      #181817;
  }

  .p3d-media::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    background:
      linear-gradient(180deg, transparent 48%, rgba(20, 20, 20, 0.78) 100%),
      linear-gradient(90deg, rgba(12, 12, 12, 0.16), transparent 40%);
    pointer-events: none;
  }

  .p3d-media img {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.72) contrast(1.04) brightness(0.74);
    transform: scale(1.04);
    transition:
      filter 0.8s cubic-bezier(0.22, 1, 0.36, 1),
      transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .p3d-card.is-active .p3d-media img {
    filter: saturate(0.92) contrast(1.02) brightness(0.88);
    transform: scale(1);
  }

  .p3d-image-fallback {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: rgba(245, 240, 232, 0.06);
    font-family: var(--font-display);
    font-size: clamp(5rem, 10vw, 9rem);
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    user-select: none;
  }

  .p3d-index {
    position: absolute;
    z-index: 3;
    top: 1rem;
    left: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--cream);
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
  }

  .p3d-index::before {
    content: "";
    width: 18px;
    height: 1px;
    background: var(--card-accent);
  }

  .p3d-card-body {
    display: flex;
    min-height: 0;
    flex: 1 1 auto;
    flex-direction: column;
    padding: clamp(1.15rem, 2vw, 1.6rem);
  }

  .p3d-card-kicker {
    margin: 0 0 0.45rem;
    color: var(--card-accent);
    font-family: var(--font-mono);
    font-size: 9px;
    line-height: 1.4;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .p3d-card-body h3 {
    margin: 0;
  }

  .p3d-title-button {
    width: fit-content;
    max-width: 100%;
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    color: var(--cream);
    font-family: var(--font-display);
    font-size: clamp(1.65rem, 3vw, 2.4rem);
    font-style: italic;
    font-weight: 700;
    line-height: 1.05;
    text-align: left;
    cursor: pointer;
    transition: color 0.25s ease;
  }

  .p3d-title-button:hover,
  .p3d-title-button:focus-visible {
    color: var(--card-accent);
    outline: none;
  }

  .p3d-description {
    display: -webkit-box;
    margin: 0.75rem 0 0;
    overflow: hidden;
    color: #858585;
    font-size: clamp(0.72rem, 1.1vw, 0.84rem);
    line-height: 1.55;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .p3d-tech {
    display: flex;
    margin: auto 0 0;
    padding: 0.9rem 0 0;
    flex-wrap: wrap;
    gap: 0.4rem;
    list-style: none;
  }

  .p3d-tech li {
    padding: 0.32rem 0.55rem;
    border: 1px solid #292929;
    border-radius: 999px;
    color: #989898;
    font-family: var(--font-mono);
    font-size: 8px;
    line-height: 1;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .p3d-actions {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-top: 1rem;
  }

  .p3d-action {
    display: inline-flex;
    min-height: 34px;
    align-items: center;
    justify-content: center;
    padding: 0.48rem 0.78rem;
    border: 1px solid rgba(232, 197, 71, 0.4);
    border-radius: 999px;
    background: transparent;
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 9px;
    line-height: 1;
    letter-spacing: 0.09em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      border-color 0.25s ease,
      background-color 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
  }

  .p3d-action:hover,
  .p3d-action:focus-visible {
    border-color: var(--gold);
    background: rgba(232, 197, 71, 0.1);
    color: var(--cream);
    outline: none;
    transform: translateY(-2px);
  }

  .p3d-action--disabled {
    opacity: 0.35;
  }

  .p3d-meta {
    position: absolute;
    z-index: 20;
    right: max(1rem, calc((100vw - 1200px) / 2 + 1.5rem));
    bottom: clamp(1.4rem, 4vh, 2.75rem);
    display: flex;
    align-items: center;
    gap: 1rem;
    pointer-events: none;
  }

  .p3d-count {
    min-width: 64px;
    color: var(--cream);
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.15em;
  }

  .p3d-count span {
    color: var(--gold);
    font-size: 15px;
  }

  .p3d-progress {
    position: relative;
    width: clamp(100px, 12vw, 170px);
    height: 1px;
    overflow: hidden;
    background: #2a2a2a;
  }

  .p3d-progress-fill {
    position: absolute;
    inset: 0;
    background: var(--gradient);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .p3d-scroll-note {
    position: absolute;
    z-index: 20;
    left: max(1rem, calc((100vw - 1200px) / 2 + 1.5rem));
    bottom: clamp(1.4rem, 4vh, 2.75rem);
    display: flex;
    align-items: center;
    gap: 0.7rem;
    color: #666;
    font-family: var(--font-mono);
    font-size: 9px;
    line-height: 1;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    pointer-events: none;
  }

  .p3d-scroll-wheel {
    position: relative;
    width: 18px;
    height: 28px;
    border: 1px solid #454545;
    border-radius: 999px;
  }

  .p3d-scroll-wheel::after {
    content: "";
    position: absolute;
    top: 5px;
    left: 50%;
    width: 2px;
    height: 5px;
    border-radius: 999px;
    background: var(--gold);
    transform: translateX(-50%);
    animation: p3d-wheel 1.8s ease-in-out infinite;
  }

  .p3d-sr-status {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  @keyframes p3d-wheel {
    0%, 100% { opacity: 0; transform: translate(-50%, 0); }
    35% { opacity: 1; }
    70% { opacity: 0; transform: translate(-50%, 8px); }
  }

  @media (max-width: 900px) {
    .p3d-head-note {
      display: none;
    }

    .p3d-card {
      width: clamp(320px, 48vw, 410px);
    }
  }

  @media (max-width: 700px) {
    .p3d-section {
      min-height: 620px;
    }

    .p3d-section::before {
      width: 130vw;
    }

    .p3d-webgl {
      display: none;
    }

    .p3d-head {
      top: 5.15rem;
    }

    .p3d-heading {
      max-width: 290px;
      font-size: clamp(1.85rem, 9vw, 2.8rem);
    }

    .p3d-viewport {
      inset: 8.2rem 0 4.25rem;
      perspective: 950px;
    }

    .p3d-card {
      top: 53%;
      width: min(84vw, 380px);
      height: min(64svh, 525px);
      min-height: 410px;
    }

    .p3d-media {
      height: 32%;
      min-height: 120px;
    }

    .p3d-card-body {
      padding: 1rem;
    }

    .p3d-description {
      font-size: 0.7rem;
      -webkit-line-clamp: 2;
    }

    .p3d-tech li:nth-child(n + 5) {
      display: none;
    }

    .p3d-scroll-note {
      left: 1rem;
      bottom: 1.25rem;
    }

    .p3d-meta {
      right: 1rem;
      bottom: 1.4rem;
      gap: 0.6rem;
    }

    .p3d-progress {
      width: 78px;
    }
  }

  @media (max-height: 720px) and (min-width: 701px) {
    .p3d-head {
      top: 4.9rem;
    }

    .p3d-heading {
      font-size: 2.25rem;
    }

    .p3d-viewport {
      inset: 7.4rem 0 3.5rem;
    }

    .p3d-card {
      height: 440px;
    }

    .p3d-media {
      height: 32%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .p3d-section {
      height: auto;
      min-height: 0;
      padding: 7rem 0 5rem;
      overflow: visible;
    }

    .p3d-section::before,
    .p3d-section::after,
    .p3d-webgl,
    .p3d-scroll-note,
    .p3d-meta {
      display: none;
    }

    .p3d-head {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      width: min(1200px, calc(100% - 2rem));
      margin: 0 auto 2rem;
    }

    .p3d-viewport {
      position: relative;
      inset: auto;
      perspective: none;
    }

    .p3d-stage {
      position: relative;
      inset: auto;
      display: grid;
      width: min(1200px, calc(100% - 2rem));
      margin: 0 auto;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
      transform: none !important;
    }

    .p3d-card {
      position: relative;
      top: auto;
      left: auto;
      width: auto;
      height: auto;
      min-height: 490px;
      opacity: 1 !important;
      transform: none !important;
      pointer-events: auto !important;
    }

    .p3d-scroll-wheel::after {
      animation: none;
    }
  }

  @media (prefers-reduced-motion: reduce) and (max-width: 700px) {
    .p3d-stage {
      grid-template-columns: 1fr;
    }
  }
`;

function createThreeBackdrop(canvas, getRotation, getPointer) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: window.devicePixelRatio <= 1.5,
    powerPreference: "high-performance",
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
  camera.position.set(0, 1.4, 7.5);
  camera.lookAt(0, 0, 0);

  const orbit = new THREE.Group();
  scene.add(orbit);

  scene.add(new THREE.AmbientLight(0xe8c547, 0.18));
  const keyLight = new THREE.PointLight(0xe8c547, 8, 13, 2);
  keyLight.position.set(-3.5, 2.5, 4);
  scene.add(keyLight);
  const warmLight = new THREE.PointLight(0xe07b39, 5, 11, 2);
  warmLight.position.set(3.5, -1.5, 2);
  scene.add(warmLight);

  const materials = [];
  const geometries = [];
  [-0.9, 0, 0.9].forEach((y, index) => {
    const geometry = new THREE.TorusGeometry(2.55 + index * 0.18, 0.008, 5, 140);
    const material = new THREE.MeshStandardMaterial({
      color: index === 1 ? 0xe07b39 : 0xe8c547,
      emissive: index === 1 ? 0xe07b39 : 0xe8c547,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: index === 1 ? 0.12 : 0.075,
      roughness: 0.35,
      metalness: 0.7,
    });
    const ring = new THREE.Mesh(geometry, material);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    ring.scale.setScalar(1 - Math.abs(index - 1) * 0.08);
    orbit.add(ring);
    geometries.push(geometry);
    materials.push(material);
  });

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  resize();

  const render = (time) => {
    const pointer = getPointer();
    orbit.rotation.y = getRotation() * 0.16 + time * 0.000025;
    orbit.rotation.z = pointer.x * 0.035;
    camera.position.x = pointer.x * 0.16;
    camera.position.y = 1.4 - pointer.y * 0.11;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  const dispose = () => {
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    renderer.dispose();
  };

  return { resize, render, dispose };
}

const Projects = () => {
  const navigate = useNavigate();
  const { lenis } = useLenisContext();
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const cardCount = projectData.length;

    if (!root || !stage || !cardCount || !lenis) return undefined;

    if (reducedMotion) {
      const reducedContext = gsap.context(() => {
        gsap.from(".p3d-head", {
          autoAlpha: 0,
          y: 20,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
        });
      }, root);

      return () => reducedContext.revert();
    }

    const step = TAU / cardCount;
    const motion = {
      desiredRotation: 0,
      currentRotation: 0,
      pointerX: 0,
      pointerY: 0,
      pointerTargetX: 0,
      pointerTargetY: 0,
    };
    let frameId = 0;
    let lastTime = performance.now();
    let isMobile = window.innerWidth <= 700;
    let backdrop = null;

    const getPointer = () => ({ x: motion.pointerX, y: motion.pointerY });

    if (!isMobile && canvas) {
      try {
        backdrop = createThreeBackdrop(
          canvas,
          () => motion.currentRotation,
          getPointer,
        );
      } catch {
        canvas.style.display = "none";
      }
    }

    const syncActiveCard = (nextIndex) => {
      if (activeRef.current === nextIndex) return;
      activeRef.current = nextIndex;
      setActiveIndex(nextIndex);
      cardRefs.current.forEach((card, index) => {
        card?.classList.toggle("is-active", index === nextIndex);
      });
    };

    const renderCards = (time) => {
      const width = root.clientWidth;
      const radiusX = isMobile
        ? Math.min(width * 0.58, 245)
        : Math.min(width * 0.35, 470);
      const radiusZ = isMobile ? 145 : Math.min(width * 0.24, 330);
      const nearestIndex = clamp(
        Math.round(motion.currentRotation / step),
        0,
        cardCount - 1,
      );

      syncActiveCard(nearestIndex);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const angle = index * step - motion.currentRotation;
        const wrappedAngle = Math.atan2(Math.sin(angle), Math.cos(angle));
        const cosine = Math.cos(angle);
        const depth = (cosine + 1) / 2;
        const focus = Math.pow(depth, isMobile ? 8 : 6);
        const isActive = index === nearestIndex;
        const floatAmount = isMobile ? 2.5 : 6;
        const floatingY = Math.sin(time * 0.00072 + index * 1.37) * floatAmount;
        const x = Math.sin(angle) * radiusX;
        const z = cosine * radiusZ + (isActive ? 44 : 0);
        const scale = isMobile ? 0.78 + focus * 0.22 : 0.72 + focus * 0.28;
        const opacity = isMobile
          ? 0.06 + Math.pow(depth, 3.3) * 0.94
          : 0.14 + Math.pow(depth, 2.3) * 0.86;
        const rotateY = -Math.sin(wrappedAngle) * (isMobile ? 8 : 18);
        const rotateX =
          Math.sin(time * 0.00052 + index) * (isMobile ? 0.25 : 0.7);

        card.style.transform = [
          "translate(-50%, -50%)",
          `translate3d(${x.toFixed(2)}px, ${floatingY.toFixed(2)}px, ${z.toFixed(2)}px)`,
          `rotateY(${rotateY.toFixed(2)}deg)`,
          `rotateX(${rotateX.toFixed(2)}deg)`,
          `scale(${scale.toFixed(4)})`,
        ].join(" ");
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(Math.round(500 + z));
      });

      stage.style.transform = [
        `translate3d(${(motion.pointerX * (isMobile ? 2 : 13)).toFixed(2)}px,`,
        `${(motion.pointerY * (isMobile ? 1 : 8)).toFixed(2)}px, 0)`,
        `rotateX(${(-motion.pointerY * (isMobile ? 0 : 1.25)).toFixed(2)}deg)`,
        `rotateY(${(motion.pointerX * (isMobile ? 0 : 1.65)).toFixed(2)}deg)`,
      ].join(" ");
    };

    const animate = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      const rotationEase = 1 - Math.exp(-delta * 8);
      const pointerEase = 1 - Math.exp(-delta * 5.5);
      lastTime = time;

      motion.currentRotation +=
        (motion.desiredRotation - motion.currentRotation) * rotationEase;
      motion.pointerX +=
        (motion.pointerTargetX - motion.pointerX) * pointerEase;
      motion.pointerY +=
        (motion.pointerTargetY - motion.pointerY) * pointerEase;

      renderCards(time);
      backdrop?.render(time);
      frameId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      if (isMobile) return;
      const rect = root.getBoundingClientRect();
      motion.pointerTargetX = clamp(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -1,
        1,
      );
      motion.pointerTargetY = clamp(
        ((event.clientY - rect.top) / rect.height) * 2 - 1,
        -1,
        1,
      );
    };

    const handlePointerLeave = () => {
      motion.pointerTargetX = 0;
      motion.pointerTargetY = 0;
    };

    const handleResize = () => {
      isMobile = window.innerWidth <= 700;
      backdrop?.resize();
    };

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });

    const context = gsap.context(() => {
      gsap.from(".p3d-eyebrow, .p3d-heading, .p3d-head-note", {
        autoAlpha: 0,
        y: 22,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      gsap.to(motion, {
        desiredRotation: (cardCount - 1) * step,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          scroller: document.documentElement,
          start: "top top",
          end: () =>
            `+=${Math.max(1, cardCount - 1) * window.innerHeight * 0.92}`,
          pin: root,
          pinSpacing: true,
          scrub: 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            motion.desiredRotation =
              self.progress * (cardCount - 1) * step;
          },
          onToggle: (self) => {
            root.classList.toggle("is-pinned", self.isActive);
          },
        },
      });
    }, root);

    cardRefs.current.forEach((card, index) => {
      card?.classList.toggle("is-active", index === 0);
    });
    renderCards(performance.now());
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      backdrop?.dispose();
      context.revert();
    };
  }, [lenis, reducedMotion]);

  const progress =
    projectData.length > 1 ? activeIndex / (projectData.length - 1) : 1;

  return (
    <section
      ref={rootRef}
      id="projects"
      className="p3d-section"
      aria-labelledby="projects-heading"
    >
      <style>{PROJECTS_STYLES}</style>
      <canvas ref={canvasRef} className="p3d-webgl" aria-hidden="true" />

      <div className="p3d-head">
        <div>
          <p className="p3d-eyebrow font-mono-label">— 03. SELECTED PROJECTS</p>
          <h2 id="projects-heading" className="p3d-heading">
            {/* Built with intent. <span>Shaped by craft.</span> */}
          </h2>
        </div>
        {/* <p className="p3d-head-note">
          A circular study in product thinking, full-stack engineering, and
          considered interaction.
        </p> */}
      </div>

      <div className="p3d-viewport">
        <div ref={stageRef} className="p3d-stage">
          {projectData.map((project, index) => {
            const image =
              project.image || project.thumbnail || project.screenshots?.[0];
            const technologies = (
              project.techStack ||
              project.technologies ||
              []
            ).slice(0, 6);
            const liveDemo = project.liveDemo || project.demo;
            const isInteractive = reducedMotion || activeIndex === index;

            return (
              <article
                key={project.id}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={`p3d-card${
                  reducedMotion || activeIndex === index ? " is-active" : ""
                }`}
                style={{ "--card-accent": CARD_ACCENTS[index % CARD_ACCENTS.length] }}
                aria-hidden={!isInteractive}
              >
                <div className="p3d-media">
                  <span className="p3d-image-fallback" aria-hidden="true">
                    {project.name?.charAt(0)}
                  </span>
                  {image && (
                    <img
                      src={image}
                      alt={`${project.name} project preview`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  )}
                  <span className="p3d-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="p3d-card-body">
                  <p className="p3d-card-kicker">
                    {project.type || project.tagline || "Featured build"}
                  </p>
                  <h3>
                    <button
                      type="button"
                      className="p3d-title-button"
                      tabIndex={isInteractive ? 0 : -1}
                      onClick={() => navigate(project.path)}
                      aria-label={`Open ${project.name} case study`}
                    >
                      {project.name}
                    </button>
                  </h3>
                  <p className="p3d-description">{project.description}</p>

                  <ul className="p3d-tech" aria-label={`${project.name} tech stack`}>
                    {technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>

                  <div className="p3d-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p3d-action"
                      tabIndex={isInteractive ? 0 : -1}
                      aria-label={`View ${project.name} source code on GitHub`}
                    >
                      GitHub ↗
                    </a>
                    {liveDemo ? (
                      <a
                        href={liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p3d-action"
                        tabIndex={isInteractive ? 0 : -1}
                        aria-label={`Open ${project.name} live demo`}
                      >
                        Live Demo ↗
                      </a>
                    ) : (
                      <span
                        className="p3d-action p3d-action--disabled"
                        aria-label="Live demo unavailable"
                      >
                        Demo soon
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="p3d-scroll-note" aria-hidden="true">
        <span className="p3d-scroll-wheel" />
        <span>
          {activeIndex === projectData.length - 1
            ? "Keep scrolling to continue"
            : "Scroll to orbit"}
        </span>
      </div>

      <div className="p3d-meta" aria-hidden="true">
        <p className="p3d-count">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          {" / "}
          {String(projectData.length).padStart(2, "0")}
        </p>
        <div className="p3d-progress">
          <span
            ref={progressRef}
            className="p3d-progress-fill"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      <p className="p3d-sr-status" aria-live="polite" aria-atomic="true">
        Project {activeIndex + 1} of {projectData.length}:{" "}
        {projectData[activeIndex]?.name}
      </p>
    </section>
  );
};

export default Projects;
