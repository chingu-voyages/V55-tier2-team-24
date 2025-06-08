export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("eng-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
