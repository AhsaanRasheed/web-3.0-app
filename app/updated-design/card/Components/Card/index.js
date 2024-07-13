import React, { useState } from "react";
import styles from "./style.module.scss";
import CheckBox from "@/app/_components/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const Card = ({ data, children, expanded, onCardClick }) => {
  return (
    <>
      {data.map((item) => {
        return (
          <div
            key={item.id}
            className={`infoCard ${styles.info_card}  ${
              expanded ? styles.expanded : ""
            }`}
            onClick={onCardClick}
          >
            <div className={styles.card_item}>
              <div className={styles.upper_container}>
                <div className={styles.image_container}>
                  <Image
                    src={item.url}
                    alt="info"
                    width={44}
                    height={35}
                    className={styles.text_info}
                  />
                </div>
                <p className="info-box-title">{item.name}</p>
              </div>
              <div className={styles.lower_container}>
                <p className="text-style-1">{item.text}</p>
                <div className={styles.children}>{children}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
