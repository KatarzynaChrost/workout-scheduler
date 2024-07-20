"use client";

import { ChangeEvent, useEffect, useState } from "react";
import LabeledInput from "../atoms/LabeledInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { IHolidayResponseData, getHolidays } from "@/app/actions/holidays";

interface IWorkoutInfo {
  onChange: (key: string, value: Date | string | null) => void;
}

const WorkoutInfo = ({ onChange }: IWorkoutInfo) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [nationalHolidays, setNationalHolidays] = useState<Date[]>();
  const [observanceHolidays, setObservanceHolidays] =
    useState<IHolidayResponseData>();
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const handleSlotSelect = (hour: string) => {
    setSelectedSlot(hour);
    onChange("time", hour);
  };

  useEffect(() => {
    getHolidays({
      year: 2024,
      country: "PL",
      type: "NATIONAL_HOLIDAY",
    }).then((response) => {
      if (response.success) {
        setNationalHolidays(
          response.data?.map((holiday) => new Date(holiday.date))
        );
      }
    });
    getHolidays({
      year: 2024,
      country: "PL",
      type: "OBSERVANCE",
    }).then((response) => {
      if (response.success) {
        setObservanceHolidays(response.data);
      }
    });
  }, []);

  const handleDateChange = async (date: Date | null) => {
    setStartDate(date);
    onChange("date", date);
  };

  const isWeekday = (date: Date) => {
    return date.getDay() !== 0;
  };

  const isNationalHoliday = (date: Date) => {
    const currentCalendarDate = new Date(date);
    const isCurrentCalendarDateHoliday = nationalHolidays?.some(
      (date) =>
        date.getDate() === currentCalendarDate.getDate() &&
        date.getMonth() === currentCalendarDate.getMonth() &&
        date.getFullYear() === currentCalendarDate.getFullYear()
    );

    return isCurrentCalendarDateHoliday;
  };

  const isWorkday = (date: Date) => {
    return isWeekday(date) && !isNationalHoliday(date);
  };

  const timeSlots = ["12:00", "14:00", "16:30", "18:30", "20:00"];

  return (
    <>
      <h2 className="section-title mt-8">Your workout</h2>
      <LabeledInput label="Date">
        <div className="custom-date-picker">
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date)}
            minDate={new Date()}
            inline
            filterDate={isWorkday}
            peekNextMonth={false}
            calendarStartDay={1}
          />
        </div>
      </LabeledInput>
      <LabeledInput label="Time">
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((hour, i) => (
            <button
              className={clsx("time-slot", { selected: selectedSlot === hour })}
              key={i}
              onClick={() => handleSlotSelect(hour)}
            >
              {hour}
            </button>
          ))}
        </div>
      </LabeledInput>
    </>
  );
};

export default WorkoutInfo;
