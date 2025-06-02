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


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent the browser from reloading the page
        e.preventDefault()

        // Read the form data
        const form = e.currentTarget;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries()) as { aiPrompt: string};

        // Initialize the context information
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
        const result = await model.generateContent(`${contextInfo} ${formJson.aiPrompt}`)
        setAiAnswer(result.response.text())
    }
    
    return (
        <section 
            className="flex p-8 justify-center items-start gap-6 w-[401px] h-80 mt-10 rounded-[8px] border-[0px] border-[#E5E7EB] bg-[#1F2937] 
            [box-shadow:0px_4px_6px_0px_rgba(0,_0,_0,_0.10),_0px_10px_15px_0px_rgba(0,_0,_0,_0.10)]
            text-[#F3F4F6] font-[Inter] text-[18px] not-italic font-normal leading-[normal]" 
        >
            <div>
                <form method="post" onSubmit={ handleSubmit }>
                    <label>
                        What's your question? 
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