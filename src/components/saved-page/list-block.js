import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "../../handlers/axios.js";
import { onBigPopup } from "../../redux/slices/popups-slice.js";
import { delTest } from "../../redux/slices/user-saved-slice.js";

import imgTest from "../../assets/icon/p1.png";
import imgUser from "../../assets/icon/rb2.png";
import imgBirth from "../../assets/icon/rb3.png";
import imgClock from "../../assets/icon/b4.png";
import imgGender from "../../assets/icon/gender.png";

import "../../scss/components/subcomponents/savedResult-page/list-block.scss";

function List({ setShowingTest }) {
  const dispatch = useDispatch();
  const savedTests = useSelector((store) => store.savedTests);

  const [activeIndex, setActiveIndex] = useState();

  if (savedTests.tests.length === 0) {
    return (
      <div className="saved--list__block">
        <h3>Сохраненные тесты :</h3>
        <p>Нет сохраненных тестов</p>
      </div>
    );
  }
  return (
    <div className="saved--list__block">
      <h3>Сохраненные тесты :</h3>
      <div className="saved--list__wrapper">
        <ul className="saved--list">
          {savedTests.tests.map((elem, index) => {
            console.log(elem);
            return (
              <li className={activeIndex === index ? "item--wrapper aktive__item--wrapper" : "item--wrapper"} key={elem.id}>
                <div
                  className="item"
                  onClick={() => {
                    setShowingTest({ ...savedTests.tests[index] });
                    setActiveIndex(index);
                  }}
                >
                  <div>
                    <img src={imgTest} />
                    <p>
                      <pre>: </pre>
                    </p>
                    <h6> {elem.method || "-"}</h6>
                  </div>
                  <div>
                    <img src={imgUser} />
                    <p>
                      <pre>: </pre>
                    </p>

                    <p> {elem.nickname || "-"}</p>
                  </div>
                  <div>
                    <img src={imgBirth} />
                    <p>
                      <pre>: </pre>
                    </p>

                    <p> {elem.age ? elem.age.split("T")[0] : "-"}</p>
                  </div>
                  <div>
                    <img src={imgGender} />
                    <p>
                      <pre>: </pre>
                    </p>

                    <p> {elem.gender ? (elem.gender === "female" ? "Жен." : "Муж.") : "-"}</p>
                  </div>
                  <div>
                    <img src={imgClock} />
                    <p>
                      <pre>: </pre>
                    </p>

                    <p> {elem.date ? elem.date.split("T")[0] : "-"}</p>
                  </div>
                </div>
                <div className="del--btn--wrapper">
                  <button
                    onClick={async () => {
                      const { data } = await axios.post("/user/delete-test", { itemId: elem.id });
                      dispatch(onBigPopup(data));
                      dispatch(delTest({ elemId: elem.id }));
                    }}
                  ></button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default List;
