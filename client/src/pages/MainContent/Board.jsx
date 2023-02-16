import React, { useEffect, useState } from "react";
import "./Board.scss";
import Row from "./Row";
function Board(props) {
  const [habitsData, setHabitsData] = useState();

  useEffect(() => {
    props.setDataUpdated(false);
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8081/test/v1/habits");
        const data = await response.json();
        console.log(data);
        setHabitsData(data);
      } catch (e) {
        alert(e);
      }
    };
    getData();
  }, [props.dataUpdated]);

  const past7Days = [...Array(7).keys()].map((index) => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    const dateStr = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return dateStr;
  });

  const tableHeaders = props.selectedDates.map((day) => {
    const yearlessDay = day.split(",")[0];
    return <th scope="col">{yearlessDay}</th>;
  });

  // const habits = [
  //   { name: "czytanie", markedDates: ["1 Feb", "5 Feb"] },
  //   { name: "słuchanie", markedDates: ["2 Feb", "5 Feb"] },
  //   { name: "malowanie", markedDates: ["3 Feb", "5 Feb"] },
  // ];

  const tableRows = habitsData?.map((habit) => {
    return (
      <Row
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
      <table className="board__table">
        <thead>
          <tr>
            <th scope="col">Habit</th>
            {tableHeaders}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Twoja</th>
            <td>V</td>
            <td>X</td>
            <td>V</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {tableRows}
          <tr>
            <th scope="row">Stara</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Board;
