import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Sequent
      </Link>
    </header>
  );
}

export default Header;
