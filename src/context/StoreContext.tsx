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
  },

  filterResources: () => undefined,
  clearFilterResources: () => undefined,
  filterResourcesByTag: () => undefined,
});

export default function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = usePersistedState<Store>("store", {
    filteredResources: [],
    tags: FALLBACK_TAGS,
    resources: FALLBACK_RESOURCES,
    lastUpdate: "",
  });

  function filterResources(searchQuery: string) {
    const noCommasSearchQuery = searchQuery.replace(/,/g, "");
    //next update so it can filter using that numbers

    const words = noCommasSearchQuery.split(" ").map((w) => w.trim());
    const results = store.resources.filter((post) => {
      const match = words.some((word) =>
        post.name.toLowerCase().includes(word)
      );
      return match;
    });
    if (results.length === 0) {
      console.log("no results found");
    }

    setStore((prev) => {
      return { ...prev, filteredResources: results };
    });
  }

  function filterResourcesByTag(tags: Tags[]) {
    const results = store.resources.filter((post) => {
      const match = tags.some((tag) => post.appliedTags.includes(tag.id));
      return match;
    });

    console.log(results);

    //update results don't replace

    // setStore((prev) => {
    //   return { ...prev, filteredResources: results };
    // });
  }

  function clearFilterResources() {
    setStore((prev) => {
      return { ...prev, filteredResources: [] };
    });
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
        filterResources,
        clearFilterResources,
        filterResourcesByTag,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
