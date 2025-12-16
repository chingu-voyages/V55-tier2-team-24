import { useEffect, useState } from "react";
import { searchPlaceHolders } from "../helpers/placeHolders";

export default function usePlaceHolder() {
  const [placeholder, setPlaceHolder] = useState(
    searchPlaceHolders[Math.floor(Math.random() * searchPlaceHolders.length)]
  );

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setPlaceHolder(
        searchPlaceHolders[
          Math.floor(Math.random() * searchPlaceHolders.length)
        ]
      );
    }, 6000);

    return () => clearInterval(timeInterval);
  }, []);

  return { placeholder, setPlaceHolder };
}
