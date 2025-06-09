import { useContext } from "react";
import type { Tags } from "../Types";
import { storeContext } from "../context/StoreContext";
import {
  SiReact,
  SiTypescript,
  SiCss3,
  SiPython,
  SiJavascript,
  SiNextdotjs,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

export default function TagsContainer() {
  const { handleClickedTags, store } = useContext(storeContext);

  const tagsToDisplay = [
    "react",
    "typescript",
    "🤖 ai",
    "css",
    "python",
    "javascript",
    "next.js",
  ];

  const tagsIcons = {
    react: <SiReact className="text-blue-500" />,
    typescript: <SiTypescript className="text-blue-500" />,
    css: <SiCss3 className="text-red-500" />,
    python: <SiPython className="text-yellow-500 " />,
    javascript: <SiJavascript className="text-yellow-500 bg-black" />,
    "next.js": <SiNextdotjs className="text-black" />,
    ai: <FaRobot className="text-slate-500" />,
  };

  function handleTagClick(tagClicked: Tags) {
    handleClickedTags(tagClicked);
  }
  return (
    <>
      <div className="flex flex-col">
        <h4 className="mb-2">Tags</h4>
        <section className="flex flex-wrap gap-2 w-full max-width-full">
          {store.tags.map((tag) => {
            if (tagsToDisplay.includes(tag.tag.toLocaleLowerCase())) {
              return (
                <button
                  onClick={() => handleTagClick(tag)}
                  key={tag.id}
                  className={`p-1 text-sm flex items-center m-1 hover:scale-105 rounded-sm whitespace-nowrap gap-0.5 ${
                    tag.selected === true
                      ? "bg-cyan-500 text-black"
                      : "bg-gray-200"
                  }`}
                >
                  <span>
                    {tagsIcons[tag.tag.toLowerCase() as keyof typeof tagsIcons]}
                  </span>

                  <span>{tag.tag}</span>
                </button>
              );
            }
          })}
        </section>
      </div>
    </>
  );
}
