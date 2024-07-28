import "./styles.css";
import { useState } from "react";
import Calendar, { CalendarDayHeader } from "./calender";
import classNames from "classnames";
import { isWeekendDay, isInInterval } from "./helpers";
import dayjs from "dayjs";



const leaves = [
  //"YYYY-MM-DD" format
  {
    "startDate": "2024-08-05",
    "endDate": "2024-08-08"
  },
  {
    "startDate": "2024-08-18",
    "endDate": "2024-08-24"
  }
]

export default function App() {
  // TODO Why state isn't inside Calendar component ?
  const [yearAndMonth, setYearAndMonth] = useState([dayjs().year(), dayjs().month() + 1]);

  return (
    <div className="App">
      <Calendar
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        renderDay={renderDay}
      />
    </div>
  );
}


function renderDay(calendarDayObject) {
  return (
    <div
      key={calendarDayObject.dateString}
      className={classNames("day-grid-item-container", {
        "weekend-day": isWeekendDay(calendarDayObject.dateString),
        "current-month": calendarDayObject.isCurrentMonth,
        "leave-day": isLeaveDay(leaves, calendarDayObject.dateString),
      })}
    >
      <div className="day-content-wrapper">
        <CalendarDayHeader calendarDayObject={calendarDayObject} />
      </div>
    </div>
  )
}


function isLeaveDay(leaves, dateToCheck) {
  // date format : "YYYY-MM-DD"
  // return boolean
  for (let index = 0; index < leaves.length; index++) {
    const leave = leaves[index];
    if (isInInterval(dayjs(leave.startDate), dayjs(leave.endDate), dayjs(dateToCheck))) {
      return true;
    }
  }
  return false;
}
