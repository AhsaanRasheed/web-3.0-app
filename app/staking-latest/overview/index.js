"use client";
import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import ChartCard from "./Components/ChartCard";
import LineChart from "@/app/_components/LineChart";
import Link from "next/link";
import styles from "./style.module.scss";
import Tabel from "./Components/Table";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

import { get_staking, get_stake_graph } from "@/app/services/service";

const OverView = ({ isMobileView }) => {
  const [stakingData, setStakingData] = useState({
    diamond_claimable: 0,
    diamond_claimed: 0,
    gold_claimable: 0,
    gold_claimed: 0,
    silver_claimable: 0,
    silver_claimed: 0,
    total_claimable: 0,
    total_claimed: 0,
  });

  const { toggleLoader } = useLoader();

  const get_staking_data = async () => {
    toggleLoader(true);
    try {
    let va = await get_staking();
    if (va.code == 200) setStakingData(va.data);
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  const [stakingGraphData, setStakingGraphData] = useState({});
  const [yPoints, setYPoints] = useState({});
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [yAxisMin, setYAxisMin] = useState(0);
  const [yAxisMax, setYAxisMax] = useState(0);
  const [weekdaysOnly, setWeekDaysOnly] = useState([]);

  const get_staking_graph_data = async () => {
    let va = await get_stake_graph();
    if (va.code == 200) setStakingGraphData(va.data);
    console.log("stake Data");
    console.log(va.data);

    const extractedTotals = va.data.map((item) => item.total);
    setYPoints(extractedTotals);
    let data = va.data;
    // Sorting data by day in descending order
    data.sort((a, b) => new Date(b.day) - new Date(a.day));

    // Limiting the array to 7 elements if it has more
    if (data.length > 7) {
      data = data.slice(0, 7);
    }

    let days = data.map((item) => {
      let date = new Date(item.day);
      let dayOfWeek = date.getDay();
      return weekDays[dayOfWeek];
    });
    setWeekDaysOnly(days);
    console.log(weekdaysOnly);

    let minTotal = Math.min(...data.map((item) => item.total));
    let maxTotal = Math.max(...data.map((item) => item.total));

    // Optionally add padding
    let padding = (maxTotal - minTotal) * 0.1;
    let min = Math.floor(Math.max(0, minTotal - padding));
    let max = Math.ceil(maxTotal + padding);
    setYAxisMin(min);
    setYAxisMax(max);
    console.log(yAxisMax);
    console.log(yAxisMin);
  };

  useEffect(() => {
    // get_staking_data();
    // get_staking_graph_data();
  }, []);

  const lineChartData = {
    labels: weekdaysOnly,
    datasets: [
      {
        label: "Dataset 1",
        data: yPoints,
      },
    ],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.upper_inner}>
            <ChartCard type="line">
              <LineChart
                chartData={lineChartData}
                minimum={yAxisMin}
                maximum={yAxisMax}
                stepSize={2000}
                yTickLimit={6}
                showYTicks={true}
              />
            </ChartCard>
          </div>
          <div className={styles.upper_inner}>
            <Card
              data={[
                {
                  title: "Total PTT Claimed",
                  btnText: "History",
                  ptt: "PTT " + stakingData.total_claimed.toFixed(3),
                  price: "€ " + (stakingData.total_claimed * 0.1).toFixed(2),
                  link: "staking?s=History",
                },
              ]}
            />

            <Card
              data={[
                {
                  title: "Pending Rewards",
                  btnText: "Claim Rewards",
                  ptt: "PTT " + stakingData.total_claimable.toFixed(3),
                  price: "€ " + (stakingData.total_claimable * 0.1).toFixed(2),
                  link: "staking?s=Claim",
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.lower}>
          {/* <div className={styles.table_container}> */}
          <Tabel isMobileView={isMobileView} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default OverView;
