import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "../features/auth/components/SignIn";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import Register from "../features/register/components/Register";
import { HomeWorkMain } from "../features/homework/components/main/HomeWorkMain";
import Users from "../features/user/components/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/homeWorkMain",
    element: (
      <ProtectedRoute>
        <HomePage children={<HomeWorkMain />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <HomePage children={<Users />} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <HomePage children={<Dashboard />} />
      </ProtectedRoute>
    ),
  },
]);

export default router;
