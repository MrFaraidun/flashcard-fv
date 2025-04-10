import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import FlashcardsImage from "./img/flash-cards.png";
import UserMenu from "./components/UserMenu";
import { useUser } from "../src/components/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const links = [
    { to: "/home", label: "Home" },
    { to: "/sets", label: "Sets" },
    { to: isLoggedIn ? "/todo" : "/todo-guest", label: "To-do List" },
    ...(isLoggedIn
      ? [
          { to: "/quiz", label: "Quiz" },
          { to: "/Profile", label: "Profile" },
        ]
      : []),
  ];

  const renderLinks = () =>
    links.map(({ to, label }) => (
      <li key={to}>
        <NavLink
          to={to}
          className={({ isActive }) =>
            isActive
              ? "text-yellow-400 transition duration-200"
              : "text-gray-300 transition duration-200 hover:text-amber-400"
          }
        >
          {label}
        </NavLink>
      </li>
    ));

  return (
    <div className="bg-[#0f172a]">
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-[#131c30] navbar">
        <img src={FlashcardsImage} className="w-8 h-8" alt="Logo" />

        <div className="lg:hidden max-sm:ml-24 max-375:ml-16">
          <button
            className="flex items-center p-3 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="block w-6 h-6 fill-current max-md:w-4 max-sm:h-4"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        <ul className="hidden lg:flex ml-36 lg:space-x-8">{renderLinks()}</ul>

        <div className="flex items-center mr-6 space-x-4 sm:mr-0">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigation("/login")}
                className="px-4 py-2 font-medium transition duration-200 bg-transparent border rounded max-md:px-2 max-md:py-1 text-amber-400 border-amber-400 hover:bg-amber-400 hover:text-black"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation("/register")}
                className="px-4 py-2 font-medium text-black transition duration-200 rounded bg-amber-400 max-md:px-2 max-md:py-1 hover:bg-amber-500"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          )}
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50 z-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0f172a] transform transition-transform duration-300 ease-in-out z-50 navbar ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute text-white top-4 left-4"
          aria-label="Close menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <ul className="px-4 mt-16 space-y-6">{renderLinks()}</ul>
      </div>
    </div>
  );
};

export default Navbar;
