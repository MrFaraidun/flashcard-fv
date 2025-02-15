import API from "./axios";

// ✅ Register a new user
export const register = async (name, email, password) => {
    try {
        await API.post("/register", { Name: name, Email: email, Password: password });
        return await getUserInfo(); // Fetch user info after registering
    } catch (error) {
        throw new Error(error.response?.data?.error || "Registration failed");
    }
};

// ✅ Login a user
export const login = async (email, password) => {
    try {
        await API.post("/login", { Email: email, Password: password });
        return await getUserInfo();
    } catch (error) {
        throw new Error(error.response?.data?.error || "Login failed");
    }
};

// ✅ Check if user is logged in
export const checkLoginStatus = async () => {
    try {
        const { data } = await API.get("/check-login");
        return data; // Returns user info if logged in
    } catch (error) {
        console.error("checkLoginStatus error:", error.response?.data || error.message);
        return null; // User is not logged in
    }
};


// ✅ Fetch user info
export const getUserInfo = async () => {
    try {
        const { data } = await API.get("/user-info");
        return data;
    } catch {
        throw new Error("Failed to fetch user info");
    }
};

// ✅ Edit user info (with profile picture support)
export const editUserInfo = async (formData) => {
    try {
        const { data } = await API.put("/edit-user-info", formData);
        return data;
    } catch (error) {
        throw new Error("Failed to edit user info");
    }
};



export const logoutUser = async () => {
    try {
        // Send a GET request to logout
        const response = await API.get("/logout");

        if (response.data.message === "Logged out successfully") {
            return true;
        }
        return false;
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
        return false;
    }
};


// ✅ Delete user account
export const deleteUserAccount = async () => {
    try {
        await API.delete("/delete-account");
        return true;
    } catch {
        return false;
    }
};
