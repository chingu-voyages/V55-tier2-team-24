import { useContext, useState } from "react";
import type { Tags } from "../Types";
import { storeContext } from "../context/StoreContext";
import {
  SiReact,
  SiTypescript,
  SiCss3,
  SiPython,
  SiJavascript,
  SiNextdotjs,
  SiHtml5,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiMysql,
  SiRuby,
  SiGo,
  SiVuedotjs,
} from "react-icons/si";
import { FaRobot, FaRegCircle, FaUser } from "react-icons/fa";

export default function TagsContainer() {
  const { handleClickedTags, store } = useContext(storeContext);
  const [isShowAll, setIsShowAll] = useState(false);

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
    html: <SiHtml5 className="text-red-500" />,
    "node.js": <SiNodedotjs className="text-green-600" />,
    git: <SiGit />,
    github: <SiGithub />,
    sql: <SiMysql />,
    ruby: <SiRuby />,
    golang: <SiGo />,
    general: <FaRegCircle />,
    career: <FaUser />,
    vue: <SiVuedotjs />,
  };

  function handleTagClick(tagClicked: Tags) {
    handleClickedTags(tagClicked);
  }

  const filteredTags = isShowAll
    ? store.tags
    : store.tags.filter((tag) =>
        tagsToDisplay.includes(tag.tag.toLocaleLowerCase())
      );
  return (
    <>
      <div className="flex flex-col">
        <h4 className="mb-2">Tags</h4>
        <section className="flex flex-wrap gap-2 w-full max-width-full">
          {filteredTags.map((tag) => {
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
          })}
          <button
            className="text-sm p-2 text-blue-600 cursor-pointer"
            onClick={() => setIsShowAll((prev) => !prev)}
          >
            {isShowAll ? "Show less" : "Show All"}
          </button>
        </section>
      </div>
    </>
  );
}
