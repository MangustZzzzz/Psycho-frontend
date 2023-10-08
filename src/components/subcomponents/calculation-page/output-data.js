import React from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "../../../handlers/axios.js";

import { clearResult } from "../../../redux/slices/session-slice";
import { onRightAnglePopup, offRightAnglePopup, onBigPopup } from "../../../redux/slices/popups-slice";
import { addNewPerson } from "../../../redux/slices/user-slice.js";

import "../../../scss/components/subcomponents/calculation-page/output-data.scss";

function OutputData() {
  const session = useSelector((store) => store.session);
  const user = useSelector((store) => store.user.userData);

  const analysisResult = session.analysisResult;
  const dispatch = useDispatch();

  const saveResalt = async () => {
    console.log(session);
    const dataForSave = {
      userId: user.id,
      methodologyId: session.selectedMethodology.id,
      testedPersonData: session.testedPersonData,
      analysisResult: session.analysisResult,
      personResponses: session.personResponses,
    };
    try {
      const { data } = await axios.post("/user/save", dataForSave);

      dispatch(onRightAnglePopup(data));
      dispatch(addNewPerson(data.newTestedPerson));

      setTimeout(() => {
        dispatch(offRightAnglePopup());
      }, 4000);
    } catch (error) {
      const params = {
        title: "Сохранение невозможно",
        content: "При сохранение возникла ошибка, возможно вы не авторизованы( Попробуйте перезайти в аккаунт если это не так",
      };
      dispatch(onBigPopup(params));
    }
  };

  if (analysisResult.length > 0) {
    return (
      <div className="output-data__block">
        <h4>Результат обработки :</h4>
        <ul>
          {analysisResult.map((el, index) => {
            return (
              <li key={index}>
                <p>
                  {el.name} :<span>{el.value}</span>{" "}
                </p>
              </li>
            );
          })}
        </ul>
        <div className="btn--wrapper">
          <button className="submit--btn" onClick={saveResalt}>
            Сохранить
          </button>
          <button
            className="submit--btn clear--btn"
            onClick={() => {
              dispatch(clearResult());
            }}
          >
            Очистить
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="output-data__block">
        <h4>Результат обработки :</h4>
        <p>После отправки данных из блока №2, тут будет отображаться результат обработки</p>
      </div>
    );
  }
}

export default OutputData;
