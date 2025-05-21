export default function Form() {
  return (
    <section
      className="flex col p-8 justify-center items-start gap-6 w-[401px] h-80 mt-10 rounded-[8px] border-[0px] border-[#E5E7EB] bg-[#1F2937] 
    [box-shadow:0px_4px_6px_0px_rgba(0,_0,_0,_0.10),_0px_10px_15px_0px_rgba(0,_0,_0,_0.10)]
"
    >
      <form action="">
        <div>
          <h4 className="text-[#F3F4F6] font-[Inter] text-[18px] not-italic font-normal leading-[normal] pt-[3px] pr-[127px] pb-[4px] pl-0">
            Find Learning Resources
          </h4>
          <p className="py-4 text-[#9CA3AF] font-[Inter] text-[14px] not-italic font-normal leading-[14px]">
            Type the skill or topic you want to learn…
          </p>
          <input
            placeholder="search something"
            className="bg-[hsla(221,_39%,_11%,_1)] text-[#ADAEBC] font-[Inter] text-[18px] not-italic font-normal leading-[28px] inline-flex h-[62px] pl-[20px] justify-end items-center w-full"
          />
        </div>
        <div className="flex flex-col">
          <button className="flex h-12 py-3.5 bg-[#374151] text-[#F3F4F6] justify-center">
            Search
          </button>
          <button className="bg-[hsla(221,_39%,_11%,_1)] text-[#D1D5DB] flex justify-center">
            Clear Search Results
          </button>
        </div>
      </form>
    </section>
  );
}
