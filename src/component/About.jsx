import React from 'react'
import { motion } from 'framer-motion'
import about from '../assets/about.png'

const About = () => {
  return (
    <section 
      className="relative min-h-screen py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 overflow-hidden" 
      id="about"
    >
      
      {/* Big background heading */}
      <h1 className="absolute top-[-30px] sm:top-[-50px] md:top-[-60px] 
      left-1/2 -translate-x-1/2 
      text-[70px] sm:text-[110px] md:text-[160px] lg:text-[220px] 
      font-extrabold text-transparent bg-clip-text 
      bg-gradient-to-r from-purple-600 to-indigo-600 
      select-none pointer-events-none whitespace-nowrap 
      z-0 opacity-20 sm:opacity-25 md:opacity-30">
        ABOUT ME
      </h1>

      <div className="about-content 
      flex flex-col lg:flex-row 
      items-center 
      gap-10 lg:gap-16 
      max-w-7xl mx-auto 
      px-4 sm:px-6 md:px-12 lg:px-20 
      relative z-10">

        {/* Image Section */}
        <motion.div 
          className="image w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img 
            src={about} 
            alt="About" 
            className="rounded-3xl 
            shadow-2xl shadow-purple-800/30 
            hover:scale-105 
            transition-transform duration-700 
            object-cover 
            w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] xl:w-[520px]" 
          />
        </motion.div>

        {/* Text Section */}
        <motion.div 
          className="w-full lg:w-1/2 
          text-gray-300 
          leading-relaxed 
          text-base sm:text-lg md:text-xl 
          space-y-5 sm:space-y-6 
          text-center lg:text-left"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-white">
            I’m <b className="text-purple-400">Ameer Hamza</b>, a <b className='text-purple-400'>Full-Stack Software Engineer</b> passionate about solving 
            problems through technology and building fast, reliable, and user-centric products. 
            With expertise in React.js, Node.js, MongoDB, and Express.js.
          </p>

          <p className="text-white">
            <b className='text-indigo-400'>What sets me apart:</b> I don't just code, I build <b className="text-purple-400">solutions</b>. Problem-solving is 
            at the core of my work. I approach every project by deeply understanding user needs 
            and business goals, then engineering scalable, high-performance solutions that truly 
            make a difference.
          </p>
        </motion.div>

      </div>
    </section>
  )
}

export default About
