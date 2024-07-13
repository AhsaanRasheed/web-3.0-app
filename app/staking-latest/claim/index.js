"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Components/Card";
import ChartCard from "./Components/ChartCard";
import DonutChart from "@/app/_components/DonutChart";
import LineChart from "@/app/_components/LineChart";
// import Button from "@/app/_components/Button";
import Button from "@/app/_components/global/Button/Button";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import Modal from "@/app/_components/Modal";
import mainStyle from "../style.module.scss";
import Link from "next/link";
import styles from "./style.module.scss";
import {
  get_staking,
  create_claim,
  get_stake_contract_info,
  get_claim_graph,
} from "@/app/services/service";

const Claim = ({ isMobileView }) => {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();

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
  const [stakingDataChart, setStakingDataChart] = useState({
    diamond_claimed: 0,
    gold_claimed: 0,
    silver_claimed: 0,
    total_claimed: 0,
  });
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [investTxHash, setInvestTxHash] = useState(null);
  const [errorModalShow, setErrorModalShow] = useState(false);

  const [claimGraphData, setClaimGraphData] = useState({});
  const [yPoints, setYPoints] = useState({});
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [yAxisMin, setYAxisMin] = useState(0);
  const [yAxisMax, setYAxisMax] = useState(0);
  const [weekdaysOnly, setWeekDaysOnly] = useState([]);
  const selectedGraphPool = useSelector((state) => state.pool.selectedPool);

  const get_claim_graph_data = async (pool) => {
    let va = await get_claim_graph(pool);
    if (va.code == 200) setClaimGraphData(va.data);
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

  const get_staking_data = async () => {
    toggleLoader(true);
    try {
    let va = await get_staking();
    if (va.code == 200) {
      setStakingData(va.data);
      setStakingDataChart({
        diamond_claimed: va.data.diamond_claimed,
        gold_claimed: va.data.gold_claimed,
        silver_claimed: va.data.silver_claimed,
        total_claimed: va.data.total_claimed,
      });
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };

  useEffect(() => {
    get_staking_data();
    // get_stake_contract_info().then((res) => {
    //   setStakingDataChart({
    //     diamond_claimed: res.data.two_year_tvl,
    //     gold_claimed: res.data.one_year_tvl,
    //     silver_claimed: res.data.six_month_tvl,
    //     total_claimed:
    //       res.data.two_year_tvl +
    //       res.data.one_year_tvl +
    //       res.data.six_month_tvl,
    //   });
    // });
  }, []);

  useEffect(() => {
    get_claim_graph_data(
      selectedGraphPool !== "Total" ? selectedGraphPool : undefined
    );
  }, [selectedGraphPool]);

  const [selectedPool, setSelectedPool] = useState(null);
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  const clainNow = async () => {
    toggleLoader(true);
    try {

    const resp = await create_claim(selectedPool);
    if (resp.code == 200) {
      // handleAddNotification("success", "Claim Successfully.");
      setInvestTxHash(resp.data.tx_hash);

     

      setSuccessModalShow(true);
    } else {
    
      // handleAddNotification("fail", "Failed to Claim.");
      setInvestTxHash(resp.data?.tx_hash);

      setErrorModalShow(true);
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  const donutChartData = {
    labels: ["Silver", "Diamond", "Gold"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          stakingDataChart?.silver_claimed,
          stakingDataChart?.diamond_claimed,
          stakingDataChart?.gold_claimed,
        ],
        backgroundColor: [
          "rgba(0, 101, 161, 0.8)",
          "rgba(5, 14, 29, 0.8)",
          "rgba(0, 144, 231, 0.8)",
        ],
        borderColor: [
          "rgba(0, 101, 161, 1)",
          "rgba(5, 14, 29, 1)",
          "rgba(0, 144, 231, 1)",
        ],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const lineChartData = {
    labels: weekdaysOnly,
    datasets: [
      {
        label: "Dataset 1",
        data: yPoints,
      },
    ],
  };

  const [expandedCard, setExpandedCard] = useState(null);
  const handleCardClick = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.upper}>
          <div className={styles.chart_container}>
            <ChartCard
              type="donut"
              total_claimed={(stakingData
                ? stakingData?.total_claimed
                : 0
              ).toFixed(2)}
            >
              <DonutChart data={donutChartData} showLegend={false}>
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <span className="txt_Body3 color_neutral_medium">
                    Total Claimed
                  </span>
                  <span className="txt_Title2 ">
                    € {(stakingDataChart?.total_claimed * 0.1).toFixed(2)}
                  </span>
                </div>
              </DonutChart>
            </ChartCard>
          </div>
          <div className={styles.chart_container}>
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
        </div>
        <div className={styles.lower}>
          <div className={styles.cards}>
            <Card
              item={{
                name: "Silver",
                percent: "20%",
                status: "Available",
                id: 1,
                ptt: "PTT " + (stakingData?.silver_claimable).toFixed(2),
                price: "€  " + (stakingData?.silver_claimable * 0.1).toFixed(3),
              }}
              expanded={expandedCard === "card1"}
              onCardClick={() => handleCardClick("card1")}
              selectedPool={selectedPool}
              onCheckBoxClick={() =>
                selectedPool == "silver"
                  ? setSelectedPool("")
                  : setSelectedPool("silver")
              }
              isMobileView={isMobileView}
            />
            <Card
              item={{
                name: "Gold",
                percent: "40%",
                status: "Available",
                id: 2,
                ptt: "PTT " + (stakingData?.gold_claimable).toFixed(2),
                price: "€ " + (stakingData?.gold_claimable * 0.1).toFixed(3),
              }}
              expanded={expandedCard === "card2"}
              onCardClick={() => handleCardClick("card2")}
              selectedPool={selectedPool}
              onCheckBoxClick={() =>
                selectedPool == "gold"
                  ? setSelectedPool("")
                  : setSelectedPool("gold")
              }
              isMobileView={isMobileView}
            />
            <Card
              item={{
                name: "Diamond",
                percent: "120%",
                status: "Available",
                id: 3,
                ptt: "PTT " + (stakingData?.diamond_claimable).toFixed(2),
                price: "€ " + (stakingData?.diamond_claimable * 0.1).toFixed(3),
              }}
              expanded={expandedCard === "card3"}
              onCardClick={() => handleCardClick("card3")}
              selectedPool={selectedPool}
              onCheckBoxClick={() =>
                selectedPool == "diamond"
                  ? setSelectedPool("")
                  : setSelectedPool("diamond")
              }
              isMobileView={isMobileView}
            />
          </div>
          <div className={styles.button}>
            <Button
              text={`Total PTT ${
                selectedPool == "diamond"
                  ? (stakingData?.diamond_claimable).toFixed(2)
                  : selectedPool == "gold"
                  ? (stakingData?.gold_claimable).toFixed(2)
                  : selectedPool == "silver"
                  ? (stakingData?.silver_claimable).toFixed(2)
                  : 0.0
              }   |   Claim now`}
              Custom_width={"100%"}
              Custom_minWidth={"100%"}
              Custom_maxWidth={"100%"}
              disable={selectedPool == null}
              onClick={() => clainNow()}
            />
          </div>
        </div>
      </div>
      <SuccessModal
        successModalShow={successModalShow}
        onClose={async () => {
          setSuccessModalShow(false);
          setSelectedPool(null);
          await get_staking_data();
        }}
        PTT={
          selectedPool == "diamond"
            ? (stakingData?.diamond_claimable).toFixed(2)
            : selectedPool == "gold"
            ? (stakingData?.gold_claimable).toFixed(2)
            : selectedPool == "silver"
            ? (stakingData?.silver_claimable).toFixed(2)
            : 0.0
        }
        hash={investTxHash}
      />
      <ErrorModal
        errorModalShow={errorModalShow}
        setErrorModalShow={setErrorModalShow}
        hash={investTxHash}
      />
    </div>
  );
};

export default Claim;

const SuccessModal = ({ successModalShow, onClose, PTT, hash }) => {
  let as = 0;
  return (
    <div>
      {/* it is a Succes Modal
      sds
      dfs
      */}
      <Modal showModal={successModalShow} onClose={() => onClose()}>
        <div className={mainStyle.modalContainer}>
          <label className="txt_Heading1"> Success</label>
          <br />

          <div className={mainStyle.SuccessArea}>
            <label
              className="txt_Title3"
              style={{
                color: "var(--primary-Neutrals-strong-color)",
                textAlign: "center",
              }}
            >
              You successfully claimed
            </label>
            <br />
            <label
              className="txt_Heading2"
              style={{
                textAlign: "center",
              }}
            >
              {PTT} PTT
            </label>
          </div>
          <br />

          <div className={mainStyle.actionArea}>
            <Link
              href={`https://mumbai.polygonscan.com/tx/${hash}`}
              target="_blank"
              style={{
                textDecoration: "none",
                cursor: "pointer",
                width: "max-content",
              }}
            >
              <label
                className="txt_Title3"
                style={{
                  color: "var(--primary-Neutrals-strong-color)",
                  textAlign: "center",
                }}
              >
                <LinkIcon /> View on Explorer
              </label>
            </Link>
            <br />
            <div className={mainStyle.btnCon}>
              <Button
                text={"Dismiss"}
                Custom_width={"221px"}
                Custom_maxWidth={"221px"}
                Custom_minWidth={"221px"}
                Cus
                onClick={() => onClose()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const ErrorModal = ({ errorModalShow, setErrorModalShow, hash = null }) => {
  return (
    <div>
      <Modal
        showModal={errorModalShow}
        onClose={() => setErrorModalShow(false)}
      >
        <div className={mainStyle.modalContainer}>
          <label className="txt_Heading1"> Error</label>
          <br />

          <div className={mainStyle.SuccessArea}>
            <label
              className="txt_Title3"
              style={{
                color: "var(--primary-Neutrals-strong-color)",
                textAlign: "center",
              }}
            >
              Your claim was unsuccessful. Please try again in a few minutes.
              <br /> If the problem continues, please contact our support team
              <br />
              for help. Our apologies for any inconvenience you've experienced.
            </label>
            <br />
          </div>
          <br />

          <div className={mainStyle.actionArea}>
            {hash != null && (
              <Link
                href={`https://mumbai.polygonscan.com/tx/${hash}`}
                target="_blank"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "max-content",
                }}
              >
                <label
                  className="txt_Title3"
                  style={{
                    color: "var(--primary-Neutrals-strong-color)",
                    textAlign: "center",
                  }}
                >
                  <LinkIcon /> View on Explorer
                </label>
              </Link>
            )}
            <br />
            <div className={mainStyle.btnCon}>
              <Button
                text={"Dismiss"}
                Custom_width={"221px"}
                Custom_maxWidth={"221px"}
                Custom_minWidth={"221px"}
                Cus
                onClick={() => onClose()}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const LinkIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.0939 3.95276C2.0939 6.95039 2.0939 9.92468 2.0939 12.9136C2.1547 12.9136 2.20789 12.9136 2.26082 12.9136C5.12872 12.9136 7.99635 12.9136 10.8643 12.9136C11.0466 12.9136 11.0466 12.9134 11.0466 12.7307C11.0466 11.2109 11.0477 9.69101 11.0453 8.17116C11.0447 7.84385 11.1707 7.58873 11.4581 7.4305C11.7194 7.28639 11.9903 7.29317 12.246 7.44814C12.5117 7.60935 12.6297 7.85579 12.6292 8.16546C12.6276 9.40495 12.6284 10.6442 12.6284 11.8837C12.6284 12.4761 12.6292 13.0689 12.6281 13.6613C12.627 14.1681 12.2921 14.5 11.7832 14.5C8.30928 14.5 4.83533 14.5 1.36139 14.5C0.828627 14.5 0.499959 14.1708 0.499959 13.6361C0.499688 10.1622 0.499688 6.68822 0.499959 3.21427C0.499959 2.70648 0.83297 2.37211 1.34076 2.37184C3.18168 2.37103 5.02287 2.37048 6.86379 2.37238C7.27958 2.37293 7.6153 2.6674 7.66063 3.06012C7.70758 3.46695 7.46169 3.8328 7.06789 3.92914C6.97724 3.9514 6.8798 3.95221 6.78536 3.95221C5.27908 3.95357 3.7728 3.95303 2.26651 3.95303C2.21305 3.95276 2.15985 3.95276 2.0939 3.95276Z"
        fill="white"
      />
      <path
        d="M11.7498 2.08776C11.6975 2.08776 11.6454 2.08776 11.593 2.08776C10.9734 2.08776 10.354 2.0902 9.73441 2.08721C9.21006 2.0845 8.85317 1.69992 8.90528 1.20081C8.94545 0.816781 9.26977 0.506026 9.6652 0.504126C11.0217 0.498155 12.3784 0.497612 13.7351 0.504668C14.1536 0.506839 14.4943 0.854234 14.4962 1.27355C14.5019 2.62567 14.5019 3.9778 14.4962 5.32992C14.4943 5.75738 14.1477 6.09039 13.7232 6.10071C13.3033 6.11102 12.9435 5.80515 12.9234 5.37878C12.9006 4.89595 12.9144 4.4115 12.9128 3.92759C12.912 3.70233 12.9128 3.47706 12.9128 3.21407C12.8544 3.26944 12.8203 3.30065 12.7877 3.33322C11.5373 4.5833 10.2864 5.8331 9.03745 7.08454C8.82874 7.29379 8.58801 7.39936 8.29055 7.34264C7.99499 7.28646 7.79199 7.11358 7.69048 6.83268C7.58654 6.54526 7.64163 6.27902 7.83867 6.04697C7.92335 5.94736 8.02132 5.85889 8.11414 5.76607C9.29067 4.58927 10.4675 3.41274 11.6448 2.23676C11.6831 2.19849 11.7289 2.16836 11.7713 2.13444C11.7642 2.11897 11.7572 2.1035 11.7498 2.08776Z"
        fill="white"
      />
    </svg>
  );
};
