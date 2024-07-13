"use client";
import React, { useRef, useEffect, useState } from "react";
import style from "./style.module.scss";
export default function Modal({ showModal, onClose, children }) {
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
        <div className={style.cross_div} onClick={()=>onClose()}>
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
        <div>{children}</div>
      </div>
    </div>
  );
}
