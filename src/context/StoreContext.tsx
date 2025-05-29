import React, { createContext, useContext, useEffect } from "react";
import type { Store, StoreContext, Tags } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";
import { FALLBACK_RESOURCES, FALLBACK_TAGS } from "../helpers/fallbackData";

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
    const selectedTags = tags.filter((tag) => tag.selected);

    const results = store.resources.filter((post) => {
      const matchQuery =
        words.length === 0 ||
        words.some((word) => post.name.toLowerCase().includes(word));
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.appliedTags.includes(tag.id));

      return matchQuery && matchesTags;
    });

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
