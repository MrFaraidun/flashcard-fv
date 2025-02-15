import { useState } from "react";
import { useUser } from "./UserContext.js"; // Import the useUser hook
import { logoutUser } from "../api/apiUser";

const UserMenu = () => {
    const { setIsLoggedIn, setUserData, setProfilePicture, profilePicture, userData } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const result = await logoutUser(); // Call to your logoutUser API function

        if (result) {
            // If logout is successful, update frontend state and redirect
            setIsLoggedIn(false);
            setUserData(null);
            setProfilePicture(null);

            // Redirect to the homepage or login page
            window.location = "/home";
        } else {
            console.error("Logout failed.");
        }
    };

    // Form the full image URL
    console.log("fara", profilePicture);

    const imageUrl = profilePicture
        ? `http://localhost:5000${profilePicture}?t=${Date.now()}`
        : "http://localhost:5000/uploads/user.png";


    return (
        <div className="relative">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center"
            >
                <img
                    src={imageUrl} // Use the determined image URL
                    alt="user"
                    className="w-8 h-8 bg-center bg-cover rounded-full"
                />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
                <div
                    className="absolute right-0 z-20 flex-col items-center justify-center w-auto px-4 mt-2 text-white bg-gray-800 rounded-lg shadow-lg top-8 justify-items-center "
                    tabIndex={-1} // Allow the div to receive focus so that onBlur works
                >
                    <div className="py-2 border-b border-gray-600 -px-2">
                        <p className="font-bold">{userData?.Name}</p>
                    </div>
                    <ul className="flex-col items-center justify-center justify-items-center">
                        <li className="px-2 py-1 cursor-pointer hover:bg-gray-700">
                            Profile
                        </li>
                        <li className="px-2 py-1 cursor-pointer hover:bg-gray-700">
                            <a href="/Settings">Settings</a>
                        </li>
                        <li className="px-2 py-1 cursor-pointer hover:bg-gray-700">
                            Light Mode
                        </li>

                        <li
                            className="px-2 py-1 mb-1 cursor-pointer hover:bg-gray-700"
                            onClick={handleLogout}
                        >
                            Log out
                        </li>
                    </ul>
                </div>
            )}

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-10 mt-2 text-white rounded-lg shadow-lg opacity-50"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default UserMenu;
