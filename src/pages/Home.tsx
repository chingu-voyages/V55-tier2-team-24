import Logo from "../../public/images/logo.png";
import HomeForm from "../components/HomeForm";

export default function Home() {
  return (
    <div className="w-full bg-white flex flex-col justify-center items-center flex-grow">
      <img width={150} height={150} src={Logo} />
      <h1 className="text-5xl m-4">
        Your Unified Gateway to Developer Resources
      </h1>
      <p className="m-4">
        pkxc;ljmskljcsk jhsoicj sdoijcdsipo oppos copsd jcospd juoppo opi
      </p>

      <HomeForm />
    </div>
  );
}
