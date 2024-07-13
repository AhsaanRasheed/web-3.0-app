"use client";
import React, { useRef } from "react";
import style from "./style.module.scss";
import Button from "../global/Button/Button";
import TextButton from "../global/Button/TextButton";
export default function ConfirmationBox({
  title,
  para,
  acceptBtnTxt,
  rejectBtnTxt,
  showAlert,
  btnOrder,
  onClose,
  onAccept,
  onReject,
  isMobileView = false,
}) {
  const modalRef = useRef(null);
  const isReverseOrder = btnOrder === "reverse";
  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  return showAlert ? (
    <div className={style.modalContainer} onClick={handleClick}>
      <div
        // className="component-container"
        className={style.Modal}
        ref={modalRef}
        style={{ flexDirection: "column" }}
      >
        <div className={style.cross_div}>
          <img
            src="/icons/cross.png"
            width="12.7px"
            height="12.7px"
            onClick={() => onClose()}
            alt="cross"
          />
        </div>

        <div className={style.ModalBody}>
          <div className={style.center_container}>
            <label
              className={`${
                isMobileView ? `txt_Large_title` : `txt_Heading1`
              } txt_align_center`}
            >
              {title}
            </label>
            <br />
            <label
              className={`${
                isMobileView ? `txt_Heading5` : `txt_Title3`
              } txt_align_center`}
              style={{ color: "var(--primary-Neutrals-strong-color)" }}
            >
              {para}
            </label>
            <br />
          </div>

          <div className={style.BtnContainer}>
            <div className={style.BtnCover}>
              <TextButton
                text={rejectBtnTxt}
                onClick={onReject}
                Custom_width={"100%"}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
              />
            </div>
            <div className={style.BtnCover}>
              <Button
                text={acceptBtnTxt}
                onClick={onAccept}
                Custom_width={"100%"}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
              />
            </div>
            {/* <div className={style.btn_box}>
                {isReverseOrder ? (
                  // Render in reverse order
                  <>
                    <div onClick={onReject}>
                      <p className="info-plain-text">{rejectBtnTxt}</p>
                    </div>
                    <button
                      type="button"
                      className="button-style"
                      onClick={onAccept}
                    >
                      <p className="button-text">{acceptBtnTxt}</p>
                    </button>
                  </>
                ) : (
                  // Render in default order
                  <>
                    <button
                      type="button"
                      className="button-style"
                      onClick={onAccept}
                    >
                      <p className="button-text">{acceptBtnTxt}</p>
                    </button>
                    <div onClick={onReject}>
                      <p className="info-plain-text">{rejectBtnTxt}</p>
                    </div>
                  </>
                )}
              </div> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
