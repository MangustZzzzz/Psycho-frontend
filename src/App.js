import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserData } from "./redux/slices/user-slice";

import { setTheme } from "./redux/slices/user-slice";

import Header from "./components/header";
import CalculationPage from "./components/calculation-page";
import Registration from "./components/registration";
import PromoPage from "./components/promo-page";
import Login from "./components/login";
import BigPopup from "./components/big-popup-block";
import RightAnglePopup from "./components/rightAngle-popup-block";

import SendMessage from "./components/sand-message-to-developers";
import BlanksPage from "./components/blanks-page";
import SavedResultPage from "./components/savedResult";
import SettingsPage from "./components/settings";

import "./App.css";
import "./scss/main.scss";

function App() {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.popups);
  const theme = useSelector((state) => state.user.theme);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData());
    }
    let LSTheme = window.localStorage.getItem("theme");
    if (!LSTheme) {
      window.localStorage.setItem("theme", "light");
    }
    LSTheme = window.localStorage.getItem("theme");
    if (LSTheme == "light") {
      const root = document.documentElement;
      const newVariables = {
        "--color-orange": "#F36D00",
        "--color-purple": "#c423ff",
        "--color-green": "#00d25b",
        "--color-red": "#df13a2",
        "--color-blue": "#0466f7",
        "--color-worning": "#de1b1b",
        "--color-bg": "#B19CC7", //"#423149", //
        "--color-block_bg": "#F2F1F5",
        "--color-gray": "#9D9D9D",
        "--color-light_gray": "#111112",
        "--color-gradient": "linear-gradient(100deg, #c423ff 0%, #2668ff 100%)",
      };
      Object.keys(newVariables).forEach((variable) => {
        root.style.setProperty(variable, newVariables[variable]);
      });
    } else {
      const root = document.documentElement;
      const newVariables = {
        "--color-orange": "#fd8321",
        "--color-purple": "#c423ff",
        "--color-green": "#00d25b",
        "--color-red": "#df13a2",
        "--color-blue": "#0466f7",
        "--color-worning": "#de1b1b",
        "--color-bg": "#22242a", //"#423149", //
        "--color-block_bg": "#2d3134",
        "--color-gray": "#5f5f5f",
        "--color-light_gray": "#949aa0",
        "--color-gradient": "linear-gradient(100deg, #c423ff 0%, #2668ff 100%)",
      };
      Object.keys(newVariables).forEach((variable) => {
        root.style.setProperty(variable, newVariables[variable]);
      });
    }
  }, [theme]);

  return (
    <div className="App">
      <Header />

      <main>
        {popups.bigPopup.state && <BigPopup />}
        {popups.rightAnglePopup.state && <RightAnglePopup />}
        {popups.sendMessage.state && <SendMessage />}
        <Routes>
          <Route path="/" element={<PromoPage />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/calculator" element={<CalculationPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/blanks" element={<BlanksPage />} />
          <Route path="/saved-result" element={<SavedResultPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
