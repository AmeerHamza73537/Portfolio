import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import about from "../assets/about.png";

const About = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-photo-target", {
        x: -80,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
      });
      gsap.from(".about-text-target", {
        x: 80,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative section-pad section-divider overflow-hidden" id="about">
      <div className="site-container">
        <p className="font-mono-label mb-8 md:mb-10">— 01. ABOUT ME</p>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center about-photo-target">
            <div className="about-photo-frame">
              <img src={about} alt="About" />
            </div>
          </div>

          <div
            className="about-text-target w-full lg:w-1/2 text-[#7a7a7a] leading-relaxed text-base sm:text-lg md:text-xl space-y-5 sm:space-y-6 text-center lg:text-left"
          >
            <p className="text-[#f5f0e8]">
              I’m <b className="text-accent">Ameer Hamza</b>, a{" "}
              <b className="text-accent">Full-Stack Software Engineer</b> passionate about solving
              problems through technology and building fast, reliable, and user-centric products.
              With expertise in React.js, Node.js, MongoDB, and Express.js.
            </p>

            <p className="text-[#f5f0e8]">
              <b className="text-accent-2">What sets me apart:</b> I don't just code, I build{" "}
              <b className="text-accent">solutions</b>. Problem-solving is at the core of my work. I
              approach every project by deeply understanding user needs and business goals, then
              engineering scalable, high-performance solutions that truly make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
