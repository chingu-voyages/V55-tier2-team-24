export default function getResourceType(url: string) {
  const lowerCaseUrl = url.toLowerCase();

  if (lowerCaseUrl.includes("youtube") || lowerCaseUrl.includes("vimeo")) {
    return "video";
  } else {
    return "article";
  }
}
