import Footer from "./components/Footer"; //temporary
import Header from "./components/Header"; //temporary
import Form from "./components/Form";
import StoreContextProvider from "./context/StoreContext";

export default function App() {
  return (
    <StoreContextProvider>
      <main className="h-screen w-full flex flex-col items-center  bg-[#111827]">
        <Header />
        <section className="flex-grow flex w-2xl p-4 justify-center">
          <Form />
        </section>

        <Footer />
      </main>
    </StoreContextProvider>
  );
}
