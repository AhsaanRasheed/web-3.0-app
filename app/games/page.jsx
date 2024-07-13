"use client";
import React, { useState, useEffect } from "react";
import ProfileBar from "../_components/ProfileBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const router = useRouter();
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
      <div className={styles.gamesWrapper}>
        <div className={styles.header}>
          <h1>
            What is the <span className={styles.highlight}>type of game</span>{" "}
            you're trying to create?
          </h1>
          <p>Choose from the 3 PrimeTrader Games.</p>
        </div>

        <div className={styles.cardsWrapper}>
          <PredictionGame />
          <ClashOfTradingTitansGame isMobileView={isMobileView} />
          <TradeRoyal />
        </div>
      </div>
    </div>
  );
}

const ClashOfTradingTitansGame = ({ isMobileView }) => {
  return (
    <Link href="/games/tvt/">
      <div className={`${styles.gameCard} ${styles.activeGame}`}>
        <img
          className={styles.lightning1}
          src={
            isMobileView
              ? "/games/cards/game1/mob/Lightning_Blast_1.png"
              : "/games/cards/game1/Lightning_Blast_1.png"
          }
          alt="blast 1"
        />
        <img
          className={styles.avatarLeft}
          src={
            isMobileView
              ? "/games/cards/game1/mob/avatarLeft.png"
              : "/games/cards/game1/avatarLeft.png"
          }
          alt="left"
        />
        <img
          className={styles.avatarRight}
          src={
            isMobileView
              ? "/games/cards/game1/mob/avatarRight.png"
              : "/games/cards/game1/avatarRight.png"
          }
          alt="right"
        />
        <img
          className={styles.lightning2}
          src={
            isMobileView
              ? "/games/cards/game1/mob/Lightning_Blast_2.png"
              : "/games/cards/game1/Lightning_Blast_2.png"
          }
          alt="blast 2"
        />
        <div className={styles.footer}>
          <div className={styles.content}>
            <h3>Clash of Trading Titans</h3>
            <p>
              Engage in the ultimate crypto showdown. Select your top-performing
              cryptos, place your stakes, and challenge a rival. The best
              portfolio will make it. Are you ready for the clash?
            </p>
          </div>
        </div>

        <div className={styles.footerMob}>
          <div className={styles.content}>
            <h3>Clash of Trading Titans</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

const TradeRoyal = () => {
  return (
    <div className={`${styles.gameCard}`}>
      <div className={styles.lockedCard}>
        <img src="/games/cards/card3blur.png" alt="src" />
        <ComingSoon />
      </div>
    </div>
  );
};

const PredictionGame = () => {
  return (
    <div className={`${styles.gameCard}`}>
      <div className={styles.lockedCard}>
        <img src="/games/cards/card1blur.png" alt="src" />
        <ComingSoon />
      </div>
    </div>
  );
};

const ComingSoon = () => {
  return (
    <div className={styles.comingSoonContainer}>
      <div className={styles.content}>
        <LockIcon />
        <h2>Coming Soon</h2>
        <p>
          {" "}
          <span className={styles.highlight}>Join our Newsletter</span> to stay
          tuned.
        </p>
      </div>
    </div>
  );
};

const LockIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M19.5 11.5H5.5C4.39543 11.5 3.5 12.3954 3.5 13.5V20.5C3.5 21.6046 4.39543 22.5 5.5 22.5H19.5C20.6046 22.5 21.5 21.6046 21.5 20.5V13.5C21.5 12.3954 20.6046 11.5 19.5 11.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.5 11.5V7.5C7.5 6.17392 8.02678 4.90215 8.96447 3.96447C9.90215 3.02678 11.1739 2.5 12.5 2.5C13.8261 2.5 15.0979 3.02678 16.0355 3.96447C16.9732 4.90215 17.5 6.17392 17.5 7.5V11.5"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

// TODO: mobile navigation items add
