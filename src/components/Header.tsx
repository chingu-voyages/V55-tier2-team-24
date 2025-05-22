import {useState, useEffect} from "react";

export default function Header() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() =>{
        const today =new Date();
        const dateString = today.toLocaleDateString('en-US');
        setCurrentDate(dateString);
    }, []);

    return (
        <header className= "sticky top-0 flex px-2 py-3 w-full h-20 border-b-1 border-gray-400">
            <section className="w-[95%] text-2xl m-3 text-white flex items-center">
                <h1>Resource Helper</h1>
                <span className="text-sm px-6">{currentDate}</span>
            </section>
            <section className="w-[5%] flex">
                <img
                    src="https://placehold.co/400"
                    alt="Placeholder user icon"
                    className="h-full rounded-full"
                />
            </section>
        </header>
    );
}