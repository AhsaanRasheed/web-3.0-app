"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import style from "./Mobile.module.scss";
import Link from "next/link";
import Image from "next/image";
import { get_quiz_limit } from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";

export default function ArticleMobileView({
  news,
  quizId,
  likeToggle,
  setShowQuizModal,
  //   isScrolledToBottom,
}) {
  const paragraphRef = useRef();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const handleScroll = () => {
    const paragraph = paragraphRef.current;
    if (paragraph && !isScrolledToBottom) {
      const isAtBottom =
        paragraph.scrollTop + paragraph.clientHeight >=
        paragraph.scrollHeight - 5;

      setIsScrolledToBottom(isAtBottom);
    }
  };
  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    const checkScroll = () => {
      if (paragraph) {
        if (paragraph.scrollHeight > paragraph.clientHeight) {
          setIsScrolledToBottom(false);
        } else {
          if (!isScrolledToBottom) setIsScrolledToBottom(true);
        }
      }
    };
    checkScroll();
  }, [news]);
  return (
    <div className={style.container} ref={paragraphRef} onScroll={handleScroll}>
      <div className={style.mainCard}>
        <div className={style.articleContainer}>
          <div>
            <label
              style={{
                fontFamily: "var(--Gilroy)",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "14px",
                letterSpacing: "0em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              {news.category}
              {/* Crypto News */}
            </label>
          </div>
          <div style={{ marginTop: "8px" }}>
            <label
              style={{
                fontFamily: "var(--Gilroy)",
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "22px",
                letterSpacing: "1.3px",
                color: "#fff",
              }}
            >
              {news.title}
            </label>
          </div>
          <div className={style.infoContainer}>
            <label
              style={{
                color: "#BEBEBE",
                fontSize: "12px",
                fontFamily: "var(--Gilroy)",
                fontWeight: "400",
                wordWrap: "break-word",
                lineHeight: "18px",
              }}
            >
              <label style={{ color: "#fff" }}>
                {timeCalculator(news.released_at)}
              </label>{" "}
              ago{" "}
            </label>
            <div className={style.dot}></div>
            <div className={style.withicon}>
              <ViewIcon />

              <label
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "var(--Gilroy)",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  lineHeight: "18px",
                }}
              >
                {news.view_count}
              </label>
            </div>
            <div className={style.dot}></div>
            <div
              className={style.withicon}
              onClick={() => {
                likeToggle();
              }}
            >
              {news.liked && news.like_count > 0 ? (
                <LikeFilledIcon />
              ) : (
                <LikeIcon />
              )}
              <label
                style={{
                  color: "#fff",
                  fontSize: "12px",
                  fontFamily: "var(--Gilroy)",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  lineHeight: "18px",
                }}
              >
                {news.like_count}
              </label>{" "}
            </div>
            <div className={style.dot}></div>
            <div className={style.withicon}>
              <label
                style={{
                  color: "#BEBEBE",
                  fontSize: "12px",
                  fontFamily: "var(--Gilroy)",
                  fontWeight: "400",
                  wordWrap: "break-word",
                  lineHeight: "18px",
                }}
              >
                {" "}
                <label style={{ color: "#fff" }}>
                  {news.quiz_attempt_count}
                </label>{" "}
                quizzed
              </label>{" "}
              {/* <QuizIcon /> */}
            </div>
            <div className={style.dot}></div>
            <label
              style={{
                color: "#BEBEBE",
                fontSize: "12px",
                fontFamily: "var(--Gilroy)",
                fontWeight: "400",
                wordWrap: "break-word",
                lineHeight: "18px",
              }}
            >
              <label style={{ color: "#fff" }}>
                {formatTime(news.read_time)}{" "}
              </label>
              read
            </label>
          </div>

          <div className={style.img}>
            {/* <Image
              src={
                news.image_url == ""
                  ? "https://ai-news-images.s3.eu-west-3.amazonaws.com/pt_news_placeholder_img.png"
                  : news.image_url
              }
              alt="news_image"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: "15px" }}
            /> */}
            <img
              src={
                news.image_url === "" || news.image_url == null
                  ? "https://ai-news-images.s3.eu-west-3.amazonaws.com/pt_news_placeholder_img.png"
                  : news.image_url
              }
              alt="news_image"
            />
          </div>
          <div style={{ margin: "16px 0", textAlign: "center" }}>
            <label
              style={{
                fontFamily: "var(--Gilroy)",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
                letterSpacing: "0.06em",
                textAlign: "center",
                color: "#fff",
              }}
            >
              {news.abstract}{" "}
            </label>
          </div>
          {/* {news.sources.length > 0 && (
            <div className={style.readmore}>
              <Link
                href={news.abstract_source_url}
                target="_blank"
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <div className={`${style.nav}`}>
                  <label
                    style={{
                      fontFamily: "Jura",
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "17px",
                      letterSpacing: "0.06em",
                      textAlign: "left",
                    }}
                  >
                    Source
                  </label>
                  <div className={style.bar}></div>
                </div>
              </Link>
            </div>
          )} */}
          {news.sources.length > 0 && (
            <Link
              href={news.abstract_source_url}
              target="_blank"
              style={{
                textDecoration: "none",
                cursor: "pointer",
              }}
              className={style.readmoreNew}
            >
              <label className={style.lbl}>
                Read more: <br /> <span>{news.abstract_source_url}</span>
              </label>
            </Link>
          )}
          <div className={style.options}>
            {news.liked && news.like_count > 0 ? (
              <div
                className={style.withicon}
                onClick={() => {
                  likeToggle();
                }}
              >
                <LikeFilledIcon />

                <label className="txt_Caption">Unlike</label>
              </div>
            ) : (
              <div
                className={style.withicon}
                onClick={() => {
                  likeToggle();
                }}
              >
                <LikeIcon />

                <label className="txt_Caption">Like</label>
              </div>
            )}

            <div className={style.divider}>
              <p></p>
            </div>

            <div className={style.withicon} style={{ cursor: "not-allowed" }}>
              <ShareIcon />

              <label className="txt_Caption" style={{ cursor: "not-allowed" }}>
                Share
              </label>
            </div>
          </div>
        </div>
      </div>
      {news?.quiz_attempted && (
        <QuizResultBanner
          earned_ptv={news.earned_ptv}
          earned_xp={news.earned_xp}
          quiz_answer_correct={news.quiz_answer_correct}
        />
      )}
      {quizId != null && !news?.quiz_attempted && (
        <QuizBanner
          isScrolledToBottom={isScrolledToBottom}
          setShowQuizModal={setShowQuizModal}
        />
      )}
    </div>
  );
}

const QuizBanner = ({ isScrolledToBottom, setShowQuizModal }) => {
  const { addNotification } = useNotification();
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  return (
    <div className={style.quizBanner}>
      {isScrolledToBottom ? (
        <button
          className={` ${style.button} ${style.button_active}`}
          onClick={() => {
            if (isScrolledToBottom) {
              // get_quiz_limit().then((res) => {
              //   if (res.data.attempted >= res.data.limit) {
              //     handleAddNotification("fail", "Daily quiz limit reached.");
              //   } else {
              setShowQuizModal(true);
              //   }
              // });
            }
          }}
        >
          <span>Start quiz</span>
        </button>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <label
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "var(--GilroySemiBold)",
              // fontWeight: "600",
              wordWrap: "break-word",
              marginRight: "8px",
            }}
          >
            Read & take the quiz to earn 100{" "}
            <label className={style.PttLbl}>PTV</label>
          </label>
          <InfoIcon />
        </div>
      )}
    </div>
  );
};
const QuizResultBanner = ({ earned_ptv, earned_xp, quiz_answer_correct }) => {
  return (
    <div className={style.quizBanner}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label
          style={{
            color: "white",
            fontSize: "14px",
            fontFamily: "var(--GilroySemiBold)",
            // fontWeight: "600",
            wordWrap: "break-word",
            marginRight: "8px",
          }}
        >
          You earned {earned_ptv}{" "}
          <label className={style.PttLbl}>
            {/* {earned_ptv} */}
            PTV
          </label>{" "}
          in this quiz
        </label>
        <InfoIcon />
      </div>
    </div>
  );
};

const ViewIcon = () => {
  return (
    <div
      style={{
        width: "17px",
        height: "17px",
        maxHeight: "17px",
        maxWidth: "17px",
        minWidth: "17px",
        minHeight: "17px",
        marginRight: "4px",
      }}
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
          stroke="#0F0F0F"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.45307 9.77556C0.909543 9.0034 0.909543 7.99921 1.45307 7.22705C2.56358 5.64938 4.8162 3.16797 7.99935 3.16797C11.1825 3.16797 13.4351 5.64938 14.5456 7.22705C15.0892 7.99921 15.0892 9.0034 14.5456 9.77556C13.4351 11.3532 11.1825 13.8346 7.99935 13.8346C4.8162 13.8346 2.56358 11.3532 1.45307 9.77556Z"
          fill="white"
        />
        <path
          d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
          fill="white"
        />
        <path
          d="M8 11C9.38071 11 10.5 9.88071 10.5 8.5C10.5 7.11929 9.38071 6 8 6C6.61929 6 5.5 7.11929 5.5 8.5C5.5 9.88071 6.61929 11 8 11Z"
          stroke="#232F40"
          stroke-opacity="0.85"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const LikeIcon = () => {
  return (
    <div
      style={{
        width: "17px",
        height: "17px",
        maxHeight: "17px",
        maxWidth: "17px",
        minWidth: "17px",
        minHeight: "17px",
        marginRight: "4px",
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3941 3.57455C14.0536 3.23389 13.6493 2.96365 13.2043 2.77927C12.7593 2.5949 12.2824 2.5 11.8007 2.5C11.3191 2.5 10.8421 2.5949 10.3972 2.77927C9.95219 2.96365 9.5479 3.23389 9.2074 3.57455C8.81712 3.96483 8.18434 3.96483 7.79406 3.57455C7.10627 2.88676 6.17342 2.50036 5.20073 2.50036C4.22804 2.50036 3.29519 2.88676 2.6074 3.57455C1.9196 4.26235 1.5332 5.19519 1.5332 6.16788C1.5332 7.14057 1.9196 8.07342 2.6074 8.76122L3.31406 9.46788L7.79362 13.9474C8.18415 14.338 8.81731 14.338 9.20784 13.9474L13.6874 9.46788L14.3941 8.76122C14.7347 8.42071 15.005 8.01643 15.1893 7.57145C15.3737 7.12648 15.4686 6.64954 15.4686 6.16788C15.4686 5.68622 15.3737 5.20929 15.1893 4.76431C15.005 4.31934 14.7347 3.91505 14.3941 3.57455Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
const LikeFilledIcon = () => {
  return (
    <div
      style={{
        width: "17px",
        height: "17px",
        maxHeight: "17px",
        maxWidth: "17px",
        minWidth: "17px",
        minHeight: "17px",
        marginRight: "4px",
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3941 3.57455C14.0536 3.23389 13.6493 2.96365 13.2043 2.77927C12.7593 2.5949 12.2824 2.5 11.8007 2.5C11.3191 2.5 10.8421 2.5949 10.3972 2.77927C9.95219 2.96365 9.5479 3.23389 9.2074 3.57455C8.81712 3.96483 8.18434 3.96483 7.79406 3.57455C7.10627 2.88676 6.17342 2.50036 5.20073 2.50036C4.22804 2.50036 3.29519 2.88676 2.6074 3.57455C1.9196 4.26235 1.5332 5.19519 1.5332 6.16788C1.5332 7.14057 1.9196 8.07342 2.6074 8.76122L3.31406 9.46788L7.79362 13.9474C8.18415 14.338 8.81731 14.338 9.20784 13.9474L13.6874 9.46788L14.3941 8.76122C14.7347 8.42071 15.005 8.01643 15.1893 7.57145C15.3737 7.12648 15.4686 6.64954 15.4686 6.16788C15.4686 5.68622 15.3737 5.20929 15.1893 4.76431C15.005 4.31934 14.7347 3.91505 14.3941 3.57455Z"
          fill="#ff5e5e"
        />
      </svg>
    </div>
  );
};
// background: linear-gradient(90deg, #A0F7FF 0.25%, rgba(160, 247, 255, 0) 0.26%);
// background: linear-gradient(90deg, #A0F7FF 98.99%, rgba(160, 247, 255, 0) 99%);

const ShareIcon = () => {
  return (
    <div
      style={{
        width: "17px",
        height: "17px",
        maxHeight: "17px",
        maxWidth: "17px",
        minWidth: "17px",
        minHeight: "17px",
        marginRight: "4px",
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 5.83203C13.6046 5.83203 14.5 4.9366 14.5 3.83203C14.5 2.72746 13.6046 1.83203 12.5 1.83203C11.3954 1.83203 10.5 2.72746 10.5 3.83203C10.5 4.9366 11.3954 5.83203 12.5 5.83203Z"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.5 10.5C5.60457 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 5.60457 6.5 4.5 6.5C3.39543 6.5 2.5 7.39543 2.5 8.5C2.5 9.60457 3.39543 10.5 4.5 10.5Z"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 15.168C13.6046 15.168 14.5 14.2725 14.5 13.168C14.5 12.0634 13.6046 11.168 12.5 11.168C11.3954 11.168 10.5 12.0634 10.5 13.168C10.5 14.2725 11.3954 15.168 12.5 15.168Z"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.22656 9.50586L10.7799 12.1592"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.7732 4.83984L6.22656 7.49318"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const InfoIcon = () => {
  return (
    <div
      style={{
        width: "16px",
        height: "16px",
        maxHeight: "16px",
        maxWidth: "16px",
        minWidth: "16px",
        minHeight: "16px",
        marginRight: "4px",
      }}
    >
      <svg
        width="17"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.4987 14.6654C12.1806 14.6654 15.1654 11.6806 15.1654 7.9987C15.1654 4.3168 12.1806 1.33203 8.4987 1.33203C4.8168 1.33203 1.83203 4.3168 1.83203 7.9987C1.83203 11.6806 4.8168 14.6654 8.4987 14.6654Z"
          stroke="white"
          stroke-opacity="0.5"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 10.6667V8"
          stroke="white"
          stroke-opacity="0.5"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 5.33203H8.50667"
          stroke="white"
          stroke-opacity="0.5"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

function timeCalculator(given) {
  const givenDate = new Date(given);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - givenDate;

  // Convert milliseconds to minutes, hours, and days
  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  if (minutesAgo < 60) {
    return `${minutesAgo}m`;
  }

  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  if (hoursAgo < 24) {
    return `${hoursAgo}h`;
  }
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return `${daysAgo}d`;
}

function formatTime(seconds) {
  if (seconds === 0) {
    return "0s";
  }

  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + "h ";
  }
  if (minutes > 0) {
    formattedTime += minutes + "m ";
  }
  if (remainingSeconds > 0) {
    formattedTime += remainingSeconds + "s";
  }

  return formattedTime.trim();
}
