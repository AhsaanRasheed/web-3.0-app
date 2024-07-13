import React from "react";
import styles from "./style.module.scss";

const Legend = ({ data }) => {
  return (
    <div className={styles.legend}>
      {data.labels.map((label, index) => (
        <div key={label} className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
          ></span>
          <span className="txt_Body3 color-primary-Neutrals-strong-color">
            {label} - {data.datasets[0].data[index]}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
