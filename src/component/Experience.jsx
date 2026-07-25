import React, { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";

function TimelineEntry({ experience, index, itemCount, progress }) {
  const threshold = itemCount > 1 ? index / (itemCount - 1) : 0;
  const isReached = useTransform(progress, (value) => value >= threshold);
  const dotColor = useTransform(isReached, (reached) =>
    reached ? "#3b82f6" : "#3f3f46",
  );
  const dotBorderColor = useTransform(isReached, (reached) =>
    reached ? "#93c5fd" : "#52525b",
  );
  const dotShadow = useTransform(isReached, (reached) =>
    reached
      ? "0 0 0 5px rgba(59, 130, 246, 0.12), 0 0 24px rgba(59, 130, 246, 0.55)"
      : "0 0 0 5px rgba(63, 63, 70, 0.12)",
  );

  const segmentStart = itemCount > 1 ? index / (itemCount - 1) : 0;
  const segmentEnd = itemCount > 1 ? (index + 1) / (itemCount - 1) : 1;
  const segmentProgress = useTransform(
    progress,
    [segmentStart, segmentEnd],
    [0, 1],
    { clamp: true },
  );

  return (
    <li className={`relative pl-12 sm:pl-16 ${index < itemCount - 1 ? "pb-10 sm:pb-14" : ""}`}>
      {index < itemCount - 1 && (
        <div
          className="absolute left-[7px] top-8 h-full w-px bg-[#303039] sm:left-[9px] sm:w-0.5"
          aria-hidden="true"
        >
          <Motion.span
            className="absolute inset-0 origin-top bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400"
            style={{ scaleY: segmentProgress }}
          />
        </div>
      )}

      <Motion.span
        className="absolute left-0 top-8 z-10 block size-[15px] -translate-y-1/2 rounded-full border-2 sm:size-[19px]"
        style={{
          backgroundColor: dotColor,
          borderColor: dotBorderColor,
          boxShadow: dotShadow,
        }}
        aria-hidden="true"
      />

      <Motion.article
        className="relative overflow-hidden rounded-xl border border-[#292929] bg-[#141414] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] transition-colors duration-300 hover:border-blue-500/30 sm:p-7"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/55 to-transparent"
          aria-hidden="true"
        />

        <header className="pr-0 sm:pr-36">
          <h3 className="text-xl font-bold leading-tight text-white sm:text-2xl">
            {experience.role}
          </h3>
          <p className="mt-1.5 text-sm text-[#929292] sm:text-base">
            {experience.company}
          </p>
        </header>

        <span className="mt-4 inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 font-mono text-[11px] font-medium tracking-wide text-blue-300 sm:absolute sm:right-6 sm:top-6 sm:mt-0">
          {experience.duration}
        </span>

        <ul className="mt-6 space-y-3" aria-label={`${experience.role} achievements`}>
          {experience.bullets.map((bullet, bulletIndex) => (
            <li
              key={`${experience.id ?? index}-bullet-${bulletIndex}`}
              className="flex gap-3 text-sm leading-7 text-[#b7b7b7] sm:text-[15px]"
            >
              <span className="mt-[0.72rem] size-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <ul
          className="mt-6 flex flex-wrap gap-2 border-t border-[#242424] pt-5"
          aria-label={`${experience.role} technology stack`}
        >
          {experience.technologies.map((technology) => (
            <li
              key={`${experience.id ?? index}-${technology}`}
              className="rounded-full border border-[#303030] bg-[#1b1b1b] px-2.5 py-1 font-mono text-[10px] tracking-wide text-[#a7a7a7] sm:text-[11px]"
            >
              {technology}
            </li>
          ))}
        </ul>
      </Motion.article>
    </li>
  );
}

export default function Experience({ experiences = [] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-pad section-divider relative overflow-hidden bg-[#0c0c0c]"
      aria-labelledby="experience-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[120px]"
        aria-hidden="true"
      />

      <div className="site-container relative">
        <p className="font-mono-label mb-4">— 03. CAREER PATH</p>
        <h2
          id="experience-heading"
          className="font-display mb-12 text-4xl font-bold text-[#f5f0e8] sm:text-5xl md:mb-16 md:text-6xl"
        >
          Experience
        </h2>

        {experiences.length > 0 ? (
          <ol className="relative m-0 list-none p-0" aria-label="Professional experience timeline">
            {experiences.map((experience, index) => (
              <TimelineEntry
                key={experience.id ?? `${experience.role}-${experience.company}-${index}`}
                experience={experience}
                index={index}
                itemCount={experiences.length}
                progress={scrollYProgress}
              />
            ))}
          </ol>
        ) : (
          <p className="rounded-xl border border-[#292929] bg-[#141414] p-6 text-[#929292]">
            Experience details will be added soon.
          </p>
        )}
      </div>
    </section>
  );
}
