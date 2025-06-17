import { useStoreContext } from "../context/StoreContext";

export default function ChinguButton() {
  const { updateQuery, searchResources, saveToQueryHistory } =
    useStoreContext();

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
