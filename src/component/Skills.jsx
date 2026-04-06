import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Skills = () => {
  const rootRef = useRef(null);

  const skills = [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "ExpressJS", isBadge: true },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "NextJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind CSS", icon: "./src/assets/image.png" },
    { name: "Shadcn", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" },
    { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
    { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#skills .font-mono-label", {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#skills",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      gsap.from(".skill-card", {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.06,
        duration: 0.7,
        ease: "back.out(1.4)",
        immediateRender: false,
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex flex-col justify-center section-pad section-divider text-[#f5f0e8] overflow-hidden"
      id="skills"
    >
      <div className="site-container relative z-10 w-full">
        <p className="font-mono-label mb-10 md:mb-12 animate-on-scroll">— 02. MY STACK</p>

        <div className="skills-grid-wrap">
          <div className="skills-flex skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card animate-on-scroll">
                <div className="skill-card-body">
                  <div className="skill-icon-wrap">
                    {skill.isBadge ? (
                      <span className="skill-express-badge">ExpressJS</span>
                    ) : (
                      <img src={skill.icon} alt="" />
                    )}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
