"use client";

import React from "react";
// import styles from "../style.module.scss";
import Link from "next/link";

export default function SignupEmailConfirmation(props) {
  const changeemail = () => {
    // props.setChangeEmail(true);
  };

  return (
    <>
      <div className="heading-container">
        <h1 className="heading-1">Please verify your account</h1>
        <p className="heading-1-paraText">
          An email has been sent to your inbox <br />
          <b>{props.email}</b>
          <br />
          E-mail valid for 24 hours
        </p>
      </div>

      <div className="button-container">
        {/* <Link href="/sign-in" legacyBehavior>
        <button type="submit" className="button-style">
          <p className="button-text">Sign In</p>
          
        </button>
        </Link> */}
        <img
          src="/icons/mail.png"
          className=""
          style={{ width: "80%" }}
          alt="mail"
        />
        <div className="info">
          <p className="info-plain-text"> Didn’t receive an email?</p>
          <p>
            <Link href="/" legacyBehavior>
              <a className="info-link-text">Resend</a>
            </Link>
          </p>
        </div>
        <div className="info">
          <p className="info-plain-text"> Wrong email?</p>
          <p onClick={changeemail}>
            {/* <Link legacyBehavior  > */}
            <a className="info-link-text">Change</a>
            {/* </Link> */}
          </p>
        </div>
      </div>
    </>
  );
}
