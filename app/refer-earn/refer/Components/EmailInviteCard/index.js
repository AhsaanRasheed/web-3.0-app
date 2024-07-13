"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import mainStyle from "../../style.module.scss";
import { QRCode } from "react-qrcode-logo";

export default function EmailInviteCard({ referalCode }) {
  const [openQrDropDown, setOpenQrDropDown] = useState(false);
  const [openQrModal, setOpenQrModal] = useState(false);

  const prevOpenQrDropDownRef = useRef(false);
  const QrCodeDropDowndivRef = useRef(null);

  let url =
    window.location.host.includes("sandbox") ||
    window.location.host.includes("local")
      ? "https://sandbox.primetrader.com/auth/signup/?rc=" + referalCode
      : "https://app.primetrader.com/auth/signup/?rc=" + referalCode;
  useEffect(() => {
    if (
      prevOpenQrDropDownRef.current &&
      !openQrDropDown &&
      QrCodeDropDowndivRef.current
    ) {
      QrCodeDropDowndivRef.current.classList.add(style.closecardInvite);
    }
    prevOpenQrDropDownRef.current = openQrDropDown;
  }, [openQrDropDown]);
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const handleClickCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setIsCopiedLink(true);
          setTimeout(() => {
            setIsCopiedLink(false);
          }, 1500); // Reset copied state after 1.5 seconds
        })
        .catch((error) => console.error("Failed to copy:", error));
    } else {
      const textField = document.createElement("textarea");
      textField.innerText = url;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setIsCopiedLink(true);
      setTimeout(() => {
        setIsCopiedLink(false);
      }, 1500); // Reset copied state after 1.5 seconds
    }
  };
  return (
    <div className={style.EmailInviteCardCon}>
      <div className={`${style.EmailInviteCard} ${style.mobRefer}`}>
        <div className={style.topRow}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 13C10.9295 13.5741 11.4774 14.0491 12.1066 14.3929C12.7357 14.7367 13.4315 14.9411 14.1467 14.9923C14.8618 15.0435 15.5796 14.9403 16.2513 14.6897C16.9231 14.4392 17.5331 14.047 18.04 13.54L21.04 10.54C21.9508 9.59695 22.4548 8.33394 22.4434 7.02296C22.432 5.71198 21.9061 4.45791 20.9791 3.53087C20.0521 2.60383 18.798 2.07799 17.487 2.0666C16.176 2.0552 14.913 2.55918 13.97 3.46997L12.25 5.17997"
              stroke="#D376FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.5002 10.9973C14.0707 10.4232 13.5228 9.94811 12.8936 9.60436C12.2645 9.2606 11.5687 9.05618 10.8535 9.00496C10.1384 8.95374 9.42061 9.05693 8.74885 9.30751C8.0771 9.5581 7.46709 9.95023 6.9602 10.4573L3.9602 13.4573C3.04941 14.4003 2.54544 15.6633 2.55683 16.9743C2.56822 18.2853 3.09407 19.5393 4.02111 20.4664C4.94815 21.3934 6.20221 21.9193 7.51319 21.9307C8.82418 21.9421 10.0872 21.4381 11.0302 20.5273L12.7402 18.8173"
              stroke="#D376FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <label>Invite by sharing your invitation link</label>
        </div>
        <div className={style.copyComponentCon}>
       
          <label className={style.mob_Cpylbl}>
          <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                stroke="#D376FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.0002 10.9973C13.5707 10.4232 13.0228 9.94811 12.3936 9.60436C11.7645 9.2606 11.0687 9.05618 10.3535 9.00496C9.63841 8.95374 8.92061 9.05693 8.24885 9.30751C7.5771 9.5581 6.96709 9.95023 6.4602 10.4573L3.4602 13.4573C2.54941 14.4003 2.04544 15.6633 2.05683 16.9743C2.06822 18.2853 2.59407 19.5393 3.52111 20.4664C4.44815 21.3934 5.70221 21.9193 7.01319 21.9307C8.32418 21.9421 9.58719 21.4381 10.5302 20.5273L12.2402 18.8173"
                stroke="#D376FF"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Your invitation link:
          </label>
          <div className={style.copyComponent}>
            <label className={style.desktopLbl}>{url}</label>{" "}
            <label className={style.mobLbl}>{truncateCenter(url, 8)}</label>{" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClickCopyLink}
            >
              <path
                d="M18.3077 15H10.6923C9.75767 15 9 14.1046 9 13V4C9 2.89543 9.75767 2 10.6923 2H18.3077C19.2423 2 20 2.89543 20 4V13C20 14.1046 19.2423 15 18.3077 15Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.53846 8H5.69231C5.24348 8 4.81303 8.21071 4.49567 8.58579C4.1783 8.96086 4 9.46957 4 10V19C4 19.5304 4.1783 20.0391 4.49567 20.4142C4.81303 20.7893 5.24348 21 5.69231 21H13.3077C13.7565 21 14.187 20.7893 14.5043 20.4142C14.8217 20.0391 15 19.5304 15 19V18"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div
              className={style.alert0}
              style={{
                display: isCopiedLink ? "flex" : "none",
              }}
            >
              <label>Copied</label>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={QrCodeDropDowndivRef}
        className={`${style.EmailInviteCard} ${
          openQrDropDown && style.opencardInvite
        }`}
      >
        <div
          className={style.MobDropArrow}
          onClick={() => {
            setOpenQrDropDown(!openQrDropDown);
          }}
        >
          <OpenDropDownArrow isOpen={openQrDropDown} />
        </div>
        <div className={style.topRow}>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.83301 10.8235V2H11.6565V10.8235H2.83301ZM4.59769 9.05884H9.89185V3.76468H4.59769V9.05884ZM2.83301 22V13.1765H11.6565V22H2.83301ZM4.59769 20.2353H9.89185V14.9412H4.59769V20.2353ZM14.0095 10.8235V2H22.833V10.8235H14.0095ZM15.7742 9.05884H21.0683V3.76468H15.7742V9.05884ZM20.6271 22V19.7941H22.833V22H20.6271ZM14.0095 15.3824V13.1765H16.2154V15.3824H14.0095ZM16.2154 17.5882V15.3824H18.4212V17.5882H16.2154ZM14.0095 19.7941V17.5882H16.2154V19.7941H14.0095ZM16.2154 22V19.7941H18.4212V22H16.2154ZM18.4212 19.7941V17.5882H20.6271V19.7941H18.4212ZM18.4212 15.3824V13.1765H20.6271V15.3824H18.4212ZM20.6271 17.5882V15.3824H22.833V17.5882H20.6271Z"
              fill="#D376FF"
            />
          </svg>

          <label>Invite by scanning the QR code</label>
        </div>
        <div className={style.qrBodyMob}>
          <label className={style.subtitle}>
            Invite by scanning the QR code
          </label>
          <QrCode url={url} />
        </div>

        <div className={style.btnCon}>
          <button
            type="button"
            className={mainStyle.button}
            onClick={() => setOpenQrModal(true)}
          >
            Show QR Code
          </button>
        </div>
      </div>
      {openQrModal && (
        <ReferEarnModal
          url={url}
          onClose={() => {
            setOpenQrModal(false);
          }}
        />
      )}
    </div>
  );
}
function truncateCenter(str, len) {
  if (str.length <= 16) {
    return str; // If the string is 10 characters or less, return it as is
  } else {
    const start = str.substring(0, len); // Extract first five characters
    const end = str.substring(str.length - (len - 2)); // Extract last five characters
    return start + "..." + end; // Concatenate the parts with "..."
  }
}

const QrCode = ({ url }) => {
  return (
    <>
      <div className={style.QrCodeCon}>
        <QRCode
          value={url}
          size={220}
          quietZone={2}
          logoImage={"/qrLogo.png"}
          logoHeight={80}
          logoWidth={80}
          // logoImage="/assets/qrlogo.svg"
        />
      </div>
    </>
  );
};

const OpenDropDownArrow = ({ isOpen }) => {
  return isOpen ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.58958 12.2559C5.26414 12.5814 4.73651 12.5814 4.41107 12.2559C4.08563 11.9305 4.08563 11.4028 4.41107 11.0774L9.41107 6.07741C9.73651 5.75197 10.2641 5.75197 10.5896 6.07741L15.5896 11.0774C15.915 11.4028 15.915 11.9305 15.5896 12.2559C15.2641 12.5814 14.7365 12.5814 14.4111 12.2559L10.0003 7.84518L5.58958 12.2559Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.58958 7.74408C5.26414 7.41864 4.73651 7.41864 4.41107 7.74408C4.08563 8.06951 4.08563 8.59715 4.41107 8.92259L9.41107 13.9226C9.73651 14.248 10.2641 14.248 10.5896 13.9226L15.5896 8.92259C15.915 8.59715 15.915 8.06951 15.5896 7.74408C15.2641 7.41864 14.7365 7.41864 14.4111 7.74408L10.0003 12.1548L5.58958 7.74408Z"
        fill="white"
      />
    </svg>
  );
};
function ReferEarnModal({ showModal = true, onClose, url }) {
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
                Invite by <label style={{ color: "#d376ff" }}>scanning</label>
              </label>
            </div>

            <div className={style.subtitle}>
              <label>Scan the QR code to refer</label>
            </div>
            <div className={style.QrCodeCon}>
              <QRCode
                value={url}
                size={320}
                quietZone={2}
                logoImage={"/qrLogo.png"}
                logoHeight={80}
                logoWidth={80}
                // logoImage="/assets/qrlogo.svg"
              />
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
