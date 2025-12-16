import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import type { Resources, Store, StoreContext, Tags } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";
import { FALLBACK_RESOURCES, FALLBACK_TAGS } from "../helpers/fallbackData";
import Fuse from "fuse.js";
import { removeStopwords, eng } from "stopword";
import { expandSearch } from "../helpers/expandSearch";
import logError from "../helpers/logError";

export const storeContext = createContext<StoreContext>({
  store: {
    filteredResources: [],
    tags: [],
    resources: [],
    lastUpdate: "",
    query: "",
    authors: [],
    resourcesType: [],
    sortedValue: "",
  },
  clearFilterResources: () => undefined,
  searchResources: () => undefined,
  handleClickedTags: () => undefined,
  updateQuery: () => undefined,
  handleAuthorSelected: () => undefined,
  handleResourceTypeSelected: () => undefined,
  resetFilters: () => undefined,
  updateFilteredResources: () => undefined,
  updateSortedValue: () => undefined,
  updateFavorites: () => undefined,
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
    sortedValue: "newest",
  });

  const combineFilters = useCallback(
    (
      query: string,
      tags: Tags[],
      selectedAuthors: string[],
      selectedTypes: string[]
    ) => {
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
          selectedTypes.length === 0 ||
          selectedTypes.includes(post.resourceType);

        return matchesTags && matchesAuthor && matchResourceType;
      });

      const sorted = results.sort((a, b) => {
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return bDate - aDate;
      });

      setStore((prev) => ({
        ...prev,
        filteredResources: sorted,
        sortedValue: "newest",
      }));
    },
    [setStore, store.resources]
  );

  const searchResources = useCallback(
    (query: string) => {
      setStore((prev) => ({ ...prev, query: query }));
      combineFilters(query, store.tags, store.authors, store.resourcesType);
    },
    [combineFilters, setStore, store.authors, store.resourcesType, store.tags]
  );

  const handleClickedTags = useCallback(
    (clickedTag: Tags) => {
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
    },
    [
      combineFilters,
      setStore,
      store.authors,
      store.query,
      store.resourcesType,
      store.tags,
    ]
  );

  const handleAuthorSelected = useCallback(
    (selectedAuthor: string) => {
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
    },
    [
      combineFilters,
      setStore,
      store.authors,
      store.query,
      store.resourcesType,
      store.tags,
    ]
  );

  const handleResourceTypeSelected = useCallback(
    (resourceTypeSelected: string) => {
      const isSelected = store.resourcesType.includes(resourceTypeSelected);
      const updateResourcesType = isSelected
        ? store.resourcesType.filter(
            (resourceType) => resourceType !== resourceTypeSelected
          )
        : [...store.resourcesType, resourceTypeSelected];
      setStore((prev) => ({ ...prev, resourcesType: updateResourcesType }));
      combineFilters(
        store.query,
        store.tags,
        store.authors,
        updateResourcesType
      );
    },
    [
      combineFilters,
      setStore,
      store.authors,
      store.query,
      store.resourcesType,
      store.tags,
    ]
  );

  const clearFilterResources = useCallback(() => {
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
  }, [setStore]);

  const updateQuery = useCallback(
    (query: string) => {
      setStore((prev) => ({ ...prev, query }));
    },
    [setStore]
  );

  const resetFilters = useCallback(() => {
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
  }, [combineFilters, setStore, store.query]);

  const updateFilteredResources = useCallback(
    (sortedResources: Resources[]) => {
      setStore((prev) => ({ ...prev, filteredResources: sortedResources }));
    },
    [setStore]
  );

  const updateSortedValue = useCallback(
    (newValue: string) => {
      setStore((prev) => ({ ...prev, sortedValue: newValue }));
    },
    [setStore]
  );

  const updateFavorites = useCallback(
    (favoriteResourceId: string) => {
      setStore((prev) => {
        const updatedResources = prev.resources.map((resource) =>
          resource.id === favoriteResourceId
            ? { ...resource, isFavorite: !resource.isFavorite }
            : resource
        );

        const updatedFilterResources = prev.filteredResources.map((resource) =>
          resource.id === favoriteResourceId
            ? { ...resource, isFavorite: !resource.isFavorite }
            : resource
        );

        return {
          ...prev,
          resources: updatedResources,
          filteredResources: updatedFilterResources,
        };
      });
    },
    [setStore]
  );

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (store.resources.length === 0 || today !== store.lastUpdate) {
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
          logError(error);
        });
    }
  }, [setStore, store.lastUpdate, store.resources.length]);

  const contextValue = useMemo(
    () => ({
      store,
      clearFilterResources,
      searchResources,
      handleClickedTags,
      updateQuery,
      handleAuthorSelected,
      handleResourceTypeSelected,
      resetFilters,
      updateFilteredResources,
      updateSortedValue,
      updateFavorites,
    }),
    [
      store,
      clearFilterResources,
      searchResources,
      handleClickedTags,
      updateQuery,
      handleAuthorSelected,
      handleResourceTypeSelected,
      resetFilters,
      updateFilteredResources,
      updateSortedValue,
      updateFavorites,
    ]
  );

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
