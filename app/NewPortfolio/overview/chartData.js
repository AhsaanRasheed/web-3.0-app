export const donutChartData = {
    labels: ["PTT", "BTC", "FTT"],
    datasets: [
        {
            label: "# of Coins",
            data: [49, 41, 10],
            backgroundColor: [
                "#A0F7FF",
                "#FFB13D",
                "#BB2CFF"
            ],
            borderColor: [
                "tranparent",
                "tranparent",
                "tranparent"
            ],
            borderWidth: 2,
            cutout: "50%",
        },
    ],
};

export const lineValues = {
    lbl: ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50", "00:60", "00:70"],
    value: {
        '00:00': 1,
        '00:10': 2,
        '00:20': 5,
        '00:30': 7,
        '00:40': 2,
        '00:50': 9,
        '00:60': 2,
        '00:70': 9,

    },
    maxChartDataValue: 10,
    stepSize: 6,
}

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

            ],
        },
    ],
};

export const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disable: true }, // Disabled option
  ];