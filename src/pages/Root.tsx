import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center ">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
