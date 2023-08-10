import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "../handlers/axios.js";

import { offSendMessage } from "../redux/slices/popups-slice";
import { onBigPopup } from "../redux/slices/popups-slice";

import "../scss/components/popups/big-popup.scss";
import "../scss/components/little/submit-btn.scss";

import "../scss/components/send-message-to-developers.scss";

function SendMessage() {
  const wrapperRef = React.useRef(null);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (event) => {
    const { data } = await axios.post("/send/message/to-developers", event);
    dispatch(offSendMessage());
    dispatch(onBigPopup(data));
    console.log(data);
  };

  const handleClick = (event) => {
    if (event.target === wrapperRef.current) {
      dispatch(offSendMessage());
    }
  };

  return (
    <div ref={wrapperRef} className="popup--wrapper" onClick={handleClick}>
      <div className="popup--border">
        <div className="popup">
          <div
            className="close"
            onClick={() => {
              dispatch(offSendMessage());
            }}
          >
            X
          </div>
          <h4>Свяжитесь с нами) </h4>
          <p>Если вы обнаружили ошибки в работе сервиса или у вас есть предложения, мы с удовольствием обсудим это с вами ; )</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="offer" name="goalOfRequest" value="Предложение">
                У меня есть предложение
              </label>
              <input id="offer" name="goalOfRequest" value={"offer"} type="radio" {...register("themeOfMesage", { required: true })} />
              <label htmlFor="errorFound" name="goalOfRequest" value="Сообщение об ошибке">
                Я нашел ошибку
              </label>
              <input id="errorFound" name="goalOfRequest" value={"errorFound"} type="radio" {...register("themeOfMesage", { required: true })} />
              <label htmlFor="complaint" name="goalOfRequest" value="Жалоба">
                Хочу пожаловаться
              </label>
              <input id="complaint" name="goalOfRequest" value={"complaint"} type="radio" {...register("themeOfMesage", { required: true })} />
            </div>
            <div>
              <textarea className="send-message--block" placeholder="Напишите ваши мысли сюда" {...register("message", { required: true })}></textarea>
            </div>
            <div>
              <input className="submit--btn" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
