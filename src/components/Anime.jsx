import React from "react";
import Filters from "./Filters";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function Anime({
  filteredAnime = [],
  genre,
  setGenre,
  selectedAnime,
  onShowDetails,
  onBack,
}) {
  // Deduplicate to avoid duplicate keys
  const uniqueAnime = Array.from(new Map(filteredAnime.map(anime => [anime.mal_id, anime])).values());

  return (
    <>
      <Filters genre={genre} setGenre={setGenre} />
      {selectedAnime ? (
        <AnimeDetails anime={selectedAnime} onBack={onBack} />
      ) : (
        <div id="anime-list" className="flex flex-wrap justify-center gap-4 w-full">
          {uniqueAnime.length ? (
            uniqueAnime.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} onShowDetails={onShowDetails} />
            ))
          ) : (
            <p className="mt-10 text-gray-400">No anime found</p>
          )}
        </div>
      )}
    </>
  );
}
