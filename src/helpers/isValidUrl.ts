import type { Resources } from "../Types";
import logError from "./logError";

export default function isValidUrl(resource: Resources) {
  try {
    new URL(resource.url);
    return true;
  } catch (error) {
    logError(error);
    return false;
  }
}
