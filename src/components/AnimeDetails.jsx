import React from "react";

export default function AnimeDetails({ anime, onBack }) {
  if (!anime) return null;

  const title = anime.title_english || anime.title;

  return (
    <div
      className="max-w-4xl mx-auto p-6 mt-8 bg-gray-800 text-white rounded-lg shadow-lg
                 animate-fade-in"
    >
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded transition duration-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4 text-sm text-gray-300">
        {anime.synopsis || "No synopsis available."}
      </p>

      {anime.trailer?.embed_url ? (
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src={anime.trailer.embed_url}
            title={`Trailer for ${title}`}
            allowFullScreen
            className="w-full h-64 rounded-lg transition-all duration-500"
          ></iframe>
        </div>
      ) : (
        <p className="italic text-gray-400 mb-4">Trailer not available.</p>
      )}

      <div className="text-left space-y-1 text-sm">
        <p><strong>Score:</strong> {anime.score || "N/A"}</p>
        <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
        <p><strong>Status:</strong> {anime.status || "N/A"}</p>
        <p><strong>Genres:</strong> {anime.genres?.map((g) => g.name).join(", ") || "N/A"}</p>
        <p><strong>Rating:</strong> {anime.rating || "N/A"}</p>
      </div>
    </div>
  );
}
