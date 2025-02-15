import { useEffect, useState } from "react";
import { useUser } from "../components/UserContext"; // Import the useUser hook

const Profile = () => {
    const { profilePicture, userData } = useUser(); // Access profilePicture and userData from context
    const [userInfo, setUserInfo] = useState(null); // State to store user info

    useEffect(() => {
        // Fetch user info when the component mounts
        setUserInfo(userData)
        return () => {

        };
    }, [userData]);

    const imageUrl = profilePicture
        ? `http://localhost:5000${profilePicture}?t=${Date.now()}`
        : "http://localhost:5000/uploads/user.png";


    return (
        <header className="flex flex-col items-center justify-center px-2 py-4 mt-16 text-center">
            <img
                className="inline-flex object-cover border-4 border-yellow-600 rounded-full mb-6 shadow-[5px_5px_0_0_rgba(0,0,0,1)] shadow-yellow-600/100 bg-indigo-50 text-indigo-600 !h-80 !w-80"
                src={imageUrl} // Use the fallback URL if profilePicture is not set
                alt="Profile"
            />
            <h1 className="mt-2 text-2xl font-bold text-gray-300">
                {userInfo?.name}
            </h1>

            <div className="flex items-start justify-between space-x-16">
                <h2 className="flex flex-col items-start justify-start text-base font-bold text-gray-300 justify-items-start md:text-xl">
                    <span>
                        Age:
                        <span className="ml-2 font-normal">{userInfo?.Age}</span>
                    </span>

                    <span>
                        For:
                        <span className="ml-2 font-normal">{userInfo?.PurposeOfUse}</span>
                    </span>

                    {userInfo?.Email || "email@example.com"}
                </h2>

                <div className="flex flex-col items-center justify-start">
                    <h2 className="mt-2 text-base font-bold text-gray-300 md:text-xl">Streak</h2>
                    <span>55 🔥</span>
                </div>
            </div>
        </header>
    );
};

export default Profile;
