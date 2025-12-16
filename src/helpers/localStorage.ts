import logError from "./logError";

export function setItem(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logError(error);
  }
}

export function getItem(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  } catch (error) {
    logError(error);
  }
}
