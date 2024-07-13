"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style.module.scss";
import Image from "next/image";

const NotificationBox = () => {
  const { alertType, text, isOpen, top } = useSelector((state) => state.alert);
  const [closing, setClosing] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      dispatch({ type: "HIDE_ALERT" });
      setClosing(false);
    }, 300);
  };

  if (!isOpen) {
    return null;
  }

  const alertClass = alertType === "success" ? styles.success : styles.error;
  const srcImage =
    alertType === "success" ? "/icons/success.svg" : "/icons/error.svg";
  const fontColor =
    alertType === "success" ? styles.successFont : styles.errorFont;

  return (
    <div
      className={`${styles.container} ${alertClass} ${
        isOpen ? styles.open : ""
      } ${closing ? styles.closing : ""}`}
      style={{ top: top }}
    >
      <div className={styles.start}>
        <Image src={srcImage} alt={alertType} width={20} height={20} />
        <p className={`text-style-2 ${fontColor}`}>{text}</p>
      </div>
      <Image
        src="/icons/close2.svg"
        alt="close"
        width={13}
        height={13}
        onClick={handleClose}
      />
    </div>
  );
};

export default NotificationBox;
