"use client";
import React, { useState, useEffect } from "react";
import ProfileBar from "../_components/ProfileBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import { useSearchParams } from "next/navigation";

import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import {
  get_bln_info,
  get_coin_info,
  get_staking_info_user,
  post_stake_user_amount,
  post_unstake_user_amount,
  post_claim_user,
} from "@/app/services/new_service";
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
        title="Coming Soon"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      <div className={style.stackingWrapper}>
        <div className={style.title}>
          <label>Coming in <span className={style.highlight}>June</span></label>
        </div>

        <div className={style.cardCon}>
          <div
            className={style.cardBG}
            style={{ backgroundImage: "url(/upcoming/predict3.png)" }}
          >
            <div className={style.titleBar}>
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0455 5.5C20.0579 5.5 22.5 7.94208 22.5 10.9545V14.5909C22.5 17.6034 20.0579 20.0455 17.0455 20.0455H7.95455C4.94208 20.0455 2.5 17.6034 2.5 14.5909V10.9545C2.5 7.94208 4.94208 5.5 7.95455 5.5H17.0455ZM17.0455 7.31818H7.95455C6.00709 7.31818 4.4172 8.84906 4.32264 10.7731L4.31818 10.9545V14.5909C4.31818 16.5384 5.84906 18.1283 7.77306 18.2228L7.95455 18.2273H17.0455C18.9929 18.2273 20.5828 16.6964 20.6774 14.7724L20.6818 14.5909V10.9545C20.6818 9.00709 19.1509 7.4172 17.2269 7.32264L17.0455 7.31818ZM10.6818 10.0455V11.8636H12.5V13.6818H10.6809L10.6818 15.5H8.86364L8.86273 13.6818H7.04545V11.8636H8.86364V10.0455H10.6818ZM17.9545 13.6818V15.5H16.1364V13.6818H17.9545ZM16.1364 10.0455V11.8636H14.3182V10.0455H16.1364Z"
                  fill="white"
                />
              </svg>

              <label>Predict the Trend Game</label>
            </div>
            <div className={style.details}>
              <label>
                Test your market instincts with Prime Predict. Earn points and
                exclusive rewards when you accurately predict short-term price
                trends.
              </label>
            </div>
          </div>
          <div
            className={style.cardBG}
            style={{ backgroundImage: "url(/upcoming/avatar3.png)" }}
          >
            <div className={style.titleBar}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.04018 20.2501C1.76408 20.7284 1.92801 21.34 2.40633 21.6161C2.88465 21.8922 3.49622 21.7283 3.77232 21.2499L2.04018 20.2501ZM20.2277 21.2499C20.5038 21.7283 21.1154 21.8922 21.5937 21.6161C22.072 21.34 22.2359 20.7284 21.9598 20.2501L20.2277 21.2499ZM17 9.5C17 12.2614 14.7614 14.5 12 14.5V16.5C15.866 16.5 19 13.366 19 9.5H17ZM12 14.5C9.23858 14.5 7 12.2614 7 9.5H5C5 13.366 8.13401 16.5 12 16.5V14.5ZM7 9.5C7 6.73858 9.23858 4.5 12 4.5V2.5C8.13401 2.5 5 5.63401 5 9.5H7ZM12 4.5C14.7614 4.5 17 6.73858 17 9.5H19C19 5.63401 15.866 2.5 12 2.5V4.5ZM3.77232 21.2499C4.60606 19.8055 5.80535 18.6061 7.24962 17.7722L6.24954 16.0401C4.50121 17.0497 3.04944 18.5016 2.04018 20.2501L3.77232 21.2499ZM7.24962 17.7722C8.69389 16.9382 10.3323 16.4992 12 16.4992V14.4992C9.98115 14.4992 7.99787 15.0306 6.24954 16.0401L7.24962 17.7722ZM12 16.4992C13.6677 16.4992 15.3061 16.9382 16.7504 17.7722L17.7505 16.0401C16.0021 15.0306 14.0189 14.4992 12 14.4992V16.4992ZM16.7504 17.7722C18.1947 18.6061 19.3939 19.8055 20.2277 21.2499L21.9598 20.2501C20.9506 18.5016 19.4988 17.0497 17.7505 16.0401L16.7504 17.7722Z"
                  fill="white"
                />
              </svg>

              <label>3D Avatar Builder</label>
            </div>
            <div className={style.details}>
              <label>
                Customize your avatar from over 12 trader models and 300 unique
                assets resulting in 10 billion combinations. The avatars will be
                the key to exclusive rewards and premier gaming and social
                trading experiences
              </label>
            </div>
          </div>
        </div>
        <br />
        <div className={style.title}>
          <label>Coming in <span className={style.highlight}>July</span></label>
        </div>

        <div className={style.cardCon}>
          
          <div
            className={style.cardBG}
            style={{ backgroundImage: "url(/upcoming/trader3.png)" }}
          >
            <div className={style.titleBar}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5455 5.5C19.5579 5.5 22 7.94208 22 10.9545V14.5909C22 17.6034 19.5579 20.0455 16.5455 20.0455H7.45455C4.44208 20.0455 2 17.6034 2 14.5909V10.9545C2 7.94208 4.44208 5.5 7.45455 5.5H16.5455ZM16.5455 7.31818H7.45455C5.50709 7.31818 3.9172 8.84906 3.82264 10.7731L3.81818 10.9545V14.5909C3.81818 16.5384 5.34906 18.1283 7.27306 18.2228L7.45455 18.2273H16.5455C18.4929 18.2273 20.0828 16.6964 20.1774 14.7724L20.1818 14.5909V10.9545C20.1818 9.00709 18.6509 7.4172 16.7269 7.32264L16.5455 7.31818ZM10.1818 10.0455V11.8636H12V13.6818H10.1809L10.1818 15.5H8.36364L8.36273 13.6818H6.54545V11.8636H8.36364V10.0455H10.1818ZM17.4545 13.6818V15.5H15.6364V13.6818H17.4545ZM15.6364 10.0455V11.8636H13.8182V10.0455H15.6364Z"
                  fill="white"
                />
              </svg>

              <label>Trader vs Trader Game</label>
            </div>
            <div className={style.details}>
              <label>
                Enter the arena in our Trader vs Trader game, where you can
                challenge peer traders in exhilarating, real-time competitions.
                Develop your trading skills, climb the leaderboards, and prove
                your mastery.
              </label>
            </div>
          </div>
        </div>
        <div className={style.bottom}>
          *PTV rewards and points only apply after a referee has successfully
          validated an account.
        </div>
      </div>
    </div>
  );
}
