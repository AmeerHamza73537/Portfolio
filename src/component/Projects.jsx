import React, { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCpu, FiGithub, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { projectData } from "../project/ProjectData.jsx";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "full-stack", label: "Full Stack" },
  { id: "ai", label: "AI" },
];

const AI_PROJECT_ORDER = new Map([
  ["meridian", 0],
  ["campus-ai", 1],
  ["drive-price", 2],
]);

const prioritizeProjects = (projects) =>
  [...projects].sort((first, second) => {
    const firstIsAI = first.category === "ai";
    const secondIsAI = second.category === "ai";

    if (firstIsAI && !secondIsAI) return -1;
    if (!firstIsAI && secondIsAI) return 1;
    if (firstIsAI && secondIsAI) {
      return (AI_PROJECT_ORDER.get(first.id) ?? 99) - (AI_PROJECT_ORDER.get(second.id) ?? 99);
    }

    return 0;
  });

const PROJECTS_STYLES = `
  .work-section {
    position: relative;
    overflow: hidden;
    padding: clamp(7rem, 11vw, 10rem) 0;
    border-bottom: 1px solid var(--divider);
    background:
      radial-gradient(circle at 12% 16%, rgba(232, 197, 71, 0.07), transparent 25rem),
      radial-gradient(circle at 88% 78%, rgba(224, 123, 57, 0.045), transparent 28rem),
      #0c0c0c;
    isolation: isolate;
  }

  .work-section::before {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: 0.16;
    background-image:
      linear-gradient(rgba(245, 240, 232, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 240, 232, 0.035) 1px, transparent 1px);
    background-size: 72px 72px;
    mask-image: linear-gradient(to bottom, transparent, black 15%, black 80%, transparent);
  }

  .work-shell {
    width: min(1240px, calc(100% - 2rem));
    margin: 0 auto;
  }

  .work-head {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(250px, 0.7fr);
    gap: clamp(2rem, 6vw, 6rem);
    align-items: end;
  }

  .work-kicker {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin: 0 0 1.1rem;
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  .work-kicker::before {
    content: "";
    width: 32px;
    height: 1px;
    background: var(--gradient);
  }

  .work-heading {
    max-width: 760px;
    margin: 0;
    color: var(--cream);
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6.5rem);
    font-style: italic;
    font-weight: 700;
    line-height: 0.88;
    letter-spacing: -0.055em;
  }

  .work-heading span {
    background: var(--gradient);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .work-intro {
    max-width: 390px;
    margin: 0;
    color: #8b8b8b;
    font-size: clamp(0.9rem, 1.4vw, 1.05rem);
    line-height: 1.75;
  }

  .work-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: clamp(2.75rem, 6vw, 5rem) 0 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid #242424;
  }

  .work-filters {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .work-filter {
    position: relative;
    min-height: 42px;
    padding: 0.75rem 1.15rem;
    overflow: hidden;
    border: 1px solid #2c2c2c;
    border-radius: 999px;
    background: rgba(20, 20, 20, 0.76);
    color: #8d8d8d;
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .work-filter span {
    position: relative;
    z-index: 1;
  }

  .work-filter::before {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--gradient);
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .work-filter:hover,
  .work-filter:focus-visible {
    border-color: rgba(232, 197, 71, 0.55);
    color: var(--cream);
    outline: none;
    transform: translateY(-2px);
  }

  .work-filter.is-active {
    border-color: transparent;
    color: #0c0c0c;
  }

  .work-filter.is-active::before {
    opacity: 1;
    transform: scale(1);
  }

  .work-result-count {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    color: #707070;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .work-result-count strong {
    color: var(--cream);
    font-size: 13px;
    font-weight: 500;
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.85rem;
  }

  .work-card {
    position: relative;
    display: flex;
    min-height: 500px;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #252525;
    border-radius: 1.1rem;
    background: rgba(18, 18, 18, 0.94);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.2);
    transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease;
  }

  .work-card:hover {
    border-color: rgba(232, 197, 71, 0.28);
    box-shadow: 0 34px 90px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(232, 197, 71, 0.035);
    transform: translateY(-6px);
  }

  .work-visual {
    position: relative;
    min-height: 190px;
    overflow: hidden;
    border-bottom: 1px solid #242424;
    background:
      radial-gradient(circle at 72% 35%, rgba(232, 197, 71, 0.18), transparent 32%),
      linear-gradient(145deg, #1b1a16, #111 62%);
  }

  .work-visual::before {
    content: "";
    position: absolute;
    width: 360px;
    height: 360px;
    right: -170px;
    bottom: -230px;
    border: 1px solid rgba(232, 197, 71, 0.24);
    border-radius: 50%;
    box-shadow: 0 0 0 42px rgba(232, 197, 71, 0.035), 0 0 0 84px rgba(232, 197, 71, 0.018);
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .work-card:hover .work-visual::before {
    transform: scale(1.08) translate(-8px, -8px);
  }

  .work-visual.has-image {
    background: #111;
  }

  .work-visual.has-image::before {
    display: none;
  }

  .work-visual.has-image::after {
    content: "";
    position: absolute;
    z-index: 1;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 8, 8, 0.5), transparent 35%, rgba(8, 8, 8, 0.08));
    pointer-events: none;
  }

  .work-preview {
    display: block;
    width: 100%;
    height: 100%;
    min-height: inherit;
    object-fit: cover;
    object-position: center top;
    filter: saturate(0.84) brightness(0.82);
    transform: scale(1.01);
    transition: filter 0.55s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .work-card:hover .work-preview {
    filter: saturate(1) brightness(0.96);
    transform: scale(1.035);
  }

  .work-visual[data-variant="2"] {
    background:
      radial-gradient(circle at 24% 80%, rgba(224, 123, 57, 0.18), transparent 32%),
      linear-gradient(135deg, #191512, #101010 58%);
  }

  .work-visual[data-variant="3"] {
    background:
      radial-gradient(circle at 80% 80%, rgba(232, 197, 71, 0.12), transparent 34%),
      linear-gradient(160deg, #161816, #101010 62%);
  }

  .work-visual[data-variant="4"] {
    background:
      radial-gradient(circle at 24% 28%, rgba(224, 123, 57, 0.13), transparent 30%),
      linear-gradient(145deg, #191719, #101010 62%);
  }

  .work-visual[data-category="ai"] {
    background:
      radial-gradient(circle at 68% 44%, rgba(232, 197, 71, 0.2), transparent 24%),
      radial-gradient(circle at 30% 80%, rgba(224, 123, 57, 0.11), transparent 28%),
      #11110f;
  }

  .work-visual-grid {
    position: absolute;
    inset: 0;
    opacity: 0.22;
    background-image:
      linear-gradient(rgba(245, 240, 232, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 240, 232, 0.08) 1px, transparent 1px);
    background-size: 32px 32px;
    mask-image: linear-gradient(135deg, black, transparent 78%);
  }

  .work-visual-top {
    position: absolute;
    z-index: 2;
    top: 1.1rem;
    left: 1.1rem;
    right: 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .work-number,
  .work-build-label {
    color: rgba(245, 240, 232, 0.62);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .work-build-label {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .work-build-label::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 12px rgba(232, 197, 71, 0.8);
  }

  .work-visual-mark {
    position: absolute;
    z-index: 2;
    left: clamp(1.2rem, 3vw, 2.2rem);
    bottom: clamp(1.2rem, 3vw, 2rem);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .work-visual-icon {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border: 1px solid rgba(232, 197, 71, 0.35);
    border-radius: 50%;
    background: rgba(12, 12, 12, 0.62);
    color: var(--gold);
    font-size: 1.1rem;
    backdrop-filter: blur(8px);
    transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
  }

  .work-card:hover .work-visual-icon {
    background: rgba(232, 197, 71, 0.12);
    transform: rotate(-8deg) scale(1.06);
  }

  .work-visual-name {
    margin: 0;
    color: rgba(245, 240, 232, 0.12);
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.7rem);
    font-style: italic;
    font-weight: 700;
    line-height: 0.9;
    letter-spacing: -0.05em;
    transition: color 0.4s ease;
  }

  .work-card:hover .work-visual-name {
    color: rgba(245, 240, 232, 0.22);
  }

  .work-card-body {
    display: flex;
    min-height: 0;
    flex: 1;
    flex-direction: column;
    padding: clamp(1.1rem, 2vw, 1.45rem);
  }

  .work-card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  .work-category,
  .work-year {
    color: var(--gold);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .work-year {
    color: #666;
  }

  .work-card-title {
    margin: 0;
    color: var(--cream);
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 2.5vw, 2.35rem);
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.035em;
  }

  .work-card-tagline {
    margin: 0.55rem 0 0;
    color: #adadad;
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .work-card-description {
    display: -webkit-box;
    margin: 1rem 0 0;
    overflow: hidden;
    color: #747474;
    font-size: 0.72rem;
    line-height: 1.65;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .work-tech {
    display: flex;
    margin: auto 0 0;
    padding: 1rem 0 0;
    flex-wrap: wrap;
    gap: 0.45rem;
    list-style: none;
  }

  .work-tech li {
    padding: 0.36rem 0.62rem;
    border: 1px solid #292929;
    border-radius: 999px;
    color: #8c8c8c;
    font-family: var(--font-mono);
    font-size: 8px;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .work-actions {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    margin-top: 1.05rem;
    padding-top: 0.9rem;
    border-top: 1px solid #242424;
  }

  .work-primary-action,
  .work-icon-action {
    display: inline-flex;
    min-height: 36px;
    align-items: center;
    justify-content: center;
    border: 1px solid #313131;
    border-radius: 999px;
    background: transparent;
    color: #a5a5a5;
    text-decoration: none;
    cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .work-primary-action {
    gap: 0.5rem;
    margin-right: auto;
    padding: 0.6rem 0.85rem;
    color: var(--cream);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .work-icon-action {
    width: 36px;
    padding: 0;
    font-size: 1rem;
  }

  .work-primary-action:hover,
  .work-primary-action:focus-visible,
  .work-icon-action:hover,
  .work-icon-action:focus-visible {
    border-color: rgba(232, 197, 71, 0.6);
    background: rgba(232, 197, 71, 0.08);
    color: var(--gold);
    outline: none;
    transform: translateY(-2px);
  }

  .work-more-wrap {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .work-more-button {
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    padding: 0.8rem 1.35rem;
    border: 1px solid rgba(232, 197, 71, 0.42);
    border-radius: 999px;
    background: rgba(20, 20, 20, 0.86);
    color: var(--cream);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: border-color 0.25s ease, background 0.25s ease, color 0.25s ease, transform 0.25s ease;
  }

  .work-more-button span {
    display: grid;
    min-width: 23px;
    height: 23px;
    place-items: center;
    border-radius: 50%;
    background: var(--gradient);
    color: #0c0c0c;
    font-size: 8px;
  }

  .work-more-button:hover,
  .work-more-button:focus-visible {
    border-color: var(--gold);
    background: rgba(232, 197, 71, 0.08);
    color: var(--gold);
    outline: none;
    transform: translateY(-2px);
  }

  .work-sr-status {
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

  @media (max-width: 1050px) {
    .work-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .work-card {
      min-height: 535px;
    }

    .work-visual {
      min-height: 225px;
    }
  }

  @media (max-width: 820px) {
    .work-head {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .work-intro {
      max-width: 620px;
    }

  }

  @media (max-width: 700px) {
    .work-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .work-section {
      padding: 6.5rem 0;
    }

    .work-shell {
      width: min(100% - 1.25rem, 1240px);
    }

    .work-toolbar {
      align-items: flex-start;
      flex-direction: column;
    }

    .work-filters {
      width: 100%;
      flex-wrap: nowrap;
    }

    .work-filter {
      min-width: 0;
      flex: 1;
      padding-inline: 0.65rem;
    }

    .work-card {
      min-height: 535px;
    }

    .work-visual {
      min-height: 225px;
    }

    .work-visual-name {
      font-size: clamp(2.1rem, 12vw, 3.25rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .work-card,
    .work-filter,
    .work-primary-action,
    .work-icon-action,
    .work-visual::before,
    .work-visual-icon {
      transition-duration: 0.01ms !important;
    }
  }
`;

function ProjectCard({ project, index, onOpen }) {
  const isAI = project.category === "ai";
  const hasPreview = Boolean(project.previewImage);
  const categoryLabel = isAI ? "AI / Machine Learning" : "Full Stack";

  return (
    <motion.article
      layout
      className="work-card"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.045, 0.22), ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`work-visual${hasPreview ? " has-image" : ""}`}
        data-category={project.category}
        data-variant={(index % 4) + 1}
      >
        {hasPreview ? (
          <img
            className="work-preview"
            src={project.previewImage}
            alt={`${project.title} interface preview`}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <div className="work-visual-grid" aria-hidden="true" />
        )}
        <div className="work-visual-top">
          <span className="work-number">Project / {String(index + 1).padStart(2, "0")}</span>
          <span className="work-build-label">Selected build</span>
        </div>
        {!hasPreview ? (
          <div className="work-visual-mark" aria-hidden="true">
            <span className="work-visual-icon">{isAI ? <FiCpu /> : <FiLayers />}</span>
            <p className="work-visual-name">{project.title}</p>
          </div>
        ) : null}
      </div>

      <div className="work-card-body">
        <div className="work-card-meta">
          <span className="work-category">{categoryLabel}</span>
          <span className="work-year">{project.year}</span>
        </div>
        <h3 className="work-card-title">{project.title}</h3>
        <p className="work-card-tagline">{project.tagline}</p>
        <p className="work-card-description">{project.description}</p>

        <ul className="work-tech" aria-label={`${project.title} technologies`}>
          {project.techStack.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="work-actions">
          <button type="button" className="work-primary-action" onClick={() => onOpen(project.path)}>
            Case study <FiArrowUpRight aria-hidden="true" />
          </button>
          <a
            className="work-icon-action"
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            title="View GitHub repository"
          >
            <FiGithub aria-hidden="true" />
          </a>
          {project.liveDemo ? (
            <a
              className="work-icon-action"
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} live demo`}
              title="Open live demo"
            >
              <FiArrowUpRight aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const visibleProjects = useMemo(
    () => {
      const filteredProjects =
        activeFilter === "all"
          ? projectData
          : projectData.filter((project) => project.category === activeFilter);

      return prioritizeProjects(filteredProjects);
    },
    [activeFilter],
  );

  const displayedProjects = showAllProjects ? visibleProjects : visibleProjects.slice(0, 6);
  const remainingProjects = visibleProjects.length - displayedProjects.length;

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setShowAllProjects(false);
  };

  return (
    <section id="projects" className="work-section" aria-labelledby="work-heading">
      <style>{PROJECTS_STYLES}</style>
      <div className="work-shell">
        <header className="work-head">
          <div>
            <p className="work-kicker">Selected work</p>
            <h2 id="work-heading" className="work-heading">
              Ideas turned into <span>working products.</span>
            </h2>
          </div>
          <p className="work-intro">
            A collection of full-stack platforms and intelligent systems—designed, engineered, and shipped from first idea to final interface.
          </p>
        </header>

        <div className="work-toolbar">
          <div className="work-filters" aria-label="Filter projects">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`work-filter${activeFilter === filter.id ? " is-active" : ""}`}
                aria-pressed={activeFilter === filter.id}
                onClick={() => handleFilterChange(filter.id)}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
          <div className="work-result-count" aria-hidden="true">
            Showing <strong>{String(visibleProjects.length).padStart(2, "0")}</strong>
          </div>
        </div>

        <p className="work-sr-status" aria-live="polite">
          Showing {displayedProjects.length} of {visibleProjects.length} {activeFilter === "all" ? "total" : activeFilter} projects.
        </p>

        <motion.div layout className="work-grid">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={navigate} />
            ))}
          </AnimatePresence>
        </motion.div>

        {remainingProjects > 0 ? (
          <motion.div className="work-more-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button type="button" className="work-more-button" onClick={() => setShowAllProjects(true)}>
              Show More <span>+{remainingProjects}</span>
            </button>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

export default Projects;
