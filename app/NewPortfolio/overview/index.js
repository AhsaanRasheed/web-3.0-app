"use client";
import React, { useState, useEffect } from "react";
import styles from "../style.module.scss";
import DonutChart from "@/app/components/DonutChart";
import RoundedLegend from "@/app/components/RoundedLagend";
import LineChart from "@/app/components/LineChart";
import { lineChartData, donutChartData, lineValues } from "./chartData";
import Dropdown from "@/app/components/Dropdown";
import BarOptionSelector from "@/app/components/BarOptionSelector";
import { useRouter } from "next/router";

const options = [
  { value: "option1", label: "PTT" },
  { value: "option2", label: "BTC" },
  { value: "option3", label: "FTT", disable: true }, // Disabled option
];

export default function Overview({ isMobileView }) {
  return (
    <div style={{ width: "100%", padding: "0" }}>
      {isMobileView ? <MobileView /> : <DesktopView />}
    </div>
  );
}

function DesktopView() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectValue = (value) => {
    setSelectedValue(value);
    // Do something with the selected value, such as updating state in the parent component
  };

  useEffect(() => {
    // hanlde effects
  }, []);

  const values = ["1D", "7D", "1M", "1Y", "All"];

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        {/* Allocation */}
        <div className={styles.cardW33}>
          <div className={styles.cardheader}>
            <div className={styles.cartTitle}>Allocation</div>
          </div>
          <div className={styles.cardBody} style={{ marginTop: "28px" }}>
            <div className={styles.cardLeft}>
              <RoundedLegend data={donutChartData} />
            </div>
            <div style={{ height: "300px", width: "300px" }}>
              <DonutChart data={donutChartData} />
            </div>
          </div>
        </div>
        {/* ./ Allocation */}

        {/* History */}
        <div className={styles.cardW66}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={styles.cardHeader}>
              <div className={styles.cartTitle}>History</div>
              <div>
                <Dropdown
                  options={options}
                  onChange={handleSelect}
                  selected={selectedOption}
                  labelStyle={{ textTransform: "uppercase" }}
                />
              </div>
            </div>

            <BarOptionSelector values={values} onSelect={handleSelectValue} />
          </div>

          <div className={styles.cardBody}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "300px",
                overflow: "auto",
              }}
            >
              <LineChart
                chartData={lineChartData}
                minimum={1}
                maximum={lineValues.maxChartDataValue}
                stepSize={lineValues.stepSize}
                yTickLimit={6}
                showYTicks={true}
              />
            </div>
          </div>
        </div>
        {/* ./ History */}
      </div>

      {/* Datatable */}
      <div className={styles.cardFull}>
        <p style={{marginBottom: '20px', fontSize: '20px', fontFamily: 'Jura', fontWeight: '500'}}>Staking Portfolio</p>
        <p style={{fontSize: '18px', fontFamily: 'Jura', fontWeight: '500', textAlign: 'center'}}>Comming soon</p>
      </div>
      {/* ./ Datatable */}
    </div>
  );
}

function MobileView() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectValue = (value) => {
    setSelectedValue(value);
    // Do something with the selected value, such as updating state in the parent component
  };

  useEffect(() => {
    // hanlde effects
  }, []);

  const values = ["1D", "7D", "1M", "1Y", "All"];

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        {/* Allocation */}
        <div className={styles.cardW33}>
          <div className={styles.cardheader}>
            <div className={styles.cartTitle}>Allocation</div>
          </div>
          <div className={styles.cardBody} style={{ marginTop: "28px", flexWrap: 'nowrap', gap: '60px'}}>
            <div className={styles.cardLeft}>
              <RoundedLegend data={donutChartData} />
            </div>
            <div style={{ height: "114px", width: "114px" }}>
              <DonutChart data={donutChartData} />
            </div>
          </div>
        </div>
        {/* ./ Allocation */}

        {/* History */}
        <div className={styles.cardW66}>
          <div>
            <div
              className={styles.cardHeader}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className={styles.cartTitle}>History</div>
              <div>
                <Dropdown
                  options={options}
                  onChange={handleSelect}
                  selected={selectedOption}
                  labelStyle={{ textTransform: "uppercase" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <BarOptionSelector values={values} onSelect={handleSelectValue} />
            </div>
          </div>

          <div className={styles.cardBody}>
            <div style={{ position: "relative", overflow: "auto" }}>
              <LineChart
                chartData={lineChartData}
                minimum={1}
                maximum={lineValues.maxChartDataValue}
                stepSize={lineValues.stepSize}
                yTickLimit={6}
                showYTicks={true}
                showTooltip={true}
              />
            </div>
          </div>
        </div>
        {/* ./ History */}
      </div>

      {/* Datatable */}
      <div className={styles.cardFull}>Staking Portfolio</div>
      {/* ./ Datatable */}
    </div>
  );
}
