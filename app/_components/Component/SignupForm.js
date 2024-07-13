"use client";
import React, { useState, useEffect, useCallback } from "react";
// import styles from "../style.module.scss";
import Link from "next/link";
import Tooltip from "../../ToolTip";
// mport { signup_api } from "@/app/services/service.js";
import dynamic from "next/dynamic";
const GoogleReCaptchaProvider = dynamic(
  () =>
    import("react-google-recaptcha-v3").then(
      (mod) => mod.GoogleReCaptchaProvider
    ),
  { ssr: false } // This disables server-side rendering for this component
);

const useGoogleReCaptcha = dynamic(
  () =>
    import("react-google-recaptcha-v3").then((mod) => mod.useGoogleReCaptcha),
  { ssr: false }
);

let signup_api;

if (typeof window !== "undefined") {
  // Ensures this code runs only in the browser
  import("@/app/services/service.js")
    .then((module) => {
      signup_api = module.signup_api;
    })
    .catch((err) => {
      console.error("Failed to load signup_api", err);
    });
}

export default function SignupForm(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPwdFocused, setIsPwdFocused] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("signup");
    return token;
  }, [executeRecaptcha]);

  const handlePwdFocus = () => {
    setIsPwdFocused(true);
  };

  const handlePwdBlur = () => {
    setIsPwdFocused(false);
  };

  const [emailError, setEmailError] = useState(false);
  const [emailAlreadyUsedError, setEmailAlreadyUsedError] = useState(false);
  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameAlreadyUsedError, setUsernameAlreadyUsedError] =
    useState(false);

  useEffect(() => {
    if (emailError) emailIsValid();
    if (emailAlreadyUsedError) setEmailAlreadyUsedError(false);
  }, [email]);
  useEffect(() => {
    passwordIsValid();
  }, [password]);
  useEffect(() => {
    if (usernameError) usernameIsValid();
    if (usernameAlreadyUsedError) setUsernameAlreadyUsedError(false);
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isAllValid = true;
    isAllValid = emailIsValid() && isAllValid;
    isAllValid = usernameIsValid() && isAllValid;
    isAllValid = passwordIsValid() && isAllValid;

    if (isAllValid) {
      isAllValid = emailIsAvailable() && isAllValid;
      isAllValid = usernameIsAvailable() && isAllValid;
      if (isAllValid) {
        // Start
        let recaptchaToken = await handleReCaptchaVerify();
        const resp = await signup_api(
          { email, username, password },
          referralCode,
          recaptchaToken
        );
        if (resp?.code == 409) {
          if (resp?.data == "Username already in use") {
            setUsernameAlreadyUsedError(true);
          } else {
            setEmailAlreadyUsedError(true);
          }
        } else if (resp?.code == 200) {
          props.setEmail(email);
          props.setEmailSent(true);
        }
        console.log("signup Resp :", resp);
        // End
      }
    }
  };
  const emailIsValid = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };
  const emailIsAvailable = () => {
    if (email == "s@s.s") {
      setEmailAlreadyUsedError(true);
      return false;
    } else {
      setEmailAlreadyUsedError(false);
      return true;
    }
  };
  const usernameIsValid = () => {
    if (username.length >= 4) {
      if (usernameError) {
        setUsernameError(false);
      }
      return true;
    } else {
      setUsernameError(true);
      return false;
    }
  };
  const usernameIsAvailable = () => {
    if (username == "ssss") {
      setUsernameAlreadyUsedError(true);
      return false;
    } else {
      setUsernameAlreadyUsedError(false);
      return true;
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

    return passwordIsValidBool;
  };
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
  return (
    <>
      <div className="heading-container">
        <h1 className="heading-1">You are invited to PrimeTrader</h1>
        <p className="heading-1-paraText">
          Please complete the form to create your Web3 Account
        </p>
      </div>

      <form className="content" onSubmit={handleSubmit} noValidate={true}>
        <div className="form-container">
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email*
            </label>
            <div className="input-container">
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autocomplete="new-password"
                required
              />
            </div>
            {emailError && (
              <p className="error-text" id="email-error">
                Please enter the correct E-mail address
              </p>
            )}
            {emailAlreadyUsedError && (
              <p className="error-text" id="email-error">
                This E-mail is not available
              </p>
            )}
          </div>
          <div className="input-group">
            <label tmlFor="password" className="input-label">
              Username*
            </label>
            <div className="input-container">
              <input
                type="text"
                required
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autocomplete="new-password"
              />
            </div>
            {usernameError && (
              <p className="error-text" id="username-error">
                Please enter the correct Username
              </p>
            )}
            {usernameAlreadyUsedError && (
              <p className="error-text" id="username-error">
                This Username is not available
              </p>
            )}
          </div>
          <div className="input-group">
            {isPwdFocused && <Tooltip messages={tooltipMessages} />}

            <label htmlFor="password" className="input-label">
              Password*
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
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Enter your Password"
                  value={password}
                  onFocus={handlePwdFocus}
                  onBlur={handlePwdBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  autocomplete="new-password"
                  required
                />
                <img
                  src="/icons/pwdShow.png"
                  style={{ width: "17.2px", height: "8.8px" }}
                  onClick={() => setShowPassword(!showPassword)}
                  alt="showPassword"
                />
              </div>
            </div>
            {/* <div className="form-info">
              <ul style={{ paddingLeft: 15 }}>
                <li
                  className={`info-plain-text ${
                    eightCharactersLongError ? "" : ""
                  }`}
                >
                  Password must be at least 8 characters long.
                </li>
                <li
                  className={`info-plain-text ${
                    oneSpecialCharacterError ? "" : ""
                  }`}
                >
                  Password must contain at least one special character.
                </li>
                <li
                  className={`info-plain-text ${
                    oneLowerCaseLetterError ? "" : ""
                  }`}
                >
                  One lower case letter.
                </li>
                <li
                  className={`info-plain-text ${
                    oneUpperCaseLetterError ? "" : ""
                  }`}
                >
                  Password must contain at least one upper case.
                </li>
              </ul>
            </div> */}
          </div>
          <div className="input-group">
            <label className="input-label" htmlFor="referralCode">
              Referral Code (Optional)
            </label>
            <div className="input-container">
              <input
                type="text"
                id="referralCode"
                name="referralCode"
                placeholder="1234"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                autocomplete="new-password"
              />
            </div>
          </div>
          <div className="info">
            <p className="info-plain-text">By signing up you agree with</p>
            <p>
              <Link href="/" legacyBehavior>
                <a className="info-link-text">Terms and Conditions</a>
              </Link>
            </p>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="button-style">
            <p className="button-text">Sign Up</p>
          </button>

          <div className="info">
            <p className="info-plain-text">Already have an account?</p>
            <p>
              <Link href="/sign-in" legacyBehavior>
                <a className="info-link-text">Sign in</a>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
