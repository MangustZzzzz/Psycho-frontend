import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { calculate, setResponses } from "../../../redux/slices/session-slice.js";
import axios from "../../../handlers/axios.js";
import { tableCreator } from "../../../helper-function/forTable.js";

import "../../../scss/components/subcomponents/calculation-page/table.scss";

function Table() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const selectedMethodology = session.selectedMethodology;
  const wrapperRef = React.useRef(null);

  const [numOfLines, setNumOfLines] = React.useState(15);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataFromUser) => {
    try {
      const { methodologyId, ...answersObj } = dataFromUser;

      const answers = Object.entries(answersObj)
        .map((el) => el)
        .sort((a, b) => {
          if (Number(a[0] > b[0])) return 1; // если первое значение больше второго
          if (Number(a[0] > b[0])) return -1; // если первое значение меньше второго
        })
        .map((el) => el[1]);
      console.log(answersObj);
      console.log(answers);

      const { gender, birthPerson } = session.testedPersonData;
      const age = ((new Date().getTime() - new Date(birthPerson)) / (24 * 3600 * 365.25 * 1000)) | 0;

      const { data } = await axios.post("/calulation", { answers, methodologyId, age, gender });
      const result = selectedMethodology.data.params.map((el, index) => {
        return { name: el, value: Object.values(data.result)[index] };
      });
      dispatch(calculate(result));
      dispatch(setResponses(answers));
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (wrapperRef.current !== null) {
      const height = wrapperRef.current.getBoundingClientRect().height;
      let count = 15;
      if (height < 750) {
        count = 10;
      }
      setNumOfLines(count);
      console.log(wrapperRef.current.getBoundingClientRect().height);
    }
  }, [wrapperRef.current]);
  React.useEffect(() => {
    reset();
    console.log(errors);
  }, [selectedMethodology]);

  //////

  if (Object.keys(selectedMethodology).length) {
    const methodologyData = selectedMethodology.data;
    const numOfQuestions = methodologyData.numOfQuestions;
    const responseRange = methodologyData.responseRange;
    console.log(responseRange);
    return (
      <div ref={wrapperRef} className="calc-table-section">
        <h4>Ответы испытуемого :</h4>
        <p className="note">
          <span>Обратите внимание!</span> Все поля должны быть заполнены, допустимые значения от <span>{responseRange[0].min}</span> до <span>{responseRange[0].max}</span> включительно
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="calc-table">
            <table className="table">
              <tbody>
                {tableCreator(numOfLines, numOfQuestions).map((arrStr, index) => {
                  return (
                    <tr key={`tr${index}`} className="tr">
                      {arrStr.map((cell) => {
                        let min = 0;
                        let max = 100;
                        if (responseRange.length === 1) {
                          min = responseRange[0].min;
                          max = responseRange[0].max;
                        } else if (responseRange.length === numOfQuestions) {
                          min = responseRange[cell].min;
                          max = responseRange[cell].max;
                        }
                        return (
                          <React.Fragment key={cell}>
                            <th key={`th${cell}`} className="num-cell">
                              {cell + 1}
                            </th>
                            <td key={`td${cell}`}>
                              <input key={`input${cell}`} tabIndex={cell + 1} {...register(`${cell + 1}`, { required: true, min, max })} type="number" className="input-val" />
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <input type="hidden" readOnly {...register("methodologyId", { required: true, value: `${selectedMethodology.id}` })} />
          </div>
          {Object.keys(errors) != 0 && (
            <p className="table__err-message">
              Мы обнаружили ошибку заполнения ) ; <br />
              Пожалуйста, убедитесь что все поля заполнены корректно
            </p>
          )}

          <input type="submit" className="submit--btn input--submit" />
        </form>
      </div>
    );
  } else {
    <p>Ожидание выбора методологии тестирования ...</p>;
  }
}

export default Table;
