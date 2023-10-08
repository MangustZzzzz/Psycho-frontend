import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import ToolTip from "./little/tool-tip.js";

import axios from "../handlers/axios.js";
import { regValid } from "../validation/registration.js";

import { Navigate } from "react-router-dom";

import { setUserData, fetchUserData } from "../redux/slices/user-slice.js";

import imgPassword from "../assets/img/lock.png";
import imgEmail from "../assets/img/mail.png";
import imgUser from "../assets/img/profile.png";
import imgAgreement from "../assets/img/agreement.png";
import imgMailingList from "../assets/img/social.png";
import imgLogo from "../assets/icon/logo.png";
import imgBirthday from "../assets/img/cake.png";
import imgError from "../assets/img/error.png";

import "../scss/components/registration.scss";
import Checkbox from "./little/checkbox.js";

function Registration(params) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(regValid) });

  const onSubmit = async (event) => {
    if (!(event.password === event.passwordRepeat)) {
      console.log("Пароли не совпадают");
      return;
    }
    console.log(event);
    const dataForRegistration = {
      email: event.email,
      password: event.password,
      login: event.login,
      birthday: event.birthday,
      agreement: event.agreement,
    };
    const { data } = await axios.post("/auth/register", dataForRegistration);
    console.log(data);
    if ("token" in data) {
      window.localStorage.setItem("token", data.token);
      dispatch(fetchUserData());
    }
  };

  if (user.status === "auth") {
    return <Navigate to="/calculator" />;
  }
  console.log(errors);
  return (
    <section className="section--registration">
      <div className="registration--block">
        <div className="registration--logo__wrapper">
          <img className="registration--logo" src={imgLogo} />
        </div>
        <h2>Регистрация</h2>

        <form className="registration--form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input--block">
            <label>
              <img src={imgUser} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="string" placeholder="Login" {...register("login", { required: true })} />
            </div>
            {errors.login && (
              <div
                className="reg__wrap--err--email"
                onMouseEnter={() => {
                  setShowTooltip("login");
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <img className="reg__img--err--email" src={imgError} />
                {showTooltip == "login" && <ToolTip message={errors.login.message} />}
              </div>
            )}
          </div>

          <div className="input--block">
            <label>
              <img src={imgEmail} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="string" placeholder="E-mail" {...register("email", { required: true })} />
            </div>
            {errors.email && (
              <div
                className="reg__wrap--err--email"
                onMouseEnter={() => {
                  setShowTooltip("email");
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <img className="reg__img--err--email" src={imgError} />
                {showTooltip == "email" && <ToolTip message={errors.email.message} />}
              </div>
            )}
          </div>

          <div className="input--block">
            <label>
              <img src={imgBirthday} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="date" {...register("birthday", { required: true })} />
            </div>
            {errors.birthday && (
              <div
                className="reg__wrap--err--email"
                onMouseEnter={() => {
                  setShowTooltip("birthday");
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <img className="reg__img--err--email" src={imgError} />
                {showTooltip == "birthday" && <ToolTip message={errors.birthday.message} />}
              </div>
            )}
          </div>

          <div className="input--block">
            <label>
              <img src={imgPassword} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="password" placeholder="Password" {...register("password", { required: true })} />
            </div>
            {errors.password && (
              <div
                className="reg__wrap--err--email"
                onMouseEnter={() => {
                  setShowTooltip("password");
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <img className="reg__img--err--email" src={imgError} />
                {showTooltip == "password" && <ToolTip message={errors.password.message} />}
              </div>
            )}
          </div>

          <div className="input--block">
            <label>
              <img src={imgPassword} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="password" placeholder="Repeat password" {...register("passwordRepeat", { required: true })} />
            </div>
          </div>

          <div className="input--block">
            <label>
              <img src={imgAgreement} />
              <p>
                Регистрируясь, я даю свое согласие на обработку моих личных данных и подтвержлаю данное{" "}
                <span>
                  <Link className="orange--link" to={"/"}>
                    соглашение
                  </Link>
                </span>
              </p>
            </label>
            <div className="input__wrapper input__wrapper--checkbox">
              <input type="checkbox" className="checkbox--btn" {...register("agreement", { required: true })} />
            </div>
            {errors.agreement && (
              <div
                className="reg__wrap--err--email"
                onMouseEnter={() => {
                  setShowTooltip("agreement");
                }}
                onMouseLeave={() => {
                  setShowTooltip(false);
                }}
              >
                <img className="reg__img--err--email" src={imgError} />
                {showTooltip == "agreement" && <ToolTip message={errors.agreement.message} />}
              </div>
            )}
          </div>

          <div className="input--block">
            <label>
              <img src={imgMailingList} />
              <p>Я не против получать информацию об изменениях и различные выгодные предложенеия</p>
            </label>
            <div className="input__wrapper  input__wrapper--checkbox">
              <input type="checkbox" className="checkbox--btn" {...register("mailingList")} />
            </div>
          </div>
          <Checkbox
            labelContent={
              <>
                <img src={imgMailingList} /> <p>Я не против получать информацию об изменениях и различные выгодные предложенеия</p>
              </>
            }
            itemName="theme"
            reactForm={register("agreement")}
          />

          <div className="input--block">
            <input type="submit" value={"Зарегистрироваться"} className="submit--btn" {...register("submit")} />
          </div>
        </form>
        <p>
          У вас уже есть аккаунт? Тогда давайте{" "}
          <Link className="orange--link" to={"/auth/login"}>
            авторизуем
          </Link>{" "}
          вас!
        </p>
      </div>
    </section>
  );
}

export default Registration;
