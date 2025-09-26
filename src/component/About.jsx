import React from 'react'
import about from  '../assets/about.png'
const About = () => {
  return (
    <>
        <h1 className='text-center mb-8 text-7xl text-[#6D6A6A]'><b>ABOUT ME</b></h1>
        <div className='about-content flex justify-around items-center'>
            <div className='image'>
                <img src={about} alt="" />
            </div>
            <div className='p-7'>
                <p className='text-2xl'>I’m Ameer Hamza, a <b>Full-Stack Software Engineer</b> passionate about solving problems through technology and building fast, reliable, and user-centric products. With expertise in React.js, Node.js, MongoDB, and Express.js.
                <br />
                <br />
<b>What sets me apart:</b> I don't just code, I build solutions. Problem-solving is at the core of my work. I approach every project by deeply understanding user needs and business goals, then engineering scalable, high-performance solutions that truly make a difference. </p>
            </div>
        </div>
    </>
  )
}

export default About
