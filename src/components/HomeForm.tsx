"use client";
import type React from "react";
import { useStoreContext } from "../context/StoreContext";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function HomeForm() {
  const { searchResources, store, saveToQueryHistory } = useStoreContext();
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!store.query.trim()) return;
    event.preventDefault();
    searchResources(store.query);
    saveToQueryHistory(store.query);
    navigate("/Discover");
  }

  return (
    <div className="w-4/5 md:w-full max-w-3xl bg-white rounded-sm shadow-gray-300 shadow-lg p-6">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="relative w-full md:w-2/3">
          <SearchInput />
        </div>
        <div className="w-full md:w-1/3">
          <button
            type="submit"
            className="w-full bg-[#41A3C9] hover:bg-[#41A3C9]/90 text-white font-medium py-3 px-4 rounded-sm transition duration-200 flex items-center justify-center cursor-pointer"
          >
            <MdSearch className="mr-2 text-xl" /> Search
          </button>
        </div>
      </form>
    </div>
  );
}
