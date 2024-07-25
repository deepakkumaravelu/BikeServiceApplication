import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[phone,setPhone]=useState("");
    const[location,setLocation]=useState("");
    const[isSeller,setIsSeller]=useState(false);
    const navigate=useNavigate();
    function handleUsenameChange(e){
        setUsername(e.target.value);
    }
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handlePasswordChange(e){
        setPassword(e.target.value);
    }
    function handlePhoneChange(e){
        setPhone(e.target.value);
    }
    function handleLocationChange(e){
        setLocation(e.target.value);
    }
    function handleIsSellerChange(){
        setIsSeller(!isSeller);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Write API call here
        try {
          const loginResponse = await fetch(`http://localhost:3000/user/new-user`, {
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
                isSeller
            }),
          });
          console.log(loginResponse.json());
          const loginData = await loginResponse.json()
          if(loginData.status === "failure"){
            alert(loginData.message)
          }else{
              console.log(loginData);
              setCookie('token', loginData.accessToken, { maxAge: 60 * 60 * 60 })
              setCookie('userId', loginData.userDetails.userID, { maxAge: 60 * 60 * 60 })
              setCookie('role',loginData.userDetails.isSeller,{ maxAge: 60 * 60 * 60 })
              navigate("/")
          }
        } catch (error) {
          console.log("API error");
        } finally{
            // setLoading(false);
        }
      };
  return (
<div>
      <form className="p-5 row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
          <label htmlFor="inputUsername" className="form-label">Username</label>
          <input type="text" className="form-control" id="inputUsername" value={username} onChange={handleUsenameChange} required/>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputEmail" value={email} onChange={handleEmailChange} required/>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputPassword" value={password} onChange={handlePasswordChange} required/>
        </div>

        <div className="col-md-12">
          <label htmlFor="inputPhone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="inputPhone" value={phone} onChange={handlePhoneChange}/>
        </div>
        <div className="col-md-12">
          <label htmlFor="inputLocation" className="form-label">Location</label>
          <input type="text" className="form-control" id="inputLocation" value={location} onChange={handleLocationChange}/>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="inputIsSeller" value={isSeller} onChange={handleIsSellerChange}/>
            <label className="form-check-label" htmlFor="inputIsSeller">
              Are you a owner ?
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default Register