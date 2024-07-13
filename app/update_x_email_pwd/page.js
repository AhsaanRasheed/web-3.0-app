"use client";
import React, { useEffect, useState, useCallback } from "react";
import ProfileBar from "../_components/ProfileBar";

import style from "./style.module.scss";
// import mainStyle from "../style.module.scss";
import OutlineBtn from "./authComponents/outlineBtn/OutlineBtn";
import { useRouter } from "next/navigation";
import Button from "./authComponents/button/Button";
import InputTxtNew from "./authComponents/InputTxt/InputTxtNew";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useSelector } from "react-redux";
// import { reset_pw_api } from "@/app/services/service";
import {
  update_email_pwd_X,
  update_email_resent_X,
  update_email_verify_otp_X,
} from "../services/new_service";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Page() {
  const [isMobileView, setIsMobileView] = useState(false);
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const email_se = searchParams.get("email");

  const [email, setEmail] = useState("");
  const [verifyEmailSend, setVerifyEmailSend] = useState(false);
  const [cpwd, setCPwd] = useState("");
  const [password, setPwd] = useState("");
  const [showPwdError, setShowPwdError] = useState(false);
  const [showCPwdError, setshowCPwdError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [usernameAlreadyUsedError, setUsernameAlreadyUsedError] =
    useState(false);
  const [emailAlreadyUsedError, setEmailAlreadyUsedError] = useState(false);
  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  useEffect(() => {
    if (showEmailError) emailIsValid();
  }, [email]);
  const emailIsValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setShowEmailError(true);
      return false;
    } else {
      setShowEmailError(false);
      return true;
    }
  };
  useEffect(() => {
    if (password.length > 1) passwordIsValid();
  }, [password]);
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
    if (email_se) {
      setVerifyEmailSend(true);
      setEmail(email);
    }
  }, []);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoader(true);
    let isAllValid = true;
    isAllValid = emailIsValid() && isAllValid;
    isAllValid = passwordIsValid() && isAllValid;
    try {
      if (isAllValid) {
        if (verifyEmailSend) {
          let resp = await update_email_resent_X();
          console.log(resp);
          if (resp.message == "Email already verified") {
            handleAddNotification("success", "Email already verified");
            router.push("/rewards/");
          } else if (resp.message == "Email already in use") {
            handleAddNotification("fail", "Email already in use");
          } else if (resp.message == "OTP has been resent to your email.") {
            handleAddNotification(
              "success",
              "Verification link has been resent to your email."
            );
          }
        } else {
          let resp = await update_email_pwd_X(email, password);
          console.log(resp);
          if (resp.message == "Email already verified") {
            handleAddNotification("success", "Email already verified");
            router.push("/rewards/");
          } else if (
            resp.message ==
            "Password updated. Verification email has been sent to your email address."
          ) {
            setVerifyEmailSend(true);
            handleAddNotification(
              "success",
              "Password updated. Verification email has been sent to your email address."
            );

            router.push(pathname + "?" + createQueryString("email", email));
            // router.push(pathname + "?" + createQueryString("uid", resp?.data?.user_id));
          } else if (resp.message == "Email already in use") {
            handleAddNotification("fail", "Email already in use");
            setShowEmailError("Email already in use");
          }
        }
      }
    } catch (error) {
      console.log(error);
      handleAddNotification("fail", "Some error occured.");
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="pageContainer">
      <ProfileBar
        title="My Profile"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl="/profile/dario-hanke.svg"
        isMobileView={isMobileView}
      />
      <div className={style.container}>
        <div className={style.card}>
          <label className={style.mainHeading}>Update Information</label>
          <label className={style.subhead}>
            {verifyEmailSend ? (
              <>
                We just sent a verification link to <span>{email}</span>. Please check your inbox. Verification link
                is <span>valid for 30 minutes</span>
              </>
            ) : (
              "Provide your Email and Password which you want to update."
            )}
          </label>
          <form noValidate={true} onSubmit={handleSubmit}>
            {!verifyEmailSend && (
              <>
                <InputTxtNew
                  label="Email"
                  onChange={(e) => {
                    setEmail(e);
                  }}
                  value={email}
                  errorMsg={"Please enter a valid email address"}
                  showError={showEmailError}
                  placeHolder={"Enter your email"}
                  isPwd={false}
                  type="email"
                />

                <InputTxtNew
                  label="Password"
                  onChange={(e) => {
                    setPwd(e);
                  }}
                  value={password}
                  errorMsg={""}
                  showError={showPwdError}
                  placeHolder={"Enter your password"}
                  isPwd={true}
                  showErrorCard={true}
                  perror={{
                    long: eightCharactersLongError,
                    lower: oneLowerCaseLetterError,
                    special: oneSpecialCharacterError,
                    upper: oneUpperCaseLetterError,
                  }}
                />
              </>
            )}
            {/* <InputTxtNew
                label="Confirm Password"
                onChange={(e) => {
                  setCPwd(e);
                  if (password == e && showCPwdError) {
                    setshowCPwdError(false);
                  }
                }}
                value={cpwd}
                errorMsg={"Passwords don’t match"}
                showError={showCPwdError}
                placeHolder={"Confirm your password"}
                onBlurPwd={() => {
                  if (password == cpwd) {
                    // setshowCPwdError(false);
                  } else {
                    setshowCPwdError(true);
                  }
                }}
                isPwd={true}
              /> */}
            <Button
              txt={verifyEmailSend ? "Resend" : "Update"}
              onClick={() => {}}
            />
            <br />
            <OutlineBtn
              txt={"Cancel"}
              onClick={() => router.push("/rewards/")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
