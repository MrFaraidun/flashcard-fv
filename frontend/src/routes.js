import FlashcardCreate from "./components/FlashcardCreate";
import Home from "./pages/Home";
import Sets from "./pages/sets";
import Todo from "./pages/todo";
import TodoGuest from "./pages/todo-guest";
import SetDetails from "./components/SetDetails ";
import Login from "./components/login";
import Register from "./components/Register";
import ProfileSetup from "./components/ProfileSetup";

import Profile from "./pages/Profile";

import Settings from "./pages/settings";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/sets", element: <Sets /> },
  { path: "/todo", element: <Todo /> },
  { path: "/todo-guest", element: <TodoGuest /> },
  { path: "/Profile", element: <Profile /> },
  { path: "/sets/:setid", element: <SetDetails /> },
  { path: "/create", element: <FlashcardCreate /> },
  { path: "/login", element: <Login /> },
  { path: "/Settings", element: <Settings /> },
  { path: "/register", element: <Register /> },
  { path: "/ProfileSetup", element: <ProfileSetup /> },
];
