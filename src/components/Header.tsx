import { useState, useEffect } from "react";
import { LoginButton } from "./LoginButton";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

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
    <header className="sticky top-0 flex px-2 py-3 w-full h-20 border-1 border-[#E5E7EB] bg-[#F9FAFB] items-center">
      <section className="w-[95%] ml-4 flex items-center justify-between">
        <NavLink
          to={"/"}
          className="text-[#41A3C9] hover:text-[#41A3C9]/90 text-2xl font-bold"
        >
          DevVault
        </NavLink>
        <div className="flex gap-10 text-gray-800">
          <NavLink to={"/"} className="hover:text-gray-600">
            Home
          </NavLink>
          <NavLink to={"/Resources"} className="hover:text-gray-600">
            Discover
          </NavLink>
          <NavLink to={"/About"} className="hover:text-gray-600">
            About
          </NavLink>
        </div>
        <span className="text-sm px-6">{currentDate}</span>
      </section>
      <LoginButton />
    </header>
  );
}
