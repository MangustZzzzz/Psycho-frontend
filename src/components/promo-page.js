import React from "react";
import { Link, Navigate } from "react-router-dom";

import "../scss/components/promo-page.scss";

function PromoPage() {
  return (
    <section className="section--promo">
      <div>
        <div className="text--wrapper">
          <p>
            Если вы зарегистритуетесь, это будет просто замечательно, однако если вам просто хочется востользоваться сервисом, то{" "}
            <Link className="orange--link" to="/calculator">
              Вперед!
            </Link>
          </p>
        </div>
        <div className="buttons">
          <Link to="/auth/registration" className="submit--btn">
            Регистрация
          </Link>
          <Link to="/auth/login" className="submit--btn">
            Авторизация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PromoPage;
