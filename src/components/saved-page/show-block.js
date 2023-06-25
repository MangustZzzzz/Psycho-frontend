import React from "react";

import { tableCreator } from "../../helper-function/forTable";

import "../../scss/components/subcomponents/savedResult-page/show-block.scss";

function ShowListItem({ showShowingTest }) {
  if (Object.keys(showShowingTest).length !== 0) {
    const testData = JSON.parse(showShowingTest.data);
    console.log(testData);
    return (
      <div className="saved--show__block">
        <h3>
          Результаты тестирования <span>{showShowingTest.nickname} :</span>
        </h3>
        <div className="calculation--result">
          <h5>Результаты обработки :</h5>
          <ul>
            {testData.analysisResult.map((elem) => {
              return (
                <li>
                  <p>
                    {elem.name} : <span>{elem.value}</span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="responses--person">
          <h5>Ответы испытуемого :</h5>
          <div className="responses--table--wrapper">
            <table className="responses--table">
              <tbody>
                {tableCreator(10, testData.personResponses.length).map((arrStr, index) => {
                  return (
                    <tr key={`tr${index}`} className="tr">
                      {arrStr.map((cell) => {
                        return (
                          <React.Fragment key={cell}>
                            <th key={`th${cell}`} className="num-cell">
                              {cell + 1}
                            </th>
                            <td key={`td${cell}`}>
                              <span>{testData.personResponses[cell]}</span>
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="saved--show__block">
        <h3>Результаты тестирования :</h3>
        <p>Для отображения данных, выберите сохраненный тест {" : )"}</p>
      </div>
    );
  }
}

export default ShowListItem;
