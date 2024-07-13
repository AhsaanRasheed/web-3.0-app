"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

const Tooltip = ({ messages }) => {
  return (
    <div className={styles.tooltip}>
      <Image
        src="/tooltip/polygon.svg"
        width={24}
        height={24}
        className={styles.polygon}
        alt="point"
      />
      <div className={styles.tooltip_container}>
        {messages.title ? (
          <h3 className="info-plain-text">{messages.title}</h3>
        ) : (
          <div className="title">Title</div> // Add your desired title or styling here
        )}
        <ul>
          {messages.messageList.map((message, index) => (
            <li
              key={index}
              className={`info-plain-text ${
                message.status === "pass"
                  ? styles.success
                  : message.status === "fail"
                  ? styles.error
                  : styles.none
              }`}
            >
              {message.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tooltip;
