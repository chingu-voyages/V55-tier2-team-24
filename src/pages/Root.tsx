import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatBotContainer from "../components/ChatbotContainer";

export default function RootLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <Header />

      {/* main content with conditional centering */}
      <main
        className={`flex-grow ${
          isHome ? "flex items-center justify-center" : ""
        }`}
      >
        <Outlet />
      </main>

      {/* Chatbot container aligned to bottom right of the full layout */}
      <div className="w-full flex justify-end px-6 pb-6">
        <ChatBotContainer />
      </div>
      <Footer />
    </div>
  );
}
