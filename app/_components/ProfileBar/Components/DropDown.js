import Image from "next/image";
import Link from "next/link";
import styles from "../style.module.scss";
import React, { useRef, useEffect, useState } from "react";
import SignOutModal from "../../SignOutModal/SignOutModal";

const DropDown = ({
  title = "",
  content,
  arrowIcon = false,
  customClass = "",
  children,
}) => {
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [showSignoutModal, setSignoutModal] = useState(false);

  const parentRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleShow = () => {
    setDropDownOpen((prev) => !prev);
  };

  const handleClose = () => {
    setDropDownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropDownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        parentRef.current &&
        !parentRef.current.contains(event.target)
      ) {
        handleClose();
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropDownOpen]);

  return (
    <>
      <div
        className={styles[customClass]}
        onClick={() => {
          toggleShow();
        }}
      >
        <div className={styles.drop_down_trigger} ref={parentRef}>
          {children}
          {arrowIcon && (
            <div
              className={styles.drop_down_icon}
              onClick={(e) => {
                e.stopPropagation();
                toggleShow();
              }}
            >
              {isDropDownOpen ? (
                <div className={styles.up_icon}>
                  <UpArrowIcon />
                </div>
              ) : (
                <DownArrowIcon />
              )}
            </div>
          )}
        </div>
        <div
          ref={dropdownRef}
          className={`${styles.drop_down_menu} ${
            !isDropDownOpen ? styles.hidden_drop_down : styles.shown_drop_down
          }`}
        >
          {title ? (
            <div className={styles.drop_down_head}>
              <h3 className={`${styles.drop_down_title}`}>{title}</h3>
              <span
                className={styles.drop_down_close}
                onClick={(event) => {
                  event.stopPropagation();
                  handleClose();
                }}
              >
                <Image
                  src={"/icons/close3.svg"}
                  alt="close"
                  width={15}
                  height={15}
                />
              </span>
            </div>
          ) : (
            ""
          )}
          {content.map((item) => (
            <div
              key={item.id}
              // href={item.url}
              onClick={() => {
                if (item.id == "sign-out") {
                  setDropDownOpen(false);
                  setSignoutModal(true);
                }else{
                  window.location.href = item.url;
                }
              }}
              style={{ textDecoration: "none" }}
            >
              <div
                className={`${styles.row} ${
                  item.topBorder ? styles.last_item : ""
                }`}
              >
                <div className={styles.item_head_container}>
                  {typeof item.image === "string" ? (
                    <Image
                      src={item.image}
                      alt="profile"
                      width={22}
                      height={22}
                    />
                  ) : (
                    item.image
                  )}
                  <h4 className={`${styles.item_title}`}>{item.title}</h4>
                </div>

                <p className={`${styles.item_description}`}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
      {showSignoutModal && (
        <SignOutModal
          onClose={() => {
            setSignoutModal(false);
          }}
        />
      )}
    </>
  );
};
export default DropDown;

const DownArrowIcon = () => {
  return (
    <svg
      width="28"
      height="29"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.9997 15.1617C11.8791 15.1617 11.767 15.1425 11.6631 15.104C11.5593 15.0656 11.4606 14.9996 11.367 14.906L6.87276 10.4117C6.73429 10.2733 6.66346 10.0993 6.66026 9.88965C6.65704 9.68003 6.72788 9.50279 6.87276 9.35792C7.01763 9.21306 7.19326 9.14062 7.39966 9.14062C7.60606 9.14062 7.78169 9.21306 7.92656 9.35792L11.9997 13.431L16.0728 9.35792C16.2112 9.21947 16.3852 9.14864 16.5949 9.14542C16.8045 9.14222 16.9817 9.21306 17.1266 9.35792C17.2714 9.50279 17.3439 9.67843 17.3439 9.88485C17.3439 10.0912 17.2714 10.2669 17.1266 10.4117L12.6323 14.906C12.5388 14.9996 12.44 15.0656 12.3362 15.104C12.2324 15.1425 12.1202 15.1617 11.9997 15.1617Z"
        fill="white"
      />
    </svg>
  );
};
const UpArrowIcon = () => {
  return (
    <svg
      id="up"
      width="28"
      height="29"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.39953 15.5382L6.3457 14.4844L11.9995 8.83057L17.6534 14.4844L16.5995 15.5382L11.9995 10.9382L7.39953 15.5382Z"
        fill="white"
      />
    </svg>
  );
};
