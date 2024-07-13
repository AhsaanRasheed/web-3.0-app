"use client";
import React, { useState, useEffect, useCallback } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";
import Button from "../authComponents/button/Button";
import OutlineBtn from "../authComponents/outlineBtn/OutlineBtn";
import InputTxtNew from "../authComponents/InputTxt/InputTxtNew";
import AuthNavbar from "../authComponents/NavBar/Navbar";
import Link from "next/link";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { apiUrl } from "@/app/apiUrl";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { signup_api } from "@/app/services/service.js";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [username, setUsername] = useState("");
  const [cpwd, setCPwd] = useState("");
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const searchParams = useSearchParams();

  let referalCode = searchParams.get("rc");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPwdError, setShowPwdError] = useState(false);
  const [showCPwdError, setshowCPwdError] = useState(false);

  const [showUsernameError, setShowUsernameError] = useState(false);
  const [usernameAlreadyUsedError, setUsernameAlreadyUsedError] =
    useState(false);
  const [emailAlreadyUsedError, setEmailAlreadyUsedError] = useState(false);
  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);

  useEffect(() => {
    if (password.length > 1) passwordIsValid();
  }, [password]);
  useEffect(() => {
    if (showEmailError) emailIsValid();
    if (emailAlreadyUsedError) setEmailAlreadyUsedError(false);
  }, [email]);
  useEffect(() => {
    if (showUsernameError) usernameIsValid();
    if (usernameAlreadyUsedError) setUsernameAlreadyUsedError(false);
  }, [username]);
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("signup");
    return token;
  }, [executeRecaptcha]);
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
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
  const usernameIsValid = () => {
    if (username === undefined || username.replace(/\s/g, "") === "") {
      setShowUsernameError(true);
      return false;
    }
    if (username.includes(" ")) {
      setShowUsernameError(true);
      return false;
    }
    if (username.length < 30 && username.length >= 3) {
      if (showUsernameError) {
        setShowUsernameError(false);
      }
      return true;
    } else {
      setShowUsernameError(true);
      return false;
    }
  };

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
    let isAllValid = true;
    isAllValid = emailIsValid() && isAllValid;
    isAllValid = usernameIsValid() && isAllValid;
    isAllValid = passwordIsValid() && isAllValid;
    // if (password == cpwd) {
    // } else {
    //   setshowCPwdError(true);
    //   isAllValid = false;
    // }
    if (isAllValid) {
      toggleLoader(true);
      let recaptchaToken = await handleReCaptchaVerify();
      try {
        const resp = await signup_api(
          { email, username, password, referral_code: referalCode },
          referalCode,
          recaptchaToken
        );
        toggleLoader(false);

        if (
          resp?.message ==
          "Verification email has been sent to your email address"
        ) {
          sessionStorage.setItem("VerifyEmail", email);
          sessionStorage.setItem("Verifyuid", resp?.data.user_id);
          router.push(
            `/auth/verifyAccount/?VerifyEmail=${email}&Verifyuid=${resp?.data.user_id}`
          );
        } else if (resp?.message == "Username already in use") {
          // handleAddNotification("fail", "Username already in use");
          setUsernameAlreadyUsedError(true);
        } else if (resp?.message == "Email already in use") {
          // handleAddNotification("fail", "E-mail address is already registered");
          setEmailAlreadyUsedError(true);
        } else {
          handleAddNotification(
            "fail",
            resp?.message ? resp?.message : "Account creation failed!"
          );
        }
      } catch (e) {
      } finally {
        toggleLoader(false);
      }
    }
  };

  const loginWithGoogle = async () => {
    toggleLoader(true);

    try {
      const response = await fetch(`${apiUrl}/api/v1/login/google`);
      const data = await response.json();
      console.log("response = ", data);
      toggleLoader(false);

      if (response.status == 200) {
        localStorage.removeItem("socialReferal");
        if (referalCode) {
          localStorage.setItem("socialReferal", referalCode);
        }
        window.location.replace(data.data);
      } else {
        handleAddNotification("fail", "Error during Google login initiation");
      }
    } catch (error) {
      console.error("Error during Google login initiation: ", error);
      handleAddNotification("fail", "Error during Google login initiation");

      toggleLoader(false);
    }
  };

  const loginWithX = async () => {
    try {
      toggleLoader(true);

      const response = await fetch(`${apiUrl}/api/v1/login/twitter`);
      const data = await response.json();
      console.log("response = ", data);
      toggleLoader(false);

      if (response.status == 200) {
        localStorage.removeItem("socialReferal");
        if (referalCode) {
          localStorage.setItem("socialReferal", referalCode);
        }
        window.location.replace(data.data);
      } else {
        handleAddNotification("fail", "Error during X login initiation");
      }
    } catch (error) {
      console.error("Error during X login initiation: ", error);
      handleAddNotification("fail", "Error during X login initiation");

      toggleLoader(false);
    }
  };
  return (
    <div className={mainStyle.container}>
      <AuthNavbar active={"signup"} />
      <div className={mainStyle.cardCon}>
        <div className={style.cardContent}>
          <div className={style.left}>
            <label className={style.heading}>Create Your Web3 Account</label>
            <form noValidate={true} onSubmit={handleSubmit}>
              <InputTxtNew
                label="Username"
                onChange={(e) => setUsername(e.replace(/\s/g, ""))}
                value={username}
                errorMsg={
                  usernameAlreadyUsedError
                    ? "Username already in use"
                    : "Please write a valid username"
                }
                showError={showUsernameError || usernameAlreadyUsedError}
                placeHolder={"Choose your username"}
                isPwd={false}
                type="username"
              />

              <InputTxtNew
                label="Email"
                onChange={(e) => {
                  setEmail(e.toLowerCase());
                }}
                value={email}
                errorMsg={
                  emailAlreadyUsedError
                    ? "E-mail address is already registered"
                    : "Please enter a valid email address"
                }
                showError={showEmailError || emailAlreadyUsedError}
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
              {showPwdError && (
                <PwdErrorCard
                  perror={{
                    long: eightCharactersLongError,
                    lower: oneLowerCaseLetterError,
                    special: oneSpecialCharacterError,
                    upper: oneUpperCaseLetterError,
                  }}
                />
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
              <label className={style.forgotPwdLbl}>
                By creating an account, I agree to Prime Trader’s{" "}
                <Link href="#">Terms of service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>
              </label>
              <Button txt="Sign Up" onClick={() => {}} />
            </form>
          </div>
          <div className={style.center}>
            <div className={style.topDivider}></div>
            <label>Or</label>
            <div className={style.topDivider} />
          </div>
          <div className={style.right}>
            <div className={style.socialLink} onClick={() => loginWithGoogle()}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 10.3164V14.9637H18.9582C18.6746 16.4582 17.8236 17.7237 16.5472 18.5746L20.4417 21.5965C22.7108 19.502 24.0199 16.4256 24.0199 12.7711C24.0199 11.9202 23.9436 11.1019 23.8017 10.3165L12.5 10.3164Z"
                  fill="white"
                  fill-opacity="1"
                />
                <path
                  d="M5.77461 14.7852L4.89625 15.4575L1.78711 17.8793C3.76165 21.7956 7.80862 24.5011 12.4995 24.5011C15.7394 24.5011 18.4557 23.432 20.4412 21.5994L16.5467 18.5775C15.4776 19.2975 14.114 19.7339 12.4995 19.7339C9.37951 19.7339 6.72868 17.6285 5.77952 14.7921L5.77461 14.7852Z"
                  fill="white"
                  fill-opacity="1"
                />
                <path
                  d="M1.78718 7.12109C0.969042 8.73557 0.5 10.5574 0.5 12.4992C0.5 14.441 0.969042 16.2628 1.78718 17.8773C1.78718 17.8881 5.77997 14.7791 5.77997 14.7791C5.53998 14.0591 5.39812 13.2955 5.39812 12.4991C5.39812 11.7026 5.53998 10.939 5.77997 10.219L1.78718 7.12109Z"
                  fill="white"
                  fill-opacity="1"
                />
                <path
                  d="M12.4997 5.27818C14.267 5.27818 15.8379 5.88907 17.0925 7.06727L20.5288 3.63095C18.4452 1.68917 15.7398 0.5 12.4997 0.5C7.80887 0.5 3.76165 3.19454 1.78711 7.12183L5.77978 10.22C6.72882 7.38362 9.37976 5.27818 12.4997 5.27818Z"
                  fill="white"
                  fill-opacity="1"
                />
              </svg>
              <label>Connect With Google</label>
            </div>
            <div className={style.divider}>
              <div className={style.topDivider}></div>
              <label>Or</label>
              <div className={style.topDivider} />
            </div>
            <div className={style.socialLink} onClick={() => loginWithX()}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3263 2.40234H21.6998L14.3297 10.8258L23 22.2883H16.2112L10.894 15.3364L4.80995 22.2883H1.43443L9.31743 13.2784L1 2.40234H7.96111L12.7674 8.75668L18.3263 2.40234ZM17.1423 20.2691H19.0116L6.94539 4.31548H4.93946L17.1423 20.2691Z"
                  fill="white"
                  fill-opacity="1"
                />
              </svg>

              <label>Connect With X</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PwdErrorCard = ({ perror }) => {
  return (
    <div className={style.PwdErrorCard0Mob}>
      <label className={style.title}>Password must</label>
      {perror.long && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>be at least 8 characters long.</label>
        </div>
      )}
      {perror.lower && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>contain at least one lower case</label>
        </div>
      )}
      {perror.special && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>
            contain at least one special character
          </label>
        </div>
      )}
      {perror.upper && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>contain at least one upper case</label>
        </div>
      )}
    </div>
  );
};
