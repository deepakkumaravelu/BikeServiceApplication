import React, { useState } from "react";
import "./Login.css"; // Importing custom CSS for styling
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState(""); // State for storing email input
  const [password, setPassword] = useState(""); // State for storing password input
  const navigate = useNavigate(); // Hook for navigation
  const [cookies, setCookie] = useCookies([]); // Hook for managing cookies
  const [loading, setLoading] = useState(false); // State for loading status

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const loginResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }), // Sending email and password in the request body
        }
      );
      const loginData = await loginResponse.json();
      if (loginData.status === "failure") {
        alert(loginData.message); // Alerting user on failure
      } else {
        console.log(loginData);
        setCookie("token", loginData.accessToken, { maxAge: 60 * 60 * 60 }); // Setting cookies on successful login
        setCookie("userId", loginData.userDetails.userID, {
          maxAge: 60 * 60 * 60,
        });
        setCookie("role", loginData.userDetails.isSeller, {
          maxAge: 60 * 60 * 60,
        });
        navigate("/"); // Navigating to home on successful login
      }
    } catch (error) {
      console.log(error); // Logging error
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Handling email input change
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Handling password input change
  };

  return (
    <>
      {!loading ? (
        <div className="login-container mt-5 mx-auto form-container">
          {/* Form for login */}
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                onChange={handleEmailChange}
                required // Email input field
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                onChange={handlePasswordChange}
                required // Password input field
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Log in 
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bdy">
          <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span> {/* Loader animation */}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
