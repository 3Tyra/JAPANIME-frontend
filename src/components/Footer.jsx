import React from "react";

export default function Footer() {
  return (
    <footer
      className="
        mt-12 w-full flex justify-center pb-8
        bg-transparent relative z-10
      "
    >
      <div
        className="
          animate-tilt animate-pulse-shadow
          bg-white/10
          backdrop-blur-lg
          rounded-xl
          px-8 py-6
          max-w-4xl
          text-gray-100
          border border-white/30
          cursor-default
          mx-4
          shadow-[0_0_15px_5px_rgba(255,255,255,0.3)]
          hover:shadow-[0_0_25px_10px_rgba(255,255,255,0.5)]
          transition-shadow duration-500
        "
      >
        <div className="space-y-2 text-center text-sm max-w-3xl mx-auto">
          <p>JAPANIME - Your ultimate anime streaming destination.</p>
          <p>Email: tyrajademwai@gmail.com | Privacy & Terms apply.</p>
          <p>© 2025 japanime By TYRA MWAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
