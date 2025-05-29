import { useState } from 'react';
import Prompt from './Prompt';
import { IoChatbubblesOutline } from 'react-icons/io5';

export default function ChatBotContainer() {
  const [showChat, setShowChat] = useState<boolean>(false);

  const toggleChat = () => {
    setShowChat(prev => !prev);
  };

  return (
    <div className="w-full flex flex-col items-end px-4 py-4">
      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 bg-[#1F2937] hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
        type="button"
        aria-label="Toggle Chatbot"
      >
        {showChat ? 'Close' : 'Chat'}
        <IoChatbubblesOutline />
      </button>

      {/* Chat Window */}
      {showChat && (
        <div className="w-full max-w-md mt-4 bg-white text-black border border-gray-300 rounded-lg shadow-lg p-4 dark:bg-gray-800 dark:text-white">
          <Prompt />
        </div>
      )}
    </div>
  );
}
