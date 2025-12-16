import { useEffect, useRef } from "react";
import { TextField, Autocomplete, IconButton } from "@mui/material";
import { MdClear, MdSearch } from "react-icons/md";
import { useStoreContext } from "../context/StoreContext";
import { useQueryHistoryContext } from "../context/QueryHistoryContext";
import useAnimatedText from "../hooks/useAnimatedText";
import usePlaceHolder from "../hooks/useplaceHolder";

export default function SearchInput() {
  const { store, updateQuery } = useStoreContext();
  const { placeholder } = usePlaceHolder();
  const { queryHistory, clearQueryHistory } = useQueryHistoryContext();
  const pastQueries = queryHistory;
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
    searchRef?.current?.focus();
  }, []);

  const animatedPlaceHolder = useAnimatedText(placeholder);

  return (
    <Autocomplete
      freeSolo
      autoFocus
      autoHighlight
      options={optionsWithClear}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        if (option === "Clear History") {
          return (
            <li key={key} {...rest} style={{ color: "blue" }}>
              Clear Search History
            </li>
          );
        }
        return (
          <li key={key} {...rest}>
            {option}
          </li>
        );
      }}
      inputValue={store.query}
      onInputChange={handleSearchQueryChange}
      id="userQuery"
      renderInput={(params) => (
        <TextField
          inputRef={searchRef}
          className="search_bar_input_field"
          {...params}
          placeholder={animatedPlaceHolder}
          InputProps={{
            ...params.InputProps,

            endAdornment: (
              <div className="absolute right-2">
                {store.query ? (
                  <IconButton
                    onClick={() => {
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
              </div>
            ),
          }}
        />
      )}
    />
  );
}
