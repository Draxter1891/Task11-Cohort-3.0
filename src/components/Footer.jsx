import React from "react";
import { ArrowRight, Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-white/80 bg-[#0b0b0b] px-6 py-8 text-center">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2">
        <p className="font-[clash] text-xl font-medium tracking-tight text-[#c7fe00]">
          SkyMart
        </p>
        <p className="font-[cabinet] text-xs text-white/35">
          &copy; {new Date().getFullYear()} SkyMart{" "}
          <span aria-hidden="true">•</span> Built with React
        </p>
        <div className="mt-3 flex items-center justify-center gap-3">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://linkedin.com/in/tripathi-rishabh"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="text-white/55 transition-colors hover:text-white/80"
          >
            Linkedin
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/draxter1891"
            aria-label="GitHub"
            title="GitHub"
            className="text-white/55 transition-colors hover:text-white/80"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
