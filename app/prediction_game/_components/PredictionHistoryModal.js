"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import "../../DataTableGlobal.scss";

export default function PredictionHistoryModal({
  onClose,
  IsOpen,
  predHistory,
  onCollectAll,
}) {
  const modalRef = useRef(null);
  const [className, setClassName] = useState("");

  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      //   onClose();
      handleClose();
    } 
  };
  const handleClose = () => {
    setClassName(style.SideMenuConClose);
    setTimeout(() => {
      onClose();
    }, 800);
  };
  return (
    <div className={style.modalContainer} onClick={handleClick}>
      <div
        ref={modalRef}
        className={`${style.HistoryModal} ${
          IsOpen == true && style.SideMenuConOpen
        }  ${className}`}
      >
        <div className={style.topRow}>
          <div className={style.closeModalIcon} onClick={() => handleClose()}>
            <CrossIcon />
          </div>
        </div>

        <div className={style.TitleDiv}>
          <div className={style.title}>
            <label>Prediction History</label>
          </div>

          <div className={style.btnCon}>
            <button
              onClick={() => {
                onCollectAll();
                handleClose();
              }}
              className={style.button}
            >
              Collect All Winnings
            </button>
          </div>
        </div>
        <div>
          <div className="OurCustomTblContainer">
            <div
              className={`OurCustomTblContainer_content ${style.historyTbl} `}
            >
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      <label>Status</label>{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {predHistory.map((item, index) => (
                    <tr>
                      <td>#{item.epochId}</td>
                      <td>
                        {item.claimed == true ? (
                          <label className={style.winningCollected}>
                            <b>
                              <span>PTV</span>{" "}
                              {(
                                item.claimedAmount / 1000000000000000000
                              ).toFixed(1)}
                            </b>{" "}
                            Winnings Collected
                          </label>
                        ) : (
                          <label className={style.Participated}>
                            Participated
                          </label>
                        )}
                        {/* <label className={style.winningWaiting}>
                                Winnings waiting to be collected
                              </label> */}
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                    <td>#225</td>
                    <td>

                      <label className={style.winningWaiting}>
                        Winnings waiting to be collected
                      </label>
                    </td>
                  </tr>

                  <tr>
                    <td>#225</td>
                    <td>
                      <label className={style.winningCollected}>
                        <b>
                          <span>PTV</span> 100
                        </b>{" "}
                        Winnings Collected
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>#225</td>
                    <td>
                      <label className={style.Participated}>Participated</label>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CrossIcon = () => {
  return (
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
        stroke-linejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
