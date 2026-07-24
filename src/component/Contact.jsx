import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import * as THREE from "three";
import React from "react";
const HEADING_WORDS = ["Let's", "work", "together"];

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: "",
    type: "",
  });

  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const canvasRef = useRef(null);
  const formFocusRef = useRef(false);
  const visualPulseRef = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-section .font-mono-label", {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".contact-heading-word", {
        autoAlpha: 0,
        rotationX: 90,
        stagger: 0.1,
        duration: 0.85,
        ease: "power3.out",
        transformOrigin: "50% 100%",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".contact-form", {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".contact-visual", {
        autoAlpha: 0,
        scale: 0.9,
        rotationY: -12,
        duration: 1,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".contact-visual",
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const canvas = canvasRef.current;

    if (!section || !visual || !canvas) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 700px)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1.2 : 1.5),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 30);
    camera.position.set(0, 0, 4.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.56));

    const keyLight = new THREE.PointLight(0xffffff, 28, 10, 1.8);
    keyLight.position.set(2.5, 2.8, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xe8c547, 12, 8, 2);
    rimLight.position.set(-2.7, -0.5, 2.4);
    scene.add(rimLight);

    const bot = new THREE.Group();
    scene.add(bot);

    const headMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020304,
      metalness: 0.38,
      roughness: 0.11,
      clearcoat: 1,
      clearcoatRoughness: 0.045,
      reflectivity: 1,
    });
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(
        0.82,
        isMobile ? 32 : 48,
        isMobile ? 24 : 36,
      ),
      headMaterial,
    );
    bot.add(head);

    const face = new THREE.Group();
    face.position.z = 0.785;
    bot.add(face);

    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8c547,
      transparent: true,
      opacity: 0.96,
      toneMapped: false,
    });
    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8c547,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const eyes = [];
    const eyeGlows = [];

    [-0.23, 0.23].forEach((x, index) => {
      const eye = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.052, 0.2, 8, 12),
        eyeMaterial,
      );
      eye.position.set(x, 0.045, 0);
      eye.userData.baseX = x;
      eye.rotation.y = index === 0 ? -0.035 : 0.035;
      face.add(eye);
      eyes.push(eye);

      const glow = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.066, 0.225, 6, 10),
        eyeGlowMaterial,
      );
      glow.position.copy(eye.position);
      glow.position.z = -0.006;
      glow.userData.baseX = x;
      glow.rotation.y = eye.rotation.y;
      face.add(glow);
      eyeGlows.push(glow);
    });

    const groundGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xe8c547,
      transparent: true,
      opacity: 0.09,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const groundGlow = new THREE.Mesh(
      new THREE.RingGeometry(0.24, 0.7, 48),
      groundGlowMaterial,
    );
    groundGlow.scale.set(1, 0.28, 1);
    groundGlow.position.set(0, -1.02, -0.12);
    scene.add(groundGlow);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let focusAmount = 0;
    let frameId = 0;
    let lastTime = performance.now();
    let isVisible = true;

    const resize = () => {
      const { width, height } = visual.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (reducedMotion) renderer.render(scene, camera);
    };

    const handlePointerMove = (event) => {
      if (reducedMotion || isMobile) return;
      const bounds = section.getBoundingClientRect();
      pointer.targetX = Math.min(
        Math.max(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1),
        1,
      );
      pointer.targetY = Math.min(
        Math.max(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1),
        1,
      );
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    const animate = (time) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      const ease = 1 - Math.exp(-delta * 5.5);
      lastTime = time;

      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;
      focusAmount +=
        ((formFocusRef.current ? 1 : 0) - focusAmount) *
        (1 - Math.exp(-delta * 6));

      const pulse = visualPulseRef.current;
      visualPulseRef.current *= Math.exp(-delta * 3.4);
      const idle = reducedMotion ? 0 : time * 0.001;

      const hover = reducedMotion ? 0 : Math.sin(idle * 1.15) * 0.055;
      bot.position.x = pointer.x * (isMobile ? 0.22 : 0.72);
      bot.position.y = -pointer.y * (isMobile ? 0.14 : 0.42) + hover;
      bot.position.z = focusAmount * 0.14 + pulse * 0.18;
      bot.rotation.x = -pointer.y * (isMobile ? 0.12 : 0.3);
      bot.rotation.y = pointer.x * (isMobile ? 0.18 : 0.46);
      bot.rotation.z = -pointer.x * (isMobile ? 0.025 : 0.07);
      bot.scale.setScalar(1 + focusAmount * 0.035 + pulse * 0.09);

      face.position.x = pointer.x * 0.055;
      face.position.y = -pointer.y * 0.04;
      face.rotation.x = -pointer.y * 0.075;
      face.rotation.y = pointer.x * 0.11;

      const blinkPhase = idle % 5.2;
      const blink =
        !reducedMotion && blinkPhase > 4.78
          ? 1 - Math.sin(((blinkPhase - 4.78) / 0.42) * Math.PI) * 0.9
          : 1;
      eyes.forEach((eye) => {
        eye.position.x = eye.userData.baseX + pointer.x * 0.04;
        eye.position.y = 0.045 - pointer.y * 0.032;
        eye.scale.y = blink;
      });
      eyeGlows.forEach((glow) => {
        glow.position.x = glow.userData.baseX + pointer.x * 0.04;
        glow.position.y = 0.045 - pointer.y * 0.032;
        glow.scale.y = blink;
      });

      eyeGlowMaterial.opacity = 0.15 + focusAmount * 0.13 + pulse * 0.28;
      groundGlowMaterial.opacity = 0.07 + focusAmount * 0.05 + pulse * 0.1;
      const groundScale = 1 + focusAmount * 0.12 + pulse * 0.25;
      groundGlow.scale.set(groundScale, groundScale * 0.28, 1);
      groundGlow.position.x = bot.position.x * 0.4;

      camera.position.x = pointer.x * 0.04;
      camera.position.y = -pointer.y * 0.025;
      camera.lookAt(0, 0, 0);

      if (isVisible) renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    const resizeObserver = new ResizeObserver(resize);

    visibilityObserver.observe(section);
    resizeObserver.observe(visual);
    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", handlePointerLeave);

    resize();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: "", type: "" });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);
      visualPulseRef.current = 0.45;
      const templateParams = { name, email, subject, message };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_KEY
      );

      visualPulseRef.current = 1;
      toggleAlert("Form submission was successful!", "success");
    } catch (e) {
      console.error(e);
      toggleAlert("Uh oh. Something went wrong.", "danger");
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section relative flex flex-col justify-center section-pad section-divider overflow-hidden"
    >
      <div className="site-container">
        <p className="font-mono-label mb-8 md:mb-10 animate-on-scroll">— 04. CONTACT</p>

        <div className="flex flex-col lg:flex-row justify-between items-stretch gap-12 lg:gap-16 relative z-10">
          <div className="contact-copy w-full lg:w-1/2 px-1 sm:px-2 text-center lg:text-left text-[#f5f0e8] space-y-4">
            <h2 className="contact-heading text-2xl sm:text-3xl md:text-4xl font-bold m-0 font-['DM_Sans',sans-serif] animate-on-scroll">
              {HEADING_WORDS.map((word, i) => (
                <span key={i} className="contact-heading-word word animate-on-scroll">
                  {word}
                </span>
              ))}
            </h2>

            <p className="text-[#7a7a7a] text-sm sm:text-base">
              I am available for full-time roles & freelance projects.
            </p>

            <p className="text-[#7a7a7a] text-sm sm:text-base">
              My inbox is always open, whether you have a question or just want to say Hi.
            </p>

            <p className="text-[#7a7a7a] text-sm sm:text-base">I will try my best to get back to you.</p>

            <a href="mailto:ameerhamza450505@gmail.com" className="contact-mail-btn mt-2">
              ameerhamza450505@gmail.com
            </a>

            <div
              ref={visualRef}
              className="contact-visual"
              aria-hidden="true"
            >
              <canvas ref={canvasRef} className="contact-visual-canvas" />
            </div>
          </div>

          <div className="contact-form contact-form-shell animate-on-scroll w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
            <form
              className="flex flex-col gap-4 sm:gap-5"
              onSubmit={handleSubmit(onSubmit)}
              onFocusCapture={() => {
                formFocusRef.current = true;
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  formFocusRef.current = false;
                }
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Your Name</p>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="contact-field"
                    {...register("name", {
                      required: "Please enter your name",
                      maxLength: {
                        value: 30,
                        message: "Please use 30 characters or less",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Your Email</p>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="contact-field"
                    {...register("email", {
                      required: "Please enter your email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Subject</p>
                <input
                  type="text"
                  placeholder="Project Inquiry"
                  className="contact-field"
                  {...register("subject", {
                    required: "Please enter a subject",
                    maxLength: {
                      value: 75,
                      message: "Subject cannot exceed 75 characters",
                    },
                  })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <p className="text-sm sm:text-base mb-1 font-['DM_Sans',sans-serif]">Message</p>
                <textarea
                  rows={5}
                  placeholder="Hello, I'd like to discuss a project..."
                  className="contact-field min-h-[120px] resize-y"
                  {...register("message", {
                    required: "Please enter a message",
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button type="submit" disabled={disabled} className="contact-send-btn">
                Send Message
              </button>

              {alertInfo.display && (
                <div
                  className={`mt-4 text-sm font-medium ${
                    alertInfo.type === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {alertInfo.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
