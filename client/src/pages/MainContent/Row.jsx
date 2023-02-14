import React, { useState } from "react";

function Row(props) {
  const getFetchParams = (status) => {
    if (!status) {
      return { status: "Done", method: "POST" };
    } else if (status === "Done") {
      return { status: "Partly", method: "PUT" };
    } else {
      return { status: "", method: "DELETE" };
    }
  };

  const handleCellClick = async (e, day, status) => {
    const fetchParams = getFetchParams(status);
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8081/test/v1/habits/${props.id}`,
        {
          method: `${fetchParams.method}`,
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            status: `${fetchParams.status}`,
            day: `${day}`,
          }),
        }
      );
      const data = await response.json();
      alert(data);
    } catch (e) {
      alert(e);
    }
  };

  const habitCellsEl = props.datesInRange.map((day, i) => {
    let status = props.markedDates[day];
    return (
      <td
        key={`${props.name}_${day}`}
        day={day}
        onClick={(e) => handleCellClick(e, day, status)}
      >
        {status}
      </td>
    );
  });

  return (
    <tr>
      <th scope="row">{props.name}</th>
      {habitCellsEl}
    </tr>
  );
}

export default Row;
