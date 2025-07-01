import React from "react";

export default function AnimeCard({ anime, onShowDetails }) {
  const title = anime.title_english || anime.title;

  return (
    <div
      className="
        w-64 h-[460px] rounded-xl bg-gray-800 p-4 text-center cursor-pointer
        transform transition-transform duration-500 hover:scale-105 hover:rotate-1
        hover:shadow-lg shadow-pink-500/30
        animate-slide-in animate-pulse-outline
      "
      onClick={() => onShowDetails(anime.mal_id)}
    >
      <img
        src={anime.images.jpg.image_url}
        alt={title}
        className="rounded-lg mb-2 w-full h-[300px] object-cover"
        draggable={false}
      />
      <h3 className="text-white font-semibold text-md truncate">{title}</h3>
      <p className="text-pink-400 text-sm">⭐ {anime.score || "N/A"}</p>
      <button
        className="mt-2 bg-pink-600 hover:bg-pink-700 text-white rounded px-4 py-1 text-sm"
        onClick={(e) => {
          e.stopPropagation();
          onShowDetails(anime.mal_id);
        }}
      >
        View Details & Watch Trailer
      </button>
    </div>
  );
}
