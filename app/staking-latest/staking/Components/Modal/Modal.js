"use client";
import React, { useRef, useEffect, useState } from "react";
import style from "./style.module.scss";
export default function StakingModal({
  showModal,
  onClose,
  onStake,
  onUnstake,
  onClaim,
  type,
  stakeAmount = 0,
  claimAmount = 0,
  stakedTotalAmount = 0,
  txHash,
}) {
  //  type = stake / unstake / claim

  const modalRef = useRef(null);
  const [alignSelfStart, setAlignSelfStart] = useState("center");
  const [showSuccess, setShowSuccess] = useState(null);
  const [showSuccessAmount, setShowSuccessAmount] = useState(0);
  const [toUnstakeAmount, setToUnstakeAmount] = useState(null);
  const stakedMinimumeAmount = 50;

  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (modalRef && modalRef.current) {
        const divHeight = modalRef.current.clientHeight;

        if (divHeight > 0.95 * window.innerHeight) {
          setAlignSelfStart("flex-start");
        } else {
          setAlignSelfStart("center");
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showModal]);
  const onSubmit = async () => {
    if (type == "stake") {
      let respStake = await onStake(stakeAmount);
      if (respStake == true) {
        onClose();
        setShowSuccess("staked");
        setShowSuccessAmount(stakeAmount);
      }
    } else if (type == "unstake") {
      let respUnstake = await onUnstake(toUnstakeAmount);
      if (respUnstake == true) {
        onClose();
        setShowSuccess("Unstaked");
        setShowSuccessAmount(toUnstakeAmount);
      }
    } else if (type == "claim") {
      let respClaim = await onClaim();
      if (respClaim == true) {
        onClose();
        setShowSuccess("claimed");
        setShowSuccessAmount(claimAmount);
      }
    }
  };
  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className={style.modalContainer}
      onClick={handleClick}
    >
      <div
        className={style.Modal}
        ref={modalRef}
        style={{
          flexDirection: "column",
          alignSelf: alignSelfStart,
          marginTop: alignSelfStart !== "center" ? "20px" : "0",
        }}
      >
        <div className={style.cross_div} onClick={() => onClose()}>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6.5L6 18.5"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6.5L18 18.5"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className={style.bodyCon}>
          {showSuccess != null ? (
            <StakeSuccessModal
              amount={showSuccessAmount}
              type={showSuccess}
              txHash={txHash}
            />
          ) : (
            <>
              <div className={style.title}>
                <label>
                  {type == "stake"
                    ? "Stake"
                    : type == "unstake"
                    ? "Unstake"
                    : "Claim"}{" "}
                  <label className={style.colorLbl}>PT Virtuals</label>
                </label>
              </div>
              {type == "stake" && (
                <div className={style.msg}>
                  <label>Amount that will be staked</label>
                </div>
              )}
              {type == "unstake" && (
                <div className={style.msg}>
                  <label>Select the amount you want to unstake.</label>
                </div>
              )}

              {(type == "stake" || type == "claim") && (
                <div className={style.amount}>
                  <label>
                    <label className={style.colorLbl}>PTV</label>{" "}
                    {type == "stake"
                      ? Number(Number(stakeAmount).toFixed(3)).toLocaleString()
                      : Number(Number(claimAmount).toFixed(3)).toLocaleString()}
                  </label>
                </div>
              )}
              {type == "unstake" && (
                <div className={style.inputBox}>
                  <div className={style.inputCon}>
                    <label className={style.highlight}>PTV</label>
                    <input
                      type="number"
                      max={Number(stakedTotalAmount)}
                      value={toUnstakeAmount}
                      placeholder="0"
                      onChange={(e) => setToUnstakeAmount(e.target.value)}
                    />
                  </div>
                  <label className={style.lowerTitle}>
                    Min: PTV {stakedMinimumeAmount}&#160;&#160;&#160;&#160;Max:
                    PTV{" "}
                    {Number(
                      Number(stakedTotalAmount).toFixed(3)
                    ).toLocaleString()}
                  </label>
                </div>
              )}

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
                  onClick={() => onSubmit()}
                >
                  {type == "stake" && (
                    <>
                      {" "}
                      Stake Now <StakeIcon />
                    </>
                  )}
                  {type == "unstake" && (
                    <>
                      Unstake <UnStakeIcon />
                    </>
                  )}
                  {type == "claim" && (
                    <>
                      Claim Now <ClaimIcon />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const StakeIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.9608 11.1145C16.0197 11.1145 18.4993 10.0124 18.4993 8.65294C18.4993 7.29347 16.0197 6.19141 12.9608 6.19141C9.90202 6.19141 7.42236 7.29347 7.42236 8.65294C7.42236 10.0124 9.90202 11.1145 12.9608 11.1145Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.42236 8.65234V16.037C7.42236 17.3908 9.8839 18.4985 12.9608 18.4985C16.0377 18.4985 18.4993 17.3908 18.4993 16.037V8.65234"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4993 12.3477C18.4993 13.7015 16.0377 14.8092 12.9608 14.8092C9.8839 14.8092 7.42236 13.7015 7.42236 12.3477"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8389 3.74158C11.4008 2.85403 9.72674 2.42479 8.03895 2.5108C4.97433 2.5108 2.50049 3.6185 2.50049 4.97235C2.50049 5.6985 3.21433 6.35081 4.34664 6.8185"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.34664 14.2034C3.21433 13.7357 2.50049 13.0834 2.50049 12.3573V4.97266"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.34664 10.5102C3.21433 10.0425 2.50049 9.39022 2.50049 8.66406"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const UnStakeIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9286 5.31641H7.07146C6.67698 5.31641 6.35718 5.63621 6.35718 6.03069V19.4235C6.35718 19.818 6.67698 20.1378 7.07146 20.1378H14.9286C15.323 20.1378 15.6429 19.818 15.6429 19.4235V6.03069C15.6429 5.63621 15.323 5.31641 14.9286 5.31641Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0003 14.5128C11.9865 14.5128 12.786 13.7133 12.786 12.7271C12.786 11.7409 11.9865 10.9414 11.0003 10.9414C10.0141 10.9414 9.2146 11.7409 9.2146 12.7271C9.2146 13.7133 10.0141 14.5128 11.0003 14.5128Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.72249 7.57756H2.53163C2.34446 7.57756 2.16497 7.50231 2.03262 7.36836C1.90028 7.23441 1.82593 7.05272 1.82593 6.86328V2.57756C1.82593 2.38813 1.90028 2.20645 2.03262 2.07249C2.16497 1.93854 2.34446 1.86328 2.53163 1.86328H19.4685C19.6556 1.86328 19.835 1.93854 19.9675 2.07249C20.0998 2.20645 20.1742 2.38813 20.1742 2.57756V6.86328C20.1742 7.05272 20.0998 7.23441 19.9675 7.36836C19.835 7.50231 19.6556 7.57756 19.4685 7.57756H18.2776"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0006 8.47433C10.902 8.47433 10.822 8.39439 10.822 8.29576C10.822 8.19714 10.902 8.11719 11.0006 8.11719"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9998 8.47433C11.0984 8.47433 11.1783 8.39439 11.1783 8.29576C11.1783 8.19714 11.0984 8.11719 10.9998 8.11719"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0006 17.4157C10.902 17.4157 10.822 17.3357 10.822 17.2372C10.822 17.1385 10.902 17.0586 11.0006 17.0586"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9998 17.4157C11.0984 17.4157 11.1783 17.3357 11.1783 17.2372C11.1783 17.1385 11.0984 17.0586 10.9998 17.0586"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ClaimIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 6.30859V13.6932"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.30859 10H13.6932"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3077 2H5.69231C3.65311 2 2 3.65311 2 5.69231V14.3077C2 16.347 3.65311 18 5.69231 18H14.3077C16.347 18 18 16.347 18 14.3077V5.69231C18 3.65311 16.347 2 14.3077 2Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const StakeSuccessModal = ({ amount, type, txHash }) => {
  const randomNumber = Math.random();

  return (
    <>
      <div className={style.svgCon}>
        {/* <img  src={`/icons/successMsg.gif?cache=${randomNumber}`} alt="success"  /> */}
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
          You have successfully {type}{" "}
          <label className={style.colorLbl}>PTV</label> {amount}
        </label>
      </div>
      <a href={txHash} target="_blank" className={style.belowLink}>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 11.3333V16.3333C15.5 16.7754 15.3244 17.1993 15.0118 17.5118C14.6993 17.8244 14.2754 18 13.8333 18H4.66667C4.22464 18 3.80072 17.8244 3.48816 17.5118C3.17559 17.1993 3 16.7754 3 16.3333V7.16667C3 6.72464 3.17559 6.30072 3.48816 5.98816C3.80072 5.67559 4.22464 5.5 4.66667 5.5H9.66667"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 3H18V8"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.83333 12.1667L18 3"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <label> View transaction in explorer.</label>
      </a>
    </>
  );
};
