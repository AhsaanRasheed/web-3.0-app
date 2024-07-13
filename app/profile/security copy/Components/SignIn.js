"use client";
// SignIn.jsx
"use client";
import React, { useState, useEffect } from "react";
import styles from "../../style.module.scss";
import Modal from "@/app/_components/Modal";
import Tooltip from "@/app/_components/ToolTip";
import Button from "@/app/_components/global/Button/Button";
import RadioBox from "@/app/_components/global/RadioButton";
import { allow_login_with_username, update_pw } from "@/app/services/service";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

const SignIn = ({ isMobileView }) => {
  const user = useSelector((state) => state.profileVisibility.user);
  const [showModal, setShowModal] = useState(false);
  const [radioSelectedValue, SetRadioSelectedValue] = useState(
    JSON.parse(secureLocalStorage.getItem("loginFlag")) ? "email" : "username"
  );
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const login_with_username = (val) => {
    toggleLoader(true);
    allow_login_with_username(val == "username" ? false : true).then((res) => {
      handleAddNotification("success", "Preference updated.");
      secureLocalStorage.setItem("loginFlag", val == "username" ? false : true);
      toggleLoader(false);
    });
  };
  // const password = data.find((item) => item.label === "Password")?.value || "";

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
        text: "be at least 8 characters long.",
        status: eightCharactersLongError ? "fail" : "pass",
      },
      {
        text: "contain at least one lower case letter.",
        status: oneLowerCaseLetterError ? "fail" : "pass",
      },
      {
        text: "contain at least one special character.",
        status: oneSpecialCharacterError ? "fail" : "pass",
      },

      {
        text: "contain at least one upper case.",
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
      setEightCharactersLongError(true);
      passwordIsValidBool = false;
    } else {
      setEightCharactersLongError(false);
    }

    if (!/[a-z]/.test(newPassword)) {
      setOneLowerCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneLowerCaseLetterError(false);
    }

    if (!/[A-Z]/.test(newPassword)) {
      setOneUpperCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneUpperCaseLetterError(false);
    }

    if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      setOneSpecialCharacterError(true);
      passwordIsValidBool = false;
    } else {
      setOneSpecialCharacterError(false);
    }

    return passwordIsValidBool;
  };
  const handleSubmit = async (e) => {
    toggleLoader(true);

    e.preventDefault();
    if (passwordIsValid()) {
      if (newPassword == confirmPassword) {
        const resp = await update_pw(currentPassword, newPassword);
        console.log("update_pw Resp: ", resp);
        if (resp.code === 2001) {
          toggleLoader(false);

          handleAddNotification("fail", "Old password doesn't match");
          // setShowModal(false);

          // alert("Old password doesn't match");
        } else if (resp.code === 200) {
          setConfirmPassword("");
          setCurrentPassword("");
          setNewPassword("");
          // alert("password updated successfully");
    toggleLoader(false);

          handleAddNotification(
            "success",
            "Your password has been successfully saved"
          );

          setShowModal(false);
        }
      } else {
        
        setConfirmPasswordError(true);
      }
    } else {
      setNewPasswordError(true);
    }
    toggleLoader(false);

  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <label className={`${isMobileView ? "txt_Title2" : "txt_Heading3"}`}>
            Sign In
          </label>
        </div>
        <div className={`${styles.cardBody} `}>
          <div className={`${styles.infoSide} ${styles.securitySigninBody} `}>
            <div className={`${styles.securitySigninRow} ${styles.row}`}>
              <div className={styles.type}>
                <label className="txt_Body2">Sign In with</label>
              </div>
              <div className={`${styles.securitySignin} `}>
                {isMobileView ? <br /> : ""}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      minWidth: "24px",
                      marginRight: "16px",
                    }}
                  >
                    <RadioBox
                      selectedValue={radioSelectedValue}
                      value={"username"}
                      onChange={(e) => {
                        login_with_username(e);
                        SetRadioSelectedValue(e);
                      }}
                    />
                  </div>
                  <label className="txt_Body1">
                    Email address (<b>{user.email}</b>) only
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: isMobileView ? "5px" : "10px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      minWidth: "24px",
                      marginRight: "16px",
                    }}
                  >
                    <RadioBox
                      selectedValue={radioSelectedValue}
                      value={"email"}
                      onChange={(e) => {
                        login_with_username(e);
                        SetRadioSelectedValue(e);
                      }}
                    />
                  </div>
                  <label className="txt_Body1">
                    Username (<b>{user.username}</b>) and Email address (
                    <b>{user.email}</b>)
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: isMobileView ? "5px" : "10px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      minWidth: "24px",
                      marginRight: "16px",
                    }}
                  ></div>
                  <label
                    className="txt_Caption"
                    style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  >
                    Choosing “Username" can help protect personally identitable
                    information (PII) {isMobileView ? "" : <br />}
                    and prevent others from trying to use your email address to
                    sign in to you account{isMobileView ? "" : <br />} without
                    your permission.
                  </label>
                </div>
              </div>
            </div>
            <div className={`${styles.securitySigninRow} ${styles.row}`}>
              <div className={styles.type}>
                <label className="txt_Body2">Password</label>
              </div>
              <div className={`${styles.securitySignin}`}>
                {/* {isMobileView?<br />:""} */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: isMobileView ? "5px" : "10px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      minWidth: "24px",
                      marginRight: "16px",
                    }}
                  ></div>
                  <label className="txt_Body1">**********************</label>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: isMobileView ? "5px" : "10px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      minWidth: "24px",
                      marginRight: "16px",
                    }}
                  ></div>
                  <label
                    className="txt_Caption"
                    style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  >
                    Protect your account with a strong, unique{" "}
                    {isMobileView ? "" : <br />}password that you {"don't"} use
                    anywhere else.
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btnSide}>
            <Button
              text={"Change password"}
              onClick={() => setShowModal(true)}
              Custom_minWidth={"100%"}
              Custom_maxWidth={"100%"}
              Custom_width={"100%"}
              Custom_height={"51px"}
            />
          </div>
        </div>
      </div>

      <Modal showModal={showModal} onClose={() => setShowModal(false)}>
        <>
          <div className={styles.center_container}>
            <label
              className={`${
                isMobileView ? `txt_Large_title` : `txt_Heading1`
              } txt_align_center`}
            >
              Change password
            </label>
            <br />
            <label
              className={`${
                isMobileView ? `txt_Heading5` : `txt_Title1`
              } txt_align_center`}
            >
              For high security don’t reuse the
              <br /> existing password
            </label>
            <br />

            <div className={styles.Modalcontent}>
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate={true}
              >
                <div className={styles.inputBox}>
                  <InputTxt
                    value={currentPassword}
                    placeHolder="Enter current Password"
                    Custom_width="100%"
                    Custom_minWidth="99%"
                    label="Сurrent Password"
                    show_error={false}
                    error_msg={"Password is not correct"}
                    onChange={(value) => {
                      setCurrentPassword(value);
                    }}
                    isPwd={true}
                  />
                </div>
                <div className={styles.inputBox}>
                  {isPwdFocused && <Tooltip messages={tooltipMessages} />}

                  <InputTxt
                    value={newPassword}
                    placeHolder="Enter new Password"
                    label="New Password"
                    show_error={newPasswordError}
                    error_msg={"Password do not follow the guide"}
                    onChange={(value) => {
                      setNewPassword(value);
                    }}
                    onFocus={handlePwdFocus}
                    onBlur={handlePwdBlur}
                    isPwd={true}
                    Custom_width="100%"
                    Custom_minWidth="99%"
                  />
                </div>
                <div className={styles.inputBox}>
                  <InputTxt
                    value={confirmPassword}
                    placeHolder="Enter new Password"
                    Custom_width="100%"
                    Custom_minWidth="99%"
                    label="Confirm new Password"
                    show_error={confirmPasswordError}
                    error_msg={"Password do not match"}
                    onChange={(value) => {
                      setConfirmPassword(value);
                    }}
                    isPwd={true}
                  />
                </div>
                <br />
                <div className={styles.center_container}>
                  <Button
                    text="Save"
                    onClick={() => {}}
                    disable={
                      currentPassword.length < 8 ||
                      newPassword.length < 8 ||
                      confirmPassword.length < 8
                    }
                    Custom_width={isMobileView ? "100%" : null}
                    Custom_maxWidth={isMobileView ? "100%" : null}
                  />
                </div>
              </form>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default SignIn;
