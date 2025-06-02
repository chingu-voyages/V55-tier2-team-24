import Authors from "../components/Authors";
import Form from "../components/Form";
import ResetFilters from "../components/ResetFilters";
import ResourcesC from "../components/ResourcesC";
import ResourceType from "../components/ResourceType";
import TagsContainer from "../components/TagsContainer";
// import Topics from "../components/Topics";
import ChatBotContainer from "../components/ChatbotContainer";

export default function Discover() {
  return (
    <main className="flex flex-col min-h-screen bg-white w-full">
      <div className="flex flex-1 w-full">
        <aside className="w-96 p-4 border-gray-400">
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
  
      {/* Chatbot container aligned to bottom right of the full layout */}
      <div className="w-full flex justify-end px-6 pb-6">
        <ChatBotContainer />
      </div>
    </main>
  );
}