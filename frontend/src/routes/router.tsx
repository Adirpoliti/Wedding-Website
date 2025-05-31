import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../components/HomePage";
import { Gallery } from "../components/Gallery";

const Layout = () => (
  <>
    <div>
      <Outlet />
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
    ],
  },
]);

export default router;
