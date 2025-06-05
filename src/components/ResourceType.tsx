import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useStoreContext } from "../context/StoreContext";

export default function ResourceType() {
  const { store, handleResourceTypeSelected } = useStoreContext();
  const resourcesTypes = ["video", "article"];
  return (
    <section className="flex flex-col mt-5">
      <h4 className=" mb-2">Type</h4>
      <FormGroup className="ml-2">
        {resourcesTypes.map((resourceType) => (
          <FormControlLabel
            key={resourceType}
            control={
              <Checkbox
                checked={store.resourcesType.includes(resourceType)}
                onChange={() => handleResourceTypeSelected(resourceType)}
              />
            }
            label={resourceType}
          />
        ))}
      </FormGroup>
    </section>
  );
}
