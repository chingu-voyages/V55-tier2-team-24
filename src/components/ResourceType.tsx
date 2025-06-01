import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Authors() {
  return (
    <section className="w-80 flex flex-col mt-20">
      <h4>Author</h4>
      <FormGroup className=" ml-4">
        <FormControlLabel control={<Checkbox />} label="video" />
        <FormControlLabel control={<Checkbox />} label="article" />
      </FormGroup>
    </section>
  );
}
