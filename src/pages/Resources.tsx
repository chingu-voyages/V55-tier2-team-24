import Form from "../components/Form";
import ResourcesC from "../components/ResourcesC";
import TagsContainer from "../components/TagsContainer";

export default function Resources() {
  return (
    <main className="flex  flex-grow bg-white w-full">
      <aside className=" flex flex-col items-center bg-amber-200 w-[40%]">
        <Form />
        <TagsContainer />
      </aside>
      <section className=" flex flex-col items-center justify-items-start flex-grow  w-[60%]">
        <ResourcesC />
      </section>
    </main>
  );
}
