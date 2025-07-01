import React, { useEffect, useState } from "react";

export default function Profile({ userProfile, setUserProfile, onLogout, onBack }) {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [flipped, setFlipped] = useState(false);

  // Edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => setFlipped(true), 100);

    if (userProfile) {
      // Initialize profile and formData when userProfile changes
      setProfile(userProfile);
      setFormData({
        username: userProfile.username || "",
        email: userProfile.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userProfile]);

  // Handle input changes for form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(preview);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formDataPhoto = new FormData();
    formDataPhoto.append("photo", selectedFile);

    try {
      setLoading(true);
      const res = await fetch("https://japanime-backend.onrender.com/api/upload-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataPhoto,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const fullUrl = `https://japanime-backend.onrender.com/uploads/${data.filename}`;

      setProfile((prev) => ({ ...prev, profile_photo: fullUrl }));
      setSelectedFile(null);
      setPreviewUrl("");
      setUserProfile((prev) => ({ ...prev, profile_photo: fullUrl }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    }
  };

  const handleRemovePhoto = async () => {
    if (!window.confirm("Are you sure you want to remove your profile picture?")) return;

    try {
      setLoading(true);
      const res = await fetch("https://japanime-backend.onrender.com/api/remove-photo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to remove photo");

      setProfile((prev) => ({ ...prev, profile_photo: null }));
      setUserProfile((prev) => ({ ...prev, profile_photo: null }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Remove photo error:", err);
      alert("Failed to remove photo");
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setError("");
    // Reset password fields when toggling edit mode off
    if (isEditing) {
      setFormData((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Prepare payload
    const payload = {
      username: formData.username,
      email: formData.email,
    };

    // Only send password if user entered one
    if (formData.password.trim()) {
      payload.password = formData.password;
    }

    try {
      setLoading(true);
      const res = await fetch("https://japanime-backend.onrender.com/api/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }

      const updatedData = await res.json();

      setProfile((prev) => ({
        ...prev,
        username: updatedData.username,
        email: updatedData.email,
      }));

      setUserProfile((prev) => ({
        ...prev,
        username: updatedData.username,
        email: updatedData.email,
      }));

      setIsEditing(false);
      setLoading(false);
      alert("Profile updated successfully");
    } catch (err) {
      setLoading(false);
      setError(err.message);
      console.error("Update profile error:", err);
    }
  };

  if (!profile) return <p className="mt-8 text-lg text-white">Loading profile...</p>;

  const profileImage = previewUrl || profile.profile_photo || "/default-profile.png";

  return (
    <>
      {/* Background */}
      <div
        style={{
          backgroundImage:
            "url('https://w0.peakpx.com/wallpaper/700/235/HD-wallpaper-askeladd-thorfinn-vinland-saga.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          filter: "brightness(0.6)",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: -1,
        }}
      />

      <div className="min-h-screen relative flex flex-col items-center justify-center p-8 text-white z-10">
        <div className="profile-flip-container w-full max-w-md relative z-10">
          <div
            className={`profile-flip-inner bg-white/10 backdrop-blur-lg p-8 rounded-xl border border-white/20 space-y-4 ${
              flipped ? "flipped" : ""
            }`}
          >
            <h2 className="text-3xl font-[Bangers] text-pink-400 mb-4 text-center">
              Your Profile
            </h2>

            <div className="flex flex-col items-center">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-white/30"
              />

              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={loading}
              />

              <label
                htmlFor="file-upload"
                className={`mt-4 cursor-pointer bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded text-sm font-semibold transition ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Choose File
              </label>

              {selectedFile && (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              )}

              {!selectedFile && profile.profile_photo && (
                <button
                  onClick={handleRemovePhoto}
                  disabled={loading}
                  className="mt-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 rounded disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Remove Photo"}
                </button>
              )}
            </div>

            {!isEditing ? (
              <>
                <p>
                  <strong>Username:</strong> {profile.username}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Age:</strong> {profile.age}
                </p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(profile.created_at).toLocaleDateString()}
                </p>

                <div className="flex justify-between mt-6 gap-4">
                  <button
                    onClick={handleEditToggle}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={onBack}
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded transition"
                  >
                    Back
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <p className="text-red-500 font-semibold text-center">{error}</p>
                )}

                <label className="block">
                  <span className="text-sm font-semibold">Username</span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black"
                    disabled={loading}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black"
                    disabled={loading}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">New Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Leave blank to keep current password"
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black"
                    disabled={loading}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold">Confirm Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-black"
                    disabled={loading}
                  />
                </label>

                <label className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                  />
                  <span className="text-white text-sm select-none">Show Password</span>
                </label>

                <div className="flex justify-between mt-6 gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded transition disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    disabled={loading}
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={onLogout}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded font-semibold"
                disabled={loading}
              >
                Logout
              </button>
              <button
                onClick={onBack}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded font-semibold"
                disabled={loading}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for flip animation */}
      <style>{`
        .profile-flip-container {
          perspective: 1000px;
        }
        .profile-flip-inner {
          transition: transform 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }
        .profile-flip-inner.flipped {
          transform: rotateY(360deg);
        }
      `}</style>
    </>
  );
}
