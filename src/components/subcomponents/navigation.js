import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import imgBook from "../../assets/img/book.png";
import imgInfo from "../../assets/img/info.png";
import imgSettings from "../../assets/img/settings.png";

import "../../scss/components/subcomponents/navigation.scss";

function Navigation() {
  const user = useSelector((state) => state.user);

  return (
    <div className="navigation__block">
      <nav>
        <ul>
          <li>
            {user.status === "auth" ? (
              <Link to="/saved-result">
                Сохраненные <br /> расчеты
              </Link>
            ) : (
              <p>
                Сохраненные <br /> расчеты
              </p>
            )}
          </li>
          <li>
            <Link to="/calculator">Калькулятор</Link>
          </li>
          <li>{user.status === "auth" ? <Link to="/">Статискика</Link> : <p>Статискика</p>}</li>
        </ul>
      </nav>
      <div>
        <ul>
          <li className="library">
            <Link to="/">
              <img src={imgBook} />
              <h6>Инструкция</h6>
            </Link>
          </li>
          <li className="information">
            <Link to="/">
              <img src={imgInfo} />
              <h6>Информация</h6>
            </Link>
          </li>
          <li className="settings">
            <Link to="/settings">
              <img src={imgSettings} />
              <h6>Настройки</h6>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
