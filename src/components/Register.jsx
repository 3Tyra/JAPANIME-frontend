import React, { useState } from "react";

export default function Register({ onRegisterSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("https://japanime-backend.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, age, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      onRegisterSuccess();
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <div className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-2xl w-full max-w-md animate-slide-in text-white shadow-lg border border-white/20">
      <div className="flex items-center justify-center mb-6 space-x-2">
        <img
          src="/apple-touch-icon.png" // Make sure your image is in the public folder
          alt="Japanime Logo"
          className="w-30 h-30 "
        />
      </div>

      <h2 className="text-xl font-[Bangers] mb-6 text-pink-400 text-center">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 font-sans">
        <input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <input
          type="number"
          placeholder="Age"
          required
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black/20 text-white placeholder-gray-300 focus:outline-none"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-black/20 text-white placeholder-gray-300 focus:outline-none"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-2 text-sm text-pink-300"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-black/20 text-white placeholder-gray-300 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
