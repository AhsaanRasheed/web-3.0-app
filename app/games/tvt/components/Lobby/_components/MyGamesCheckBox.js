"use client";
import React from "react";
import style from "./style.module.scss";
export default function MyGamesCheckBox() {
  return (
    <div className={style.checkBoxCon}>
      <UnCheckedIcon /> <label>Show my games only</label>
    </div>
  );
}

const CheckedIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="15"
        height="15"
        rx="3.5"
        fill="#D376FF"
        stroke="#D376FF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.24786 10.8057C8.24898 10.8045 8.2501 10.8033 8.25122 10.8021L12.9944 5.70613C13.3579 5.31561 13.3579 4.68244 12.9944 4.29192C12.6309 3.90139 12.0416 3.90139 11.6781 4.29192L6.93156 9.39149L4.58892 6.87459C4.22543 6.48406 3.6361 6.48406 3.27262 6.87459C2.90913 7.26511 2.90913 7.89828 3.27261 8.2888L5.6175 10.8081C6.34447 11.5892 7.52313 11.5892 8.2501 10.8081L8.24786 10.8057Z"
        fill="#0E1521"
      />
    </svg>
  );
};

const UnCheckedIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="white" />
    </svg>
  );
};
