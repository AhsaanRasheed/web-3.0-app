"use client";
import React from "react";
import Info from "./Components";
import Link from "next/link";
import styles from "../style.module.scss";
import Button from "@/app/_components/global/Button/Button";

const Verification = (props) => {
  return (
    <>
      <div className={styles.component_container}>
        <div className={styles.card}>
          <div className={styles.topBar}>
            <label
              className={`${
                props.isMobileView ? "txt_Title2" : "txt_Heading3"
              }`}
            >
              Want more features?
            </label>
            <br />
            <div style={{
                  color: "var(--primary-Neutrals-medium-color)",
                  paddingTop: "10px",
                }}>
              <label
                className="txt_Body1"
                style={{
                  color: "var(--primary-Neutrals-medium-color)",
                }}
              >
                You’ll be able to use a payment card get higher
                {props.isMobileView ? <br /> : ""} limits if you provide a bit
                more info.
              </label>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={`${styles.infoSide} ${styles.verification}`}>
              <label
                className={props.isMobileView ? "txt_Title3" : "txt_Title2"}
              >
                Here’s what you’ll need:
              </label>
              <div className={styles.row}>
                <Dot />{" "}
                <label
                  className="txt_Body1"
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                >
                  Proof of address
                </label>
              </div>
              <div className={styles.row}>
                <Dot />{" "}
                <label
                  className="txt_Body1"
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                >
                  Passport
                </label>
              </div>
              <div className={styles.row}>
                <Dot />{" "}
                <label
                  className="txt_Body1"
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                >
                  A selfie (Optinal)
                </label>
              </div>
            </div>

            <div className={styles.btnSide}>
              <Button
                text={"Get started"}
                onClick={() => {}}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
                Custom_width={"100%"}
                Custom_height={"51px"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;

const Dot = () => {
  return (
    <div style={{ marginRight: "16px" }}>
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "var(--status-info-default)",
          borderRadius: "50%",
          boxShadow: "0px 0px 7px 2px #0075FF, 0px 0px 7px 2px #0075FF inset",
        }}
      ></div>
    </div>
  );
};
