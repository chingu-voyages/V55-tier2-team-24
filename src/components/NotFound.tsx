
import searchImage  from "/images/searchImage.png";

export default function NotFound() {
    return (
        <>
        <div className="p-15">
            <p>Showing 0 results</p>
        </div>
        <div className="h-20 flex justify-center items-center">
         <img src={searchImage} 
         alt="Search Icon" 
         className="w-38 h-38" />
         </div>
         <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl flex justify-center pt-15 text-red-600">No matches found.</h1>
        <p>Even the best queries sometimes come up empty.</p>
        <p>Try refining your search terms and give it another go! &#128522;</p>
       </div>
        </>
    )
}