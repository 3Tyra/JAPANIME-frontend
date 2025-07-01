import React, { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Anime from "./components/Anime";
import Genres from "./components/Genres";
import MostPopular from "./components/MostPopular";
import TopAiring from "./components/TopAiring";
import Upcoming from "./components/Upcoming";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("Login");
  const [query, setQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [mostPopularAnime, setMostPopularAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [genre, setGenre] = useState("");
  const [homeCarouselIndex, setHomeCarouselIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const queryRef = useRef(query);
  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  const fetchUserProfile = () => {
    fetch("http://localhost:5000/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch(console.error);
  };

  const updateUserProfile = (updatedData) => {
    fetch("http://localhost:5000/api/update-profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data);
      })
      .catch(console.error);
  };

  const fetchPopularAnime = () => {
    fetch(`https://api.jikan.moe/v4/top/anime?filter=bypopularity`)
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data || []);
        setFilteredAnime(data.data || []);
      })
      .catch(console.error);
  };

  const fetchMostPopularAnime = () => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity")
      .then((res) => res.json())
      .then((data) => {
        setMostPopularAnime(data.data || []);
      })
      .catch(console.error);
  };

  const fetchTopAiringAnime = () => {
    fetch("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data || []);
        setFilteredAnime(data.data || []);
      })
      .catch(console.error);
  };

  const fetchUpcomingAnime = () => {
    fetch("https://api.jikan.moe/v4/seasons/upcoming")
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data || []);
        setFilteredAnime(data.data || []);
      })
      .catch(console.error);
  };

  const debouncedSearch = useRef(
    debounce(() => {
      const currentQuery = queryRef.current.trim();
      if (!currentQuery) return;

      fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(currentQuery)}&limit=10`)
        .then((res) => res.json())
        .then((data) => {
          setFilteredAnime(data.data || []);
          setSelectedAnime(null);
        })
        .catch(console.error);
    }, 500)
  ).current;

  useEffect(() => {
    if (!isAuthenticated) return;

    setSelectedAnime(null);

    if (currentPage === "Anime" || currentPage === "Genres") {
      fetchPopularAnime();
    } else if (currentPage === "Home") {
      if (query.trim() === "") {
        fetchPopularAnime();
      } else {
        debouncedSearch();
      }
    } else if (currentPage === "Top Airing") {
      fetchTopAiringAnime();
    } else if (currentPage === "Most Popular") {
      fetchMostPopularAnime();
    } else if (currentPage === "Upcoming") {
      fetchUpcomingAnime();
    }
  }, [currentPage, query, debouncedSearch, isAuthenticated]);

  useEffect(() => {
    if (!genre) {
      setFilteredAnime(animeList);
      return;
    }
    const filtered = animeList.filter((anime) =>
      anime.genres?.some((g) => g.name.toLowerCase() === genre.toLowerCase())
    );
    setFilteredAnime(filtered);
  }, [genre, animeList]);

  useEffect(() => {
    if (currentPage !== "Home" || filteredAnime.length === 0) return;
    const interval = setInterval(() => {
      setHomeCarouselIndex((prev) => (prev + 1) % filteredAnime.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentPage, filteredAnime]);

  const showDetails = (id) => {
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedAnime(data.data);
        setCurrentPage("Anime");
      })
      .catch(console.error);
  };

  const goBack = () => {
    setSelectedAnime(null);
  };

  const genreSections = animeList.reduce((acc, anime) => {
    anime.genres?.forEach((g) => {
      if (!acc[g.name]) acc[g.name] = [];
      acc[g.name].push(anime);
    });
    return acc;
  }, {});

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchUserProfile();
    setCurrentPage("Home");
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    fetchUserProfile();
    setCurrentPage("Home");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setUserProfile(null);
    setCurrentPage("Login");
    setSelectedAnime(null);
  };

  return (
    <div className="bg-[#14141f] min-h-screen text-white font-sans text-center px-0 pt-0 pb-0 flex flex-col">
      {!isAuthenticated ? (
        <div
          className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
          style={{
            backgroundImage:
              currentPage === "Login"
                ? 'url("https://wallpapers.com/images/hd/solo-leveling-jin-woo-and-beru-6ezfy53zn1tuya1b.jpg")'
                : 'url("https://lede-admin.aftermath.site/wp-content/uploads/sites/55/2025/03/Solo-Leveling-Crunchyroll-Anime-A1-Pictures.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

          <h1 className="absolute top-8 left-8 text-white text-6xl font-bold drop-shadow-xl font-[Bangers] animate-slide-in z-10">
            JAPANIME
          </h1>

          <div className="z-10 flex flex-col items-center">
            {currentPage === "Login" ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Register onRegisterSuccess={handleRegisterSuccess} />
            )}

            <div className="mt-6 text-white text-sm text-center">
              {currentPage === "Login" ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    className="text-pink-400 hover:underline"
                    onClick={() => setCurrentPage("Register")}
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    className="text-pink-400 hover:underline"
                    onClick={() => setCurrentPage("Login")}
                  >
                    Login here
                  </button>
                </p>
              )}
            </div>

            <Footer />
          </div>
        </div>
      ) : (
        <>
          <NavBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
            userProfile={userProfile}
          />

          {currentPage === "Home" && (
            <Home
              filteredAnime={filteredAnime}
              homeCarouselIndex={homeCarouselIndex}
              query={query}
              setQuery={setQuery}
              onSearch={() => {
                if (query.trim()) {
                  debouncedSearch();
                }
              }}
              selectedAnime={selectedAnime}
              onBack={goBack}
              onShowDetails={showDetails}
            />
          )}

          {currentPage === "Anime" && (
            <Anime
              genre={genre}
              setGenre={setGenre}
              filteredAnime={filteredAnime}
              selectedAnime={selectedAnime}
              onBack={goBack}
              onShowDetails={showDetails}
            />
          )}

          {currentPage === "Genres" && (
            <Genres genreSections={genreSections} onShowDetails={showDetails} />
          )}

          {currentPage === "Most Popular" && (
            <MostPopular
              genre={genre}
              setGenre={setGenre}
              mostPopularAnime={mostPopularAnime}
              selectedAnime={selectedAnime}
              onBack={goBack}
              onShowDetails={showDetails}
            />
          )}

          {currentPage === "Top Airing" && (
            <TopAiring
              genre={genre}
              setGenre={setGenre}
              filteredAnime={filteredAnime}
              selectedAnime={selectedAnime}
              onBack={goBack}
              onShowDetails={showDetails}
            />
          )}

          {currentPage === "Upcoming" && (
            <Upcoming
              genre={genre}
              setGenre={setGenre}
              filteredAnime={filteredAnime}
              selectedAnime={selectedAnime}
              onBack={goBack}
              onShowDetails={showDetails}
            />
          )}

          {currentPage === "Profile" && (
            <Profile
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              onBack={() => setCurrentPage("Home")}
              onLogout={handleLogout}
              onProfileUpdate={updateUserProfile}
            />
          )}

          {currentPage !== "Profile" && <Footer />}
        </>
      )}
    </div>
  );
}
