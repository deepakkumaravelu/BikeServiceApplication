
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/Login/Login'
import Register from './pages/register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Services from './pages/services/Services';
import Service from './pages/service/Service';
import Booking from './pages/booking/Booking';
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
    Component: Services,
  },
  {
    path: "/service/:id",
    Component: Service,
  },
  {
    path: "/booking",
    Component: Booking,
  },
]);
function App() {
  
  return (
    <>
      <RouterProvider router={routes} />

    </>
  )
}

export default App
