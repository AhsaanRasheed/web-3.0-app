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

  const getOauthParamsFromUrl = () => {
    const url = window.location.href;
    const oauthTokenMatch = url.match(/[?&]oauth_token=([^&]+)/);
    const oauthVerifierMatch = url.match(/[?&]oauth_verifier=([^&]+)/);
    return {
      oauth_token: oauthTokenMatch ? oauthTokenMatch[1] : null,
      oauth_verifier: oauthVerifierMatch ? oauthVerifierMatch[1] : null,
    };
  };

  const sendData = async (oauth_token, oauth_verifier) => {
    try {
      toggleLoader(true);
      const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log("location", window.location.href);
      console.log("oauth_token", oauth_token);
      console.log("oauth_verifier", oauth_verifier);
      const res = await fetch(
        `${apiUrl}/api/v1/login/twitter/callback?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}&timezone=${TZ}&error=null${
          localStorage.getItem("socialReferal")
            ? `&referral=${localStorage.getItem("socialReferal")}`
            : ""
        }${
          localStorage.getItem("socialUser")
            ? `&u=${localStorage.getItem("socialUser")}`
            : ""
        }`
      );
      const data = await res.json();

      console.log("response = ", data);
      if (data.message === "Authentication successful") {
        localStorage.removeItem("socialReferal");
        if (!localStorage.getItem("socialUser")) {
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
        }
        toggleLoader(false);
        handleAddNotification("success", "Authentication successful");
        if (localStorage.getItem("socialUser")) {
          localStorage.removeItem("socialUser");
          router.replace("/rewards");
        } else {
          router.replace("/summary");
        }
      } else {
        if (localStorage.getItem("socialUser")) {
          localStorage.removeItem("socialUser");
          router.replace("/rewards");
          handleAddNotification("fail", "Account already connected.");
        } else {
          router.replace("/auth/signin/");
          handleAddNotification("fail", "Authentication failed");
        }
      }
    } catch (error) {
      console.error(error);
      if (localStorage.getItem("socialUser")) {
        localStorage.removeItem("socialUser");
        router.replace("/rewards");
        handleAddNotification("fail", "Account already connected.");
      } else {
        router.replace("/auth/signin/");
        handleAddNotification("fail", "Authentication failed");
      }
    } finally {
      toggleLoader(false);
    }
  };

  useEffect(() => {
    const { oauth_token, oauth_verifier } = getOauthParamsFromUrl();
    if (
      oauth_token &&
      oauth_verifier &&
      oauth_token != null &&
      oauth_verifier != null
    ) {
      sendData(oauth_token, oauth_verifier);
    } else {
      router.replace("/auth/signin/");
      handleAddNotification("fail", "Authentication failed");
    }
  }, []);

  return <div></div>;
}
