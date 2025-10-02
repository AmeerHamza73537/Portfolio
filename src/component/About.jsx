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
      <h1 className="text-center mb-12 text-5xl md:text-6xl lg:text-7xl text-[#6D6A6A] font-bold">
        ABOUT ME
      </h1>

      <div className="about-content flex flex-col lg:flex-row items-center gap-10 lg:gap-16 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Image Section */}
        <div className="image flex justify-center w-full lg:w-1/2">
          <img 
            src={about} 
            alt="About" 
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="text-lg md:text-xl leading-relaxed text-white">
            I’m Ameer Hamza, a <b>Full-Stack Software Engineer</b> passionate about solving 
            problems through technology and building fast, reliable, and user-centric products. 
            With expertise in React.js, Node.js, MongoDB, and Express.js.
          </p>
          <br />
          <p className="text-lg md:text-xl leading-relaxed text-white">
            <b>What sets me apart:</b> I don't just code, I build solutions. Problem-solving is 
            at the core of my work. I approach every project by deeply understanding user needs 
            and business goals, then engineering scalable, high-performance solutions that truly 
            make a difference.
          </p>
        </div>

      </div>
    </>
  )
}

export default About
