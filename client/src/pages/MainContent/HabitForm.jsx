import React, { useState } from "react";

function HabitForm() {
  const [habitName, setHabitName] = useState("");

  const handleChangeInput = (e) => {
    setHabitName(e.target.value);
  };

  const handleSubmitHabit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ habit: habitName }),
      });
      const data = await response.json();
      alert(data);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmitHabit(e)}>
      <label htmlFor="habit">Add a new one!</label>
      <input
        type="text"
        id="habit"
        name="habit"
        value={habitName}
        onChange={handleChangeInput}
      />
      <button>Submit</button>
    </form>
  );
}

export default HabitForm;
