import { useState, useEffect, useRef } from "react";
import { TextField, Autocomplete, IconButton } from "@mui/material";
import { MdClear, MdSearch } from "react-icons/md";
import { searchPlaceHolders } from "../helpers/placeHolders";
import { useStoreContext } from "../context/StoreContext";

export default function SearchInput() {
  const { store, updateQuery, clearQueryHistory } = useStoreContext();
  const [placeholder, setPlaceHolder] = useState("");
  const pastQueries = store.queryHistory;
  const optionsWithClear =
    pastQueries.length > 0 ? [...pastQueries, "Clear History"] : [];
  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSearchQueryChange(
    _event: React.SyntheticEvent<Element, Event>,
    value: string
  ) {
    if (value === "Clear History") {
      clearQueryHistory();
      updateQuery("");
      return;
    }

    updateQuery(value);
  }

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * searchPlaceHolders.length);
    setPlaceHolder(searchPlaceHolders[randomNumber]);
    searchRef?.current?.focus();
  }, []);

  return (
    <Autocomplete
      freeSolo
      autoFocus
      autoHighlight
      options={optionsWithClear}
      renderOption={(props, option) => {
        if (option === "Clear History") {
          return (
            <li {...props} style={{ color: "blue" }}>
              Clear Search History
            </li>
          );
        }
        return <li {...props}>{option}</li>;
      }}
      inputValue={store.query}
      onInputChange={handleSearchQueryChange}
      id="userQuery"
      renderInput={(params) => (
        <TextField
          inputRef={searchRef}
          className="search_bar_input_field"
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,

            endAdornment: (
              <>
                {store.query ? (
                  <IconButton
                    onClick={() => {
                      const randomNumber = Math.floor(
                        Math.random() * searchPlaceHolders.length
                      );
                      setPlaceHolder(searchPlaceHolders[randomNumber]);
                      updateQuery("");
                    }}
                  >
                    {" "}
                    <MdClear />
                  </IconButton>
                ) : (
                  <IconButton>
                    <MdSearch />
                  </IconButton>
                )}
              </>
            ),
          }}
        />
      )}
    />
  );
}
