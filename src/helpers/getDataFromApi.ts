import axios from "axios";
import type { Resources, Tags } from "../Types";
import isValidUrl from "./isValidUrl";
import getResourceType from "./getResourceType";

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

    console.log(resources.data.length);

    const validUrlResources = resourcesData.filter((resource) =>
      isValidUrl(resource)
    );

    const resourcesWithType = validUrlResources.map((resource) => ({
      ...resource,
      resourceType: getResourceType(resource.url),
    }));

    const uniqueResources = Array.from(
      new Map(
        resourcesWithType.map((resource) => [resource.id, resource])
      ).values()
    );
    console.log(uniqueResources);
    return [tagsData, uniqueResources];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
