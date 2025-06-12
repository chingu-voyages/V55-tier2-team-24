import { useState, useEffect } from "react";
import { LoginButton } from "./LoginButton";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 flex px-4 md:px-2 py-3 w-full h-20 border-1 border-[#E5E7EB] bg-[#F9FAFB] items-center z-50">
      <section className="w-full flex px-4 items-center justify-between">
        <NavLink
          to={"/"}
          className="text-[#41A3C9] hover:text-[#41A3C9]/90 text-2xl font-bold"
        >
          DevVault
        </NavLink>
        <div className="hidden md:flex items-center gap-10 text-gray-800">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 rounded-md hover:bg-gray-200 text-[#41A3C9]"
                : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/Discover"}
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 rounded-md hover:bg-gray-200 text-[#41A3C9]"
                : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
            }
          >
            Discover
          </NavLink>
          <NavLink
            to={"/Favorites"}
            className={({ isActive }) =>
              isActive
                ? "px-3 py-2 rounded-md hover:bg-gray-200 text-[#41A3C9]"
                : "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200"
            }
          >
            Favorites
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm">{currentDate}</span>
          <LoginButton />
        </div>

        {/* Menu Button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 w-full bg-[#F9FAFB] shadow-md">
            <div className="flex flex-col p-4 space-y-4">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? "border-b border-[#E5E7EB] px-2 py-2 text-[#41A3C9]"
                    : "border-b border-[#E5E7EB] px-2 py-2 text-gray-700"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={"/Discover"}
                className={({ isActive }) =>
                  isActive
                    ? "border-b border-[#E5E7EB] px-2 py-2 text-[#41A3C9]"
                    : "border-b border-[#E5E7EB] px-2 py-2 text-gray-700"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </NavLink>
              <NavLink
                to={"/Favorites"}
                className={({ isActive }) =>
                  isActive
                    ? "border-b border-[#E5E7EB] px-2 py-2 text-[#41A3C9]"
                    : "border-b border-[#E5E7EB] px-2 py-2 text-gray-700"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
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
