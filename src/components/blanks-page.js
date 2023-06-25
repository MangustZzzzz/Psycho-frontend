import React from "react";
import { Link } from "react-router-dom";

import imgDownload from "../assets/img/download.png";

function BlanksPage() {
  return (
    <section>
      <div className="wrapper__links-block">
        <div>
          <h3 className="title">Александрович</h3>
          <p className="description">Краткое описание</p>
          <Link to={"../blanks/Шаблон.docx.pdf"} target="_blank" download>
            <img src={imgDownload} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BlanksPage;
