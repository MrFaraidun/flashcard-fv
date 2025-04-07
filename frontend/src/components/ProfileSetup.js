import React, { useState } from "react";

const ProfileSetup = () => {
  const [age, setAge] = useState("");
  const [purposeOfUse, setPurposeOfUse] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePicture(file);
    const previewUrl = URL.createObjectURL(file);
    setProfilePicturePreview(previewUrl);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!age || !purposeOfUse) {
      setError("Age and Purpose of Use are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("age", age);
      formData.append("purposeOfUse", purposeOfUse);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch(
        "http://localhost:5000/flashcard/profile-setup",
        {
          method: "POST",
          credentials: "include",
          body: formData, // Don't set Content-Type header - the browser will set it automatically with the correct boundary
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      window.location.href = "/sets";
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
      <div className="flex flex-col justify-between w-full h-full max-w-md p-10 bg-white rounded-md shadow-lg max-sm:rounded-none">
        <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">
          Complete Your Profile
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-6"
          encType="multipart/form-data" // Fixed typo here
        >
          <div className="flex flex-col items-center justify-center">
            <div>
              <label className="block mb-2 font-medium text-gray-600">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("profilePicture").click()
                  }
                  className={`flex items-center justify-center font-medium text-white bg-yellow-400 rounded-full h-28 w-28 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    profilePicturePreview ? "bg-cover bg-center" : ""
                  }`}
                  style={{
                    backgroundImage: profilePicturePreview
                      ? `url(${profilePicturePreview})`
                      : "none",
                  }}
                >
                  {!profilePicturePreview && <span className="text-xl">+</span>}
                </button>
              </div>
            </div>
            <div className="w-full mt-6 space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-600">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="13"
                  max="120"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-600">
                  Purpose of Use
                </label>
                <input
                  type="text"
                  name="purposeOfUse"
                  className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Why are you using this app?"
                  value={purposeOfUse}
                  onChange={(e) => setPurposeOfUse(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-2 text-sm text-center text-red-600">{error}</p>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => (window.location.href = "/sets")}
              className="w-full px-4 py-3 font-medium text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Skip
            </button>

            <button
              type="submit"
              className="w-full px-4 py-3 font-medium text-black transition duration-300 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              disabled={isLoading}
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
