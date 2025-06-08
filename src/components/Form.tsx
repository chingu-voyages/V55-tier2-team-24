import { useStoreContext } from "../context/StoreContext";
import { MdSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa6";
import SearchInput from "./SearchInput";

export default function Form() {
  const { clearFilterResources, searchResources, store, saveToQueryHistory } =
    useStoreContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchResources(store.query);
    saveToQueryHistory(store.query);
  }

  return (
    <section className="w-full">
      <form role="search" onSubmit={handleSubmit} className="w-full bg-white">
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

          <div className="relative  mt-3.5 mb-5">
            <SearchInput />
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
