import React from "react";

export default function RadioBox({
  selectedValue,
  onChange,
  value,
  label = "",
}) {
  return (
    <div className="checkbox-container">
      <label className="checkbox">
        <input
          type="radio"
          value={value}
          checked={value == selectedValue}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="radiomark">
          {value == selectedValue ? <Radio_Checked /> : <Radio_UnChecked />}
          {/* <CheckBox_Checked /> */}
        </span>
      </label>
      {label.length > 0 && <label className="txt_Body1 lbl">{label}</label>}
    </div>
  );
}
const Radio_Checked = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="14"
        height="14"
        rx="7"
        stroke="#0090E7"
        stroke-width="2"
      />
      <rect x="4" y="4" width="8" height="8" rx="4" fill="#0090E7" />
    </svg>
  );
};
const Radio_UnChecked = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#0090E7" />
    </svg>
  );
};
