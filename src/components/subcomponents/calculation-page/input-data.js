import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import HandlerImage from "../processing-image.js";

import { setMethodology, setTestedPersonData, clearResult } from "../../../redux/slices/session-slice.js";

import "../../../scss/components/subcomponents/calculation-page/input-data.scss";

function InputData() {
  const dispatch = useDispatch();
  const { methodologies } = useSelector((state) => state.service);
  const { selectedMethodology } = useSelector((state) => state.session);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (event) => {
    //Обработка картинки (Возможно есть смысл даже кеопку убрать)
    console.log(event);
  };
  const onChange = () => {
    dispatch(setTestedPersonData(watch()));
  };
  React.useEffect(() => {
    dispatch(setMethodology(methodologies[0]));
  }, []);
  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="input-data__block">
      {/*<HandlerImage />*/}
      <h4>Параметры :</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => {
          onChange();
        }}
      >
        <div>
          <label>Методология :</label>
          <select
            defaultValue={methodologies[0]}
            {...register("metodology", { required: true })}
            onChange={(event) => {
              const methodology = methodologies.find((el) => el.id == event.target.value);
              dispatch(setMethodology(methodology));
              dispatch(clearResult());
            }}
          >
            {methodologies.map((methodology, index) => {
              return (
                <option key={methodology.id} value={methodology.id}>
                  {methodology.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Тестируемый :</label>
          <select {...register("TestedPerson", { required: true })}>
            <option>New person</option>
            <option>Вася</option>
            <option>Алиса</option>
          </select>
        </div>
        <div>
          <label>Псевдоним :</label>
          <input type="string" {...register("nickname", { required: true })} />
        </div>
        <div>
          <label>Дата рождения :</label>
          <input type="date" {...register("birthPerson", { required: true })} />
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className="submit--btn input--submit" />
      </form>
    </div>
  );
}

export default InputData;
