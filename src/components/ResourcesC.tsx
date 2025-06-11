import { useStoreContext } from "../context/StoreContext";
import { FALLBACK_TAGS } from "../helpers/fallbackData";
import NotFound from "./NotFound";
import EmptySearchPage from "./EmptySearchPage";
import { IoPersonOutline } from "react-icons/io5";
import { RiArticleLine } from "react-icons/ri";
import { IoIosStarOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import SortBy from "./SortBy";
import { formatDate } from "../helpers/formatDate";
import Pagination from "./Paginate";

export default function ResourcesC() {
  const [favorite, setFavorite] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const { store } = useStoreContext();

  const filteredResources = store.filteredResources;
  useEffect(() => {
    setCurrentPage(0);
  }, [store.filteredResources]);
  // Used to calclate the starting index of the items to display
  const offset = currentPage * itemsPerPage;
  const paginatedResources = filteredResources.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredResources.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };
  

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
      <>
        {" "}
        <SortBy />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
          {paginatedResources.map((resource) => (
            <div
              key={resource.id}
              className="w-full max-w-md mx-auto bg-[#E5E7Eb] rounded-lg p-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {formatDate(resource.createdAt)}
                </span>
                
              </div>
              <div className="text-xl md:text-2xl underline underline-offset-4 mb-5 break-words">
                {resource.name}
              </div>
              <div className="w-full break-words">
                <a href={resource.url} className="text-blue-900 break-all">
                  {resource.url}{" "}
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-gray-600 text-sm md:text-base">
                <div className="flex items-center gap-1">
                  <IoPersonOutline />
                  <h4 className="text-sm md:text-base">
                    {resource.author === "jdmedlock"
                      ? "Jim"
                      : resource.author === "andresc1310"
                      ? "Andres"
                      : resource.author}
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <RiArticleLine />

                  <h4>{resource.resourceType}</h4>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 text-gray-400">
                {resource.appliedTags.map((tagId) => {
                  const tagName = FALLBACK_TAGS.find(
                    (tag) => tag.id === tagId
                  )?.tag;
                  return (
                    <div
                      className="border px-3 py-1 rounded text-center bg-gray-50 mt-5 shadow-sm"
                      key={tagId}
                    >
                      {tagName}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
        {pageCount > 1 && (
          <div className="w-full flex justify-center mt-6">
            <Pagination
              pageCount={pageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
        </div>
        )}
        <p className="w-full text-center text-sm text-gray-500 mt-2">
          Page {currentPage + 1} of {pageCount}
        </p>
      </>
    );
  }
}
