import React from "react";
import { Line } from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
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

    console.log('-- generating tooltip');

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
    // const imgElement = document.createElement("img");
    // imgElement.style.position = "absolute";
    // imgElement.style.top = imgTopMarging + "px";
    // imgElement.style.right = imgRightMarging + "px";
    // // imgElement.src = "/icons/line_tooltip.svg";
    // imgElement.style.zIndex = '1';

    // appeding final el to tooltip
    tooltipEl.appendChild(title);
    tooltipEl.appendChild(value);
    tooltipEl.appendChild(value)
  };

  const colors = ["#D376FF", "#58DEEA"];

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
      annotation: {
        annotations: {
          labelRound1: {
            type: 'label',
            xValue: 0.24,
            yValue: 920,
            xAdjust: 0,
            yAdjust: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(62, 61, 71, 1)',
            borderWidth: 2,
            color: 'white',
            borderRadius: 9,
            content: ['Round 1'],
            textAlign: 'top',
            font: {
              size: 14,
            },
            callout: {
              display: true,
              side: 10
            }
          },
          round1: {
            type: 'line',
            xMin: 0.02,
            xMax: 0.02,
            yMin: 0,
            yMax: 1000,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: '#9B9B9B26',
            borderWidth: 2,
            borderDash: [10, 10],
            onClick: function () {
              console.log('Clicked!');
            },
            onclick: function () {
              console.log('Clicked!');
            }
          },
          labelRound2: {
            type: 'label',
            xValue: 1.24,
            yValue: 920,
            xAdjust: 0,
            yAdjust: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(62, 61, 71, 1)',
            borderWidth: 2,
            color: 'white',
            borderRadius: 9,
            content: ['Round 2'],
            textAlign: 'top',
            font: {
              size: 14,
            },
            callout: {
              display: true,
              side: 10
            },
          },
          round2: {
            type: 'line',
            xMin: 1,
            xMax: 1,
            yMin: 0,
            yMax: 1000,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: '#9B9B9B26',
            borderWidth: 2,
            borderDash: [10, 10],
          },
          labelRound3: {
            type: 'label',
            xValue: 2.24,
            yValue: 920,
            xAdjust: 0,
            yAdjust: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(62, 61, 71, 1)',
            borderWidth: 2,
            color: 'white',
            borderRadius: 9,
            content: ['Round 3'],
            textAlign: 'top',
            font: {
              size: 14,
            },
            callout: {
              display: true,
              side: 10
            },
          },
          round3: {
            type: 'line',
            xMin: 2,
            xMax: 2,
            yMin: 0,
            yMax: 1000,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: '#9B9B9B26',
            borderWidth: 2,
            borderDash: [10, 10],
          },
          labelRound4: {
            type: 'label',
            xValue: 3.24,
            yValue: 920,
            xAdjust: 0,
            yAdjust: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(62, 61, 71, 1)',
            borderWidth: 2,
            color: 'white',
            borderRadius: 9,
            content: ['Round 4'],
            textAlign: 'top',
            font: {
              size: 14,
            },
            callout: {
              display: true,
              side: 10
            },
          },
          round4: {
            type: 'line',
            xMin: 3,
            xMax: 3,
            yMin: 0,
            yMax: 1000,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: '#9B9B9B26',
            borderWidth: 2,
            borderDash: [10, 10],
          },
          labelRound5: {
            type: 'label',
            xValue: 4.24,
            yValue: 920,
            xAdjust: 0,
            yAdjust: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(62, 61, 71, 1)',
            borderWidth: 2,
            color: 'white',
            borderRadius: 9,
            content: ['Round 5'],
            textAlign: 'top',
            font: {
              size: 14,
            },
            callout: {
              display: true,
              side: 10
            },
          },
          round5: {
            type: 'line',
            xMin: 4,
            xMax: 4,
            yMin: 0,
            yMax: 1000,
            backgroundColor: 'rgba(255, 99, 132, 0.25)',
            borderColor: '#9B9B9B26',
            borderWidth: 2,
            borderDash: [10, 10],
          }
        },
        click: (context, event) => {
          console.log('Annotation clicked!', context, event);
          alert(context.id)
          // Handle your click event here
        },
        enter: (context, event) => {
          const annotation = context.element;
          annotation.options.opacity = '0.7';
          context.chart.update();
        },
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
          callback: function (value) {
            return `$${value}`;
          },
        },
      },
    },
  };

  // // Calculate percentage divisions
  // const yAxisDivisions = [20, 40, 60, 80, 100].map(
  //   (percentage) => minimum + ((maximum - minimum) * percentage) / 100
  // );

  // // Add grid lines for each division
  // options.scales.x.grid = {
  //   ...options.scales.x.grid,
  //   color: "red", // Grid line color
  //   lineWidth: 1, // Grid line width
  //   drawTicks: true, // Hide ticks of grid lines
  //   borderDash: [8, 4], // Dashed border style
  //   drawOnChartArea: true, // Draw on chart area
  //   borderDash: [8, 4], // Dashed border style
  //   drawOnChartArea: true, // Draw on chart area
  //   drawBorder: false, // Hide border of grid lines
  // };


  const data = {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset, index) => ({
      ...dataset,
      tension: 0.3,
      borderWidth: 4,
      borderColor: colors[index % colors.length],
      fill: false,
      shadowColor: colors[index % colors.length],
      shadowBlur: 10,
      shadowOffsetX: 5,
      shadowOffsetY: 10,
      pointRadius: dataset.data.map((_, i) => (i === dataset.data.length - 1 ? 8 : 0)),
      pointBackgroundColor: dataset.data.map((_, i) => (i === dataset.data.length - 1 ? '#D376FF' : colors[index % colors.length])),
      pointBorderColor: dataset.data.map((_, i) => (i === dataset.data.length - 1 ? 'white' : colors[index % colors.length])),
      pointBorderWidth: dataset.data.map((_, i) => (i === dataset.data.length - 1 ? 5 : 0)),
      pointHitRadius: dataset.data.map((_, i) => (i === dataset.data.length - 1 ? 5 : 0)),
    })),
  };

  return <Line options={options} data={data} />;
};

LineChart.defaultProps = {
  showTooltip: true,
};

export default LineChart;
