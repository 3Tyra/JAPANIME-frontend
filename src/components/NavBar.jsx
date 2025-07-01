import React from "react";
import { FaDiscord } from "react-icons/fa";

export default function NavBar({ currentPage, setCurrentPage, userProfile }) {
  const links = [
    "Home",
    "Anime",
    "Genres",
    "Top Airing",
    "Most popular",
    "Upcoming",
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md text-white shadow-md sticky top-0 z-50 animate-slide-down">
      <div className="flex items-center gap-2 text-pink-500 text-3xl font-extrabold tracking-wide select-none">
        <img
          src="/apple-touch-icon.png" // make sure the logo image is in your public/ folder
          alt="Japanime Logo"
          className="w-15 h-12 "
        />
        <span>
          <span className="text-white">JAP</span>ANIME
        </span>
      </div>

      <ul className="hidden md:flex gap-6 text-sm font-semibold">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => setCurrentPage(link)}
              className={`relative transition-all duration-200 hover:text-pink-400 ${
                currentPage === link ? "text-pink-500 font-bold" : ""
              }`}
            >
              {link}
              {currentPage === link && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 rounded animate-pulse"></span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 items-center">
        <div
          className="text-xl cursor-pointer transition-transform duration-300 hover:scale-110 hover:text-pink-400"
          aria-label="Discord"
        >
          <FaDiscord />
        </div>

        {/* Always show profile photo or default */}
        <img
          src={userProfile?.profile_photo || "/default-profile.png"}
          alt="Profile"
          onClick={() => setCurrentPage("Profile")}
          className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </nav>
  );
}
