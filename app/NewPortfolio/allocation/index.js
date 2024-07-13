"use client";
import React, { useState, useEffect } from "react";
import ChartCard from "./Component/ChartCard";
import DataTable from "@/app/_components/DataTable";
import DonutChart from "@/app/_components/DonutChart";
import LineChart from "@/app/_components/LineChart";
import Table from "./Component/Table/index";
import styles from "./style.module.scss";
import {
  get_stakes,
  get_balance_api,
  get_portfolio_graph,
} from "@/app/services/service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

export default function Allocation({ isMobileView }) {
  const [pieValues, setPieValues] = useState({
    ptt_balance: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
  });
  const [lineFilter, setLineFilter] = useState("total");
  const [lineValues, setLineValues] = useState({
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
  });
  const { toggleLoader } = useLoader();

  const get_line_values = async (e) => {
    toggleLoader(true);
    const resp_line = await get_portfolio_graph(e);
    let LineChartLbl = getLastSixMonthsShortNames();
    let LineChartData = FormatDataForLineChart(
      LineChartLbl,
      resp_line.data.data
    );
    const maxChartDataValue =
      Math.max(...Object.values(lineValues.value)) + 100;
    const stepSize = Math.ceil(maxChartDataValue / 5);
    setLineValues({
      lbl: LineChartLbl,
      value: LineChartData,
      maxChartDataValue: maxChartDataValue,
      stepSize: stepSize,
    });
    toggleLoader(false);
  };
  const get_values = async () => {
    toggleLoader(true);
    try{

    
    const resp_bln = await get_balance_api();
    const resp_line = await get_portfolio_graph(lineFilter);
    let LineChartLbl = getLastSixMonthsShortNames();
    let LineChartData = FormatDataForLineChart(
      LineChartLbl,
      resp_line.data.data
    );
    const maxChartDataValue =
      Math.max(...Object.values(lineValues.value)) + 100;
    const stepSize = Math.ceil(maxChartDataValue / 5);
    setLineValues({
      lbl: LineChartLbl,
      value: LineChartData,
      maxChartDataValue: maxChartDataValue,
      stepSize: stepSize,
    });

    let total =
      100 /
      (resp_bln.data.ptt_balance +
        resp_bln.data.silver +
        resp_bln.data.gold +
        resp_bln.data.diamond);

    setPieValues({
      ptt_balance: (resp_bln.data.ptt_balance * total).toFixed(2),
      silver: (resp_bln.data.silver * total).toFixed(2),
      gold: (resp_bln.data.gold * total).toFixed(2),
      diamond: (resp_bln.data.diamond * total).toFixed(2),
    });
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  useEffect(() => {
    // get_values();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.allocation_container}>
      </div>
    </div>
  );
}

function getLastSixMonthsShortNames() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = new Date();
  const result = [];

  for (let i = 5; i >= 0; i--) {
    result.push(months[currentDate.getMonth()]);
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return result.reverse();
}

function FormatDataForLineChart(lastSixMonthsShortNames, dataList) {
  const monthlyTotals = {};
  const currentDate = new Date();
  const sevenMonthsAgo = new Date(currentDate);
  sevenMonthsAgo.setMonth(currentDate.getMonth() - 7);
  lastSixMonthsShortNames.forEach((item) => {
    monthlyTotals[item] = 0;
  });
  dataList.forEach((item) => {
    const date = new Date(item.day);
    if (date > sevenMonthsAgo) {
      date.setMonth(date.getMonth() + 1);
      const nextMonth = date.toLocaleString("en-US", { month: "short" });
      if (lastSixMonthsShortNames.includes(nextMonth)) {
        monthlyTotals[nextMonth] += item.total;
      }
    }
  });

  return monthlyTotals;
}
