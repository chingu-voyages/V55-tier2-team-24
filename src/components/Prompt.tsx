import { useState, type FormEvent, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
    role: "user" | "ai";
    text: string;
}

export default function Prompt() {
    const [inputValue, setInputValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // Suggested questions given to users
    const suggestions = [
        "What tags can I search for?",
        "What types of resources can I search for?",
        "What authors have contributed to this database?",
        "Can I save resources to view later?",
        "I’m a beginner—where should I start?",
    ];
    
    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault()

        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInputValue("");

        // Context information feed to Gemini API
        const contextInfo =
        'Use the following context information to answer the question: ' +
        '1. Users can search for these tags: JavaScript, React, TypeScript, AI, CSS, Python, or Next.js.' +
        '2. Users can search for these resources: video or article.' +
        '3. Users can search by author: jdmedlock, andresc1310, ivanrebolledo, Interviewing.io, yangshun, Josh Comeau, roadmap.sh, Chingu, totaltypescript/aihero, or a11y.coffee.' +
        '4. Users can not save resources to view later.' +
        '5. Users can view select how many resources they view per page and click to the next page.' ;

        // Execute the query
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY as string);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`${contextInfo} ${userMessage}`)
        const aiResponse = result.response.text();

        setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]); 
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        setTimeout(() => {
            formRef.current?.requestSubmit();
        }, 0);
    };

    return (
        <section
          className="flex flex-col w-full max-w-xl h-[500px] bg-white rounded-md shadow-lg overflow-hidden"
        >
          {/* Chat log */}
          <div
            ref={chatContainerRef}
            className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-100"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500 text-white text-right"
                    : "mr-auto bg-gray-300 text-gray-800 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
    
          {/* Suggested questions */}
          <div className="px-4 py-2 border-t bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="bg-blue-200 hover:bg-blue-300 px-3 py-1 rounded-full text-sm text-gray-800"
                >
                  {s}
                </button>
              ))}
            </div>

            <form ref={formRef} id="ai-form" onSubmit={handleSubmit} className="flex gap-2">
              <input
                name="aiPrompt"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-grow px-4 py-2 rounded-md border border-gray-300"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      );
    }