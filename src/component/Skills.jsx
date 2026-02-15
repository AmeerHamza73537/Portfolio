import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "ExpressJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
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

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center 
                 py-12 sm:py-16 md:py-20 text-white overflow-hidden"
      id="skills"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Responsive Background Heading */}
        <h1
          className="absolute 
                     top-[-80px] sm:top-[-120px] md:top-[-160px] lg:top-[-200px]
                     left-1/2 -translate-x-1/2 
                     text-[60px] sm:text-[100px] md:text-[160px] lg:text-[220px] xl:text-[260px]
                     font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-purple-600 to-indigo-600 
                     select-none pointer-events-none whitespace-nowrap 
                     opacity-20 sm:opacity-25 md:opacity-30 z-0"
        >
          TECH STACK
        </h1>

        {/* Fully Responsive Grid */}
        <div
          className="grid 
                     grid-cols-2 
                     xs:grid-cols-2 
                     sm:grid-cols-3 
                     md:grid-cols-4 
                     lg:grid-cols-5 
                     xl:grid-cols-6 
                     gap-4 sm:gap-6 md:gap-8 
                     place-items-center relative z-10"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              style={{ transformPerspective: 1000 }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 8;
                const rotateY = ((x - centerX) / centerX) * 8;

                card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
              }}
              className="flex flex-col items-center justify-center
                         w-20 h-20
                         sm:w-24 sm:h-24
                         md:w-28 md:h-28
                         lg:w-32 lg:h-32
                         bg-[#111]/30 backdrop-blur-lg rounded-2xl 
                         border border-white/10 
                         hover:bg-blue-900/40 hover:border-blue-400 
                         shadow-md shadow-purple-900/20 
                         transition-all duration-500 cursor-pointer"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-6 h-6 
                           sm:w-8 sm:h-8 
                           md:w-10 md:h-10 
                           lg:w-12 lg:h-12 
                           transition-transform duration-500 hover:scale-110"
              />
              <span className="text-[10px] sm:text-xs md:text-sm mt-1 sm:mt-2 text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
