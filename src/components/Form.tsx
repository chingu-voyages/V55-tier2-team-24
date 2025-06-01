import { useEffect, useRef, useState } from "react";
import { useStoreContext } from "../context/StoreContext";
import { MdClear, MdSearch } from "react-icons/md";
import { searchPlaceHolders } from "../helpers/placeHolders";
import { FaFilter } from "react-icons/fa6";

export default function Form() {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [placeholder, setPlaceHolder] = useState("");

  const { clearFilterResources, searchResources, store, updateQuery } =
    useStoreContext();

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    searchRef?.current?.focus();
  }, []);

  function handleUserInput(event: React.ChangeEvent<HTMLInputElement>) {
    updateQuery(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    searchResources(store.query);
    searchRef?.current?.focus();
  }

  function handleInputClear() {
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    searchResources("");
    updateQuery("");
    searchRef?.current?.focus();
  }

  return (
    <section>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="w-80 h-72 bg-white"
      >
        <div>
          <div className="flex items-center gap-1 mb-7">
            <span className=" pt-0.5 mt-3.5 pl-3">
              <MdSearch className=" text-xl" />
            </span>
            <h2 className="text-lg pt-0.5 mt-3.5 font-normal">
              Search Resources
            </h2>
          </div>

          <label htmlFor="search-input">What should we dig up for you?</label>
          <div className="relative mt-3.5 mb-5">
            <input
              autoComplete="off"
              required
              onChange={(event) => handleUserInput(event)}
              value={store.query}
              ref={searchRef}
              name="search"
              id="search-input"
              placeholder={placeholder}
              className=" border-sm outline-solid text-[#ADAEBC] font-[Inter] text-[18px] not-italic font-normal leading-[28px] inline-flex h-[62px] pl-[20px] justify-end items-center w-full pr-1"
            />
            {store.query.length > 0 ? (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleInputClear();
                }}
              >
                <MdClear className="absolute right-1  top-1/4 fill-red-600  hover:-scale-125 hover:cursor-pointer" />
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full ">
            <button
              type="submit"
              className="w-full bg-[#41A3C9] hover:bg-[#41A3C9]/90 text-white font-medium py-3 px-4 rounded-sm transition duration-200 flex items-center justify-center cursor-pointer"
            >
              <MdSearch className="mr-2 text-xl" /> Search
            </button>
          </div>
          <button
            type="button"
            className="text-blue-500 mt-4 underline hover:cursor-pointer"
            onClick={clearFilterResources}
          >
            Clear Search
          </button>
        </div>
      </form>
      <section className="">
        <div className="flex items-center gap-2.5 w-2xs h-14">
          <FaFilter />
          <h4>Filters</h4>
        </div>
      </section>
    </section>
  );
}

//  onClick={clearFilterResources}
