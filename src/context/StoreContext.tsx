import React, { createContext, useContext, useEffect } from "react";
import type { Resources, Store, StoreContext, Tags } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";
import { FALLBACK_RESOURCES, FALLBACK_TAGS } from "../helpers/fallbackData";
import Fuse from "fuse.js";
import { removeStopwords, eng } from "stopword";
import { expandSearch } from "../helpers/expandSearch";

export const storeContext = createContext<StoreContext>({
  store: {
    filteredResources: [],
    tags: [],
    resources: [],
    lastUpdate: "",
    query: "",
  },
  clearFilterResources: () => undefined,
  searchResources: () => undefined,
  handleClickedTags: () => undefined,
  updateQuery: () => undefined,
});

export default function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = usePersistedState<Store>("store", {
    filteredResources: FALLBACK_RESOURCES,
    tags: FALLBACK_TAGS,
    resources: FALLBACK_RESOURCES,
    lastUpdate: "",
    query: "",
  });

  function combineFilters(query: string, tags: Tags[]) {
    const words = query
      .replace(/,/g, "")
      .toLowerCase()
      .split(" ")
      .filter(Boolean);
    const importantWords = removeStopwords(words, eng);
    console.log(importantWords, "important words");
    const expandedWords = expandSearch(importantWords);
    // console.log(expandedWords, "expanded words");
    const selectedTags = tags.filter((tag) => tag.selected);
    console.log(selectedTags, "selected tags");

    const fuse = new Fuse(store.resources, {
      keys: ["name", "description", "author", "resourceType"],
      threshold: 0.1,
      includeScore: true,
      minMatchCharLength: 2,
      isCaseSensitive: false,
      ignoreLocation: true,
    });

    const uniqueFuseResults = new Set<Resources>();
    expandedWords.forEach((word) => {
      const matches = fuse.search(word);

      matches.forEach((match) => {
        uniqueFuseResults.add(match.item);
      });
    });

    const fusedResults = expandedWords.length
      ? Array.from(uniqueFuseResults)
      : store.resources;

    console.log(fusedResults, "fuse results");

    const results = fusedResults.filter((post) => {
      return (
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.appliedTags.includes(tag.id))
      );
    });

    console.log(results);

    setStore((prev) => ({ ...prev, filteredResources: results }));
  }

  function searchResources(query: string) {
    setStore((prev) => ({ ...prev, query: query }));
    combineFilters(query, store.tags);
  }

  function handleClickedTags(clickedTag: Tags) {
    const updatedTags = store.tags.map((tag) =>
      tag.id === clickedTag.id ? { ...tag, selected: !tag.selected } : tag
    );

    setStore((prev) => ({ ...prev, tags: updatedTags }));
    combineFilters(store.query, updatedTags);
  }

  function clearFilterResources() {
    setStore((prev) => {
      const clearedTags = prev.tags.map((tag) => ({ ...tag, selected: false }));
      return {
        ...prev,
        filteredResources: store.resources,
        tags: clearedTags,
        query: "",
      };
    });
  }

  function updateQuery(query: string) {
    setStore((prev) => ({ ...prev, query }));
  }

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (store.resources.length === 0 || today !== store.lastUpdate) {
      console.log("fetching data");
      getDataFromApi()
        .then((data) => {
          if (data) {
            setStore((prev) => {
              return {
                ...prev,
                tags: data[0],
                resources: data[1],
                filteredResources: data[1],
                lastUpdate: new Date().toLocaleDateString(),
              };
            });
          }
        })
        .catch((error) => {
          console.log("error when fetching", error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <storeContext.Provider
      value={{
        store,
        clearFilterResources,
        searchResources,
        handleClickedTags,
        updateQuery,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
