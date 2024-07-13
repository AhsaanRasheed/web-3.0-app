"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

const Info = ({ title, buttonText, data }) => {
  return (
    <div className="info-box">
      <div className="info-box-content">
        <div className={styles.title_container}>
          <div className="info-box-title">{title}</div>
          <div className={`info-box-button ${styles.button_container}`}>
            <div className="button-container">
              <button type="submit" className="button-style">
                <p className="button-text">{buttonText}</p>
              </button>
            </div>
          </div>
        </div>

        <div className="info-box-inner">
          <div className="info-box-details-space">
            <div className={`info-table ${styles.table}`}>
              {data.map((item, index) => (
                <div key={index} className={`info-table-row ${styles.row}`}>
                  <div className={styles.row_style}>
                    <Image
                      src={item.imageUrl}
                      alt="Device Image"
                      width={30}
                      height={30}
                    />
                    <div
                      className={`info-table-row-details ${styles.row_details}`}
                    >
                      <p className={`text-style-1 ${styles.text_head}`}>
                        {item.device}
                      </p>
                      <p className={`info-plain-text ${styles.text_detail}`}>
                        {item.info}
                      </p>
                    </div>
                  </div>
                  <div className={styles.row_style}>
                    <div
                      className={`info-table-row-details ${styles.row_details} ${styles.align_right}`}
                    >
                      <p className={`info-plain-text ${styles.text_detail}`}>
                        {item.country}
                      </p>
                      <p className={`info-plain-text ${styles.text_detail}`}>
                        {item.ip}
                      </p>
                    </div>
                    <Image
                      src="/icons/close.svg"
                      alt="Close"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <p className="info-plain-text">
            We recommend periodically checking the timeline for any suspicious
            account activity.
            <span className="info-link-text"> Learn more</span>
          </p>
        </div>
        <div className={`info-box-button ${styles.button_container_mobile}`}>
          <div className="button-container">
            <button type="submit" className="button-style">
              <p className="button-text">{buttonText}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
