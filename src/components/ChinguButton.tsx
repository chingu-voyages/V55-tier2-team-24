import { useStoreContext } from "../context/StoreContext";
import { useQueryHistoryContext } from "../context/QueryHistoryContext";

export default function ChinguButton() {
  const { updateQuery, searchResources } = useStoreContext();
  const { saveToQueryHistory } = useQueryHistoryContext();

  function handleClick() {
    updateQuery("Chingu Starter Pack");
    searchResources("Chingu Starter Pack");
    saveToQueryHistory("Chingu Starter Pack");
  }

  return (
    <p className="text-sm">
      New to chingu? search{" "}
      <button
        type="button"
        className="text-blue-800 hover:text-blue-600 cursor-pointer"
        onClick={handleClick}
      >
        Chingu Starter Pack
      </button>
    </p>
  );
}
