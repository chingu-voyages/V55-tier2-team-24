import { FALLBACK_TAGS } from "../helpers/fallbackData";
import type { Tags } from "../Types";

export default function TagsContainer() {
  function handleTagClick(tagCliked: Tags) {
    //add a click property to the tag object.
    //re render setTaggs to click or no clicke
    console.log(tagCliked);
  }
  return (
    <div className="bg-white flex w-1/4 justify-center">
      {FALLBACK_TAGS.map((tag, idx) => {
        if (idx < 2) {
          return (
            <button
              onClick={() => handleTagClick(tag)}
              key={tag.id}
              className="w-24 h-12 bg-amber-400 m-4 hover:scale-125"
            >
              {tag.tag}
            </button>
          );
        }
      })}
    </div>
  );
}
