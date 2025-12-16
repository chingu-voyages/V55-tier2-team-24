import React, { createContext, useCallback, useContext, useMemo } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

export interface QueryHistoryContext {
  queryHistory: string[];
  saveToQueryHistory: (query: string) => void;
  clearQueryHistory: () => void;
}

export const QueryHistoryContext = createContext<QueryHistoryContext>({
  queryHistory: [],
  saveToQueryHistory: () => undefined,
  clearQueryHistory: () => undefined,
});

export default function QueryHistoryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = usePersistedState<string[]>("history", []);

  const saveToQueryHistory = useCallback(
    (query: string) => {
      if (!query.trim()) return;

      setHistory((prev) => {
        if (prev.includes(query)) return prev;

        return [query, ...prev];
      });
    },
    [setHistory]
  );

  const clearQueryHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const queryHistoryContextValue = useMemo(
    () => ({
      queryHistory: history,
      saveToQueryHistory,
      clearQueryHistory,
    }),
    [history, saveToQueryHistory, clearQueryHistory]
  );
  return (
    <QueryHistoryContext.Provider value={queryHistoryContextValue}>
      {children}
    </QueryHistoryContext.Provider>
  );
}

export function useQueryHistoryContext() {
  return useContext(QueryHistoryContext);
}
