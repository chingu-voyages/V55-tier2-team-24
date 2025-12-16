export default function logError(error: unknown) {
  if (!import.meta.env.PROD) {
    console.error(error);
  }
}
