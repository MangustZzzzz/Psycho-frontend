import "../../scss/components/little/checkbox.scss";

function Checkbox({ labelContentImg, labelContentText, itemName, value, handleFunc, reactForm }) {
  console.log(reactForm);
  return (
    <label className="castom-checkbox--label" htmlFor={itemName}>
      <div className="checkbox-content__wrapper">
        <img className="checkbox-img" src={labelContentImg || ""} />
        <p className="checkbox-text">{labelContentText || ""}</p>
        <input className="inputCheckbox" id={itemName} type="checkbox" onChange={handleFunc || ""} checked={value} {...reactForm} />
        <div className="castomCheckbox" htmlFor={itemName}></div>
      </div>
    </label>
  );
}

export default Checkbox;
