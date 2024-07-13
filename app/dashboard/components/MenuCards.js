"use client";
import React, { useState, useEffect } from "react";
import style from "./style.module.scss";
import mainStyle from "../style.module.scss";
import Link from "next/link";

export default function MenuCards({ ActivePage, isMobileView, menuData }) {
  return isMobileView ? (
    <MobileMenu ActivePage={ActivePage} />
  ) : (
    <DesktopMenu ActivePage={ActivePage} menuData={menuData} />
  );
}
const MobileMenu = ({ ActivePage }) => {
  return (
    <div className={style.MobileMenu}>
      {ActivePage != "portfolio" && (
        <Link
          href={"/dashboard/?s=portfolio"}
          style={{ textDecoration: "none" }}
        >
          <div className={style.item}>
            <svg
              style={{
                minHeight: "24px",
                maxHeight: "24px",
                height: "24px",
                width: "25px",
                minWidth: "25px",
                maxWidth: "25px",
              }}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.20619 19.7501C1.9301 20.2284 2.09403 20.84 2.57235 21.1161C3.05066 21.3922 3.66224 21.2283 3.93834 20.7499L2.20619 19.7501ZM20.3937 20.7499C20.6698 21.2283 21.2814 21.3922 21.7597 21.1161C22.238 20.84 22.4019 20.2284 22.1258 19.7501L20.3937 20.7499ZM17.166 9C17.166 11.7614 14.9274 14 12.166 14V16C16.032 16 19.166 12.866 19.166 9H17.166ZM12.166 14C9.40459 14 7.16602 11.7614 7.16602 9H5.16602C5.16602 12.866 8.30002 16 12.166 16V14ZM7.16602 9C7.16602 6.23858 9.40459 4 12.166 4V2C8.30002 2 5.16602 5.13401 5.16602 9H7.16602ZM12.166 4C14.9274 4 17.166 6.23858 17.166 9H19.166C19.166 5.13401 16.032 2 12.166 2V4ZM3.93834 20.7499C4.77208 19.3055 5.97136 18.1061 7.41564 17.2722L6.41556 15.5401C4.66723 16.5497 3.21546 18.0016 2.20619 19.7501L3.93834 20.7499ZM7.41564 17.2722C8.85991 16.4382 10.4983 15.9992 12.166 15.9992V13.9992C10.1472 13.9992 8.16389 14.5306 6.41556 15.5401L7.41564 17.2722ZM12.166 15.9992C13.8338 15.9992 15.4721 16.4382 16.9164 17.2722L17.9165 15.5401C16.1681 14.5306 14.1849 13.9992 12.166 13.9992V15.9992ZM16.9164 17.2722C18.3607 18.1061 19.56 19.3055 20.3937 20.7499L22.1258 19.7501C21.1166 18.0016 19.6648 16.5497 17.9165 15.5401L16.9164 17.2722Z"
                fill="white"
              />
            </svg>

            <div style={{ height: "4px", width: "4px" }}></div>
            <label>Portfolio</label>
          </div>
        </Link>
      )}
      {ActivePage != "refer" && (
        <Link href={"/dashboard/?s=refer"} style={{ textDecoration: "none" }}>
          <div className={style.item}>
            <svg
              style={{
                minHeight: "24px",
                maxHeight: "24px",
                height: "24px",
                width: "25px",
                minWidth: "25px",
                maxWidth: "25px",
              }}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.166 12V22H4.16602V12"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.166 7H2.16602V12H22.166V7Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.166 22V7"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.166 7H7.66602C7.00297 7 6.36709 6.73661 5.89825 6.26777C5.42941 5.79893 5.16602 5.16304 5.16602 4.5C5.16602 3.83696 5.42941 3.20107 5.89825 2.73223C6.36709 2.26339 7.00297 2 7.66602 2C11.166 2 12.166 7 12.166 7Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.166 7H16.666C17.3291 7 17.9649 6.73661 18.4338 6.26777C18.9026 5.79893 19.166 5.16304 19.166 4.5C19.166 3.83696 18.9026 3.20107 18.4338 2.73223C17.9649 2.26339 17.3291 2 16.666 2C13.166 2 12.166 7 12.166 7Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ height: "4px", width: "4px" }}></div>
            <label>Refer & Earn</label>
          </div>
        </Link>
      )}
      {ActivePage != "stake" && (
        <Link href={"/dashboard/?s=stake"} style={{ textDecoration: "none" }}>
          <div className={style.item}>
            <svg
              style={{
                minHeight: "24px",
                maxHeight: "24px",
                height: "24px",
                width: "25px",
                minWidth: "25px",
                maxWidth: "25px",
              }}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.25 9.75C22.25 12.2353 17.8848 14.25 12.5 14.25M22.25 9.75C22.25 7.26472 17.8848 5.25 12.5 5.25C7.11522 5.25 2.75 7.26472 2.75 9.75M22.25 9.75V14.25C22.25 16.5 18.5 18.75 12.5 18.75M12.5 14.25C7.11522 14.25 2.75 12.2353 2.75 9.75M12.5 14.25V18.75M2.75 9.75V14.25C2.75 16.5 6.5 18.75 12.5 18.75M18.5 13.3218V17.8218M6.5 13.3218V17.8218"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div style={{ height: "4px", width: "4px" }}></div>
            <label>Staking</label>
          </div>
        </Link>
      )}

      {ActivePage != "rank" && (
        <Link href={"/dashboard/?s=rank"} style={{ textDecoration: "none" }}>
          <div className={style.item}>
            <svg
              style={{
                minHeight: "24px",
                maxHeight: "24px",
                height: "24px",
                width: "25px",
                minWidth: "25px",
                maxWidth: "25px",
              }}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.83179 21H15.8318M12.8318 17.25V21M19.413 12H20.3317C21.1274 12 21.8904 11.6839 22.453 11.1213C23.0156 10.5587 23.3317 9.79565 23.3317 9V7.5C23.3317 7.30109 23.2527 7.11032 23.112 6.96967C22.9714 6.82902 22.7806 6.75 22.5817 6.75H19.5817M6.26914 12H5.32227C4.52662 12 3.76355 11.6839 3.20095 11.1213C2.63834 10.5587 2.32227 9.79565 2.32227 9V7.5C2.32227 7.30109 2.40128 7.11032 2.54194 6.96967C2.68259 6.82902 2.87335 6.75 3.07227 6.75H6.07227M6.08179 5.25V10.4156C6.08179 14.1375 9.06304 17.2219 12.7849 17.25C13.6753 17.2562 14.5581 17.0862 15.3824 16.7497C16.2068 16.4133 16.9564 15.917 17.5882 15.2896C18.22 14.6622 18.7214 13.916 19.0635 13.094C19.4057 12.272 19.5818 11.3904 19.5818 10.5V5.25C19.5818 5.05109 19.5028 4.86032 19.3621 4.71967C19.2215 4.57902 19.0307 4.5 18.8318 4.5H6.83179C6.63287 4.5 6.44211 4.57902 6.30146 4.71967C6.1608 4.86032 6.08179 5.05109 6.08179 5.25Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div style={{ height: "4px", width: "4px" }}></div>
            <label>Ranking</label>
          </div>
        </Link>
      )}
    </div>
  );
};
const DesktopMenu = ({ ActivePage, menuData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexStake, setCurrentIndexStake] = useState(0);
  const [currentIndexRank, setCurrentIndexRank] = useState(0);
  // const [currentIndexPort, setCurrentIndexPort] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);
    const interval0 = setInterval(() => {
      setCurrentIndexStake((prevIndex) => (prevIndex + 1) % 3);
    }, 3200);
    const interval1 = setInterval(() => {
      setCurrentIndexRank((prevIndex) => (prevIndex + 1) % 4);
    }, 3400);
    // const interval2 = setInterval(() => {
    //   setCurrentIndexPort((prevIndex) => (prevIndex + 1) % 4);
    // }, 3600);
    return () => {
      clearInterval(interval);
      clearInterval(interval0);
      clearInterval(interval1);
      // clearInterval(interval2);
    };
  }, []);
  return (
    <div className={style.MenuCards}>
      {/* Refer */}
      {ActivePage != "refer" && (
        <Link
          href={"/dashboard/?s=refer"}
          style={{ textDecoration: "none" }}
          className={style.card}
        >
          <div className={style.titleBar}>
            <svg
              style={{
                minWidth: "24px",
                minHeight: "24px",
                maxWidth: "24px",
                maxHeight: "24px",
                width: "24px",
                height: "24px",
                marginRight: "4px",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
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
            <label className={mainStyle.title_semibold_20}>Refer & Earn</label>
          </div>

          <label
            className={`${mainStyle.body_regular_14}`}
            style={{ color: "#bebebe" }}
          >
            Invite your friends via
          </label>
          <div className={style.slideshowContainer}>
            <div
              className={` ${style.item} ${
                0 === currentIndex
                  ? style.slideAnimation
                  : 0 === currentIndex - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  minHeight: "24px",
                  minWidth: "24px",
                  marginRight: "12px",
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.4791 3.53087C19.5521 2.60383 18.298 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997"
                  stroke="#5BF4AB"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.0002 11.0012C13.5707 10.4271 13.0228 9.95202 12.3936 9.60826C11.7645 9.2645 11.0687 9.06009 10.3535 9.00887C9.63841 8.95765 8.92061 9.06083 8.24885 9.31142C7.5771 9.56201 6.96709 9.95413 6.4602 10.4612L3.4602 13.4612C2.54941 14.4042 2.04544 15.6672 2.05683 16.9782C2.06822 18.2892 2.59407 19.5433 3.52111 20.4703C4.44815 21.3973 5.70221 21.9232 7.01319 21.9346C8.32418 21.946 9.58719 21.442 10.5302 20.5312L12.2402 18.8212"
                  stroke="#5BF4AB"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={mainStyle.title_medium_20}>Referal link</label>
            </div>
            <div
              className={` ${style.item} ${
                1 === currentIndex
                  ? style.slideAnimation
                  : 1 === currentIndex - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  minHeight: "24px",
                  minWidth: "24px",
                  marginRight: "12px",
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#5BF4AB"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#5BF4AB"
                  stroke-width="2"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <label className={mainStyle.title_medium_20}>Email invite</label>
            </div>
            <div
              className={` ${style.item} ${
                2 === currentIndex
                  ? style.slideAnimation
                  : -1 === currentIndex - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  minHeight: "24px",
                  minWidth: "24px",
                  marginRight: "12px",
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10.8235V2H10.8235V10.8235H2ZM3.76468 9.05884H9.05884V3.76468H3.76468V9.05884ZM2 22V13.1765H10.8235V22H2ZM3.76468 20.2353H9.05884V14.9412H3.76468V20.2353ZM13.1765 10.8235V2H22V10.8235H13.1765ZM14.9412 9.05884H20.2353V3.76468H14.9412V9.05884ZM19.7941 22V19.7941H22V22H19.7941ZM13.1765 15.3824V13.1765H15.3824V15.3824H13.1765ZM15.3824 17.5882V15.3824H17.5882V17.5882H15.3824ZM13.1765 19.7941V17.5882H15.3824V19.7941H13.1765ZM15.3824 22V19.7941H17.5882V22H15.3824ZM17.5882 19.7941V17.5882H19.7941V19.7941H17.5882ZM17.5882 15.3824V13.1765H19.7941V15.3824H17.5882ZM19.7941 17.5882V15.3824H22V17.5882H19.7941Z"
                  fill="#5BF4AB"
                />
                <path
                  d="M48.41 19.2C48.53 19.32 48.59 19.45 48.59 19.59C48.59 19.73 48.52 19.8633 48.38 19.99C48.12 20.2433 47.8533 20.24 47.58 19.98L44.65 16.93C44.53 16.8033 44.47 16.67 44.47 16.53C44.47 16.39 44.5333 16.26 44.66 16.14C44.9267 15.88 45.1967 15.8833 45.47 16.15L48.41 19.2ZM41.87 19C40.3967 19 39.3167 18.6567 38.63 17.97C37.9433 17.2833 37.6 16.2033 37.6 14.73V10.15C37.6 8.66333 37.9433 7.58 38.63 6.9C39.3233 6.21333 40.4 5.87667 41.86 5.89H44.27C45.75 5.89 46.83 6.23333 47.51 6.92C48.1967 7.6 48.54 8.68 48.54 10.16V14.73C48.54 16.2033 48.1967 17.2833 47.51 17.97C46.83 18.6567 45.75 19 44.27 19H41.87ZM41.87 17.74H44.27C45.0233 17.74 45.6167 17.6467 46.05 17.46C46.49 17.2667 46.8033 16.95 46.99 16.51C47.1833 16.07 47.28 15.4767 47.28 14.73V10.16C47.28 9.41333 47.1833 8.82 46.99 8.38C46.8033 7.94 46.49 7.62667 46.05 7.44C45.6167 7.24667 45.0233 7.15 44.27 7.15H41.86C41.1133 7.14333 40.52 7.23333 40.08 7.42C39.6467 7.60667 39.3333 7.92 39.14 8.36C38.9533 8.8 38.86 9.39667 38.86 10.15V14.73C38.86 15.4767 38.9533 16.07 39.14 16.51C39.3333 16.95 39.65 17.2667 40.09 17.46C40.53 17.6467 41.1233 17.74 41.87 17.74ZM60.8592 19.03C60.6926 19.13 60.5326 19.16 60.3792 19.12C60.2326 19.0867 60.1059 18.99 59.9992 18.83L56.7792 13.63H53.3992V18.37C53.3992 18.79 53.1892 19 52.7692 19C52.3492 19 52.1392 18.79 52.1392 18.37V6.52C52.1392 6.1 52.3492 5.89 52.7692 5.89H57.4492C58.6159 5.89 59.5026 6.19333 60.1092 6.8C60.7159 7.40667 61.0192 8.29333 61.0192 9.46V10.06C61.0192 11.08 60.7826 11.8867 60.3092 12.48C59.8426 13.0733 59.1526 13.4367 58.2392 13.57L61.0792 18.17C61.2859 18.5233 61.2126 18.81 60.8592 19.03ZM53.3992 12.37H57.4492C58.2692 12.37 58.8592 12.19 59.2192 11.83C59.5792 11.4633 59.7592 10.8733 59.7592 10.06V9.46C59.7592 8.64667 59.5792 8.06 59.2192 7.7C58.8592 7.33333 58.2692 7.15 57.4492 7.15H53.3992V12.37ZM71.8288 18.99C71.0021 18.99 70.3621 18.8167 69.9088 18.47C69.4554 18.1167 69.1754 17.5833 69.0688 16.87C69.0421 16.6567 69.0854 16.4933 69.1988 16.38C69.3188 16.26 69.4821 16.2 69.6888 16.2C69.8954 16.2 70.0454 16.2533 70.1388 16.36C70.2388 16.46 70.3088 16.6133 70.3488 16.82C70.4154 17.16 70.5621 17.3967 70.7888 17.53C71.0154 17.6633 71.3621 17.73 71.8288 17.73H75.1088C75.7021 17.73 76.1054 17.6233 76.3188 17.41C76.5321 17.1967 76.6388 16.7933 76.6388 16.2C76.6388 15.6067 76.5321 15.2033 76.3188 14.99C76.1054 14.7767 75.7021 14.67 75.1088 14.67H71.8788C70.9788 14.67 70.3054 14.45 69.8588 14.01C69.4188 13.57 69.1988 12.9 69.1988 12C69.1988 11.08 69.4188 10.4033 69.8588 9.97C70.2988 9.53 70.9721 9.31 71.8788 9.31H75.0088C76.5421 9.31 77.4088 9.97333 77.6088 11.3C77.6488 11.5067 77.6088 11.67 77.4888 11.79C77.3754 11.9033 77.2121 11.96 76.9988 11.96C76.7988 11.96 76.6488 11.91 76.5488 11.81C76.4554 11.7033 76.3854 11.5533 76.3388 11.36C76.2788 11.06 76.1488 10.8533 75.9488 10.74C75.7488 10.6267 75.4354 10.57 75.0088 10.57H71.8788C71.3254 10.57 70.9488 10.6667 70.7488 10.86C70.5554 11.0533 70.4588 11.4333 70.4588 12C70.4588 12.54 70.5588 12.91 70.7588 13.11C70.9588 13.31 71.3321 13.41 71.8788 13.41H75.1088C76.0554 13.41 76.7554 13.64 77.2088 14.1C77.6688 14.5533 77.8988 15.2533 77.8988 16.2C77.8988 17.1467 77.6688 17.85 77.2088 18.31C76.7554 18.7633 76.0554 18.99 75.1088 18.99H71.8288ZM84.5522 19C83.2789 19 82.3422 18.7 81.7422 18.1C81.1422 17.5 80.8422 16.5633 80.8422 15.29V13.01C80.8422 11.73 81.1389 10.7933 81.7322 10.2C82.3322 9.6 83.2722 9.30667 84.5522 9.32H86.1922C87.1789 9.32 87.9389 9.48667 88.4722 9.82C89.0055 10.1467 89.3322 10.6633 89.4522 11.37C89.4922 11.5767 89.4522 11.74 89.3322 11.86C89.2189 11.9733 89.0522 12.03 88.8322 12.03C88.6389 12.03 88.4955 11.98 88.4022 11.88C88.3089 11.7733 88.2322 11.63 88.1722 11.45C88.0922 11.13 87.8989 10.9067 87.5922 10.78C87.2922 10.6467 86.8255 10.58 86.1922 10.58H84.5522C83.6322 10.5667 82.9922 10.7367 82.6322 11.09C82.2789 11.4367 82.1022 12.0767 82.1022 13.01V15.29C82.1022 16.21 82.2789 16.85 82.6322 17.21C82.9922 17.5633 83.6322 17.74 84.5522 17.74H86.1922C86.8255 17.74 87.2922 17.6767 87.5922 17.55C87.8989 17.4167 88.0922 17.19 88.1722 16.87C88.2322 16.6767 88.3089 16.5333 88.4022 16.44C88.5022 16.34 88.6489 16.29 88.8422 16.29C89.0555 16.29 89.2189 16.3467 89.3322 16.46C89.4522 16.5733 89.4922 16.7367 89.4522 16.95C89.3322 17.6433 89.0055 18.16 88.4722 18.5C87.9389 18.8333 87.1789 19 86.1922 19H84.5522ZM95.3227 19C94.2627 19 93.4793 18.7467 92.9727 18.24C92.466 17.7333 92.2127 16.95 92.2127 15.89C92.2127 14.8233 92.466 14.0367 92.9727 13.53C93.4793 13.0233 94.2627 12.77 95.3227 12.77H99.7727C99.746 11.95 99.5493 11.38 99.1827 11.06C98.8227 10.74 98.2027 10.58 97.3227 10.58H96.1627C95.376 10.58 94.796 10.6567 94.4227 10.81C94.056 10.9567 93.8193 11.2133 93.7127 11.58C93.646 11.78 93.5627 11.9267 93.4627 12.02C93.3693 12.1067 93.226 12.15 93.0327 12.15C92.826 12.15 92.6627 12.0933 92.5427 11.98C92.4293 11.86 92.3893 11.7 92.4227 11.5C92.5493 10.74 92.9193 10.1867 93.5327 9.84C94.146 9.49333 95.0227 9.32 96.1627 9.32H97.3227C98.6027 9.32 99.5393 9.62 100.133 10.22C100.733 10.8133 101.033 11.75 101.033 13.03V18.37C101.033 18.79 100.823 19 100.403 19C99.9827 19 99.7727 18.79 99.7727 18.37V17.55C99.1127 18.5167 98.0027 19 96.4427 19H95.3227ZM95.3227 17.74H96.4427C97.0427 17.74 97.576 17.6767 98.0427 17.55C98.516 17.4233 98.9027 17.2133 99.2027 16.92C99.5093 16.6267 99.6993 16.23 99.7727 15.73V14.03H95.3227C94.6093 14.03 94.1227 14.16 93.8627 14.42C93.6027 14.68 93.4727 15.17 93.4727 15.89C93.4727 16.6033 93.6027 17.09 93.8627 17.35C94.1227 17.61 94.6093 17.74 95.3227 17.74ZM105.347 19C104.927 19 104.717 18.79 104.717 18.37V9.95C104.717 9.53 104.927 9.32 105.347 9.32C105.767 9.32 105.977 9.53 105.977 9.95V10.69C106.637 9.77667 107.747 9.32 109.307 9.32H109.867C111.147 9.32 112.084 9.62 112.677 10.22C113.277 10.8133 113.577 11.75 113.577 13.03V18.37C113.577 18.79 113.367 19 112.947 19C112.527 19 112.317 18.79 112.317 18.37V13.03C112.317 12.1033 112.137 11.4633 111.777 11.11C111.424 10.7567 110.787 10.58 109.867 10.58H109.307C108.354 10.58 107.581 10.72 106.987 11C106.394 11.28 106.057 11.7167 105.977 12.31V18.37C105.977 18.79 105.767 19 105.347 19Z"
                  fill="white"
                />
              </svg>

              <label className={mainStyle.title_medium_20}>QR scan</label>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              cursor: "pointer",
            }}
          >
            <ExpandIcon />
          </div>
        </Link>
      )}

      {/* Staking */}
      {ActivePage != "stake" && (
        <Link
          href={"/dashboard/?s=stake"}
          style={{ textDecoration: "none" }}
          className={style.card}
        >
          <div className={style.titleBar}>
            <svg
              style={{
                minWidth: "24px",
                minHeight: "24px",
                maxWidth: "24px",
                maxHeight: "24px",
                width: "24px",
                height: "24px",
                marginRight: "4px",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.75 9.75C21.75 12.2353 17.3848 14.25 12 14.25M21.75 9.75C21.75 7.26472 17.3848 5.25 12 5.25C6.61522 5.25 2.25 7.26472 2.25 9.75M21.75 9.75V14.25C21.75 16.5 18 18.75 12 18.75M12 14.25C6.61522 14.25 2.25 12.2353 2.25 9.75M12 14.25V18.75M2.25 9.75V14.25C2.25 16.5 6 18.75 12 18.75M18 13.3218V17.8218M6 13.3218V17.8218"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <label className={mainStyle.title_semibold_20}>Staking pools</label>
          </div>

          <div className={style.titleslideshowContainer}>
            <label
              className={`${mainStyle.body_regular_14} ${
                0 === currentIndexStake ? style.slideAnimation : ""
              }`}
            >
              Total Balance staked
            </label>
            <label
              className={`${mainStyle.body_regular_14} ${
                1 === currentIndexStake ? style.slideAnimation : ""
              }`}
            >
              Available PTT to stake
            </label>
            <label
              className={`${mainStyle.body_regular_14} ${
                2 === currentIndexStake ? style.slideAnimation : ""
              }`}
            >
              Pending Rewards
            </label>
          </div>
          <div className={style.slideshowContainer}>
            <div
              className={` ${style.item} ${
                0 === currentIndexStake
                  ? style.slideAnimation
                  : 0 === currentIndexStake - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                <label style={{ color: "#5BF4AB" }}>€</label>{" "}
                {menuData.stake.TotalBalanceStaked}
              </label>
            </div>
            <div
              className={` ${style.item} ${
                1 === currentIndexStake
                  ? style.slideAnimation
                  : 1 === currentIndexStake - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                {menuData.stake.AvailablePttToStake}{" "}
                <label style={{ color: "#5BF4AB" }}>PTT</label>
              </label>
            </div>
            <div
              className={` ${style.item} ${
                2 === currentIndexStake
                  ? style.slideAnimation
                  : -1 === currentIndexStake - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                {menuData.stake.PendingRewards}{" "}
                <label style={{ color: "#5BF4AB" }}>PTT</label>
              </label>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              cursor: "pointer",
            }}
          >
            <ExpandIcon />
          </div>
        </Link>
      )}

      {/* Ranking */}
      {ActivePage != "rank" && (
        <Link
          href={"/dashboard/?s=rank"}
          style={{ textDecoration: "none" }}
          className={style.card}
        >
          <div className={style.titleBar}>
            <svg
              style={{
                minWidth: "24px",
                minHeight: "24px",
                maxWidth: "24px",
                maxHeight: "24px",
                width: "24px",
                height: "24px",
                marginRight: "7px",
              }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99976 21H14.9998M11.9998 17.25V21M18.5809 12H19.4997C20.2953 12 21.0584 11.6839 21.621 11.1213C22.1836 10.5587 22.4997 9.79565 22.4997 9V7.5C22.4997 7.30109 22.4207 7.11032 22.28 6.96967C22.1394 6.82902 21.9486 6.75 21.7497 6.75H18.7497M5.43711 12H4.49023C3.69458 12 2.93152 11.6839 2.36891 11.1213C1.8063 10.5587 1.49023 9.79565 1.49023 9V7.5C1.49023 7.30109 1.56925 7.11032 1.7099 6.96967C1.85056 6.82902 2.04132 6.75 2.24023 6.75H5.24023M5.24976 5.25V10.4156C5.24976 14.1375 8.23101 17.2219 11.9529 17.25C12.8432 17.2562 13.726 17.0862 14.5504 16.7497C15.3748 16.4133 16.1244 15.917 16.7562 15.2896C17.388 14.6622 17.8893 13.916 18.2315 13.094C18.5736 12.272 18.7498 11.3904 18.7498 10.5V5.25C18.7498 5.05109 18.6707 4.86032 18.5301 4.71967C18.3894 4.57902 18.1987 4.5 17.9998 4.5H5.99976C5.80084 4.5 5.61008 4.57902 5.46943 4.71967C5.32877 4.86032 5.24976 5.05109 5.24976 5.25Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <label className={mainStyle.title_semibold_20}>Ranking</label>
          </div>

          <div className={style.titleslideshowContainer}>
            <label
              className={`${mainStyle.body_regular_14} ${
                0 === currentIndexRank ? style.slideAnimation : ""
              }`}
            >
              Whales Ranking
            </label>
            <label
              className={`${mainStyle.body_regular_14} ${
                1 === currentIndexRank ? style.slideAnimation : ""
              }`}
            >
              Affiliate Ranking
            </label>
            <label
              className={`${mainStyle.body_regular_14} ${
                2 === currentIndexRank ? style.slideAnimation : ""
              }`}
            >
              XP Ranking
            </label>
            <label
              className={`${mainStyle.body_regular_14} ${
                3 === currentIndexRank ? style.slideAnimation : ""
              }`}
            >
              Quiz Master
            </label>
          </div>
          <div className={style.slideshowContainer}>
            <div
              className={` ${style.item} ${
                0 === currentIndexRank
                  ? style.slideAnimation
                  : 0 === currentIndexRank - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                <label style={{ color: "#5BF4AB" }}>#</label>
                {menuData.ranking.whales}
              </label>
            </div>
            <div
              className={` ${style.item} ${
                1 === currentIndexRank
                  ? style.slideAnimation
                  : 1 === currentIndexRank - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                <label style={{ color: "#5BF4AB" }}>#</label>
                {menuData.ranking.affiliate}
              </label>
            </div>
            <div
              className={` ${style.item} ${
                2 === currentIndexRank
                  ? style.slideAnimation
                  : 2 === currentIndexRank - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                <label style={{ color: "#5BF4AB" }}>#</label>
                {menuData.ranking.xp}
              </label>
            </div>
            <div
              className={` ${style.item} ${
                3 === currentIndexRank
                  ? style.slideAnimation
                  : -1 === currentIndexRank - 1
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              <label className={mainStyle.title_semibold_24}>
                <label style={{ color: "#5BF4AB" }}>#</label>
                {menuData.ranking.quizMaster}
              </label>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              cursor: "pointer",
            }}
          >
            <ExpandIcon />
          </div>
        </Link>
      )}

      {/* portfolio */}
      {ActivePage != "portfolio" && (
        <Link
          href={"/dashboard/?s=portfolio"}
          style={{ textDecoration: "none" }}
          className={style.card}
        >
          <div className={style.titleBar}>
            <svg
              style={{
                minWidth: "24px",
                minHeight: "24px",
                maxWidth: "24px",
                maxHeight: "24px",
                width: "24px",
                height: "24px",
                marginRight: "7px",
              }}
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

            <label className={mainStyle.title_semibold_20}>Portfolio</label>
          </div>

          <label
            className={`${mainStyle.body_regular_14}`}
            style={{ color: "#bebebe" }}
          >
            Total Portfolio Value
          </label>

          <div className={style.slideshowContainer}>
            <label className={mainStyle.title_semibold_24}>
              <label style={{ color: "#5BF4AB" }}>€</label>{" "}
              {(menuData.TotalPortfolioValue * 0.1).toFixed(2)}
            </label>
          </div>
          <div
            style={{
              position: "absolute",
              right: "16px",
              bottom: "16px",
              cursor: "pointer",
            }}
          >
            <ExpandIcon />
          </div>
        </Link>
      )}
    </div>
  );
};

const ExpandIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 3H21V9"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 21H3V15"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3L14 10"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21L10 14"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

{
  /*<div className={style.titleslideshowContainer}>
           {labels.map((label, index) => (
            <label
              key={index}
              className={`${mainStyle.body_regular_14} ${
                index === currentIndex ? style.slideAnimation : ""
              }`}
            >
              {label}
            </label>
          ))} 
        </div>*/
}
{
  /* {labels.map((label, index) => (
            <label
              key={index}
              className={`${mainStyle.title_semibold_24} ${
                index === currentIndex
                  ? style.slideAnimation
                  : index === currentIndex - 1 ||
                    (currentIndex == 0 && index == 4)
                  ? style.slideOutAnimation
                  : ""
              }`}
            >
              {label}
            </label>
          ))} */
}
