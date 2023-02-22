import React, { useContext, useState } from "react";
import Button from "../../components/Button";
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
      const response = await fetch(`${process.env.REACT_APP_SERVER}/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
        body: JSON.stringify({ name: habitName, user_id: userState.user_id }),
      });
      if (!response.ok) {
        const e = await response.json();
        throw new Error(e.message);
      }
      setHabitName("");
      props.setDataUpdated(true);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form className="habitForm" onSubmit={(e) => handleSubmitHabit(e)}>
      <label htmlFor="habit" className="habitForm__label">
        Add a new one!
      </label>
      <div className="habitForm__flexContainer">
        <input
          type="text"
          id="habit"
          name="habit"
          value={habitName}
          onChange={handleChangeInput}
        />
        <Button className="habitForm__bttn">Submit</Button>
      </div>
    </form>
  );
}

export default HabitForm;
