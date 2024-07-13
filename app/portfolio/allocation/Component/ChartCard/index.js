"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import Dropdown from "@/app/_components/DropDown";
import useMobileScreen from "@/app/utility/isMobile";
import DonutChart from "@/app/_components/DonutChart";
import LineChart from "@/app/_components/LineChart";
import Legend from "@/app/_components/Legend";
import DropDown from "@/app/_components/global/DropDown/DropDown";
const Card = ({
  type,
  title,
  pieValues = {
    ptt_balance: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  },
  lineValues = {
    lbl: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    value: {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
    },
    maxChartDataValue: 10,
    stepSize: 10,
  },
  onLineFilter = null,
}) => {
  const tokenLabels = ["Gold", "Silver", "Diamond", "Total"];
  const [selectedtoken, setSelectedToken] = useState("Total");

  const dropDownItems = tokenLabels.map((token) => {
    return { label: token, value: token };
  });
  const isMobile = useMobileScreen();
  const titleClass = isMobile ? "txt_Title2" : "txt_Title1";
  const donutChartData = {
    labels: tokenLabels,
    datasets: [
      {
        label: "# of Votes",
        data: [
          pieValues.gold,
          pieValues.silver,
          pieValues.diamond,
          pieValues.ptt_balance,
        ],
        backgroundColor: [
          "rgba(161, 247, 255, 1)",
          "rgba(1, 41, 66, 1)",
          "rgba(0, 69, 125, 1)",
          "rgba(5, 14, 29, 1)",
          // "rgba(0, 101, 161, 1)",
          // "rgba(0, 65, 104, 1)",
        ],
        borderColor: [
          "rgba(161, 247, 255, 1)",
          "rgba(1, 41, 66, 1)",
          "rgba(0, 69, 125, 1)",
          "rgba(5, 14, 29, 1)",
          // "rgba(0, 101, 161, 1)",
          // "rgba(0, 65, 104, 1)",
        ],
        borderWidth: 2,
        cutout: "70%",
      },
    ],
  };
  const lineChartData = {
    labels: lineValues.lbl,
    datasets: [
      {
        label: "Dataset 1",
        data: [
          lineValues.value[lineValues.lbl[0]],
          lineValues.value[lineValues.lbl[1]],
          lineValues.value[lineValues.lbl[2]],
          lineValues.value[lineValues.lbl[3]],
          lineValues.value[lineValues.lbl[4]],
          lineValues.value[lineValues.lbl[5]],
        ],
      },
    ],
  };
  return (
    <div className={`chartCard ${styles.cardContainer}`}>
      <div className={styles.cardItem}>
        <div className={styles.title}>
          <p className={titleClass}>{title}</p>
        </div>
        {type === "line" && (
          <div className={styles.dropdownContainer}>
            <p className="txt_Body3">Token</p>
            <DropDown
              listOfItems={dropDownItems}
              DefaultValue={{ label: selectedtoken, value: selectedtoken }}
              onSelect={(option) => {
                setSelectedToken(option);
                onLineFilter(option.toLowerCase());
              }}
              Custom_width="88px"
              Custom_height="32px"
            />
          </div>
        )}
      </div>
      <div className={styles.chartContainer}>
        <div
          className={`${styles.chart} ${
            type === "line" ? styles.lineChart : styles.donutChart
          }`}
        >
          {type === "line" ? (
            <LineChart
              chartData={lineChartData}
              minimum={1}
              maximum={lineValues.maxChartDataValue}
              stepSize={lineValues.stepSize}
              yTickLimit={6}
              showYTicks={false}
            />
          ) : (
            <>
              <Legend data={donutChartData} />
              <DonutChart data={donutChartData} showLegend={false} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
