import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { UserContext } from "../../store/userContex";
import "./Board.scss";
import Row from "./Row";
function Board(props) {
  const { userState } = useContext(UserContext);
  const [habitsData, setHabitsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.user_name) {
      navigate(`/`);
    }
  }, [userState, navigate]);

  // update data on user edit
  useEffect(() => {
    setLoading(true);
    props.setDataUpdated(false);
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/habits`, {
          credentials: "include",
        });
        if (!response.ok) {
          const e = await response.json();
          throw new Error(e.message);
        }
        const data = await response.json();
        console.log(data);
        setHabitsData(data);
      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [props.dataUpdated]);

  // display selected week dates without the year
  const tableHeaders = props.selectedDates.map((day) => {
    const yearlessDay = day.split(",")[0];
    return <th scope="col">{yearlessDay}</th>;
  });

  const tableRows = habitsData?.map((habit) => {
    return (
      <Row
        className="board__row"
        name={habit.name}
        setDataUpdated={props.setDataUpdated}
        selectedDates={props.selectedDates}
        markedEntries={habit.logs}
        key={habit.id}
        id={habit.id}
      />
    );
  });

  return (
    <div className="board">
      <p className={`board__loading ${loading ? "visible" : ""}`}>
        <Spinner />
      </p>
      <table className="board__table">
        <thead>
          <tr>
            <th scope="col">Habit</th>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default Board;
