"use client";

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import AgeRangeInput from "../atoms/AgeRangeInput/AgeRangeInput";
import LabeledInput from "../atoms/LabeledInput";
import clsx from "clsx";

interface IPersonalInfo {
  onChange: (key: string, value: string | number | File | null) => void;
}
const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const PersonalInfo = ({ onChange }: IPersonalInfo) => {
  const [currentFileName, setCurrentFileName] = useState<string | undefined>();
  const [error, setError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.currentTarget;

    if (name === "file" && files) {
      setCurrentFileName(files[0]?.name || undefined);
      onChange("file", files[0]);
    }
    if (name === "email") {
      if (!emailRegex.test(value)) {
        setError(true);
      } else {
        setError(false);
      }
      onChange("email", value);
    } else {
      onChange(name, value);
    }
  }

  function removeFile() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      onChange("file", null);
      setCurrentFileName(undefined);
    }
  }

  return (
    <>
      <h2 className="section-title">Personal info</h2>
      <LabeledInput label="First Name">
        <input
          className="input-subtle"
          type="text"
          name="firstName"
          onChange={handleChange}
        />
      </LabeledInput>
      <LabeledInput label="Last Name">
        <input
          className="input-subtle"
          type="text"
          name="lastName"
          onChange={handleChange}
        />
      </LabeledInput>
      <LabeledInput label="Email Address">
        <input
          className={clsx("input-subtle", { "error-input": error })}
          type="email"
          name="email"
          onChange={handleChange}
        />
        {error && (
          <div className="error-message">
            Please use correct formatting.
            <br /> Example: address@email.com
          </div>
        )}
      </LabeledInput>
      <LabeledInput label="Age">
        <AgeRangeInput onChange={(age) => onChange("age", age)} />
      </LabeledInput>
      <LabeledInput label="Photo">
        <input
          type="file"
          name="file"
          id="file"
          className="input-file"
          onChange={(event) => handleChange(event)}
          ref={fileInputRef}
          accept="image/jpeg, image/png"
          draggable
        />
        <label htmlFor="file">
          <div className={currentFileName ? "uploaded-file" : "upload-text"}>
            {currentFileName || "Upload a file"}
            {currentFileName && (
              <button className="remove-upload" onClick={removeFile} />
            )}
          </div>
        </label>
      </LabeledInput>
    </>
  );
};

export default PersonalInfo;
