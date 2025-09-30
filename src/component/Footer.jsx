import React from "react";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <footer className=" border-t border-[#3c3736] text-gray-400 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Icons */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/AmeerHamza73537"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-purple-600 transition"
            >
              <FiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/ameer-hamza-63a128353/"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-purple-600 transition"
            >
              <FiLinkedin />
            </a>
            <a
              href="mailto:contacthamza456@gmail.com"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-purple-600 transition"
            >
              <IoMailOutline /> 
            </a>
            <a
              href="https://leetcode.com/u/hamza756/"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-purple-600 transition"
            >
              <SiLeetcode />
            </a>
          </div>

          {/* Divider with dot */}
          <div className="flex items-center space-x-3">
            <span className="w-32 h-px bg-gray-700"></span>
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            <span className="w-32 h-px bg-gray-700"></span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © 2025 <span className="text-purple-500">Ameer Hamza</span>. All
            Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
