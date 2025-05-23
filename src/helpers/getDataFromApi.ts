import axios from "axios";
import type { Resources, Tags } from "../Types";

export default async function getDataFromApi(): Promise<
  [Tags[], Resources[]] | undefined
> {
  try {
    const [tags, resources] = await Promise.all([
      axios.get<Tags[]>("https://seshatbe.up.railway.app/tags"),
      axios.get<Resources[]>("https://seshatbe.up.railway.app/resources"),
    ]);
    const tagsData = tags.data;
    const resourcesData = resources.data;
    return [tagsData, resourcesData];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
