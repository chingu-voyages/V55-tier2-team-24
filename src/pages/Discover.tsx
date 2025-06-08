import Authors from "../components/Authors";
import Form from "../components/Form";
import ResetFilters from "../components/ResetFilters";
import ResourcesC from "../components/ResourcesC";
import ResourceType from "../components/ResourceType";
import TagsContainer from "../components/TagsContainer";

export default function Discover() {
  return (
    <main>
      <div className="flex flex-col w-full md:flex-row mr-10">
        <aside className="w-96 px-4 py-6 border-gray-200 z-10">
          <Form />
          <TagsContainer />
          <Authors />
          {/* replace resource type with topics */}
          {/* <Topics /> */}
          <ResourceType />
          <ResetFilters />
        </aside>

        <section className="flex flex-col items-start overflow-auto flex-1 p-6">
          <ResourcesC />
        </section>
      </div>
    </main>
  );
}
