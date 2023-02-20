import React, { useContext, useState } from "react";
import { UserContext } from "../../store/userContex";
import "./HabitForm.scss";
function HabitForm(props) {
  const { userState } = useContext(UserContext);
  const [habitName, setHabitName] = useState();

  const handleChangeInput = (e) => {
    setHabitName(e.target.value);
  };

  const handleSubmitHabit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/habits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ name: habitName, user_id: userState.user_id }),
      });
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      props.setDataUpdated(true);
      alert("Habit added!");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form className="habitForm" onSubmit={(e) => handleSubmitHabit(e)}>
      <label htmlFor="habit">Add a new one!</label>
      <div className="habitForm__flexContainer">
        <input
          type="text"
          id="habit"
          name="habit"
          value={habitName}
          onChange={handleChangeInput}
        />
        <button>Submit</button>
      </div>
    </form>
  );
}

export default HabitForm;
