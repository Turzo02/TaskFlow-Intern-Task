import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import Overview from "./Components/Overview";
import Users from "./Components/Users";
import Analytics from "./Components/Analytics";
import Products from "./Components/Products";
import UserPage from "./Components/UserPage";
import ProductPage from "./Components/ProductPage";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserPage />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
