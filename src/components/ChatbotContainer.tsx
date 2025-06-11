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
        className="flex items-center text-base px-3 py-2 rounded-md border-2 border-neutral-50 text-neutral-50 bg-[#2A598F] hover:bg-[#2A598F]/90 cursor-pointer"
        type="button"
        aria-label="Toggle Chatbot"
      >
        <LiaCompassSolid className="size-5 mr-1" />
        {showChat ? "Close" : "Ask Devy Jones"}
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="absolute bottom-full mb-3 w-full shadow-sm/20 z-40 max-h-[70vh] overflow-y-auto">
          <Prompt />
        </div>
      )}
    </div>
  );
}
