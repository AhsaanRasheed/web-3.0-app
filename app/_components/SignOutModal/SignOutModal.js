"use client";
import React, { useRef, useEffect, useState } from "react";
import style from "./style.module.scss";
import secureLocalStorage from "react-secure-storage";
export default function SignOutModal({ showModal = true, onClose }) {
  //  type = stake / unstake / claim

  const modalRef = useRef(null);
  const [alignSelfStart, setAlignSelfStart] = useState("center");

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
        <div className={style.bodyCon}>
          <>
            <div className={style.title}>
              <label>You are attempting to log out</label>
            </div>

            <div className={style.msg}>
              <label>Are you sure?</label>
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
                onClick={() => onSubmit()}
              >
                Log Out <LogoutIcon />
              </button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
}

const LogoutIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5H12.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66602 14.1654L2.49935 9.9987L6.66602 5.83203"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 10H12.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
