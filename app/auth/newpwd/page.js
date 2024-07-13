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
import { useSearchParams } from "next/navigation";
import { change_pw_api } from "@/app/services/service";


export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  let token = searchParams.get("token");
  const [password, setPwd] = useState("");
  const [showPwdError, setShowPwdError] = useState(false);
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [PwdChanged, setPwdChanged] = useState(false);
  const [TokenExpired, setTokenExpired] = useState(false);



  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const [eightCharactersLongError, setEightCharactersLongError] =
    useState(false);
  const [oneLowerCaseLetterError, setOneLowerCaseLetterError] = useState(false);
  const [oneSpecialCharacterError, setOneSpecialCharacterError] =
    useState(false);
  const [oneUpperCaseLetterError, setOneUpperCaseLetterError] = useState(false);
  useEffect(() => {
    if (password.length > 1) passwordIsValid();
  }, [password]);
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
    if(PwdChanged){
      router.push("/auth/signin/");
    }
    if(TokenExpired){
      router.push("/auth/forgotpwd/");
    }
    toggleLoader(true);
    let isAllValid = true;
    isAllValid = passwordIsValid() && isAllValid;
    if (isAllValid) {
      let resp = await change_pw_api({new_password:password, token:token});
      if (resp?.message == "Password has been reset successfully") {
        setPwdChanged(true);
      }else if (resp?.message == "reset password link has expired") {
        setTokenExpired(true);
      } else {
        handleAddNotification("fail", "Invalid token.");
      }
    }
    toggleLoader(false);
  };
  return (
    <div className={mainStyle.container}>
      <div className={style.card}>
        {
          TokenExpired && <label className={style.errorTitle}>Oops!</label>
        }
        <label className={style.mainHeading}>{PwdChanged?"Password updated":(TokenExpired?"Link Expired":"New credentials")}</label>
        <label className={style.subhead}>
          {
            PwdChanged?"Your password has been updated":(TokenExpired?"Your link has expired, because you haven't used it. Password reset link is valid for 24 hours, single-use only. You can create a new link by clicking the button below.":"Enter a new password") 
          }
        
        </label>
        <form noValidate={true}  onSubmit={handleSubmit}>
          {
            !PwdChanged &&  <InputTxtNew
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
          }
       {
        PwdChanged?<Button txt="Sign In" onClick={() => {}} />:<>
        <Button txt={TokenExpired?"Resend new link":"Submit"} onClick={() => {}} />
          <br />
          <OutlineBtn
            txt={"Cancel"}
            onClick={() => router.push("/auth/signin")}
          />
        </>
       }

          
        </form>
      </div>
    </div>
  );
}
