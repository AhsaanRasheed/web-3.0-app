// Info.jsx
"use client";
import React from "react";
import styles from "./style.module.scss";

const Info = ({ title, buttonText, data }) => {
  return (
    <div className="info-box">
      <div className="info-box-content">
        <div className="info-box-title">
          {title}
          <p className={`text-style-1 ${styles.title_detail}`}>
            You’ll be able to use a payment card get higher limits if you
            provide a bit more info.
          </p>
        </div>
        <div className="info-box-inner">
          <div className="info-box-details-space">
            <div className="info-table">
              <p className="text-style-4">Here’s what you’ll need:</p>
              <div className={`info-table-row ${styles.row}`}>
                <div className="info-table-row-details">
                  {data.map((item, index) => (
                    <label key={index} className={styles["container"]}>
                      <p className={`text-style-1 ${styles.table_detail}`}>
                        {item}
                      </p>
                      <input type="radio" name="radio" />
                      <span className={styles["checkmark"]}></span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="info-box-button">
              <div className="button-container">
                <button type="submit" className="button-style">
                  <p className="button-text">{buttonText}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
