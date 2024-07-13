"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import CheckBox from "@/app/_components/CheckBox";
import CheckBox from "@/app/_components/global/CheckBox";
import useMobileScreen from "@/app/utility/isMobile";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CHECKBOX, STORE_CHECKED_ITEM_DATA } from "@/app/actionTypes";

const Card = ({
  item,
  expanded,
  onCardClick,
  selectedPool,
  onCheckBoxClick,
  isMobileView,
}) => {
  const checkedItems = useSelector((state) => state.claimed.checkedItems);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event, id) => {
    // Toggle checkbox
    dispatch({ type: TOGGLE_CHECKBOX, payload: { id } });

    // If the checkbox is about to be checked and is currently unchecked
    if (!checkedItems[id]) {
      const itemData = data.find((item) => item.id === id);
      dispatch({
        type: STORE_CHECKED_ITEM_DATA,
        payload: { id, data: itemData },
      });
    }
  };
  const isMobile = useMobileScreen();
  const titleClass = isMobile
    ? `txt_Heading6 ${styles.title}`
    : `txt_Heading3 ${styles.title}`;
  const tokenClass = isMobile ? "txt_Heading3" : "txt_Heading1";
  const bodyClass = isMobile
    ? "txt_Body3 color-status-info-default"
    : "txt_Body2 color-status-info-default";
  return (
    <>
      <div
        key={item.id}
        className={`infoCard ${styles.info_card}  ${
          expanded ? styles.expanded : ""
        } ${(selectedPool == item.name.toLowerCase()) ? styles.checkedCard : ""}`}
        onClick={onCardClick}
      >
        <div className={styles.card_item}>
          <div className={styles.text}>
            <div className={styles.centered}>
              <p className={titleClass}>{item.name}</p>
              <p className={`txt_Body1 ${styles.color_white_40}`}>
                {item.percent}
              </p>
            </div>
            <div className={`${styles.centered} ${styles.centered_column}`}>
              <p
                className={`txt_Body1 ${styles.status} ${styles.color_white_40}`}
              >
                {item.status}
              </p>
              <p className={tokenClass}>{item.ptt}</p>
              <p className={bodyClass}>{item.price}</p>
            </div>
          </div>
          <div className={styles.box}>
            {/* <CheckBox
                  label="Claim PTT"
                  id={item.id}
                  isChecked={checkedItems[item.id]}
                  onCheckboxChange={(event) =>
                    handleCheckboxChange(event, item.id)
                  }
                /> */}
            <CheckBox
              label="Claim PTT"
              checked={selectedPool == item.name.toLowerCase()}
              onChange={(event) => onCheckBoxClick()}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
