import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    {name: 'Home', id: 'home'},
    {name: 'About', id: 'about'},
    {name: 'Skill', id: 'skills'},
    {name: 'Projects', id: 'projects'},
    {name: 'Contact', id: 'contact'},
  ]
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id)=>{
    const section = document.getElementById(id)
    if(section){
      section.scrollIntoView({behavior: 'smooth'})
    }
  }

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center text-white">
        {/* Logo */}
        <p className="text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-blue-400 cursor-pointer">
          Portfolio
        </p>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-gray-300 font-medium">
          {links.map((item, i) => (
            <li
              key={i}
              className="cursor-pointer relative overflow-hidden px-3 py-1 rounded-md transition-all duration-500 group"
              id={item.name}
              onClick={()=>{
                scrollToSection(item.id)
                setMenuOpen(false)
              }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {item.name}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 group-hover:animate-[slide-bg_0.6s_ease-in-out_forwards] rounded-md"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-gray-300 text-3xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 border-t border-white/10 text-gray-300 flex flex-col items-center gap-6 py-6 transition-all duration-500">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item, i) => (
            <div
              key={i}
              className="w-[80%] text-center px-3 py-2 rounded-md bg-neutral-900 hover:bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 transition-all duration-500"
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Gradient Animation */}
      <style>{`
        @keyframes slide-bg {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
