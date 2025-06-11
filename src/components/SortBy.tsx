import Fuse from "fuse.js";
import { useStoreContext } from "../context/StoreContext";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function SortBy() {
  const { store, updateFilteredResources, updateSortedValue } =
    useStoreContext();

  function sortNewestFirst() {
    const sorted = [...store.filteredResources].sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return bDate - aDate;
    });
    updateSortedValue("newest");
    updateFilteredResources(sorted);
  }

  function sortOldestFirst() {
    const sorted = [...store.filteredResources].sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return aDate - bDate;
    });
    updateSortedValue("oldest");
    updateFilteredResources(sorted);
  }

  function sortBestMatch() {
    const fuse = new Fuse(store.filteredResources, {
      keys: ["name", "author", "resourceType"],
      threshold: 1,
      includeScore: true,
      minMatchCharLength: 2,
      isCaseSensitive: false,
      ignoreLocation: true,
    });
    const matches = fuse.search(store.query);
    const sorted = matches.sort((a, b) => {
      return (a.score ?? 1) - (b.score ?? 1);
    });
    const result = sorted.map((resource) => resource.item);

    updateSortedValue("relevance");
    updateFilteredResources(result);
  }

  const numberOfResults = store.filteredResources.length;

  return (
    <section className="flex w-full gap-3  items-center p-5 h-11">
      <div className="flex w-1/2 gap-3 justify-start items-center h-11">
        <h4>{`${numberOfResults} total results`}</h4>
      </div>
      <div className="flex w-1/2 gap-3 justify-end items-center p-5 h-11">
        <h4 className="w-fit">Sort by</h4>

        <FormControl variant="outlined" className="w-24">
          <Select
            className="rounded-md text-sm"
            sx={{
              height: "40px",
              fontSize: "14px",
            }}
            labelId="sort-select"
            id="sort-select"
            value={store.sortedValue || "newest"}
            onChange={(event) => {
              if (event.target.value === "newest") {
                sortNewestFirst();
              }
              if (event.target.value === "oldest") {
                sortOldestFirst();
              }
              if (event.target.value === "relevance") {
                sortBestMatch();
              }
            }}
          >
            <MenuItem value={"newest"}>New first</MenuItem>
            <MenuItem value={"oldest"}>Old first</MenuItem>
            <MenuItem value={"relevance"}>Relevance</MenuItem>
          </Select>
        </FormControl>
      </div>
    </section>
  );
}
