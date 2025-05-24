import type { Resources } from "../Types";

export default function isValidUrl(resource: Resources) {
  try {
    new URL(resource.url);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
