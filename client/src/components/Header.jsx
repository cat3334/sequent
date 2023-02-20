import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../store/userContex";
import "./Header.scss";
function Header() {
  const { userState, userDispatch } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/users/logout`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        const e = response.json();
        throw new Error(e.message);
      }
      userDispatch({
        type: "logout",
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Sequent
      </Link>
      {userState.user_id && (
        <div className="header__logged">
          <p className="header__greeting">
            Hello,{" "}
            <span className="header__greeting-name">{userState.user_name}</span>
          </p>
          <button onClick={() => handleLogout()} className="header__logout">
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
