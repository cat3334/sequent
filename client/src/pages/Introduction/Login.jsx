import React, { useState } from "react";
import "./AuthForm.scss";
function Login() {
  const [userID, setUserId] = useState(null);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/users/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          email: inputData.email,
          password: inputData.password,
        }),
      });
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      console.log(response.headers);
      const data = await response.json();
      console.log(data);
      setUserId(data.userId);
    } catch (e) {
      alert(e);
    }
  };
  console.log(userID);
  return (
    <form className="auth-form">
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
      <button className="auth-form__bttn" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}

export default Login;
