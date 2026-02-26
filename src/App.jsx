import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layout/DashboardLayout";
import Overview from "./Components/Overview";
import Users from "./Components/Users";
import Analytics from "./Components/Analytics";
import Products from "./Components/Products";
import UserPage from "./Components/UserPage";
import ProductPage from "./Components/ProductPage";
import NotFound from "./Components/NotFound";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
