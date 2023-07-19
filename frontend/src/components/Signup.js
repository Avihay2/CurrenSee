import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Connect.css";
import "../styles/Signup.css";
import useSignup from "../hooks/useSignup";
import ErrorIcon from "./icons/ErrorIcon";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useSignup();

  const [errMessage, setErrMessage] = useState("");
  const [termsAgree, setTermsAgree] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setTermsAgree(e.target.checked);
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!termsAgree) {
      handleErrMessage(" To sign up, the terms must be agreed!");
      return;
    }
    
    const isRegister = await signup(user);
    isRegister[0] ? alert(isRegister[1]) : handleErrMessage(isRegister[1]);
  };
  
  const handleErrMessage = (message) => {
    setErrMessage(message);
    setTimeout(() => setErrMessage(""), 5000);
  };

  return (
    <div className="connect-container">
      <form className="form" onSubmit={handleSignup}>
        <h2>Signup</h2>

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          className="email"
          name="email"
          type="email"
          onChange={handleInput}
          required
        ></input>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="username"
          name="username"
          type="text"
          minLength={4}
          onChange={handleInput}
          required
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="password"
          name="password"
          type="password"
          minLength={6}
          onChange={handleInput}
          required
        ></input>

        <label htmlFor="terms-checkbox">
          <input
            id="terms-checkbox"
            className="terms-checkbox"
            name="terms-checkbox"
            type="checkbox"
            onClick={handleCheckbox}
          ></input>
          <span className="terms-text">I agree the terms of use</span>
        </label>

        <button type="submit">Signup</button>
      </form>

      <div className="error" style={{ display: errMessage ? "flex" : "none" }}>
        <ErrorIcon />
        <span>{errMessage}</span>
      </div> 

      <span className="link" onClick={() => navigate("/login")}>
        Already have an account?
        <span className="strong"> Click to login</span>
      </span>
    </div>
  );
};

export default Signup;
