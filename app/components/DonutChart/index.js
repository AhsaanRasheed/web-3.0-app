import React, { useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, showLegend, showTooltip, maintainAspectRatio, responsive, children }) => {
  const tooltipRef = useRef(null);

  const getOrCreateTooltip = (chart) => {
    if (!tooltipRef.current) {
      const tooltipEl = document.createElement("div");
      tooltipEl.className = "chartjs-tooltip";
      tooltipEl.style.cssText = `
        background: rgba(0, 0, 0, 0);
        border-radius: 3px;
        color: white;
        opacity: 0;
        pointer-events: none;
        position: absolute;
        transition: all .1s ease;
      `;

      const div = document.createElement("div");
      div.style.margin = "0px";

      tooltipEl.appendChild(div);
      chart.canvas.parentNode.appendChild(tooltipEl);

      tooltipRef.current = tooltipEl;
    }

    return tooltipRef.current;
  };

  const externalTooltipHandler = (context) => {
    if (!showTooltip) return;

    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    if (tooltip.body) {
      const titleLines = tooltip.title || [];

      while (tooltipEl.firstChild) {
        tooltipEl.firstChild.remove();
      }

      const tableRoot = document.createElement("table");
      tooltipEl.appendChild(tableRoot);

      const tableHead = document.createElement("thead");
      tableRoot.appendChild(tableHead);

      const textAlign = tooltip.caretX < chart.width / 2 ? "left" : "right";

      titleLines.forEach((title) => {
        const tr = document.createElement("tr");
        tr.style.borderWidth = 0;

        const th = document.createElement("th");
        th.style.borderWidth = 0;
        th.style.textAlign = textAlign;
        th.className = "txt_Body3";

        const text = document.createTextNode(title);
        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      var imgElement = document.createElement("img");
      imgElement.src = "/icons/tooltip_arrow.svg";
      imgElement.style.cssText = `
        width: 80px;
        height: 30px;
        transform: scaleX(${tooltip.caretX > chart.width / 2 ? -1 : 1});
      `;
      tableRoot.appendChild(imgElement);
    }

    const positionY = chart.canvas.offsetTop - 50;
    let positionX = chart.canvas.offsetLeft + tooltip.caretX;

    if (tooltip.caretX < chart.width / 2) {
      positionX -= tooltipEl.offsetWidth - 10;
    }

    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + "px";
    tooltipEl.style.top = positionY + tooltip.caretY + "px";
  };

  const calculateTotal = (data) => {
    return data.datasets.reduce(
      (total, dataset) =>
        total + dataset.data.reduce((sum, value) => sum + value, 0),
      0
    );
  };

  const customLegend = {
    display: showLegend,
    position: "left",
    labels: {
      boxWidth: 24,
      boxHeight: 16,
      boxPadding: 9,
      padding: 16,
      font: {
        family: "Roboto",
        size: 14,
        weight: 400,
      },
      generateLabels: (chart) => {
        const total = calculateTotal(chart.data);
        return chart.data.labels.map((label, index) => {
          const value = chart.data.datasets[0].data[index];
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return {
            text: `${label} - ${percentage}`,
            fillStyle: chart.data.datasets[0].backgroundColor[index],
            strokeStyle: chart.data.datasets[0].backgroundColor[index],
            lineWidth: 0,
            fontColor: "#D9DEE8",
            borderRadius: 2,
          };
        });
      },
    },
  };

  const options = {
    plugins: {
      legend: customLegend,
      title: {
        display: false,
      },
      tooltip: {
        enabled: false, // We handle tooltip externally
        external: externalTooltipHandler,
      },
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
      {children}
    </div>
  );
};

DonutChart.defaultProps = {
  showTooltip: false,
  maintainAspectRatio: false,
  responsive: false,
  showLegend: false,
};

export default DonutChart;
