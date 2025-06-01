import Authors from "../components/Authors";
import Form from "../components/Form";
import ResetFilters from "../components/ResetFilters";
import ResourcesC from "../components/ResourcesC";
import ResourceType from "../components/ResourceType";
import TagsContainer from "../components/TagsContainer";
// import Topics from "../components/Topics";

export default function Resources() {
  return (
    <main className="flex  flex-grow bg-white w-full">
      <aside className=" flex flex-col items-center w-[20%]">
        <Form />
        <TagsContainer />
        <Authors />
        {/* <Topics /> */}
        <ResourceType />
        <ResetFilters />
      </aside>
      <section className=" flex flex-col items-center justify-items-start flex-grow  w-[60%]">
        <ResourcesC />
      </section>
    </main>
  );
}
