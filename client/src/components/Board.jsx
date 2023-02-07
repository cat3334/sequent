import React, { useEffect } from "react";
import "./Board.scss";
function Board() {
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

  const handleAddHabit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ habit: "TWOJASTARADESTROYERDRAGONDILDO111!!!" }),
      });
      const data = await response.json();
      alert(data);
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className="board">
      <form onSubmit={(e) => handleAddHabit(e)}>
        <label htmlFor="habit">Add a new one!</label>
        <input type="text" id="habit" name="habit" />
        <button>Submit</button>
      </form>
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
