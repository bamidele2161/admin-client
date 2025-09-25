import React from "react";
import "./checkbox.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <label className="purple-checkbox gap-4">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
      {label && (
        <span className="text-greyColr font-inter leading-4 font-normal text-sm">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
