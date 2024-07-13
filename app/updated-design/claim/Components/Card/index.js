"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import CheckBox from "@/app/_components/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CHECKBOX, STORE_CHECKED_ITEM_DATA } from "@/app/actionTypes";

const Card = ({ data, expanded, onCardClick }) => {
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
              <div className={styles.text}>
                <div className={styles.centered}>
                  <p className="info-box-title">{item.name}</p>
                  <p className="text-style-1">{item.percent}</p>
                </div>
                <div className={`${styles.centered} ${styles.centered_column}`}>
                  <p className={`text-style-1 ${styles.status}`}>
                    {item.status}
                  </p>
                  <p className="heading-1">{item.ptt}</p>
                  <p className="info-plain-text">{item.price}</p>
                </div>
              </div>
              <div className={styles.box}>
                <CheckBox
                  label="Claim PTT"
                  id={item.id}
                  isChecked={checkedItems[item.id]}
                  onCheckboxChange={(event) =>
                    handleCheckboxChange(event, item.id)
                  }
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
