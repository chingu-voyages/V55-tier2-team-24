import { useStoreContext } from "../context/StoreContext";

export default function Resources() {
  const { store } = useStoreContext();
  const filteredResources = store.filteredResources;
  if (filteredResources.length === store.resources.length) {
    return (
      <div className="bg-white h-full">
        <h1>Search</h1>
      </div>
    );
  }
  if (filteredResources.length === 0) {
    return (
      <div className="bg-white">
        <h1>No Found</h1>
      </div>
    );
  } else {
    return (
      <section className="bg-white">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="m-8 bg-amber-100">
            {resource.name}
          </div>
        ))}
      </section>
    );
  }
}
