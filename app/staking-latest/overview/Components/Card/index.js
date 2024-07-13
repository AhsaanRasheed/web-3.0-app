"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import Button from "@/app/_components/Button";
import useMobileScreen from "@/app/utility/isMobile";
import Button from "@/app/_components/global/Button/Button";
import Link from "next/link";
const Card = ({ data }) => {
  const isMobile = useMobileScreen();
  const titleClass = isMobile
    ? "txt_Title3 txt_align_center"
    : "txt_Title1 txt_align_center";
  const headingClass = isMobile
    ? "txt_Title1 txt_align_center"
    : "txt_Heading3 txt_align_center";

  return (
    <div className={`infoCard ${styles.card}`}>
      {data.map((item, index) => (
        <div key={index} className={styles.card_item}>
          <div className={styles.text}>
            <div className={styles.centered}>
              <p className={titleClass}>{item.title}</p>
              <hr className={styles.custom_hr} />
            </div>
            <div className={`${styles.centered} ${styles.token}`}>
              <p className={headingClass}>{item.ptt}</p>
              <p className="txt_Body3 color_cyan">{(item.price)}</p>
            </div>
          </div>
          <div className={styles.button_cont}>
            <Link href={item.link}>
            <div className={styles.button}>
              <Button
                text={item.btnText}
                Custom_width={"100%"}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
              />
            </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
