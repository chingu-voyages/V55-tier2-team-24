import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import StoreContextProvider from "./context/StoreContext.js";
import About from "./pages/About.tsx";
import Discover from "./pages/Discover.tsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",

          element: <Home />,
        },
        {
          path: "Discover",
          element: <Discover />,
        },
        {
          path: "About",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  );
}
