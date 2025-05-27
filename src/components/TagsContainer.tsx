import { useContext } from "react";
import type { Tags } from "../Types";
import { storeContext } from "../context/StoreContext";

export default function TagsContainer() {
  const { handleClickedTags, store } = useContext(storeContext);
  function handleTagClick(tagClicked: Tags) {
    handleClickedTags(tagClicked);
  }
  return (
    <div className="bg-white flex w-1/4  h-1/4">
      {store.tags.map((tag, idx) => {
        if (idx < 5) {
          return (
            <button
              onClick={() => handleTagClick(tag)}
              key={tag.id}
              className={`w-24 h-12  m-2 hover:scale-125  ${
                tag.selected === true ? "bg-red-700" : "bg-amber-400"
              }`}
            >
              {tag.tag}
            </button>
          );
        }
      })}
    </div>
  );
}
