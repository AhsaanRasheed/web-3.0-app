import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import secureLocalStorage from "react-secure-storage";

const Modal = ({ isOpen, onClose, children, level, xp, ptv }) => {
  const [isShareVisible, setShareVisible] = useState(false);
  useEffect(() => {
    if (!isOpen) {
      setShareVisible(false);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const handleShareClick = () => {
    setShareVisible(!isShareVisible);
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <div className={styles.content}>
          <div className={styles.levelWrapper}>
            <h1 className={styles.levelCount}>
              #{secureLocalStorage.getItem("userLevel")}
            </h1>
            <LevelUpIcon />
          </div>
          <h1 className={styles.lvlUp}>LEVEL UP!</h1>
          <div className={styles.rewardsCountContainer}>
            <h2 className={styles.rewardsTitle}>Your Rewards</h2>
            <div className={styles.rewardsNumbers}>
              <h3>
                <span className={styles.highlight}>PTV</span> {ptv ?? 0}
              </h3>
              <h3>
                {xp ?? 0} <span className={styles.purple}>XP</span>
              </h3>
            </div>

            {!isShareVisible ? (
              <div className={styles.btnCon}>
                <button
                  type="button"
                  className={`${styles.button} ${styles.Outlinebutton}`}
                  onClick={handleShareClick}
                >
                  <div className={styles.body}>
                    Share <ShareIcon />
                  </div>
                </button>
                <button
                  type="button"
                  className={styles.button}
                  onClick={onClose}
                >
                  Great!
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`${styles.shareContainer} ${isShareVisible ? styles.visible : ""
                    }`}
                >
                  <div className={styles.shareInstruction}>
                    <ShareIcon />
                    <p>Share your success on social media</p>
                  </div>
                  <div className={styles.socialShare}>
                    <ul>
                      <li>
                        <XIcon />
                      </li>
                      <li>
                        <LinkedIcon />
                      </li>
                      <li>
                        <InstaIcon />
                      </li>
                      <li>
                        <FbIcon />
                      </li>
                    </ul>
                  </div>
                  <div className={styles.btnCon}>
                    <button
                      type="button"
                      className={styles.button}
                      onClick={onClose}
                      style={{ width: "100%" }}
                    >
                      Great!
                    </button>
                  </div>
                </div></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LevelUpIcon = () => {
  return <img src="/rewardsCenter/img/lvlUp.png" alt="lvl up" />;
};

const ShareIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <path
        d="M4.94029 13.1775C6.41962 13.1775 7.61886 11.9782 7.61886 10.4989C7.61886 9.01955 6.41962 7.82031 4.94029 7.82031C3.46096 7.82031 2.26172 9.01955 2.26172 10.4989C2.26172 11.9782 3.46096 13.1775 4.94029 13.1775Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0594 18.236C16.5387 18.236 17.738 17.0368 17.738 15.5575C17.738 14.0782 16.5387 12.8789 15.0594 12.8789C13.5801 12.8789 12.3809 14.0782 12.3809 15.5575C12.3809 17.0368 13.5801 18.236 15.0594 18.236Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.0594 8.11886C16.5387 8.11886 17.738 6.91962 17.738 5.44029C17.738 3.96096 16.5387 2.76172 15.0594 2.76172C13.5801 2.76172 12.3809 3.96096 12.3809 5.44029C12.3809 6.91962 13.5801 8.11886 15.0594 8.11886Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.33398 9.30748L12.6673 6.62891"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.33398 11.6914L12.6673 14.37"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const XIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <path
        d="M24.9357 3.03906H29.4337L19.6069 14.2704L31.1673 29.5537H22.1156L15.026 20.2844L6.91391 29.5537H2.41323L12.9239 17.5405L1.83398 3.03906H11.1155L17.5238 11.5115L24.9357 3.03906ZM23.3571 26.8614H25.8494L9.76118 5.58991H7.0866L23.3571 26.8614Z"
        fill="#BEBEBE"
      />
    </svg>
  );
};

const LinkedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g clip-path="url(#clip0_6301_55164)">
        <path
          d="M30.1313 0.5H2.8625C1.55625 0.5 0.5 1.53125 0.5 2.80625V30.1875C0.5 31.4625 1.55625 32.5 2.8625 32.5H30.1313C31.4375 32.5 32.5 31.4625 32.5 30.1938V2.80625C32.5 1.53125 31.4375 0.5 30.1313 0.5ZM9.99375 27.7687H5.24375V12.4937H9.99375V27.7687ZM7.61875 10.4125C6.09375 10.4125 4.8625 9.18125 4.8625 7.6625C4.8625 6.14375 6.09375 4.9125 7.61875 4.9125C9.1375 4.9125 10.3687 6.14375 10.3687 7.6625C10.3687 9.175 9.1375 10.4125 7.61875 10.4125ZM27.7687 27.7687H23.025V20.3438C23.025 18.575 22.9937 16.2937 20.5562 16.2937C18.0875 16.2937 17.7125 18.225 17.7125 20.2188V27.7687H12.975V12.4937H17.525V14.5813H17.5875C18.2188 13.3813 19.7688 12.1125 22.075 12.1125C26.8813 12.1125 27.7687 15.275 27.7687 19.3875V27.7687Z"
          fill="#BEBEBE"
        />
      </g>
      <defs>
        <clipPath id="clip0_6301_55164">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const InstaIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g clip-path="url(#clip0_6301_55167)">
        <path
          d="M16.5 3.38125C20.775 3.38125 21.2813 3.4 22.9625 3.475C24.525 3.54375 25.3688 3.80625 25.9313 4.025C26.675 4.3125 27.2125 4.6625 27.7688 5.21875C28.3313 5.78125 28.675 6.3125 28.9625 7.05625C29.1813 7.61875 29.4438 8.46875 29.5125 10.025C29.5875 11.7125 29.6063 12.2188 29.6063 16.4875C29.6063 20.7625 29.5875 21.2688 29.5125 22.95C29.4438 24.5125 29.1813 25.3563 28.9625 25.9188C28.675 26.6625 28.325 27.2 27.7688 27.7563C27.2063 28.3188 26.675 28.6625 25.9313 28.95C25.3688 29.1688 24.5188 29.4313 22.9625 29.5C21.275 29.575 20.7688 29.5938 16.5 29.5938C12.225 29.5938 11.7188 29.575 10.0375 29.5C8.475 29.4313 7.63125 29.1688 7.06875 28.95C6.325 28.6625 5.7875 28.3125 5.23125 27.7563C4.66875 27.1938 4.325 26.6625 4.0375 25.9188C3.81875 25.3563 3.55625 24.5063 3.4875 22.95C3.4125 21.2625 3.39375 20.7563 3.39375 16.4875C3.39375 12.2125 3.4125 11.7063 3.4875 10.025C3.55625 8.4625 3.81875 7.61875 4.0375 7.05625C4.325 6.3125 4.675 5.775 5.23125 5.21875C5.79375 4.65625 6.325 4.3125 7.06875 4.025C7.63125 3.80625 8.48125 3.54375 10.0375 3.475C11.7188 3.4 12.225 3.38125 16.5 3.38125ZM16.5 0.5C12.1563 0.5 11.6125 0.51875 9.90625 0.59375C8.20625 0.66875 7.0375 0.94375 6.025 1.3375C4.96875 1.75 4.075 2.29375 3.1875 3.1875C2.29375 4.075 1.75 4.96875 1.3375 6.01875C0.94375 7.0375 0.66875 8.2 0.59375 9.9C0.51875 11.6125 0.5 12.1562 0.5 16.5C0.5 20.8438 0.51875 21.3875 0.59375 23.0938C0.66875 24.7938 0.94375 25.9625 1.3375 26.975C1.75 28.0313 2.29375 28.925 3.1875 29.8125C4.075 30.7 4.96875 31.25 6.01875 31.6562C7.0375 32.05 8.2 32.325 9.9 32.4C11.6063 32.475 12.15 32.4937 16.4938 32.4937C20.8375 32.4937 21.3813 32.475 23.0875 32.4C24.7875 32.325 25.9563 32.05 26.9688 31.6562C28.0188 31.25 28.9125 30.7 29.8 29.8125C30.6875 28.925 31.2375 28.0313 31.6438 26.9813C32.0375 25.9625 32.3125 24.8 32.3875 23.1C32.4625 21.3938 32.4813 20.85 32.4813 16.5063C32.4813 12.1625 32.4625 11.6188 32.3875 9.9125C32.3125 8.2125 32.0375 7.04375 31.6438 6.03125C31.25 4.96875 30.7063 4.075 29.8125 3.1875C28.925 2.3 28.0313 1.75 26.9813 1.34375C25.9625 0.95 24.8 0.675 23.1 0.6C21.3875 0.51875 20.8438 0.5 16.5 0.5Z"
          fill="#BEBEBE"
        />
        <path
          d="M16.5 8.28125C11.9625 8.28125 8.28125 11.9625 8.28125 16.5C8.28125 21.0375 11.9625 24.7188 16.5 24.7188C21.0375 24.7188 24.7188 21.0375 24.7188 16.5C24.7188 11.9625 21.0375 8.28125 16.5 8.28125ZM16.5 21.8312C13.5563 21.8312 11.1687 19.4438 11.1687 16.5C11.1687 13.5563 13.5563 11.1687 16.5 11.1687C19.4438 11.1687 21.8312 13.5563 21.8312 16.5C21.8312 19.4438 19.4438 21.8312 16.5 21.8312Z"
          fill="#BEBEBE"
        />
        <path
          d="M26.9625 7.95782C26.9625 9.02032 26.1 9.87657 25.0438 9.87657C23.9813 9.87657 23.125 9.01407 23.125 7.95782C23.125 6.89531 23.9875 6.03906 25.0438 6.03906C26.1 6.03906 26.9625 6.90156 26.9625 7.95782Z"
          fill="#BEBEBE"
        />
      </g>
      <defs>
        <clipPath id="clip0_6301_55167">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const FbIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
    >
      <g clip-path="url(#clip0_6301_55171)">
        <path
          d="M16.5 0.5C7.66352 0.5 0.5 7.66352 0.5 16.5C0.5 24.0034 5.66608 30.2997 12.635 32.029V21.3896H9.33584V16.5H12.635V14.3931C12.635 8.94736 15.0997 6.4232 20.4462 6.4232C21.46 6.4232 23.2091 6.62224 23.9246 6.82064V11.2526C23.547 11.213 22.891 11.1931 22.0763 11.1931C19.453 11.1931 18.4392 12.187 18.4392 14.7707V16.5H23.6654L22.7675 21.3896H18.4392V32.3829C26.3618 31.4261 32.5006 24.6805 32.5006 16.5C32.5 7.66352 25.3365 0.5 16.5 0.5Z"
          fill="#BEBEBE"
        />
      </g>
      <defs>
        <clipPath id="clip0_6301_55171">
          <rect
            width="32"
            height="32"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Modal;
