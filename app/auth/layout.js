"use client";
import React, { useEffect } from "react";
import TopBar from "./authComponents/TopBar/TopBar";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import "./style.css";
export default function Layout({ children }) {
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken && userToken != null && userToken != "") {
      window.location.replace("/summary");
    }
  }, []);
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeVzSopAAAAAIlg5Fv1KD5TtxZ0CrWh5blr7Jvr">
      <div
        style={{ width: "100dvw", height: "100dvh", overflowY: "auto" }}
        className="authCon"
      >
        <TopBar />

        {children}
      </div>
    </GoogleReCaptchaProvider>
  );
}
