import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

const Dropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  // Choose image source based on isOpen state
  const imageSrc = isOpen ? "/icons/dropup.svg" : "/icons/dropdown.svg";

  return (
    <div className={styles.dropdown}>
      <div
        className={`txt_Body3 ${styles.dropdownHeader}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <Image
          src={imageSrc}
          alt={isOpen ? "close" : "info"}
          width={11}
          height={7}
          className={styles.text_info}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`txt_Body3 ${styles.dropdownItem}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
