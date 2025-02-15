import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/apiUser"; // Import the login function
import { useUser } from "./UserContext"; // Import the useUser hook

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setIsLoggedIn, setUserData } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        try {
            const userData = await login(email, password);

            if (userData && userData.UserID) {
                setIsLoggedIn(true);
                setUserData(userData);
                console.log("Login successful:", userData);
                window.location = "/sets";
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (error) {
            setError(error.message || "An error occurred. Please try again.");
            console.error("Login Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1E293B]">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:ring-yellow-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <p className="mt-2 text-sm text-center text-red-500">{error}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-black transition duration-200 bg-yellow-400 rounded-lg hover:bg-yellow-500"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/register" className="text-yellow-400 hover:underline">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
