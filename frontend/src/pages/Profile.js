import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext"; // Import the useUser hook
import { getStreak } from "../api/apiUser"; // Import the getStreak function

const Profile = () => {
  const { profilePicture, userData } = useUser(); // Access profilePicture and userData from context
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [streak, setStreak] = useState(null); // State to store streak info

  useEffect(() => {
    setUserInfo(userData);

    const fetchStreak = async () => {
      try {
        const data = await getStreak();
        console.log(data);

        setStreak(data); // Set the streak info to the state
      } catch (error) {
        console.error("Error fetching streak:", error.message);
      }
    };

    fetchStreak();
  }, [userData]);

  // Determine the full image URL
  const getImageUrl = (profilePicture) => {
    if (!profilePicture) {
      return "http://localhost:5000/uploads/user.png"; // Default image
    }

    // If the profile picture is already a full URL (e.g., from Google), use it as-is
    if (profilePicture.startsWith("http")) {
      return profilePicture;
    }

    // If the profile picture is a relative path, prepend the backend URL
    return `http://localhost:5000${profilePicture}?t=${Date.now()}`; // Cache busting
  };

  const imageUrl = getImageUrl(profilePicture);

  return (
    <header className="flex flex-col items-center justify-center px-2 py-4 mt-16 text-center">
      <img
        className="inline-flex object-cover border-4 border-yellow-600 rounded-full mb-6 shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-yellow-600/100 bg-indigo-50 text-indigo-600 !h-80 !w-80"
        src={imageUrl} // Use the determined image URL
        alt="Profile"
      />
      <h1 className="mt-2 text-2xl font-bold text-gray-300">
        {userInfo?.Name || "Loading..."}{" "}
        {/* Display "Loading..." if userInfo is not available */}
      </h1>

      <div className="flex items-start justify-between space-x-16">
        <h2 className="flex flex-col items-start justify-start text-base font-bold text-gray-300 justify-items-start md:text-xl">
          <span>
            Age:
            <span className="ml-2 font-normal">{userInfo?.Age || "N/A"}</span>
          </span>

          <span>
            For:
            <span className="ml-2 font-normal">
              {userInfo?.PurposeOfUse || "N/A"}
            </span>
          </span>

          {userInfo?.Email || "email@example.com"}
        </h2>

        <div className="flex flex-col items-center justify-start">
          <h2 className="mt-2 text-base font-bold text-gray-300 md:text-xl">
            Streak
          </h2>
          <span>{streak ? `${streak.streak_count} 🔥` : "Loading..."}</span>
          {streak?.streak_date && (
            <p className="text-sm text-gray-500">
              Last activity: {new Date(streak.streak_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Profile;
