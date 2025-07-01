// src/components/Upcoming.jsx
import React from "react";
import Filters from "./Filters";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function Upcoming({
  genre,
  setGenre,
  filteredAnime,
  selectedAnime,
  onShowDetails,
  onBack,
}) {
  return (
    <>
      <Filters genre={genre} setGenre={setGenre} />
      {selectedAnime ? (
        <AnimeDetails anime={selectedAnime} onBack={onBack} />
      ) : (
        <div id="upcoming-list" className="flex flex-wrap justify-center gap-4 w-full">
          {filteredAnime.length ? (
            filteredAnime.map((anime) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                onShowDetails={onShowDetails}
              />
            ))
          ) : (
            <p className="mt-10 text-gray-400">No anime found</p>
          )}
        </div>
      )}
    </>
  );
}
