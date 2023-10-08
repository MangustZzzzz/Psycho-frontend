import "../../scss/components/little/tool-tip.scss";
function ToolTip({ message }) {
  return (
    <div id="tooltip__wrapper">
      <p className="tooltip__content">{message}</p>
    </div>
  );
}

export default ToolTip;
