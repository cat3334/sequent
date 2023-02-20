import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Register from "./Register";
import "./Guide.scss";
import Login from "./Login";
import { UserContext } from "../../store/userContex";
function Guide() {
  const { userState } = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userState.user_name) {
      navigate(`/board/${userState.user_name}`);
    }
  }, [userState, navigate]);

  console.log(userState);

  const closeForm = () => {
    setShowRegister(false);
    setShowLogin(false);
  };

  return (
    <div className="a">
      <section className="guide container">
        <h1 className="guide__title mt-s">About the page</h1>
        <img
          className="guide__img"
          alt="xoxoxo"
          src="https://art.ngfiles.com/images/1357000/1357127_angelthecyborgpanda_rq-male-fox-x-femboy-wolf.png?f1595300019"
        />
        <p className="guide__desc mt-s">
          Sequent is a tool created with the aim of aiding the user with the
          goal of Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Corporis soluta sed eligendi veniam laboriosam! Esse quasi quo dicta
          aperiam! Inventore cupiditate eligendi eum ducimus, delectus quos
          dolorem facere debitis non.
        </p>
        <div className="guide__buttons mt-m">
          <Link to="/board/guest" className="bttn">
            Try it Out!
          </Link>
          <button className="bttn" onClick={() => setShowRegister(true)}>
            Register
          </button>
          <button className="bttn" onClick={() => setShowLogin(true)}>
            Login
          </button>
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
