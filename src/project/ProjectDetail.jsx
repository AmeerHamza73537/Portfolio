import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { getProjectByRouteId, projectData } from "./ProjectData.jsx";

function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const overlayRef = useRef(null);

  const project = useMemo(() => getProjectByRouteId(projectId), [projectId]);
  const moreProjects = useMemo(
    () => projectData.filter((item) => item.id !== project?.id).slice(0, 2),
    [project?.id]
  );

  useLayoutEffect(() => {
    if (!project) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.set(".case-overlay", { transformOrigin: "left center", scaleX: 0, autoAlpha: 1 });
      tl.to(".case-overlay", { scaleX: 1, duration: 0.3, ease: "power2.inOut" });
      tl.to(".case-overlay", { transformOrigin: "right center", scaleX: 0, duration: 0.3, ease: "power2.inOut" });
      tl.to(".case-overlay", { autoAlpha: 0, duration: 0.001 });

      tl.from(".case-label", { autoAlpha: 0, y: 16, duration: 0.4 }, 0.2);
      tl.from(
        ".case-title-char",
        { autoAlpha: 0, y: 56, rotateX: 90, transformOrigin: "50% 100%", stagger: 0.04, duration: 1, ease: "expo.out" },
        0.28
      );
      tl.from(".case-tagline", { autoAlpha: 0, y: 26, duration: 0.65, ease: "power3.out" }, 0.72);
      tl.from(".case-meta-chip", { autoAlpha: 0, y: 22, stagger: 0.08, duration: 0.5 }, 0.9);
      tl.from(".case-cta", { autoAlpha: 0, scale: 0.86, stagger: 0.08, duration: 0.55, ease: "back.out(1.3)" }, 1.1);
      tl.from(".case-mockup", { autoAlpha: 0, x: 60, duration: 1.2, ease: "power3.out" }, 0.55);

      gsap.to(".mockup-border-spin", { rotate: 360, duration: 8, ease: "none", repeat: -1 });

      gsap.from(".overview-stat", {
        autoAlpha: 0,
        y: 28,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".case-overview-strip",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      const monthsObj = { value: 0 };
      gsap.to(monthsObj, {
        value: project.timelineMonths || 3,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".case-overview-strip",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          const el = document.querySelector(".timeline-counter");
          if (el) el.textContent = `${Math.round(monthsObj.value)} Months`;
        },
      });

      gsap.fromTo(
        ".challenge-wipe",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-problem",
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
      gsap.from(".pull-quote", {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".pull-quote",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".feature-item", {
        autoAlpha: 0,
        x: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-list",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".tech-chip", {
        autoAlpha: 0,
        y: () => gsap.utils.random(-24, 24),
        x: () => gsap.utils.random(-24, 24),
        stagger: 0.08,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: ".tech-chip-wrap",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".challenge-card-left", {
        x: -60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-learnings",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      gsap.from(".challenge-card-right", {
        x: 60,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-learnings",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".more-project-card", {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        scrollTrigger: {
          trigger: ".case-more",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".case-cta-content", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".case-cta-strip",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <section className="min-h-screen pt-36 pb-20 px-6 text-[#f5f0e8]">
        <div className="site-container">
          <p className="font-['DM_Mono',monospace] text-[#e8c547] text-xs tracking-[0.25em]">— CASE STUDY</p>
          <h1 className="mt-6 text-4xl font-['Playfair_Display',serif] italic">Project not found</h1>
        </div>
      </section>
    );
  }

  const quote =
    project.longDescription.split(". ").find((line) => line.length > 70) || project.longDescription.slice(0, 140);

  return (
    <section ref={rootRef} className="project-detail-page relative bg-[#0c0c0c] text-[#f5f0e8]">
      <div ref={overlayRef} className="case-overlay" aria-hidden="true" />

      <button
        type="button"
        className="case-back-btn"
        onClick={() => navigate("/", { state: { scrollTo: "projects" } })}
      >
        <span className="arrow">←</span> Back to Projects
      </button>

      <div className="case-hero section-divider">
        <div className="case-hero-glow" aria-hidden="true" />
        <div className="site-container case-hero-grid">
          <div className="case-hero-left">
            <p className="case-label">— CASE STUDY</p>
            <h1 className="case-title">
              {project.title.split("").map((ch, idx) => (
                <span className="case-title-char" key={`${project.id}-${idx}`}>
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
            <p className="case-tagline">{project.tagline}</p>

            <div className="case-meta">
              <span className="case-meta-chip">Year: {project.year}</span>
              <span className="case-meta-chip">Type: {project.type}</span>
              <span className="case-meta-chip">Role: {project.role}</span>
            </div>

            <div className="case-hero-ctas">
              <a className="case-cta case-cta-primary" href={project.liveDemo || project.demo} target="_blank" rel="noreferrer">
                Live Demo →
              </a>
              <a className="case-cta case-cta-ghost" href={project.github} target="_blank" rel="noreferrer">
                View Code
              </a>
            </div>
          </div>

          <div className="case-hero-right">
            <div className="case-mockup">
              <div className="mockup-border-spin" />
              <div className="mockup-frame">
                <div className="mockup-browser-bar">
                  <div className="mockup-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <div className="mockup-url">https://portfolio.dev/{project.projectId || project.id}</div>
                </div>
                <div className="mockup-body">
                  <span className="mockup-watermark">{project.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="case-overview-strip section-divider">
        <div className="site-container case-overview-grid">
          <div className="overview-stat animate-on-scroll">
            <span className="stat-dot" />
            <p className="stat-label">Timeline</p>
            <p className="stat-value timeline-counter">0 Months</p>
          </div>
          <div className="overview-stat animate-on-scroll">
            <span className="stat-dot" />
            <p className="stat-label">Role</p>
            <p className="stat-value">Solo Dev</p>
          </div>
          <div className="overview-stat animate-on-scroll">
            <span className="stat-dot" />
            <p className="stat-label">Stack</p>
            <p className="stat-value">MERN</p>
          </div>
          <div className="overview-stat animate-on-scroll">
            <span className="stat-dot" />
            <p className="stat-label">Status</p>
            <p className="stat-value">Live ✓</p>
          </div>
        </div>
      </div>

      <div className="case-problem section-pad section-divider">
        <div className="site-container case-problem-grid">
          <div>
            <p className="font-mono-label">— 01. THE CHALLENGE</p>
            <h2 className="case-h2 challenge-wipe">What problem does this solve?</h2>
            <p className="case-body">{project.longDescription}</p>
            <blockquote className="pull-quote">{quote}</blockquote>
          </div>
          <div className="features-list">
            <p className="font-mono-label mb-6">KEY FEATURES</p>
            {project.features.map((item) => (
              <div className="feature-item animate-on-scroll" key={item}>
                <span className="feature-check">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="case-stack section-pad section-divider">
        <div className="site-container text-center">
          <p className="font-mono-label">— 02. BUILT WITH</p>
          <h2 className="case-h2 case-h2-center">The Stack</h2>
          <div className="tech-chip-wrap">
            {project.techStack.map((tech) => (
              <span className="tech-chip animate-on-scroll" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="case-learnings section-pad section-divider">
        <div className="site-container case-card-grid">
          <article className="case-info-card challenge-card-left animate-on-scroll">
            <span className="case-card-corner" aria-hidden="true" />
            <span className="case-diamond" aria-hidden="true" />
            <h3>The Hard Part</h3>
            <p>{project.challenges}</p>
          </article>
          <article className="case-info-card challenge-card-right animate-on-scroll">
            <span className="case-card-corner" aria-hidden="true" />
            <span className="case-diamond" aria-hidden="true" />
            <h3>What I Learned</h3>
            <p>{project.outcome}</p>
          </article>
        </div>
      </div>

      <div className="case-more section-pad section-divider">
        <div className="site-container">
          <p className="font-mono-label">— 03. MORE WORK</p>
          <h2 className="case-h2">Other Projects</h2>
          <div className="more-project-grid">
            {moreProjects.map((item) => (
              <article key={item.id} className="more-project-card animate-on-scroll">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.tagline}</p>
                  <div className="more-badges">
                    {item.techStack.slice(0, 3).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="more-actions">
                  <a href={item.github} target="_blank" rel="noreferrer" className="project-ghost-btn">
                    GitHub
                  </a>
                  <a href={item.liveDemo || item.demo} target="_blank" rel="noreferrer" className="project-ghost-btn">
                    Live Demo
                  </a>
                  <button type="button" className="project-ghost-btn" onClick={() => navigate(item.path)}>
                    Case Study →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="case-cta-strip">
        <div className="site-container text-center case-cta-content animate-on-scroll">
          <h2>Interested in working together?</h2>
          <p>Let&apos;s build something great.</p>
          <button
            type="button"
            className="case-contact-btn"
            onClick={() => navigate("/", { state: { scrollTo: "contact" } })}
          >
            Get In Touch →
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetail;
