import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import UserBlock from "./user/user-label";

import imgLogo from "../assets/icon/logo.svg";

import "../scss/components/header.scss";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <header>
      <ul className="header--categories">
        <li className="header--categories__item">
          <Link to={"/"}>
            <img className="img__logo" src={imgLogo} />
          </Link>
        </li>
        <li className="header--categories__item">
          <ul className="header--links">
            <li>
              <Link className="header--link" to="/">
                Главная
              </Link>
            </li>
            <li>
              <Link className="header--link" to="/calculator">
                Калькулятор
              </Link>
            </li>
            <li>
              <Link className="header--link" to="/blanks">
                Бланки тестирования
              </Link>
            </li>
          </ul>
        </li>
        <li className="header--categories__item">
          <div>
            <UserBlock />
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;
