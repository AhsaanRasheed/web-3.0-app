"use client";

import React, { useState, useRef, useEffect } from "react";
import style from "./style.module.scss";
export default function NewsDropdown({
  label,
  options,
  onChange,
  selectedOtp,
  customWidth = null,
  sortIcon = false,
  onSortChange = null,
  sortValue = "asc",
  startPosition = "left",
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  };
  return (
    <div className={style.dropdownContainer} ref={dropdownRef}>
      <div
        className={`${style.dropdown} ${
          openMenu ? style.dropdownOpen : style.dropdownClose
        }`}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <img src={selectedOtp.img} />
        <label
          style={{
            color: "#fff",
            fontSize: "16px",
            fontFamily: "var(--Gilroy)",
            fontWeight: "400",
            wordWrap: "break-word",
            marginLeft: "0",
            letterSpacing: "1.3px",
          }}
        >
          {selectedOtp.symbol}
        </label>

        <ArrowIcon openMenu={openMenu} />

        {openMenu ? (
          <div
            className={style.dropmenu}
            style={{
              width: customWidth != null ? customWidth : "",
              right: startPosition == "right" ? 0 : "",
              left: startPosition == "right" ? "" : 0,
            }}
          >
            {options.map((item, index) => (
              <div
                className={`${style.li}  ${
                  selectedOtp.symbol == item.symbol && style.selected
                }`}
                key={index}
                onClick={() => onChange(item)}
              >
                <img src={item.img} />
                <label
                  style={{
                    color: "white",
                    fontSize: "14px",
                    fontFamily: "var(--GilroySemiBold)",
                    fontWeight: "600",
                    wordWrap: "break-word",
                  }}
                >
                  {item.symbol}
                </label>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const ArrowIcon = ({ openMenu }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        maxHeight: "20px",
        maxWidth: "20px",
        minWidth: "20px",
        minHeight: "20px",
        marginLeft: "8px",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={openMenu && style.selectedArrow}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.5886 7.74408C5.26317 7.41864 4.73553 7.41864 4.41009 7.74408C4.08466 8.06951 4.08466 8.59715 4.41009 8.92259L9.41009 13.9226C9.73553 14.248 10.2632 14.248 10.5886 13.9226L15.5886 8.92259C15.914 8.59715 15.914 8.06951 15.5886 7.74408C15.2632 7.41864 14.7355 7.41864 14.4101 7.74408L9.99935 12.1548L5.5886 7.74408Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
};
