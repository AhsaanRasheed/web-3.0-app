"use client";
import React from "react";
import Link from "next/link";
import { Lancelot } from "next/font/google";
import styles from "../../style.module.scss";
import Button from "@/app/_components/global/Button/Button";
const Factor = ({ isMobileView }) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.topBar}
        style={{
          marginTop: isMobileView ? "0" : "20px",
          marginBottom: isMobileView ? "0" : "20px",
          display:"flex",
          flexDirection:isMobileView?"column":"row",
          justifyContent:"space-between",
          alignItems:isMobileView?"flex-start": "center"
        }}
      >
        <div>
          <label className={`${isMobileView ? "txt_Title2" : "txt_Heading3"}`}>
            Set up Two-Factor Authentication (2FA)
          </label>
          <br />
          <br />

          <label
            className="txt_Title3"
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
          >
            Protect your account by using a sign in{isMobileView ? <br /> : ""}{" "}
            2FA
            {isMobileView ? "" : <br />} confirmation.{" "}
            <label
              className="txt_Body1"
              style={{ color: "var(--status-info-default)", textDecoration:"underline" }}
            >
              Learn more
            </label>
          </label>
        </div>
        <div style={{marginTop:isMobileView?"20px":"0", width:isMobileView ? "100%" : "194px"}}>
        <Button
          text={"Enable"}
          disable={true}
          Custom_width={isMobileView ? "100%" : "194px"}
          Custom_minWidth={isMobileView ? "100%" : "194px"}
          Custom_maxWidth={isMobileView ? "100%" : "194px"}
        />
        </div>
      </div>
    </div>
  );
};

export default Factor;
