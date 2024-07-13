"use client";
import React, { useState, useEffect } from "react";
import useMobileScreen from "@/app/utility/isMobile";

export default function Page() {
  // const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 600);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  let isMobile = useMobileScreen();

  const tableStyle = {
    width: isMobile ? "90%" : "600px",
    border: "0",
    margin: "auto",
    background:
      "linear-gradient(149.22deg, #071126 0.91%, #0C2147 16.39%, #0B2248 57.68%, #030813 100%)",
    backgroundColor: "#071126",
    height: "900px",
    borderSpacing: "0",
    padding: "0",
    overflow: "hidden",
  };

  const commonTextStyle = {
    fontFamily: "Roboto, sans-serif",
    color: "#FFFFFF",
    fontWeight: "400",
    lineHeight: "24px",
    marginBottom: "32px",
  };

  const buttonStyle = {
    width: "195px",
    borderRadius: "48px",
    backgroundColor: "#050E1D",
    padding: isMobile ? "10px 24px" : "16px 24px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "16px",
    color: "#FFFFFF",
    marginBottom: "37px",
    border: "1px solid #FFFFFF",
    boxShadow: "0px 0px 7px 2px #0075FF",
  };
  const PT_manager = {
    maxWidth: isMobile ? "375px" : "550px",
    width: isMobile ? "375px" : "550px",
    height: isMobile ? "528px" : "628px",
    margin: "0 -40px 0 0",
    position: "absolute",
    top: isMobile ? "42px" : "-58px",
    right: "0",
    zIndex: "4",
  };

  return (
    <table style={tableStyle}>
      <tbody>
        {/* Row 1: Logo */}
        <tr style={{ height: "80px" }}>
          <td style={{ textAlign: "center" }} colSpan={2}>
            <img
              src="/logo-1.svg"
              style={{
                maxWidth: "86px",
                display: "block",
                width: "86px",
                height: "51px",
                margin: "0 auto",
              }}
              alt="Logo"
            />
          </td>
        </tr>

        {/* Row 2: Main Content */}
        <tr>
          <td
            style={{
              paddingLeft: isMobile ? "30px" : "40px",
              textAlign: "left",
            }}
          >
            <h1
              style={{
                fontFamily: "Jura, sans-serif",
                color: "#FFFFFF",
                fontWeight: "700",
                fontSize: "32px",
                lineHeight: "41px",
                marginBottom: "32px",
                width: "280px",
              }}
            >
              Welcome to PrimeTrader
            </h1>
            <p style={{ ...commonTextStyle, width: "100px" }}>
              Hi <span style={{ color: "#0090E7" }}>Username,</span>
            </p>
            <p
              style={{
                ...commonTextStyle,
                fontSize: "14px",
                lineHeight: "21px",
                width: isMobile ? "250px" : "315px",
              }}
            >
              We&apos;re thrilled that you decided to sign up for PrimeTrader!
              Your account has been successfully created. Start enjoying the PT
              experience by claiming your PrimeTrader Tokens.
            </p>
            <button style={buttonStyle}>Verify Your E-Mail</button>
            <p
              style={{
                ...commonTextStyle,
                width: isMobile ? "170px" : "240px",
              }}
            >
              This link will expire after 60 mins.
            </p>
            <p
              style={{
                ...commonTextStyle,
                fontSize: "14px",
                lineHeight: "21px",
                width: isMobile ? "170px" : "240px",
              }}
            >
              Did you receive this email without signing up?
              <a
                href="#"
                style={{
                  color: "#0090E7",
                  textDecoration: "underline",
                  marginLeft: "4px",
                }}
              >
                Click here.
              </a>
            </p>
          </td>
          <td style={{ position: "relative" }}>
            <img
              src="/users_avatar/email_verfication_avatar.svg"
              style={PT_manager}
              alt="PT MANAGER"
            />
            <img
              src="/radial_glow.svg"
              style={{
                maxWidth: isMobile ? "475px" : "950px",
                width: isMobile ? "375px" : "550px",
                height: "800px",
                margin: "0 -20px 0 0",
                position: "absolute",
                top: "20px",
                right: "0",
                zIndex: "2",
              }}
              alt="PT MANAGER"
            />
          </td>
        </tr>

        {/* Row 3: Footer */}
        <tr style={{ height: "250px" }}>
          <td
            colSpan={2}
            style={{
              borderTop: "1px solid #A1F7FF",
              textAlign: "center",
            }}
          >
            <img
              src="/icons/p-logo.svg"
              style={{
                maxWidth: "32px",
                display: "block",
                width: "32px",
                height: "21px",
                margin: "0 auto",
              }}
              alt="Footer Logo"
            />
            <p
              style={{
                ...commonTextStyle,
                fontFamily: "Roboto, sans-serif",
                fontWeight: "300",
                fontSize: "12px",
                lineHeight: "18px",
                paddingTop: "16px",
                width: "280px",
                margin: "0 auto",
              }}
            >
              This E-Mail was sent by PrimeTrader. Copyright 2023. Privacy
              Policy | Terms of Service | Unsubscribe
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
