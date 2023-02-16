import React, { useEffect, useState } from "react";
import Board from "./Board";
import HabitForm from "./HabitForm";
import WeekChanger from "./WeekChanger";

function MainContent() {
  const [dataUpdated, setDataUpdated] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  useEffect(() => {
    setSelectedDates(
      [...Array(7).keys()].map((index) => {
        const date = new Date();
        date.setDate(date.getDate() - index + weekOffset * 7);
        const dateStr = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return dateStr;
      })
    );
  }, [weekOffset]);

  const weekOffsetChanger = (value) => {
    setWeekOffset((prev) => prev + value);
  };

  return (
    <div>
      <HabitForm setDataUpdated={setDataUpdated} />
      <WeekChanger weekOffsetChanger={weekOffsetChanger} />
      <Board
        dataUpdated={dataUpdated}
        setDataUpdated={setDataUpdated}
        selectedDates={selectedDates}
      />
    </div>
  );
}

export default MainContent;
