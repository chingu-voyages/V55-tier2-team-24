import Footer from "./components/Footer";
import Header from "./components/Header";
import Form from "./components/Form";
import StoreContextProvider from "./context/StoreContext";
import Resources from "./components/Resources";

export default function App() {
  return (
    <StoreContextProvider>
      <main className="w-full min-h-screen flex flex-col items-center  bg-slate-950 ">
        <Header />
        <section className="flex-grow flex w-2xl p-4 justify-center">
          <Form />
        </section>
        <section>
          <Resources />
        </section>
        <Footer />
      </main>
    </StoreContextProvider>
  );
}
