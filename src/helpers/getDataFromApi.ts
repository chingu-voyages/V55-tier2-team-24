import axios from "axios";
import type { Resources, Tags } from "../Types";
import isValidUrl from "./isValidUrl";
import getResourceType from "./getResourceType";

export default async function getDataFromApi(): Promise<
  [Tags[], Resources[]] | undefined
> {
  try {
    const [tags, resources] = await Promise.all([
      axios.get<Tags[]>(
        "https://resources-helper-temp-api.vercel.app/api/tags"
      ),
      axios.get<Resources[]>(
        "https://resources-helper-temp-api.vercel.app/api/resources"
      ),
    ]);
    const tagsData = tags.data.map((tag) => {
      return { ...tag, selected: false };
    });
    const resourcesData = resources.data;
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

    return [tagsData, uniqueResources];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
