"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import Modal from "@/app/_components/Modal";
import StakingModal from "./Components/Modal/Modal";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./driver.theme.css"
import EnoughPtv from "./Components/EnoughPtv";


const Staking = ({
  isMobileView,
  UserBln = -1,
  CoinInfo,
  userStakingInfo,
  StakeUserAmount,
  UnStakeUserAmount,
  ClaimUserAmount,
  setResetClaimTimer
  // sliderValue,
  // setSliderValue 
}) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [runningClaimAmount, setRunningClaimAmount] = useState(0);
  const [amountToUnstake, setAmountToUnstake] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(null);
  const isUserBlnLoaded = UserBln.balance !== -1;

  // const driverObj = driver();

  useEffect(() => {
    let blockTime = userStakingInfo.user_data.block_time;
    let interval;
    if (userStakingInfo.smart_wallet.address)
      interval = setInterval(() => {
        let ONE_YEAR = 31536000; // 365 * 24 * 60 * 60
        let PERCENTAGE_UNIT = 100;
        let runClaimAmount =
          (Number(userStakingInfo.user_data.stake_amount) *
            120 *
            (Number(blockTime) -
              Number(userStakingInfo.user_data.last_stake_time))) /
          (PERCENTAGE_UNIT * ONE_YEAR) +
          Number(userStakingInfo.user_data.claim_amount);
        if (!isNaN(runClaimAmount))
          setRunningClaimAmount(runClaimAmount.toFixed(5));
        blockTime = Number(blockTime) + 1;
      }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [userStakingInfo]);
  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const DriverPopup = () => {
    const driverObj = new driver({
      popoverClass: 'driverjs-theme',
      overlayOpacity: 0.9,
      showProgress: true,
      steps: [
        { element: '#tour-staking', popover: { title: 'Staking Tour', description: 'Enjoy a 120% APY by staking your PTV tokens! Plus, unlock, Let\'s walk you through it.', side: 'left', align: 'start' } },
        { element: '#step2', popover: { title: 'Choose Amount', description: 'Minimum staking amount is PTV 50.00.', side: 'bottom', align: 'start' } },
        { element: '#step3', popover: { title: 'Slide for stake', description: 'Select the quantity for staking by sliding, let\'s move.', side: 'bottom', align: 'start' } },
        { element: '#step4', popover: { title: 'Stake Now', description: 'By Staking the PTV, you can earn rewards...', side: 'top', align: 'start' } },
        { element: '#step5', popover: { title: 'Claim fo Earn', description: 'Claim your staking rewards and manage your staked amount.', side: 'top', align: 'start' } },
        { popover: { title: 'Happy Staking', description: 'And that is all, go ahead and start staking and claiming the tokens.' } }
      ]
    });

    console.log(driverObj.steps);
    driverObj.drive();
  }

  return (
    <>
      {isMobileView ? (
        <div className={styles.stackingWrapper}>
          <div className={styles.container}>
            <div className={styles.layoutGrid}>
              <div className={styles.column}>
                <div className={styles.rightHeader}>
                  <div className={styles.investPT}>
                    Stake Your <span>PT Virtuals</span>
                    {/* <i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V12"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </i> */}
                  </div>
                  <p>
                    Enjoy a 120% APY by staking your PTV tokens! Plus, unlock
                    exciting ecosystem rewards to enhance your trading journey!
                  </p>
                </div>

                <div className={styles.cardPTV}>
                  <div className={styles.investP}>
                    <p>Choose Amount</p>
                    <div className={styles.flexRow}>
                      {/* <InfoIcon /> */}
                      <p
                        className={styles.smallText}
                        style={{ marginRight: 4 }}
                      >
                        Minimum staking amount is{" "}
                        <span className={styles.highlight}>PTV</span> 50.00.
                      </p>
                    </div>

                    <div className={styles.investP} style={{ width: 214, marginTop: 16 }}>
                      <div className={styles.flexRow}>
                        <p
                          className={styles.smallText}
                          style={{ marginRight: 4 }}
                        >
                          Total Balance:{" "}
                          <div style={{ fontSize: 18, display: 'inline', fontWeight: 600 }}><span className={styles.highlight}>PTV</span> {UserBln.balance === -1 ? 0 : Number(UserBln.balance).toFixed(2)}</div>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sliderContainer}>

                    {isUserBlnLoaded && UserBln.balance < 50 && <EnoughPtv setResetClaimTimer={setResetClaimTimer} />}

                    <div className={styles.slider}>
                      <RangeSliderMobile
                        value={sliderValue}
                        onChange={handleSliderChange}
                        maxValue={UserBln.balance}
                        setSliderValue={setSliderValue}
                        UserBln={UserBln}
                      />
                    </div>
                    {/* <div className={styles.quantity}>
                    <p>Quantity</p>
                    <div className={styles.qtyBtn}>
                      <span className={styles.highlight}>PTV</span>
                      <input placeholder={sliderValue} value={sliderValue} onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        if (!isNaN(newValue) && newValue >= 0) {
                          setSliderValue(newValue);
                        }
                      }} />
                    </div>
                  </div> */}
                  </div>

                  <div className={styles.rangeBtns}>
                    <div
                      className={styles.btn}
                      onClick={(e) => {
                        setSliderValue(0);
                      }}
                    >
                      Min
                    </div>
                    <div
                      className={styles.btn}
                      onClick={(e) => {
                        setSliderValue(
                          Number((Number(UserBln.balance) / 2).toFixed(2))
                        );
                      }}
                    >
                      50%
                    </div>
                    <div
                      className={styles.btn}
                      onClick={(e) => {
                        setSliderValue(
                          Number(Number(UserBln.balance).toFixed(2))
                        );
                      }}
                    >
                      Max
                    </div>
                  </div>

                  <div className={styles.footerWrapper}>
                    <div className={styles.footerCard}>
                      <p>
                        APY {userStakingInfo.apr}%
                        <svg
                          style={{ marginLeft: "4px" }}
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.13173 0.339232C6.2722 0.0195594 6.72613 0.0207263 6.86496 0.341117L12.3949 13.1035C12.5584 13.4809 12.1144 13.8297 11.7865 13.5815L6.73678 9.75949C6.59642 9.65326 6.40311 9.65127 6.26059 9.75459L1.19455 13.4274C0.864226 13.6668 0.429427 13.3161 0.593561 12.9426L6.13173 0.339232Z"
                            fill="#5BF4AB"
                          />
                        </svg>
                      </p>
                      <div
                        className={styles.footerBtn}
                        onClick={() => {
                          StakeUserAmount(sliderValue);
                        }}
                      >
                        Stake
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9603 10.6145C16.0192 10.6145 18.4988 9.51242 18.4988 8.15294C18.4988 6.79347 16.0192 5.69141 12.9603 5.69141C9.90153 5.69141 7.42188 6.79347 7.42188 8.15294C7.42188 9.51242 9.90153 10.6145 12.9603 10.6145Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.42188 8.15234V15.537C7.42188 16.8908 9.88341 17.9985 12.9603 17.9985C16.0373 17.9985 18.4988 16.8908 18.4988 15.537V8.15234"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.4988 11.8477C18.4988 13.2015 16.0373 14.3092 12.9603 14.3092C9.88341 14.3092 7.42188 13.2015 7.42188 11.8477"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.8385 3.24158C11.4003 2.35403 9.72625 1.92479 8.03846 2.0108C4.97385 2.0108 2.5 3.1185 2.5 4.47235C2.5 5.1985 3.21385 5.85081 4.34615 6.3185"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.34615 13.7034C3.21385 13.2357 2.5 12.5834 2.5 11.8573V4.47266"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.34615 10.0102C3.21385 9.54252 2.5 8.89022 2.5 8.16406"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.rightCardContainer}>
                  <h1 className={styles.heading}>Claim and Unstake</h1>
                  <div className={styles.rewardContainer}>
                    <div className={styles.rewardPTV}>
                      <p className={styles.small}>Rewards to Claim</p>
                      <p className={styles.heading}>
                        {" "}
                        <span className={styles.highlight}>PTV</span>{" "}
                        {/* {Number(
                          Number(
                            runningClaimAmount
                          ).toFixed(2)
                        )}{" "} */}
                        {Number(
                          Number(
                            runningClaimAmount
                          ).toFixed(2).toLocaleString()
                        )}

                      </p>
                    </div>
                    <div className={styles.hrDivider}></div>
                    <div className={styles.rewardPTV}>
                      <p className={styles.small}>Amount to Unstake</p>
                      <p className={styles.heading}>
                        {" "}
                        <span className={styles.highlight}>PTV</span>{" "}
                        {Number(
                          Number(
                            userStakingInfo.user_data.stake_amount
                          ).toFixed(2).toLocaleString()
                        )}{" "}
                      </p>
                    </div>
                  </div>

                  <div className={styles.footerBtnReward}>
                    <div
                      style={{
                        opacity: runningClaimAmount >= 1 ? "" : "0.4",
                      }}
                      className={styles.claimBtn}
                      onClick={() =>
                        runningClaimAmount >= 1
                          ? ClaimUserAmount(runningClaimAmount)
                          : ""
                      }
                    >
                      Claim
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5 6.30859V13.6932"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6.8125 10H14.1971"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14.8077 2H6.19231C4.15311 2 2.5 3.65311 2.5 5.69231V14.3077C2.5 16.347 4.15311 18 6.19231 18H14.8077C16.847 18 18.5 16.347 18.5 14.3077V5.69231C18.5 3.65311 16.847 2 14.8077 2Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div
                      className={styles.witdhdrawBtn}
                      onClick={() => {
                        UnStakeUserAmount();

                        // if (amountToUnstake >= 50) {
                        // let re = await UnStakeUserAmount(amountToUnstake);
                        // if (re) setAmountToUnstake(0);
                        // }
                      }}
                    >
                      Unstake
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9308 5.31641H7.07366C6.67918 5.31641 6.35938 5.63621 6.35938 6.03069V19.4235C6.35938 19.818 6.67918 20.1378 7.07366 20.1378H14.9308C15.3252 20.1378 15.6451 19.818 15.6451 19.4235V6.03069C15.6451 5.63621 15.3252 5.31641 14.9308 5.31641Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0045 14.5128C11.9907 14.5128 12.7902 13.7133 12.7902 12.7271C12.7902 11.7409 11.9907 10.9414 11.0045 10.9414C10.0182 10.9414 9.21875 11.7409 9.21875 12.7271C9.21875 13.7133 10.0182 14.5128 11.0045 14.5128Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.72469 7.57756H2.53383C2.34666 7.57756 2.16717 7.50231 2.03482 7.36836C1.90247 7.23441 1.82812 7.05272 1.82812 6.86328V2.57756C1.82812 2.38813 1.90247 2.20645 2.03482 2.07249C2.16717 1.93854 2.34666 1.86328 2.53383 1.86328H19.4707C19.6578 1.86328 19.8372 1.93854 19.9697 2.07249C20.1019 2.20645 20.1764 2.38813 20.1764 2.57756V6.86328C20.1764 7.05272 20.1019 7.23441 19.9697 7.36836C19.8372 7.50231 19.6578 7.57756 19.4707 7.57756H18.2798"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0067 8.47433C10.9081 8.47433 10.8281 8.39439 10.8281 8.29576C10.8281 8.19714 10.9081 8.11719 11.0067 8.11719"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0078 8.47433C11.1064 8.47433 11.1864 8.39439 11.1864 8.29576C11.1864 8.19714 11.1064 8.11719 11.0078 8.11719"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0067 17.4157C10.9081 17.4157 10.8281 17.3357 10.8281 17.2372C10.8281 17.1385 10.9081 17.0586 11.0067 17.0586"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.0078 17.4157C11.1064 17.4157 11.1864 17.3357 11.1864 17.2372C11.1864 17.1385 11.1064 17.0586 11.0078 17.0586"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* <div className={styles.rightCardContainer}>
                  <h1 className={styles.heading}>My PTV</h1>
                  <h2 className={styles.subHeading}>Claim your staking rewards above and manage your staked amount below.</h2>

                  <div className={styles.rewardPTV}>
                    <p className={styles.small}>Reward to claim</p>
                    <p className={styles.heading}> <span className={styles.highlight}>PTV</span> 5 </p>
                  </div>

                  <div className={styles.claimBtn}>Claim
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 6.30859V13.6932" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M6.8125 10H14.1971" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M14.8077 2H6.19231C4.15311 2 2.5 3.65311 2.5 5.69231V14.3077C2.5 16.347 4.15311 18 6.19231 18H14.8077C16.847 18 18.5 16.347 18.5 14.3077V5.69231C18.5 3.65311 16.847 2 14.8077 2Z" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.rewardPTV}>
                    <p className={styles.small}>Amount to Withdraw</p>
                    <p className={styles.heading}> <span className={styles.highlight}>PTV</span> 55 </p>
                  </div>

                  <div className={styles.witdhdrawBtn}>

                    Withdraw
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.9308 5.31641H7.07366C6.67918 5.31641 6.35938 5.63621 6.35938 6.03069V19.4235C6.35938 19.818 6.67918 20.1378 7.07366 20.1378H14.9308C15.3252 20.1378 15.6451 19.818 15.6451 19.4235V6.03069C15.6451 5.63621 15.3252 5.31641 14.9308 5.31641Z" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M11.0045 14.5128C11.9907 14.5128 12.7902 13.7133 12.7902 12.7271C12.7902 11.7409 11.9907 10.9414 11.0045 10.9414C10.0182 10.9414 9.21875 11.7409 9.21875 12.7271C9.21875 13.7133 10.0182 14.5128 11.0045 14.5128Z" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M3.72469 7.57756H2.53383C2.34666 7.57756 2.16717 7.50231 2.03482 7.36836C1.90247 7.23441 1.82812 7.05272 1.82812 6.86328V2.57756C1.82812 2.38813 1.90247 2.20645 2.03482 2.07249C2.16717 1.93854 2.34666 1.86328 2.53383 1.86328H19.4707C19.6578 1.86328 19.8372 1.93854 19.9697 2.07249C20.1019 2.20645 20.1764 2.38813 20.1764 2.57756V6.86328C20.1764 7.05272 20.1019 7.23441 19.9697 7.36836C19.8372 7.50231 19.6578 7.57756 19.4707 7.57756H18.2798" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M11.0067 8.47433C10.9081 8.47433 10.8281 8.39439 10.8281 8.29576C10.8281 8.19714 10.9081 8.11719 11.0067 8.11719" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M11.0078 8.47433C11.1064 8.47433 11.1864 8.39439 11.1864 8.29576C11.1864 8.19714 11.1064 8.11719 11.0078 8.11719" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M11.0067 17.4157C10.9081 17.4157 10.8281 17.3357 10.8281 17.2372C10.8281 17.1385 10.9081 17.0586 11.0067 17.0586" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                      <path d="M11.0078 17.4157C11.1064 17.4157 11.1864 17.3357 11.1864 17.2372C11.1864 17.1385 11.1064 17.0586 11.0078 17.0586" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round" />
                    </svg>

                  </div>


                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.stackingWrapper}>
          <div className={styles.container}>
            <div className={styles.layoutGrid}>
              <div className={styles.column}>
                <div className={styles.rightHeader}>
                  <div className={styles.investPT} id="tour-staking">
                    Stake Your <span>PT Virtuals</span>
                    {/* <i onClick={DriverPopup}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 16V12"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8H12.01"
                          stroke="#D376FF"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </i> */}
                  </div>
                  <p>
                    Enjoy a 120% APY by staking your PTV tokens! Plus, unlock
                    exciting ecosystem rewards to enhance your trading journey!
                  </p>
                </div>

                <div className={styles.cardPTV}>
                  <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div className={styles.investP}>
                      <p id="step2">Choose Amount</p>
                      <div className={styles.flexRow}>
                        <p
                          className={styles.smallText}
                          style={{ marginRight: 4 }}
                        >
                          Minimum staking amount is{" "}
                          <span className={styles.highlight}>PTV</span> 50.00.
                        </p>
                      </div>
                    </div>

                    <div className={styles.investP} style={{ width: 214 }}>
                      <div className={styles.flexRow}>
                        <p
                          className={styles.smallText}
                          style={{ marginRight: 4 }}
                        >
                          Total Balance:{" "}
                          <div style={{ fontSize: 18, display: 'inline', fontWeight: 600 }}><span className={styles.highlight}>PTV</span> {UserBln.balance === -1 ? 0 : Number(UserBln.balance).toFixed(2)}</div>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sliderContainer}>

                    {/* Modal */}
                    {isUserBlnLoaded && UserBln.balance < 50 && <EnoughPtv />}

                    <div className={styles.slider} id="step3">
                      <RangeSlider
                        value={sliderValue}
                        onChange={handleSliderChange}
                        maxValue={UserBln.balance}
                      />
                    </div>
                    <div className={styles.quantity}>
                      <p>Quantity</p>
                      <div className={styles.qtyBtn}>
                        <span className={styles.highlight}>PTV</span>
                        <input
                          placeholder={sliderValue}
                          value={sliderValue}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (
                              e.target.value === "" ||
                              (!isNaN(newValue) &&
                                newValue >= 0 &&
                                newValue <= UserBln.balance)
                            ) {
                              setSliderValue(
                                e.target.value === "" ? 0 : newValue
                              );
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={styles.footerWrapper}>
                    <div className={styles.footerCard}>
                      <p>
                        APY {userStakingInfo.apr}%
                        <svg
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: "4px" }}
                        >
                          <path
                            d="M6.13173 0.339232C6.2722 0.0195594 6.72613 0.0207263 6.86496 0.341117L12.3949 13.1035C12.5584 13.4809 12.1144 13.8297 11.7865 13.5815L6.73678 9.75949C6.59642 9.65326 6.40311 9.65127 6.26059 9.75459L1.19455 13.4274C0.864226 13.6668 0.429427 13.3161 0.593561 12.9426L6.13173 0.339232Z"
                            fill="#5BF4AB"
                          />
                        </svg>
                      </p>
                      <div
                        id="step4"
                        className={styles.footerBtn}
                        onClick={() => {
                          StakeUserAmount(sliderValue);

                          // let re = await StakeUserAmount(sliderValue);
                          // console.log(re);
                          // if (re == true) setSliderValue(0);
                        }}
                      >
                        Stake
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12.9603 10.6145C16.0192 10.6145 18.4988 9.51242 18.4988 8.15294C18.4988 6.79347 16.0192 5.69141 12.9603 5.69141C9.90153 5.69141 7.42188 6.79347 7.42188 8.15294C7.42188 9.51242 9.90153 10.6145 12.9603 10.6145Z"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M7.42188 8.15234V15.537C7.42188 16.8908 9.88341 17.9985 12.9603 17.9985C16.0373 17.9985 18.4988 16.8908 18.4988 15.537V8.15234"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.4988 11.8477C18.4988 13.2015 16.0373 14.3092 12.9603 14.3092C9.88341 14.3092 7.42188 13.2015 7.42188 11.8477"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.8385 3.24158C11.4003 2.35403 9.72625 1.92479 8.03846 2.0108C4.97385 2.0108 2.5 3.1185 2.5 4.47235C2.5 5.1985 3.21385 5.85081 4.34615 6.3185"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.34615 13.7034C3.21385 13.2357 2.5 12.5834 2.5 11.8573V4.47266"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M4.34615 10.0102C3.21385 9.54252 2.5 8.89022 2.5 8.16406"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.rightCardContainer}>
                  <h1 className={styles.heading}>Claim and Unstake</h1>
                  <h2 className={styles.subHeading}>
                    Claim your staking rewards and manage your staked amount
                    below.
                  </h2>

                  <div className={styles.rewardPTV}>
                    <p className={styles.small}>Rewards to Claim</p>
                    <p className={styles.heading}>
                      {" "}
                      <span className={styles.highlight}>PTV</span>{" "}
                      {/* {Number(
                        Number(runningClaimAmount).toFixed(
                          4
                        )
                      )}{" "} */}
                      {runningClaimAmount}
                    </p>
                  </div>

                  <div
                    id="step5"
                    style={{
                      opacity: runningClaimAmount >= 1 ? "" : "0.4",
                    }}
                    className={styles.claimBtn}
                    onClick={() =>
                      runningClaimAmount >= 1
                        ? ClaimUserAmount(runningClaimAmount)
                        : ""
                    }
                  >
                    Claim
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5 6.30859V13.6932"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.8125 10H14.1971"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.8077 2H6.19231C4.15311 2 2.5 3.65311 2.5 5.69231V14.3077C2.5 16.347 4.15311 18 6.19231 18H14.8077C16.847 18 18.5 16.347 18.5 14.3077V5.69231C18.5 3.65311 16.847 2 14.8077 2Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <small className={styles.labelMinMax}>Min: PTV 1</small>

                  <div className={styles.divider}></div>
                  <div style={{ display: "flex" }}>
                    <div className={styles.rewardPTV}>
                      <p className={styles.small}>Staked Amount</p>
                      <p className={styles.heading}>
                        {" "}
                        <span className={styles.highlight}>PTV</span>{" "}
                        {Number(
                          Number(
                            userStakingInfo.user_data.stake_amount
                          ).toFixed(3)
                        ).toLocaleString()}{" "}
                      </p>
                    </div>
                    {/* <div className={styles.rewardPTV}>
                      <p className={styles.small}>Amount to Unstake</p>

                      <input
                        type="number"
                        className={styles.unstakeinp}
                        value={amountToUnstake}
                        max={amountToUnstake}
                        onChange={(e) =>
                          e.target.value <=
                          Number(userStakingInfo.user_data.stake_amount)
                            ? setAmountToUnstake(e.target.value)
                            : amountToUnstake
                        }
                      />
                    </div> */}
                  </div>
                  <div
                    className={styles.witdhdrawBtn}
                    onClick={() => {
                      // if (amountToUnstake >= 50) {
                      // let re = await UnStakeUserAmount(amountToUnstake);
                      // if (re) setAmountToUnstake(0);
                      UnStakeUserAmount();

                      // }
                    }}
                  >
                    Unstake
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9308 5.31641H7.07366C6.67918 5.31641 6.35938 5.63621 6.35938 6.03069V19.4235C6.35938 19.818 6.67918 20.1378 7.07366 20.1378H14.9308C15.3252 20.1378 15.6451 19.818 15.6451 19.4235V6.03069C15.6451 5.63621 15.3252 5.31641 14.9308 5.31641Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0045 14.5128C11.9907 14.5128 12.7902 13.7133 12.7902 12.7271C12.7902 11.7409 11.9907 10.9414 11.0045 10.9414C10.0182 10.9414 9.21875 11.7409 9.21875 12.7271C9.21875 13.7133 10.0182 14.5128 11.0045 14.5128Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.72469 7.57756H2.53383C2.34666 7.57756 2.16717 7.50231 2.03482 7.36836C1.90247 7.23441 1.82812 7.05272 1.82812 6.86328V2.57756C1.82812 2.38813 1.90247 2.20645 2.03482 2.07249C2.16717 1.93854 2.34666 1.86328 2.53383 1.86328H19.4707C19.6578 1.86328 19.8372 1.93854 19.9697 2.07249C20.1019 2.20645 20.1764 2.38813 20.1764 2.57756V6.86328C20.1764 7.05272 20.1019 7.23441 19.9697 7.36836C19.8372 7.50231 19.6578 7.57756 19.4707 7.57756H18.2798"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0067 8.47433C10.9081 8.47433 10.8281 8.39439 10.8281 8.29576C10.8281 8.19714 10.9081 8.11719 11.0067 8.11719"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0078 8.47433C11.1064 8.47433 11.1864 8.39439 11.1864 8.29576C11.1864 8.19714 11.1064 8.11719 11.0078 8.11719"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0067 17.4157C10.9081 17.4157 10.8281 17.3357 10.8281 17.2372C10.8281 17.1385 10.9081 17.0586 11.0067 17.0586"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.0078 17.4157C11.1064 17.4157 11.1864 17.3357 11.1864 17.2372C11.1864 17.1385 11.1064 17.0586 11.0078 17.0586"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <small className={styles.labelMinMaxBottom}>Min: PTV 50</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const RangeSlider = ({ value, onChange, maxValue }) => {
  const [tooltipValue, setTooltipValue] = useState(value);
  const steps = 4;
  const stepValue = parseInt((maxValue / steps).toFixed(2));

  useEffect(() => {
    const setValue = () => {
      const newValue = Number(((value - 0) * 100) / (maxValue - 0));
      let newPosition = 13;
      if (newValue > 25) {
        newPosition = 16 - newValue * 0.32;
      }
      setTooltipValue(value);
      document.documentElement.style.setProperty(
        "--range-progress",
        `calc(${newValue}% + (${newPosition}px))`
      );
    };
    setValue();
  }, [value, maxValue]);

  useEffect(() => {
    console.log('--- stepvalue, value, maxValue', stepValue, value, maxValue);
  }, [stepValue, value, maxValue]);

  const handleChange = (e) => {
    const newValue = parseFloat((parseFloat(e.target.value)).toFixed(2));
    setTooltipValue(newValue);
    onChange(newValue);
  };

  const selectedPercentage =
    maxValue === 0 ? 0 : ((value / maxValue) * 100).toFixed(2);

  const selectedPercentageTooltip =
    maxValue === 0
      ? 0
      : value > 0.1 * maxValue
        ? ((value / maxValue) * 100)
        : 8;

  return (
    <div className={styles.slider}>
      <div className="tooltip_slider">
        <span
          style={{ left: `calc(${selectedPercentageTooltip}%)` }}
          className={styles.btnSliderTop}
        >
          {" "}
          <span className={styles.highlight}>PTV</span> {tooltipValue}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <input
          className={styles.sliderRange}
          type="range"
          step={0.001}
          value={value}
          min="0"
          max={maxValue}
          onChange={handleChange}
        />
        <div className={styles.rangeSteps}>
          {Array.from({ length: steps + 1 }).map((_, index) => (
            <span key={index} onClick={() => onChange(parseFloat((index * stepValue).toFixed(2)))}
            ></span>
          ))}
        </div>
      </div>
      <div className={styles.sliderDescription}>
        <div className={styles.left}>
          {selectedPercentage}%
          <span>of available balance</span>
        </div>
        <div className={styles.right}>
          <i className={styles.highlight}>PTV</i>{" "}
          {maxValue === - 1 ? 0 : Number(Number(maxValue).toFixed(2)).toLocaleString()}
          <span>Total balance</span>
        </div>
      </div>
      {/* <div className={styles.steps}>
        {Array.from({ length: steps + 1 }, (_, i) => (
          <div
            key={i}
            className={styles.step}
            style={{ left: `calc(${(i * 100) / steps}%)` }}
            onClick={() => onChange(parseFloat((i * stepValue).toFixed(2)))}
          >
            {parseFloat((i * stepValue).toFixed(2))}
          </div>
        ))}
      </div> */}
    </div>
  );
};

const RangeSliderMobile = ({ value, onChange, maxValue, setSliderValue, UserBln }) => {
  // const [value, setValue] = useState(100);
  const [tooltipValue, setTooltipValue] = useState(value);
  const total = 3000;

  useEffect(() => {
    const setValue = () => {
      const newValue = Number(((value - 0) * 100) / (maxValue - 0));
      const newPosition = 16 - newValue * 0.32;
      setTooltipValue(value);
      document.documentElement.style.setProperty(
        "--range-progress",
        `calc(${newValue}% + (${newPosition}px))`
      );
    };
    setValue();
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setTooltipValue(newValue);
    onChange(newValue);
  };

  const selectedPercentage =
    maxValue == 0 ? 0 : ((value / maxValue) * 100).toFixed(1);

  return (
    <div className={styles.slider}>
      {/* <div className="tooltip_slider">
        <span style={{ left: `calc(${selectedPercentage}%)` }} className={styles.btnSliderTop}> <span className={styles.highlight}>PTV</span> {tooltipValue}</span>
      </div> */}
      <div className={styles.sliderDescription}>
        {/* Percentage block */}
        <div className={styles.left}>
          {Number(Number(selectedPercentage).toFixed(2))}%
          <span>of available balance</span>
        </div>
        {/* Max PTV block */}
        <div className={styles.right}>
          <i className={styles.highlight}>PTV</i>{" "}
          <input
            placeholder={value}
            value={value}
            onChange={(e) => {
              const newValue = parseInt(e.target.value);
              if (
                e.target.value === "" ||
                (!isNaN(newValue) &&
                  newValue >= 0 &&
                  newValue <= UserBln.balance)
              ) {
                setSliderValue(
                  e.target.value === "" ? 0 : newValue
                );
              }
            }}
          />
        </div>
      </div>
      <input
        className={styles.sliderRange}
        type="range"
        step="10"
        value={value}
        min="0"
        max={maxValue}
        onChange={handleChange}
      />
    </div>
  );
};

const InfoIcon = () => {
  return (
    <svg
      style={{ marginRight: 7, height: 16, width: 16 }}
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3286_122211)">
        <path
          d="M9.9974 18.3346C14.5998 18.3346 18.3307 14.6037 18.3307 10.0013C18.3307 5.39893 14.5998 1.66797 9.9974 1.66797C5.39502 1.66797 1.66406 5.39893 1.66406 10.0013C1.66406 14.6037 5.39502 18.3346 9.9974 18.3346Z"
          stroke="#BEBEBE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 6.66797V10.0013"
          stroke="#BEBEBE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 13.332H10.0083"
          stroke="#BEBEBE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3286_122211">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Staking;
