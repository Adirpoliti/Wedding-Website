import { createBrowserRouter, Outlet } from "react-router-dom";
import { HomePage } from "../components/HomePage";

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
    ],
  },
]);

export default router;
