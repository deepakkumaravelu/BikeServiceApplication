import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const [cookies] = useCookies(["token"]);
  const[setCookie,removeCookie]=useCookies();
  const handleLogout=()=>{
    removeCookie("userId");
    removeCookie("token");
  }
  return (
    <div>  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="px-2 d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <h1>BSA</h1>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          {cookies.token&&cookies.role?<>
           <li><Link to={"/booking"} class="nav-link px-2 text-white" style={{ textDecoration: 'none' }}>Get Bookings</Link></li>
           <li><Link to={"/services"} class="nav-link px-2 text-white" style={{ textDecoration: 'none' }}>Services</Link></li>
           <li><Link to={"/addservice"} class="nav-link px-2 text-white" style={{ textDecoration: 'none' }}>Add service</Link></li></>:
           <>
            <li><Link to={"/booking"} class="nav-link px-2 text-white" style={{ textDecoration: 'none' }}>Bookings</Link></li>
            <li><Link to={"/services"} class="nav-link px-2 text-white" style={{ textDecoration: 'none' }}>Services</Link></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
          </>
          }
        </ul>


        <div class="text-end">
          {cookies.token?<button type="button" class="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>:
          <><Link to={"/login"}><button type="button" class="btn btn-outline-light me-2">Login</button></Link>
          <Link to={"/signup"}><button type="button" class="btn btn-warning">Sign-up</button></Link>
          </>
        }
        </div>
      </div>
    </div>
  </header></div>
  )
}

export default Navbar