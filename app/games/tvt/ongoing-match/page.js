"use client";
import styles from "./style.module.scss";
import PlayerCard from "./_components/PlayerCard/PlayerCard";
import CountDown from "./_components/CountDown/CountDown";
import ProgressBars from "./_components/ProgressBars/ProgressBars";
import TokenSelection from "./_components/TokenSelection/TokenSelection";
import TabView from "./_components/TabView/TabView";
import FullGraph from "./_components/GraphView/FullGraph";
import RoundGraph from "./_components/GraphView/RoundGraph";
import CoinBar from "../components/coinBar/coinBar";
import {
  lineChartData,
  lineChartData2,
  lineChartData3,
  lineChartData4,
  lineValues,
} from "../ongoing-match/_components/GraphView/chartData";

import { useEffect, useState } from "react";

export default function Page() {
  const [graphKey, setGraphKey] = useState(0);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(lineChartData);
  }, []);

  const handleOptionChange = (option) => {
    console.log("Selected option: ", option);
    setGraphKey((prevKey) => prevKey + 1);
    if (option.lbl === "Round 1") {
      setChartData(lineChartData3);
    } else if (option.lbl === "Round 2") {
      setChartData(lineChartData2);
    } else if (option.lbl === "Round 3") {
      setChartData(lineChartData3);
    } else if (option.lbl === "Round 4") {
      setChartData(lineChartData3);
    }
  };

  return (
    <div className="pageContainer" style={{ paddingRight: 0 }}>
      <div className={styles.mainWrapper}>

        <div className={styles.gameWrapper}>
          <div className={styles.gameHeader}>
            <PlayerCard />
            <CountDown initialTime={30} activeRound={3} />
            <PlayerCard isOpponent={true} />
          </div>

          <div className={styles.progressBarWrapper}>
            <ProgressBars />
          </div>
          <div className={styles.gameContent}>
            <TabView onOptionChange={handleOptionChange}>
              <div label="Full game">
                <FullGraph />
              </div>
              <div label="Round">
                <RoundGraph
                  chatData={chartData}
                  chartData2={chartData}
                  key={graphKey}
                />
              </div>
            </TabView>
            <TokenSelection />
          </div>
        </div>
        <div className={styles.coinBarWrapper}>
          <CoinBar />
        </div>
      </div>
    </div>
  );
}
