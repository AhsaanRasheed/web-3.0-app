"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./tradingView.module.scss";
import TradingViewWidget from "./TradingViewWidget";
export default function TradingViewChart({}) {
  const [IsOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      //   onClose();
      // handleClose();
      setIsOpen(false);
    }
  };

  return (
    <>
      <div
        className={`${style.tradingCon} ${
          IsOpen == true ? style.SideMenuConOpen : style.SideMenuConClose
        }`}
        ref={modalRef}
      >
        <div className={style.body}>
          <div className={style.topCardMenu} onClick={() => setIsOpen(!IsOpen)}>
            <label>
              TradingView Chart 
            </label>{IsOpen ? <DownArrowIcon />:<UpArrowIcon />}
          </div>
          <TradingViewWidget />
        </div>
      </div>
      {IsOpen && (
        <div className={style.modalContainer} onClick={handleClick}></div>
      )}
    </>
  );
}

const DownArrowIcon = () => {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9997 15.1617C11.8791 15.1617 11.767 15.1425 11.6631 15.104C11.5593 15.0656 11.4606 14.9996 11.367 14.906L6.87276 10.4117C6.73429 10.2733 6.66346 10.0993 6.66026 9.88965C6.65704 9.68003 6.72788 9.50279 6.87276 9.35792C7.01763 9.21306 7.19326 9.14062 7.39966 9.14062C7.60606 9.14062 7.78169 9.21306 7.92656 9.35792L11.9997 13.431L16.0728 9.35792C16.2112 9.21947 16.3852 9.14864 16.5949 9.14542C16.8045 9.14222 16.9817 9.21306 17.1266 9.35792C17.2714 9.50279 17.3439 9.67843 17.3439 9.88485C17.3439 10.0912 17.2714 10.2669 17.1266 10.4117L12.6323 14.906C12.5388 14.9996 12.44 15.0656 12.3362 15.104C12.2324 15.1425 12.1202 15.1617 11.9997 15.1617Z"
        fill="white"
      />
    </svg>
  );
};
const UpArrowIcon = () => {
  return (
    <svg
      id="up"
      width="28"
      height="29"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.39953 15.5382L6.3457 14.4844L11.9995 8.83057L17.6534 14.4844L16.5995 15.5382L11.9995 10.9382L7.39953 15.5382Z"
        fill="white"
      />
    </svg>
  );
};
