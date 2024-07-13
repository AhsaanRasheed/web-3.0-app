"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import ClaimTokenCountDownTimer from "../Timer/ClaimTokenCountDownTimer";
import { get_reward_time } from "@/app/services/service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";

const EnoughPtv = ({}) => {
  const [time, setTime] = useState(null);
  const [token, setToken] = useState(0);
  const isVisible = false;
  const tempTokenRef = useRef(0);
  const intervalId = useRef(null);

  useEffect(() => {
    get_reward_time_func();
  }, []);

  const { resetClaimTimer, setResetClaimTimer } = useNotification();

  const get_reward_time_func = async (useCurrentTime = false) => {
    try {
      if (!isVisible) {
        if (!useCurrentTime) {
          let reward = await get_reward_time();
          setTime(reward.lastClaimTime);

          let lastTimeStamp = new Date(Number(reward.lastClaimTime) * 1000);
          console.log("-- useCurrentTime2", reward.lastClaimTime);

          let gap = Date.now() - lastTimeStamp;
          if (gap > 21600000) {
            gap = 21600000;
          }
          tempTokenRef.current = (gap * 1000) / 21600000;
        } else {
          setToken(0);
          setResetClaimTimer(true);
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

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.timerSection}>
          <div className={styles.infoText}>
            <InfoIcon />
            Oops!
            <p>You don’t have enough PTV to stake.</p>
            {token < 50 ? (
              <p>
                You can claim{" "}
                <span>
                  {" "}
                  <i className={styles.highlight}>PTV</i> 50
                </span>{" "}
                in
              </p>
            ) : (
              <p style={{ fontFamily: "var(--GilroySemiBold)" }}>
                To Stake, Claim your{" "}
                <span className={styles.highlight}>PTV</span> Now!{" "}
              </p>
            )}
            <ClaimTokenCountDownTimer
              time={time}
              token={token}
              refresh={() => {
                get_reward_time_func(true);
              }}
            />
          </div>
        </div>
        {/* <div className={`${styles.claimButton}`}>Claim</div> */}
      </div>
    </div>
  );
};

const InfoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
        stroke="white"
        stroke-width="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 16V24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 32H24.02"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EnoughPtv;
