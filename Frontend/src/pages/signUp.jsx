import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    UserName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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

        console.log("Posted successfully:", response.data);
        navigate("/InputComponent");
      } catch (error) {
        console.error("Failed to post:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Username"
          name="UserName"
          value={userData.UserName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          required
        />
        <label htmlFor=""> Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          required
        />

        <button type="submit">SignUp </button>
      </form>
      <p>
        Already Have an account? <Link to="/login">login</Link>
      </p>
    </>
  );
};

export default SignUp;
