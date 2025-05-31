import Logo from "/images/logo.png";
import HomeForm from "../components/HomeForm";

export default function Home() {
  return (
    <div className="w-full h-screen bg-white flex flex-col justify-center items-center flex-grow pb-6 px-6 md:px-12">
      <div className="flex flex-col items-center mx-auto text-center">
        <img
          width={150}
          height={150}
          src={Logo}
          alt="DevVault Logo"
          className="mb-6"
        />
        <h1 className="text-4xl md:text-5xl mb-10 text-gray-800">
          Your Unified Gateway to Developer Resources
        </h1>
        <p className="text-md md:text-lg text-gray-600 mb-10 max-w-3xl">
          Easily search, compare, and discover curated software development
          links from the Chingu's Discord #resource-treasures channel. Build,
          refine, and expand your web development skills — powered by
          aggregation and AI.
        </p>

        <HomeForm />
      </div>
    </div>
  );
}
