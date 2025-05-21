import React, { createContext, useContext, useEffect, useState } from "react";
import type { Store, StoreContext } from "../Types";
import { usePersistedState } from "../hooks/usePersistedState";
import getDataFromApi from "../helpers/getDataFromApi";

export const storeContext = createContext<StoreContext>({
  store: { filteredResults: [], tags: [], resources: [], lastUpdate: "" },
});

export default function StoreContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store, setStore] = usePersistedState<Store>("store", {
    filteredResults: [],
    tags: [],
    resources: [],
    lastUpdate: "",
  });

  console.log(store);

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
    <storeContext.Provider value={{ store }}>{children}</storeContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(storeContext);
}
