import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useStoreContext } from "../context/StoreContext";

export default function Authors() {
  const { store, handleAuthorSelected } = useStoreContext();
  const authors = ["jdmedlock", "andresc1310"];
  return (
    <section className="w-80 flex flex-col mt-20">
      <h4>Author</h4>
      <FormGroup className=" ml-4">
        {authors.map((author) => (
          <FormControlLabel
            key={author}
            control={
              <Checkbox
                checked={store.authors ? store.authors.includes(author) : false}
                onChange={() => handleAuthorSelected(author)}
              />
            }
            label={author}
          />
        ))}
      </FormGroup>
    </section>
  );
}
