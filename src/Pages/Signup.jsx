import React, { useState } from "react";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Youtubelogo from "./YoutubeLogo.png";

const Signup = () => {
  // const [token, setToken] = useState("");
  const router = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    appType: "ott",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "1slqzy0xqfty",
            accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (data.status === "fail") {
        
        // alert(data.message);
        console.log(data.message);
      } else {
        
        // setToken(data.token);
        router("/signin");
        // console.log(token);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <img
          className="logo"
          src={Youtubelogo}
          alt="YouTube Logo"
          onClick={() => {
            router("/");
          }}
        />
        <div className="right">
          <button
            className="signin-btn"
            onClick={() => {
              router("/signin");
            }}
          >
            Sign In
          </button>
        </div>
      </nav>
      <div className="signupContainer">
        <form className="signupForm" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
          <span className="span">Already have an account?</span>{" "}
          <Link to="/signin">Sign in here.</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
