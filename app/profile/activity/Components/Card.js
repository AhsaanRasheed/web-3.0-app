"use client";
import React, { useState } from "react";
import styles from "../../style.module.scss";
import Image from "next/image";
import Button from "@/app/_components/global/Button/Button";
import TextButton from "@/app/_components/global/Button/TextButton";
import ConfirmationBox from "@/app/_components/ConfirmationBox";
const Card = ({
  title,
  isMobileView,
  data,
  isSessionManagement,
  totalActiveSessions,
}) => {
  const [showAlert, SetShowAlert] = useState(false);

  return (
    <div className={styles.card}>
      <div className={`${styles.ActivityTopRow} ${styles.topBar}`}>
        <label className={`${isMobileView ? "txt_Title2" : "txt_Heading3"}`}>
          {title}{" "}
          {isSessionManagement
            ? `(${totalActiveSessions} active sessions)`
            : `(${totalActiveSessions} Devices)`}
        </label>
        {!isMobileView && (
          <div className={styles.btnSide}>
            <Button
              text={"Disconnect all"}
              onClick={() => {SetShowAlert(true)}}
              Custom_minWidth={"100%"}
              Custom_maxWidth={"100%"}
              Custom_width={"155px"}
              Custom_height={"51px"}
            />
          </div>
        )}
      </div>
      {isMobileView ? (
        <MobileTblView data={data} />
      ) : (
        <DesktopTblView data={data} />
      )}

      <InfoBar isSessionManagement={isSessionManagement} />
      {isMobileView && (
        <div className={styles.btnSide}>
          <Button
            text={"Disconnect all"}
            onClick={() => {SetShowAlert(true)}}

            Custom_minWidth={"100%"}
            Custom_maxWidth={"100%"}
            Custom_width={"100%"}
            Custom_height={"51px"}
          />
        </div>
      )}
      <DisconnectModal isMobileView={isMobileView} showAlert={showAlert} SetShowAlert={SetShowAlert} />
    </div>
  );
};

export default Card;
const MobileTblView = ({ data }) => {
  const [seeAll, setSeeAll] = useState(false);
  let rows = [];
  if (data.length >= 2) {
    rows.push(data[0]);
    rows.push(data[1]);
  } else if (data.length == 2) {
    rows.push(data[0]);
  }
  return (
    <>
      <div className={styles.tbl_history}>
        {(seeAll ? data : rows).map((item, index) => (
          <div className={styles.tbl_row}>
            <div className={styles.tbl_row_data}>
              <div className={styles.icon}>
                {item.isMobile ? <MobileIcon /> : <DekstopIcon />}
              </div>
              <div className={styles.col} style={{ marginLeft: "7px" }}>
                <label className="txt_Body1">
                  <b>{item.device}</b>
                </label>
                <label
                  className="txt_Body2"
                  style={{
                    color: item.active
                      ? "var(--status-success-default)"
                      : "var(--primary-Neutrals-medium-color)",
                  }}
                >
                  {item.active ? "Currenty active" : item.date}
                </label>
              </div>
            </div>
            <div className={styles.tbl_row_data}>
              <div className={styles.col} style={{ marginRight: "7px" }}>
                <label
                  className="txt_Body2"
                  style={{
                    color: "var(--primary-Neutrals-medium-color)",
                    textAlign: "right",
                  }}
                >
                  {item.country}
                </label>
                <label
                  className="txt_Body2"
                  style={{
                    color: "var(--primary-Neutrals-medium-color)",
                    textAlign: "right",
                  }}
                >
                  {item.ip}
                </label>
              </div>
              <CrossIcon />
            </div>
          </div>
        ))}
      </div>
      {data.length > 2 && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TextButton
            defaultColor={"var(--status-info-default)"}
            text={seeAll ? "Close" : "All Devices"}
            Custom_width={"124px"}
            Custom_maxWidth={"124px"}
            Custom_minWidth={"124px"}
            Custom_height={"35px"}
            Custom_minHeight={"35px"}
            onClick={() => setSeeAll(!seeAll)}
          />
        </div>
      )}
    </>
  );
};
const DesktopTblView = ({ data }) => {
  return (
    <>
      <div className={styles.tbl_history}>
        {data.map((item) => (
          <div className={styles.tbl_row}>
            <div className={styles.tbl_row_data}>
              <div className={styles.icon}>
                {item.isMobile ? <MobileIcon /> : <DekstopIcon />}
              </div>
              <div className={styles.col} style={{ marginLeft: "20px" }}>
                <label className="txt_Body1">
                  <b>{item.device}</b>
                </label>
                <label
                  className="txt_Body2"
                  style={{
                    color: item.active
                      ? "var(--status-success-default)"
                      : "var(--primary-Neutrals-medium-color)",
                  }}
                >
                  {item.active ? "Currenty active" : item.date}
                </label>
              </div>
            </div>
            <div className={styles.tbl_row_data}>
              <div className={styles.col} style={{ marginRight: "20px" }}>
                <label
                  className="txt_Body2"
                  style={{
                    color: "var(--primary-Neutrals-medium-color)",
                    textAlign: "right",
                  }}
                >
                  {item.country}
                </label>
                <label
                  className="txt_Body2"
                  style={{
                    color: "var(--primary-Neutrals-medium-color)",
                    textAlign: "right",
                  }}
                >
                  {item.ip}
                </label>
              </div>
              <CrossIcon />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
const DekstopIcon = () => {
  return (
    <svg
      width="30"
      height="23"
      viewBox="0 0 30 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.84668 22.9745V20.9745H29.1543V22.9745H0.84668ZM4.74411 19.6412C4.0706 19.6412 3.50051 19.4078 3.03385 18.9412C2.56718 18.4745 2.33385 17.9044 2.33385 17.2309V3.38484C2.33385 2.71135 2.56718 2.14128 3.03385 1.67461C3.50051 1.20794 4.0706 0.974609 4.74411 0.974609H25.2568C25.9304 0.974609 26.5004 1.20794 26.9671 1.67461C27.4338 2.14128 27.6671 2.71135 27.6671 3.38484V17.2309C27.6671 17.9044 27.4338 18.4745 26.9671 18.9412C26.5004 19.4078 25.9304 19.6412 25.2568 19.6412H4.74411ZM4.74411 17.6412H25.2568C25.3594 17.6412 25.4535 17.5985 25.5389 17.513C25.6244 17.4275 25.6671 17.3335 25.6671 17.2309V3.38484C25.6671 3.28227 25.6244 3.18824 25.5389 3.10278C25.4535 3.01729 25.3594 2.97454 25.2568 2.97454H4.74411C4.64154 2.97454 4.5475 3.01729 4.46201 3.10278C4.37655 3.18824 4.33381 3.28227 4.33381 3.38484V17.2309C4.33381 17.3335 4.37655 17.4275 4.46201 17.513C4.5475 17.5985 4.64154 17.6412 4.74411 17.6412Z"
        fill="white"
      />
    </svg>
  );
};

const MobileIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1506 1.89381C18.9444 0.669996 17.3363 0.000976562 15.6316 0.000976562H0V7.24597H15.5351C15.9371 7.24597 16.2749 6.90331 16.2749 6.49537C16.2749 6.08743 15.9371 5.74476 15.5351 5.74476H1.47953V1.50219H15.5833C18.3012 1.50219 20.5366 3.7377 20.5366 6.46273C20.5366 7.80077 20.038 9.04091 19.1053 9.98733C18.1725 10.9337 16.9342 11.4559 15.6316 11.4559H11.7558V17.1181C11.7558 18.7172 10.4854 20.0389 8.92544 20.0553C8.15351 20.0553 7.42982 19.7615 6.88304 19.2067C6.33626 18.652 6.0307 17.9177 6.0307 17.1507V11.1459H4.55117V17.1507C4.55117 18.3256 5.00146 19.4352 5.82164 20.2674C6.64181 21.0996 7.73538 21.5565 8.89327 21.5565H8.90936C11.2895 21.5565 13.2354 19.5494 13.2354 17.1018V12.9571H15.4868C17.3202 12.9571 18.9284 12.2881 20.1345 11.0643C21.3406 9.84047 22 8.20871 22 6.47905C22 4.74939 21.3567 3.11763 20.1506 1.89381Z"
        fill="url(#paint0_linear_3305_7729)"
      />
      <path
        d="M16.2754 6.47912C16.2754 6.07118 15.9377 5.72852 15.5356 5.72852H1.49613L0.0166016 7.22973H15.5356C15.9377 7.22973 16.2754 6.90338 16.2754 6.47912Z"
        fill="url(#paint1_linear_3305_7729)"
      />
      <path
        d="M11.7555 11.4721V17.1343C11.7555 18.7335 10.485 20.0552 8.92505 20.0715C8.15312 20.0715 7.42944 19.7778 6.88265 19.223C6.33587 18.6682 6.03031 17.9339 6.03031 17.167V11.1621H4.55078V17.167C4.55078 18.3418 5.00107 19.4514 5.82125 20.2836C6.64142 21.1158 7.73499 21.5727 8.89289 21.5727H8.90897C11.2891 21.5727 13.235 19.5657 13.235 17.118V12.9734L11.7555 11.4721Z"
        fill="url(#paint2_linear_3305_7729)"
      />
      <path
        d="M20.1506 1.89381C18.9444 0.669996 17.3363 0.000976562 15.6316 0.000976562H0L1.47953 1.50219H15.5833C18.3012 1.50219 20.5366 3.7377 20.5366 6.46273C20.5366 7.80077 20.038 9.04091 19.1053 9.98733C18.1725 10.9337 16.9342 11.4559 15.6316 11.4559H11.7719L13.2515 12.9571H15.6155C17.3202 12.9571 18.9284 12.2881 20.1345 11.0643C21.3406 9.84047 22 8.20871 22 6.47905C22 4.74939 21.3567 3.11763 20.1506 1.89381Z"
        fill="url(#paint3_linear_3305_7729)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3305_7729"
          x1="-3.23085"
          y1="-5.36695"
          x2="10.2434"
          y2="7.91267"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#37A9FF" />
          <stop offset="0.3664" stop-color="#A0F7FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3305_7729"
          x1="2.02806"
          y1="0.494676"
          x2="7.68954"
          y2="6.07438"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.3464" stop-color="#126580" />
          <stop offset="0.5856" stop-color="#37A9FF" />
          <stop offset="0.8949" stop-color="#A0F7FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3305_7729"
          x1="13.355"
          y1="7.68257"
          x2="9.0797"
          y2="14.3038"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.4482" stop-color="#126580" />
          <stop offset="0.5856" stop-color="#37A9FF" />
          <stop offset="0.8949" stop-color="#A0F7FF" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_3305_7729"
          x1="0.426057"
          y1="-8.83666"
          x2="13.5282"
          y2="4.07624"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.3464" stop-color="#126580" />
          <stop offset="0.5856" stop-color="#37A9FF" />
          <stop offset="0.8949" stop-color="#A0F7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const CrossIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.00047 8.0543L1.92737 13.1274C1.78892 13.2658 1.61489 13.3367 1.40527 13.3399C1.19567 13.3431 1.01844 13.2723 0.873575 13.1274C0.728691 12.9825 0.65625 12.8069 0.65625 12.6005C0.65625 12.3941 0.728691 12.2184 0.873575 12.0736L5.94665 7.00047L0.873575 1.92737C0.735108 1.78892 0.664275 1.61489 0.661075 1.40527C0.657858 1.19567 0.728691 1.01844 0.873575 0.873575C1.01844 0.728691 1.19407 0.65625 1.40047 0.65625C1.60687 0.65625 1.78251 0.728691 1.92737 0.873575L7.00047 5.94665L12.0736 0.873575C12.212 0.735108 12.3861 0.664275 12.5957 0.661075C12.8053 0.657858 12.9825 0.728691 13.1274 0.873575C13.2723 1.01844 13.3447 1.19407 13.3447 1.40047C13.3447 1.60687 13.2723 1.78251 13.1274 1.92737L8.0543 7.00047L13.1274 12.0736C13.2658 12.212 13.3367 12.3861 13.3399 12.5957C13.3431 12.8053 13.2723 12.9825 13.1274 13.1274C12.9825 13.2723 12.8069 13.3447 12.6005 13.3447C12.3941 13.3447 12.2184 13.2723 12.0736 13.1274L7.00047 8.0543Z"
        fill="#9EA6BA"
      />
    </svg>
  );
};

const InfoBar = ({ isSessionManagement }) => {
  return (
    <div className={styles.infoBar}>
      <div className={styles.bar}></div>

      <label className={`txt_Body2 ${styles.txt}`}>
        {isSessionManagement ? (
          <>
            We recommend periodically checking the timeline for any suspicious
            account activity.{" "}
            <label style={{ color: "var(--status-info-default)" }}>
              Learn more
            </label>
          </>
        ) : (
          <>
            We recommend periodically checking the devices connected to your
            PrimeTrader account to be aware of any suspicious activity.
          </>
        )}
      </label>
    </div>
  );
};

const DisconnectModal = ({ isMobileView, showAlert, SetShowAlert }) => {
  return (
    <div>
      <ConfirmationBox
        title={"Are you sure you want to disconnect all sessions?"}
        para={
          "By pressing disconnect all sessions you will be signed out from all the sessions"
        }
        acceptBtnTxt={"Yes, disconnect all"}
        rejectBtnTxt={"Cancel"}
        onAccept={() => SetShowAlert(false)}
        onReject={() => SetShowAlert(false)}
        onClose={() => SetShowAlert(false)}
        showAlert={showAlert}
        isMobileView={isMobileView}
      />
    </div>
  );
};
