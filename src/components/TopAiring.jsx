// src/components/TopAiring.jsx
import React from "react";
import Filters from "./Filters";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function TopAiring({ filteredAnime, genre, setGenre, selectedAnime, onShowDetails, onBack }) {
  return (
    <div>
      <Filters genre={genre} setGenre={setGenre} />
      
      {selectedAnime ? (
        <AnimeDetails anime={selectedAnime} onBack={onBack} />
      ) : filteredAnime.length ? (
        <div className="flex flex-wrap justify-center gap-4 w-full">
          {filteredAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} onShowDetails={onShowDetails} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-gray-400">No anime found</p>
      )}
    </div>
  );
}
