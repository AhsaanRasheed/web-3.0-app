"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import Dropdown from "@/app/_components/DropDown";
import useMobileScreen from "@/app/utility/isMobile";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import { useDispatch } from "react-redux";

const Card = ({ type, children, total_claimed = 0 }) => {
  const isMobile = useMobileScreen();
  const titleClass = isMobile ? "txt_Title2" : "txt_Title1";

  const dispatch = useDispatch();

  const handleDropdownSelect = (option) => {
    console.log(option);
    if (type === "line") {
      dispatch({ type: "SET_CLAIM_GRAPH_POOL", payload: option });
    } else {
      console.log(option);
    }
  };

  return (
    <div className={`chartCard ${styles.cardContainer}`}>
      <div className={styles.cardItem}>
        <div className={styles.title}>
          <p className={titleClass}>Total Rewards Claimed</p>
        </div>
        <div className={styles.dropdownContainer}>
          <p className="txt_Body3">Pool</p>
          <DropDown
            listOfItems={[
              { label: "Silver" },
              { label: "Gold" },
              { label: "Diamond" },
            ]}
            DefaultValue={{ label: "Total", value: "Total" }}
            onSelect={handleDropdownSelect}
            Custom_width="88px"
            Custom_height="32px"
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
            <p className="txt_Body3 color_neutral_medium">
              Total Rewards Claimed
            </p>
            <p className="txt_Title2 ">PTT {total_claimed}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
