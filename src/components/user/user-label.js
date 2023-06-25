import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { delUserData } from "../../redux/slices/user-slice";

import avatar from "../../assets/img/profile.png";
import logout from "../../assets/img/logout.png";

import "../../scss/components/user/header-user-block.scss";

function UserLabel() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  if (user.status !== "auth") {
    return (
      <Link to="/" className="login">
        Регистрация / Авторизация
      </Link>
    );
  }
  return (
    <div className="user--block">
      <div className="avatar--wrapper">
        <img className="avatar" src={avatar} />
      </div>
      <div className="content">
        <button
          className="user_pupup--btn"
          onClick={() => {
            console.log("Popup");
          }}
        >
          {user.userData.login}
        </button>
        <Link
          className="logout"
          to="/"
          onClick={() => {
            dispatch(delUserData());
            window.localStorage.removeItem("token");
          }}
        >
          <img className="logout--img" src={logout} />
        </Link>
      </div>
    </div>
  );
}

export default UserLabel;
