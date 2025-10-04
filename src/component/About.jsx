// import React from 'react'
// import about from  '../assets/about.png'
// const About = () => {
//   return (
//     <>
//         <h1 className='text-center mb-8 text-7xl text-[#6D6A6A]'><b>ABOUT ME</b></h1>
//         <div className='about-content flex items-center border'>
//             <div className='image border'>
//                 <img src={about} alt="" />
//             </div>
//             <div className='border py-10'>
//                 <span className='text-xl'>I’m Ameer Hamza, a <b>Full-Stack Software Engineer</b> passionate about solving problems through technology and building fast, reliable, and user-centric products. With expertise in React.js, Node.js, MongoDB, and Express.js.
//                 <br />
//                 <br />
// <b>What sets me apart:</b> I don't just code, I build solutions. Problem-solving is at the core of my work. I approach every project by deeply understanding user needs and business goals, then engineering scalable, high-performance solutions that truly make a difference. </span>
//             </div>
//         </div>
//     </>
//   )
// }

// export default About
import React from 'react'
import about from '../assets/about.png'

const About = () => {
  return (
    <>
      <section className='relative py-20 px-4 md:px-12'>
        <h1 className="text-center mb-16 text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 tracking-wide">
        ABOUT ME
      </h1>

      <div className="about-content flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Image Section */}
        <div className="image w-full md:w-1/2 flex justify-center">
          <img 
            src={about} 
            alt="About" 
            // className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full h-auto object-contain"
            className='rounded-3xl shadow-2xl shadow-purple-800/30 hover:scale-105 transition-transform duration-700 object-cover max-w-[400px] md:max-w-[500px]'
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-gray-300 leading-relaxed text-lg md:text-xl space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-white">
            I’m Ameer Hamza, a <b className='text-purple-400'>Full-Stack Software Engineer</b> passionate about solving 
            problems through technology and building fast, reliable, and user-centric products. 
            With expertise in React.js, Node.js, MongoDB, and Express.js.
          </p>
          <br />
          <p className="text-lg md:text-xl leading-relaxed text-white">
            <b className='text-indigo-400'>What sets me apart:</b> I don't just code, I build <b className="text-purple-400">solutions</b>. Problem-solving is 
            at the core of my work. I approach every project by deeply understanding user needs 
            and business goals, then engineering scalable, high-performance solutions that truly 
            make a difference.
          </p>
        </div>

      </div>
      </section>
    </>
  )
}

export default About
