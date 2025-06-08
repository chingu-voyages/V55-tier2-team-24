import React, { createContext, useContext, useEffect, useState } from "react";
import type { Resources, Store, StoreContext, Tags } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";
import { FALLBACK_RESOURCES, FALLBACK_TAGS } from "../helpers/fallbackData";
import Fuse from "fuse.js";
import { removeStopwords, eng } from "stopword";
import { expandSearch } from "../helpers/expandSearch";
import { searchPlaceHolders } from "../helpers/placeHolders";

export const storeContext = createContext<StoreContext>({
  store: {
    filteredResources: [],
    tags: [],
    resources: [],
    lastUpdate: "",
    query: "",
    authors: [],
    resourcesType: [],
    queryHistory: [],
  },
  clearFilterResources: () => undefined,
  searchResources: () => undefined,
  handleClickedTags: () => undefined,
  updateQuery: () => undefined,
  handleAuthorSelected: () => undefined,
  handleResourceTypeSelected: () => undefined,
  resetFilters: () => undefined,
  saveToQueryHistory: () => undefined,
  clearQueryHistory: () => undefined,
  placeholder: "",
  updatePlaceholder: () => undefined,
  updateFilteredResources: () => undefined,
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
    authors: [],
    resourcesType: [],
    queryHistory: [],
  });

  const [placeholder, setPlaceHolder] = useState(
    searchPlaceHolders[Math.floor(Math.random() * searchPlaceHolders.length)]
  );

  function updatePlaceholder() {
    setPlaceHolder(
      searchPlaceHolders[Math.floor(Math.random() * searchPlaceHolders.length)]
    );
  }

  function saveToQueryHistory(query: string) {
    if (!query.trim()) return;

    setStore((prev) => {
      if (prev.queryHistory.includes(query)) return prev;

      return {
        ...prev,
        queryHistory: [query, ...prev.queryHistory],
      };
    });
  }

  function clearQueryHistory() {
    setStore((prev) => ({ ...prev, queryHistory: [] }));
  }

  function combineFilters(
    query: string,
    tags: Tags[],
    selectedAuthors: string[],
    selectedTypes: string[]
  ) {
    const words = query
      .replace(/[^\w\s]/g, "")
      .toLowerCase()
      .split(" ")
      .filter(Boolean);

    const importantWords = removeStopwords(words, eng);
    const expandedWords = expandSearch(importantWords);

    const selectedTags = tags.filter((tag) => tag.selected);
    const fuse = new Fuse(store.resources, {
      keys: ["name", "author", "resourceType"],
      threshold: 0.1,
      includeScore: true,
      minMatchCharLength: 2,
      isCaseSensitive: false,
      ignoreLocation: true,
    });

    const uniqueResultsMatched = new Set<Resources>();
    expandedWords.forEach((word) => {
      const matches = fuse.search(word);
      matches.forEach((match) => {
        //add score to results to show most relevant results?
        uniqueResultsMatched.add(match.item);
      });
    });

    const fusedResults =
      expandedWords.length > 0
        ? Array.from(uniqueResultsMatched)
        : store.resources;

    const results = fusedResults.filter((post) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.appliedTags.includes(tag.id));

      const matchesAuthor =
        selectedAuthors.length === 0 || selectedAuthors.includes(post.author);

      const matchResourceType =
        selectedTypes.length === 0 || selectedTypes.includes(post.resourceType);

      return matchesTags && matchesAuthor && matchResourceType;
    });

    setStore((prev) => ({ ...prev, filteredResources: results }));
  }

  function searchResources(query: string) {
    setStore((prev) => ({ ...prev, query: query }));
    combineFilters(query, store.tags, store.authors, store.resourcesType);
  }

  function handleClickedTags(clickedTag: Tags) {
    const updatedTags = store.tags.map((tag) =>
      tag.id === clickedTag.id ? { ...tag, selected: !tag.selected } : tag
    );

    setStore((prev) => ({ ...prev, tags: updatedTags }));
    combineFilters(
      store.query,
      updatedTags,
      store.authors,
      store.resourcesType
    );
  }

  function handleAuthorSelected(selectedAuthor: string) {
    const isSelected = store.authors.includes(selectedAuthor);
    const updatedAuthors = isSelected
      ? store.authors.filter((author) => author !== selectedAuthor)
      : [...store.authors, selectedAuthor];
    setStore((prev) => ({ ...prev, authors: updatedAuthors }));
    combineFilters(
      store.query,
      store.tags,
      updatedAuthors,
      store.resourcesType
    );
  }

  function handleResourceTypeSelected(resourceTypeSelected: string) {
    const isSelected = store.resourcesType.includes(resourceTypeSelected);
    const updateResourcesType = isSelected
      ? store.resourcesType.filter(
          (resourceType) => resourceType !== resourceTypeSelected
        )
      : [...store.resourcesType, resourceTypeSelected];
    setStore((prev) => ({ ...prev, resourcesType: updateResourcesType }));
    combineFilters(store.query, store.tags, store.authors, updateResourcesType);
  }

  function clearFilterResources() {
    setStore((prev) => {
      const clearedTags = prev.tags.map((tag) => ({ ...tag, selected: false }));
      return {
        ...prev,
        tags: clearedTags,
        authors: [],
        resourcesType: [],
        query: "",
        filteredResources: prev.resources,
      };
    });
  }

  function updateQuery(query: string) {
    setStore((prev) => ({ ...prev, query }));
  }

  function resetFilters() {
    const clearedTags = FALLBACK_TAGS.map((tag) => ({
      ...tag,
      selected: false,
    }));

    setStore((prev) => ({
      ...prev,
      authors: [],
      resourcesType: [],
      tags: clearedTags,
    }));

    combineFilters(store.query, clearedTags, [], []);
  }
  function updateFilteredResources(sortedResources: Resources[]) {
    setStore((prev) => ({ ...prev, filteredResources: sortedResources }));
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
        handleAuthorSelected,
        handleResourceTypeSelected,
        resetFilters,
        saveToQueryHistory,
        clearQueryHistory,
        placeholder,
        updatePlaceholder,
        updateFilteredResources,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
