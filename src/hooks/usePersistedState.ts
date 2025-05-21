import { useEffect } from "react";
import { useState } from "react";
import { getItem, setItem } from "../helpers/localStorage";

export function usePersistedState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const item = getItem(key);
    return (item as T) || initialValue;
  });

  useEffect(() => {
    setItem(key, value);
  }, [value, key]);

  return [value, setValue] as const;
}
