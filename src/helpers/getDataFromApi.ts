import axios from "axios";
import type { Resources, Tags } from "../Types";
import isValidUrl from "./isValidUrl";

export default async function getDataFromApi(): Promise<
  [Tags[], Resources[]] | undefined
> {
  try {
    const [tags, resources] = await Promise.all([
      axios.get<Tags[]>("https://seshatbe.up.railway.app/tags"),
      axios.get<Resources[]>("https://seshatbe.up.railway.app/resources"),
    ]);
    const tagsData = tags.data.map((tag) => {
      return { ...tag, selected: false };
    });
    const resourcesData = resources.data;
    const validUrlResources = resourcesData.filter((resource) =>
      isValidUrl(resource)
    );
    const uniqueResources = Array.from(
      new Map(
        validUrlResources.map((resource) => [resource.id, resource])
      ).values()
    );
    return [tagsData, uniqueResources];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
