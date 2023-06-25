import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchUserData } from "./redux/slices/user-slice";

import Header from "./components/header";
import CalculationPage from "./components/calculation-page";
import Registration from "./components/registration";
import PromoPage from "./components/promo-page";
import Login from "./components/login";
import BigPopup from "./components/big-popup-block";
import BlanksPage from "./components/blanks-page";
import SavedResultPage from "./components/savedResult";

import "./resetStyle.css";
import "./App.css";
import "./scss/main.scss";

function App() {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.popups);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData());
    }
  }, []);
  return (
    <div className="App">
      {popups.bigPopup.state && <BigPopup />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<PromoPage />} />
          <Route path="/auth/registration" element={<Registration />} />
          <Route path="/calculator" element={<CalculationPage />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/blanks" element={<BlanksPage />} />
          <Route path="/saved-result" element={<SavedResultPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
