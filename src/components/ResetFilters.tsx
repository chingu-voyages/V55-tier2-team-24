import { useStoreContext } from "../context/StoreContext";

export default function ResetFilters() {
  const { resetFilters } = useStoreContext();
  return (
    <button
      onClick={resetFilters}
      className="bg-gray-600 text-white w-[90%] font-medium py-3 px-4 rounded-sm transition duration-200 flex items-center justify-center cursor-pointer"
    >
      Reset filters
    </button>
  );
}
