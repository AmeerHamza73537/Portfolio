import React, { useLayoutEffect, useRef } from "react";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Opacity only — y stagger left icons at different translateY (jagged row) */
      gsap.from(".footer-icon", {
        autoAlpha: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer",
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer site-footer overflow-x-visible bg-[#0c0c0c] border-t border-[#1e1e1e] text-[#7a7a7a] py-10 section-divider">
      <div className="flex flex-col items-center space-y-6 overflow-visible">
        <div className="footer-icons-row">
          <a
            href="https://github.com/AmeerHamza73537"
            className="footer-icon animate-on-scroll"
            aria-label="GitHub"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ameer-hamza-63a128353/"
            className="footer-icon animate-on-scroll"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:contacthamza456@gmail.com"
            className="footer-icon animate-on-scroll"
            aria-label="Email"
          >
            <IoMailOutline className="w-5 h-5" />
          </a>
          <a
            href="https://leetcode.com/u/hamza756/"
            className="footer-icon animate-on-scroll"
            aria-label="LeetCode"
          >
            <SiLeetcode className="w-5 h-5" />
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <span className="w-32 h-px bg-[#242424]" />
          <span className="w-2 h-2 rounded-sm bg-[#e8c547]" />
          <span className="w-32 h-px bg-[#242424]" />
        </div>

        <p className="footer-copy text-sm text-[#7a7a7a] font-['DM_Sans',sans-serif] text-center">
          © 2026 <span className="text-[#e8c547] inline-block">Ameer Hamza</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
