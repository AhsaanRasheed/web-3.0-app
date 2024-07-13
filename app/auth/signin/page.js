"use client";
import React, { useState, useEffect } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";
import Button from "../authComponents/button/Button";
import OutlineBtn from "../authComponents/outlineBtn/OutlineBtn";
import InputTxtNew from "../authComponents/InputTxt/InputTxtNew";
import AuthNavbar from "../authComponents/NavBar/Navbar";
import Link from "next/link";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import {
  get_balance_api,
  get_user_info_api,
  login_api,
  verify_signup_api,
} from "@/app/services/service.js";
import secureLocalStorage from "react-secure-storage";
import { SET_USER, TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { apiUrl } from "@/app/apiUrl";

import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import {
  get_rewards_accountLevel,
  get_user_profile,
} from "@/app/services/new_service";
let temp = {
  username: "Test account",
  first_name: "Sam",
  last_name: "Gil",
  phone: "960-1323141",
  email: "samuelgill21@yopmail.com",
  created: "2024-01-05T08:15:38.150608Z",
  is_verified: true,
  gender: "",
  banned: false,
  addr_line_1: "cmxam;",
  addr_line_2: "xcasmcmas",
  city: "ckasmlkca",
  state: "caknslkcanl",
  country: "Afghanistan",
  postal_code: "csacsaca",
  time_zone: "-",
  language: "EN",
  currency: "USD",
};
export default function Page() {
  const searchParams = useSearchParams();
  let userid = searchParams.get("u");
  let verifyCode = searchParams.get("code");

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showError, setShowError] = useState(false);
  const [showEmailEmptyError, setShowEmailEmptyError] = useState(false);
  const [showPwdEmptyError, setShowPwdEmptyError] = useState(false);

  const { addNotification, setIsUserLoggedInNow } = useNotification();
  const { toggleLoader } = useLoader();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  const { executeRecaptcha } = useGoogleReCaptcha();
  // useEffect(() => {
  //   if (executeRecaptcha) {
  //     toggleLoader(false);
  //   } else {
  //     toggleLoader(true);
  //   }
  // }, [executeRecaptcha]);
  const handleVerifyUser = async () => {
    toggleLoader(true);
    try {
      const resp = await verify_signup_api(verifyCode, userid);
      console.log(resp);

      if (resp?.message == "invalid user id") {
        handleAddNotification("fail", "Invaild User.");
        router.push("/auth/signin/");
        userid = null;
        verifyCode = null;
      } else if (resp?.message == "Email Verified") {
        handleAddNotification("success", "Your Account has been Verified.");
        router.push("/auth/signin/");
        userid = null;
        verifyCode = null;
      } else if (resp?.message == "Your verification code has expired") {
        handleAddNotification("fail", "Your verification code has expired");
        // sessionStorage.setItem("VerifyEmail", email);
        sessionStorage.setItem("Verifyuid", userid);

        router.push(
          `/auth/verifyAccount/?tosend=1&VerifyEmail=&Verifyuid=${userid}`
        );
      } else {
        handleAddNotification("fail", "Invalid verification code.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    if (userid) {
      if (verifyCode) {
        handleVerifyUser();
      }
    }
  }, []);
  useEffect(() => {
    if (showError) setShowError(false);
    if (showEmailEmptyError) setShowEmailEmptyError(false);
  }, [email]);
  useEffect(() => {
    if (showError) setShowError(false);
    if (showPwdEmptyError) setShowPwdEmptyError(false);
  }, [pwd]);
  const emailIsValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isAllValid = true;
    if (email == null || email == " " || email == "") {
      // handleAddNotification("fail", "Email/Password can't be Empty.");
      setShowEmailEmptyError(true);
      isAllValid = false;
    }
    if (pwd == null || pwd == " " || pwd == "") {
      // handleAddNotification("fail", "Email/Password can't be Empty.");
      setShowPwdEmptyError(true);
      isAllValid = false;
    }

    // isAllValid = emailIsValid() && isAllValid;

    try {
      if (isAllValid) {
        toggleLoader(true);
        let recaptchaToken = null;
        const resp = await login_api(
          {
            email: !emailIsValid() ? email.toLowerCase() : email,
            password: pwd,
          },
          recaptchaToken
        );
        console.log("login Resp: ", resp);
        if (
          resp?.message == "invalid password" ||
          resp?.message == "invalid email address."
        ) {
          setShowError(true);
          handleAddNotification("fail", "Credentials provided are invalid.");
          toggleLoader(false);

          return;
        } else if (resp?.message == "Please verify your account first") {
          // setShowError(true);
          handleAddNotification("fail", "Please verify your account first");
          toggleLoader(false);

          return;
        } else if (resp?.message == "Authentication successful") {
          dispatch({ type: TOGGLE_PROFILE_VISIBILITY });
          let va = await get_user_profile();
          // get_user_info_api().then((res) => {
          //   get_balance_api().then((resB) => {
          // if (resB?.data != null)
          secureLocalStorage.setItem("user", JSON.stringify(va));
          localStorage.setItem("user", JSON.stringify(va));

          dispatch({
            type: SET_USER,
            payload: va,
          });
          const newLevelData = await get_rewards_accountLevel();
          secureLocalStorage.setItem("userLevel", newLevelData?.data?.level);
          //   });
          // });
          setIsUserLoggedInNow(true);
          toggleLoader(false);
          router.replace("/summary");
        } else if (resp?.code == 2000 || resp.code == 401) {
          // setCredentialsError(true);
          setShowError(true);
          handleAddNotification("fail", "Credentials provided are invalid.");
          toggleLoader(false);

          return;
        } else if (resp?.code == 403 || resp?.code == 2002) {
          const errorMsg = resp?.data;
          handleAddNotification("fail", errorMsg);
          toggleLoader(false);

          return;
        } else if (resp?.code == 1000) {
          secureLocalStorage.setItem(
            "gameCaptcha",
            resp?.data.captcha_verified
          );
          secureLocalStorage.setItem(
            "gameCaptchaScore",
            resp?.data.trust_score >= 0.7 ? true : ""
          );
          if (!resp?.data.captcha_verified) {
            let va = await get_user_profile();
            // get_user_info_api().then((res) => {
            //   get_balance_api().then((resB) => {
            secureLocalStorage.setItem("user", JSON.stringify(va));
            localStorage.setItem("user", JSON.stringify(va));

            dispatch({
              type: SET_USER,
              payload: va,
            });

            window.location.reload();
            //   });
            // });
          } else {
            dispatch({ type: TOGGLE_PROFILE_VISIBILITY });
            let va = await get_user_profile();
            // get_user_info_api().then((res) => {
            //   get_balance_api().then((resB) => {
            // if (resB.data != null)

            secureLocalStorage.setItem("user", JSON.stringify(va));
            localStorage.setItem("user", JSON.stringify(va));

            dispatch({
              type: SET_USER,
              payload: va,
            });
            //   });
            // });
            toggleLoader(false);
            router.replace("/summary");
          }
        } else {
          handleAddNotification(
            "fail",
            resp?.message ? resp?.message : "Login failed"
          );
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      toggleLoader(false);
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
      <AuthNavbar active={"signin"} />
      <div className={mainStyle.cardCon}>
        <div className={style.cardContent}>
          <div className={style.left}>
            <label className={style.heading}>Sign in to your account</label>
            <form onSubmit={handleSubmit} noValidate={true}>
              <InputTxtNew
                label="Email/Username"
                onChange={(e) => {
                  setEmail(e.replace(/\s/g, ""));
                }}
                value={email}
                errorMsg={showEmailEmptyError ? "Email should be valid." : ""}
                showError={showError || showEmailEmptyError}
                placeHolder={"Enter your email"}
                isPwd={false}
              />
              <InputTxtNew
                label="Password"
                onChange={(e) => {
                  setPwd(e);
                }}
                value={pwd}
                errorMsg={showPwdEmptyError ? "Password can't be empty." : ""}
                showError={showError || showPwdEmptyError}
                placeHolder={"Enter your password"}
                isPwd={true}
              />
              <label className={style.forgotPwdLbl}>
                Forgot password? <Link href="/auth/forgotpwd/">Reset here</Link>
              </label>
              <Button txt="Sign In" onClick={() => {}} />
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

{
  /* <div style={{ width: "300px" }}>
<Button txt="Signin" onClick={() => {}} />
<br />
<OutlineBtn txt="Signin" onClick={() => {}} />
<br />
<InputTxtNew
  label="Email"
  onChange={(e) => {
    setText(e);
  }}
  value={text}
  errorMsg={"Please enter a valid email address"}
  showError={false}
  placeHolder={"Enter Email"}
  isPwd={false}
/>
<br />
<InputTxtNew
  label="Email"
  onChange={(e) => {
    setText(e);
  }}
  value={text}
  errorMsg={"Please enter a Passwrod"}
  showError={true}
  placeHolder={"Enter Password"}
  isPwd={true}
/>
<br />
<AuthNavbar active={"signin"} />
</div> */
}
