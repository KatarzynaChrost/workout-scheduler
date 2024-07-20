import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { HandleProps } from "rc-slider/lib/Handles/Handle";
import { useCallback } from "react";

interface IAgeRangeInput {
  onChange: (age: number) => void;
}

const MIN_RANGE = 8;
const MAX_RANGE = 100;

const AgeRangeInput = ({ onChange }: IAgeRangeInput) => {
  const handleAgeRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      onChange(value[0]);
    } else {
      onChange(value);
    }
  };

  const handleRender = useCallback<NonNullable<HandleProps["render"]>>(
    (node, handleProps) => (
      <div className="relative">
        {node}
        <div
          className="absolute -translate-x-1/2 translate-y-6 z-10 text-accent min-w-10 text-center font-medium text-xs slider-bubble py-[6px]"
          style={{
            left: `${
              ((handleProps.value - MIN_RANGE) / (MAX_RANGE - MIN_RANGE)) * 100
            }%`,
          }}
        >
          {handleProps.value}
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="my-6 w-[96%] mx-auto">
      <Slider
        min={MIN_RANGE}
        max={MAX_RANGE}
        onChange={handleAgeRangeChange}
        marks={{
          [MIN_RANGE]: {
            style: { top: -36, color: "#000853" },
            label: MIN_RANGE,
          },
          [MAX_RANGE]: {
            style: { top: -36, color: "#000853" },
            label: MAX_RANGE,
          },
        }}
        step={1}
        styles={{
          track: {
            backgroundColor: "#761be4",
            marginLeft: -7,
          },
          rail: {
            backgroundColor: "#cbb6e5",
            marginLeft: 6,
          },
          handle: {
            height: 16,
            width: 16,
            backgroundColor: "#761be4",
            borderColor: "#761be4",
            boxShadow: "none",
            opacity: 1,
          },
        }}
        dotStyle={{
          display: "none",
        }}
        handleRender={handleRender}
      />
    </div>
  );
};

export default AgeRangeInput;
