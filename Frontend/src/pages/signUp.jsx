import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userData, setUserData] = useState({UserName: "", email: "",password: "",confirmPassword: "",});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.UserName) {
      try {
        const response = await axios.get("http://localhost:3000/user");
        const userExists = response.data.some(user => user.UserName === userData.UserName);

        if (userExists) {
         setUserNameError("Username already exists!")
                    return;
        }
        else{
          setUserNameError("")
        }
      } catch (error) {
      alert("An error occurred while checking the user. Please try again.");
        return;
      }
    }
    if (userData.email) {
      try {
        const response = await axios.get("http://localhost:3000/user");
        const emailExists = response.data.some(user => user.email=== userData.email);

        if (emailExists) {
          setEmailError("Email already exists!")
          return;
        }
        else{
          setEmailError("")
        }
       
      } catch (error) {
      alert("An error occurred while checking the user. Please try again.");
        return;
      }
    }

    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        localStorage.setItem("UserName",JSON.stringify(userData.UserName))

        navigate("/InputComponent");
      } catch (error) {
      alert("An error occurred while registering. Please try again.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setEmailError("")
    setUserNameError("")
  };

  return (
    <div className="SignContainer">
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="UserName"
          value={userData.UserName}
          onChange={handleInputChange}
          required
        />
          <div className="errorMessage" style={{color:"red"}}>{userNameError}</div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <div className="errorMessage" style={{color:"red"}}>{emailError}</div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;

