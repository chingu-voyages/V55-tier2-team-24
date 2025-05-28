import Form from "../components/Form";
import ResourcesC from "../components/ResourcesC";
import TagsContainer from "../components/TagsContainer";

export default function Resources() {
  return (
    <main className="flex  flex-grow bg-white w-full">
      <aside className=" flex flex-col flex-grow bg-amber-200 w-1/4">
        <Form />
        <TagsContainer />
      </aside>
      <section className=" flex flex-col flex-grow bg-red-600 w-3/4">
        <ResourcesC />
      </section>
    </main>
  );
}
