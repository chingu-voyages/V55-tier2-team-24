import emptySearch from "/images/emptySearch.png";

export default function EmptySearchPage(){
    return (
       <div className="h-20 flex justify-center items-center">
         <img src={emptySearch} 
         alt="Search Icon" 
         className="w-175 mt-200 opacity-75" />
         </div>
    )
}
