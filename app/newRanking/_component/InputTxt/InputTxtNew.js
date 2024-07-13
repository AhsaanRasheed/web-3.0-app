"use client";
import React, { useState, useRef } from "react";
import style from "../style.module.scss";

export default function InputTxtNew({
  value,
  onChange,
  onSearch
}) {
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
   
  };

  return (
    <form ref={formRef} className={style.InputTxtNew} onSubmit={onSearch}>
      <div className={`${style.inputCon} ${isFocused && style.inputConFouce}`}>
        <input
          type={"text"}
          value={value}
          placeholder={"Search Trader"}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
        />
          <div
            style={{
              marginLeftLeft: "8px",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={() => formRef.current.submit()}
          >
            <ShowIcon  />
          </div>
      </div>
    </form>
  );
}

const ShowIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.0004 20.9984L16.6504 16.6484"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
