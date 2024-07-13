"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import DropDown from "./Components/DropDown";
import CopyComponent from "@/app/_components/CopyComponent";
import Link from "next/link";
// import { TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import timerStyle from "./timer.module.scss";

import profileDropDown from "../../data/profileDropDownData.json";
import Countdown from "./Components/Timer";
import { get_reward_time } from "@/app/services/service";
import { claim_virtuals } from "@/app/services/new_service";
import { useLoader } from "../global/Loader/loaderContext";
import { useNotification } from "../global/Notification/notificationContext";
function truncateCenter(str) {
  if (str.length <= 25) {
    return str; // If the string is 10 characters or less, return it as is
  } else {
    const start = str.substring(0, 8); // Extract first five characters
    const end = str.substring(str.length - 8); // Extract last five characters
    return start + "..." + end; // Concatenate the parts with "..."
  }
}
const ProfileBar = ({
  title,
  id,
  name,
  email,
  imgUrl,
  notifications = [
    {
      id: 1,
      title: "New Airdrop!",
      description: "Check the new airdrop now.",
      image: "/icons/airdrop.svg",
      url: "/airdrop",
    },
    {
      id: 2,
      title: "New Airdrop!",
      description: "Check the new airdrop now.",
      image: "/icons/airdrop.svg",
      url: "/airdrop",
    },
  ],
  isMobileView = false,
  showBack = false,
  backLink = "/",
  hideOnMob = false,
}) => {
  // const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const user = useSelector((state) => state.profileVisibility.user);
  const { resetClaimTimer, setResetClaimTimer, setResetRewardCenter } =
    useNotification();
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
          setTimeout(()=>setResetRewardCenter(true), 6000);
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
    get_reward_time_func();
    console.log("hideOnMob", hideOnMob);
  }, []);

  useEffect(() => {
    if (resetClaimTimer == true) {
      get_reward_time_func(true);
      setResetClaimTimer(false);
    }
  }, [resetClaimTimer]);

  return (
    <div className={hideOnMob && styles.HideitOnMobile}>
      <div className={styles["profile-box"]}>
        <div>
          <label className={styles["pageTitle"]}>
            {showBack ? (
              <Link
                className={styles["pageTitleBack"]}
                href={backLink}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {"< "}
                {title}
              </Link>
            ) : (
              title
            )}
          </label>
        </div>

        {/* <TimerBar /> */}
        <span className={styles["countDownHide"]}>
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

        {!isVisible && (
          <div className={styles["profile-container"]}>
            {/* <CopyComponent
            text={user?.wallet ? user?.wallet : id ? id : ""}
            truncateStyle="middle"
          /> */}
            {/* <hr className={styles.divider} /> */}
            {/* <DropDown
            title={"Notifications"}
            content={notifications}
            customClass={"notification"}
          >
            <Image
              src="/icons/notification.svg"
              alt="Notification"
              width={24}
              height={24}
            />
            <Image
              src="/icons/443-ellipse.svg"
              alt="status-error"
              width={7}
              height={7}
              className={styles["status"]}
            />
          </DropDown> */}

            <DropDown
              content={profileDropDown.data}
              arrowIcon={true}
              customClass={"current-profile"}
            >
              <div className={styles["profile-image"]}>
                <Image
                  className={styles["user"]}
                  src={imgUrl}
                  alt="Profile Image"
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles["profile-details"]}>
                <label>
                  {
                    // user?.firstname ? `${user.firstname} ${user?.lastname || ''}` :
                    user?.username
                  }
                </label>
                {/* <label
                  className="txt_Body2"
                  style={{ color: "var(--primary-Neutrals-strong-color)" }}
                >
                  {user?.email ? truncateCenter(user?.email) : ""}
                </label> */}
              </div>
            </DropDown>
            {/* </div> */}
          </div>
        )}
        <div className={styles["divider"]}></div>
      </div>
    </div>
  );
};

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
        className={`${timerStyle.claimBtn} ${
          isAnimating ? timerStyle.animated : ""
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

export default ProfileBar;
