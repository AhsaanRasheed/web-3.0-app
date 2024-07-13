"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";

const CheckBox = ({ label, id, isChecked, onCheckboxChange }) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={`select-${id}`}
        name={`select-${id}`}
        checked={isChecked || false}
        onChange={onCheckboxChange}
      />
      <label
        htmlFor={`select-${id}`}
        className="txt_Title4 color_neutral_medium"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
