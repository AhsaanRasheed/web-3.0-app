"use client";
import React from "react";

export default function CheckBox({
  style = {},
  checked,
  onChange,
  label = "",
  disable = false,
}) {
  return (
    <div className="checkbox-container" style={style}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disable}
        />
        <span
          className="checkmark"
          style={{
            border: disable
              ? "1px solid var(--primary-Neutrals-weak-color)"
              : "1px solid var(--status-info-default)",
          }}
        >
          {checked && <CheckBox_Checked disable={disable} />}
          {/* <CheckBox_Checked /> */}
        </span>
      </label>
      {label.length > 0 && <label className="txt_Body1 lbl">{label}</label>}
    </div>
  );
}
const CheckBox_Checked = ({ disable }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="16"
        height="16"
        rx="2"
        fill={`${disable ? "#596170" : "#0090E7"}`}
      />
      <path
        d="M6.36695 11.7693L2.81055 8.21287L3.52336 7.50007L6.36695 10.3436L12.4772 4.2334L13.19 4.9462L6.36695 11.7693Z"
        fill={`${disable ? "#d9dee8" : "#fff"}`}
      />
    </svg>
  );
};
