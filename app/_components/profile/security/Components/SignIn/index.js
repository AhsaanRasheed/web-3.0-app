"use client";
import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Modal from "@/app/_components/Modal";
import Tooltip from "@/app/_components/ToolTip";
import Factor from "./2Factor";
import { update_pw } from "@/app/services/service";

const SignIn = ({ title, buttonText, data }) => {
  const [showModal, setShowModal] = useState(false);
  const username = data.find((item) => item.label === "Username")?.value || "";
  const email = data.find((item) => item.label === "Email")?.value || "";
  const password = data.find((item) => item.label === "Password")?.value || "";

  // //////////////////////////////////////////////////////////////////////////////
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [isPwdFocused, setIsPwdFocused] = useState(false);

  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);

  const tooltipMessages = {
    title: "Password must",
    messageList: [
      {
        text: "Password must be at least 8 characters long",
        status: eightCharactersLongError ? "fail" : "pass",
      },
      {
        text: "Password must contain at least one special character",
        status: oneSpecialCharacterError ? "fail" : "pass",
      },
      {
        text: "One lower case letter.",
        status: oneLowerCaseLetterError ? "fail" : "pass",
      },
      {
        text: "Password must contain at least one upper case.",
        status: oneUpperCaseLetterError ? "fail" : "pass",
      },
    ],
  };
  const handlePwdFocus = () => {
    setIsPwdFocused(true);
  };

  const handlePwdBlur = () => {
    setIsPwdFocused(false);
  };

  useEffect(() => {
    if (newPasswordError) setNewPasswordError(false);
    passwordIsValid();
  }, [newPassword]);
  useEffect(() => {
    if (confirmPasswordError) setConfirmPasswordError(false);
  }, [confirmPassword]);

  const passwordIsValid = () => {
    let passwordIsValidBool = true;

    if (newPassword.length < 8) {
      console.log("setEightCharactersLongError");
      setEightCharactersLongError(true);
      passwordIsValidBool = false;
    } else {
      setEightCharactersLongError(false);
    }

    if (!/[a-z]/.test(newPassword)) {
      console.log("setOneLowerCaseLetterError");
      setOneLowerCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneLowerCaseLetterError(false);
    }

    if (!/[A-Z]/.test(newPassword)) {
      console.log("setOneUpperCaseLetterError");

      setOneUpperCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneUpperCaseLetterError(false);
    }

    if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      console.log("setOneSpecialCharacterError");

      setOneSpecialCharacterError(true);
      passwordIsValidBool = false;
    } else {
      setOneSpecialCharacterError(false);
    }

    return passwordIsValidBool;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordIsValid()) {
      if (newPassword == confirmPassword) {
        const resp = await update_pw(currentPassword, newPassword);
        console.log("update_pw Resp: ", resp);
        if (resp.code === 2001) {
          alert("Old password doesn't match");
        } else if (resp.code === 200) {
          setConfirmPassword("");
          setCurrentPassword("");
          setNewPassword("");
          alert("password updated successfully");

          setShowModal(false);
        }
      } else {
        setConfirmPasswordError(true);
      }
    } else {
      setNewPasswordError(true);
    }
  };
  return (
    <div className="profile_component_container">
      <div className="info-box">
        <div className="info-box-content">
          <div className="info-box-title">{title}</div>
          <div className="info-box-inner">
            <div className="info-box-details-space">
              <div className="info-table">
                <div className={`info-table-row ${styles.row}`}>
                  <div className={`text-style-1 ${styles.text_head}`}>
                    Sign In with
                  </div>
                  <div className="info-table-row-details">
                    <label className={styles["container"]}>
                      <p className={`text-style-1 ${styles.table_detail}`}>
                        Username (
                        <span className="text-style-2">{username}</span>) only
                      </p>
                      <input type="radio" name="radio" />
                      <span className={styles["checkmark"]}></span>
                    </label>
                    <label className={styles["container"]}>
                      <p className={`text-style-1 ${styles.table_detail}`}>
                        Email address (
                        <span className="text-style-2">{email}</span>) and
                        Username (
                        <span className="text-style-2">{username}</span>)
                      </p>
                      <input type="radio" name="radio" />
                      <span className={styles["checkmark"]}></span>
                    </label>
                    <label className={styles["container"]}>
                      <p className="text-style-1">
                        Choosing {'"Username only"'} can help protect personally
                        identifiable information (PII) and prevent others from
                        trying to use your email address to sign in to your
                        account without your permission.
                      </p>
                    </label>
                  </div>
                </div>
                <div className={`info-table-row ${styles.row}`}>
                  <div className={`text-style-1 ${styles.text_head}`}>
                    Password
                  </div>
                  <div className="info-table-row-details">
                    <label className={styles["container"]}>
                      <p className={`text-style-2 ${styles.table_detail}`}>
                        {Array(password.length + 1).join("*")}
                      </p>
                      <p className="text-style-1">
                        Protect your account with a strong, unique password that
                        you {"don't"} use anywhere else.
                      </p>
                    </label>
                  </div>
                </div>
              </div>
              <div className="info-box-button">
                <div className="button-container">
                  <div className={styles.btnContainerForTooltip}>
                    <button
                      type="submit"
                      className="button-style"
                      onClick={() => setShowModal(true)}
                    >
                      <p className="button-text">{buttonText}</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Factor
        title="Set up Two-Factor Authentication (2FA)"
        buttonText="Enable"
      ></Factor>
      <Modal showModal={showModal} onClose={() => setShowModal(false)}>
        <>
          <div className="heading-container">
            <h1 className="heading-1">Change password</h1>
            <p className="heading-1-paraText">
              For high security don’t reuse the <br />
              existing password
            </p>
          </div>

          <form className="content" onSubmit={handleSubmit} noValidate={true}>
            <div className="form-container">
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Сurrent Password
                </label>
                <div className="input-container">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type={`${showCurrentPassword ? "text" : "password"}`}
                      placeholder="******************"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    // autocomplete="new-password"
                    />
                    <img
                      src="/icons/pwdShow.png"
                      style={{ width: "17.2px", height: "8.8px" }}
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      alt="showPassword"
                    />
                  </div>
                </div>
              </div>
              <div className="input-group">
                {isPwdFocused && <Tooltip messages={tooltipMessages} />}

                <label htmlFor="password" className="input-label">
                  New Password
                </label>
                <div className="input-container">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type={`${showNewPassword ? "text" : "password"}`}
                      placeholder="******************"
                      value={newPassword}
                      onFocus={handlePwdFocus}
                      onBlur={handlePwdBlur}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autocomplete="new-password"
                      required
                    />
                    <img
                      src="/icons/pwdShow.png"
                      style={{ width: "17.2px", height: "8.8px" }}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      alt="showPassword"
                    />
                  </div>
                </div>
                {newPasswordError && (
                  <p className="error-text" id="username-error">
                    Password do not follow the guide
                  </p>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="password" className="input-label">
                  Confirm new Password
                </label>
                <div className="input-container">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      placeholder="******************"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autocomplete="new-password"
                      required
                    />
                    <img
                      src="/icons/pwdShow.png"
                      style={{ width: "17.2px", height: "8.8px" }}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      alt="showPassword"
                    />
                  </div>
                </div>
                {confirmPasswordError && (
                  <p className="error-text" id="username-error">
                    Password do not match
                  </p>
                )}
              </div>
            </div>
            <div className="button-container">
              <button
                type="submit"
                className="button-style"
                disabled={
                  currentPassword.length < 8 ||
                  newPassword.length < 8 ||
                  confirmPassword.length < 8
                }
              >
                <p className="button-text">Save</p>
              </button>
            </div>
          </form>
        </>
      </Modal>
    </div>
  );
};

export default SignIn;
