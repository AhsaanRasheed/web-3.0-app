"use client";
import styles from "./style.module.scss";
export default function ButtonGradientHover({
  text,
  children,
  disabled,
  onClick,
}) {
  return (
    <div className={styles.button_div}>
      <button
        className={`${styles.button}
                ${disabled ? styles.button_disabled : styles.button_active}`}
        onClick={onClick}
        disabled={disabled}
      >
        <span> {children ? children : text}</span>
      </button>
    </div>
  );
}
