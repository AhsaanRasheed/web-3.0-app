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
  ],
  value: {
    "Jan": 1,
    "Feb": 4,
    "Mar": 5,
    "Apr": 8,
    "May": 6,
    "Jun": 6,
    "Jul": 5,
    "Aug": 4,
    "Sep": 5,
    "Oct": 4,
    "Nov": 5,
    "Dec": 3,

  },
  maxChartDataValue: 10,
  stepSize: 6,
};

export const lineChartData = {
  labels: lineValues.lbl,
  datasets: [
    {
      label: "Dataset 1",
      data: [
        lineValues.value[lineValues.lbl[0]],
        lineValues.value[lineValues.lbl[1]],
        lineValues.value[lineValues.lbl[2]],
        lineValues.value[lineValues.lbl[3]],
        lineValues.value[lineValues.lbl[4]],
        lineValues.value[lineValues.lbl[5]],
        lineValues.value[lineValues.lbl[6]],
        lineValues.value[lineValues.lbl[7]],
        lineValues.value[lineValues.lbl[8]],
        lineValues.value[lineValues.lbl[9]],
        lineValues.value[lineValues.lbl[10]],
        lineValues.value[lineValues.lbl[11]],
      ],
    },
  ],
};

export const dropdownOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disable: true }, // Disabled option
];
