import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/mainLayout/main-layout";
import IdentityLayout from "@/layouts/identity-layout.jsx";
import UnhandledException from "@/pages/unhandledException";
import NotFound from "@/pages/notFound/index";

//-------------------------------------------------- */
//Pages
import Login from "@/pages/login";
import Home from "@/pages/home";
import UserProfile from "@/pages/userProfile";
import MyOrders from "@/pages/myOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/profile",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/myOrders",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <MyOrders />,
      },
    ],
  },
  {
    path: "/login",
    element: <IdentityLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
