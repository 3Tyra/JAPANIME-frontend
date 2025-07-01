import React from "react";
import Header from "./Header";
import AnimeCard from "./AnimeCard";
import AnimeDetails from "./AnimeDetails";

export default function Home({
  filteredAnime = [],
  homeCarouselIndex = 0,
  query,
  setQuery,
  onSearch,
  selectedAnime,
  onShowDetails,
  onBack,
}) {
  // Convert mal_id to string to ensure consistent keys and deduplicate
  const uniqueAnime = Array.from(
    new Map(
      filteredAnime.map((anime) => [String(anime.mal_id), anime])
    ).values()
  );

  // Debugging duplicate keys (optional)
  /*
  const keys = filteredAnime.map((a) => a.mal_id);
  const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
  console.log("Duplicate keys in filteredAnime:", duplicates);
  */

  return (
    <>
      <Header
        anime={uniqueAnime.length > 0 ? uniqueAnime[homeCarouselIndex] : null}
        query={query}
        setQuery={setQuery}
        onSearch={onSearch}
        onWatchTrailer={() => {
          if (uniqueAnime.length > 0) {
            onShowDetails(uniqueAnime[homeCarouselIndex].mal_id);
          }
        }}
      />

      {selectedAnime ? (
        <AnimeDetails anime={selectedAnime} onBack={onBack} />
      ) : query.trim() && uniqueAnime.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 w-full" id="search-results">
          {uniqueAnime.map((anime) => (
            <AnimeCard key={String(anime.mal_id)} anime={anime} onShowDetails={onShowDetails} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full" id="home-anime-list">
          {uniqueAnime.map((anime) => (
            <AnimeCard key={String(anime.mal_id)} anime={anime} onShowDetails={onShowDetails} />
          ))}
        </div>
      )}
    </>
  );
}
