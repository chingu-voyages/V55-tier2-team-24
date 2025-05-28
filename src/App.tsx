import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import Resources from "./pages/Resources.tsx";
import StoreContextProvider from "./context/StoreContext.js";

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
          path: "Resources",
          element: <Resources />,
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
