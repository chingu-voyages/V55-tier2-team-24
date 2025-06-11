import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import StoreContextProvider from "./context/StoreContext.js";
import Discover from "./pages/Discover.tsx";
import BrokenURLPage from "./components/BrokenURLPage.tsx"

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
          path: "*",
          element: <BrokenURLPage />
        }
      ],
    },
  ]);

  return (
    <StoreContextProvider>
      <RouterProvider router={router} />
    </StoreContextProvider>
  );
}
