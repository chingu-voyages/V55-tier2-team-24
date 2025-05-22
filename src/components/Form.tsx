import { useEffect, useRef, useState } from "react";
import { useStoreContext } from "../context/StoreContext";
import { MdClear } from "react-icons/md";

export default function Form() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceHolder] = useState("");
  const { filterResources, clearFilterResources } = useStoreContext();
  const searchPlaceHolders = [
    "Ready to search! 😊",
    "type a keyword, like javascript",
    "Skills issues? search to unlock some knowledged",
    "type something preferably not sgshgaf",
  ];
  const resultsPlaceHolders = [
    "Nice!, here is what I found",
    "Aha this is what I found!",
    "Are you still searching?",
  ];

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    searchRef?.current?.focus();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * resultsPlaceHolders.length);
    setPlaceHolder(resultsPlaceHolders[randomNumber]);
    filterResources(query);
    setQuery("");
    searchRef?.current?.focus();
  }

  function handleInputClear() {
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    filterResources(query);
    setQuery("");
    searchRef?.current?.focus();
  }

  return (
    <section
      className="flex col p-8 justify-center items-start gap-6 w-[401px] h-80 mt-10 rounded-[8px] border-[0px] border-[#E5E7EB] bg-[#1F2937] 
    [box-shadow:0px_4px_6px_0px_rgba(0,_0,_0,_0.10),_0px_10px_15px_0px_rgba(0,_0,_0,_0.10)]
"
    >
      <form role="search" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-[#F3F4F6] font-[Inter] text-[18px] not-italic font-normal leading-[normal] pt-[3px] pr-[127px] pb-[4px] pl-0">
            Find Learning Resources
          </h2>
          <label
            htmlFor="search-input"
            className="py-4 text-[#9CA3AF] font-[Inter] text-[14px] not-italic font-normal leading-[14px]"
          >
            Type the skill or topic you want to learn…
          </label>
          <div className="relative">
            <input
              required
              onChange={(event) => setQuery(event.target.value)}
              value={query}
              ref={searchRef}
              name="search"
              id="search-input"
              placeholder={placeholder}
              className=" bg-[hsla(221,_39%,_11%,_1)] text-[#ADAEBC] font-[Inter] text-[18px] not-italic font-normal leading-[28px] inline-flex h-[62px] pl-[20px] justify-end items-center w-full pr-1"
            />
            {query.length > 0 ? (
              <MdClear
                className="absolute right-1  top-1/4 fill-red-600  hover:-scale-125 hover:cursor-pointer"
                onClick={handleInputClear}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="flex h-12 py-3.5 bg-[#374151] text-[#F3F4F6] justify-center hover:cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            className="bg-[hsla(221,_39%,_11%,_1)] text-[#D1D5DB] flex justify-center  h-12 py-3.5 hover:cursor-pointer"
            onClick={clearFilterResources}
          >
            Clear Search Results
          </button>
        </div>
      </form>
    </section>
  );
}
