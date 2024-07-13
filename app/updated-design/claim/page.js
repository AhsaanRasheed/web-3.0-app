"use client";
import React, { useState } from "react";
import Card from "./Components/Card";
import ChartCard from "./Components/ChartCard";
import DonutChart from "@/app/_components/DonutChart";
import LineChart from "@/app/_components/LineChart";
import Button from "@/app/_components/Button";
import styles from "./style.module.scss";

const Staking = () => {
  const donutChartData = {
    labels: ["Diamond", "Silver", "Gold"],
    datasets: [
      {
        label: "# of Votes",
        data: [10, 30, 60],
        backgroundColor: [
          "rgba(5, 14, 29, 0.8)",
          "rgba(0, 101, 161, 0.8)",
          "rgba(0, 144, 231, 0.8)",
        ],
        borderColor: [
          "rgba(5, 14, 29, 1)",
          "rgba(0, 101, 161, 1)",
          "rgba(0, 144, 231, 1)",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };
  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, "#5CEBD6");
      gradient.addColorStop(0.5, "#249EF5");
      gradient.addColorStop(1, "#00457D");
    }

    return gradient;
  }
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Dataset 1",
        data: [5, 600, 1000, 5000, 800, 10000],
        tension: 0.5,
        borderColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.chart_container}>
            <ChartCard type="donut">
              <DonutChart data={donutChartData} legendTitle="Data" />
            </ChartCard>
          </div>
          <div className={styles.chart_container}>
            <ChartCard type="line">
              <LineChart chartData={lineChartData}
                minimum={0}
                maximum={11000}
                stepSize={2000}
                yTickLimit={6}
                showYTicks={true} />
            </ChartCard>
          </div>
        </div>
        <div className={styles.lower}>
          <div className={styles.cards}>
            <Card
              data={[
                {
                  name: "Silver",
                  percent: "10%",
                  status: "Available",
                  id: 1,
                  ptt: "PTT 5",
                  price: "€ 2.98",
                },
              ]}
              expanded={expandedCard === "card1"}
              onCardClick={() => handleCardClick("card1")}
            />
            <Card
              data={[
                {
                  name: "Gold",
                  percent: "100%",
                  status: "Available",
                  id: 2,
                  ptt: "PTT 50",
                  price: "€ 29.8",
                },
              ]}
              expanded={expandedCard === "card2"}
              onCardClick={() => handleCardClick("card2")}
            />
            <Card
              data={[
                {
                  name: "Diamond",
                  percent: "20%",
                  status: "Available",
                  id: 3,
                  ptt: "PTT 100",
                  price: "€ 61.3",
                },
              ]}
              expanded={expandedCard === "card3"}
              onCardClick={() => handleCardClick("card3")}
            />
          </div>
          <div className={styles.button}>
            <Button label="Total PTT 150   |   Invest now" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
