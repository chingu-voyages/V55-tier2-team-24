import { useEffect, useRef } from "react";
import { TextField, Autocomplete, IconButton } from "@mui/material";
import { MdClear, MdSearch } from "react-icons/md";
import { useStoreContext } from "../context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchInput() {
  const location = useLocation();
  const currentUrlLocation = location.pathname;
  const navigate = useNavigate();

  const {
    store,
    updateQuery,
    clearQueryHistory,
    placeholder,
    updatePlaceholder,
    searchResources,
  } = useStoreContext();
  const pastQueries = store.queryHistory;
  const optionsWithClear =
    pastQueries.length > 0 ? [...pastQueries, "Clear History"] : [];
  const searchRef = useRef<HTMLInputElement | null>(null);

  function handleSearchQueryChange(
    _event: React.SyntheticEvent<Element, Event>,
    value: string
  ) {
    //handle keyword entered
    if (value === "Clear History") {
      clearQueryHistory();
      updateQuery("");
      updatePlaceholder();
      return;
    }

    updateQuery(value);
  }

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

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
      onChange={(_event, value) => {
        if (value === "Clear History") {
          clearQueryHistory();
          updateQuery("");
          updatePlaceholder();
          return;
        }
        if (value) {
          searchResources(value);
          if (currentUrlLocation === "/") {
            navigate("Discover");
          }
        }
      }}
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
              <div className="absolute right-2">
                {store.query ? (
                  <IconButton
                    onClick={() => {
                      updateQuery("");
                      updatePlaceholder();
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
