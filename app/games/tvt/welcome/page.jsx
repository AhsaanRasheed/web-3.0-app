"use client";
import ProfileBar from "@/app/_components/ProfileBar";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
    // getValue();
    function handleResize() {
      if (window.innerWidth <= 850) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    window.location.href = "/games/tvt/ongoing-match/";
  };

  return (
    <div className="pageContainer">
      <ProfileBar
        title="TvT Game"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      <div className={styles.welcomeWrapper}>
        <div className={styles.main}>
          <img
            className={styles.lightning1}
            src={
              isMobileView
                ? "/games/welcome/mob/Lightning_Blast_1.png"
                : "/games/welcome/Lightning_Blast_1.png"
            }
            alt="blast 1"
          />
          <img
            className={styles.lightning2}
            src={
              isMobileView
                ? "/games/welcome/mob/Lightning_Blast_2.png"
                : "/games/welcome/Lightning_Blast_2.png"
            }
            alt="blast 2"
          />

          <div className={styles.contentWrapper}>
            <div className={styles.ellipse}></div>
            <div className={styles.content}>
              <div className={styles.title}>
                Hey <span>Player_Name</span> <HandWaveIcon />
              </div>
              <p>
                This is your first time joining us! Let's start with creating
                your default portfolio.
              </p>
              <div className={styles.button} onClick={handleClick}>
                Start
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const HandWaveIcon = () => {
  return <img src="/games/welcome/handwave.png" alt="handwave" />;
};
