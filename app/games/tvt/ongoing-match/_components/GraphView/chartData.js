const showYTicks = true;
const minimum = 0;
const maximum = 700;
const stepSize = 50;
const yTickLimit = 10;

const generateRandomData = (numPoints, min, max) => {
  const data = [];
  for (let i = 0; i < numPoints; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
};

const dataset1Data = generateRandomData(6, 50, 650);
const dataset2Data = generateRandomData(6, 50, 650);
const dataset3Data = generateRandomData(5, 50, 650);


export const donutChartData = {
  labels: ["PTT", "BTC", "FTT"],
  datasets: [
    {
      label: "# of Coins",
      data: [49, 41, 10],
      backgroundColor: ["#A0F7FF", "#FFB13D", "#BB2CFF"],
      borderColor: ["tranparent", "tranparent", "tranparent"],
      borderWidth: 2,
      cutout: "50%",
    },
  ],
};

export const lineValues = {
  lbl: [
    "00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "11:00"
  ],
  value: {
    "00:00": 100,
    "02:00": 150,
    "04:00": 200,
    "06:00": 250,
    "08:00": 300,
    "10:00": 350,
    "11:00": 380,
  },
  maxChartDataValue: 650,
  stepSize: 50,
};

export const lineChartData = {
  labels: lineValues.lbl,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset1Data,
      borderColor: "#D376FF",
      fill: false,
    },
    {
      label: "Dataset 2",
      data: dataset2Data,
      borderColor: "#58DEEA",
      fill: false,
    },
  ],
};

export const lineChartData2 = {
  labels: lineValues.lbl,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset1Data,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
    },
    {
      label: "Dataset 2",
      data: dataset2Data,
      tension: 0.1,
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};


export const lineChartData3 = {
  labels: lineValues.lbl,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset3Data,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
    },
    {
      label: "Dataset 2",
      data: dataset2Data,
      tension: 0.1,
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};

export const lineChartData4 = {
  labels: lineValues.lbl,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset2Data,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      fill: false,
    },
    {
      label: "Dataset 2",
      data: dataset1Data,
      tension: 0.1,
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
    },
  ],
};


const options = {
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
    legend: { display: true, position: "top" },
    title: { display: false, text: "Chart.js Line Chart" },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem) {
          return `$${tooltipItem.raw}`;
        }
      }
    },
  },
  scales: {
    x: {
      type: "category",
      labels: lineValues.lbl,
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
        callback: function (value, index, ticks) {
          return '$' + value;
        }
      },
    },
  },
};
