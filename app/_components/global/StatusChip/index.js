import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.scss"; // Import SCSS module

const StatusChip = ({ status, tooltipText, onClick }) => {
  let chipColor;
  let chipText;

  switch (status) {
    case "pending":
      chipColor = "pending";
      chipText = "Pending";
      break;
    case "onchain":
      chipColor = "onchain";
      chipText = "Onchain";
      break;
    default:
      chipColor = "gray";
      chipText = "Default";
  }

  return (
    <div
      onClick={onClick}
      className={`${styles.statusChip} ${styles[`statusChip-${chipColor}`]}`}
      {...(tooltipText && { "data-tooltip": truncateCenter(tooltipText) })}
    >
      {chipText}
    </div>
  );
};

StatusChip.propTypes = {
  status: PropTypes.oneOf(["pending", "success"]).isRequired,
};

export default StatusChip;
function truncateCenter(str) {
  if (str.length <= 13) {
    return str; // If the string is 10 characters or less, return it as is
  } else {
    const start = str.substring(0, 13); // Extract first five characters
    const end = str.substring(str.length - 4); // Extract last five characters
    return start + "..." + end; // Concatenate the parts with "..."
  }
}
