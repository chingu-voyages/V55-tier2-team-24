import { useState, useEffect } from "react";
import { LoginButton } from "./LoginButton";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(dateString);
  }, []);

  return (
    <header className="sticky top-0 flex px-2 py-3 w-full h-20 border-1 border-[#E5E7EB] bg-[#F9FAFB] items-center z-50">
      <section className="w-full flex px-4 items-center justify-between">
        <NavLink
          to={"/"}
          className="text-[#41A3C9] hover:text-[#41A3C9]/90 text-2xl font-bold"
        >
          DevVault
        </NavLink>
        <div className="hidden md:flex items-center gap-10 text-gray-800">
          <NavLink to={"/"} className="hover:text-gray-600">
            Home
          </NavLink>
          <NavLink to={"/Discover"} className="hover:text-gray-600">
            Discover
          </NavLink>
          <NavLink to={"/About"} className="hover:text-gray-600">
            About
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm">{currentDate}</span>
          <LoginButton />
        </div>

        {/* Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              <NavLink
                to={"/"}
                className="hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/Discover"}
                className="hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </NavLink>
              <NavLink
                to={"/About"}
                className="hover:text-gray-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
              <div onClick={() => setIsMenuOpen(false)}>
                <LoginButton />
              </div>
            </div>
          </div>
        )}
      </section>
    </header>
  );
}
