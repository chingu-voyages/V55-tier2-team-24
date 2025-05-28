import { useState, useEffect } from "react";
import { LoginButton } from "./LoginButton";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString("en-US");
    setCurrentDate(dateString);
  }, []);

  return (
    <header className="sticky top-0 flex px-2 py-3 w-full h-20 border-b-1 border-gray-400">
      <section className="w-[95%] text-2xl m-3 text-white flex items-center">
        <h1>DevVault</h1>
        <span className="text-sm px-6">{currentDate}</span>
        <div className=" flex gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/Resources"}>Resources</NavLink>
        </div>
      </section>
      <LoginButton />
    </header>
  );
}
