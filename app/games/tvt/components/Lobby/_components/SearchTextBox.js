"use client";
import React, { useState, useRef } from "react";
import style from "./style.module.scss";

export default function SearchInputTxtNew({
  label,
  value,
  onChange,
  errorMsg,
  showError,
  placeHolder,
  disabled = false,

  type = "text",
}) {
  const [inputFouce, setInputFouce] = useState(false);

  return (
    <div
      className={`inputBox ${style.InputTxtNew} ${
        disabled && style.disabledInput
      }`}
    >
      <div
        className={`${style.inputCon} ${showError && style.inputConError} ${
          inputFouce && !disabled && style.inputConFouce
        }`}
      >
        <input
          type={type}
          value={value}
          placeholder={placeHolder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setInputFouce(true)}
          onBlur={() => setInputFouce(false)}
          disabled={disabled}
        />
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
      </div>
    </div>
  );
}
