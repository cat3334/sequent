import { useContext, useState } from "react";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../store/userContex";
import "./AuthForm.scss";
function Register() {
  const { userDispatch } = useContext(UserContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
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

  const isInputValid = () => {
    if (!Object.values(inputData).every((x) => x !== "")) {
      setError("Please fill out all fields!");
      return false;
    } else if (inputData.password !== inputData.password2) {
      setError("Passwords must match!");
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isInputValid()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/users/new`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            email: inputData.email,
            username: inputData.username,
            password: inputData.password,
          }),
        }
      );
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form">
      <div className="auth-form__input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
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
      <p className="auth-form__error">{error}</p>
      <Button onClick={handleRegister} className="auth-form__bttn">
        Register
      </Button>
      {loading && <Spinner />}
    </form>
  );
}

export default Register;
