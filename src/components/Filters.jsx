import React from "react";

// List of anime genres
const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Horror", "Romance", "Sci-Fi", "Slice of Life",
  "Sports", "Supernatural", "Thriller"
];

// This component lets users choose a genre to filter anime
export default function Filters({ genre, setGenre }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 my-6">
      
      {/* Button to show all genres */}
      <button
        onClick={() => setGenre("")}
        className={`px-4 py-2 rounded-full font-semibold ${
          genre === "" ? "bg-pink-600 text-white" : "bg-gray-700 text-gray-300"
        }`}
      >
        All
      </button>

      {/* Create a button for each genre */}
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => setGenre(g)}
          className={`px-4 py-2 rounded-full font-semibold ${
            genre === g ? "bg-pink-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
