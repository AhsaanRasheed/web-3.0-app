"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { get_user_profile } from "@/app/services/new_service";
import { SET_USER, TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
import { useDispatch } from "react-redux";
import { get_rewards_accountLevel } from "@/app/services/new_service";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { apiUrl } from "@/app/apiUrl";

export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { toggleLoader } = useLoader();
  const { addNotification } = useNotification();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  const getCodeFromUrl = () => {
    const url = window.location.href;
    const codeMatch = url.match(/[?&]code=([^&]+)/);
    return codeMatch ? codeMatch[1] : null;
  };

  const sendData = async (code) => {
    try {
      toggleLoader(true);
      const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log("location", window.location.href);
      console.log("code", code);
      const res = await fetch(
        `${apiUrl}/api/v1/login/google/callback?code=${code}&timezone=${TZ}${
          localStorage.getItem("socialReferal")
            ? `&referral=${localStorage.getItem("socialReferal")}`
            : ""
        }`
      );
      const data = await res.json();

      console.log("response = ", data);
      if (data.message === "Authentication successful") {
        localStorage.removeItem("socialReferal");
        if (data?.data?.access_token) {
          secureLocalStorage.setItem("loginFlag", false);
          localStorage.setItem("token", data?.data?.access_token);
          secureLocalStorage.setItem(
            "refresh_token",
            data?.data?.refresh_token
          );
          secureLocalStorage.setItem("username", data?.data?.username);
          localStorage.setItem("username", data?.data?.username);
          secureLocalStorage.setItem("expires", data?.data?.expires);
        }
        dispatch({ type: TOGGLE_PROFILE_VISIBILITY });

        const userProfile = await get_user_profile();
        secureLocalStorage.setItem("user", JSON.stringify(userProfile));
        localStorage.setItem("user", JSON.stringify(userProfile));

        dispatch({
          type: SET_USER,
          payload: userProfile,
        });
        const newLevelData = await get_rewards_accountLevel();
        secureLocalStorage.setItem("userLevel", newLevelData?.data?.level);
        toggleLoader(false);
        handleAddNotification("success", "Authentication successful");
        router.replace("/summary");
      } else {
        handleAddNotification("fail", "Authentication failed");
        router.replace("/auth/signin/");
      }
    } catch (error) {
      console.error(error);
      handleAddNotification("fail", "Authentication failed");
      router.replace("/auth/signin/");
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      sendData(code);
    }
  }, []);

  return <div></div>;
}
