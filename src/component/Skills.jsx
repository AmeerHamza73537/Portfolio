import React from 'react'
import html from "../assets/html.png"
import css from "../assets/css.png"
import js from "../assets/js.png"
import react from "../assets/react.png"
import node from "../assets/node.png"
import express from "../assets/express.png"
import mongodb from "../assets/mongodb.png"
import git from "../assets/git.png"
import github from "../assets/github.png"
import bootstrap from "../assets/bootstrap.png"
import mysql from "../assets/mySQL.png"
import tailwind from "../assets/tailwind.png"

const Skills = () => {
  
  const skills = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "NextJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "Framer Motion", icon: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png" },
  { name: "Shadcn", icon: "https://avatars.githubusercontent.com/u/139895814?s=200&v=4" },
  { name: "NodeJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "ExpressJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
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
      <section className="py-10 text-white">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-8">Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-neutral-900 rounded-xl px-4 py-2 hover:scale-105 transition-transform"
            >
              <img src={skill.icon} alt={skill.name} className="w-6 h-6" />
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