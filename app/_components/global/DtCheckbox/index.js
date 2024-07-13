import React, { useState } from "react";
import styles from "./styles.module.scss";

const DtCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={styles.checkboxContainer}>
      <span className={styles.checkmark}>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.24786 10.8067C8.24898 10.8055 8.2501 10.8043 8.25122 10.8031L12.9944 5.70711C13.3579 5.31658 13.3579 4.68342 12.9944 4.29289C12.6309 3.90237 12.0416 3.90237 11.6781 4.29289L6.93156 9.39246L4.58892 6.87556C4.22543 6.48504 3.6361 6.48504 3.27262 6.87556C2.90913 7.26609 2.90913 7.89925 3.27261 8.28978L5.6175 10.8091C6.34447 11.5901 7.52313 11.5901 8.2501 10.8091L8.24786 10.8067Z"
              fill="#0E1521"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="3.5"
              stroke="white"
            />
          </svg>
        )}
      </span>
    </label>
  );
};

export default DtCheckbox;
