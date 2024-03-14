import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { startOfWeek, endOfWeek } from "date-fns";
import Calendar from "./CalendarBody";
import { CalendarHeader } from "./CalendarHeader";
import { GenericEvent, CalendarContainerProps } from "./types";
import { daysToWeekObject } from "./utils";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import "./weeklyCalender.scss";

export function WeeklyCalendar<T extends GenericEvent>({
  events,
  onEventClick,
  onSelectDate,
  weekends = false,
  value,
}: CalendarContainerProps<T>) {
  const [startWeek, setStartWeek] = useState(startOfWeek(value || new Date()));
  const weekPeriod = {
    startDate: startWeek,
    endDate: endOfWeek(startWeek),
  };

  useEffect(() => {
    if (value && startOfWeek(value).getTime() !== startWeek.getTime()) {
      setStartWeek(value);
    }
  }, [value]);

  useEffect(() => {
    onSelectDate && onSelectDate(startWeek);
  }, [startWeek]);

  const weekObject = daysToWeekObject(events, startWeek);

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Open morning OPD",
      children: (
        <div className="morningCalendar">
          <Calendar
            weekDates={weekPeriod}
            getDayEvents={weekObject}
            onEventClick={onEventClick}
            weekends={weekends}
            type={"day"}
            startRange={7}
            endRange={11}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Day OPD",
      children: (
        <div className="morningCalendar">
          <Calendar
            weekDates={weekPeriod}
            getDayEvents={weekObject}
            onEventClick={onEventClick}
            weekends={weekends}
            type={"morning"}
            startRange={13}
            endRange={19}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: "Open evening OPD",
      children: (
        <div className="morningCalendar">
          <Calendar
            weekDates={weekPeriod}
            getDayEvents={weekObject}
            onEventClick={onEventClick}
            weekends={weekends}
            type={"evening"}
            startRange={19}
            endRange={24}
          />
        </div>
      ),
    },
  ];
  return (
    <Card className="weeklyCalWrapper" >
      <CalendarHeader startWeek={startWeek} setStartWeek={setStartWeek} />
      <div className="headerCalendar">
        <Calendar
          weekDates={weekPeriod}
          getDayEvents={weekObject}
          onEventClick={onEventClick}
          weekends={weekends}
          type={"header"}
          startRange={0}
          endRange={5}
        />
      </div>
      <div className="collapseCalender">
        <Collapse accordion items={items} />
      </div>
    </Card>
  );
}
