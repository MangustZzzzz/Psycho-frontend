import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { offBigPopup } from "../redux/slices/popups-slice";

import "../scss/components/popups/big-popup.scss";

function BigPopup() {
  const wrapperRef = React.useRef(null);
  const dispatch = useDispatch();
  const bigPopup = useSelector((state) => state.popups.bigPopup);

  const handleClick = (event) => {
    if (event.target === wrapperRef.current) {
      dispatch(offBigPopup());
    }
  };

  return (
    <div ref={wrapperRef} className="popup--wrapper" onClick={handleClick}>
      <div className="popup--border">
        <div className="popup">
          <div
            className="close"
            onClick={() => {
              dispatch(offBigPopup());
            }}
          >
            X
          </div>
          <h4>{bigPopup.title}</h4>
          <p>{bigPopup.content}</p>
        </div>
      </div>
    </div>
  );
}

export default BigPopup;
