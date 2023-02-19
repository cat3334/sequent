import { useState } from "react";
import "./AuthForm.scss";
function Register() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const inputChangeHandler = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/users/new", {
        method: "POST",
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
      console.log(response.ok);
    } catch (e) {
      alert(e);
    }
  };

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
      <div className="auth-form__input-container">
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          id="password2"
          className="auth-form__input"
          value={inputData.password2}
          onChange={(e) => inputChangeHandler(e)}
        />
      </div>
      <button onClick={handleRegister} className="auth-form__bttn">
        Register
      </button>
    </form>
  );
}

export default Register;
