"use client";
import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import mainStyle from "../style.module.scss";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { resend_invite } from "@/app/services/service";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  let tosend = searchParams.get("tosend");
  let Verifyuid = searchParams.get("Verifyuid");
  let VerifyEmail = searchParams.get("VerifyEmail");

  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const router = useRouter();
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  useEffect(() => {
    // let email = sessionStorage.getItem("VerifyEmail");
    // let uid = sessionStorage.getItem("Verifyuid");
    // if (VerifyEmail) {
    if (Verifyuid) {
      // debugger;

      setEmail(VerifyEmail);
      setUid(Verifyuid);
      if (tosend && tosend == 1) {
        // debugger;

        handleSubmit();
      }
    } else {
      router.push("/auth/signin");
    }
    // } else {
    //   router.push("/auth/signin");
    // }
  }, []);
  const handleSubmit = async () => {
    toggleLoader(true);
    try {
      console.log(uid, "uid");
      let toUid = uid;
      if (toUid == null || toUid == "") {
        toUid = Verifyuid;
      }
      const resp = await resend_invite(toUid);
      console.log(resp);

      if (resp?.message == "invalid user id") {
        handleAddNotification("fail", "Invaild User");
      } else if (resp?.message == "OTP has been resent to your email.") {
        handleAddNotification("success", "Link has been sent to your email.");
      } else {
        handleAddNotification("fail", "Failed to send Email.");
      }
    } catch (error) {
    } finally {
      toggleLoader(false);
    }
  };
  return (
    <div className={mainStyle.container}>
      <div className={style.card}>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M57.1423 8H6.85658C4.33185 8 2.28516 10.0467 2.28516 12.5714V51.4286C2.28516 53.9534 4.33185 56 6.85658 56H57.1423C59.6671 56 61.7137 53.9534 61.7137 51.4286V12.5714C61.7137 10.0467 59.6671 8 57.1423 8Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.28516 13.7148L29.0737 29.8257C29.8952 30.3079 30.9304 30.572 31.9994 30.572C33.0685 30.572 34.1037 30.3079 34.9252 29.8257L61.7137 13.7148"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <label className={style.maintitle}>Please verify your account</label>
        <label className={style.txt}>
          An email has been sent to your inbox <span>{email}</span>
        </label>
        <label className={style.validTxt}>Email valid for 30 minutes</label>

        <label className={style.resendTxt}>
          Didn’t recieve an email?{" "}
          <span onClick={() => handleSubmit()}>Resend</span>
        </label>
      </div>
    </div>
  );
}
