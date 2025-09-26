import React from "react";
import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height, particles;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = rand(0, width);
        this.y = rand(-height, 0);
        this.radius = rand(1, 4);
        this.speed = rand(0.5, 2);
        this.color = `rgba(255,255,255,${rand(0.3, 1)})`;
      }
      update() {
        this.y += this.speed;
        if (this.y > height + this.radius) {
          this.reset();
          this.y = -this.radius;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.floor((width * height) / 8000);
      particles = Array.from({ length: count }, () => new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
