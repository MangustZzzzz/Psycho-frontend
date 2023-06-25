import React from "react";

import imgLogo from "../../assets/icon/logo.png";

import "../../scss/components/loader.scss";

function Loader() {
  return (
    <section className="loader--section">
      <div className="container">
        <div className="ring--wrapper">
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
        <img src={imgLogo} alt="" />
      </div>
    </section>
  );
}

export default Loader;
