"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import CopyNotification from "./Components/CopyNotification";
// import { useNotification } from "./Components/Notifications/notificationContext";
import Link from "next/link";
const CopyComponent = ({ text, truncateStyle }) => {
  // const { addNotification } = useNotification();
  const notificationRef = useRef(null);
  const truncatetext = (textString) => {
    if (textString.length <= 15 || truncateStyle !== "middle") {
      return textString;
    }
    switch (truncateStyle) {
      case "middle":
        return `${textString.substring(0, 7)}...${textString.substring(
          textString.length - 5
        )}`;
      default:
        return textString; // No truncation if truncate style is not specified
    }
  };

  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(text).then(() => {
        const notificationElement =
          document.querySelector("#copy-header-notif");
        if (notificationElement) {
          notificationElement.style.display = "flex";
        }
        setTimeout(() => {
          notificationElement.style.display = "none";
        }, 2000);

        // addNotification({
        //   id: Math.random().toString(36).substr(2, 9),
        //   type: "success",
        //   message: "Copied to clipboard",
        //   customProp: null,
        // });
      });
    } catch (error) {
      console.error("Clipboard API not supported. Trying execCommand.");
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("text copied (fallback):", text);
    }
  };

  return (
    <div className={styles.copy_container}>
      <div className={styles["text-box"]}>
        {/* https://mumbai.polygonscan.com/address/" + wallet + "#tokentxns */}
        {truncateStyle == "middle" ? (
          <Link
            href={`https://mumbai.polygonscan.com/address/${text}#tokentxns`}
            target="_blank"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <label
              style={{ textDecoration: "none", cursor: "pointer" }}
              className={`truncatetext  ${
                truncateStyle == "end" ? styles.textOverflow : ""
              }`}
            >
              {truncatetext(text)}
            </label>
          </Link>
        ) : (
          <label
            className={`truncatetext  ${
              truncateStyle == "end" ? styles.textOverflow : ""
            }`}
            style={{}}
          >
            {truncatetext(text)}
          </label>
        )}
        {/* </div> */}
        <Image
          src="/icons/copy.svg"
          alt="Copy"
          width={16}
          height={18}
          onClick={handleCopyClick}
        />
        <CopyNotification id="copy-header-notif" refProp={notificationRef}>
          Copied to clipboard
        </CopyNotification>
      </div>
    </div>
  );
};

export default CopyComponent;
