import React, { useState } from "react";

function Row(props) {
  // find the user entries from selected days
  const habitCellsEl = props.selectedDates.map((date) => {
    const index = props.markedEntries.findIndex((entry) => entry.date === date);
    let status;
    if (index != -1) {
      status = props.markedEntries[index].status;
    }
    return (
      <td
        key={`${props.name}_${date}`}
        day={date}
        onClick={(e) => handleCellClick(e, date, status)}
      >
        {status}
      </td>
    );
  });

  const handleCellClick = async (e, date, status) => {
    const fetchParams = getFetchParams(status);
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/habits/${props.id}`, {
        method: `${fetchParams.method}`,
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({
          status: `${fetchParams.status}`,
          day: `${date}`,
        }),
      });

      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      props.setDataUpdated(true);
    } catch (e) {
      alert(e);
    }
  };

  const getFetchParams = (status) => {
    if (!status) {
      return { status: "Done", method: "POST" };
    } else if (status === "Done") {
      return { status: "Partly", method: "PUT" };
    } else {
      return { status: "", method: "DELETE" };
    }
  };

  return (
    <tr>
      <th scope="row">{props.name}</th>
      {habitCellsEl}
    </tr>
  );
}

export default Row;
