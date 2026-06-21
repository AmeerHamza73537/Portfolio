import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
      { name: "Tailwind CSS", icon: "/src/assets/image.png" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "GSAP", customIcon: "gsap" },
      { name: "Framer Motion", customIcon: "framer" },
      { name: "Shadcn", customIcon: "shadcn" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
      { name: "Vercel", customIcon: "vercel" },
      { name: "Postman", customIcon: "postman" },
    ],
  },
];

const CustomIcon = ({ type, size = 40 }) => {
  if (type === "gsap") return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#0ae448" />
      <path d="M25 68 L50 22 L75 68" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (type === "framer") return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" rx="18" fill="#0055ff" />
      <text x="50" y="68" fontSize="54" textAnchor="middle" fill="white" fontWeight="bold">M</text>
    </svg>
  );
  if (type === "shadcn") return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" rx="10" fill="#1c1c1c" stroke="#555" strokeWidth="5" />
      <text x="50" y="66" fontSize="38" textAnchor="middle" fill="#e2e2e2" fontWeight="bold" fontFamily="monospace">/</text>
    </svg>
  );
  if (type === "vercel") return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#000" />
      <text x="50" y="63" fontSize="36" textAnchor="middle" fill="white" fontWeight="bold" fontFamily="sans-serif">▲</text>
    </svg>
  );
  if (type === "postman") return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <rect width="100" height="100" rx="12" fill="#ef5b25" />
      <text x="50" y="68" fontSize="50" textAnchor="middle" fill="white" fontWeight="bold">P</text>
    </svg>
  );
  return null;
};

const Chip = ({ name, icon, invert, customIcon }) => {
  const chipRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(chipRef.current, { y: -4, duration: 0.25, ease: "power2.out" });
    gsap.to(chipRef.current.querySelector(".chip-icon"), { rotate: 10, scale: 1.2, duration: 0.25, ease: "power2.out" });
    gsap.to(chipRef.current.querySelector(".chip-text"), { color: "#c9972c", duration: 0.2 });
  };

  const handleMouseLeave = () => {
    gsap.to(chipRef.current, { y: 0, duration: 0.3, ease: "power2.inOut" });
    gsap.to(chipRef.current.querySelector(".chip-icon"), { rotate: 0, scale: 1, duration: 0.3, ease: "power2.inOut" });
    gsap.to(chipRef.current.querySelector(".chip-text"), { color: "#999", duration: 0.2 });
  };

  return (
    <div className="chip" ref={chipRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className="chip-icon">
        {customIcon ? (
          <CustomIcon type={customIcon} size={40} />
        ) : (
          <img src={icon} alt={name} style={{ width: 40, height: 40, objectFit: "contain", filter: invert ? "invert(1)" : "none", display: "block" }} />
        )}
      </span>
      <span className="chip-text">{name}</span>
    </div>
  );
};

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    // Small timeout ensures DOM is painted before GSAP reads positions
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        gsap.fromTo(labelRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: labelRef.current, start: "top 90%" },
          }
        );

        rowRefs.current.forEach((row) => {
          if (!row) return;
          const title = row.querySelector(".cat-title");
          const chips = row.querySelectorAll(".chip");

          gsap.fromTo(title,
            { opacity: 0, x: -40 },
            {
              opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
              scrollTrigger: { trigger: row, start: "top 88%" },
            }
          );

          gsap.fromTo(chips,
            { opacity: 0, y: 16 },
            {
              opacity: 1, y: 0, duration: 0.45, ease: "power3.out", stagger: 0.05,
              scrollTrigger: { trigger: row, start: "top 88%" },
            }
          );
        });

      }, sectionRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0f0f0f", padding: "80px 60px", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .sec-label {
          color: #c9972c;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 400;
          margin-bottom: 48px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cat-container {
          display: flex;
          padding: 48px 0;
          border-bottom: 1px solid #1e1e1e;
          align-items: center;
          gap: 200px;
        }

        .cat-container:first-of-type {
          border-top: 1px solid #1e1e1e;
        }

        .cat-title {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0;
          width: 180px;
          flex-shrink: 0;
        }

        .chips-wrap {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          gap: 28px 48px;
          align-items: center;
        }

        .chip {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: default;
        }

        .chip-icon {
          display: flex;
          align-items: center;
          transform-origin: center;
        }

        .chip-text {
          font-size: 20px;
          color: #999;
          white-space: nowrap;
          font-weight: 400;
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 768px) {
          .skills-section-inner {
            padding: 60px 24px !important;
          }
          .cat-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding: 36px 0;
          }
          .cat-title {
            width: auto;
            font-size: 18px;
          }
          .chips-wrap {
            gap: 20px 32px;
          }
          .chip-text {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .chips-wrap {
            gap: 16px 24px;
          }
          .chip-text {
            font-size: 12px;
          }
        }
      `}</style>

      <div className="sec-label" ref={labelRef}>— 02. My Stack</div>

      <div>
        {skills.map((group, i) => (
          <div
            key={group.category}
            className="cat-container"
            ref={(el) => (rowRefs.current[i] = el)}
          >
            <p className="cat-title">{group.category}</p>
            <div className="chips-wrap">
              {group.items.map((item) => (
                <Chip key={item.name} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
