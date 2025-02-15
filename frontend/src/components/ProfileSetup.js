import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the useUser hook

const ProfileSetup = () => {
    const [age, setAge] = useState("");
    const [purposeOfUse, setPurposeOfUse] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [error, setError] = useState("");
    const { userData, setIsLoggedIn } = useUser(); // Destructure updateProfilePicture and userData
    const navigate = useNavigate();

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];



        setProfilePicture(file);
        const previewUrl = URL.createObjectURL(file);
        setProfilePicturePreview(previewUrl);

        setError(""); // Clear error if file is valid

    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setError("");

        // Validate fields
        if (!age || !purposeOfUse) {
            setError("Age and Purpose of Use are required.");
            return;
        }

        const formData = new FormData();
        formData.append("userId", userData?.UserID);
        formData.append("age", age);
        formData.append("purposeOfUse", purposeOfUse);
        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        try {
            const response = await fetch("http://localhost:5000/flashcard/profile-setup", {
                method: "POST",
                credentials: 'include',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to save profile");
            }

            setProfilePicturePreview(data.ProfilePictureUrl); // Update preview if needed

            // Save profile picture URL to sessionStorage
            sessionStorage.setItem('profilePictureUrl', data.ProfilePictureUrl);

            // Set logged-in state to true after a successful API call
            setIsLoggedIn(true);

            // Redirect after successful profile update
            window.location = "/sets"
        } catch (error) {
            console.error("Error:", error);
            setError(error.message);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
            <div className="flex flex-col justify-between w-full h-full max-w-md p-10 bg-white rounded-md shadow-lg max-sm:rounded-none">
                <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">
                    Complete Your Profile
                </h2>
                <form onSubmit={handleSubmit} className="flex-1 space-y-6" encType="multipart/from-data">
                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <label className="block mb-2 font-medium text-gray-600">Profile Picture </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => document.querySelector('input[type="file"]').click()}
                                    className={`flex items-center justify-center font-medium text-white bg-yellow-400 rounded-full h-28 w-28 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${profilePicturePreview ? `bg-cover bg-center` : ""}`}
                                    style={{
                                        backgroundImage: profilePicturePreview ? `url(${profilePicturePreview})` : "none",
                                    }}
                                >
                                    {!profilePicturePreview && <span className="text-xl">+</span>}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block mb-2 font-medium text-gray-600">Age </label>
                            <input
                                type="number"
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Enter your age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <label className="block mb-2 font-medium text-gray-600">Purpose of Use </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 text-black border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="Why are you using this app?"
                                value={purposeOfUse}
                                onChange={(e) => setPurposeOfUse(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="mt-2 text-sm text-center text-red-600">{error}</p>
                    )}

                    <div className="flex space-x-9">
                        {/* Skip button */}
                        <button
                            type="button" // Use type="button" so it doesn't trigger form submission
                            onClick={() => navigate("/sets")}
                            className="w-full px-4 py-3 font-medium text-white transition duration-300 bg-gray-400 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            Skip
                        </button>

                        {/* Save Profile button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-3 font-medium text-black transition duration-300 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSetup;
