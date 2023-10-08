import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import HandlerImage from "../processing-image.js";

import { setMethodology, setTestedPersonData, clearResult } from "../../../redux/slices/session-slice.js";

import "../../../scss/components/subcomponents/calculation-page/input-data.scss";

function InputData() {
  const dispatch = useDispatch();
  const { methodologies } = useSelector((state) => state.service);
  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onChange = (event) => {
    if (event.target.name === "nickname") {
      setValue("testedPerson", "-1");
    }
    if (event.target.name === "testedPerson") {
      let selectedPerson = user.userData.testedPersons.find((el) => el.id == event.target.value);
      setValue("nickname", selectedPerson?.nickname || "");
      setValue("birthPerson", selectedPerson?.age === null ? "" : selectedPerson?.age.replace(/T.*/, "") || "");
      setValue("gender", selectedPerson?.gender || "female");
    }
    if (event.target.name === "metodology") {
      const methodology = methodologies.find((el) => el.id == event.target.value);
      dispatch(clearResult());
      dispatch(setMethodology(methodology));
    }
    dispatch(setTestedPersonData(watch()));
  };

  React.useEffect(() => {
    dispatch(setMethodology(methodologies[0]));
    dispatch(setTestedPersonData(watch()));
  }, []);

  return (
    <div className="input-data__block">
      {/*<HandlerImage />*/}
      <h4>Параметры :</h4>
      <form onChange={(event) => onChange(event)}>
        <div>
          <label>Методология :</label>
          <select {...register("metodology", { required: true })}>
            {methodologies.map((methodology, index) => {
              return (
                <option key={methodology.id} value={methodology.id}>
                  {methodology.name}
                </option>
              );
            })}
          </select>
        </div>
        {user.status === "auth" && (
          <div>
            <label>Тестируемый :</label>
            <select {...register("testedPerson", { required: true })}>
              <option key="-1" value={-1}>
                New person
              </option>
              {user.userData.testedPersons.map((person) => {
                return (
                  <option key={person.id} value={person.id}>
                    {person.nickname}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <div>
          <label>Псевдоним :</label>
          <input type="string" {...register("nickname", { required: true })} />
        </div>
        <div>
          <label>Дата рождения :</label>
          <input type="date" {...register("birthPerson", { required: true })} />
        </div>
        <div>
          <label>Пол :</label>
          <select {...register("gender", { required: true })}>
            <option value={"female"}>Жен.</option>
            <option value={"male"}>Муж.</option>
          </select>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
      </form>
    </div>
  );
}

export default InputData;
