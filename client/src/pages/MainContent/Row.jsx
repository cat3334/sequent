import React, { useContext, useState } from "react";
import { UserContext } from "../../store/userContex";
import "./Row.scss";
function Row(props) {
  const [showDelete, setShowDelete] = useState(false);
  const { userState } = useContext(UserContext);

  const getFetchParams = (status) => {
    if (!status) {
      return { status: "Done", method: "POST" };
    } else if (status === "Done") {
      return { status: "Partly", method: "PUT" };
    } else {
      return { status: "", method: "DELETE" };
    }
  };

  const handleChangeStatus = async (e, date, status) => {
    e.preventDefault();
    const fetchParams = getFetchParams(status);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/habits/${props.id}/${date}`,
        {
          method: `${fetchParams.method}`,
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            status: `${fetchParams.status}`,
            day: `${date}`,
          }),
        }
      );

      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      props.setDataUpdated(true);
    } catch (e) {
      alert(e);
    }
  };

  const habitCellsEl = props.selectedDates.map((date) => {
    const index = props.markedEntries.findIndex((entry) => entry.date === date);
    let status;
    if (index !== -1) {
      status = props.markedEntries[index].status;
    }
    return (
      <td
        key={`${props.name}_${date}`}
        day={date}
        onClick={(e) => handleChangeStatus(e, date, status)}
      >
        {status}
      </td>
    );
  });

  const handleDeleteHabit = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/habits/${props.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      props.setDataUpdated(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <tr>
      <th scope="row">
        <div className="row__name-container">
          <i
            onClick={() => setShowDelete((prev) => !prev)}
            className="row__delete"
          >
            X
          </i>
          <p className="row__name">{props.name}</p>
        </div>
        <div className={`row__delete-container ${showDelete ? "" : "hidden"}`}>
          <p>Delete?</p>
          <div className="row__delete-options">
            <span onClick={() => handleDeleteHabit()}>Yes</span>
            <span onClick={() => setShowDelete(false)}>No</span>
          </div>
        </div>
      </th>
      {habitCellsEl}
    </tr>
  );
}

export default Row;
