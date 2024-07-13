"use client"
import React from "react";
import Link from "next/link";

const Factor = ({ title, buttonText }) => {
  return (
    <div className="info-box">
      <div className="info-box-content">
        <div className="info-box-inner">
          <div className="info-box-details">
            <div className="info-box-title">{title}</div>
            <p className="info-plain-text">
              Protect your account by using a sign in 2FA confirmation.as
              <Link href="/sign-up" legacyBehavior>
                <a className="info-link-text" style={{ marginLeft: "5px" }}>
                  Learn more
                </a>
              </Link>
            </p>
          </div>
          <div className="info-box-button">
            <div className="button-container">
              <button type="submit" className="button-style">
                <p className="button-text">{buttonText}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factor;
