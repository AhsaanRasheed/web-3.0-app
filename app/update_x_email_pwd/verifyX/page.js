"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { update_email_verify_otp_X } from "../../services/new_service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useSelector } from "react-redux";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const { addNotification } = useNotification();
  const [uidState, setUidState] = useState(null);
  const [codeState, setCodeState] = useState(null);
  const { toggleLoader } = useLoader();
  const router = useRouter();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);

  // const uid = searchParams.get("u");

  // const code = searchParams.get("code");

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  const updateEmailVerify = async (_uid, _code) => {
    try {
      toggleLoader(true);

      let resp = await update_email_verify_otp_X(_uid, _code);
      console.log(resp);
      if (resp.message == "Email Verified") {
        handleAddNotification("success", "Email Verified");
        if (isVisible) {
          router.push("/auth/signin");
        } else {
          router.push("/rewards/");
        }
      } else {
        handleAddNotification("fail", resp.message);
        if (isVisible) {
          router.push("/auth/signin");
        } else {
          router.push("/rewards/");
        }
      }
    } catch (e) {
      console.log("Error", e);
    } finally {
      toggleLoader(false);
    }
  };
  // useEffect(() => {
  //   if (uid && code) {
  //     updateEmailVerify(uid, code);
  //   }
  // }, [searchParams]);

  // useEffect(() => {
  //   if (
  //     window.location.href.includes("u=") &&
  //     window.location.href.includes("code=")
  //   ) {
  //     // router.push("/password-new-credentials" + window.location.search);
  //     console.log(window.location.href);
  //     // if (uid && code) {
  //     updateEmailVerify(uid, code);
  //     // }
  //   }
  //   console.log("here2");
  //   console.log(window.location.href);
  // }, []);

  useEffect(() => {
    const uid = searchParams.get("u");
    const code = searchParams.get("code");
    if (uid && code) {
      setUidState(uid);
      setCodeState(code);
      updateEmailVerify(uid, code);
    }
  }, [searchParams]);

  return <div></div>;
}
