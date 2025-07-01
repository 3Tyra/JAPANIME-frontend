import React, { useState, useEffect } from "react";

export default function Header({ anime, query, setQuery, onSearch, onWatchTrailer }) {
  const [currentAnime, setCurrentAnime] = useState(anime);
  const [animationClass, setAnimationClass] = useState("slide-in");

  useEffect(() => {
    if (!anime || anime.mal_id === currentAnime?.mal_id) return;

    // Slide out old anime
    setAnimationClass("slide-out");

    // After animation ends, switch to new anime and slide in
    const timeout = setTimeout(() => {
      setCurrentAnime(anime);
      setAnimationClass("slide-in");
    }, 600); // 600ms must match CSS animation duration

    return () => clearTimeout(timeout);
  }, [anime, currentAnime?.mal_id]);


  if (!currentAnime) return null;

  return (
    <header
      className={`${animationClass} relative flex justify-center items-center px-6 sm:px-16 lg:px-24 py-10 mb-10 mx-auto rounded-2xl`}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.4)), url(${currentAnime.images?.jpg?.large_image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "600px",
        maxWidth: "1200px",
      }}
    >
      <div className="text-white w-full max-w-3xl text-left">
        <h1 className="font-bangers text-5xl mb-4">
          {currentAnime.title_english || currentAnime.title}
        </h1>

        <p className="mb-4 text-lg font-light line-clamp-4">
          {currentAnime.synopsis || "No synopsis available."}
        </p>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {currentAnime.genres?.map((g) => (
            <span
              key={g.mal_id || g.name}
              className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm">
            {currentAnime.score ? currentAnime.score.toFixed(1) : "N/A"} ⭐
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-md px-4 py-2 w-64 text-black"
            />
            <button
              onClick={onSearch}
              className="bg-blue-500 hover:bg-blue-600 px-4 rounded-md text-white"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
