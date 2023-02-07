import React from "react";
import { Link } from "react-router-dom";
import "./Guide.scss";
function Guide() {
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
          <Link to="/board" className="bttn">
            Try it Out!
          </Link>
          <a href="/" className="bttn">
            Register
          </a>
        </div>
      </section>
    </div>
  );
}

export default Guide;
