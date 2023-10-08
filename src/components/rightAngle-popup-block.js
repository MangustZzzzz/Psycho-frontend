import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { offRightAnglePopup } from "../redux/slices/popups-slice";

import "../scss/components/popups/rightAngle-popup.scss";

function RightAnglePopup() {
  const dispatch = useDispatch();
  const rightAnglePopup = useSelector((state) => state.popups.rightAnglePopup);

  return (
    <div className="rightAngle--popup--border">
      <div className="rightAngle--popup">
        <div
          className="close"
          onClick={() => {
            dispatch(offRightAnglePopup());
          }}
        >
          X
        </div>
        <h4>{rightAnglePopup.title}</h4>
        <p>{rightAnglePopup.content}</p>
      </div>
    </div>
  );
}

export default RightAnglePopup;
