import { useStoreContext } from "../context/StoreContext";

export default function Resources() {
  const { store } = useStoreContext();
  const filteredResources = store.filteredResources;
  console.log(filteredResources);

  return (
    <section className="">
      {filteredResources.map((resource) => (
        <div key={resource.id} className="m-8 bg-amber-100">
          {resource.name}
        </div>
      ))}
    </section>
  );
}
