import { useForm } from "react-hook-form";

import axios from "../handlers/axios.js";
import { useDispatch, useSelector } from "react-redux";

import { setUserData, fetchUserData } from "../redux/slices/user-slice.js";

import imgLogo from "../assets/icon/logo.png";
import imgEmail from "../assets/img/mail.png";
import imgPassword from "../assets/img/lock.png";
import { Link, Navigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (event) => {
    const dataForLogin = {
      email: event.email,
      password: event.password,
    };
    const { data } = await axios.post("/auth/login", dataForLogin);
    if ("token" in data) {
      window.localStorage.setItem("token", data.token);
      dispatch(fetchUserData());
    }
  };
  if (user.status === "auth") {
    return <Navigate to="/calculator" />;
  }
  return (
    <section className="section--registration">
      <div className="registration--block">
        <div className="registration--logo__wrapper">
          <img className="registration--logo" src={imgLogo} />
        </div>
        <h2>Авторизация</h2>
        <form className="registration--form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input--block">
            <label>
              <img src={imgEmail} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="string" placeholder="E-mail" {...register("email", { required: true })} />
            </div>
          </div>

          <div className="input--block">
            <label>
              <img src={imgPassword} />
            </label>
            <div className="input__wrapper">
              <input className="input" type="password" placeholder="Password" {...register("password", { required: true })} />
            </div>
          </div>

          <div className="input--block">
            <input type="submit" value={"Авторизоваться"} className="submit--btn" {...register("submit")} />
          </div>

          <p>
            Вы у нас еще не зарегистрированны? Пора бы это{" "}
            <Link className="orange--link" to={"/auth/registration"}>
              исправить!
            </Link>{" "}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
