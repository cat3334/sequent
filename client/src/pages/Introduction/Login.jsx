import React, { useContext, useState } from "react";
import Button from "../../components/Button";

import { UserContext } from "../../store/userContex";
import "./AuthForm.scss";
function Login() {
  const [error, setError] = useState(true);
  const { userDispatch, userState } = useContext(UserContext);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const isInputValid = () => {
    if (!Object.values(inputData).every((x) => x !== "")) {
      setError("Please fill out all fields!");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isInputValid()) {
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            email: inputData.email,
            password: inputData.password,
          }),
        }
      );
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      console.log(response.headers);
      const data = await response.json();

      userDispatch({ type: "login", payload: data });
    } catch (e) {
      alert(e);
    }
  };
  console.log(userState);
  return (
    <form className="auth-form">
      {/* {error && <Prompt />} */}
      <div className="auth-form__input-container">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className="auth-form__input"
          value={inputData.email}
          onChange={(e) => inputChangeHandler(e)}
        />
      </div>
      <div className="auth-form__input-container">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="auth-form__input"
          value={inputData.password}
          onChange={(e) => inputChangeHandler(e)}
        />
      </div>
      {error && <p className="auth-form__error">{error}</p>}
      <Button className="auth-form__bttn" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
}

export default Login;
