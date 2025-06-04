import Authors from "../components/Authors";
import Form from "../components/Form";
import ResetFilters from "../components/ResetFilters";
import ResourcesC from "../components/ResourcesC";
import ResourceType from "../components/ResourceType";
import TagsContainer from "../components/TagsContainer";
// import Topics from "../components/Topics";

export default function Discover() {
  return (
    <main>
      <div className="flex flex-1">
        <aside className="w-96 p-4 border-gray-400 z-10">
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