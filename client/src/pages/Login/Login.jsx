import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const loginData = await loginResponse.json();
      if (loginData.status === "failure") {
        alert(loginData.message);
      } else {
        console.log(loginData);
        setCookie('token', loginData.accessToken, { maxAge: 60 * 60 * 60 });
        setCookie('userId', loginData.userDetails.userID, { maxAge: 60 * 60 * 60 });
        setCookie('role', loginData.userDetails.isSeller, { maxAge: 60 * 60 * 60 });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-container mt-5 mx-auto form-container"> {/* Add custom class */}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" onChange={handleEmailChange} required />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" onChange={handlePasswordChange} required />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
