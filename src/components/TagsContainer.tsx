import { useContext } from "react";
import type { Tags } from "../Types";
import { storeContext } from "../context/StoreContext";

export default function TagsContainer() {
  const { handleClickedTags, store } = useContext(storeContext);
  function handleTagClick(tagClicked: Tags) {
    handleClickedTags(tagClicked);
  }
  return (
    <div className="bg-amber-200  flex w-full  flex-wrap">
      {store.tags.map((tag, idx) => {
        if (idx < 20) {
          return (
            <button
              onClick={() => handleTagClick(tag)}
              key={tag.id}
              className={`h-12 m-1 hover:scale-105  ${
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
