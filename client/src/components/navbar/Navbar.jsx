import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "userId",
    "role",
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.token);

  useEffect(() => {
    setIsAuthenticated(!!cookies.token);
  }, [cookies]);

  const handleLogout = () => {
    removeCookie("userId");
    removeCookie("token");
    removeCookie("role");
    setIsAuthenticated(false);
  };

  return (
    <div>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="px-2 d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
            >
              <h1>BSA</h1>
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {isAuthenticated && cookies.role === true ? (
                <>
                  <li>
                    <Link
                      to={"/booking"}
                      className="nav-link px-2 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Get Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/services"}
                      className="nav-link px-2 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/addservice"}
                      className="nav-link px-2 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Add service
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
              {isAuthenticated && cookies.role === false ? (
                <>
                  <li>
                    <Link
                      to={"/booking"}
                      className="nav-link px-2 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/services"}
                      className="nav-link px-2 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Services
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            <div className="text-end">
              {isAuthenticated ? (
                <button
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to={"/login"}>
                    <button
                      type="button"
                      className="btn btn-outline-light me-2"
                    >
                      Login
                    </button>
                  </Link>
                  <Link to={"/signup"}>
                    <button type="button" className="btn btn-warning">
                      Sign-up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
