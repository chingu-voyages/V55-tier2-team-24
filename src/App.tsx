import Footer from "./components/Footer";
import Header from "./components/Header";
import Form from "./components/Form";
import StoreContextProvider from "./context/StoreContext";
import Resources from "./components/Resources";
import TagsContainer from "./components/TagsContainer";

export default function App() {
  // const [isClicked, toggleIsClicked] = useToggle();

  return (
    <StoreContextProvider>
      <main className="w-full min-h-screen flex flex-col items-center  bg-slate-950 ">
        <Header />
        <section className="flex-grow flex w-full p-4 justify-center">
          <Form />
          <TagsContainer />
        </section>
        <section>
          <Resources />
        </section>
        <Footer />
      </main>
    </StoreContextProvider>
  );
}
