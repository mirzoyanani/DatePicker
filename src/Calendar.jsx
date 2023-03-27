import React, { useState, useReducer } from "react";

// const daysOfWeek =["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const initialState = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    showCalendar: false,
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  };

  // const [month, setMonth] = useState(new Date().getMonth());
  // const [year, setYear] = useState(new Date().getFullYear());
  // const [showCalendar, setShowCalendar] = useState(false);

  const [state, dispatch] = useReducer((state, action) => {
    if (action.type == "PrevMonth") {
      if (action.payload > 0) {
        return {
          ...state,
          currentMonth: state.currentMonth - 1,
        };
      } else {
        return {
          ...state,
          currentMonth: 11,
          currentYear: state.currentYear - 1,
        };
      }
    } else if (action.type == "nextMonth") {
      // if (month < 11) {
      //   setMonth(month + 1);
      // } else {
      //   setMonth(0);
      //   setYear(year+ 1);
      // }
      if (action.payload < 11) {
        return {
          ...state,
          currentMonth: state.currentMonth + 1,
        };
      } else {
        return {
          ...state,
          currentMonth: 0,
          currentYear: state.currentYear + 1,
        };
      }
    } else if (action.type == "show") {
      if (action.payload === "open") {
        return {
          ...state,
          showCalendar: true,
        };
      } else {
        return {
          ...state,
          showCalendar: false,
        };
      }
    }
  }, initialState);

  let CalendarRows = [];
  let row = [];

  let firstDayOfMonth = new Date(
    state.currentYear,
    state.currentMonth,
    1
  ).getDay();
  let lastDayOfMonth = new Date(
    state.currentYear,
    state.currentMonth + 1,
    0
  ).getDate();

  for (let i = 1; i <= firstDayOfMonth; i++) {
    row.push(undefined);
  }
  for (let i = 1; i <= lastDayOfMonth; i++) {
    row.push(i);
    if (row.length == 7) {
      CalendarRows.push(row);
      row = [];
    }
  }
  if (row.length < 7) {
    CalendarRows.push(row);
    row = [];
  }
  return (
    <div>
      <button
        className="calendarbtn"
        onClick={() => {
          dispatch({
            type: "show",
            payload: "open",
          });
        }}
      >
        Calendar
      </button>
      {state.showCalendar && (
        <div className="calendar">
          <div>
            <button
              className="nextPrevbtn"
              onClick={() => {
                dispatch({
                  type: "PrevMonth",
                  payload: state.currentMonth,
                });
              }}
            >
              Prev
            </button>
            <button
              className="nextPrevbtn"
              onClick={() => {
                dispatch({
                  type: "nextMonth",
                  payload: state.currentMonth,
                });
              }}
            >
              Next
            </button>
          </div>
          <p>{state.months[state.currentMonth]}</p>
          <p>{state.currentYear}</p>
          <table>
            <thead>
              <tr>
                {state.daysOfWeek.map((day, i) => {
                  return <th key={i + day}>{day}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {CalendarRows.map((row, i) => {
                return (
                  <tr key={i + ":row"}>
                    {row.map((day, i) => {
                      return (
                        <td className="day" key={i + ":dayID"}>
                          {day}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            className="closebtn"
            onClick={() => {
              dispatch({
                type: "show",
                payload: "close",
              });
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
