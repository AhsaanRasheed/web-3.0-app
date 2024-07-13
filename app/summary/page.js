"use client";
import React, { useState, useEffect, useRef } from "react";
import ProfileBar from "../_components/ProfileBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import LineChart from "@/app/components/LineChart";
import { lineChartData, donutChartData, lineValues } from "./chartData";
import style from "./style.module.scss";
import { useSearchParams } from "next/navigation";
import timerStyle from "./components/timer.module.scss";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import {
  get_bln_info,
  get_coin_info,
  get_staking_info_user,
  post_stake_user_amount,
  post_unstake_user_amount,
  post_claim_user,
  get_graph,
} from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";

import { claim_virtuals } from "@/app/services/new_service";
import Countdown from "./components/Timer";
import { get_reward_time } from "../services/service";
export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const router = useRouter();
  const [ActivePage, setActivePage] = useState("portfolio");
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [referralCode, setReferralCode] = useState("");
  const [stakingPoolData, setStakingPoolData] = useState({
    balance: 0,
    claimed: 0,
    pending: 0,
    soontoUnlock: [],
  });
  const [portfolioOverviewData, setPortfolioOverviewData] = useState({
    balance: 0,
  });
  const { userBlnGlobal } = useNotification();

  const [topRanker, setTopRanker] = useState({
    xp: [],
    whales: [],
    affiliates: [],
    ranking: {
      whales: 0,
      affiliate: 0,
      xp: 0,
    },
  });
  const [menuData, setMenuData] = useState({
    ranking: {
      whales: 0,
      affiliate: 0,
      xp: 0,
      quizMaster: 0,
    },
    stake: {
      TotalBalanceStaked: 0,
      AvailablePttToStake: 0,
      PendingRewards: 0,
    },
    TotalPortfolioValue: 0,
  });
  const { toggleLoader } = useLoader();

  const [isMobileView, setIsMobileView] = useState(false);
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [isMobileViewMenu, setIsMobileViewMenu] = useState(false);
  const [coinInfo, setCoinInfo] = useState({
    total_supply: "",
    symbol: "",
    name: "",
    decimals: "",
    network: "",
    explorer_uri: "",
    address: "",
  });
  const [userBln, setUserBln] = useState({
    salt: "",
    factory: "",
    owner: "",
    address: "",
    balance: 0,
    coin: "",
    network: "",
    explorer_uri: "",
  });
  useEffect(() => {
    let temp = userBln;
    temp.balance = userBlnGlobal;
    setUserBln(temp);
  }, [userBlnGlobal]);
  const [isCopiedWalletAddress, setIsCopiedWalletAddress] = useState(false);
  const handleClickCopyWalletAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(userBln?.address)
        .then(() => {
          setIsCopiedWalletAddress(true);
          setTimeout(() => {
            setIsCopiedWalletAddress(false);
          }, 1500); // Reset copied state after 1.5 seconds
        })
        .catch((error) => console.error("Failed to copy:", error));
    } else {
      const textField = document.createElement("textarea");
      textField.innerText = userBln?.address;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setIsCopiedWalletAddress(true);
      setTimeout(() => {
        setIsCopiedWalletAddress(false);
      }, 1500); // Reset copied state after 1.5 seconds
    }
  };
  const get_starting_info = async () => {
    toggleLoader(true);
    try {
      let coin = await get_coin_info();
      let bln = await get_bln_info(coin.address);
      let graph = await get_graph();
      let days = [];
      let vals = [];
      let LblToShow = [];

      const offsetMinutes = new Date().getTimezoneOffset();
      for (let i = 0; i < graph.data.length; i++) {
        const timestamp = new Date(graph.data[i].ClaimedAt);
        // timestamp.setMinutes(timestamp.getMinutes() - offsetMinutes);
        LblToShow.push(
          // timestamp.getHours() + ":" + timestamp.getMinutes()
          timestamp.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        );
        vals.push(graph.data[i].Amount);
      }

      const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      // graph.data.map((item) => {
      //   let date = new Date(item.label);
      //   days.push(weekday[date.getDay()]);
      //   vals.push(item.y);
      // });
      LblToShow.reverse();
      vals.reverse();
      setGraphData({ labels: LblToShow, datasets: vals });
      setCoinInfo(coin);
      setUserBln(bln);
      // if (va.code == 200) setStakingData(va.data);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };

  const [time, setTime] = useState(null);
  const [token, setToken] = useState(0);
  const tempTokenRef = useRef(0);
  const intervalId = useRef(null);
  const get_reward_time_func = async (useCurrentTime = false) => {
    try {
      if (!isVisible) {
        if (!useCurrentTime) {
          let reward = await get_reward_time();
          setTime(reward.lastClaimTime);
          let lastTimeStamp = new Date(Number(reward.lastClaimTime) * 1000);

          let gap = Date.now() - lastTimeStamp;
          if (gap > 21600000) {
            gap = 21600000;
          }
          tempTokenRef.current = (gap * 1000) / 21600000;
        } else {
          setToken(0);
          tempTokenRef.current = 0;
          const currentDate = new Date();
          const timestamp0 = Math.floor(currentDate.getTime() / 1000);
          setTime(timestamp0);
        }
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
        intervalId.current = setInterval(() => {
          tempTokenRef.current += 0.0462962963;
          if (tempTokenRef.current > 1000) {
            tempTokenRef.current = 1000;
          }
          setToken(tempTokenRef.current);
        }, 1000);
      }
      // if (va.code == 200) setStakingData(va.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    // get_staking_data();
    get_starting_info();
    get_reward_time_func();
  }, []);
  useEffect(() => {
    console.log(search);
    if (search != null) {
      setActivePage(search);
    }
    if (isVisible) {
      router.push("/auth/signin");
    }
    // getValue();
    function handleResize() {
      if (window.innerWidth <= 850) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
      if (window.innerWidth <= 1150) {
        setIsMobileViewMenu(true);
      } else {
        setIsMobileViewMenu(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="pageContainer">
      <ProfileBar
        title="Summary"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      <div className={style.stackingWrapper}>
        <div className={style.topCard}>
          <div className={style.coinCard}>
            <img src="/summary/coin.png" className={style.coin} />
            <div className={style.col}>
              <div className={style.item}>
                <label className={style.title}>Total Balance</label>
                <label className={style.value}>
                  <label className={style.coinlbl}>
                    {" "}
                    <span className={style.highlight}>PTV</span>{" "}
                  </label>{" "}
                  {userBln.balance === -1 ? 0 : Number(Number(userBln?.balance).toFixed(2)).toLocaleString()}
                </label>
              </div>
              <div className={style.item}>
                <label className={style.title}>Wallet Address</label>
                <label
                  // onClick={() =>
                  //   window.open(
                  //     userBln.explorer_uri +
                  //       "/address/" +
                  //       userBln.address +
                  //       "/token-transfer",
                  //     "_blank"
                  //   )
                  // }
                  className={style.valueWallet + " " + style["total-supply"]}
                >
                  <div
                    className={style.alert0}
                    style={{
                      display: isCopiedWalletAddress ? "block" : "none",
                    }}
                  >
                    <label>Copied</label>
                  </div>
                  <a
                    href={
                      userBln?.explorer_uri +
                      "/address/" +
                      userBln?.address +
                      "/token-transfer"
                    }
                    target="_blank"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    {truncateCenter(userBln?.address, isMobileView)}{" "}
                  </a>
                  <svg
                    onClick={handleClickCopyWalletAddress}
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5714 15H10.956C10.0213 15 9.26367 14.1046 9.26367 13V4C9.26367 2.89543 10.0213 2 10.956 2H18.5714C19.506 2 20.2637 2.89543 20.2637 4V13C20.2637 14.1046 19.506 15 18.5714 15Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.80213 8H5.95598C5.50715 8 5.07671 8.21071 4.75934 8.58579C4.44197 8.96086 4.26367 9.46957 4.26367 10V19C4.26367 19.5304 4.44197 20.0391 4.75934 20.4142C5.07671 20.7893 5.50715 21 5.95598 21H13.5714C14.0202 21 14.4506 20.7893 14.768 20.4142C15.0854 20.0391 15.2637 19.5304 15.2637 19V18"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
            </div>
          </div>
          <div className={style.detailCol}>
            <div className={style.row}>
              <div className={style.col}>
                <label className={style.title}>Token Name</label>
                <label className={style.value}>PrimeTrader Virtuals</label>
              </div>
              <div className={style.col}>
                <label className={style.title}>Blockchain</label>
                {/* <label className={style.value}>{coinInfo.network}</label> */}
                <label className={style.value}>
                  <img
                    style={{ margin: "-8px 0px -5px -6px", height: 26 }}
                    src="/summary/ MATIC.svg"
                    className={style.coin}
                  />
                  Amoy Testnet
                </label>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.col}>
                <label className={style.title}>Total Supply</label>
                <label
                  className={style.value + " " + style["total-supply"]}
                  onClick={() => window.open(coinInfo.explorer_uri, "_blank")}
                >
                  {Number(coinInfo.total_supply).toLocaleString()}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={style.timerWrapper}>
          <div className={style.timerBg}>
            <span className={style.countDownHide}>
              {/* {time &&  */}
              {token === 1000 ? (
                <ClaimTokenCountDownTimer
                  time={time}
                  token={token}
                  refresh={() => {
                    get_reward_time_func(true);
                  }}
                />
              ) : (
                <TimerBar
                  time={time}
                  token={token}
                  refresh={() => {
                    get_reward_time_func(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>
        {graphData.labels.length ? (
          <div className={style.container}>
            <div className={style.title}>
              <label>Analytics</label>
            </div>
            <div className={style.subtitle}>
              <label>
                {/* Minimum investment amount is{" "}
              <label className={style.coinlbl}>
                {" "}
                <span className={style.highlight}>PTV</span>
              </label>{" "}
              50. */}
              </label>
            </div>
            <div
              style={{
                height: "250px",
                marginTop: "24px",
              }}
            >
              <LineChart
                chartData={{
                  labels: graphData.labels,
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: graphData.datasets,
                    },
                  ],
                }}
                minimum={Math.floor(graphData.datasets[0] / 500) * 500}
              // maximum={lineValues.maxChartDataValue}
              // stepSize={1}
              // yTickLimit={6}
              // showYTicks={true}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
const formatUnlocksDate = (x, currentDate) => {
  let date = new Date(x * 1000);

  // Calculate the difference in milliseconds
  let differenceInMillis = date - currentDate;

  // Calculate the difference in days
  let differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

  // Construct the formatted string
  let formattedDate;

  if (differenceInDays === 0) {
    formattedDate = "today";
  } else if (differenceInDays === 1) {
    formattedDate = "tomorrow";
  } else if (differenceInDays > 1) {
    formattedDate = `in ${differenceInDays} days`;
  } else {
    formattedDate = `in ${differenceInDays} days ago`;
  }

  return formattedDate;
};
function truncateCenter(str, isMobileView) {
  if (str == null) {
    return "";
  }
  // console.log(str, "str");
  if (isMobileView) {
    if (str.length <= 8) {
      return str; // If the string is 10 characters or less, return it as is
    } else {
      const start = str.substring(0, 5); // Extract first five characters
      const end = str.substring(str.length - 3); // Extract last five characters
      return start + "..." + end; // Concatenate the parts with "..."
    }
  }
  if (str.length <= 16) {
    return str; // If the string is 10 characters or less, return it as is
  } else {
    const start = str.substring(0, 8); // Extract first five characters
    const end = str.substring(str.length - 8); // Extract last five characters
    return start + "..." + end; // Concatenate the parts with "..."
  }
}

const TimerBar = ({ time, token, refresh }) => {
  const { toggleLoader } = useLoader();
  // rewardAmount = (gap * reward.amount) / reward.duration;
  let timeTillDate = new Date(Number(time) * 1000);
  // console.log(time, token, 'timer time, token')
  return (
    <div className={timerStyle.headerWrapperCountDown}>
      <div>
        <Countdown timeTillDate={time} timeFormat="MM DD YYYY, h:mm a" />
      </div>
      <div className={timerStyle.tokenTag}>
        {" "}
        <p>PTV</p> <span>{token == 1000 ? token : token.toFixed(2)}</span>{" "}
      </div>
      <div
        style={{ opacity: token > 50 ? "" : "0.4" }}
        className={timerStyle.claimBtn}
        onClick={() => {
          if (token > 50) {
            toggleLoader(true);
            claim_virtuals()
              .then(() => {
                toggleLoader(false);
                refresh();
                // window.location.reload();
              })
              .catch(() => {
                toggleLoader(false);
              });
          }
        }}
      >
        Claim
      </div>
    </div>
  );
};

const ClaimTokenCountDownTimer = ({ time, token, refresh }) => {
  const { toggleLoader } = useLoader();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      console.log("-- animate");
      setTimeout(() => setIsAnimating(false), 500);
    }, 4370);

    // Clean up functions
    return () => {
      clearInterval(interval);
    };
  }, []);

  // rewardAmount = (gap * reward.amount) / reward.duration;
  // let tokenAvailableForClaim = token === 1000 ? true : false;
  return (
    <div className={`${timerStyle.claimTokenWrapperCountDown}`}>
      <div>
        <div className={timerStyle.completeClaim}>
          <img src="/icons/gift-box-animated.gif" alt="claimgift" />
          Claim Reward
        </div>
      </div>
      <div className={timerStyle.tokenTag}>
        {" "}
        <p>PTV</p> <span>{token == 1000 ? token : token.toFixed(2)}</span>{" "}
      </div>
      <div
        style={{ opacity: token > 50 ? "" : "0.4" }}
        className={`${timerStyle.claimBtn} ${isAnimating ? timerStyle.animated : ""
          }`}
        onClick={() => {
          if (token > 50) {
            toggleLoader(true);
            claim_virtuals()
              .then(() => {
                toggleLoader(false);
                refresh();
                // window.location.reload();
              })
              .catch(() => {
                toggleLoader(false);
              });
          }
        }}
      >
        Claim
      </div>
    </div>
  );
};
