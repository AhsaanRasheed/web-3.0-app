"use client";
import React, { useRef, useEffect, useState } from "react";
import style from "./style.module.scss";
export default function Page({ showModal = true, onClose }) {
  const modalRef = useRef(null);
  const [alignSelfStart, setAlignSelfStart] = useState("center");
  const [balance, setBalance] = useState(1000);
  const [btcCoin, setBtcCoin] = useState(0);
  const [ethCoin, setEthCoin] = useState(0);
  const [solCoin, setSolCoin] = useState(0);

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
  const onSubmit = () => {
    secureLocalStorage.clear();
    localStorage.clear();
    window.location.href = "/auth/signin/";
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
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="white"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="white"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          className={`${style.body} ${
            balance - btcCoin - ethCoin - solCoin < 0 && style.belowBln
          }`}
        >
          <div className={style.head}>
            <div className={style.title}>
              <label>Choose your allocation</label>
            </div>

            <div className={style.subtitle}>
              {balance - btcCoin - ethCoin - solCoin < 0 ? (
                <label>
                  You have exceeded your available balance. Please adjust your
                  allocations so the total token holdings do not exceed your
                  available USD balance.
                </label>
              ) : (
                <label>This allocation is for the game you entered</label>
              )}
            </div>
          </div>
          <div className={style.blnCon}>
            <div className={style.title}>
              <label>Available Balance</label>
            </div>
            <div className={style.bln}>
              <label>
                <span>USD</span>{" "}
                {Number(
                  Number(balance - btcCoin - ethCoin - solCoin).toFixed(2)
                ).toLocaleString()}
              </label>
            </div>
          </div>

          <div className={style.rowCoin}>
            <div className={style.tokenCon}>
              <div className={style.logoCon}>
                <img src="/tvt/coin/btc.png" />
              </div>
              <div className={style.subtitle}>
                <label>BTC</label>
              </div>
              <CounterInput value={btcCoin} onChange={(e) => setBtcCoin(e)} />
            </div>
            <div className={style.tokenCon}>
              <div className={style.logoCon}>
                <img src="/tvt/coin/eth.png" />
              </div>
              <div className={style.subtitle}>
                <label>ETH</label>
              </div>
              <CounterInput value={ethCoin} onChange={(e) => setEthCoin(e)} />
            </div>
            <div className={style.tokenCon}>
              <div className={style.logoCon}>
                <img src="/tvt/coin/sol.png" />
              </div>
              <div className={style.subtitle}>
                <label>SOL</label>
              </div>
              <CounterInput value={solCoin} onChange={(e) => setSolCoin(e)} />
            </div>
          </div>
          <div className={style.btnCon}>
            <button
              type="button"
              className={`${style.button} ${style.Outlinebutton}`}
              onClick={() => {}}
            >
              <div className={style.body}>Back</div>
            </button>
            <button type="button" className={style.button} onClick={() => {}}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CounterInput = ({ value, onChange }) => {
  return (
    <div className={style.counterInput}>
      <div>
        <span>USD</span>
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
      <div className={style.counterIconDiv}>
        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => onChange(value + 100)}
        >
          <path
            d="M4.5 10L8.5 6L12.5 10"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (value > 0) onChange(value - 100);
          }}
        >
          <path
            d="M4.5 6L8.5 10L12.5 6"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
