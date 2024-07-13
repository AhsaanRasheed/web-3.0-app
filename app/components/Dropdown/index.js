import React, { useState } from "react";
import styles from "./index.module.scss";

export default function Dropdown({
  label,
  options,
  onChange,
  selected,
  labelStyle = {},
  optionStyle = {},
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpenMenu(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <label style={{ ...defaultLabelStyle, ...labelStyle }}>{label}</label>
      <div
        className={`${styles.dropdown} ${openMenu ? styles.dropdownOpen : styles.dropdownClose
          }`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <label style={{ ...defaultLabelStyle, marginLeft: "8px", ...labelStyle }}>
          {selected.label}
        </label>
        <ArrowIcon openMenu={openMenu} />
        <div
          className={styles.dropmenu}
        >
          {options.map((item, index) => (
            <div
              className={`${styles.li} ${item.disable ? styles.li_disable : ""
                } ${selected.value === item.value ? styles.selected : ""}`}
              key={index}
              onClick={() => !item.disable && handleSelect(item)}
              style={optionStyle}
            >
              <label style={{ ...defaultLabelStyle, ...labelStyle }}>{item.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const ArrowIcon = ({ openMenu }) => (
  <div style={{ ...defaultIconStyle }}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={openMenu ? styles.selectedArrow : ""}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.5886 7.74408C5.26317 7.41864 4.73553 7.41864 4.41009 7.74408C4.08466 8.06951 4.08466 8.59715 4.41009 8.92259L9.41009 13.9226C9.73553 14.248 10.2632 14.248 10.5886 13.9226L15.5886 8.92259C15.914 8.59715 15.914 8.06951 15.5886 7.74408C15.2632 7.41864 14.7355 7.41864 14.4101 7.74408L9.99935 12.1548L5.5886 7.74408Z"
        fill="#A0F7FF"
      />
    </svg>
  </div>
);



// Default styles
const defaultLabelStyle = {
  color: "#A0F7FF",
  fontSize: "14px",
  fontFamily: "Jura",
  fontWeight: "600",
  wordWrap: "break-word",
};

const defaultIconStyle = {
  width: "20px",
  height: "20px",
  maxHeight: "20px",
  maxWidth: "20px",
  minWidth: "20px",
  minHeight: "20px",
  marginLeft: "8px",
};

const defaultOptionStyle = {
  color: "white",
  fontSize: "14px",
  fontFamily: "Jura",
  fontWeight: "600",
  wordWrap: "break-word",
};

export { Dropdown };
