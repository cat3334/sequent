import React, { useEffect } from "react";
import { useTable } from "react-table";
import "./Board.scss";
import Row from "./Row";
function Board() {
  //BGGG

  const past7Days = [...Array(7).keys()]
    .map((index) => {
      const date = new Date();
      date.setDate(date.getDate() - index);
      return date.toLocaleDateString("default", {
        day: "numeric",
        month: "short",
      });
    })
    .reverse();

  const habits = [
    { name: "czytanie", markedDates: ["1 Feb", "5 Feb"] },
    { name: "słuchanie", markedDates: ["2 Feb", "5 Feb"] },
    { name: "malowanie", markedDates: ["3 Feb", "5 Feb"] },
  ];

  const tableRows = habits.map((habit) => {
    return (
      <Row
        name={habit.name}
        datesInRange={past7Days}
        markedDates={habit.markedDates}
      />
    );
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:8081/test");
        const data = await response.json();
        console.log(data);
      } catch (e) {
        alert(e.message);
      }
    };
    getData();
  }, []);

  const dateColumns = past7Days.map((day) => <th scope="col">{day}</th>);

  return (
    <div className="board">
      <table className="board__table">
        <caption>Tracked Habits</caption>
        <thead>
          <tr>
            <th scope="col">Habit</th>
            {dateColumns}
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
