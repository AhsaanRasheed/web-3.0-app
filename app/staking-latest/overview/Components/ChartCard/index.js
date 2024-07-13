"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import useMobileScreen from "@/app/utility/isMobile";

const Card = ({ type, children }) => {
  const [selected, setSelected] = useState("PTT");
  const isMobile = useMobileScreen();
  const headingClass = isMobile ? "txt_Title2" : "txt_Heading3";

  return (
    <>
      <div className={`chartCard ${styles.chart_card}`}>
        <div className={styles.card_item}>
          <div className={styles.title}>
            <p className={headingClass}>Total Balance</p>
          </div>
          <div className={styles.button_container}>
            <p
              className={`txt_Body3 ${
                selected === "PTT" ? styles.selected : ""
              }`}
              onClick={() => setSelected("PTT")}
            >
              PTT
            </p>
            <p
              className={`txt_Body3 ${
                selected === "EUR" ? styles.selected : ""
              }`}
              onClick={() => setSelected("EUR")}
            >
              EUR
            </p>
          </div>
        </div>
        <div className={styles.chart_container}>
          <div
            className={`${styles.chart} ${
              type === "line" ? styles.lineChart : styles.donutChart
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
