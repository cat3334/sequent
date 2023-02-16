import React from "react";
import "./WeekChanger.scss";
function WeekChanger(props) {
  return (
    <div className="weekChanger">
      <i
        onClick={() => props.weekOffsetChanger(-1)}
        className="weekChanger__arrow"
      >
        &lt;--
      </i>
      <p>Change week</p>
      <i
        onClick={() => props.weekOffsetChanger(1)}
        className="weekChanger__arrow"
      >
        --&gt;
      </i>
    </div>
  );
}

export default WeekChanger;
