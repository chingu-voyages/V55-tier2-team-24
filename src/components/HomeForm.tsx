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

    navigate("Discover");
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
          {/* <input
            autoComplete="off"
            required
            onChange={(event) => handleUserInput(event)}
            value={store.query}
            ref={searchRef}
            name="search"
            id="search-input"
            placeholder={placeholder}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#41A3C9] focus:border-transparent pr-10"
            aria-label="Search for developer resources"
          />
          {store.query?.length > 0 ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleInputClear();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600"
              aria-label="Clear search"
            >
              <MdClear className="text-xl" />
            </button>
          ) : (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MdSearch className="text-xl" />
            </span>
          )} */}
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
