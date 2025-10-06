import React from "react";
import { TbFileCv } from "react-icons/tb";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
    >
      {/* Falling Particles Canvas (Already in your project) */}
      <canvas
        id="bg-canvas"
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      ></canvas>

      {/* Subtle Glow Overlay */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-700/20 blur-[160px] rounded-full top-1/3 left-1/2 -translate-x-1/2 -z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-3xl">
        <p className="text-indigo-400 text-lg sm:text-xl font-medium tracking-wide mb-2">
          Hi! I am
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(79,70,229,0.4)]">
          Ameer Hamza
        </h1>

        <h5 className="text-2xl sm:text-3xl text-indigo-300 mt-3 font-semibold">
          A Software Engineer
        </h5>

        <p className="my-4 text-gray-400 text-base sm:text-lg leading-relaxed">
          Turning ideas into products through creative engineering — focused on
          solving real problems with clean, efficient execution.
        </p>
        
      </div>
      {/* <div className="flex items-center justify-evenly bg-gradient-to-r from-indigo-700 to-purple-700 w-full sm:w-auto py-3 px-6 rounded-xl text-white font-semibold duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/40">
        <a 
          href=""
          className=""
          >Download Resume        
        </a>
        <TbFileCv className="hidden"/>
      </div> */}
      <a
  href="/resume.pdf"
  download="Ameer-Hamza-Resume.pdf"
  className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium overflow-hidden group transition-all duration-500"
>
  <span className="block transition-all duration-500 group-hover:translate-x-[-150%] group-hover:opacity-0">
    Download Resume
  </span>
  <span className="absolute inset-0 flex justify-center items-center text-sm opacity-0 translate-x-full transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
    Click to Get My CV 🚀
  </span>
</a>
    </section>
  );
};

export default Home;
