import React, { useRef } from "react";
import { Line, Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend, LineController
} from "chart.js";

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
  showTooltip,
}) => {

  // ==========================
  // LineChart started
  // props: chartDate
  // props: minimum
  // props: maximum
  // props: stepSize
  // props: yTickLimit
  // props: showYTicks
  // props: showTooltip
  // ===========================

  let draw = LineController.prototype.draw;
  LineController.prototype.draw = function () {
    let chart = this.chart;
    let ctx = chart.ctx;
    let _stroke = ctx.stroke;
    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 80;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 35;
      _stroke.apply(this, arguments);
      ctx.restore();
    };
    draw.apply(this, arguments);
    ctx.stroke = _stroke;
  };
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  // TODO: last elemenet has to bit more tackle to set xPOS
  const externalTooltipHandler = (context) => {
    if (!showTooltip) return;

    const { chart, tooltip } = context;

    if (tooltip.opacity === 0) {
      return;
    }

    const tooltipEl = getOrCreateTooltip(chart);

    // offest for the tooltip make it above to the pointer
    const OFFSET_POSITION_Y = 15
    let imgTopMarging = -20;
    let imgRightMarging = 32;

    // Calculate position based on chart interaction point
    let positionX = tooltip.caretX + chart.canvas.offsetLeft;
    let positionY = tooltip.caretY + chart.canvas.offsetTop - tooltipEl.offsetHeight - OFFSET_POSITION_Y;

    // Adjust position if tooltip is going out of bounds
    if (positionX + tooltipEl.offsetWidth > chart.canvas.offsetWidth) {
      positionX -= tooltipEl.offsetWidth;
      imgRightMarging = 10;
    }
    if (positionY < 0) {
      positionY = tooltip.caretY + chart.canvas.offsetTop;
      imgTopMarging = -77;
    }

    // added styles to el
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + "px";
    tooltipEl.style.top = positionY + "px";
    tooltipEl.style.textAlign = "center";
    tooltipEl.style.padding = "16px";

    // background shade by figma
    tooltipEl.style.borderRadius = '8px';
    tooltipEl.style.background = 'rgba(118, 130, 193, 0.08)';
    tooltipEl.style.boxShadow = '0px 16px 35px -15px rgba(0, 0, 0, 0.25)'; // Set box-shadow
    tooltipEl.style.backdropFilter = 'blur(5.05px)';

    // make it top of el
    tooltipEl.style.zIndex = '9999';

    while (tooltipEl.firstChild) {
      tooltipEl.firstChild.remove();
    }

    // styling title
    const title = document.createElement('div');
    title.className = 'chartjs-tooltip-title';
    title.style.color = '#58DEEA';
    title.style.display = 'inline';
    title.style.fontFamily = 'Jura';
    title.style.fontSize = '17px';
    title.style.fontWeight = '700';
    title.textContent = `PTV`;

    // styling value
    const value = document.createElement('div');
    value.className = 'chartjs-tooltip-value';
    value.style.color = 'white';
    value.style.display = 'inline';
    value.style.fontFamily = 'Jura';
    value.style.fontSize = '17px';
    value.style.fontWeight = '500';
    value.style.marginTop = '1px';
    value.textContent = ` ${tooltip.dataPoints[0].formattedValue}`;

    // bar image 
    const imgElement = document.createElement("img");
    imgElement.style.position = "absolute";
    imgElement.style.top = imgTopMarging + "px";
    imgElement.style.right = imgRightMarging + "px";
    // imgElement.src = "/icons/line_tooltip.svg";
    imgElement.style.zIndex = '1';

    // appeding final el to tooltip
    tooltipEl.appendChild(title);
    tooltipEl.appendChild(value);
    tooltipEl.appendChild(imgElement)
  };


  const options = {
    // animation: {
    //   duration: 0
    // },
    elements: {
      point: {
        radius: 0,
        backgroundColor: "#58DEEA",
        borderColor: "#58DEEA",
        borderWidth: 0,
        hitRadius: 10,
        hoverRadius: 5,
        hoverBackgroundColor: "#58DEEA",
        hoverBorderColor: "#58DEEA",
        hoverBorderWidth: 0,
      },
      line: {},
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
      title: { display: false, text: "Chart.js Line Chart" },
      tooltip: {
        enabled: false, // We handle tooltip externally
        external: externalTooltipHandler,
      },
    },
    scales: {
      x: {
        type: "category",
        labels: chartData.labels,
        grid: { color: "#01294280" },
        ticks: {
          color: "#9EA6BA",
          font: { family: "Jura", size: 14, weight: 300 },
        },
      },
      y: {
        display: showYTicks,
        min: minimum,
        max: maximum,
        stepSize: stepSize,
        grid: { color: "#01294280" },
        ticks: {
          maxTicksLimit: yTickLimit,
          color: "#ffffff",
          font: { family: "Jura", size: 14, weight: 300 },
        },
      },
    },
  };

  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      tension: 0.3,
      borderWidth: 4,
      borderColor: "#D376FF",
      fill: false,
      shadowColor: "#E56590",
      shadowBlur: 10,
      shadowoffsetX: 5,
      shadowoffsetY: 10,
    })),
  };

  return <Line options={options} data={data} />;
};

// default setup for props
LineChart.defaultProps = {
  showTooltip: true,
};

export default LineChart;
