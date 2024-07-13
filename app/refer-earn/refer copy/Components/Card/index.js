import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import CheckBox from "@/app/_components/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

const Card = ({ item, children, isMobileView }) => {
  const [openCard, setOpenCard] = useState(false);

  const handleCard = () => {
    if (isMobileView) {
      
      
      setOpenCard(!openCard)};
  };

  return (
    <div
      className={`infoCard ${styles.info_card}  ${
        openCard || !isMobileView ? styles.expanded : ""
      }`}
      onClick={handleCard}
    >
      <div className={styles.card_item}>
        <div className={styles.upper_container}>
          <div className={styles.image_container}>
            <Image
              src={item.url}
              alt="info"
              width={item.imageWidth}
              height={item.imageHeight}
              className={styles.text_info}
            />
          </div>
          <label className={`${isMobileView ? `txt_Title2` : `txt_Heading3`}`}>
            {item.name}
          </label>
        </div>
        <div className={styles.lower_container}>
          <label
            className={`txt_Body2`}
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
          >
            {item.text}
          </label>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
