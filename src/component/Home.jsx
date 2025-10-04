import React from "react";

const Home = () => {
  return (
    <section
      id="hero"
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

        <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
          Turning ideas into products through creative engineering — focused on
          solving real problems with clean, efficient execution.
        </p>
      </div>
    </section>
  );
};

export default Home;
