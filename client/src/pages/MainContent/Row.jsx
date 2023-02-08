import React, { useState } from "react";

function Row(props) {
  const activityCells = props.datesInRange.map((day) => {
    let status;
    console.log(props.markedDates);
    console.log(day);
    if (props.markedDates.includes(day)) {
      status = "Done";
    }
    return (
      <td key={`${props.name}_${day}`} day={day}>
        {status}
      </td>
    );
  });
  return (
    <tr>
      <th scope="row">{props.name}</th>
      {/* <td style={{ backgroundColor: "red" }}>V</td> */}
      {activityCells}
      {/* <td>X</td>
      <td>V</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td> */}
    </tr>
  );
}

export default Row;
