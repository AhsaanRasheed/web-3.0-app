"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import mainStyle from "../../style.module.scss";
import InputTxtNew from "../InputTxt/InputTxtNew";
import InviteModal from "../InviteModal";

export default function InViteCard() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [emailLst, setEmailLst] = useState([]);
  const [openEmailDropDown, setOpenEmailDropDown] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const prevOpenEmailDropDownRef = useRef(false);
  const EmailCodeDropDowndivRef = useRef(null);

  const removeItem = (indexToRemove) => {
    setEmailLst((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let result = email.replaceAll(" ", ";");
    result = result.replaceAll(",", ";");
    let tempEmails = result.split(";");
    tempEmails.forEach((element) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailPattern.test(element)) {
        if (!emailLst.includes(element))
          setEmailLst((prevItems) => [element, ...prevItems]);

        if (emailError) setEmailError(false);
      } else {
        setEmailError(true);
      }
    });
    setEmail("");
  };

  useEffect(() => {
    if (
      prevOpenEmailDropDownRef.current &&
      !openEmailDropDown &&
      EmailCodeDropDowndivRef.current
    ) {
      EmailCodeDropDowndivRef.current.classList.add(style.closecardInvite);
    }
    prevOpenEmailDropDownRef.current = openEmailDropDown;
  }, [openEmailDropDown]);

  return (
    <>
      <div
        ref={EmailCodeDropDowndivRef}
        className={`${style.inviteCardcon} ${
          openEmailDropDown && style.opencardInvite
        }`}
      >
        <div
          className={style.MobDropArrow}
          onClick={() => {
            setOpenEmailDropDown(!openEmailDropDown);
          }}
        >
          <OpenDropDownArrow isOpen={openEmailDropDown} />
        </div>
        <div className={style.topBar}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
              stroke="#D376FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 6L12 13L2 6"
              stroke="#D376FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{" "}
          <label>Invite by sending your friends an E-mail</label>{" "}
        </div>
        <div className={style.body}>
          <div className={style.top}>
            <label>
              You can send multiple E-mails by hitting Enter button on the
              keyboard after each email added.
            </label>
          </div>
          <div
            className={`${style.btm} ${
              emailLst.length > 0 && style.widthfullBtm
            }`}
          >
            <div
              className={`${style.left} ${
                emailLst.length == 0 && style.leftEmailNull
              }`}
            >
              <form className={style.inputCon} onSubmit={handleSubmit}>
                <InputTxtNew
                  label={"Email"}
                  placeHolder={"Email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.toLowerCase());
                  }}
                  showError={emailError}
                  errorMsg={"Email should be correct"}
                />
              </form>
              <div className={style.btnCon}>
                <button
                  type="button"
                  className={`${mainStyle.button} ${mainStyle.Deskbutton}`}
                  onClick={() => {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!email.length && !emailLst.length) {
                      setEmailError(true);
                      return;
                    } else if (
                      !emailLst.length &&
                      email.length > 0 &&
                      !email.includes(" ") &&
                      !email.includes(",") &&
                      !email.includes(";")
                    ) {
                      if (!emailPattern.test(email)) {
                        setEmailError(true);
                        return;
                      }
                    }
                    let result = email.replaceAll(" ", ";");
                    result = result.replaceAll(",", ";");
                    let tempEmails = result.split(";");
                    tempEmails.forEach((element) => {
                      if (emailPattern.test(element)) {
                        if (!emailLst.includes(element))
                          setEmailLst((prevItems) => [element, ...prevItems]);

                        if (emailError) setEmailError(false);
                      } else {
                        setEmailError(true);
                      }
                    });
                    setEmail("");
                    setShowEmail(false);
                    setShowInviteModal(true);
                  }}
                >
                  Send Email
                </button>
                <button
                  type="button"
                  className={`${mainStyle.button} ${mainStyle.Mobbutton}`}
                  onClick={() => {
                    setShowEmail(true);
                    setShowInviteModal(true);
                  }}
                >
                  Send Email
                </button>
              </div>
            </div>
            <div
              className={`${style.right}  ${
                emailLst.length == 0
                  ? style.rightEmailNull
                  : style.rightEmailNotNull
              }`}
            >
              <div className={style.rightTitle}>
                To:{" "}
                {emailLst.length == 0 && (
                  <label className={style.noEmail}>
                    <br />
                    You haven't selected any email address yet
                  </label>
                )}
              </div>
              {emailLst.slice(0, 10).map((item, index) => (
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
              {emailLst.length > 10 && (
                <div
                  onClick={() => {
                    setShowEmail(true);
                    setShowInviteModal(true);
                  }}
                  className={style.moreLbl}
                >
                  <label>
                    & {emailLst.length - 10} more... 

                  </label><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showInviteModal && (
        <InviteModal
          showEmail={showEmail}
          emailOldLst={emailLst}
          onClose={() => {
            setEmailLst([]);
            setShowInviteModal(false);
          }}
        />
      )}
    </>
  );
}

const OpenDropDownArrow = ({ isOpen }) => {
  return isOpen ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.58958 12.2559C5.26414 12.5814 4.73651 12.5814 4.41107 12.2559C4.08563 11.9305 4.08563 11.4028 4.41107 11.0774L9.41107 6.07741C9.73651 5.75197 10.2641 5.75197 10.5896 6.07741L15.5896 11.0774C15.915 11.4028 15.915 11.9305 15.5896 12.2559C15.2641 12.5814 14.7365 12.5814 14.4111 12.2559L10.0003 7.84518L5.58958 12.2559Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.58958 7.74408C5.26414 7.41864 4.73651 7.41864 4.41107 7.74408C4.08563 8.06951 4.08563 8.59715 4.41107 8.92259L9.41107 13.9226C9.73651 14.248 10.2641 14.248 10.5896 13.9226L15.5896 8.92259C15.915 8.59715 15.915 8.06951 15.5896 7.74408C15.2641 7.41864 14.7365 7.41864 14.4111 7.74408L10.0003 12.1548L5.58958 7.74408Z"
        fill="white"
      />
    </svg>
  );
};
