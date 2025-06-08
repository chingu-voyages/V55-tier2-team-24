import { useStoreContext } from "../context/StoreContext";
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import Fuse from "fuse.js";

export default function SortByDate() {
  const { store, updateFilteredResources } = useStoreContext();

  const [sortValue, setSortValue] = useState("relevance");

  function sortNewestFirst() {
    const sorted = [...store.filteredResources].sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return bDate - aDate;
    });
    setSortValue("newest");
    updateFilteredResources(sorted);
  }

  function sortOldestFirst() {
    const sorted = [...store.filteredResources].sort((a, b) => {
      const aDate = new Date(a.createdAt).getTime();
      const bDate = new Date(b.createdAt).getTime();
      return aDate - bDate;
    });
    setSortValue("oldest");
    updateFilteredResources(sorted);
  }

  function sortByRelevance() {
    const fuse = new Fuse(store.filteredResources, {
      keys: ["name", "author", "resourceType"],
      threshold: 1,
      includeScore: true,
      minMatchCharLength: 2,
      isCaseSensitive: false,
      ignoreLocation: true,
    });
    const resourcesWithScore = fuse.search(store.query);
    const sortedResources = resourcesWithScore.map((resource) => resource.item);
    setSortValue("relevance");
    updateFilteredResources(sortedResources);
  }

  useEffect(() => {
    sortByRelevance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full gap-3 justify-end items-center">
      <h4 className="w-fit">sort by</h4>

      <FormControl variant="outlined" className="w-24">
        <Select
          className="rounded-md text-sm"
          sx={{
            height: "40px",
            fontSize: "14px",
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortValue}
          onChange={(event) => {
            if (event.target.value === "relevance") {
              sortByRelevance();
            }
            if (event.target.value === "newest") {
              sortNewestFirst();
            }
            if (event.target.value === "oldest") {
              sortOldestFirst();
            }
          }}
        >
          <MenuItem value={"relevance"}>relevance </MenuItem>
          <MenuItem value={"newest"}>New first</MenuItem>
          <MenuItem value={"oldest"}>old first</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
