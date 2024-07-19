import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ UserName: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', userData)
      if (response.status === 200) {
        
        localStorage.setItem("UserName",JSON.stringify(userData.UserName))
            navigate("/InputComponent");
      } else {
        alert("Incorrect username or password");
      }
    } catch (error) {
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="LoginContainer">
      <form onSubmit={handleLogin} className="login">
        <label htmlFor="UserName">User Name</label>
        <input
          type="text"
          placeholder="Username"
          name="UserName"
          value={userData.UserName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;

