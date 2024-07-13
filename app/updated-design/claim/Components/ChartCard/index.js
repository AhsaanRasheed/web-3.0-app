"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Dropdown from "@/app/_components/DropDown";

const Card = ({ type, children }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardItem}>
        <div className={styles.title}>
          <p className="heading-1-paraText">Total Rewards Claimed</p>
        </div>
        <div className={styles.dropdownContainer}>
          <p className="info-plain-text">Pool</p>
          <Dropdown
            label="Total"
            options={["Silver", "Gold", "Diamond"]}
            onSelect={(option) => console.log(option)}
          />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div
          className={`${styles.chart} ${
            type === "line" ? styles.lineChart : styles.donutChart
          }`}
        >
          {children}
        </div>
        {type !== "line" && (
          <div className={styles.info}>
            <p className="info-plain-text">Total Rewards Claimed</p>
            <p className="text-style-4">PTT 3000</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
