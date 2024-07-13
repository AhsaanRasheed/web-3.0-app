import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss"; // Import SCSS module

const InvitedChip = ({ status, tooltipText, onClick }) => {
  let chipColor;
  let chipText;

  switch (status) {
    case "resend-inactive":
      chipColor = "resend-inactive";
      chipText = "Resend";
      break;
    case "resend":
      chipColor = "resend";
      chipText = "Resend";
      break;
    case "locked":
      chipColor = "locked";
      chipText = "Locked";
      tooltipText = "You can no longer preform this action. The limit has been reached.";
      break;
    case "pending":
      chipColor = "gray";
      chipText = "Pending";
      break;
    default:
      chipColor = "gray";
      chipText = "Default";
  }
 
  return (
    <div
      className={`${styles.statusChip} ${styles[`statusChip-${chipColor}`]}`}
      {...(tooltipText && { "data-tooltip":  tooltipText })}
      onClick={() => {
        if (status == "resend") {
          onClick();
        } 
      }}
    >
      <label className={styles.toShowText}>{chipText}</label><label className={styles.toShowTextPending}>{tooltipText}</label>
    </div>
  );
};

InvitedChip.propTypes = {
  status: PropTypes.oneOf(["pending", "success"]).isRequired,
};

export default InvitedChip;
