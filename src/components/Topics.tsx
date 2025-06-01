import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function Topics() {
  return (
    <section className="w-80 flex flex-col mt-20">
      <h4>Topics</h4>
      <FormGroup className=" ml-4">
        <FormControlLabel control={<Checkbox />} label="Frontend" />
        <FormControlLabel required control={<Checkbox />} label="Backend" />
        <FormControlLabel
          required
          control={<Checkbox />}
          label="UX/UI Design"
        />
      </FormGroup>
    </section>
  );
}
