import { useState, type FormEvent, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

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

    const personality = `
        You are Devy Jones, a seasoned senior developer with a dry sense of humor and a subtle nautical theme.
        You mentor junior developers in a calm, confident tone.

        - Use occasional sea or sailing metaphors (e.g. "smooth sailing", "don't anchor to bad habits") but stay professional.
        - Speak with clarity and precision as a clever pirate mentor — you value clean code and clear thinking.
        - Be supportive and encouraging, especially to beginners.
        - Use plain language but don’t shy away from giving real coding tips.
        - If appropriate, toss in a light joke or subtle developer pun.
        - Keep responses concise, practical, and human — no over-the-top theatrics.
        - Insert line breaks between ideas. Use bullet points when providing lists. Use bold to emphaisze ideas. 
        - Sometimes end with a short phrase like "Steady as she goes." or "Let’s chart the next course." but don't repeat the same phrase every time.
    `;
    
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
        const result = await model.generateContent(`${personality}${contextInfo} ${userMessage}`)
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
          className="flex flex-col w-full bg-white rounded-md shadow-lg max-h-[70vh]"
        >
          {/* Chat log */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg ${
                    msg.role === "user"
                      ? "bg-[#41A3C9] text-white text-right"
                      : "bg-gray-300 text-gray-800 text-left"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
    
          {/* Suggested questions */}
          <div className="p-4 border-t bg-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="bg-[#41A3C9] hover:bg-blue-300 px-3 py-1 rounded-full text-sm text-white"
                >
                  {s}
                </button>
              ))}
            </div>

            <form ref={formRef} id="ai-form" onSubmit={handleSubmit} className="flex gap-2">
              <textarea
                name="aiPrompt"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  e.target.style.height = "auto"; 
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                placeholder="Ask Devy Jones something..."
                className="w-full resize-none overflow-hidden rounded-md border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                className="bg-[#2A598F] text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      );
    }