import FlashcardCreate from "./components/FlashcardCreate";
import Home from "./pages/Home";
import Sets from "./pages/sets";
import Todo from "./pages/todo";
import SetDetails from "./components/SetDetails ";
import Login from "./components/login";
import Register from "./components/Register";
import ProfileSetup from "./components/ProfileSetup";
import Profile from "./pages/Profile";
import Settings from "./pages/settings";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },  // Make sure the case is consistent
    { path: "/sets", element: <Sets /> },
    { path: "/todo", element: <Todo /> },
    { path: "/Profile", element: <Profile /> },
    { path: "/sets/:title", element: <SetDetails /> },
    { path: "/create", element: <FlashcardCreate /> },
    { path: "/login", element: <Login /> },
    { path: "/Settings", element: <Settings /> },
    { path: "/register", element: <Register /> },
    { path: "/ProfileSetup", element: <ProfileSetup /> },
];


