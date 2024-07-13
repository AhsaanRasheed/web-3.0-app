"use client";
import React from "react";
import styles from "./style.module.scss";

const InfoBox = ({ title, children, buttonText, onButtonClick }) => {
  return (
    <div className={styles["info-box"]}>
      <div className={styles["info-box-content"]}>
        <div className={styles["info-box-title"]}>{title}</div>
        <div className={styles["info-box-inner"]}>
          <div className={styles["info-box-details"]}>{children}</div>
          <div className={styles["info-box-button"]}>
            <div className="button-container">
              <button
                type="submit"
                className="button-style"
                onClick={onButtonClick}
              >
                <p className="button-text">{buttonText}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
