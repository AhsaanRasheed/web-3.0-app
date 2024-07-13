"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const router = useRouter();
  useEffect(() => {
    if (!isVisible) {
      router.push("summary");
    } else {
      if (window.location.href.includes("reset_pw_token")) {
        router.push("/password-new-credentials" + window.location.search);
      } else if (
        window.location.href.includes("rc=") &&
        window.location.href.includes("u=")
      ) {
        router.push("/welcome" + window.location.search);
      } else if (
        window.location.href.includes("rc=") &&
        !window.location.href.includes("u=")
      ) {
        router.push("/sign-up" + window.location.search);
      } else if (
        window.location.href.includes("code=") &&
        window.location.href.includes("u=")
      ) {
        router.push("/auth/signin" + window.location.search);
      }
      
      else if (
        window.location.href.includes("token=")
      ) {
        router.push("/auth/newpwd" + window.location.search);
      }
      else {
        router.push("/auth/signin");
      }
    }
  }, []);

  return <></>;
}
