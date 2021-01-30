import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CalendarComp.css';

const localizer = momentLocalizer(moment);

const CalendarComp = ({}) => {
  const [cal_events, setCal_events] = useState([]);

  useEffect(() => {
    const url = "../api/v1/tasks";

    fetch(url)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        console.log(response);
        const uncompleted = response.uncompleted;
        let event = [];
        for (let i = 0; i < uncompleted.length; i++) {
          event.push({
            title: uncompleted[i].name,
            start: new Date(uncompleted[i].deadline),
            end: new Date(uncompleted[i].deadline),
          })
        }

        setCal_events(event);
      });
  }, []);


  return (
    <>
      <Calendar
        localizer={localizer}
        events={cal_events}
        step = {120}
        style={{ height: 700, color: "#747474", width: "80%", position:"absolute",left:"10%" }}
      />
    </>
  );
};

export default CalendarComp;
