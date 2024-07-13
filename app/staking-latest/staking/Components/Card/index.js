"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
// import CheckBox from "@/app/_components/CheckBox";
import useMobileScreen from "@/app/utility/isMobile";
import CheckBox from "@/app/_components/global/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_CHECKBOX, STORE_CHECKED_ITEM_DATA } from "@/app/actionTypes";

const Card = ({
  item,
  expanded,
  onCardClick,
  selectedPool,
  onClick,
  isMobileView,
}) => {
  const checkedItems = useSelector((state) => state.claimed.checkedItems);
  const dispatch = useDispatch();
  const [calculatedPtt, setCalculatedPtt] = useState(0);
  const [calculatedProfit, setCalculatedProfit] = useState(0);
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    setCalculatedPtt((item.ptt * item.APY) / 100 + item.ptt);
    setCalculatedProfit((item.ptt * item.APY) / 100);
  }, [item]);
  useEffect(() => {
    setSelected(selectedPool === item.name.toLowerCase());
  }, [selectedPool]);

  const handleAPYMouseOver = (event) => {
    const element = event.target;

    element.style.color = "#050e1d";
    setTimeout(() => {
      element.style.color = "#ffffff";
    }, 100);
  };
  const titleClass = isMobileView
    ? `txt_Heading6 ${styles.title}`
    : `txt_Heading3 ${styles.title}`;
  const tokenClass = isMobileView ? "txt_Heading3" : "txt_Heading1";
  const bodyClass = isMobileView
    ? "txt_Body3 color-status-info-default"
    : "txt_Body2 color-status-info-default";
  return (
    <>
      <div
        key={item.id}
        className={` ${styles.infoCard}  ${
          isSelected
            ? item.name === "Diamond"
              ? styles.diamond_card_selected
              : item.name === "Gold"
              ? styles.gold_card_selected
              : styles.silver_card_selected
            : ""
        }
       
        `}
        // ${
        //   selectedPool == item.name.toLowerCase() ? styles.checkedCard : ""
        // } ${expanded ? styles.expanded : ""}
        onClick={(event) => {
          event.preventDefault();
          onClick();
        }}
      >
        <div
          className={`${
            item.name === "Diamond"
              ? styles.diamond
              : item.name === "Gold"
              ? styles.gold
              : styles.silver
          } ${
            isSelected
              ? item.name === "Diamond"
                ? styles.diamond_selected
                : item.name === "Gold"
                ? styles.gold_selected
                : styles.silver_selected
              : ""
          } 
         `}
        />
        <div className={styles.card_item}>
          <div className={styles.text}>
            <div className={styles.heading}>
              <div className={`${styles.centered}`}>
                <p className={titleClass}>{item.name}</p>
                <label className={`txt_Body1`}>
                  <label className={styles.tooltip}>
                    {" "}
                    <span
                      id="apy"
                      onMouseOver={handleAPYMouseOver}
                      className={styles.tooltip_apy}
                    >
                      {item.APY}%
                    </span>
                    <span className={styles.tooltip_box}>
                      {" "}
                      APY= {item.APY}%
                    </span>
                  </label>
                </label>
              </div>
              <div className={`${styles.divided} ${styles.token}`}>
                <div className={`${styles.section}`}>
                  <p
                    className={`txt_Body1 ${styles.status} ${styles.color_white_40}`}
                  >
                    {item.status}
                  </p>
                  <p className={`${tokenClass}`}>
                    <span className="txt_ptt_color">PTT</span>{" "}
                    {/* {calculatedPtt.toFixed(2)} */}
                    {calculatedPtt.toFixed(0)}
                  </p>
                  <p className={`${bodyClass} ${styles.euro_amount}`}>
                    ( € {(calculatedPtt * 0.1).toFixed(2)} )
                  </p>
                </div>
                <hr />
                <div className={`${styles.section}`}>
                  <p
                    className={`txt_Body1 ${styles.status} ${styles.color_white_40}`}
                  >
                    Earn
                  </p>
                  <p className={tokenClass}>
                    {/* PTT {calculatedProfit.toFixed(2)} */}
                    <span className="txt_ptt_color">PTT </span>
                    {calculatedProfit.toFixed(0)}
                  </p>
                  <p className={`${bodyClass} ${styles.euro_amount}`}>
                    ( € {(calculatedProfit * 0.1).toFixed(2)} )
                  </p>
                </div>
              </div>
            </div>
            {/* <div className={styles.info}>
                <p>
                  <span className={`txt_Body3 ${styles.color_white_40}`}>
                    TVL:
                  </span>
                  <span className={`txt_Body1`}>{item.TVL}</span>
                </p>
                <p>
                  <span className={`txt_Body3 ${styles.color_white_40}`}>
                    APR:
                  </span>
                  <span className={`txt_Body1`}>{item.APR}</span>
                </p>
                <p>
                  <span className={`txt_Body3 ${styles.color_white_40}`}>
                    APY:
                  </span>
                  <span className={`txt_Body1 `}>{item.APY}</span>
                </p>
              </div> */}
          </div>
          <div className={styles.box}>
            <button
              className={`${styles.card_button} ${
                isSelected ? styles.selected : ""
              } ${
                isSelected
                  ? item.name === "Diamond"
                    ? styles.diamond_button_selected
                    : item.name === "Gold"
                    ? styles.gold_button_selected
                    : styles.silver_button_selected
                  : item.name === "Diamond"
                  ? styles.diamond_button
                  : item.name === "Gold"
                  ? styles.gold_button
                  : styles.silver_button
              }`}
              onClick={(event) => {
                event.preventDefault();
                onClick();
              }}
            >
              <span>{isSelected ? "Selected" : "Select"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
