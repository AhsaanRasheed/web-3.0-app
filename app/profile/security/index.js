"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from "./style.module.scss";
import InputTxtNew from "./_component/InputTxt/InputTxtNew";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import Button from "./_component/button/Button";
import {
  update_current_pwd,
  get_user_profile, 
  put_allow_login_username,
} from "@/app/services/new_service";
const Security = (props) => {
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
  const [radioBtn, setRadioBtn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [changePwd, setChangePwd] = useState(false);
  const getValue = async () => {
    toggleLoader(true);
    try {
      let va = await get_user_profile();
      console.log(va);
      setRadioBtn(va.login_with_username);
      setUsername(va.username);
      setEmail(va.email);
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };

  const submitAllowUsername = async () => {
    try {
      toggleLoader(true);
      let resp = await put_allow_login_username(!radioBtn);
      console.log(resp);
      if (resp.message == "login with username setting updated successfully") {
        handleAddNotification("success", "Login Setting updated.");
      } else {
        handleAddNotification("fail", "Failed to update setting.");
      }
      // setChangePwd(false);
    } catch (error) {
    } finally {
      toggleLoader(false);
    }
  };

  const SubmitToChangePwd = async (old_password, new_password) => {
    try {
      toggleLoader(true);
      let resp = await update_current_pwd(old_password, new_password);
      console.log(resp);
      if (resp.message == "Password has been changed successfully") {
        handleAddNotification(
          "success",
          "Password has been changed successfully"
        );
        setChangePwd(false);
      } else if (resp.message == "old password does not match") {
        handleAddNotification("fail", "Old password does not match");
      } else {
        handleAddNotification("fail", "Failed to update Password");
      }
    } catch (error) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getValue();
  }, []);
  return (
    <>
      <div className={style.mainCard}>
        <div className={style.infoCard}>
          <div className={style.HideonMob}>
            <label className={style.maintitle}>Sign in</label>
          </div>
          <div className={`${style.subtitle} ${style.HideonMob}`}>
            <label>
              Choosing username only can help protect personally identitable
              information {"("}PII{")"} and prevent others from trying to use
              your email address to sign in to your account without your
              permission.
            </label>
          </div> 
          <div className={style.btmSigninWith}>
            <div className={style.title}>
              <label>Sign in with </label>
            </div>
            <div className={style.ShowRowMobUserEmail}>
              <div className={style.col}>
                <label className={style.key}>Username:</label>
                <label className={style.value}>{username}</label>
              </div>
              <div className={style.col}>
                <label className={style.key}>Email:</label>
                <label className={style.value}>{email}</label>
              </div>
            </div>
            <div className={style.rowOf}>
              <RadioBtn
                isSelected={!radioBtn}
                onSelect={() => {
                  setRadioBtn(false);
                  submitAllowUsername();
                }}
              />
              <div className={style.value}>
                <label>
                  Email address{" "}
                  <label className={style.offShade}>
                    {" "}
                    {"("}
                    {email}
                    {") "}
                  </label>
                  {"  "}OR Username{" "}
                  <label className={style.offShade}>
                    {" "}
                    {"("}
                    {username}
                    {")"}
                  </label>
                </label>
              </div>
            </div>
            <div className={style.rowOf}>
              <RadioBtn
                isSelected={radioBtn}
                onSelect={() => {
                  setRadioBtn(true);
                  submitAllowUsername();
                }}
              />
              <div className={style.value}>
                <label>
                  Username only{" "}
                  <label className={style.offShade}>
                    {" "}
                    {"("}
                    {username}
                    {")"}
                  </label>
                </label>
              </div>
            </div>

            <div className={style.ShowOnMobBtmInfo}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  minWidth: "17px",
                  minHeight: "16px",
                }}
              >
                <path
                  d="M8.4987 14.6693C12.1806 14.6693 15.1654 11.6845 15.1654 8.0026C15.1654 4.32071 12.1806 1.33594 8.4987 1.33594C4.8168 1.33594 1.83203 4.32071 1.83203 8.0026C1.83203 11.6845 4.8168 14.6693 8.4987 14.6693Z"
                  stroke="#BEBEBE"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 5.33594V8.0026"
                  stroke="#BEBEBE"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 10.6641H8.50667"
                  stroke="#BEBEBE"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label>
                Choosing username only can help protect personally identitable
                information (PII) and prevent others from trying to use your
                email address to sign in to your account without your
                permission.
              </label>
            </div>
          </div>
        </div>
        <div className={`${style.infoCard} ${style.infoCardBelow}`}>
          <div className={style.topBar}>
            <div>
              <label className={style.maintitle}>Password</label>
              <div className={style.subtitle}>
                <label>
                  Protect your account with a strong unique password.
                </label>
              </div>
            </div>
            {changePwd ? (
              <div className={style.btnPwd} onClick={() => setChangePwd(false)}>
                <label>Close</label>
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
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : (
              <div className={style.btnPwd} onClick={() => setChangePwd(true)}>
                <label>Change password</label>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    minWidth: "24px",
                    minHeight: "24px",
                  }}
                >
                  <g clip-path="url(#clip0_4431_160425)">
                    <path
                      d="M15.334 6.0015C15.5091 5.82641 15.7169 5.68751 15.9457 5.59275C16.1745 5.49799 16.4197 5.44922 16.6673 5.44922C16.9149 5.44922 17.1601 5.49799 17.3889 5.59275C17.6177 5.68751 17.8256 5.82641 18.0007 6.0015C18.1757 6.1766 18.3146 6.38447 18.4094 6.61324C18.5042 6.84202 18.5529 7.08721 18.5529 7.33484C18.5529 7.58246 18.5042 7.82766 18.4094 8.05643C18.3146 8.28521 18.1757 8.49307 18.0007 8.66817L9.00065 17.6682L5.33398 18.6682L6.33398 15.0015L15.334 6.0015Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4431_160425">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(4 4)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
          </div>

          <div className={style.pwdCon}>
            {changePwd ? (
              <PwdChangeRow
                onSubmit={(old_password, new_password) =>
                  SubmitToChangePwd(old_password, new_password)
                }
              />
            ) : (
              <label className={style.pwdLbl}>*****************</label>
            )}
            {/* */}
          </div>
          {changePwd ? (
            <div className={style.btnPwdMob} onClick={() => setChangePwd(false)}>
              <label>Close</label>
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
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className={style.btnPwdMob} onClick={() => setChangePwd(true)}>
              <label>Change password</label>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  minWidth: "24px",
                  minHeight: "24px",
                }}
              >
                <g clip-path="url(#clip0_4431_160425)">
                  <path
                    d="M15.334 6.0015C15.5091 5.82641 15.7169 5.68751 15.9457 5.59275C16.1745 5.49799 16.4197 5.44922 16.6673 5.44922C16.9149 5.44922 17.1601 5.49799 17.3889 5.59275C17.6177 5.68751 17.8256 5.82641 18.0007 6.0015C18.1757 6.1766 18.3146 6.38447 18.4094 6.61324C18.5042 6.84202 18.5529 7.08721 18.5529 7.33484C18.5529 7.58246 18.5042 7.82766 18.4094 8.05643C18.3146 8.28521 18.1757 8.49307 18.0007 8.66817L9.00065 17.6682L5.33398 18.6682L6.33398 15.0015L15.334 6.0015Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4431_160425">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(4 4)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          )}
        </div>
        <div className={style.infoCard}>
          <div className={style.topBar}>
            <div>
              <label className={style.maintitle}>
                Set up Two-Factor Authentication ( 2FA )
              </label>
              <div className={style.subtitle}>
                <label>
                  Protect your account by using a sign in 2FA confirmation.{" "}
                  <label style={{ color: "#D376FF" }}>Learn more</label>
                </label>
              </div>
            </div>
            <div className={style.btmhigh}>
              <label>Enable 2FA</label>
              <span className={style.tooltiptext}>Coming soon</span>
            </div>
            <span className={style.tooltiptextMob}>Coming soon</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Security;

const PwdChangeRow = ({ onSubmit }) => {
  const [currentPwd, setCurrentPwd] = useState("");

  const [cpwd, setCPwd] = useState("");
  const [password, setPwd] = useState("");

  const [showPwdError, setShowPwdError] = useState(false);
  const [showCPwdError, setshowCPwdError] = useState(false);

  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);

  useEffect(() => {
    if (password.length > 1) passwordIsValid();
  }, [password]);

  const passwordIsValid = () => {
    let passwordIsValidBool = true;

    if (password.length < 8) {
      setEightCharactersLongError(true);
      passwordIsValidBool = false;
    } else {
      setEightCharactersLongError(false);
    }

    if (!/[a-z]/.test(password)) {
      setOneLowerCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneLowerCaseLetterError(false);
    }

    if (!/[A-Z]/.test(password)) {
      setOneUpperCaseLetterError(true);
      passwordIsValidBool = false;
    } else {
      setOneUpperCaseLetterError(false);
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      setOneSpecialCharacterError(true);
      passwordIsValidBool = false;
    } else {
      setOneSpecialCharacterError(false);
    }
    if (!passwordIsValidBool) {
      setShowPwdError(true);
    } else {
      setShowPwdError(false);
    }
    return passwordIsValidBool;
  };

  const BeforeSub = () => {
    let isAllValid = true;
    isAllValid = passwordIsValid() && isAllValid;
    if (password == cpwd) {
    } else {
      setshowCPwdError(true);
      isAllValid = false;
    }

    if (isAllValid) {
      onSubmit(currentPwd, password);
    }
  };
  return (
    <div className={style.rowofPwdChange}>
      <div className={style.row}>
        <div className={style.colItem}>
          <InputTxtNew
            label="Current password"
            onChange={(e) => {
              setCurrentPwd(e);
            }}
            value={currentPwd}
            errorMsg={""}
            showError={false}
            placeHolder={"*******"}
            isPwd={true}
          />
        </div>
        <div className={style.colItem}>
          <InputTxtNew
            label="New password"
            onChange={(e) => {
              setPwd(e);
            }}
            value={password}
            errorMsg={""}
            showError={showPwdError}
            placeHolder={"************"}
            isPwd={true}
            showErrorCard={true}
            perror={{
              long: eightCharactersLongError,
              lower: oneLowerCaseLetterError,
              special: oneSpecialCharacterError,
              upper: oneUpperCaseLetterError,
            }}
          />
        </div>
        <div className={style.colItem}>
          <InputTxtNew
            label="Confirm new password"
            onChange={(e) => {
              setCPwd(e);
              if (password == e && showCPwdError) {
                setshowCPwdError(false);
              }
            }}
            value={cpwd}
            errorMsg={"Passwords don’t match"}
            showError={showCPwdError}
            placeHolder={"************"}
            onBlurPwd={() => {
              if (password == cpwd) {
                // setshowCPwdError(false);
              } else {
                setshowCPwdError(true);
              }
            }}
            isPwd={true}
          />
        </div>
      </div>
      <div className={style.btnConSave}>
        <Button
          txt={"Save changes"}
          onClick={() => {
            BeforeSub();
          }}
        />
      </div>
    </div>
  );
};

const RadioBtn = ({ isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect()}
      style={{
        minWidth: "16px",
        minHeight: "16px",
        maxWidth: "16px",
        maxHeight: "16px",
        cursor: "pointer",
      }}
    >
      {isSelected ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "16px",
            minHeight: "16px",
          }}
        >
          <rect
            x="1"
            y="1"
            width="14"
            height="14"
            rx="7"
            stroke="#D376FF"
            stroke-width="2"
          />
          <rect
            x="4.5"
            y="4.5"
            width="7"
            height="7"
            rx="3.5"
            fill="#D376FF"
            stroke="#D376FF"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="15"
            height="15"
            rx="7.5"
            stroke="#D376FF"
          />
        </svg>
      )}
    </div>
  );
};
