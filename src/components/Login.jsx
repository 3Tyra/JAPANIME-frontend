import React, { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://japanime-backend.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token); // Store JWT
      onLoginSuccess();
    } else {
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="relative z-10 bg-white bg-opacity-80 p-10 rounded-2xl w-full max-w-md animate-slide-in text-white shadow-lg">
      <div className="flex items-center justify-center mb-6 space-x-2">
        <img
          src="/apple-touch-icon.png" // make sure logo.png is inside your /public folder
          alt="Japanime Logo"
          className="w-30 h-30  "
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />

        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2 text-sm text-pink-400"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
