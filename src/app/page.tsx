"use client";

import Button from "@/components/atoms/Button";
import PersonalInfo from "@/components/molecules/PersonalInfo";
import WorkoutInfo from "@/components/molecules/WorkoutInfo";
import { useState, useEffect } from "react";
import { formSubmit } from "./actions/formSubmit";

interface IPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  age: null | number;
  file: null | File;
}

interface IWorkoutInfo {
  date: Date | null;
  time: string;
}

export type FormDataType = IPersonalInfo & IWorkoutInfo;

export default function Home() {
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    age: null,
    file: null,
  });

  const [workoutInfo, setWorkoutInfo] = useState<IWorkoutInfo>({
    date: null,
    time: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const { firstName, lastName, email, age, file } = personalInfo;
    const { date, time } = workoutInfo;

    const isPersonalInfoFilled = firstName && lastName && email && age && file;
    const isWorkoutInfoFilled = date && time;

    setIsSubmitDisabled(!(isPersonalInfoFilled && isWorkoutInfoFilled));
  }, [personalInfo, workoutInfo]);

  const handlePersonalInfoChange = (
    key: string,
    value: string | number | File | null
  ) => {
    setPersonalInfo({ ...personalInfo, [key]: value });
  };

  const handleWorkoutInfoChange = (
    key: string,
    value: Date | string | null
  ) => {
    setWorkoutInfo({ ...workoutInfo, [key]: value });
  };

  const handleSubmit = () => {
    formSubmit({ ...personalInfo, ...workoutInfo });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 max-w-[426px] mx-auto">
      <PersonalInfo onChange={handlePersonalInfoChange} />
      <WorkoutInfo onChange={handleWorkoutInfoChange} />
      <Button
        name="Send Application"
        disabled={isSubmitDisabled}
        onClick={handleSubmit}
      />
    </main>
  );
}
