import { useContext, useState } from "react";
import { UserContext } from "../../store/userContex";
import "./AuthForm.scss";
function Register() {
  const { userDispatch, userState } = useContext(UserContext);
  const [inputData, setInputData] = useState({
    email: "",
    username: "",
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          email: inputData.email,
          username: inputData.username,
          password: inputData.password,
        }),
      });
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      const data = await response.json();
      console.log(data);
      userDispatch({
        type: "login",
        payload: { user_id: data.user_id, user_name: data.user_name },
      });
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
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="auth-form__input"
          value={inputData.username}
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
