"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import mainStyle from "../../style.module.scss";
import InputTxtNew from "../InputTxt/InputTxtNew";
import { post_users_invitation } from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

export default function InviteModal({
  showModal = true,
  showEmail,
  onClose,
  emailOldLst,
}) {
  const modalRef = useRef(null);
  const [alignSelfStart, setAlignSelfStart] = useState("center");
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [showConfirmationBox, setShowConfirmationBox] = useState(false);
  const [showInviteSendBox, setShowInviteSendBox] = useState(!showEmail);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const [emailLst, setEmailLst] = useState(emailOldLst);
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const send_invites = async (msg, sign, sub) => {
    toggleLoader(true);
    try {
      let referal = await post_users_invitation(sub, msg, sign, emailLst);
      console.log(referal);
      if (referal.message == "ok") {
        setShowInviteSendBox(false);
        setShowSuccessMsg(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (modalRef && modalRef.current) {
        const divHeight = modalRef.current.clientHeight;

        if (divHeight > 0.95 * window.innerHeight) {
          setAlignSelfStart("flex-start");
        } else {
          setAlignSelfStart("center");
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      // onClose();
      if (showSuccessMsg) {
        onClose();
      } else {
        setShowConfirmationBox(true);
      }
    }
  };
  const removeItem = (indexToRemove) => {
    setEmailLst((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      if (!emailLst.includes(email))
        setEmailLst((prevItems) => [email, ...prevItems]);

      if (emailError) setEmailError(false);
    } else {
      setEmailError(true);
    }
    setEmail("");
  };

  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className={style.modalContainer}
      onClick={handleClick}
    >
      <div
        className={style.Modal}
        ref={modalRef}
        style={{
          flexDirection: "column",
          alignSelf: alignSelfStart,
          marginTop: alignSelfStart !== "center" ? "20px" : "0",
          maxWidth: 515,
        }}
      >
        {(!showConfirmationBox || !showSuccessMsg) && (
          <div
            className={style.cross_div}
            onClick={() => {
              if (showSuccessMsg) {
                onClose();
              } else {
                setShowConfirmationBox(true);
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        )}

        {showConfirmationBox ? (
          <ConfirmationModal
            onClose={() => onClose()}
            onSubmit={() => {
              // setShowInviteSendBox(true);
              setShowConfirmationBox(false);
            }}
          />
        ) : showInviteSendBox ? (
          <SendInviteModal
            onSubmit={async (msg, sign, sub) => {
              await send_invites(msg, sign, sub);
            }}
          />
        ) : showSuccessMsg ? (
          <SuccessModal onClose={() => onClose()} />
        ) : (
          <div className={style.bodyCon}>
            <>
              <div className={style.title}>
                <label>Add friend’s Email</label>
              </div>

              <div className={style.subtitle}>
                <label>
                  Enter E-mail addresses of all friends you want to invite to
                  the PrimeTrader. <br />
                  Use Enter button on the keyboard to add several E-mails.
                </label>
              </div>

              <form className={style.inputCon} onSubmit={handleSubmit}>
                <InputTxtNew
                  label={"Add email"}
                  placeHolder={"Add email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.toLowerCase());
                  }}
                  showError={emailError}
                  errorMsg={"Email should be correct"}
                />
              </form>
              <div className={style.emailAddLbl}>
                <label>{emailLst.length} Emails Added</label>
              </div>
              <div className={style.EmailCon}>
                {emailLst.map((item, index) => (
                  <div className={style.emailCard} key={index}>
                    <label>{item}</label>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => removeItem(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M7.99999 8.70156L4.61792 12.0836C4.52562 12.1759 4.4096 12.2231 4.26986 12.2253C4.13012 12.2274 4.01197 12.1802 3.91539 12.0836C3.8188 11.987 3.77051 11.8699 3.77051 11.7323C3.77051 11.5947 3.8188 11.4777 3.91539 11.3811L7.29744 7.99901L3.91539 4.61695C3.82308 4.52465 3.77586 4.40863 3.77372 4.26888C3.77158 4.12915 3.8188 4.01099 3.91539 3.91441C4.01197 3.81783 4.12906 3.76953 4.26666 3.76953C4.40426 3.76953 4.52135 3.81783 4.61792 3.91441L7.99999 7.29646L11.3821 3.91441C11.4744 3.8221 11.5904 3.77488 11.7301 3.77275C11.8699 3.7706 11.988 3.81783 12.0846 3.91441C12.1812 4.01099 12.2295 4.12808 12.2295 4.26568C12.2295 4.40328 12.1812 4.52037 12.0846 4.61695L8.70254 7.99901L12.0846 11.3811C12.1769 11.4734 12.2241 11.5894 12.2263 11.7291C12.2284 11.8689 12.1812 11.987 12.0846 12.0836C11.988 12.1802 11.8709 12.2285 11.7333 12.2285C11.5957 12.2285 11.4786 12.1802 11.3821 12.0836L7.99999 8.70156Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                ))}
              </div>
              <div className={style.btnCon}>
                <button
                  type="button"
                  className={mainStyle.button}
                  onClick={() => {
                    emailLst.length > 0 ? setShowInviteSendBox(true) : "";
                  }}
                >
                  Next
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
}

const ConfirmationModal = ({ onClose, onSubmit }) => {
  return (
    <div className={style.bodyCon} style={{ width: "max-content" }}>
      <>
        <div className={style.title}>
          <label>Are you sure you want to close?</label>
        </div>

        <div className={style.subtitle}>
          <label>Everything will be deleted.</label>
        </div>

        <div className={style.btnCon0}>
          <button
            type="button"
            className={`${style.button} ${style.Outlinebutton}`}
            onClick={() => onClose()}
          >
            <div className={style.body}>Yes, close</div>
          </button>
          <button
            type="button"
            className={mainStyle.button}
            onClick={() => onSubmit()}
          >
            No, cancel
          </button>
        </div>
      </>
    </div>
  );
};

const SendInviteModal = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  // const [subject, setSubject] = useState("");
  const [signature, setSignature] = useState("");
  const [name, setName] = useState("");

  const [checkedBox, setCheckedBox] = useState(false);

  return (
    <div className={style.bodyCon}>
      <>
        <div className={style.title}>
          <label>Send an invitation to your friends</label>
        </div>

        <div className={style.subjectCon}>
          <label className={style.titleSub}>Subject</label>
          <div className={style.row}>
            <div className={style.row_input_con}>
              <CheckBox
                isChecked={!checkedBox}
                onClick={() => {
                  setCheckedBox(false);
                  // setSubject("You’ve been invited to PrimeTrader");
                }}
              />
              <label>You’ve been invited to PrimeTrader</label>
            </div>
          </div>
          <div
            style={{ marginBottom: !checkedBox ? 50 : "" }}
            className={style.row}
          >
            <div className={style.row_input_con}>
              <CheckBox
                isChecked={checkedBox}
                onClick={() => setCheckedBox(true)}
              />

              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className={style.inputAddName}
                placeholder="Add name"
              />
            </div>

            <label>Invited You to PrimeTrader</label>
          </div>
        </div>
        {checkedBox ? (
          <>
            {" "}
            <div className={style.MessageBoxCon}>
              <label>Message</label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                placeholder="Add your invitation message here"
              ></textarea>
            </div>
            <InputTxtNew
              label={"Signature"}
              value={signature}
              onChange={(e) => {
                setSignature(e);
              }}
              placeHolder={"A Warm Welcome From PrimeTrader"}
            />
          </>
        ) : null}

        <div className={style.btnCon}>
          <button
            type="button"
            className={mainStyle.button}
            onClick={() =>
              onSubmit(
                message,
                signature ? signature : "A Warm Welcome From PrimeTrader",
                checkedBox
                  ? name + " You’ve been invited to PrimeTrader"
                  : "You’ve been invited to PrimeTrader"
              )
            }
          >
            Send
          </button>
        </div>
      </>
    </div>
  );
};
const SuccessModal = ({ onClose }) => {
  const randomNumber = Math.random();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showModal && (
        <div
          className={style.bodyCon}
          style={{ width: "max-content", minWidth: 150 }}
        >
          <div className={style.svgCon}>
            {/* <img src={`/icons/successMsg.gif?cache=${randomNumber}`} /> */}
            <div class={style.successAnimation}>
              <svg
                class={style.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class={style.checkmarkCircle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class={style.checkmarkCheck}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
          <div className={style.emailSent}>Email sent</div>
        </div>
      )}
    </>
  );
};
const CheckBox = ({ isChecked, onClick }) => {
  return (
    <div onClick={() => onClick()}>
      {isChecked ? (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "17px",
            minHeight: "17px",
          }}
        >
          <circle cx="8.5" cy="8.5" r="7" stroke="#D376FF" stroke-width="2" />
          <circle cx="8.5" cy="8.5" r="4" fill="#D376FF" />
        </svg>
      ) : (
        <svg
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "17px",
            minHeight: "17px",
            cursor: "pointer",
          }}
        >
          <circle cx="8.5" cy="8.5" r="7.5" stroke="#D376FF" />
        </svg>
      )}
    </div>
  );
};
