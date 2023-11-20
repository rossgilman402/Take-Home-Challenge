import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./Login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createUsername, setCreateUsername] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const handleLoginChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: "username" | "password"
  ) => {
    if (inputType === "username") {
      setLoginUsername(e.target.value);
    } else if (inputType === "password") {
      setLoginPassword(e.target.value);
    }
  };

  const handleCreateChange = (
    e: ChangeEvent<HTMLInputElement>,
    inputType: "username" | "password"
  ) => {
    if (inputType === "username") {
      setCreateUsername(e.target.value);
    } else if (inputType === "password") {
      setCreatePassword(e.target.value);
    }
  };

  const [loginUser] = useMutation(LOGIN_USER);
  const [addUser] = useMutation(ADD_USER);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await loginUser({
        variables: { username: loginUsername, password: loginPassword },
      });

      console.log("Logged in successfully", data);
      // Redirect or perform other actions upon successful login
      Auth.login(data.login.token);
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure, display an error message, etc.
    }
  };

  const handleCreateAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username: createUsername, password: createPassword },
      });

      console.log("Account created successfully", data);
      // Redirect or perform other actions upon successful account creation
      //   console.log(data.addUser.token);
      Auth.login(data.addUser.token);
    } catch (error) {
      console.error("Account creation failed", error);
      // Handle account creation failure, display an error message, etc.
    }
  };

  return (
    <div className="page-container">
      <form className="login-container" onSubmit={handleLogin}>
        <h2>Login</h2>
        <label className="label" htmlFor="login-username">
          Username:
        </label>
        <input
          className="form-input"
          placeholder="Username"
          type="text"
          id="login-username"
          value={loginUsername}
          onChange={(e) => handleLoginChange(e, "username")}
        />
        <label className="label" htmlFor="login-password">
          Password:
        </label>
        <input
          className="form-input"
          placeholder="Password"
          type="password"
          id="login-password"
          value={loginPassword}
          onChange={(e) => handleLoginChange(e, "password")}
        />
        <button className="form-button" type="submit">
          Login
        </button>
      </form>

      <form className="create-container" onSubmit={handleCreateAccount}>
        <h2>Create Account</h2>
        <label className="label" htmlFor="create-username">
          Username:
        </label>
        <input
          className="form-input"
          placeholder="Username"
          type="text"
          id="create-username"
          value={createUsername}
          onChange={(e) => handleCreateChange(e, "username")}
        />
        <label className="label" htmlFor="create-password">
          Password:
        </label>
        <input
          className="form-input"
          placeholder="Password"
          type="password"
          id="create-password"
          value={createPassword}
          onChange={(e) => handleCreateChange(e, "password")}
        />
        <button className="form-button" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Login;
