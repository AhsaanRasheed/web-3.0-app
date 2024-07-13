"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/app/_components/Navbar";
import ProfileBar from "@/app/_components/ProfileBar";
import style from "./style.module.scss";
// import lottie from "lottie-web";
import animationData from "./calculating.json"; // Import your animation JSON file
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { v4 as uuidv4 } from "uuid";
import {
  post_bet_pred_game,
  get_prediction_list,
  post_collect_claim,
  get_bln_info,
  get_coin_info,
  get_prediction_history,
  post_collect_all_history,
} from "../services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import dynamic from "next/dynamic";
import Win_animation from "./Win_animation";
import PredictionHistoryModal from "./_components/PredictionHistoryModal";
import TradingViewChart from "./_components/TradingViewChart";
import { useRouter } from "next/navigation";

const LottieAnimation = dynamic(() => import("./LottieAnimation.js"), {
  ssr: false,
});

export default function Page() {
  const [calculatingLive, setCalculatingLive] = useState(true);
  const [startWinAnimation, setStartWinAnimation] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [predHistory, setPredHistory] = useState([]);

  const [userBln, setUserBln] = useState(0);

  const [fiveCardData, setFiveCardData] = useState([
    {
      epoch: 0,
      end_time: 0,
      start_time: 1716316478,
      end_price: 0,
      start_price: 0,
      prize_pool: 0,
      up_payout: 0,
      down_payout: 0,
      status: "next",
      participated: false,
      claimable_amount: 0,
    },
    {
      epoch: 0,
      end_time: 0,
      start_time: 0,
      end_price: 0,
      start_price: 0,
      prize_pool: 0,
      up_payout: 0,
      down_payout: 0,
      status: "live",
      participated: false,
      claimable_amount: 0,
    },
    {
      epoch: 0,
      end_time: 0,
      start_time: 0,
      end_price: 0,
      start_price: 0,
      prize_pool: 0,
      up_payout: 0,
      down_payout: 0,
      status: "expired",
      participated: false,
      claimable_amount: 0,
    },
    {
      epoch: 0,
      end_time: 0,
      start_time: 0,
      end_price: 0,
      start_price: 0,
      prize_pool: 0,
      up_payout: 0,
      down_payout: 0,
      status: "expired",
      participated: false,
      claimable_amount: 0,
    },
    {
      epoch: 0,
      end_time: 0,
      start_time: 0,
      end_price: 0,
      start_price: 0,
      prize_pool: 0,
      up_payout: 0,
      down_payout: 0,
      status: "expired",
      participated: false,
      claimable_amount: 0,
    },
  ]);

  const [currentLivePrice, setCurrentLivePrice] = useState(0);
  const containerRef = useRef(null);
  const liveCardRef = useRef(null);
  const { toggleLoader } = useLoader();

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const {
    addNotification,
    nextPredictionGame,
    nextPredictionParticipatedGame,
    userBlnGlobal,
  } = useNotification();
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  let socket;
  let isConnected = false;
  const connectWebSocket = () => {
    const random_uuid = uuidv4();
    const wsUrl =
      typeof window !== "undefined" &&
      (window.location.host.includes("local") ||
        window.location.host.includes("sandbox") ||
        window.location.host.includes("white-label-app-prime-trader.s3") ||
        window.location.host.includes("s3-website"))
        ? `wss://devwebsocket.primetrader.com/ws?id=${random_uuid}`
        : `wss://websocket.primetrader.com/ws?id=${random_uuid}`;

    socket = new WebSocket(wsUrl);
    socket.onopen = () => {
      isConnected = true;
      console.log("socket Socket Open");
    };

    socket.onerror = (error) => {
      console.error("socket WebSocket error:", error);
      isConnected = false;
      attemptReconnect();
    };

    socket.onclose = () => {
      console.log("socket onclose");

      isConnected = false;
    };

    socket.onmessage = (event) => {
      // console.log("socket event.data", event.data);
      setCurrentLivePrice(event.data);
    };
  };
  const attemptReconnect = async () => {
    const messageTimer = setTimeout(() => {
      if (!isConnected) {
        connectWebSocket();
      }
    }, 2000);
  };
  useEffect(() => {
    setUserBln(userBlnGlobal);
  }, [userBlnGlobal]);
  const getValue = async (toShowWin = false, hideLoader = false) => {
    if (!hideLoader) toggleLoader(true);
    try {
      if (!hideLoader) setCalculatingLive(true);
      console.log("delay before");
      await delay(3000);
      console.log("delay after");
      let coin = await get_coin_info();
      let bln = await get_bln_info(coin.address);
      setUserBln(bln?.balance);
      let va = await get_prediction_list();
      let history = await get_prediction_history();
      if (history.message == "successfully fetched history") {
        setPredHistory(history.data.predictionBets);
      }
      console.log("history", history);
      console.log(va);
      if (va.message == "successfully fetched prediction games") {
        setFiveCardData(va.data);
        const now = Date.now();
        const timeDifferenceMs = va.data[0].start_time * 1000 - now;
        const remainingMinutes =
          300 -
          (Math.floor(timeDifferenceMs / (1000 * 60)) * 60 +
            Math.floor((timeDifferenceMs % (1000 * 60)) / 1000));
        setMinutes(Math.floor(remainingMinutes / 60));
        setSeconds(remainingMinutes % 60);
        setCalculatingLive(false);
        if (toShowWin) {
          if (containerRef.current) {
            const containerNode = containerRef.current;
            containerNode.scrollTo({
              left: containerNode.scrollLeft - 80,
              behavior: "smooth", // Optional: for smooth scrolling
            });
          }
        }
        if (va.data[2].participated && toShowWin) {
          if (
            va.data[2].user_bet_type == 1 &&
            Number(va.data[2].start_price) < Number(va.data[2].end_price)
          ) {
            setStartWinAnimation(true);
          }
          if (
            va.data[2].user_bet_type == 2 &&
            Number(va.data[2].start_price) > Number(va.data[2].end_price)
          ) {
            setStartWinAnimation(true);
          }
          if (Number(va.data[2].start_price) == Number(va.data[2].end_price)) {
            setStartWinAnimation(true);
          }
        }

        startTimer();
      } else {
        handleAddNotification("fail", "Failed to Fetch Information.");
      }
      // va.username = secureLocalStorage.getItem("username");
    } catch (e) {
      console.log("error here", e);
    } finally {
      if (!hideLoader) toggleLoader(false);
    }
  };
  const TimeisComplete = async () => {
    pauseTimer();
    // setCalculatingLive(true);

    await getValue(true);
  };
  useEffect(() => {
    if (minutes == 5) {
      TimeisComplete();
    }
  }, [minutes]);
  const timerRef = useRef(null);
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          } else {
            return prevSeconds + 1;
          }
        });
      }, 1000);
    }
  };
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    getValue();
    connectWebSocket();
    // let aginhit = setInterval(() => {
    //   getValue(false, true);
    // }, 45000);
    if (containerRef.current && liveCardRef.current) {
      const containerNode = containerRef.current;
      const liveCardNode = liveCardRef.current;
      const containerRect = containerNode.getBoundingClientRect();
      const liveCardRect = liveCardNode.getBoundingClientRect();
      const scrollLeft =
        liveCardRect.left -
        containerRect.left -
        (containerRect.width - liveCardRect.width) / 2;
      containerRef.current.scrollTo(scrollLeft + 100, 0);
    }
    return () => {
      clearInterval(timerRef.current);
      // clearInterval(aginhit);
      socket.close();
    };
  }, []);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStartX, setScrollStartX] = useState(0);
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setScrollStartX(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dragDistance = e.clientX - dragStartX;
    containerRef.current.scrollLeft = scrollStartX - dragDistance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMoveLeft = () => {
    // if (containerRef.current) {
    //   containerRef.current.scrollLeft -= 350;
    // }
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft - 350,
        behavior: "smooth",
      });
    }
  };

  const handleMoveRight = () => {
    // if (containerRef.current) {
    //   containerRef.current.scrollLeft += 350;
    // }
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.scrollLeft + 350,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    let temp = fiveCardData;
    if (temp[0].epoch == Number(nextPredictionGame.epoch)) {
      temp[0].prize_pool = Number(nextPredictionGame.prizePool);
      temp[0].up_payout = Number(nextPredictionGame.bullPayout);
      temp[0].down_payout = Number(nextPredictionGame.bearPayout);
      setFiveCardData(fiveCardData);
    }
  }, [nextPredictionGame]);
  useEffect(() => {
    let temp = fiveCardData;
    if (temp[0].epoch == Number(nextPredictionParticipatedGame.epoch)) {
      temp[0].user_bet_type =
        nextPredictionParticipatedGame.participated == "up" ? 1 : 2;
      temp[0].user_amount = Number(nextPredictionParticipatedGame.amount);
      temp[0].participated =
        nextPredictionParticipatedGame.participated != null;
      setFiveCardData(fiveCardData);
    }
  }, [nextPredictionParticipatedGame]);
  const onCollectAll = async () => {
    toggleLoader(true);
    try {
      let history = await post_collect_all_history();
      console.log("history", history);

      // handleAddNotification("fail", "Failed to Fetch Information.");
    } catch (e) {
      console.log("error here", e);
    }
    toggleLoader(false);
  };
  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="Prediction Game"
          id="0x85cEa...2b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl="/profile/dario-hanke.svg"
          hideOnMob={true}
        />
        <div className={style.gameCon}>
          <TopRowBar
            onMoveLeft={() => handleMoveLeft()}
            onMoveRight={handleMoveRight}
            time={
              minutes.toString().padStart(2, "0") +
              ":" +
              seconds.toString().padStart(2, "0")
            }
            userBln={userBln}
            onHistory={() => setShowHistoryModal(true)}
          />

          <div className={style.cardCon}>
            <div
              className={style.cardScrollCon}
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <ExpireCard
                Greentype={false}
                cardData={fiveCardData[4]}
                toggleLoader={toggleLoader}
                handleAddNotification={handleAddNotification}
                getValue={getValue}
              />
              <ExpireCard
                Greentype={false}
                cardData={fiveCardData[3]}
                toggleLoader={toggleLoader}
                handleAddNotification={handleAddNotification}
                getValue={getValue}
              />
              <ExpireCard
                Greentype={false}
                cardData={fiveCardData[2]}
                toggleLoader={toggleLoader}
                handleAddNotification={handleAddNotification}
                getValue={getValue}
              />

              <div ref={liveCardRef}>
                <div
                  className={`${style.card} ${style.cardCurrent} ${
                    Number(currentLivePrice) >= fiveCardData[1].start_price
                      ? style.greenCard
                      : style.redCard
                  }`}
                >
                  <div className={style.titleBar}>
                    <div className={style.left}>
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          minWidth: "21px",
                          minHeight: "21px",
                        }}
                      >
                        <path
                          d="M10.4974 18.8346C15.0998 18.8346 18.8307 15.1037 18.8307 10.5013C18.8307 5.89893 15.0998 2.16797 10.4974 2.16797C5.89502 2.16797 2.16406 5.89893 2.16406 10.5013C2.16406 15.1037 5.89502 18.8346 10.4974 18.8346Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M8.83594 7.16797L13.8359 10.5013L8.83594 13.8346V7.16797Z"
                          fill="#D9D9D9"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      <label>Live</label>
                    </div>
                    <div className={style.right}>
                      <label>#{fiveCardData[1].epoch}</label>
                    </div>
                  </div>
                  <div className={style.loadingBar}>
                    <div
                      className={style.bar}
                      style={{
                        width: ((minutes * 60 + seconds) / 300) * 100 + "%",
                      }}
                    />
                  </div>
                  {calculatingLive ? (
                    <div className={style.calculatingDiv}>
                      {" "}
                      <LottieAnimation />
                      <label>Calculating...</label>
                    </div>
                  ) : (
                    <div className={style.BoxCon}>
                      <div className={style.topBox}>
                        {fiveCardData[1].participated &&
                          fiveCardData[1].user_bet_type == 1 && (
                            <div className={style.enteredIcon}>
                              <EnteredExpiredIcon />
                            </div>
                          )}
                        <label className={style.title_lbl}>Bullish</label>
                        <label className={style.Payout_lbl}>
                          {Number(fiveCardData[1].up_payout).toFixed(2)}x Payout
                        </label>
                      </div>
                      <div className={style.centerBox}>
                        <div className={style.valueCon}>
                          <label className={style.title}>Current Price</label>
                          <div className={style.btmValueRow}>
                            <label className={style.amount}>
                              <label className={style.colorit}>$</label>{" "}
                              {Number(
                                Number(currentLivePrice).toFixed(2)
                              ).toLocaleString()}
                            </label>
                            <div className={style.tagCon}>
                              <svg
                                width="21"
                                height="21"
                                style={{ minWidth: "21px", minHeight: "21px" }}
                                viewBox="0 0 21 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_5298_21809)">
                                  <path
                                    d="M19.6693 5.5L11.7526 13.4167L7.58594 9.25L1.33594 15.5"
                                    stroke={
                                      Number(currentLivePrice) >=
                                      fiveCardData[1].start_price
                                        ? "#5BF4AB"
                                        : "#FF5E5E"
                                    }
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M14.6641 5.5H19.6641V10.5"
                                    stroke={
                                      Number(currentLivePrice) >=
                                      fiveCardData[1].start_price
                                        ? "#5BF4AB"
                                        : "#FF5E5E"
                                    }
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_5298_21809">
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="white"
                                      transform="translate(0.5 0.5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                              <label>
                                {Number(currentLivePrice) >=
                                fiveCardData[1].start_price
                                  ? `+$${Number(
                                      Math.abs(
                                        Number(currentLivePrice) -
                                          Number(fiveCardData[1].start_price)
                                      ).toFixed(2)
                                    ).toLocaleString()}`
                                  : `-$${Number(
                                      Math.abs(
                                        Number(currentLivePrice) -
                                          Number(fiveCardData[1].start_price)
                                      ).toFixed(2)
                                    ).toLocaleString()}`}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className={style.btmRowCon}>
                          <div className={style.row}>
                            <label className={style.key}>Last Price</label>
                            <label className={style.value}>
                              <label className={style.colorit}>$</label>{" "}
                              {Number(
                                Number(fiveCardData[1].start_price).toFixed(2)
                              ).toLocaleString()}
                            </label>
                          </div>
                          <div className={style.row}>
                            <label className={style.key}>Prize Pool</label>
                            <label className={style.value}>
                              <label className={style.ptv}>PTV</label>{" "}
                              {fiveCardData[1].prize_pool}
                            </label>
                          </div>
                          {fiveCardData[1].participated && (
                            <div className={style.row}>
                              <label className={style.key}>
                                Committed amount:
                              </label>
                              <label className={style.value}>
                                <label className={style.ptv}>PTV</label>{" "}
                                {fiveCardData[1].user_amount}
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={style.btmBox}>
                        {fiveCardData[1].participated &&
                          fiveCardData[1].user_bet_type == 2 && (
                            <div className={style.enteredIcon}>
                              <EnteredExpiredIcon />
                            </div>
                          )}
                        <label className={style.title_lbl}>Bearish</label>
                        <label className={style.Payout_lbl}>
                          {Number(fiveCardData[1].down_payout).toFixed(2)}x
                          Payout
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <NextCard
                toggleLoader={toggleLoader}
                handleAddNotification={handleAddNotification}
                cardData={fiveCardData[0]}
                getValue={getValue}
                nextPredictionParticipatedGame={nextPredictionParticipatedGame}
                nextPredictionGame={nextPredictionGame}
              />
              <LaterCard
                time={300 - (minutes * 60 + seconds)}
                epoch={fiveCardData[0].epoch + 1}
              />
              <LaterCard
                time={600 - (minutes * 60 + seconds)}
                epoch={fiveCardData[0].epoch + 2}
              />
            </div>
          </div>
          <BtmRowBar
            onMoveLeft={() => handleMoveLeft()}
            onMoveRight={handleMoveRight}
          />
        </div>
        {startWinAnimation && (
          <Win_animation
            onComplete={() => {
              setStartWinAnimation(false);
            }}
          />
        )}
      </div>
      {showHistoryModal && (
        <PredictionHistoryModal
          onClose={() => setShowHistoryModal(false)}
          IsOpen={showHistoryModal}
          predHistory={predHistory}
          onCollectAll={onCollectAll}
        />
      )}
      <TradingViewChart />
    </>
  );
}

const TopRowBar = ({ onMoveLeft, onMoveRight, time, userBln, onHistory }) => {
  const router = useRouter();
  return (
    <div className={style.topBar}>
      {/* <svg
        width="247"
        height="52"
        viewBox="0 0 247 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 17V19.2H6.56V31H4.26V19.2H0.3V17H10.5ZM14.9839 31.26C13.5172 31.26 12.2706 30.7533 11.2439 29.74C10.2172 28.7267 9.70391 27.48 9.70391 26C9.70391 24.52 10.2172 23.2733 11.2439 22.26C12.2706 21.2467 13.5172 20.74 14.9839 20.74C16.4639 20.74 17.7106 21.2467 18.7239 22.26C19.7506 23.2733 20.2639 24.52 20.2639 26C20.2639 27.48 19.7506 28.7267 18.7239 29.74C17.7106 30.7533 16.4639 31.26 14.9839 31.26ZM12.7639 28.26C13.3639 28.86 14.1039 29.16 14.9839 29.16C15.8639 29.16 16.6039 28.86 17.2039 28.26C17.8039 27.66 18.1039 26.9067 18.1039 26C18.1039 25.0933 17.8039 24.34 17.2039 23.74C16.6039 23.14 15.8639 22.84 14.9839 22.84C14.1039 22.84 13.3639 23.14 12.7639 23.74C12.1639 24.34 11.8639 25.0933 11.8639 26C11.8639 26.9067 12.1639 27.66 12.7639 28.26ZM31.057 31H28.477L24.377 26.38V31H22.217V17H24.377V25.42L28.257 21H30.897L26.497 25.9L31.057 31ZM33.4092 26.92C33.5692 27.68 33.9359 28.2667 34.5092 28.68C35.0826 29.08 35.7826 29.28 36.6092 29.28C37.7559 29.28 38.6159 28.8667 39.1892 28.04L40.9692 29.08C39.9826 30.5333 38.5226 31.26 36.5892 31.26C34.9626 31.26 33.6492 30.7667 32.6492 29.78C31.6492 28.78 31.1492 27.52 31.1492 26C31.1492 24.5067 31.6426 23.26 32.6292 22.26C33.6159 21.2467 34.8826 20.74 36.4292 20.74C37.8959 20.74 39.0959 21.2533 40.0292 22.28C40.9759 23.3067 41.4492 24.5533 41.4492 26.02C41.4492 26.2467 41.4226 26.5467 41.3692 26.92H33.4092ZM33.3892 25.16H39.2692C39.1226 24.3467 38.7826 23.7333 38.2492 23.32C37.7292 22.9067 37.1159 22.7 36.4092 22.7C35.6092 22.7 34.9426 22.92 34.4092 23.36C33.8759 23.8 33.5359 24.4 33.3892 25.16ZM48.6098 20.74C49.7565 20.74 50.6832 21.1067 51.3898 21.84C52.0965 22.5733 52.4498 23.58 52.4498 24.86V31H50.2898V25.08C50.2898 24.3333 50.0898 23.76 49.6898 23.36C49.2898 22.96 48.7432 22.76 48.0498 22.76C47.2898 22.76 46.6765 23 46.2098 23.48C45.7432 23.9467 45.5098 24.6667 45.5098 25.64V31H43.3498V21H45.5098V22.28C46.1632 21.2533 47.1965 20.74 48.6098 20.74Z"
          fill="white"
        />
        <rect
          x="70"
          y="1"
          width="174"
          height="50"
          rx="12"
          fill="white"
          fill-opacity="0.05"
        />
        <rect
          x="69.5"
          y="0.5"
          width="175"
          height="51"
          rx="12.5"
          stroke="#6F6F6F"
          stroke-opacity="0.25"
        />
        <path
          d="M92.748 24.918C93.1773 25.142 93.5133 25.45 93.756 25.842C93.9987 26.234 94.12 26.6867 94.12 27.2C94.12 28.0027 93.8353 28.67 93.266 29.202C92.6967 29.734 92.0013 30 91.18 30H86.98V20.2H90.872C91.6747 20.2 92.3513 20.4613 92.902 20.984C93.462 21.4973 93.742 22.1413 93.742 22.916C93.742 23.7653 93.4107 24.4327 92.748 24.918ZM90.872 21.712H88.59V24.288H90.872C91.2267 24.288 91.5253 24.1667 91.768 23.924C92.0107 23.672 92.132 23.364 92.132 23C92.132 22.636 92.0107 22.3327 91.768 22.09C91.5253 21.838 91.2267 21.712 90.872 21.712ZM91.18 28.488C91.5533 28.488 91.866 28.3573 92.118 28.096C92.3793 27.8253 92.51 27.4987 92.51 27.116C92.51 26.7333 92.3793 26.4113 92.118 26.15C91.866 25.8793 91.5533 25.744 91.18 25.744H88.59V28.488H91.18ZM101.621 20.2V21.74H98.8635V30H97.2535V21.74H94.4815V20.2H101.621ZM106.885 30.182C105.411 30.182 104.188 29.6967 103.217 28.726C102.247 27.746 101.761 26.5373 101.761 25.1C101.761 23.6627 102.247 22.4587 103.217 21.488C104.188 20.508 105.411 20.018 106.885 20.018C107.772 20.018 108.589 20.228 109.335 20.648C110.091 21.068 110.679 21.6373 111.099 22.356L109.699 23.168C109.438 22.6827 109.055 22.3 108.551 22.02C108.057 21.7307 107.501 21.586 106.885 21.586C105.84 21.586 104.991 21.9173 104.337 22.58C103.693 23.2427 103.371 24.0827 103.371 25.1C103.371 26.1173 103.693 26.9573 104.337 27.62C104.991 28.2827 105.84 28.614 106.885 28.614C107.501 28.614 108.061 28.474 108.565 28.194C109.069 27.9047 109.447 27.5173 109.699 27.032L111.099 27.83C110.689 28.5487 110.105 29.1227 109.349 29.552C108.603 29.972 107.781 30.182 106.885 30.182ZM116.005 26.472V25.016H121.185V26.472H116.005ZM128.252 28.46H132.592V30H126.642V20.2H132.522V21.74H128.252V24.288H132.172V25.814H128.252V28.46ZM140.352 29.258C139.661 29.874 138.77 30.182 137.678 30.182C136.586 30.182 135.695 29.874 135.004 29.258C134.313 28.6327 133.968 27.7973 133.968 26.752V20.2H135.578V26.654C135.578 27.2513 135.751 27.7273 136.096 28.082C136.451 28.4367 136.978 28.614 137.678 28.614C138.378 28.614 138.901 28.4367 139.246 28.082C139.601 27.7273 139.778 27.2513 139.778 26.654V20.2H141.388V26.752C141.388 27.7973 141.043 28.6327 140.352 29.258ZM148.826 30L146.754 26.43H144.85V30H143.24V20.2H147.16C148.037 20.2 148.779 20.508 149.386 21.124C150.002 21.7307 150.31 22.4727 150.31 23.35C150.31 23.9753 150.128 24.5493 149.764 25.072C149.409 25.5853 148.942 25.9587 148.364 26.192L150.59 30H148.826ZM144.85 21.712V24.988H147.16C147.589 24.988 147.953 24.8293 148.252 24.512C148.55 24.1947 148.7 23.8073 148.7 23.35C148.7 22.8927 148.55 22.5053 148.252 22.188C147.953 21.8707 147.589 21.712 147.16 21.712H144.85Z"
          fill="white"
        />
        <path
          d="M216 28.6617C215.879 28.6617 215.767 28.6425 215.663 28.604C215.559 28.5656 215.461 28.4996 215.367 28.406L210.873 23.9117C210.734 23.7733 210.663 23.5993 210.66 23.3896C210.657 23.18 210.728 23.0028 210.873 22.8579C211.018 22.7131 211.193 22.6406 211.4 22.6406C211.606 22.6406 211.782 22.7131 211.927 22.8579L216 26.931L220.073 22.8579C220.211 22.7195 220.385 22.6486 220.595 22.6454C220.804 22.6422 220.982 22.7131 221.127 22.8579C221.271 23.0028 221.344 23.1784 221.344 23.3848C221.344 23.5912 221.271 23.7669 221.127 23.9117L216.632 28.406C216.539 28.4996 216.44 28.5656 216.336 28.604C216.232 28.6425 216.12 28.6617 216 28.6617Z"
          fill="white"
        />
      </svg>
       */}

      <div className={style.gameDropDown}>
        <label>Token</label>
        <div className={style.downDown}>
          <div className={style.value}>
            <img src="/icons/bitcoinicon.png" />
            <label>BTC - USD</label>
          </div>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9997 15.1617C11.8791 15.1617 11.767 15.1425 11.6631 15.104C11.5593 15.0656 11.4606 14.9996 11.367 14.906L6.87276 10.4117C6.73429 10.2733 6.66346 10.0993 6.66026 9.88965C6.65704 9.68003 6.72788 9.50279 6.87276 9.35792C7.01763 9.21306 7.19326 9.14062 7.39966 9.14062C7.60606 9.14062 7.78169 9.21306 7.92656 9.35792L11.9997 13.431L16.0728 9.35792C16.2112 9.21947 16.3852 9.14864 16.5949 9.14542C16.8045 9.14222 16.9817 9.21306 17.1266 9.35792C17.2714 9.50279 17.3439 9.67843 17.3439 9.88485C17.3439 10.0912 17.2714 10.2669 17.1266 10.4117L12.6323 14.906C12.5388 14.9996 12.44 15.0656 12.3362 15.104C12.2324 15.1425 12.1202 15.1617 11.9997 15.1617Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      {/* {
      <div className={style.moveArrowsCon}>
        <div className={style.left} onClick={onMoveLeft}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7559 14.9094C13.0814 15.2349 13.0814 15.7625 12.7559 16.088C12.4305 16.4134 11.9028 16.4134 11.5774 16.088L6.57741 11.088C6.25197 10.7625 6.25197 10.2349 6.57741 9.90944L11.5774 4.90944C11.9028 4.58401 12.4305 4.58401 12.7559 4.90944C13.0814 5.23488 13.0814 5.76252 12.7559 6.08795L8.34518 10.4987L12.7559 14.9094Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={style.right} onClick={onMoveRight}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.24408 14.9094C7.91864 15.2349 7.91864 15.7625 8.24408 16.088C8.56951 16.4134 9.09715 16.4134 9.42259 16.088L14.4226 11.088C14.748 10.7625 14.748 10.2349 14.4226 9.90944L9.42259 4.90944C9.09715 4.58401 8.56951 4.58401 8.24408 4.90944C7.91864 5.23488 7.91864 5.76252 8.24408 6.08795L12.6548 10.4987L8.24408 14.9094Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      } */}

      <div className={style.blnCard}>
        <label className={style.outerTxt}>
          Total Balance:
          <label className={style.innerTxt}>
            <span>PTV</span>{" "}
            {userBln === -1
              ? 0
              : Number(Number(userBln).toFixed(2)).toLocaleString()}
          </label>
        </label>
      </div>
      <div className={style.RightSideCon}>
        <div className={`${style.iconCon} ${style.TimeCon}`}>
          <ClockIcon />
          <label className={style.timer}>
            <label style={{ color: "#D376FF" }}>{time}</label> {" / 5m"}
          </label>
        </div>
        {/* <div className={`${style.iconCon}`}>
          <InfoIcon />
        </div> */}
        <div
          className={`${style.iconCon}`}
          onClick={() => {
            router.push("/newRanking");
          }}
        >
          <WinIcon />
        </div>
        <div className={`${style.iconCon}`} onClick={() => onHistory()}>
          <HistoryIcon />
        </div>
      </div>
      <div className={style.blnCard_Mob}>
        <label className={style.outerTxt}>
          Total Balance:
          <label className={style.innerTxt}>
            <span>PTV</span>{" "}
            {Number(Number(userBln).toFixed(2)).toLocaleString()}
          </label>
        </label>
      </div>
    </div>
  );
};
const BtmRowBar = ({ onMoveLeft, onMoveRight }) => {
  return (
    <div className={`${style.topBar} ${style.btmBar}`}>
      <div className={style.moveArrowsCon}>
        <div className={style.left} onClick={onMoveLeft}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7559 14.9094C13.0814 15.2349 13.0814 15.7625 12.7559 16.088C12.4305 16.4134 11.9028 16.4134 11.5774 16.088L6.57741 11.088C6.25197 10.7625 6.25197 10.2349 6.57741 9.90944L11.5774 4.90944C11.9028 4.58401 12.4305 4.58401 12.7559 4.90944C13.0814 5.23488 13.0814 5.76252 12.7559 6.08795L8.34518 10.4987L12.7559 14.9094Z"
              fill="white"
            />
          </svg>
        </div>
        <div className={style.right} onClick={onMoveRight}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.24408 14.9094C7.91864 15.2349 7.91864 15.7625 8.24408 16.088C8.56951 16.4134 9.09715 16.4134 9.42259 16.088L14.4226 11.088C14.748 10.7625 14.748 10.2349 14.4226 9.90944L9.42259 4.90944C9.09715 4.58401 8.56951 4.58401 8.24408 4.90944C7.91864 5.23488 7.91864 5.76252 8.24408 6.08795L12.6548 10.4987L8.24408 14.9094Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
const LiveCard = ({ Greentype, calculating, ref, currentPrice }) => {
  return (
    <div
      className={`${style.card} ${Greentype ? style.greenCard : style.redCard}`}
      ref={ref}
    >
      <div className={style.titleBar}>
        <div className={style.left}>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              minWidth: "21px",
              minHeight: "21px",
            }}
          >
            <path
              d="M10.4974 18.8346C15.0998 18.8346 18.8307 15.1037 18.8307 10.5013C18.8307 5.89893 15.0998 2.16797 10.4974 2.16797C5.89502 2.16797 2.16406 5.89893 2.16406 10.5013C2.16406 15.1037 5.89502 18.8346 10.4974 18.8346Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.83594 7.16797L13.8359 10.5013L8.83594 13.8346V7.16797Z"
              fill="#D9D9D9"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <label>Live</label>
        </div>
        <div className={style.right}>
          <label>#225</label>
        </div>
      </div>
      <div className={style.loadingBar}>
        <div className={style.bar} />
      </div>
      {calculating ? (
        <div className={style.calculatingDiv}>
          {" "}
          <LottieAnimation animationData={animationData} />
          <label>Calculating...</label>
        </div>
      ) : (
        <div className={style.BoxCon}>
          <div className={style.topBox}>
            <label className={style.title_lbl}>Bullish</label>
            <label className={style.Payout_lbl}>1.91x Payout</label>
          </div>
          <div className={style.centerBox}>
            <div className={style.valueCon}>
              <label className={style.title}>Current Price</label>
              <div className={style.btmValueRow}>
                <label className={style.amount}>
                  <label className={style.colorit}>$</label>{" "}
                  {Number(Number(currentPrice).toFixed(3)).toLocaleString()}
                </label>
                <div className={style.tagCon}>
                  <svg
                    width="21"
                    height="21"
                    style={{ minWidth: "21px", minHeight: "21px" }}
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_5298_21809)">
                      <path
                        d="M19.6693 5.5L11.7526 13.4167L7.58594 9.25L1.33594 15.5"
                        stroke={Greentype ? "#5BF4AB" : "#FF5E5E"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6641 5.5H19.6641V10.5"
                        stroke={Greentype ? "#5BF4AB" : "#FF5E5E"}
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5298_21809">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <label>+$100</label>
                </div>
              </div>
            </div>
            <div className={style.btmRowCon}>
              <div className={style.row}>
                <label className={style.key}>Last Price</label>
                <label className={style.value}>
                  <label className={style.colorit}>$</label> 5.01
                </label>
              </div>
              <div className={style.row}>
                <label className={style.key}>Prize Pool</label>
                <label className={style.value}>
                  <label className={style.ptv}>PTV</label> 10
                </label>
              </div>
            </div>
          </div>
          <div className={style.btmBox}>
            <label className={style.title_lbl}>Bearish</label>
            <label className={style.Payout_lbl}>1.91x Payout</label>
          </div>
        </div>
      )}
    </div>
  );
};
const NextCard = ({
  toggleLoader,
  handleAddNotification,
  nextPredictionParticipatedGame,
  cardData,
  getValue,
}) => {
  const [BullishSide, setBullishSide] = useState(null);
  const [sideTaken, setSideTaken] = useState(null);
  const [prevEpoch, setPrevEpoch] = useState(null);
  useEffect(() => {
    if (nextPredictionParticipatedGame.failed) {
      setBullishSide(null);
      setSideTaken(null);
    }
  }, [nextPredictionParticipatedGame]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showConfirmationSuccessModal, setShowConfirmationSuccessModal] =
    useState(false);
  useEffect(() => {
    console.log("check sideTaken", sideTaken);
  }, [sideTaken]);
  useEffect(() => {
    console.log("check prevEpoch, cardData", prevEpoch, cardData);
    if (prevEpoch == null) {
      console.log("check in 1");
      setPrevEpoch(cardData);
      if (cardData) {
        if (cardData.participated) {
          if (cardData.user_bet_type == 1) {
            setBullishSide(true);
          } else {
            setBullishSide(false);
          }
          console.log("check in 2");

          setSideTaken(cardData.user_amount);
        } else {
          setBullishSide(null);
          setSideTaken(null);
        }
      }
    } else if (prevEpoch.epoch == cardData.epoch) {
      console.log("check in 2");

      console.log("updated", cardData);
      if (cardData) {
        if (cardData.participated) {
          if (cardData.user_bet_type == 1) {
            setBullishSide(true);
          } else {
            setBullishSide(false);
          }
          setSideTaken(cardData.user_amount);
        }
      }
    } else {
      console.log("check in 3");

      setPrevEpoch(cardData);
      console.log("check in 4");

      if (cardData) {
        if (cardData.participated) {
          if (cardData.user_bet_type == 1) {
            setBullishSide(true);
          } else {
            setBullishSide(false);
          }
          console.log("check in 5");

          setSideTaken(cardData.user_amount);
        } else {
          setBullishSide(null);
          setSideTaken(null);
        }
      }
    }
  }, [cardData]);
  const BetAMount = async () => {
    let e = sideTaken;
    toggleLoader(true);
    try {
      let value = 1;
      if (Number(e) == 100) {
        value = 1;
      } else if (Number(e) == 250) {
        value = 2;
      } else if (Number(e) == 500) {
        value = 3;
      } else if (Number(e) == 1000) {
        value = 4;
      } else if (Number(e) == 2000) {
        value = 5;
      } else if (Number(e) == 5000) {
        value = 6;
      }
      let stake = await post_bet_pred_game(
        cardData.epoch,
        value,
        BullishSide ? "up" : "down"
      );
      console.log(stake);

      // if (stake.tx_hash.includes("0x")) {
      // await getValue();
      setShowConfirmationSuccessModal(true);
      setShowConfirmationModal(false);
      // } else {
      //   setBullishSide(null);
      //   setSideTaken(null);
      //   handleAddNotification("fail", "Fail to Bet");
      // }
    } catch (error) {
      console.log(error);
      setBullishSide(null);
      setSideTaken(null);
      setShowConfirmationModal(false);
      setShowConfirmationSuccessModal(false);
      handleAddNotification("fail", "Fail to Bet");
    } finally {
      toggleLoader(false);
    }
  };
  return (
    <>
      <div
        className={`${style.card} ${style.nextCard}`}
        style={{
          border:
            BullishSide != null && sideTaken == null
              ? "1px solid var(--purple-purple, #D376FF)"
              : "",
        }}
      >
        {BullishSide != null && sideTaken == null ? (
          <NextPositionCard
            onHoldPosition={(e) => {
              setSideTaken(e);
              setShowConfirmationSuccessModal(false);
              setShowConfirmationModal(true);
            }}
            BullishSide={BullishSide}
            onBack={() => setBullishSide(null)}
          />
        ) : (
          <>
            <div className={style.titleBar}>
              <div className={style.left}>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    minWidth: "21px",
                    minHeight: "21px",
                  }}
                >
                  <path
                    d="M10.4974 18.8346C15.0998 18.8346 18.8307 15.1037 18.8307 10.5013C18.8307 5.89893 15.0998 2.16797 10.4974 2.16797C5.89502 2.16797 2.16406 5.89893 2.16406 10.5013C2.16406 15.1037 5.89502 18.8346 10.4974 18.8346Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.83594 7.16797L13.8359 10.5013L8.83594 13.8346V7.16797Z"
                    fill="#D9D9D9"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <label>Next</label>
              </div>
              <div className={style.right}>
                <label>#{cardData.epoch}</label>
              </div>
            </div>
            <div className={style.divider}></div>

            <div className={style.BoxCon}>
              <div className={style.topBox}>
                <label className={style.title_lbl}>Bullish</label>
                <label className={style.Payout_lbl}>
                  {Number(cardData.up_payout).toFixed(2)}x Payout
                </label>
              </div>
              <div className={style.centerBox}>
                <div className={style.nextRowTitle}>
                  <label className={style.key}>Prize Pool:</label>
                  <label className={style.amountValue}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {cardData.prize_pool}
                  </label>
                </div>
                {sideTaken == null && !cardData.participated ? (
                  <div className={style.selectionBtnBon}>
                    <div
                      className={style.BullWin}
                      onClick={() => {
                        setBullishSide(true);
                      }}
                    >
                      <div className={style.content}>
                        <label>Bull Win</label>
                        <BullWinIcon />
                      </div>
                    </div>
                    <div
                      className={style.BearWin}
                      onClick={() => {
                        setBullishSide(false);
                      }}
                    >
                      <div className={style.content}>
                        <label>Bear Win</label>
                        <BearWinIcon />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={style.entered}>
                    <label className={style.topLbl}>
                      You entered a {BullishSide ? "BULLISH" : "BEARISH"}{" "}
                      position with
                    </label>
                    <label className={style.amountValue}>
                      <label className={style.ptv}>PTV</label>{" "}
                      {cardData.participated ? cardData.user_amount : sideTaken}
                    </label>
                  </div>
                )}
              </div>
              <div className={style.btmBox}>
                <label className={style.title_lbl}>Bearish</label>
                <label className={style.Payout_lbl}>
                  {Number(cardData.down_payout).toFixed(2)}x Payout
                </label>
              </div>
            </div>
          </>
        )}
      </div>
      {showConfirmationModal && (
        <BetConfirmationModal
          onClose={() => {
            setShowConfirmationModal(false);
            if (!showConfirmationSuccessModal) {
              setSideTaken(null);
              setBullishSide(null);
            }
            setShowConfirmationSuccessModal(false);
          }}
          onAccept={() => {
            BetAMount();
          }}
          betAmount={sideTaken}
          isBullish={BullishSide}
          showSuccessModal={showConfirmationSuccessModal}
        />
      )}
    </>
  );
};
const ExpireCard = ({
  Greentype,
  cardData,
  toggleLoader,
  handleAddNotification,
  getValue,
}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [SuccessModalAmount, setSuccessModalAmount] = useState(0);
  const [ForceOffBtn, setForceOffBtn] = useState(false);
  useEffect(() => {
    if (ForceOffBtn) {
      setForceOffBtn(false);
    }
    let claimed_btn = sessionStorage.getItem("epoch_" + cardData.epoch);
    if (claimed_btn && claimed_btn === "claimed") {
      if (!ForceOffBtn) {
        setForceOffBtn(true);
      }
    }
  }, [cardData]);
  const collect = async () => {
    toggleLoader(true);
    try {
      let stake = await post_collect_claim(cardData.epoch);
      console.log(stake);

      if (cardData.participated) {
        let win_amount = 0;
        if (Number(cardData.end_price) > Number(cardData.start_price)) {
          win_amount = Number(
            Number(
              ((Number(cardData.bull_total) +
                Number(cardData.bear_total) * 0.9) /
                Number(cardData.bull_total)) *
                Number(cardData.user_amount)
            ).toFixed(2)
          );
        }
        if (Number(cardData.end_price) < Number(cardData.start_price)) {
          win_amount = Number(
            Number(
              ((Number(cardData.bear_total) +
                Number(cardData.bull_total) * 0.9) /
                Number(cardData.bear_total)) *
                Number(cardData.user_amount)
            ).toFixed(2)
          );
        }
        if (Number(cardData.end_price) == Number(cardData.start_price)) {
          win_amount = Number(cardData.user_amount).toFixed(2);
        }

        setSuccessModalAmount(win_amount);
        // getValue();
        sessionStorage.setItem("epoch_" + cardData.epoch, "claimed");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.log(error);
      handleAddNotification("fail", "Fail to Collect");
    } finally {
      toggleLoader(false);
    }
  };
  return (
    <>
      <div
        className={`${style.card} ${style.ExpireCard} ${
          cardData.participated &&
          ((Number(cardData.end_price) > Number(cardData.start_price) &&
            cardData.user_bet_type == 1) ||
            (Number(cardData.end_price) < Number(cardData.start_price) &&
              cardData.user_bet_type == 2) ||
            (Number(cardData.end_price) < Number(cardData.start_price) &&
              cardData.user_bet_type == 2) ||
            cardData.user_bet_type == 1) &&
          !cardData.claimed &&
          style.ExpireCardWinCollect
        } ${
          Number(cardData.end_price) >= Number(cardData.start_price)
            ? style.greenCard
            : style.redCard
        } ${cardData.participated && style.ExpireCardParticipated}`}
      >
        <div className={style.titleBar}>
          <div className={style.left}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4974 18.3346C15.0998 18.3346 18.8307 14.6037 18.8307 10.0013C18.8307 5.39893 15.0998 1.66797 10.4974 1.66797C5.89502 1.66797 2.16406 5.39893 2.16406 10.0013C2.16406 14.6037 5.89502 18.3346 10.4974 18.3346Z"
                stroke="#BEBEBE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.60938 4.10547L16.3927 15.8888"
                stroke="#BEBEBE"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <label>Expired</label>
          </div>
          <div className={style.right}>
            <label>#{cardData.epoch}</label>
          </div>
        </div>

        <div
          className={`${style.BoxCon} ${
            cardData.participated &&
            cardData.user_bet_type == 1 &&
            style.topEnter
          }`}
        >
          <div className={style.topBox}>
            {cardData.participated && cardData.user_bet_type == 1 && (
              <div className={style.enteredIcon}>
                <EnteredExpiredIcon />
              </div>
            )}

            <label className={style.title_lbl}>Bullish</label>
            <label className={style.Payout_lbl}>
              {Number(cardData.up_payout).toFixed(2)}x Payout
            </label>
          </div>

          <div className={style.centerBox}>
            <div className={style.valueCon}>
              <label className={style.title}>Closed Price</label>
              <div className={style.btmValueRow}>
                <label className={style.amount}>
                  <label className={style.colorit}>$</label>{" "}
                  {Number(
                    Number(cardData.end_price).toFixed(2)
                  ).toLocaleString()}
                </label>
                <div className={style.tagCon}>
                  <svg
                    width="21"
                    height="21"
                    style={{ minWidth: "21px", minHeight: "21px" }}
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_5298_21809)">
                      <path
                        d="M19.6693 5.5L11.7526 13.4167L7.58594 9.25L1.33594 15.5"
                        stroke={
                          Number(cardData.end_price) >=
                          Number(cardData.start_price)
                            ? "#5BF4AB"
                            : "#FF5E5E"
                        }
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.6641 5.5H19.6641V10.5"
                        stroke={
                          Number(cardData.end_price) >=
                          Number(cardData.start_price)
                            ? "#5BF4AB"
                            : "#FF5E5E"
                        }
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5298_21809">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <label>
                    {Number(cardData.end_price) >= cardData.start_price
                      ? `+$${Number(
                          Math.abs(
                            Number(cardData.end_price) -
                              Number(cardData.start_price)
                          ).toFixed(2)
                        ).toLocaleString()}`
                      : `-$${Number(
                          Math.abs(
                            Number(cardData.end_price) -
                              Number(cardData.start_price)
                          ).toFixed(2)
                        ).toLocaleString()}`}
                  </label>
                </div>
              </div>
            </div>
            <div className={style.btmRowCon}>
              <div className={style.row}>
                <label className={style.key}>Last Price</label>
                <label className={style.value}>
                  <label className={style.colorit}>$</label>{" "}
                  {Number(
                    Number(cardData.start_price).toFixed(2)
                  ).toLocaleString()}
                </label>
              </div>
              <div className={style.row}>
                <label className={style.key}>Prize Pool</label>
                <label className={style.value}>
                  <label className={style.ptv}>PTV</label> {cardData.prize_pool}
                </label>
              </div>
              {cardData.participated && (
                <div className={style.row}>
                  <label className={style.key}>Committed amount:</label>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {cardData.user_amount}
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className={style.btmBox}>
            {cardData.participated && cardData.user_bet_type == 2 && (
              <div className={style.enteredIcon}>
                <EnteredExpiredIcon />
              </div>
            )}
            <label className={style.title_lbl}>Bearish</label>
            <label className={style.Payout_lbl}>
              {Number(cardData.down_payout).toFixed(2)}x Payout
            </label>
          </div>
          {!ForceOffBtn &&
            cardData.participated &&
            ((Number(cardData.end_price) > Number(cardData.start_price) &&
              cardData.user_bet_type == 1) ||
              (Number(cardData.end_price) < Number(cardData.start_price) &&
                cardData.user_bet_type == 2) ||
              (Number(cardData.end_price) == Number(cardData.start_price) &&
                cardData.user_bet_type == 2) ||
              cardData.user_bet_type == 1) &&
            !cardData.claimed && (
              <div className={style.collectionBtn}>
                <button onClick={() => collect()} className={style.button}>
                  Collect winnings
                </button>
              </div>
            )}
          {cardData.claimed && (
            <div className={style.collectionBtn}>
              <label className={style.value}>
                <label className={style.ptv}>PTV</label>{" "}
                <b>{Number(Number(cardData.claimed_amount).toFixed(2))}</b>{" "}
                Winnings Collected
              </label>
            </div>
          )}
        </div>
      </div>
      {showSuccessModal && (
        <EarnedCollectModal
          amount={SuccessModalAmount}
          onClose={() => {
            setShowSuccessModal(false);
            setForceOffBtn(true);
          }}
        />
      )}
    </>
  );
};
const LaterCard = ({ time, epoch }) => {
  return (
    <div className={`${style.card} ${style.LaterCard} `}>
      <div className={style.titleBar}>
        <div className={style.left}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4974 18.3346C15.0998 18.3346 18.8307 14.6037 18.8307 10.0013C18.8307 5.39893 15.0998 1.66797 10.4974 1.66797C5.89502 1.66797 2.16406 5.39893 2.16406 10.0013C2.16406 14.6037 5.89502 18.3346 10.4974 18.3346Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.5 5V10L13.8333 11.6667"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <label>Later</label>
        </div>
        <div className={style.right}>
          <label>#{epoch}</label>
        </div>
      </div>

      <div className={style.BoxCon}>
        <div className={style.topBox}>
          <label className={style.title_lbl}>Bullish</label>
          <label className={style.Payout_lbl}>1.91x Payout</label>
        </div>
        <div className={style.centerBox}>
          <div className={style.entryStart}>
            <label className={style.itsTitle}>Entry starts in</label>
            <label className={style.itsTitleValue}>
              ~
              {Math.floor(time / 60)
                .toString()
                .padStart(2, "0")}
              :{(time % 60).toString().padStart(2, "0")}
            </label>
          </div>
        </div>
        <div className={style.btmBox}>
          <label className={style.title_lbl}>Bearish</label>
          <label className={style.Payout_lbl}>1.91x Payout</label>
        </div>
      </div>
    </div>
  );
};

const NextPositionCard = ({ onHoldPosition, BullishSide, onBack }) => {
  const [selectedCommit, setSelectedCommit] = useState(null);
  return (
    <>
      <div className={style.titleBar}>
        <div className={style.left}>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onBack}
            style={{ cursor: "pointer" }}
          >
            <path
              d="M13 15L8 10L13 5"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <label>Next Position</label>
        </div>
        <div className={style.right}>
          <label style={{ color: BullishSide ? "#5BF4AB" : "#CD2E54" }}>
            {BullishSide ? "Bullish" : "Bearish"}
          </label>
        </div>
      </div>
      <div className={style.centerCommit}>
        <div className={style.title}>
          <label>Commit</label>
        </div>
        <div className={style.batteryCon}>
          <div
            className={`${style.battery} ${
              selectedCommit == "100" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("100");
            }}
          >
            <BatterySingle />
            <label>100</label>
          </div>
          <div
            className={`${style.battery} ${
              selectedCommit == "250" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("250");
            }}
          >
            <BatteryTwo />
            <label>250</label>
          </div>
          <div
            className={`${style.battery} ${
              selectedCommit == "500" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("500");
            }}
          >
            <BatteryThree />
            <label>500</label>
          </div>
          <div
            className={`${style.battery} ${
              selectedCommit == "1000" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("1000");
            }}
          >
            <BatteryFour />
            <label>1000</label>
          </div>
          <div
            className={`${style.battery} ${
              selectedCommit == "2000" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("2000");
            }}
          >
            <BatteryFive />
            <label>2000</label>
          </div>
          <div
            className={`${style.battery} ${
              selectedCommit == "5000" && style.selectedBattery
            }`}
            onClick={() => {
              setSelectedCommit("5000");
            }}
          >
            <BatterySix />
            <label>5000</label>
          </div>
        </div>

        <div className={style.btnConBtm}>
          <button
            className={selectedCommit != null && style.selectedBtn}
            disabled={selectedCommit == null}
            onClick={() => onHoldPosition(selectedCommit)}
          >
            {BullishSide ? "Bullish" : "Bearish"} Position
          </button>
          <label className={style.lbl}>
            Commit an amount first to enter a position
          </label>
        </div>
      </div>
    </>
  );
};

const BatterySingle = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BatteryTwo = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="23.3281"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BatteryThree = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="23.3281"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="18.7617"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BatteryFour = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="23.3281"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="18.7617"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="14.1992"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BatteryFive = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="23.3281"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="18.7617"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="14.1992"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="9.55078"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const BatterySix = () => {
  return (
    <svg
      width="24"
      height="34"
      viewBox="0 0 24 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.BatterySingle}
    >
      <mask
        id="mask0_5399_113454"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="2"
        y="1"
        width="20"
        height="31"
      >
        <path
          d="M8.69347 1.36647C8.40053 1.36647 8.11959 1.49123 7.91247 1.71306C7.70533 1.93513 7.58896 2.23627 7.58896 2.55019L7.58896 4.90079L4.27543 4.90079C3.68955 4.90079 2.54848 4.82882 2.26323 5.30207C2.09728 5.57739 2.06641 5.47351 2.06641 6.10136L2.06641 29.7758C2.06641 30.4037 2.11806 31.1128 2.53231 31.5568C2.94659 32.0008 3.64207 32 4.22795 32L19.6911 32C20.2769 32 20.6987 31.9855 21.2535 31.5568C21.8797 31.0729 21.9476 30.4037 21.9476 29.7758L21.9476 6.10136C21.9476 5.47351 21.9383 5.5288 21.7019 5.28226C21.2617 4.82315 20.3244 4.90079 19.7386 4.90079L16.425 4.90079L16.425 2.55019C16.425 2.23627 16.3087 1.93513 16.1015 1.71306C15.8944 1.49123 15.6135 1.36647 15.3205 1.36647L8.69347 1.36647Z"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_5399_113454)">
        <rect
          x="0.0234375"
          y="27.8906"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="23.3281"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="18.7617"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="14.1992"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="9.55078"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="0.0234375"
          y="4.90625"
          width="24.9615"
          height="4.10915"
          fill="white"
        />
        <rect
          x="8.28906"
          y="2.26172"
          width="7.55469"
          height="3.75368"
          rx="0.5"
          fill="white"
        />
      </g>
      <path
        d="M8.30649 1C7.98007 1 7.66701 1.12973 7.43621 1.36037C7.2054 1.59126 7.07572 1.90437 7.07572 2.23077L7.07572 3.46154L3.38341 3.46154C2.73056 3.46154 2.10447 3.72099 1.64284 4.18252C1.18122 4.64406 0.921875 5.27028 0.921875 5.92308L0.921875 30.5385C0.921875 31.1913 1.18122 31.8174 1.64284 32.279C2.10447 32.7407 2.73056 33 3.38341 33L20.6142 33C21.267 33 21.8932 32.7407 22.3547 32.279C22.8163 31.8174 23.0757 31.1913 23.0757 30.5385L23.0757 5.92308C23.0757 5.27028 22.8163 4.64406 22.3547 4.18252C21.8932 3.72099 21.267 3.46154 20.6142 3.46154L16.9219 3.46154L16.9219 2.23077C16.9219 1.90437 16.7922 1.59126 16.5614 1.36037C16.3306 1.12973 16.0175 1 15.6911 1L8.30649 1Z"
        stroke="#D376FF"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const BullWinIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="83"
      height="40"
      viewBox="0 0 83 40"
      fill="none"
    >
      <path
        d="M21.9721 6.85845C14.4713 5.64765 11.5483 3.91607 11.4503 0.666257L11.429 -0.255831L12.5631 0.917355C14.8566 3.35539 16.9436 3.83771 25.364 3.9202C31.9161 3.99967 33.3501 4.17416 35.312 5.23599C36.6199 5.94386 37.8206 7.00018 38.3254 7.88805C39.3587 9.68629 39.386 9.87018 39.7098 15.9056C39.7124 16.0208 39.8727 15.971 40.0534 15.8054C40.4834 15.4495 41.2007 15.5483 44.3361 16.4908C55.5999 19.852 63.8439 23.2829 69.7665 27.0671L71.3113 28.0463L73.2569 27.4018C80.4201 24.9762 86.7995 25.567 92.163 29.1105C92.163 29.1105 90.9834 44.9599 89.1974 46.5234C87.7057 47.8494 85.309 49.9343 83.8849 51.1896C82.4608 52.4449 81.2399 53.511 81.1724 53.5817C81.1053 53.6755 80.1563 54.5277 79.0255 55.4995C77.9178 56.4707 76.6974 57.5598 76.313 57.8915C75.7484 58.412 73.5109 60.401 71.5662 62.0835C71.3179 62.3198 69.1475 64.2151 66.7518 66.3461L62.412 70.1827L50.4699 70.4121L38.5504 70.6179L38.0575 69.2454C37.565 67.896 37.1166 66.4533 35.8152 62.0319C33.2329 53.0733 32.2737 50.4892 30.2743 46.7989C28.4195 43.382 27.0163 41.5462 24.3513 39.0014C21.5994 36.3736 19.8324 31.7335 15.896 30.0145C6.16038 30.0145 5.29426 29.8292 5.11626 28.5216C14.4573 26.7954 18.0136 28.5216 18.0136 28.5216C18.0136 28.5216 18.9272 29.0049 19.5453 25.5814C20.0101 23.0067 5.26357 28.0389 4.73288 27.4175C3.19247 25.6309 2.16408 24.0371 0.822999 19.8934C0.675645 19.5047 0.714834 19.204 0.873008 19.062C1.03171 18.943 2.38594 18.658 3.90206 18.3924C5.41871 18.1498 7.23344 17.8312 7.92234 17.7C8.61125 17.5688 9.64487 17.3835 10.2196 17.301C15.3207 16.4683 15.5271 16.4174 16.3818 15.4751C17.1239 14.6507 17.3517 14.5302 19.0287 14.2378C21.9692 13.7317 23.2087 13.4725 26.2834 12.7788C27.8665 12.4193 29.3821 12.1307 29.6357 12.1248C30.212 12.1115 30.406 12.5222 30.4347 13.767C30.4618 14.9427 30.8516 14.8414 31.5348 13.4649C32.1955 12.1119 32.0655 10.4773 31.239 9.64299C29.8926 8.26713 29.0097 7.98767 21.9721 6.85845Z"
        fill="#5BF4AB"
      />
      <path
        d="M14.7875 9.4008C14.4727 9.75403 14.7293 10.8783 15.2974 11.511C16.4107 12.7769 17.2689 12.9877 20.4946 12.8441C24.6188 12.6567 24.6103 12.2878 20.4638 11.5071C18.3795 11.14 15.9603 10.2502 15.323 9.61909C15.1107 9.41641 14.8781 9.32952 14.7875 9.4008Z"
        fill="#5BF4AB"
      />
    </svg>
  );
};
const BearWinIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="66"
      height="40"
      viewBox="0 0 66 40"
      fill="none"
    >
      <path
        d="M91.3539 -5.78427C91.1424 -5.74396 91.0761 -5.68013 91.2033 -5.65955C91.3456 -5.61787 91.3673 -5.52117 91.2559 -5.40873C91.1626 -5.29335 90.3049 -0.455525 89.367 5.33854C87.8881 14.4746 87.6921 15.9154 87.8959 16.1534C88.3187 16.6506 87.3898 15.941 86.2079 14.8364L85.1051 13.8191L86.5252 5.04627C87.5161 -1.07473 87.8938 -3.75355 87.7485 -3.77707C87.6395 -3.79471 87.5767 -3.63713 87.6112 -3.38924C87.6555 -2.97201 87.6373 -2.97495 87.4752 -3.35533C87.3804 -3.57571 87.1707 -3.7774 87.0284 -3.81908C86.777 -3.87841 86.6236 -3.04584 85.625 3.35349C84.2088 12.332 84.18 12.6256 84.4711 12.7845C84.5894 12.8596 84.6808 12.9862 84.6661 13.077C84.6514 13.1679 83.637 12.2954 82.4276 11.1303C81.1972 9.98057 79.9456 8.84601 79.6633 8.63256C78.7466 7.96228 76.8545 6.98498 75.4485 6.45915C73.4121 5.68217 67.3185 4.062 66.426 4.04802C65.3672 4.02573 65.0908 3.77595 64.2902 2.04338C63.4743 0.289706 62.394 -1.09673 60.9549 -2.22435C60.378 -2.69053 59.5423 -3.51546 59.0709 -4.05774C58.6148 -4.57893 58.083 -5.09371 57.8891 -5.16238C55.9465 -5.94282 52.8743 -6.99931 51.7084 -7.28124C48.6014 -8.00785 45.8654 -7.68656 44.0475 -6.35922C43.119 -5.6894 41.7587 -4.1948 41.3932 -3.43385C40.6499 -1.95119 38.6251 -0.265939 36.9395 0.244054C35.9579 0.551124 33.8172 0.763773 31.6755 0.752592C29.7002 0.7497 28.7971 1.03221 27.0965 2.21079C25.4833 3.3103 24.1915 3.92131 23.9485 3.69557C23.8483 3.62344 23.7888 3.18511 23.7867 2.73743C23.806 1.69677 23.394 0.90313 22.7946 0.806103C21.2689 0.559125 19.4908 1.98611 18.8709 3.97335C18.7547 4.34595 18.5113 4.69798 18.3513 4.76528C18.1942 4.8144 17.1605 4.98257 16.0541 5.13898C13.672 5.46165 12.4969 5.81197 11.6891 6.42677C11.1797 6.81028 11.0148 7.13774 10.5886 8.50397C9.9452 10.6365 9.86078 10.6974 8.10914 10.0038C7.5485 9.78257 6.83079 9.61047 6.5132 9.61498C5.16428 9.65757 1.0055 11.3171 0.541086 12.9194C0.228709 14.0431 0.461561 14.6773 1.57369 15.752C2.41821 16.5224 2.41233 16.5587 2.39403 17.8232C2.37919 19.1815 2.6321 19.5766 3.2166 19.0748C3.67153 18.6824 6.49164 18.6142 7.12081 19.909C8.50734 22.7429 9.41386 25.7787 9.28122 27.1738C9.16916 28.4418 8.79987 29.6868 8.40237 30.0697C8.13737 30.3251 6.05926 29.8065 5.57663 29.4488C4.51121 28.6613 4.40674 28.9612 5.06602 30.8759C5.48312 32.0991 5.50873 32.4015 5.32905 34.0872C5.10458 36.1931 8.08334 36.6629 9.78274 35.4749C13.4158 32.2606 14.8382 31.7639 16.9734 32.967C17.5738 33.2878 18.67 33.5398 22.445 34.1696C25.0394 34.6082 27.2588 35.0607 27.3742 35.1539C27.4685 35.2623 27.7409 35.3313 27.685 35.6764L27.8867 36.0206L28.414 35.9434C29.1313 35.6125 29.2407 35.8288 29.6552 36.4924C29.832 36.7819 30.1084 37.0317 30.29 37.0611C30.8894 37.1581 32.0928 39.6269 31.9546 40.4806C31.9222 40.6804 31.9655 40.8738 32.0504 40.9248C32.1564 40.9606 32.3054 41.7676 32.4156 42.6987C32.6449 44.5066 32.4074 46.7794 31.9265 47.4471C31.7823 47.6474 30.7998 48.4203 29.7264 49.1785C28.1707 50.2687 27.5592 50.8221 26.7235 51.9543C26.1494 52.7374 25.5866 53.3359 25.4805 53.3001C25.3745 53.2643 25.269 53.3404 25.2484 53.4676C25.2278 53.5947 24.8191 54.1623 24.3347 54.7363C22.7463 56.604 22.7221 57.9048 24.2432 61.0588C25.9264 64.5931 26.6878 66.338 26.763 66.9093C26.8009 67.251 26.7821 68.4035 26.7235 69.4565C26.5421 72.0739 27.0491 73.7776 28.0049 73.7459C28.6764 73.7428 32.1115 68.297 32.3408 66.8803C32.482 66.0084 32.2714 64.3155 31.656 61.4386C31.3778 60.1634 31.2062 59.0359 31.2783 58.9357C31.4913 58.5415 32.7926 58.6776 35.6424 59.3812C38.7616 60.1471 39.8872 60.2175 41.476 59.7291C41.9472 59.5817 42.3492 59.5163 42.3949 59.5796C42.4406 59.6429 42.1222 62.0704 41.6547 64.9584C41.2024 67.8674 40.884 70.2949 40.9267 70.3764C40.9906 70.4426 41.2513 70.5594 41.5389 70.6246L42.0598 70.7462L43.0463 64.9973L44.0147 59.2454L45.1152 59.1253C46.4273 58.9649 47.133 58.52 47.899 57.3579C48.3945 56.5993 48.4926 56.2238 48.816 54.2258C49.1424 52.2097 49.1344 51.7984 48.896 50.6228C48.5466 48.9819 48.5671 48.8547 49.1719 48.8035C49.7766 48.7523 51.1268 49.6232 52.3092 50.8398C53.8745 52.4538 54.4234 52.7477 56.7336 53.2149C59.2799 53.7203 59.4375 53.7831 59.9364 54.3857C60.5266 55.115 61.4061 58.2024 61.7942 60.9865C62.2821 64.4205 62.4395 70.9325 62.0926 73.0757C61.8897 74.329 61.2665 74.955 59.6389 75.5676C57.7698 76.2902 57.4146 76.6427 57.1911 78.0231C57.0764 78.7315 57.079 79.2911 57.2224 79.5566C57.4238 79.9247 57.4238 79.9247 57.5214 79.4373C57.6154 78.856 58.0842 78.8387 58.1776 79.413C58.2559 79.9662 58.5612 79.9225 58.6553 79.3412C58.7317 78.869 58.771 78.8567 59.6551 79.0371C60.306 79.1611 60.6698 79.3318 60.9163 79.6513C61.3484 80.2059 61.4937 80.2294 61.5672 79.7753C61.6025 79.5574 61.7954 79.4022 62.0796 79.3737C62.6633 79.3377 62.9122 79.5271 62.8357 79.9993C62.7563 80.4897 63.0921 80.4882 63.4375 79.9663L63.7319 79.5293L65.458 79.9205C66.3907 80.1461 67.6111 80.4368 68.1472 80.5795C68.6833 80.7222 69.2522 80.777 69.4151 80.6916C69.8377 80.499 70.1897 78.7853 70.3529 76.165C70.4624 74.3374 70.5947 73.5201 70.9551 72.3296C71.5304 70.5029 73.1581 66.6657 73.5556 66.2827C73.8024 66.0245 73.854 66.0515 74.1643 66.4372C74.3681 66.6752 74.8186 67.9224 75.2058 69.2153C75.5748 70.5052 76.2031 72.2658 76.5823 73.1473C78.1443 76.6247 77.6487 77.3833 73.6211 77.7378C71.317 77.924 70.9847 78.0193 70.9112 78.4734C70.776 79.3089 71.6577 79.6194 75.2377 79.9566C76.8537 80.1064 79.8015 80.4344 81.7902 80.7004L85.3859 81.1707L85.5682 80.0446C85.8941 77.9165 85.9577 75.336 85.7483 72.5994C85.4231 68.3902 85.4793 67.4674 86.3094 63.8366C87.1488 60.2633 87.6196 58.7365 88.098 58.1989C88.7782 57.4516 89.2648 58.015 89.6522 59.9975C90.2032 62.6962 91.2148 64.2765 94.3779 67.3049C95.3776 68.2682 96.2285 69.1142 96.2742 69.1775C96.3198 69.2408 96.5236 69.4788 96.7485 69.7016C96.9734 69.9244 97.0102 70.0422 96.8556 69.9613C96.6676 69.8563 96.5316 69.8902 96.4929 70.0144C96.4723 70.1415 96.4114 70.0571 96.3529 69.8426C96.2974 69.61 96.0341 70.8907 95.7112 73.0006L95.156 76.5454L95.7502 73.5661L96.3443 70.5868L95.9043 73.5351L95.4643 76.4834L96.0333 76.5383L96.6022 76.5931L97.0171 73.4543L97.4349 70.2974L97.9269 70.7125C98.2092 70.926 99.3013 72.2397 100.379 73.6443C101.441 75.0278 102.885 76.6969 103.56 77.3653C104.235 78.0337 104.928 78.8169 105.102 79.1246C105.547 79.9423 105.654 81.3575 105.419 83.5002C105.033 87.0351 105.114 87.5702 106.04 87.7201C106.404 87.7789 106.515 87.6665 106.745 87.0513C107.139 85.9968 107.56 86.0463 108.025 87.2027C108.466 88.2805 108.844 88.3604 109.218 87.433L109.491 86.7875L109.94 87.2331C110.487 87.7689 110.666 87.8165 111.015 87.5003C111.404 87.1718 111.761 87.2669 112.382 87.9265C113.798 89.4233 114.203 88.0722 113.946 82.7556C113.885 81.5157 113.803 80.0672 113.737 79.5532C113.585 78.1867 111.626 71.7558 110.426 68.6911C109.005 65.0315 108.715 63.2512 108.359 55.6633C108.286 54.2722 108.15 52.349 108.022 51.4148C107.808 49.74 106.439 44.1503 105.25 40.0995C104.927 38.9848 104.508 37.4259 104.317 36.6493C103.969 35.2323 103.38 34.261 101.696 32.348C101.273 31.8509 101.221 31.712 101.438 31.5234C101.591 31.3805 101.675 31.2077 101.611 31.1415C101.55 31.0571 101.414 31.091 101.303 31.2034C101.026 31.5314 100.57 31.0102 99.0737 28.6245C98.3729 27.5418 97.3044 26.0827 96.6901 25.3868C95.9054 24.477 95.622 24.0397 95.73 23.8335C95.8227 23.6062 95.8075 23.5851 95.6691 23.7491C95.4944 23.9072 95.2577 23.757 94.6435 23.0611C94.1814 22.5763 93.8313 22.0909 93.8489 21.9819C93.8666 21.8729 93.7998 21.8249 93.7183 21.8676C93.6398 21.8922 93.1144 21.453 92.5704 20.8989C92.0293 20.3267 91.1813 19.4625 90.6981 18.9929C90.0721 18.3696 89.8771 18.0771 90.0582 17.9946C90.2575 17.915 90.2693 17.8424 90.0778 17.6436C89.8681 17.4419 89.8711 17.4238 90.0954 17.5346C90.2348 17.5945 90.3689 17.8026 90.3547 18.0053C90.3859 18.8491 90.6514 18.7057 90.7984 17.7976C90.9249 17.0165 90.8968 16.8443 90.6642 16.8998C90.51 16.9308 90.3888 16.8739 90.4006 16.8012C90.4153 16.7104 90.2577 16.6476 90.0309 16.6668C89.7256 16.7106 89.6323 16.826 89.6221 17.2344C89.613 17.8666 89.3892 17.8677 88.8539 17.2591C88.5711 16.9338 88.5401 16.7796 88.709 16.6578C89.0888 16.3838 92.5577 -5.16071 92.2696 -5.33784C92.0997 -5.43989 92.1056 -5.47622 92.2872 -5.44682C92.3991 -5.44733 92.5198 -5.50235 92.5345 -5.59316C92.5669 -5.79296 91.8767 -5.90469 91.3539 -5.78427ZM90.041 7.16246C89.8317 8.34012 89.9454 7.40792 90.3158 5.11935C90.6892 2.81262 90.8814 1.85585 90.7173 2.98491C90.5713 4.11691 90.2685 5.98772 90.041 7.16246ZM89.0854 13.0655C89.0109 13.2957 88.9981 13.1446 89.0628 12.745C89.1093 12.3424 89.175 12.1667 89.203 12.339C89.21 12.5265 89.157 12.8534 89.0854 13.0655ZM43.6132 59.4227C43.6044 59.4772 43.517 59.5563 43.3992 59.5931C43.2996 59.6329 43.2147 59.5819 43.2294 59.491C43.247 59.3821 43.3525 59.306 43.4433 59.3207C43.5523 59.3383 43.6191 59.3864 43.6132 59.4227Z"
        fill="#CD2E54"
      />
    </svg>
  );
};
// const LottieAnimation = () => {
//   const container = useRef(null);

//   useEffect(() => {
//     if (container.current) {
//       Lottie.loadAnimation({
//         container: container.current,
//         animationData: animationData,
//         renderer: "svg", // or 'canvas', 'html'
//         loop: true,
//         autoplay: true,
//       });
//     }
//   }, []);

//   return (
//     <div style={{ maxWidth: "150px", maxHeight: "150px" }} ref={container} />
//   );
// };

const ClockIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 6.5V12.5L16 14.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const InfoIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0013 18.8346C14.6037 18.8346 18.3346 15.1037 18.3346 10.5013C18.3346 5.89893 14.6037 2.16797 10.0013 2.16797C5.39893 2.16797 1.66797 5.89893 1.66797 10.5013C1.66797 15.1037 5.39893 18.8346 10.0013 18.8346Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.57422 7.99852C7.77014 7.44158 8.15685 6.97194 8.66585 6.6728C9.17485 6.37365 9.7733 6.2643 10.3552 6.36411C10.9371 6.46393 11.4649 6.76646 11.8451 7.21813C12.2253 7.6698 12.4334 8.24146 12.4326 8.83185C12.4326 10.4985 9.93255 11.3319 9.93255 11.3319"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 14.668H10.0083"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const WinIcon = () => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.00171 21.5H15.0017M12.0017 17.75V21.5M18.5829 12.5H19.5016C20.2973 12.5 21.0603 12.1839 21.623 11.6213C22.1856 11.0587 22.5016 10.2956 22.5016 9.5V8C22.5016 7.80109 22.4226 7.61032 22.282 7.46967C22.1413 7.32902 21.9505 7.25 21.7516 7.25H18.7516M5.43906 12.5H4.49219C3.69654 12.5 2.93348 12.1839 2.37087 11.6213C1.80826 11.0587 1.49219 10.2956 1.49219 9.5V8C1.49219 7.80109 1.57121 7.61032 1.71186 7.46967C1.85251 7.32902 2.04328 7.25 2.24219 7.25H5.24219M5.25171 5.75V10.9156C5.25171 14.6375 8.23296 17.7219 11.9548 17.75C12.8452 17.7562 13.728 17.5862 14.5523 17.2497C15.3767 16.9133 16.1264 16.417 16.7581 15.7896C17.3899 15.1622 17.8913 14.416 18.2334 13.594C18.5756 12.772 18.7517 11.8904 18.7517 11V5.75C18.7517 5.55109 18.6727 5.36032 18.532 5.21967C18.3914 5.07902 18.2006 5 18.0017 5H6.00171C5.8028 5 5.61203 5.07902 5.47138 5.21967C5.33073 5.36032 5.25171 5.55109 5.25171 5.75Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const HistoryIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6559_93671)">
        <path
          d="M10 5.29297V11.0073L13.7143 12.8644"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.0378 12.4364C18.0704 16.5317 14.3914 19.5792 10.0006 19.5792C4.8722 19.5792 0.714844 15.422 0.714844 10.2935C0.714844 5.16517 4.8722 1.00781 10.0006 1.00781C13.583 1.00781 16.6917 3.03654 18.2403 6.00781"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M19.2863 3.15234V6.72377H15.7148"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6559_93671">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.292969)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const EnteredExpiredIcon = () => {
  return (
    <>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="8.28906" cy="8.20312" r="8" fill="white" />
        <path
          d="M12.5568 5.00391L6.6901 10.8706L4.02344 8.20391"
          stroke="#07152F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <label>Entered</label>
    </>
  );
};

const StarIconCollection = ({ index }) => {
  return (
    <svg
      className={
        index == 1
          ? style.StarIconCollection1
          : index == 2
          ? style.StarIconCollection2
          : index == 3
          ? style.StarIconCollection3
          : style.StarIconCollection4
      }
      width="47"
      height="48"
      viewBox="0 0 47 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_5776_98335)">
        <path
          d="M22.4151 16.2348C22.5182 15.6927 23.2943 15.6927 23.3974 16.2348L24.5462 22.2747C24.5846 22.4764 24.7423 22.6341 24.944 22.6725L30.9839 23.8213C31.526 23.9244 31.526 24.7006 30.9839 24.8037L24.944 25.9525C24.7423 25.9909 24.5846 26.1486 24.5462 26.3503L23.3974 32.3902C23.2943 32.9323 22.5182 32.9323 22.4151 32.3902L21.2663 26.3503C21.2279 26.1486 21.0702 25.9909 20.8685 25.9525L14.8286 24.8037C14.2865 24.7006 14.2865 23.9244 14.8286 23.8213L20.8685 22.6725C21.0702 22.6341 21.2279 22.4764 21.2663 22.2747L22.4151 16.2348Z"
          fill="#FFFACE"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_5776_98335"
          x="-0.578125"
          y="0.828125"
          width="46.9688"
          height="46.9688"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="7.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.909804 0 0 0 0 0.0941176 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5776_98335"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5776_98335"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const EarnedCollectModal = ({ onClose, amount }) => {
  const modalRef = useRef(null);
  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  return (
    <div
      style={{ display: "flex" }}
      className={style.modalContainer}
      onClick={handleClick}
    >
      <div
        className={style.Modal}
        ref={modalRef}
        style={{
          flexDirection: "column",
          alignSelf: "center",
          marginTop: "0",
        }}
      >
        <div className={style.bodyCon}>
          <div className={style.svgCon}>
            <div class={style.successAnimation}>
              <svg
                class={style.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class={style.checkmarkCircle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class={style.checkmarkCheck}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
          <div className={style.SuccessMsg}>
            <label>
              You have successfully earned <br />
              <label className={style.colorLbl}>PTV</label> {amount}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const BetConfirmationModal = ({
  onClose,
  onAccept,
  isBullish,
  betAmount,
  showSuccessModal,
}) => {
  const modalRef = useRef(null);
  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    let timer;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        onClose();
      }, 3500);
    }
    // Clean up the timer if the component is unmounted or showSuccessModal changes
    return () => clearTimeout(timer);
  }, [showSuccessModal, onClose]);
  return (
    <div
      style={{ display: "flex" }}
      className={style.modalContainer}
      onClick={handleClick}
    >
      <div
        className={style.Modal}
        ref={modalRef}
        style={{
          flexDirection: "column",
          alignSelf: "center",
          marginTop: "0",
        }}
      >
        <div className={style.bodyCon}>
          {showSuccessModal ? (
            <>
              <div className={style.svgCon}>
                <div class={style.successAnimation}>
                  <svg
                    class={style.checkmark}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      class={style.checkmarkCircle}
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      class={style.checkmarkCheck}
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
                  </svg>
                </div>
              </div>
              <div className={style.SuccessMsg}>
                <label>
                  You have successfully Committed <br />
                  {/* <label className={style.colorLbl}>PTV</label> {betAmount} */}
                </label>
              </div>
            </>
          ) : (
            <>
              <div className={style.title}>
                <label>
                  Commit <label className={style.colorLbl}>PT Virtuals</label>
                </label>
              </div>

              <div className={style.msg}>
                <label>
                  Amount that will be Commit on{" "}
                  {isBullish ? "BULLISH" : "BEARISH"}{" "}
                </label>
              </div>

              <div className={style.amount}>
                <label>
                  <label className={style.colorLbl}>PTV</label> {betAmount}
                </label>
              </div>

              <div className={style.btnCon}>
                <button
                  type="button"
                  className={`${style.button} ${style.Outlinebutton}`}
                  onClick={() => onClose()}
                >
                  <div className={style.body}>Cancel</div>
                </button>
                <button
                  type="button"
                  className={style.button}
                  onClick={() => onAccept()}
                >
                  Commit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
