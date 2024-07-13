"use client";
import React from "react";
import Select from "react-dropdown-select";
import "./style.css";
import { isNotFoundError } from "next/dist/client/components/not-found";
export default function DropDown({
  label,
  options,
  value,
  onChange,
  disabled = false, 
  onSearchCountryClick
}) {
  const handleInputChange = (inputValue) => {
    // Clear selected value when user types in the search box
    console.log(inputValue, "Chnages");
    if (inputValue && value) {
      // setSelectedValue(null);
      onChange(null); // Notify parent component of the change
    }
  };
  return (
    <div
      style={{ width: "100%", height: "86px" }}
      className={`${disabled && "dropdownDisabled"}`}
    >
      <label className="InputTitle">{label}</label>
      <Select
        style={{
          fontFamily: "var(--Gilroy)",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          color: "rgba(255, 255, 255, 1)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: "12px",
          //   padding: "12px 12px",
          height: "45px",
          width: "100%",
        }}
        options={options}
        placeholder="Country"
        searchable={true}
        values={
          value == "" || value == "undefined" || value == null
            ? []
            : [{ value: value, label: value }]
        }
        search={(e) => handleInputChange(e)}
        onChange={(value) => {
          const selected = value.length > 0 ? value[0].value : null;
          onChange(selected);
        }}
        disabled={disabled}
        onDropdownOpen={onSearchCountryClick}
      />
    </div>
  );
}
