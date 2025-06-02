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
        "What authros have contributed to this database?",
        "How do I save or remove a favorite resource from my list?",
        "Where can I view my saved resources?",
        "How do I view all the results of a search?",
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
        '1. Users can search for these tags: react, typescript, ai, css, python, javascript, or next.js.' +
        '2. Users can search for these resources: video or article.' +
        '3. Users can search by author: jdmedlock or andresc1310.' +
        '4. Users can save resources to their favorites section by clicking the "Save to favorites" button.' +
        '5. Users can remove resources from their favorites section by clicking the "_" button.' +
        '6. Users can view their favorited resources by ___.' +
        '7. Users can view select how many resources they view per page and click to the next page.' ;

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
                        className=" bg-[hsla(221,_39%,_11%,_1)] text-[#ADAEBC] font-[Inter] text-[18px] not-italic font-normal leading-[28px] inline-flex h-[62px] pl-[20px] justify-end items-center w-full pr-1"/>
                    </label>
                    <div className='flex'>
                        <button type="reset" className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">Reset</button>
                        <button type="submit" className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full border-2 border-neutral-50 text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 focus:border-neutral-300 focus:outline-none dark:hover:bg-neutral-600 dark:focus:bg-neutral-600">Submit</button>
                    </div>
                </form>
                <hr />
                <h1>Results:</h1>
                {aiAnswer !== '' && <p>{ aiAnswer } </p>}
            </div>
        </section>            
    )
};