import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useStoreContext } from "../context/StoreContext";

export default function Authors() {
  const { store, handleAuthorSelected } = useStoreContext();
  const allAuthors = [
    ...new Set(store.resources.map((resource) => resource.author)),
  ];

  const authorsToDisplay = allAuthors.filter((autor) =>
    ["jdmedlock", "andresc1310", "Chingu", "Josh Comeau"].includes(autor)
  );

  return (
    <section className="flex flex-col mt-5">
      <h4 className=" mb-2">Author</h4>
      <FormGroup className="ml-2">
        {authorsToDisplay.map((author) => (
          <FormControlLabel
            key={author}
            control={
              <Checkbox
                checked={store.authors ? store.authors.includes(author) : false}
                onChange={() => handleAuthorSelected(author)}
              />
            }
            label={
              author === "jdmedlock"
                ? "Jim"
                : author === "andresc1310"
                ? "Andres"
                : author
            }
          />
        ))}
      </FormGroup>
    </section>
  );
}
