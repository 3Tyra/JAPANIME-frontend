// src/components/MostPopular.jsx
import React from "react";
import Filters from "./Filters";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function MostPopular({
  mostPopularAnime,
  genre,
  setGenre,
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
        <div id="most-popular-list" className="flex flex-wrap justify-center gap-4 w-full">
          {mostPopularAnime.length ? (
            mostPopularAnime.map((anime) => (
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
