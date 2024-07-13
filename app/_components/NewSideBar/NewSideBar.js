"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import SignOutModal from "../SignOutModal/SignOutModal";
import { useRouter } from "next/navigation";

export default function NewSideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMobItems, setShowMobItems] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);

  const [time, setTime] = useState(null);
  const [token, setToken] = useState(0);
  let tempToken = 0;
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const user = useSelector((state) => state.profileVisibility.user);

  const toggleMobItems = () => {
    console.log("clicked; ");
    setShowMobItems(!showMobItems);
  };

  useEffect(() => {
    if (pathname.includes("dashboard")) {
      setSelectedItem("dashboard");
    } else if (pathname.includes("staking")) {
      console.log("staking");
      setSelectedItem("staking");
    } else if (pathname.includes("portfolio")) {
      console.log("portfolio");
      setSelectedItem("portfolio");
    } else if (pathname.includes("refer-earn")) {
      console.log("refer_earn");
      setSelectedItem("refer_earn");
    } else if (pathname.includes("airdrop")) {
      console.log("airdrop");
      setSelectedItem("airdrop");
    } else if (pathname.includes("ranking")) {
      console.log("ranking");
      setSelectedItem("ranking");
    } else if (pathname.includes("newRanking")) {
      console.log("ranking");
      setSelectedItem("ranking");
    } else if (pathname.includes("profile")) {
      console.log("profile");
      setSelectedItem("update_x_email_pwd");
    } else if (pathname.includes("news")) {
      console.log("news");
      setSelectedItem("news");
    } else if (pathname.includes("summary")) {
      console.log("summary");
      setSelectedItem("summary");
    } else if (pathname.includes("swap")) {
      console.log("summary");
      setSelectedItem("summary");
    } else if (pathname.includes("prediction_game")) {
      console.log("prediction_game");
      setSelectedItem("prediction_game");
    } else if (pathname.includes("rewards")) {
      console.log("rewards");
      setSelectedItem("rewards");
    } else if (pathname.includes("update_x_email_pwd")) {
      console.log("rewards");
      setSelectedItem("update_x_email_pwd");
    } else if (pathname.includes("games")) {
      console.log("games page");
      setSelectedItem("games");
    } else if (pathname.includes("tvt")) {
      console.log("tvt");
      setSelectedItem("tvt");
    } else if (pathname.includes("cryptopricing")) {
      console.log("cryptopricing");
      setSelectedItem("cryptopricing");
    } else {
      setSelectedItem(null);
    }
  }, [pathname]);

  if (selectedItem == null) {
    return null;
  }

  return (
    <>
      <div className={style.DesktopMenu}>
        <div className={style.topRow}>
          {/* <Link href="/summary/"> */}
          <div
            onClick={() => {
              router.back();
              debugger;
            }}
            className={style.logo}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.3099 2.80787C27.5556 0.992435 25.2164 0 22.7368 0H0V10.7474H22.5965C23.1813 10.7474 23.6725 10.239 23.6725 9.63389C23.6725 9.02874 23.1813 8.52042 22.5965 8.52042H2.15205V2.22693H22.6667C26.6199 2.22693 29.8713 5.54312 29.8713 9.58548C29.8713 11.5703 29.1462 13.41 27.7895 14.8139C26.4327 16.2179 24.6316 16.9924 22.7368 16.9924H17.0994V25.3918C17.0994 27.764 15.2515 29.7247 12.9825 29.7489C11.8596 29.7489 10.807 29.3132 10.0117 28.4902C9.21638 27.6672 8.77193 26.5779 8.77193 25.4402V16.5325H6.61988V25.4402C6.61988 27.1831 7.27485 28.829 8.46784 30.0635C9.66082 31.298 11.2515 31.9758 12.9357 31.9758H12.9591C16.4211 31.9758 19.2515 28.9985 19.2515 25.3676V19.2194H22.5263C25.193 19.2194 27.5322 18.2269 29.2866 16.4115C31.0409 14.5961 32 12.1755 32 9.60968C32 7.04387 31.0643 4.6233 29.3099 2.80787Z"
                fill="white"
              />
              <path
                d="M23.6726 9.60956C23.6726 9.00441 23.1813 8.49609 22.5965 8.49609H2.17548L0.0234375 10.723H22.5965C23.1813 10.723 23.6726 10.2389 23.6726 9.60956Z"
                fill="white"
              />
              <path
                d="M17.0967 17.0146V25.414C17.0967 27.7862 15.2488 29.7468 12.9798 29.771C11.857 29.771 10.8043 29.3353 10.009 28.5123C9.21368 27.6893 8.76923 26.6001 8.76923 25.4624V16.5547H6.61719V25.4624C6.61719 27.2052 7.27216 28.8512 8.46514 30.0857C9.65812 31.3202 11.2488 31.998 12.933 31.998H12.9564C16.4184 31.998 19.2488 29.0206 19.2488 25.3898V19.2415L17.0967 17.0146Z"
                fill="white"
              />
              <path
                d="M29.3099 2.80787C27.5556 0.992435 25.2164 0 22.7368 0H0L2.15205 2.22693H22.6667C26.6199 2.22693 29.8713 5.54311 29.8713 9.58547C29.8713 11.5703 29.1462 13.41 27.7895 14.8139C26.4327 16.2178 24.6316 16.9924 22.7368 16.9924H17.1228L19.2749 19.2194H22.7134C25.193 19.2194 27.5322 18.2269 29.2866 16.4115C31.0409 14.5961 32 12.1755 32 9.60968C32 7.04387 31.0643 4.6233 29.3099 2.80787Z"
                fill="white"
              />
            </svg>
          </div>
          {/* </Link> */}
          <div className={style.menu}>
            <Link
              href="/summary/"
              className={`${style.item} ${
                selectedItem == "summary" && style.selectedItem
              }`}
            >
              <DashboardIcon />
              <span className={style.tooltiptext}>Dashboard</span>
            </Link>
            <Link
              href="/staking-latest/?s=Staking"
              className={`${style.item} ${
                selectedItem == "staking" && style.selectedItem
              }`}
            >
              <StakingIcon />
              <span className={style.tooltiptext}>Staking</span>
            </Link>

            <Link
              href="/rewards/"
              className={`${style.item} ${
                selectedItem == "rewards" && style.selectedItem
              }`}
            >
              <RewardsIcon />
              <span className={style.tooltiptext}>Rewards Center</span>
            </Link>
            <Link
              href="/cryptopricing/?s=Cryptomarket"
              className={`${style.item} ${
                selectedItem == "cryptopricing" && style.selectedItem
              }`}
            >
              <MarketIcon />
              <span className={style.tooltiptext}>Crypto Pricing</span>
            </Link>

            {/* <Link
          href="/portfolio/?s=Allocation"
            className={`${style.item} ${
              selectedItem == "portfolio" && style.selectedItem
            }`}
          >
            <PortfolioIcon />
            </Link> */}
            <Link
              href="/refer-earn/?s=Refer"
              className={`${style.item} ${
                selectedItem == "refer_earn" && style.selectedItem
              }`}
            >
              <ReferEarnIcon />
              <span className={style.tooltiptext}>Refer & Earn</span>
            </Link>
            <Link
              href="/newRanking/"
              className={`${style.item} ${
                selectedItem == "ranking" && style.selectedItem
              }`}
            >
              <RankingIcon />
              <span className={style.tooltiptext}>Rankings</span>
            </Link>

            <Link
              href="/prediction_game/"
              className={`${style.item} ${
                selectedItem == "prediction_game" && style.selectedItem
              }`}
            >
              <PredictionGameIcon />
              <span className={style.tooltiptext}>Prediction Game</span>
            </Link>

            {/* <Link
              href="/games/"
              className={`${style.item} ${selectedItem == "games" && style.selectedItem
                }`}
            >
              <GamesIcon />
              <span className={style.tooltiptext}>Games</span>
            </Link> */}

            <Link
              href="/news/"
              className={`${style.item} ${
                selectedItem == "news" && style.selectedItem
              }`}
            >
              <NewsLetterIcon />
              <span className={style.tooltiptext}>News</span>
            </Link>
            <Link
              href="/airdrop/"
              className={`${style.item} ${
                selectedItem == "airdrop" && style.selectedItem
              }`}
            >
              <CommingSoonIcon />
              <span className={style.tooltiptext}>Coming soon</span>
            </Link>
            <Link
              href="/profile/?s=Settings"
              className={`${style.item} ${
                selectedItem == "profile" && style.selectedItem
              }`}
            >
              <UserProfile />
              <span className={style.tooltiptext}>Profile</span>
            </Link>
            {/* <Link
          href="/game/"
            className={`${style.item} ${
              selectedItem == "gaming" && style.selectedItem
            }`}
          >
            <GamingIcon />
            </Link> */}
          </div>
        </div>
        <div
          className={style.signout}
          onClick={() => setShowSignoutModal(true)}
        >
          <svg
            width="24"
            height="28"
            viewBox="0 0 24 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.5 21.5H19.8333C20.2754 21.5 20.6993 21.3244 21.0118 21.0118C21.3244 20.6993 21.5 20.2754 21.5 19.8333V8.16667C21.5 7.72464 21.3244 7.30072 21.0118 6.98816C20.6993 6.67559 20.2754 6.5 19.8333 6.5H16.5"
              stroke="#CD2E54"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.668 18.1654L6.5013 13.9987L10.668 9.83203"
              stroke="#CD2E54"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 14H16.5"
              stroke="#CD2E54"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={style.MobileNav}>
        <div className={style.navigationBar}>
          <LogoSvg />
          <div className={style.Menu}>
            {/* <NotificationBellIcon /> */}
            <svg
              width="24"
              height="26"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10C6 17 3 19 3 19H21C21 19 18 17 18 10Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.7295 23C13.5537 23.3031 13.3014 23.5547 12.9978 23.7295C12.6941 23.9044 12.3499 23.9965 11.9995 23.9965C11.6492 23.9965 11.3049 23.9044 11.0013 23.7295C10.6977 23.5547 10.4453 23.3031 10.2695 23"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle cx="16.7992" cy="4.40078" r="3.6" fill="#FF5E5E" />
            </svg>
            {!showMobItems && (
              <Link href="/profile/?s=Settings">
                <ProfileIcon />
              </Link>
            )}

            <HumburgerIcon
              isOpen={showMobItems}
              toggleMobItems={toggleMobItems}
            />
          </div>
        </div>

        {showMobItems && (
          <div className={style.ItemsWrapper}>
            <div className={style.container}>
              <div className={style.topBar}>
                <div className={style.right}>
                  <Link href="/profile/?s=Settings" onClick={toggleMobItems}>
                    <ProfileIcon />
                  </Link>
                  <h2>{user?.username}</h2>
                </div>
                {/* <CopyComponent text={`0xA3234L`} truncateStyle="end" /> */}
              </div>

              <div className={style.MenuItemsList}>
                <Link href="/summary/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "summary" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.168 14.5V18.5M14.168 22.5H18.168V14.5M18.168 16.5H22.168M22.168 20.5V22.5M3.16797 2.5H9.16797C9.72025 2.5 10.168 2.94772 10.168 3.5V9.5C10.168 10.0523 9.72025 10.5 9.16797 10.5H3.16797C2.61568 10.5 2.16797 10.0523 2.16797 9.5V3.5C2.16797 2.94772 2.61568 2.5 3.16797 2.5ZM3.16797 14.5H9.16797C9.72025 14.5 10.168 14.9477 10.168 15.5V21.5C10.168 22.0523 9.72025 22.5 9.16797 22.5H3.16797C2.61568 22.5 2.16797 22.0523 2.16797 21.5V15.5C2.16797 14.9477 2.61568 14.5 3.16797 14.5ZM15.168 2.5H21.168C21.7203 2.5 22.168 2.94772 22.168 3.5V9.5C22.168 10.0523 21.7203 10.5 21.168 10.5H15.168C14.6157 10.5 14.168 10.0523 14.168 9.5V3.5C14.168 2.94772 14.6157 2.5 15.168 2.5Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Dashboard
                  </div>
                </Link>
                <Link
                  href="/staking-latest/?s=Staking"
                  onClick={toggleMobItems}
                >
                  <div
                    className={`${style.item} ${
                      selectedItem == "staking" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.25 10.25C22.25 12.7353 17.8848 14.75 12.5 14.75M22.25 10.25C22.25 7.76472 17.8848 5.75 12.5 5.75C7.11522 5.75 2.75 7.76472 2.75 10.25M22.25 10.25V14.75C22.25 17 18.5 19.25 12.5 19.25M12.5 14.75C7.11522 14.75 2.75 12.7353 2.75 10.25M12.5 14.75V19.25M2.75 10.25V14.75C2.75 17 6.5 19.25 12.5 19.25M18.5 13.8218V18.3218M6.5 13.8218V18.3218"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Staking
                  </div>
                </Link>
                <Link href="/rewards/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "rewards" && style.active
                    }`}
                  >
                    <RewardsIcon />
                    Rewards
                  </div>
                </Link>
                <Link href="/cryptopricing/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "cryptopricing" && style.active
                    }`}
                  >
                    <MarketIcon />
                    Crypto Pricing
                  </div>
                </Link>
                {/* <div className={style.item}>
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3275_122512)">
                      <path
                        d="M2.26562 5.3749V15.716C2.26562 17.2939 3.54481 18.5732 5.12277 18.5732H16.5515C18.1293 18.5732 19.4086 17.2939 19.4086 15.716V5.35969C19.4086 4.23029 18.7328 3.2105 17.6928 2.7703C13.3285 0.923196 8.37367 0.929428 4.00478 2.76557C2.95558 3.20653 2.26562 4.2368 2.26562 5.3749Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.26562 9.28906H19.4085"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.55078 9.28906V18.5748"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.8359 7.85938V10.7165"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.1211 9.28906V18.5748"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3275_122512">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.835938)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Reward center
                </div> */}

                {/* <div className={style.item}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.20815 20.2501C1.93205 20.7284 2.09598 21.34 2.5743 21.6161C3.05262 21.8922 3.66419 21.7283 3.94029 21.2499L2.20815 20.2501ZM20.3956 21.2499C20.6717 21.7283 21.2833 21.8922 21.7616 21.6161C22.24 21.34 22.4039 20.7284 22.1278 20.2501L20.3956 21.2499ZM17.168 9.5C17.168 12.2614 14.9294 14.5 12.168 14.5V16.5C16.034 16.5 19.168 13.366 19.168 9.5H17.168ZM12.168 14.5C9.40654 14.5 7.16797 12.2614 7.16797 9.5H5.16797C5.16797 13.366 8.30198 16.5 12.168 16.5V14.5ZM7.16797 9.5C7.16797 6.73858 9.40654 4.5 12.168 4.5V2.5C8.30198 2.5 5.16797 5.63401 5.16797 9.5H7.16797ZM12.168 4.5C14.9294 4.5 17.168 6.73858 17.168 9.5H19.168C19.168 5.63401 16.034 2.5 12.168 2.5V4.5ZM3.94029 21.2499C4.77403 19.8055 5.97332 18.6061 7.41759 17.7722L6.41751 16.0401C4.66918 17.0497 3.21741 18.5016 2.20815 20.2501L3.94029 21.2499ZM7.41759 17.7722C8.86186 16.9382 10.5002 16.4992 12.168 16.4992V14.4992C10.1491 14.4992 8.16584 15.0306 6.41751 16.0401L7.41759 17.7722ZM12.168 16.4992C13.8357 16.4992 15.4741 16.9382 16.9183 17.7722L17.9184 16.0401C16.1701 15.0306 14.1868 14.4992 12.168 14.4992V16.4992ZM16.9183 17.7722C18.3626 18.6061 19.5619 19.8055 20.3956 21.2499L22.1278 20.2501C21.1185 18.5016 19.6668 17.0497 17.9184 16.0401L16.9183 17.7722Z"
                      fill="white"
                    />
                  </svg>
                  Portfolio
                </div> */}

                <Link href="/refer-earn/?s=Refer" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "refer_earn" && style.active
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4936_68756)">
                        <path
                          d="M23.3005 15.0907V13.5479C23.3008 12.5215 22.9599 11.5241 22.3315 10.7126C21.7031 9.90105 20.8227 9.32144 19.8289 9.06489C18.8351 8.80834 17.7842 8.8894 16.8414 9.29532C15.8987 9.70125 15.1177 10.409 14.6211 11.3073"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5859 4.28884C15.5859 5.10722 15.911 5.89209 16.4897 6.47077C17.0684 7.04945 17.8533 7.37455 18.6717 7.37455C19.49 7.37455 20.2749 7.04945 20.8536 6.47077C21.4323 5.89209 21.7574 5.10722 21.7574 4.28884C21.7574 3.47046 21.4323 2.68559 20.8536 2.10691C20.2749 1.52823 19.49 1.20313 18.6717 1.20312C17.8533 1.20313 17.0684 1.52823 16.4897 2.10691C15.911 2.68559 15.5859 3.47046 15.5859 4.28884Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.24219 4.28884C3.24219 5.10722 3.56729 5.89209 4.14597 6.47077C4.72466 7.04945 5.50952 7.37455 6.3279 7.37455C7.14628 7.37455 7.93115 7.04945 8.50983 6.47077C9.08852 5.89209 9.41362 5.10722 9.41362 4.28884C9.41362 3.47046 9.08852 2.68559 8.50983 2.10691C7.93115 1.52823 7.14628 1.20313 6.3279 1.20312C5.50952 1.20313 4.72466 1.52823 4.14597 2.10691C3.56729 2.68559 3.24219 3.47046 3.24219 4.28884Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.41406 13.5427C9.41406 14.3611 9.73916 15.146 10.3178 15.7247C10.8965 16.3034 11.6814 16.6285 12.4998 16.6285C13.3182 16.6285 14.103 16.3034 14.6817 15.7247C15.2604 15.146 15.5855 14.3611 15.5855 13.5427C15.5855 12.7244 15.2604 11.9395 14.6817 11.3608C14.103 10.7821 13.3182 10.457 12.4998 10.457C11.6814 10.457 10.8965 10.7821 10.3178 11.3608C9.73916 11.9395 9.41406 12.7244 9.41406 13.5427Z"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.1282 22.8004C17.1282 21.5729 16.6406 20.3956 15.7726 19.5276C14.9045 18.6595 13.7272 18.1719 12.4997 18.1719C11.2721 18.1719 10.0948 18.6595 9.22677 19.5276C8.35875 20.3956 7.87109 21.5729 7.87109 22.8004"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.69922 15.0907V13.5479C1.69893 12.5215 2.0398 11.5241 2.66825 10.7126C3.29669 9.90105 4.17704 9.32144 5.17086 9.06489C6.16468 8.80834 7.21559 8.8894 8.15831 9.29532C9.10103 9.70125 9.88209 10.409 10.3786 11.3073"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4936_68756">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    Refer & Earn
                  </div>
                </Link>
                <Link href="/newRanking/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "ranking" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16577 21.5H15.1658M12.1658 17.75V21.5M18.7469 12.5H19.6657C20.4613 12.5 21.2244 12.1839 21.787 11.6213C22.3496 11.0587 22.6657 10.2956 22.6657 9.5V8C22.6657 7.80109 22.5867 7.61032 22.446 7.46967C22.3054 7.32902 22.1146 7.25 21.9157 7.25H18.9157M5.60312 12.5H4.65625C3.8606 12.5 3.09754 12.1839 2.53493 11.6213C1.97232 11.0587 1.65625 10.2956 1.65625 9.5V8C1.65625 7.80109 1.73527 7.61032 1.87592 7.46967C2.01657 7.32902 2.20734 7.25 2.40625 7.25H5.40625M5.41577 5.75V10.9156C5.41577 14.6375 8.39702 17.7219 12.1189 17.75C13.0093 17.7562 13.892 17.5862 14.7164 17.2497C15.5408 16.9133 16.2904 16.417 16.9222 15.7896C17.554 15.1622 18.0554 14.416 18.3975 13.594C18.7397 12.772 18.9158 11.8904 18.9158 11V5.75C18.9158 5.55109 18.8368 5.36032 18.6961 5.21967C18.5554 5.07902 18.3647 5 18.1658 5H6.16577C5.96686 5 5.77609 5.07902 5.63544 5.21967C5.49479 5.36032 5.41577 5.55109 5.41577 5.75Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Ranking
                  </div>
                </Link>
                <Link href="/prediction_game/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "prediction_game" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.0455 5C20.0579 5 22.5 7.44208 22.5 10.4545V14.0909C22.5 17.1034 20.0579 19.5455 17.0455 19.5455H7.95455C4.94208 19.5455 2.5 17.1034 2.5 14.0909V10.4545C2.5 7.44208 4.94208 5 7.95455 5H17.0455ZM17.0455 6.81818H7.95455C6.00709 6.81818 4.4172 8.34906 4.32264 10.2731L4.31818 10.4545V14.0909C4.31818 16.0384 5.84906 17.6283 7.77306 17.7228L7.95455 17.7273H17.0455C18.9929 17.7273 20.5828 16.1964 20.6774 14.2724L20.6818 14.0909V10.4545C20.6818 8.50709 19.1509 6.9172 17.2269 6.82264L17.0455 6.81818ZM10.6818 9.54545V11.3636H12.5V13.1818H10.6809L10.6818 15H8.86364L8.86273 13.1818H7.04545V11.3636H8.86364V9.54545H10.6818ZM17.9545 13.1818V15H16.1364V13.1818H17.9545ZM16.1364 9.54545V11.3636H14.3182V9.54545H16.1364Z"
                        fill="white"
                      />
                    </svg>
                    Games
                  </div>
                </Link>

                {/* <Link
                  href="/games/"
                  className={`${style.item} ${selectedItem == "games" && style.active
                    }`}
                >
                  <GamesIcon />
                  <span className={style.tooltiptext}>Games</span>
                </Link> */}

                <Link href="/news/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "news" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.83594 11H17.3359M9.83594 14H17.3359M3.83594 19.25C4.23376 19.25 4.61529 19.092 4.8966 18.8107C5.1779 18.5294 5.33594 18.1478 5.33594 17.75V6.5C5.33594 6.30109 5.41496 6.11032 5.55561 5.96967C5.69626 5.82902 5.88703 5.75 6.08594 5.75H21.0859C21.2848 5.75 21.4756 5.82902 21.6163 5.96967C21.7569 6.11032 21.8359 6.30109 21.8359 6.5V17.75C21.8359 18.1478 21.6779 18.5294 21.3966 18.8107C21.1153 19.092 20.7338 19.25 20.3359 19.25H3.83594ZM3.83594 19.25C3.43811 19.25 3.05658 19.092 2.77528 18.8107C2.49397 18.5294 2.33594 18.1478 2.33594 17.75V8.75"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    News
                  </div>
                </Link>
                <Link href="/profile/?s=Settings" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "profile" && style.active
                    }`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.8359 15.5C14.907 15.5 16.5859 13.8211 16.5859 11.75C16.5859 9.67893 14.907 8 12.8359 8C10.7649 8 9.08594 9.67893 9.08594 11.75C9.08594 13.8211 10.7649 15.5 12.8359 15.5ZM12.8359 15.5C11.5894 15.5 10.3673 15.8446 9.30496 16.4967C8.2426 17.1488 7.38155 18.0823 6.81726 19.1938M12.8359 15.5C14.0825 15.5 15.3047 15.8446 16.3671 16.4967C17.4294 17.1488 18.2905 18.0823 18.8548 19.1938M21.8359 12.5C21.8359 17.4706 17.8065 21.5 12.8359 21.5C7.86537 21.5 3.83594 17.4706 3.83594 12.5C3.83594 7.52944 7.86537 3.5 12.8359 3.5C17.8065 3.5 21.8359 7.52944 21.8359 12.5Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Profile
                  </div>
                </Link>

                {/* <div className={style.item}>
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3275_122539)">
                      <path
                        d="M15.0455 3.5C18.0579 3.5 20.5 5.94208 20.5 8.95455V12.5909C20.5 15.6034 18.0579 18.0455 15.0455 18.0455H5.95455C2.94208 18.0455 0.5 15.6034 0.5 12.5909V8.95455C0.5 5.94208 2.94208 3.5 5.95455 3.5H15.0455ZM15.0455 5.31818H5.95455C4.00709 5.31818 2.4172 6.84906 2.32264 8.77305L2.31818 8.95455V12.5909C2.31818 14.5384 3.84906 16.1283 5.77306 16.2228L5.95455 16.2273H15.0455C16.9929 16.2273 18.5828 14.6964 18.6774 12.7724L18.6818 12.5909V8.95455C18.6818 7.00709 17.1509 5.4172 15.2269 5.32264L15.0455 5.31818ZM8.68182 8.04545V9.86364H10.5V11.6818H8.68091L8.68182 13.5H6.86364L6.86273 11.6818H5.04545V9.86364H6.86364V8.04545H8.68182ZM15.9545 11.6818V13.5H14.1364V11.6818H15.9545ZM14.1364 8.04545V9.86364H12.3182V8.04545H14.1364Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3275_122539">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Games
                </div> */}

                <Link href="/airdrop/" onClick={toggleMobItems}>
                  <div
                    className={`${style.item} ${
                      selectedItem == "airdrop" && style.active
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M14.1608 11.4081C13.0575 10.5065 11.5611 10 10.0007 10C8.44043 10 6.94403 10.5065 5.84073 11.4081C3.13617 13.6183 4.5796 16.3179 5.37827 18.9286H14.6233C15.4218 16.3179 16.8653 13.6183 14.1608 11.4081Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M14.1608 8.59269C13.0575 9.49431 11.5611 10.0008 10.0007 10.0008C8.44043 10.0008 6.94403 9.49431 5.84073 8.59269C3.13617 6.38254 4.5796 3.68295 5.37827 1.07227H14.6233C15.4218 3.68295 16.8653 6.38254 14.1608 8.59269Z"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2.44531 1.07227H17.5551"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2.44531 18.9297H17.5551"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    Coming Soon
                  </div>
                </Link>

                <div href onClick={() => setShowSignoutModal(true)}>
                  <div className={`${style.item}`}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5 17.5H15.8333C16.2754 17.5 16.6993 17.3244 17.0118 17.0118C17.3244 16.6993 17.5 16.2754 17.5 15.8333V4.16667C17.5 3.72464 17.3244 3.30072 17.0118 2.98816C16.6993 2.67559 16.2754 2.5 15.8333 2.5H12.5"
                        stroke="#CD2E54"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66797 14.1654L2.5013 9.9987L6.66797 5.83203"
                        stroke="#CD2E54"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M2.5 10H12.5"
                        stroke="#CD2E54"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    Logout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {showSignoutModal && (
        <SignOutModal onClose={() => setShowSignoutModal(false)} />
      )}
    </>
  );
}

const DashboardIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        d="M14 14V18M14 22H18V14M18 16H22M22 20V22M3 2H9C9.55228 2 10 2.44772 10 3V9C10 9.55228 9.55228 10 9 10H3C2.44772 10 2 9.55228 2 9V3C2 2.44772 2.44772 2 3 2ZM3 14H9C9.55228 14 10 14.4477 10 15V21C10 21.5523 9.55228 22 9 22H3C2.44772 22 2 21.5523 2 21V15C2 14.4477 2.44772 14 3 14ZM15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10H15C14.4477 10 14 9.55228 14 9V3C14 2.44772 14.4477 2 15 2Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const NotificationBellIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="26"
      viewBox="0 0 24 26"
      fill="none"
    >
      <path
        d="M18 10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10C6 17 3 19 3 19H21C21 19 18 17 18 10Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.7295 23C13.5537 23.3031 13.3014 23.5547 12.9978 23.7295C12.6941 23.9044 12.3499 23.9965 11.9995 23.9965C11.6492 23.9965 11.3049 23.9044 11.0013 23.7295C10.6977 23.5547 10.4453 23.3031 10.2695 23"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16.7992" cy="4.40078" r="3.6" fill="#FF5E5E" />
    </svg>
  );
};

const ProfileIcon = () => {
  return (
    <img src="/icons/newAvatar.png" alt="avatar" className={style.MenuAvatar} />
  );
};

const HumburgerIcon = ({ isOpen, toggleMobItems }) => {
  return (
    <svg
      onClick={toggleMobItems}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      {isOpen ? (
        <>
          {" "}
          <path
            d="M18 6L6 18"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M7.80078 12L21.0007 12"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 6H21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.79102 18L20.9997 18"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

const HumburgerCloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 6L6 18"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LogoSvg = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.3099 2.80787C27.5556 0.992435 25.2164 0 22.7368 0H0V10.7474H22.5965C23.1813 10.7474 23.6725 10.239 23.6725 9.63389C23.6725 9.02874 23.1813 8.52042 22.5965 8.52042H2.15205V2.22693H22.6667C26.6199 2.22693 29.8713 5.54312 29.8713 9.58548C29.8713 11.5703 29.1462 13.41 27.7895 14.8139C26.4327 16.2179 24.6316 16.9924 22.7368 16.9924H17.0994V25.3918C17.0994 27.764 15.2515 29.7247 12.9825 29.7489C11.8596 29.7489 10.807 29.3132 10.0117 28.4902C9.21638 27.6672 8.77193 26.5779 8.77193 25.4402V16.5325H6.61988V25.4402C6.61988 27.1831 7.27485 28.829 8.46784 30.0635C9.66082 31.298 11.2515 31.9758 12.9357 31.9758H12.9591C16.4211 31.9758 19.2515 28.9985 19.2515 25.3676V19.2194H22.5263C25.193 19.2194 27.5322 18.2269 29.2866 16.4115C31.0409 14.5961 32 12.1755 32 9.60968C32 7.04387 31.0643 4.6233 29.3099 2.80787Z"
        fill="white"
      />
      <path
        d="M23.6726 9.60956C23.6726 9.00441 23.1813 8.49609 22.5965 8.49609H2.17548L0.0234375 10.723H22.5965C23.1813 10.723 23.6726 10.2389 23.6726 9.60956Z"
        fill="white"
      />
      <path
        d="M17.0967 17.0146V25.414C17.0967 27.7862 15.2488 29.7468 12.9798 29.771C11.857 29.771 10.8043 29.3353 10.009 28.5123C9.21368 27.6893 8.76923 26.6001 8.76923 25.4624V16.5547H6.61719V25.4624C6.61719 27.2052 7.27216 28.8512 8.46514 30.0857C9.65812 31.3202 11.2488 31.998 12.933 31.998H12.9564C16.4184 31.998 19.2488 29.0206 19.2488 25.3898V19.2415L17.0967 17.0146Z"
        fill="white"
      />
      <path
        d="M29.3099 2.80787C27.5556 0.992435 25.2164 0 22.7368 0H0L2.15205 2.22693H22.6667C26.6199 2.22693 29.8713 5.54311 29.8713 9.58547C29.8713 11.5703 29.1462 13.41 27.7895 14.8139C26.4327 16.2178 24.6316 16.9924 22.7368 16.9924H17.1228L19.2749 19.2194H22.7134C25.193 19.2194 27.5322 18.2269 29.2866 16.4115C31.0409 14.5961 32 12.1755 32 9.60968C32 7.04387 31.0643 4.6233 29.3099 2.80787Z"
        fill="white"
      />
    </svg>
  );
};

const StakingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        d="M21.75 9.75C21.75 12.2353 17.3848 14.25 12 14.25M21.75 9.75C21.75 7.26472 17.3848 5.25 12 5.25C6.61522 5.25 2.25 7.26472 2.25 9.75M21.75 9.75V14.25C21.75 16.5 18 18.75 12 18.75M12 14.25C6.61522 14.25 2.25 12.2353 2.25 9.75M12 14.25V18.75M2.25 9.75V14.25C2.25 16.5 6 18.75 12 18.75M18 13.3218V17.8218M6 13.3218V17.8218"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PortfolioIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <g clipPath="url(#clip0_3265_122599)">
        <path
          d="M3.42969 7.3749V17.716C3.42969 19.2939 4.70887 20.5732 6.28683 20.5732H17.7155C19.2934 20.5732 20.5727 19.2939 20.5727 17.716V7.35969C20.5727 6.23029 19.8968 5.2105 18.8568 4.7703C14.4925 2.9232 9.53773 2.92943 5.16884 4.76557C4.11964 5.20653 3.42969 6.2368 3.42969 7.3749Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.42969 11.2891H20.5725"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.71484 11.2891V20.5748"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 9.85938V12.7165"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.2852 11.2891V20.5748"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3265_122599">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const ReferEarnIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_4639_62125)">
        <path
          d="M22.8005 15.0907V13.5479C22.8008 12.5215 22.4599 11.5241 21.8315 10.7126C21.2031 9.90105 20.3227 9.32144 19.3289 9.06489C18.3351 8.80834 17.2842 8.8894 16.3414 9.29532C15.3987 9.70125 14.6177 10.409 14.1211 11.3073"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.0859 4.28884C15.0859 5.10722 15.411 5.89209 15.9897 6.47077C16.5684 7.04945 17.3533 7.37455 18.1717 7.37455C18.99 7.37455 19.7749 7.04945 20.3536 6.47077C20.9323 5.89209 21.2574 5.10722 21.2574 4.28884C21.2574 3.47046 20.9323 2.68559 20.3536 2.10691C19.7749 1.52823 18.99 1.20313 18.1717 1.20312C17.3533 1.20313 16.5684 1.52823 15.9897 2.10691C15.411 2.68559 15.0859 3.47046 15.0859 4.28884Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.74219 4.28884C2.74219 5.10722 3.06729 5.89209 3.64597 6.47077C4.22466 7.04945 5.00952 7.37455 5.8279 7.37455C6.64628 7.37455 7.43115 7.04945 8.00983 6.47077C8.58852 5.89209 8.91362 5.10722 8.91362 4.28884C8.91362 3.47046 8.58852 2.68559 8.00983 2.10691C7.43115 1.52823 6.64628 1.20313 5.8279 1.20312C5.00952 1.20313 4.22466 1.52823 3.64597 2.10691C3.06729 2.68559 2.74219 3.47046 2.74219 4.28884Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.91406 13.5427C8.91406 14.3611 9.23916 15.146 9.81785 15.7247C10.3965 16.3034 11.1814 16.6285 11.9998 16.6285C12.8182 16.6285 13.603 16.3034 14.1817 15.7247C14.7604 15.146 15.0855 14.3611 15.0855 13.5427C15.0855 12.7244 14.7604 11.9395 14.1817 11.3608C13.603 10.7821 12.8182 10.457 11.9998 10.457C11.1814 10.457 10.3965 10.7821 9.81785 11.3608C9.23916 11.9395 8.91406 12.7244 8.91406 13.5427Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.6282 22.8004C16.6282 21.5729 16.1406 20.3956 15.2726 19.5276C14.4045 18.6595 13.2272 18.1719 11.9997 18.1719C10.7721 18.1719 9.5948 18.6595 8.72677 19.5276C7.85875 20.3956 7.37109 21.5729 7.37109 22.8004"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.19922 15.0907V13.5479C1.19893 12.5215 1.5398 11.5241 2.16825 10.7126C2.79669 9.90105 3.67704 9.32144 4.67086 9.06489C5.66468 8.80834 6.71559 8.8894 7.65831 9.29532C8.60103 9.70125 9.38209 10.409 9.87865 11.3073"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4639_62125">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const AirDropIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        d="M20 12V22H4V12"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 7H2V12H22V7Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 22V7"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const RankingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        d="M9.00171 21H15.0017M12.0017 17.25V21M18.5829 12H19.5016C20.2973 12 21.0603 11.6839 21.623 11.1213C22.1856 10.5587 22.5016 9.79565 22.5016 9V7.5C22.5016 7.30109 22.4226 7.11032 22.282 6.96967C22.1413 6.82902 21.9505 6.75 21.7516 6.75H18.7516M5.43906 12H4.49219C3.69654 12 2.93348 11.6839 2.37087 11.1213C1.80826 10.5587 1.49219 9.79565 1.49219 9V7.5C1.49219 7.30109 1.57121 7.11032 1.71186 6.96967C1.85251 6.82902 2.04328 6.75 2.24219 6.75H5.24219M5.25171 5.25V10.4156C5.25171 14.1375 8.23296 17.2219 11.9548 17.25C12.8452 17.2562 13.728 17.0862 14.5523 16.7497C15.3767 16.4133 16.1264 15.917 16.7581 15.2896C17.3899 14.6622 17.8913 13.916 18.2334 13.094C18.5756 12.272 18.7517 11.3904 18.7517 10.5V5.25C18.7517 5.05109 18.6727 4.86032 18.532 4.71967C18.3914 4.57902 18.2006 4.5 18.0017 4.5H6.00171C5.8028 4.5 5.61203 4.57902 5.47138 4.71967C5.33073 4.86032 5.25171 5.05109 5.25171 5.25Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const UserProfile = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.04018 19.7501C1.76408 20.2284 1.92801 20.84 2.40633 21.1161C2.88465 21.3922 3.49622 21.2283 3.77232 20.7499L2.04018 19.7501ZM20.2277 20.7499C20.5038 21.2283 21.1154 21.3922 21.5937 21.1161C22.072 20.84 22.2359 20.2284 21.9598 19.7501L20.2277 20.7499ZM17 9C17 11.7614 14.7614 14 12 14V16C15.866 16 19 12.866 19 9H17ZM12 14C9.23858 14 7 11.7614 7 9H5C5 12.866 8.13401 16 12 16V14ZM7 9C7 6.23858 9.23858 4 12 4V2C8.13401 2 5 5.13401 5 9H7ZM12 4C14.7614 4 17 6.23858 17 9H19C19 5.13401 15.866 2 12 2V4ZM3.77232 20.7499C4.60606 19.3055 5.80535 18.1061 7.24962 17.2722L6.24954 15.5401C4.50121 16.5497 3.04944 18.0016 2.04018 19.7501L3.77232 20.7499ZM7.24962 17.2722C8.69389 16.4382 10.3323 15.9992 12 15.9992V13.9992C9.98115 13.9992 7.99787 14.5306 6.24954 15.5401L7.24962 17.2722ZM12 15.9992C13.6677 15.9992 15.3061 16.4382 16.7504 17.2722L17.7505 15.5401C16.0021 14.5306 14.0189 13.9992 12 13.9992V15.9992ZM16.7504 17.2722C18.1947 18.1061 19.3939 19.3055 20.2277 20.7499L21.9598 19.7501C20.9506 18.0016 19.4988 16.5497 17.7505 15.5401L16.7504 17.2722Z"
        fill="white"
      />
    </svg>
  );
};

const GamingIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <g clipPath="url(#clip0_3265_122621)">
        <path
          d="M16.5577 6.31833L16.5577 6.31818H16.5455H7.45455C5.23917 6.31818 3.43083 8.05956 3.32324 10.2485L3.32309 10.2485L3.32279 10.2608L3.31833 10.4423L3.31818 10.4423V10.4545V14.0909C3.31818 16.3063 5.05956 18.1146 7.24851 18.2222L7.24851 18.2224L7.26079 18.2227L7.44228 18.2271L7.44227 18.2273H7.45455H16.5455C18.7608 18.2273 20.5692 16.4859 20.6768 14.2969L20.6769 14.2969L20.6772 14.2846L20.6817 14.1032L20.6818 14.1032V14.0909V10.4545C20.6818 8.23916 18.9404 6.43083 16.7515 6.32324L16.7515 6.32309L16.7392 6.32279L16.5577 6.31833ZM9.68091 13.1821L9.68157 14.5H8.86339L8.86273 13.1816L8.86248 12.6818H8.36273H7.04545V11.8636H8.36364H8.86364V11.3636V10.0455H9.68182V11.3636V11.8636H10.1818H11.5V12.6818H10.1809H9.68066L9.68091 13.1821ZM16.5455 5.5C19.2818 5.5 21.5 7.71822 21.5 10.4545V14.0909C21.5 16.8272 19.2818 19.0455 16.5455 19.0455H7.45455C4.71822 19.0455 2.5 16.8272 2.5 14.0909V10.4545C2.5 7.71822 4.71822 5.5 7.45455 5.5H16.5455ZM16.9545 14.5H16.1364V13.6818H16.9545V14.5ZM15.1364 10.8636H14.3182V10.0455H15.1364V10.8636Z"
          fill="white"
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_3265_122621">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const NewsLetterIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "24px", minHeight: "24px" }}
    >
      <path
        d="M9 10.5H16.5M9 13.5H16.5M3 18.75C3.39782 18.75 3.77936 18.592 4.06066 18.3107C4.34196 18.0294 4.5 17.6478 4.5 17.25V6C4.5 5.80109 4.57902 5.61032 4.71967 5.46967C4.86032 5.32902 5.05109 5.25 5.25 5.25H20.25C20.4489 5.25 20.6397 5.32902 20.7803 5.46967C20.921 5.61032 21 5.80109 21 6V17.25C21 17.6478 20.842 18.0294 20.5607 18.3107C20.2794 18.592 19.8978 18.75 19.5 18.75H3ZM3 18.75C2.60218 18.75 2.22064 18.592 1.93934 18.3107C1.65804 18.0294 1.5 17.6478 1.5 17.25V8.25"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const CommingSoonIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M14.1608 11.4081C13.0575 10.5065 11.5611 10 10.0007 10C8.44043 10 6.94403 10.5065 5.84073 11.4081C3.13617 13.6183 4.5796 16.3179 5.37827 18.9286H14.6233C15.4218 16.3179 16.8653 13.6183 14.1608 11.4081Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1608 8.59269C13.0575 9.49431 11.5611 10.0008 10.0007 10.0008C8.44043 10.0008 6.94403 9.49431 5.84073 8.59269C3.13617 6.38254 4.5796 3.68295 5.37827 1.07227H14.6233C15.4218 3.68295 16.8653 6.38254 14.1608 8.59269Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.44531 1.07227H17.5551"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.44531 18.9297H17.5551"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PredictionGameIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5577 6.31833L16.5577 6.31818H16.5455H7.45455C5.23917 6.31818 3.43083 8.05956 3.32324 10.2485L3.32309 10.2485L3.32279 10.2608L3.31833 10.4423L3.31818 10.4423V10.4545V14.0909C3.31818 16.3063 5.05956 18.1146 7.24851 18.2222L7.24851 18.2224L7.26079 18.2227L7.44228 18.2271L7.44227 18.2273H7.45455H16.5455C18.7608 18.2273 20.5692 16.4859 20.6768 14.2969L20.6769 14.2969L20.6772 14.2846L20.6817 14.1032L20.6818 14.1032V14.0909V10.4545C20.6818 8.23916 18.9404 6.43083 16.7515 6.32324L16.7515 6.32309L16.7392 6.32279L16.5577 6.31833ZM9.68091 13.1821L9.68157 14.5H8.86339L8.86273 13.1816L8.86248 12.6818H8.36273H7.04545V11.8636H8.36364H8.86364V11.3636V10.0455H9.68182V11.3636V11.8636H10.1818H11.5V12.6818H10.1809H9.68066L9.68091 13.1821ZM16.5455 5.5C19.2818 5.5 21.5 7.71822 21.5 10.4545V14.0909C21.5 16.8272 19.2818 19.0455 16.5455 19.0455H7.45455C4.71822 19.0455 2.5 16.8272 2.5 14.0909V10.4545C2.5 7.71822 4.71822 5.5 7.45455 5.5H16.5455ZM16.9545 14.5H16.1364V13.6818H16.9545V14.5ZM15.1364 10.8636H14.3182V10.0455H15.1364V10.8636Z"
        fill="white"
        stroke="white"
      />
    </svg>
  );
};
const RewardsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clip-path="url(#clip0_5293_4312)">
        <path
          d="M16.6673 10V18.3333H3.33398V10"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.3327 5.83203H1.66602V9.9987H18.3327V5.83203Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 18.332V5.83203"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9.99935 5.83464H6.24935C5.69681 5.83464 5.16691 5.61514 4.77621 5.22444C4.38551 4.83374 4.16602 4.30384 4.16602 3.7513C4.16602 3.19877 4.38551 2.66886 4.77621 2.27816C5.16691 1.88746 5.69681 1.66797 6.24935 1.66797C9.16602 1.66797 9.99935 5.83464 9.99935 5.83464Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M10 5.83464H13.75C14.3025 5.83464 14.8324 5.61514 15.2231 5.22444C15.6138 4.83374 15.8333 4.30384 15.8333 3.7513C15.8333 3.19877 15.6138 2.66886 15.2231 2.27816C14.8324 1.88746 14.3025 1.66797 13.75 1.66797C10.8333 1.66797 10 5.83464 10 5.83464Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5293_4312">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const GamesIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clip-path="url(#clip0_8858_147473)">
        <path
          d="M10.1243 15.6044L4.71181 21.0211C4.48196 21.2504 4.17043 21.379 3.84575 21.3786C3.52108 21.3783 3.20986 21.2488 2.98056 21.019C2.75126 20.7892 2.62266 20.4777 2.62305 20.1529C2.62344 19.8283 2.75279 19.5171 2.98264 19.2878L8.39931 13.8711"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5.33398 14.0547L9.94565 18.6664"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.6664 14.0547L14.0547 18.6664"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19.2873 21.0164C19.5166 21.2458 19.8276 21.3746 20.1519 21.3746C20.4761 21.3746 20.7871 21.2458 21.0165 21.0164C21.2458 20.7872 21.3745 20.4762 21.3745 20.1518C21.3745 19.8276 21.2458 19.5166 21.0165 19.2873L4.71229 2.98312C4.48299 2.75382 4.17199 2.625 3.8477 2.625C3.52342 2.625 3.21242 2.75382 2.98312 2.98312C2.75382 3.21243 2.625 3.52343 2.625 3.8477C2.625 4.17199 2.75382 4.48298 2.98312 4.71229L19.2873 21.0164Z"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.875 8.39519L19.2917 2.98269C19.5242 2.77087 19.8296 2.65687 20.1441 2.66441C20.4586 2.67195 20.7581 2.80045 20.9803 3.02317C21.2024 3.24589 21.3302 3.54569 21.337 3.86021C21.3437 4.17474 21.2291 4.47976 21.0167 4.71185L15.6 10.1285"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_8858_147473">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(2 2)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
const MarketIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M21.75 5.75L12.75 14.75L9 11L2.25 17.75M21.75 5.75V11.75M21.75 5.75H15.75"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
