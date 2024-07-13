"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import mainStyle from "../style.module.scss";
import OutlineBtn from "../authComponents/outlineBtn/OutlineBtn";
import { useRouter } from "next/navigation";
import Button from "../authComponents/button/Button";
import InputTxtNew from "../authComponents/InputTxt/InputTxtNew";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { reset_pw_api } from "@/app/services/service";
export default function Page() {
  const [email, setEmail] = useState("");
  const [verifyEmailSend, setVerifyEmailSend] = useState(false);

  const [showEmailError, setShowEmailError] = useState(false);
  const router = useRouter();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    toggleLoader(true);
    let isAllValid = true;
    isAllValid = emailIsValid() && isAllValid;
    if (isAllValid) {
      let resp = await reset_pw_api(email);
      if (resp?.message == "An email has been sent to your account.") {
        setVerifyEmailSend(true);
      } else {
        handleAddNotification("fail", "Failed to send Email.");
      }
    }
    

    toggleLoader(false);
  };
  return (
    <div className={mainStyle.container}>
      <div className={style.card}>
        <label className={style.mainHeading}>Forgot password</label>
        <label className={style.subhead}>
          {verifyEmailSend ? (
            <>
              We just sent a link to your Email. Please check your inbox.
              Password reset link is <span>valid for 30 minutes</span>
            </>
          ) : (
            "Provide your account’s Email for which you want to reset your password"
          )}
        </label>
        <form noValidate={true} onSubmit={handleSubmit}>
          {!verifyEmailSend && (
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
          )}

          <Button
            txt={verifyEmailSend ? "Resend" : "Reset password"}
            onClick={() => {}}
          />
          <br />
          <OutlineBtn
            txt={"Cancel"}
            onClick={() => router.push("/auth/signin")}
          />
        </form>
      </div>
    </div>
  );
}
