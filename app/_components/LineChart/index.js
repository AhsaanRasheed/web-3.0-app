import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required components and the custom point element
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({
  chartData,
  minimum,
  maximum,
  stepSize,
  yTickLimit,
  showYTicks,
}) => {
  let width, height, gradient;
  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    // Check if the dimensions have changed
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Update the dimensions
      width = chartWidth;
      height = chartHeight;

      // Create the gradient
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );

      // Define the color stops
      gradient.addColorStop(0, "rgba(92, 235, 214, 0.5)");
      gradient.addColorStop(0.4, "rgba(36, 158, 245, 1)");
      gradient.addColorStop(1, "rgba(0, 69, 125, 1)");
    }
    return gradient;
  }

  const options = {
    elements: {
      point: {
        radius: 0,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderColor: "rgba(255, 255, 255, 0)",
        borderWidth: 0,
        hitRadius: 10,
        hoverRadius: 12,
        hoverBackgroundColor: "rgba(255, 255, 255, 1)",
        hoverBorderColor: "rgba(0, 255, 0, 0)",
        hoverBorderWidth: 0,
      },
      line: {},
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#050E1D",
        padding: 12,
        titleColor: "#ffffff",
        titleFont: {
          family: "Roboto",
          size: 16,
          weight: 700,
        },
        bodyColor: "#596170",
        bodyFont: {
          family: "Roboto",
          size: 14,
          weight: 400,
        },
        borderColor: "rgba(0, 0, 0, 0)",
        borderWidth: 1,
        displayColors: false,
        cornerRadius: 8,
        caretColor: "#050E1D",
        position: "nearest",
        caretPadding: 20,
        caretSize: 7,
        callbacks: {
          title: function (tooltipItems) {
            return `PTT ${tooltipItems[0].formattedValue}`;
          },
          label: function (tooltipItem) {
            let label = tooltipItem.label;
            let value = tooltipItem.formattedValue;
            return `${label}: €${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: chartData.labels,
        grid: {
          color: "#01294280",
        },
        ticks: {
          color: "#9EA6BA",
          font: {
            family: "Roboto",
            size: 12,
            weight: 300,
          },
        },
      },
      y: {
        display: showYTicks,
        min: minimum,
        max: maximum,
        stepSize: stepSize,
        grid: {
          color: "#01294280",
        },
        ticks: {
          maxTicksLimit: yTickLimit,
          color: "#9EA6BA",
          font: {
            family: "Roboto",
            size: 12,
            weight: 300,
          },
        },
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      tension: 0.4,
      borderWidth: 6,
      borderColor: function (context) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return null;
        return getGradient(ctx, chartArea);
      },
    })),
  };

  console.log(chartData.labels);
  return (
    <div className="lineChart">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
