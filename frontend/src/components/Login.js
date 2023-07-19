import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/Connect.css";
import useLogin from "../hooks/useLogin";
import ErrorIcon from "./icons/ErrorIcon";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useLogin();

  const [errMessage, setErrMessage] = useState("");
  const [user, setUser] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();
    handleErrMessage(
      (await login(user)) ? "" : " Invalid username or password"
    );
  };

  const handleErrMessage = (message) => {
    setErrMessage(message);
    setTimeout(() => setErrMessage(""), 5000);
  };

  return (
    <div className="connect-container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="username"
          name="username"
          type="text"
          onChange={handleInput}
          required
        ></input>

        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="password"
          name="password"
          type="password"
          onChange={handleInput}
          required
        ></input>

        <button type="submit">Login</button>
      </form>

      <div className="error" style={{ display: errMessage ? "flex" : "none" }}>
        <ErrorIcon />
        <span>{errMessage}</span>
      </div>

      <span className="link" onClick={() => navigate("/signup")}>
        Don't you have an account?
        <span className="strong"> Click to signup</span>
      </span>
    </div>
  );
};

export default Login;
