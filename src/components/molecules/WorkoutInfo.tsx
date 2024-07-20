"use client";

import { useEffect, useState } from "react";
import LabeledInput from "../atoms/LabeledInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import { getHolidays } from "@/app/actions/holidays";
import infoSvg from "../../img/svg/info.svg";
import Image from "next/image";

interface IWorkoutInfo {
  onChange: (key: string, value: Date | string | null) => void;
}

const WorkoutInfo = ({ onChange }: IWorkoutInfo) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [nationalHolidays, setNationalHolidays] = useState<Date[]>();
  const [observanceHolidays, setObservanceHolidays] =
    useState<{ date: string; holidayName: string }[]>();
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [holidayInfo, setHolidayInfo] = useState<string>("");

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
        setObservanceHolidays(
          response.data?.map((holiday) => {
            return {
              date: holiday.date,
              holidayName: holiday.name,
            };
          })
        );
      }
    });
  }, []);

  const handleDateChange = async (date: Date | null) => {
    setStartDate(date);
    onChange("date", date);

    if (!date) {
      return;
    }

    const observanceHoliday = observanceHolidays?.find((holiday) => {
      const convertedToDate = new Date(holiday.date);

      return (
        convertedToDate.getDate() === date.getDate() &&
        convertedToDate.getMonth() === date.getMonth() &&
        convertedToDate.getFullYear() === date.getFullYear()
      );
    });

    if (observanceHoliday) {
      setHolidayInfo(observanceHoliday.holidayName);
    } else {
      setHolidayInfo("");
    }
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

  const isWorkday = (date: Date) => isWeekday(date) && !isNationalHoliday(date);

  const timeSlots = ["12:00", "14:00", "16:30", "18:30", "20:00"];

  return (
    <>
      <h2 className="section-title mt-8">Your workout</h2>
      <div className="grid xs:grid-cols-[auto_1fr] gap-2 w-full">
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
              holidays={observanceHolidays || []}
            />
          </div>
          {holidayInfo && (
            <div className="flex gap-2">
              <Image src={infoSvg} width={16} height={16} alt="info" />
              <p className="text-sm">It is {holidayInfo}.</p>
            </div>
          )}
        </LabeledInput>
        {!!startDate && (
          <LabeledInput label="Time">
            <div className="flex flex-wrap gap-2">
              {timeSlots.map((hour, i) => (
                <button
                  className={clsx("time-slot", {
                    selected: selectedSlot === hour,
                  })}
                  key={i}
                  onClick={() => handleSlotSelect(hour)}
                >
                  {hour}
                </button>
              ))}
            </div>
          </LabeledInput>
        )}
      </div>
    </>
  );
};

export default WorkoutInfo;
