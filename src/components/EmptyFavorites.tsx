import noTreasures from "/images/noTreasures.png";

export default function EmptyFavorites() {
  return (
    <div className="flex flex-col justify-center items-center ">
      <h1 className="text-blue-500 ">Don’t sail blindly</h1>
      <h2 className="text-blue-500 ">add some stars to guide your way</h2>
      <img src={noTreasures} alt="Search Icon" className="w-96 opacity-75" />
    </div>
  );
}
