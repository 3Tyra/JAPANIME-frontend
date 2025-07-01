// src/components/Genres.jsx
import React from "react";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function Genres({ genreSections, selectedAnime, onShowDetails, onBack }) {
  return (
    <div className="space-y-16 px-6">
      {Object.entries(genreSections).map(([genreName, animes]) => (
        <div key={genreName} className="text-left">
          <h2 className="text-2xl font-bold mb-4 text-pink-400">{genreName}</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide">
            {animes.slice(0, 12).map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onShowDetails={onShowDetails}
              />
            ))}
          </div>
        </div>
      ))}

      {selectedAnime && (
        <AnimeDetails anime={selectedAnime} onBack={onBack} />
      )}
    </div>
  );
}
