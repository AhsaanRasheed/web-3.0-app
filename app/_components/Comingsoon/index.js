"use client";
import React from "react";
import Button from "@/app/_components/global/Button/Button";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import useMobileScreen from "@/app/utility/isMobile";

const CommingSoon = () => {
  const router = useRouter();
  var isMobile = useMobileScreen();
  function routeToDashBoard() {
    router.push("/dashboard");
    return;
  }
  return (
    <div className={styles.coming_soon_container}>
      <div className={styles.inner_container}>
        <div className={styles.line}></div>
        <div className={styles.container}>
          <div className={styles.text}>
            <h1 className="txt_Heading1">Coming Soon</h1>
            <p className="txt_Title2">
              We are working to provide you with updates as soon as possible.
              Stay tuned!
            </p>
          </div>
          <Button
            text="Go to Dashboard"
            onClick={routeToDashBoard}
            Custom_width={isMobile ? "230px" : "295px"}
            Custom_maxWidth={isMobile ? "230px" : "300px"}
            Custom_minWidth="230px"
          />
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default CommingSoon;
