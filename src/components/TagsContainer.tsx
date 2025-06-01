import { useContext } from "react";
import type { Tags } from "../Types";
import { storeContext } from "../context/StoreContext";

export default function TagsContainer() {
  const tagsToDisplay = [
    "react",
    "typescript",
    "🤖 ai",
    "css",
    "python",
    "javascript",
    "next.js",
  ];
  const { handleClickedTags, store } = useContext(storeContext);
  function handleTagClick(tagClicked: Tags) {
    handleClickedTags(tagClicked);
  }
  return (
    <>
      <div className="flex flex-col w-80 gap-2">
        <h4>Tags</h4>
        <section>
          {store.tags.map((tag) => {
            if (tagsToDisplay.includes(tag.tag.toLocaleLowerCase())) {
              return (
                <button
                  onClick={() => handleTagClick(tag)}
                  key={tag.id}
                  className={` m-1 hover:scale-105  p-1 rounded-sm ${
                    tag.selected === true ? "bg-red-700" : "bg-gray-200"
                  }`}
                >
                  {tag.tag}
                </button>
              );
            }
          })}
        </section>
      </div>
    </>
  );
}
