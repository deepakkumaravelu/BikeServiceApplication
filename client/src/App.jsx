import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Services from "./pages/services/Services";
import Booking from "./pages/booking/Booking";
import AddService from "./pages/addservice/AddService";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

// ProtectedRoute component to restrict access to authenticated users
const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies();
  return cookies.token ? children : <Navigate to="/" />;
};

// Define the routes for the application
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        <Layout>
          <Services />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/addservice",
    element: (
      <ProtectedRoute>
        <Layout>
          <AddService />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/booking",
    element: (
      <ProtectedRoute>
        <Layout>
          <Booking />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
