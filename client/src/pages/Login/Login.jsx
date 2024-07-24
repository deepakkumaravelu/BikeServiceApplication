import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className="login-container">
      <form className="row g-3">
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" required/>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" required/>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Log in</button>
        </div>
      </form>
    </div>
  )
}

export default Login