import "../../scss/components/little/checkbox.scss";

function Checkbox({ labelContent, itemName, value, handleFunc, reactForm }) {
  console.log(reactForm);
  return (
    <label htmlFor={itemName}>
      <span>{labelContent}</span>
      <input className="inputCheckbox" id={itemName} type="checkbox" onChange={handleFunc || ""} checked={value} {...reactForm} />
      <div className="castomCheckbox" htmlFor={itemName}></div>
    </label>
  );
}

export default Checkbox;
