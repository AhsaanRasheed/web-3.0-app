"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import mainStyle from "../../style.module.scss";
import Modal from "@/app/_components/Modal";
export default function TopCard() {
  const [showEarnModal, setShowEarnModal] = useState(false);
  return (
    <>
      <div className={style.Topcard}>
        <div className={style.topBar}>
          <label className={style.title}>
            Invite Your Friends To{" "}
            <label className={style.SolidColor}>PrimeTrader</label>
          </label>
          <div className={style.details}>
            <label className={style.level}>
              Earn up to 50,000 PTV and Win amazing prizes by inviting your
              friends. To earn PrimeTrader Tokens share your referral code by
              emai l and on social media with your community.
            </label>
          </div>
        </div>
        <div className={style.topBar}>
          <label className={style.title}>
            How much will you <label className={style.SolidColor}>earn</label>?
          </label>
          <div className={`${style.details} ${style.hideOnMobile}`}>
            <div className={style.li}>
              <div className={style.dot} />
              <label className={style.type}>Direct Referral</label>
              <label className={style.level}>Level 1</label>

              <label className={style.value}>
                5000 <label className={style.ptv}>PTV</label>
              </label>
            </div>
            <div className={style.li}>
              <div className={style.dot} />
              <label className={style.type}>Indirect Referral</label>
              <label className={style.level}>Level 2</label>

              <label className={style.value}>
                2500 <label className={style.ptv}>PTV</label>
              </label>
            </div>
            <div className={style.li}>
              <div className={style.dot} />
              <label className={style.type}>Indirect Referral</label>
              <label className={style.level}>Level 3</label>

              <label className={style.value}>
                1000 <label className={style.ptv}>PTV</label>
              </label>
            </div>
          </div>
          <div
            className={style.SeeReferralBtn}
            onClick={() => setShowEarnModal(true)}
          >
            <label>See Referral Rewards</label>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15L13 10L8 5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      {showEarnModal && (
        <ReferEarnModal
          onClose={() => {
            setShowEarnModal(false);
          }}
        />
      )}
    </>
  );
}
function ReferEarnModal({ showModal = true, onClose }) {
  const modalRef = useRef(null);
  const [alignSelfStart, setAlignSelfStart] = useState("center");

  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
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
        <div className={style.bodyCon}>
          <>
            <div className={style.title}>
              <label>
                How much will you{" "}
                <label style={{ color: "#d376ff" }}>earn</label>?
              </label>
            </div>

            <div className={style.msg}>
              <div className={style.row}>
                {" "}
                <div className={style.dot} />
                <div className={style.rigthV}>
                  <label>Direct Referral</label>{" "}
                  <div className={style.btmRow}>
                    <label className={style.value}>
                      <label className={style.level}>Level 1</label> 5000{" "}
                      <label className={style.ptv}>PTV</label>
                    </label>
                  </div>
                </div>
              </div>
              <div className={style.row}>
                {" "}
                <div className={style.dot} />
                <div className={style.rigthV}>
                  <label>Direct Referral</label>{" "}
                  <div className={style.btmRow}>
                    <label className={style.value}>
                      <label className={style.level}>Level 2</label> 2500{" "}
                      <label className={style.ptv}>PTV</label>
                    </label>
                    <label className={style.value}>
                      <label className={style.level}>Level 3</label> 1000{" "}
                      <label className={style.ptv}>PTV</label>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={style.btnCon}>
              <button
                type="button"
                className={mainStyle.button}
                onClick={() => onClose()}
              >
                Done
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
