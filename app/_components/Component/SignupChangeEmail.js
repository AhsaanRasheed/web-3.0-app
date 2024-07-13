"use client";

import React, { useState, useEffect } from "react";
// import styles from "../style.module.scss";
import Link from "next/link";

export default function SignupChangeEmail(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailAlreadyUsedError, setEmailAlreadyUsedError] = useState(false);
  useEffect(() => {
    if (emailError) emailIsValid();
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailIsValid()) {
      if (emailIsAvailable()) {
        props.setEmailSent(true);
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
  return (
    <>
      <div className="heading-container">
        <h1 className="heading-1">Change E-mail</h1>
        <p className="heading-1-paraText">
          You’re about to change the email you entered.
          <br />
          Your old email is primetrader@primetrader.com.
          <br />
          Please enter a new email below.
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
        </div>
        <div className="button-container">
          <button type="submit" className="button-style">
            <p className="button-text">Change E-Mail</p>
          </button>

          <div className="info">
            <Link href="/sign-up" legacyBehavior>
              <p className="info-plain-text">Cancel</p>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
