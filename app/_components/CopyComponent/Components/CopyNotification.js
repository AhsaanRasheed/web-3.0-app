"use client";
import React from "react";
import styles from "../style.module.scss";
export default function CopyNotification({
  width,
  height,
  position = "right",
  children,
  id,
  refProp,
}) {
  return (
    <>
      <div id={id} ref={refProp} className={styles.notificationParent}>
        <span
          // data-text={txt}
          className={`${styles.notification} ${
            position == styles.right ? `left` : `left`
          } `}
          style={{
            width: width,
            maxWidth: width,
          }}
        >
          {children}
        </span>
      </div>
    </>
  );
}
