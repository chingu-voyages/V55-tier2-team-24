import React, { createContext, useContext, useEffect } from "react";
import type { Store, StoreContext } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";
import { FALLBACK_RESOURCES, FALLBACK_TAGS } from "../helpers/fallbackData";

export const storeContext = createContext<StoreContext>({
  store: { filteredResources: [], tags: [], resources: [], lastUpdate: "" },
  filterResources: () => undefined,
  clearFilterResources: () => undefined,
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
    const results = store.resources.filter((resource) => {
      return resource.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    console.log(results);
    if (results.length === 0) {
      console.log("no resources found");
      setStore((prev) => {
        return {
          ...prev,
          filteredResources: [
            {
              author: "",
              name: "No resources found",
              appliedTags: [""],
              url: "",
              createdAt: "",
              id: "",
            },
          ],
        };
      });
    } else {
      setStore((prev) => {
        return { ...prev, filteredResources: results };
      });
    }
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
          console.log(data);
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
      value={{ store, filterResources, clearFilterResources }}
    >
      {children}
    </storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
