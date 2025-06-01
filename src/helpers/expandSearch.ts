import { KEYWORDS_MAP } from "./keywordsMap";

export function expandSearch(words: string[]) {
  const expanded = new Set(words);

  words.forEach((word) => {
    const mapped = KEYWORDS_MAP[word];
    if (mapped) {
      mapped.forEach((mappedWord) => expanded.add(mappedWord));
    }
  });

  return Array.from(expanded);
}
