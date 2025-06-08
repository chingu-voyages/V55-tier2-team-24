import { useStoreContext } from "../context/StoreContext";
import { FALLBACK_TAGS } from "../helpers/fallbackData";
import NotFound from "./NotFound";
import EmptySearchPage from "./EmptySearchPage";
import SortByDate from "./SortByDate";

export default function ResourcesC() {
  const { store } = useStoreContext();
  const filteredResources = store.filteredResources;
  if (filteredResources.length === store.resources.length) {
    return (
      <div className="bg-white h-full w-full">
        <EmptySearchPage />
      </div>
    );
  }
  if (filteredResources.length === 0) {
    return (
      <div className="bg-white w-full">
        <NotFound />
      </div>
    );
  } else {
    return (
      <section className="bg-white w-[100%]">
        <SortByDate />
        {filteredResources.map((resource) => (
          <div key={resource.id} className="m-8 bg-amber-100">
            <div>{resource.name}</div>
            <h4>
              {resource.author === "jdmedlock"
                ? "Jim"
                : resource.author === "andresc1310"
                ? "Andres"
                : resource.author}
            </h4>
            <h4>{resource.resourceType}</h4>
            <a href={resource.url} className="text-blue-900">
              {resource.url}{" "}
            </a>

            <div className="flex gap-1.5">
              {resource.appliedTags.map((tagId) => {
                const tagName = FALLBACK_TAGS.find(
                  (tag) => tag.id === tagId
                )?.tag;
                return (
                  <div className="bg-amber-400 w-20 " key={tagId}>
                    {tagName}
                  </div>
                );
              })}
            </div>
            <button className="bg-red-600 w-40 hover:scale-105">
              Save to favorites
            </button>
          </div>
        ))}
      </section>
    );
  }
}
