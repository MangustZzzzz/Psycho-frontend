import Navigation from "./subcomponents/navigation";
import React, { useEffect, useState } from "react";
import { setTheme } from "../redux/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { onSendMessage } from "../redux/slices/popups-slice";

import "../scss/components/settings-page.scss";
import Checkbox from "./little/checkbox";

function SettingsPage() {
  const theme = useSelector((state) => state.user.theme);
  const user = useSelector((state) => state.user.userData);
  console.log(user);
  const dispatch = useDispatch();
  const [isContanctDevelopers, setContanctDevelopers] = useState(false);

  useEffect(() => {
    const LSTheme = window.localStorage.getItem("theme");
    if (LSTheme == "light") {
      console.log(LSTheme);
      dispatch(setTheme("light"));
    }
  }, []);

  const handelCheck = () => {
    console.log(theme);
    if (theme == "light") {
      window.localStorage.setItem("theme", "dark");
      dispatch(setTheme("dark"));
    } else {
      window.localStorage.setItem("theme", "light");
      dispatch(setTheme("light"));
    }
  };

  const sendMessage = () => {
    dispatch(onSendMessage());
  };

  return (
    <>
      <Navigation />
      <section className="settings--page">
        <div className="settings--block">
          <ul className="settings--list">
            <li className="settings--item">
              <Checkbox labelContent={"Светлая тема :"} itemName="theme" handleFunc={handelCheck} value={theme == "light" ? true : false} />
            </li>
          </ul>

          {Object.keys(user).length != 0 ? (
            <button className="submit--btn" onClick={sendMessage}>
              Связаться с разработчиками
            </button>
          ) : (
            <p>Чтобы связаться с разработчиков, пожалуйста, войдите в аккаунт</p>
          )}
        </div>
      </section>
    </>
  );
}

export default SettingsPage;
