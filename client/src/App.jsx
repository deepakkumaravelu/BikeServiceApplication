
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Register from './pages/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Services from './pages/services/Services';

import Booking from './pages/booking/Booking';
import AddService from './pages/addservice/AddService'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies();
  return cookies.token ? children : <Navigate to="/" />;
};
const routes = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Register,
  },
  {
    path: "/services",
    element: (
      <ProtectedRoute>
        <Services />
      </ProtectedRoute>
    ),
  },{
    path:"/addservice",
    element: (
      <ProtectedRoute>
        <AddService />
      </ProtectedRoute>
    ),
  },
  {
    path: "/booking",
    element: (
      <ProtectedRoute>
        <Booking />
      </ProtectedRoute>
    ),
  },
]);
function App() {
  
  return (
    <>
  
      {/* <Navbar /> */}
     
        <RouterProvider router={routes} />
      
      {/* <Footer /> */}
    
    </>
  )
}

export default App
