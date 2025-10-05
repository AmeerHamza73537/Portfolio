import React from 'react'

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
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Framer Motion", icon: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png" },
  { name: "Shadcn", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
  { name: "Zustand", icon: "https://raw.githubusercontent.com/pmndrs/zustand/main/examples/demo/public/favicon.ico" },
  { name: "Zod", icon: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Vercel", icon: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
  { name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "pnpm", icon: "https://seeklogo.com/images/P/pnpm-logo-AD1B2C9B4C-seeklogo.com.png" },
];
  
    return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center py-16 text-white" id='skills'>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h1 className="text-center mb-16 text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wide">
        TECH STACK
      </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 place-items-center transform transition duration-700 ease-out hover:translate-y-[-4px]">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 bg-neutral-900/90 rounded-2xl shadow-md shadow-purple-900/20 hover:shadow-purple-700/30 transition-all duration-500 hover:-translate-y-1 hover:bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a]"
            >
              <img src={skill.icon} alt={skill.name} className="w-7 h-7 transition-transform duration-500 group-hover:scale-110" />
              <span className="text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default Skills