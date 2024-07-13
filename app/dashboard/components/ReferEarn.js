"use client";
import React, { useEffect, useState } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";
import { QRCode } from "react-qrcode-logo";

export default function ReferEarn({ isMobileView, referralCode }) {
  return (
    <div className={style.PageCard}>
      <div className={style.PageCardBody}>

      <div className={style.pageHeadingRow}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "24px",
            maxWidth: "24px",
            width: "24px",
            minHeight: "24px",
            maxHeight: "24px",
            height: "24px",
          }}
        >
          <path
            d="M20 12V22H4V12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 7H2V12H22V7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22V7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <label
          className={`${
            isMobileView
              ? mainStyle.title_semibold_16
              : mainStyle.title_semibold_20
          }`}
        >
          Refer & Earn
        </label>
      </div>
      <div style={{ height: "8px", width: "8px" }}></div>
      <div>
        <label
          className={`${
            isMobileView ? mainStyle.body_regular_12 : mainStyle.body_regular_16
          }`}
        >
          invite your friends to{" "}
          <label style={{ color: "#5BF4AB" }}>PrimeTrader</label> to earn
        </label>
      </div>
      <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>

      <div className={style.ReferEarnContainer}>
        <div className={style.left}>
          <div className={style.top}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                minWidth: "32px",
                maxWidth: "32px",
                width: "32px",
                minHeight: "32px",
                maxHeight: "32px",
                height: "32px",
              }}
            >
              <path
                d="M13.334 17.332C13.9066 18.0975 14.6371 18.7309 15.4761 19.1892C16.315 19.6476 17.2427 19.9201 18.1962 19.9884C19.1497 20.0567 20.1068 19.9191 21.0024 19.585C21.8981 19.2509 22.7115 18.7281 23.3873 18.052L27.3873 14.052C28.6017 12.7946 29.2737 11.1106 29.2585 9.36264C29.2433 7.61466 28.5422 5.94258 27.3061 4.70653C26.0701 3.47047 24.398 2.76935 22.65 2.75416C20.902 2.73897 19.218 3.41093 17.9607 4.62532L15.6673 6.90532"
                stroke="#5BF4AB"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.6669 14.6657C18.0943 13.9002 17.3638 13.2668 16.5249 12.8084C15.6859 12.3501 14.7583 12.0775 13.8047 12.0092C12.8512 11.9409 11.8941 12.0785 10.9985 12.4126C10.1028 12.7467 9.28945 13.2696 8.6136 13.9457L4.6136 17.9457C3.39921 19.203 2.72725 20.887 2.74244 22.635C2.75763 24.383 3.45876 26.0551 4.69481 27.2911C5.93086 28.5272 7.60295 29.2283 9.35092 29.2435C11.0989 29.2587 12.7829 28.5867 14.0403 27.3723L16.3203 25.0923"
                stroke="#5BF4AB"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ height: "8px", width: "8px" }}></div>
            <div>
              <label
                className={`${
                  isMobileView ? mainStyle.body_bold_14 : mainStyle.body_bold_16
                }`}
              >
                Invite by sharing your invitation link
              </label>
            </div>
            {isMobileView ? (
              <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>
            ) : (
              <div style={{ height: "24px", width: "24px" }}></div>
            )}

            <div>
              <label
                className={`${
                  isMobileView
                    ? mainStyle.body_regular_12
                    : mainStyle.body_regular_14
                }`}
              >
                Invitation link
              </label>
            </div>
            <div style={{ height: "8px", width: "8px" }}></div>

            <div className={style.copyComponent}>
              <label className={mainStyle.body_medium_14}>
                {window.location.origin + "?rc=" + referralCode}
              </label>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  minWidth: "24px",
                  maxWidth: "24px",
                  width: "24px",
                  minHeight: "24px",
                  maxHeight: "24px",
                  height: "24px",
                }}
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
            </div>
          </div>
          <div style={{ height: "10px", width: "16px" }}></div>

          <div className={style.btm}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                minWidth: "32px",
                maxWidth: "32px",
                width: "32px",
                minHeight: "32px",
                maxHeight: "32px",
                height: "32px",
              }}
            >
              <path
                d="M5.33268 5.33203H26.666C28.1327 5.33203 29.3327 6.53203 29.3327 7.9987V23.9987C29.3327 25.4654 28.1327 26.6654 26.666 26.6654H5.33268C3.86602 26.6654 2.66602 25.4654 2.66602 23.9987V7.9987C2.66602 6.53203 3.86602 5.33203 5.33268 5.33203Z"
                stroke="#5BF4AB"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.3327 8L15.9993 17.3333L2.66602 8"
                stroke="#5BF4AB"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ height: "8px", width: "8px" }}></div>
            <div>
              <label
                className={`${
                  isMobileView ? mainStyle.body_bold_14 : mainStyle.body_bold_16
                }`}
              >
                Invite by sending your friends an E-mail
              </label>
            </div>
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>
            <div style={{ width: "100%" }}>
              <label
                className={`${
                  isMobileView
                    ? mainStyle.body_regular_12
                    : mainStyle.body_regular_14
                }`}
              >
                You can send multiple E-mails by hitting Enter button
                {!isMobileView && <br />} on the keyboard after each email
                added.
              </label>
            </div>
            {isMobileView ? (
              <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>
            ) : (
              <div style={{ height: "48px", width: "48px" }}></div>
            )}
            <div>
              <button
                style={{ width: "143px" }}
                className={`${style.btn} ${style.btn4}`}
              >
                <span>Send email</span>
              </button>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "10px", width: "10px" }}></div> */}

        <div className={style.right}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              minWidth: "32px",
              maxWidth: "32px",
              width: "32px",
              minHeight: "32px",
              maxHeight: "32px",
              height: "32px",
            }}
          >
            <path
              d="M2.66602 14.4327V2.66797H14.4307V14.4327H2.66602ZM5.01892 12.0798H12.0778V5.02088H5.01892V12.0798ZM2.66602 29.3346V17.5699H14.4307V29.3346H2.66602ZM5.01892 26.9817H12.0778V19.9228H5.01892V26.9817ZM17.568 14.4327V2.66797H29.3327V14.4327H17.568ZM19.9209 12.0798H26.9798V5.02088H19.9209V12.0798ZM26.3915 29.3346V26.3934H29.3327V29.3346H26.3915ZM17.568 20.5111V17.5699H20.5092V20.5111H17.568ZM20.5092 23.4523V20.5111H23.4503V23.4523H20.5092ZM17.568 26.3934V23.4523H20.5092V26.3934H17.568ZM20.5092 29.3346V26.3934H23.4503V29.3346H20.5092ZM23.4503 26.3934V23.4523H26.3915V26.3934H23.4503ZM23.4503 20.5111V17.5699H26.3915V20.5111H23.4503ZM26.3915 23.4523V20.5111H29.3327V23.4523H26.3915Z"
              fill="#5BF4AB"
            />
          </svg>
          <div style={{ height: "8px", width: "8px" }}></div>
          <div>
            <label
              className={`${
                isMobileView ? mainStyle.body_bold_14 : mainStyle.body_bold_16
              }`}
            >
              Invite by scanning the QR code
            </label>
          </div>
          <div style={{ height: "8px", width: "8px" }}></div>
          <div>
            <label
              className={`${
                isMobileView
                  ? mainStyle.body_regular_12
                  : mainStyle.body_regular_14
              }`}
            >
              Scan the QR code to refer
            </label>
          </div>
          {isMobileView ? (
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>
          ) : (
            <div style={{ height: "42px", width: "42px" }}></div>
          )}
          <div style={{ margin: "0 auto" }}>
            <QRCode
              value={window.location.origin + "?rc=" + referralCode}
              size={isMobileView ? 200 : 287}
              quietZone={2}
              logoImage={"/qrLogo.png"}
              logoHeight={60}
              logoWidth={60}

              // logoImage="/assets/qrlogo.svg"
            />
          </div>
          {/* <img
            src="/dashboard/qr-code.png"
            width={"287px"}
            height={"291px"}
            style={{ margin: "0 auto" }}
          /> */}
        </div>
      </div>
      </div>
    </div>
  );
}
