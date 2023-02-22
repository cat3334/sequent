import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Register from "./Register";
import "./Guide.scss";
import Login from "./Login";
import { UserContext } from "../../store/userContex";
import Button from "../../components/Button";
function Guide() {
  const { userState } = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user_name) {
      navigate(`/board/`);
    }
  }, [userState, navigate]);

  console.log(userState);

  const closeForm = () => {
    setShowRegister(false);
    setShowLogin(false);
  };

  return (
    <div className="guide__container">
      <section className="guide">
        <h1 className="guide__header">About the page</h1>
        <img
          className="guide__img"
          alt="xoxoxo"
          src={require("../../images/sequent2.PNG")}
        />
        <p className="guide__desc">
          <b>Sequent</b> is a tool created with the goal of aiding the user with
          the task of keeping track of his daily habits. Register now and make
          yourself more accountable by managing a personal timeline that is
          keeping track of all your accomplishments relating to personal growth!
        </p>
        <div className="guide__buttons">
          <Button className="bttn" onClick={() => setShowRegister(true)}>
            Register
          </Button>
          <Button className="bttn" onClick={() => setShowLogin(true)}>
            Login
          </Button>
        </div>
      </section>
      {showRegister && (
        <Modal closeModal={closeForm}>
          <Register />
        </Modal>
      )}
      {showLogin && (
        <Modal closeModal={closeForm}>
          <Login />
        </Modal>
      )}
    </div>
  );
}

export default Guide;
