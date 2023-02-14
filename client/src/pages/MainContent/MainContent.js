import React from "react";
import Board from "./Board";
import HabitForm from "./HabitForm";

function MainContent() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/test/v1/habits/79", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ day: "Feb 14, 2023" }),
      });
      const data = await response.json();
      alert(data);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="xd">test loga</label>
        <input type="text" id="xd" name="xd" />
        <button>TEST</button>
      </form>
      <HabitForm />
      <Board />
    </div>
  );
}

export default MainContent;
