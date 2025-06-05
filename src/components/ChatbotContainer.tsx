import { useState } from "react";
import Prompt from "./Prompt";
import { LiaCompassSolid } from "react-icons/lia";

export default function ChatBotContainer() {
  const [showChat, setShowChat] = useState<boolean>(false);

  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <div className="relative w-full max-w-sm flex flex-col items-end z-40">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="flex items-center text-base px-3 py-2 rounded-md border-2 border-neutral-50 text-neutral-50 bg-[#2A598F] hover:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
        type="button"
        aria-label="Toggle Chatbot"
      >
        <LiaCompassSolid />
        {showChat ? "Close" : "Ask Devy Jones"}
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="absolute bottom-full mb-3 w-full z-40 max-h-[70vh] overflow-y-auto">
          <Prompt />
        </div>
      )}
    </div>
  );
}
