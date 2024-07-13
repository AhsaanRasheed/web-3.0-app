import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";

const DropDown = ({
  listOfItems = [],
  onSelect,
  DefaultValue = 0,
  Custom_width = "250px",
  Custom_height = "100%",
  isSearchable = false,
  Custom_bg = "#000818",
  Custom_shadow = "none",
  placeholder=null
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFouced, setIsFouced] = useState(false);

  const selectOptions = listOfItems.map((option) => ({
    value: option.value,
    label: option.label,
  }));
  const selectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(DefaultValue); // State to manage selected option
  useEffect(() => {
    setSelectedOption(DefaultValue);
  }, [DefaultValue]);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      backgroundColor: Custom_bg,
      zIndex: isMenuOpen ? 1000001 : 1,

      width: Custom_width,
      minHeight: Custom_height,
      height: Custom_height,
      maxHeight: Custom_height,
      borderRadius: "48px",
      border: "none",
      outline: "none",
      boxShadow: Custom_shadow,
      // boxShadow:"0px 4px 16px 0px #0066FF52 !important",
      fontFamily: "Roboto, sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      padding: "0px 5px 0 8px",
      color: "#fff !important",

      cursor: "pointer",
      "&:hover": {
        border: "none",
      },
    }),
    input: (provided) => ({
      ...provided,
      height: "max-content",
      marginTop: "0",
      color: "#fff !important", // Input text color
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      paddingLeft: "1px",
      paddingRight: "1px",
      padding: "2px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      transform: isMenuOpen ? "rotate(180deg)" : null,
      transition: "transform 0.3s ease-in-out",
      height: "100%",
      margin: "0",
      ":hover": {
        color: "#fff",
      },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "-25px",
      paddingTop: "25px",
      zIndex: isMenuOpen ? 1000000 : 0,
      width: Custom_width,
      backgroundColor: "#0A1E41",
    }),
    option: (provided, state) => ({
      ...provided,

      fontFamily: "var(--secondary-font)",
      fontSize: "14px",
      fontWeight: "400",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,

      fontFamily: "var(--secondary-font)",
      fontSize: "14px",
      fontWeight: "400",
      maxWidth: "95%",
      margin: "0",
      color: "var(--primary-Neutrals-default-color)",
      ":hover": {
        backgroundColor:
          "linear-gradient(0deg, #0A1E41, #0A1E41), linear-gradient(90.1deg, rgba(36, 158, 245, 0.33) 0.08%, rgba(36, 158, 245, 0) 85.94%)",
      },
      "&:hover": {
        backgroundColor:
          "linear-gradient(0deg, #0A1E41, #0A1E41), linear-gradient(90.1deg, rgba(36, 158, 245, 0.33) 0.08%, rgba(36, 158, 245, 0) 85.94%)",
      },
    }),
  };

  const handleChange = (selectedOptions) => {
    console.log(selectedOptions);
    setSelectedOption(selectedOptions);
    onSelect(selectedOptions.label);
  };
  const handleFocus = () => {
    // Your function to be called on focus
    setIsFouced(true);
  };
  const handleBlur = () => {
    if(isFouced && (selectOptions.value==null || selectOptions.value==""))
    setIsFouced(false)

  };
  return (
    <div style={{ width: Custom_width }}>
      <Select
        options={selectOptions}
        styles={customStyles}
        onChange={handleChange}
        placeholder={isFouced||placeholder==null?"":placeholder}
        isSearchable={isSearchable}
        menuPlacement="bottom"
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        menuIsOpen={isMenuOpen}
        className={isMenuOpen ? "menu-open" : ""}
        value={selectedOption}
        classNamePrefix="custom-select"
        ref={selectRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default DropDown;
