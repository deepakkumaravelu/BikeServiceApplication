import React, { useState } from "react";
import "./Register.css"; // Importing custom CSS for styling
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Register = () => {
  // State management for registration form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [isSeller, setIsSeller] = useState(false); // State to determine if the user is a seller
  const navigate = useNavigate(); // Hook for navigation
  const [cookies, setCookie] = useCookies([]); // Hook for managing cookies

  // Handlers for form input changes
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleIsSellerChange() {
    setIsSeller(!isSeller); // Toggle seller status
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/new-user`, // API endpoint for registration
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
            phone,
            location,
            isSeller, // Sending form data in the request body
          }),
        }
      );

      const data = await response.json();
      if (data.status === "failure") {
        alert(data.message); // Alert user on registration failure
      } else {
        console.log(data);
        // Setting cookies on successful registration
        setCookie("token", data.accessToken, { maxAge: 60 * 60 * 60 });
        setCookie("userId", data.userDetails.userID, { maxAge: 60 * 60 * 60 });
        setCookie("role", data.userDetails.isSeller, { maxAge: 60 * 60 * 60 });
        navigate("/"); // Navigating to home on successful registration
      }
    } catch (error) {
      console.log("API error"); // Logging error
    }
  };

  return (
    <div className="register-container mt-5 mx-auto form-container">
      <form className="p-5 row g-3" onSubmit={handleSubmit}>
        {/* Form fields for user input */}
        <div className="col-md-12">
          <label htmlFor="inputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            value={email}
            onChange={handleEmailChange}
            required
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
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputLocation" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLocation"
            value={location}
            onChange={handleLocationChange}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="inputIsSeller"
              checked={isSeller}
              onChange={handleIsSellerChange}
            />
            <label className="form-check-label" htmlFor="inputIsSeller">
              Are you an owner?
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
