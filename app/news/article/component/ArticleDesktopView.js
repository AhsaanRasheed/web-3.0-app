"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import style from "./Desktop.module.scss";
import Link from "next/link";
import Image from "next/image";
import { get_quiz_limit } from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
let audio = null;
export default function ArticleDesktopView({
  news,
  quizId,
  likeToggle,
  setShowQuizModal,
  //   isScrolledToBottom,
  //   paragraphRef,
  //   handleScroll,
}) {
  const { addNotification } = useNotification();
  const paragraphRef = useRef();
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(1);
  const [audioPlay, setAudioPlay] = useState(false);
  const [scrollInitHeight, setScrollInitHeight] = useState(null);
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const handleScroll = () => {
    const paragraph = paragraphRef.current;

    if (paragraph && !isScrolledToBottom) {
      if (scrollInitHeight == null) {
        setScrollInitHeight(paragraph.scrollTop + paragraph.clientHeight);
      }
      const isAtBottom =
        paragraph.scrollTop + paragraph.clientHeight >=
        paragraph.scrollHeight - 5;

      setScrollPercentage(
        (
          ((paragraph.scrollTop + paragraph.clientHeight - scrollInitHeight) *
            100) /
          (paragraph.scrollHeight - 5 - scrollInitHeight)
        ).toFixed(2)
      );
      console.log(
        ((paragraph.scrollTop + paragraph.clientHeight) * 100) /
          (paragraph.scrollHeight - 5)
      );
      setIsScrolledToBottom(isAtBottom);
    }
  };
  useLayoutEffect(() => {
    const paragraph = paragraphRef.current;
    const checkScroll = () => {
      if (paragraph) {
        if (
          paragraph.scrollHeight > paragraph.clientHeight &&
          scrollPercentage <= 95
        ) {
          setIsScrolledToBottom(false);
        } else {
          if (!isScrolledToBottom) setIsScrolledToBottom(true);
        }
      }
    };
    checkScroll();
    if (news?.female_audio_url || news?.male_audio_url) {
      audio = new Audio(news.male_audio_url);
      audio.addEventListener("ended", function (e) {
        setAudioPlay(false);
      });
    }
  }, [news]);
  return (
    <div className={style.container}>
      <div
        className={style.mainCard}
        style={{ paddingBottom: quizId == null ? "10px" : "" }}
      >
        <div
          className={style.articleContainer}
          ref={paragraphRef}
          onScroll={handleScroll}
        >
          {news != null && (
            <div className={style.article}>
              <div>
                <label
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    fontFamily: "var(--Gilroy)",
                    fontWeight: "400",
                    wordWrap: "break-word",
                    letterSpacing: "1.3px",
                    textTransform: "uppercase",
                  }}
                >
                  {/* Crypto News */}
                  {news.category}
                </label>
              </div>
              <div style={{ marginTop: "8px" }}>
                <label
                  style={{
                    width: "100%",
                    color: "white",
                    fontSize: "24px",
                    fontFamily: "var(--Gilroy)",
                    fontWeight: "700",
                    wordWrap: "break-word",
                    lineHeight: "normal",
                    letterSpacing: "1.3px",
                  }}
                >
                  {news.title}
                </label>
              </div>
              <div className={style.subtitleRow}>
                <div className={style.subHeading}>
                  <label
                    style={{
                      color: "#BEBEBE",
                      fontSize: "14px",
                      fontFamily: "var(--Gilroy)",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    Published <b>{timeCalculator(news.released_at)}</b> ago
                  </label>
                  <div className={style.dot}></div>
                  <label
                    style={{
                      color: "#BEBEBE",
                      fontSize: "14px",
                      fontFamily: "var(--Gilroy)",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    <b> {formatTime(news.read_time)}</b> read
                  </label>
                  <label
                    style={{
                      color: "#BEBEBE",
                      fontSize: "14px",
                      fontFamily: "var(--Gilroy)",
                      fontWeight: "400",
                      wordWrap: "break-word",
                    }}
                  >
                    {(news?.female_audio_url || news?.male_audio_url) && (
                      <button
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (!audioPlay) {
                            audio.play();
                          } else {
                            audio.pause();
                          }
                          setAudioPlay(!audioPlay);
                        }}
                      >
                        {/* {audioPlay && <div className={`${style["pulse-ring"]}`}></div>} */}

                        <div>
                          <img
                            style={{
                              height: 25,
                              marginLeft: 28,
                              paddingTop: 4,
                            }}
                            src={
                              audioPlay
                                ? "/profile/pause.svg"
                                : "/profile/play.svg"
                            }
                          />
                        </div>
                      </button>
                    )}
                  </label>
                </div>
                <div className={style.options}>
                  <div className={style.withicon}>
                    <ViewIcon />

                    <label
                      style={{
                        color: "#BEBEBE",
                        fontSize: 14,
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      {news.view_count}
                    </label>
                  </div>
                  <div className={style.divider}>
                    <p></p>
                  </div>
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
                        color: "#BEBEBE",
                        fontSize: 14,
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "700",
                        wordWrap: "break-word",
                      }}
                    >
                      {news.like_count}
                    </label>
                  </div>
                  <div className={style.divider}>
                    <p></p>
                  </div>

                  <div
                    className={style.withicon}
                    style={{ cursor: "not-allowed" }}
                  >
                    <ShareIcon />

                    <label
                      style={{
                        color: "#BEBEBE",
                        fontSize: 14,
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "400",
                        wordWrap: "break-word",
                        cursor: "not-allowed",
                      }}
                    >
                      0
                    </label>
                  </div>
                  <div className={style.divider}>
                    <p></p>
                  </div>

                  <div className={style.withicon}>
                    <label
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "400",
                        wordWrap: "break-word",
                        marginRight: "5px",
                      }}
                    >
                      {news.quiz_attempt_count}
                    </label>
                    <label
                      style={{
                        color: "#BEBEBE",
                        fontSize: 14,
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      quizzed
                    </label>
                  </div>
                </div>
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
              <div style={{ marginTop: "24px", textAlign: "justify" }}>
                <label
                  style={{
                    width: "100%",
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "var(--Gilroy)",
                    fontWeight: "400",
                    lineHeight: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {news.abstract}
                </label>
              </div>

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
                    Read more:{" "}
                    <span>
                      {news.abstract_source_url.substring(0, 35) + "..."}
                    </span>
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

                <div
                  className={style.withicon}
                  style={{ cursor: "not-allowed" }}
                >
                  <ShareIcon />

                  <label
                    className="txt_Caption"
                    style={{ cursor: "not-allowed" }}
                  >
                    Share
                  </label>
                </div>
              </div>
              <br />
            </div>
          )}
        </div>

        {quizId != null && (
          <div className={style.quizContainer}>
            {!news?.quiz_attempted ? (
              <div className={style.banner}>
                {/* Start Quiz */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  {" "}
                  <label
                    style={{
                      color: "white",
                      fontSize: "20px",
                      fontFamily: "var(--Gilroy)",
                      fontWeight: "600",
                      wordWrap: "break-word",
                      letterSpacing: "1.3px",
                    }}
                  >
                    Read & take the quiz to earn 100{" "}
                    <span className={style.ptt}>PTV</span>
                  </label>
                  <InfoIcon />
                </div>
                {isScrolledToBottom ? (
                  <button
                    className={` ${style.button} ${style.button_active}`}
                    onClick={() => {
                      // get_quiz_limit().then((res) => {
                      //   if (res.data.attempted >= res.data.limit) {
                      //     handleAddNotification(
                      //       "fail",
                      //       "Daily quiz limit reached."
                      //     );
                      //   } else {
                      setShowQuizModal(true);
                      //   }
                      // });
                    }}
                  >
                    <span>Start quiz</span>
                  </button>
                ) : (
                  <button
                    className={`${style.ScrollbButton}`}
                    style={{
                      background: `linear-gradient(90deg, rgba(211, 118, 255, 1) ${
                        scrollPercentage - 0.1
                      }%, rgba(160, 247, 255, 0) ${scrollPercentage}%)`,
                    }}
                  >
                    <span className={` ${style.disableBtn}`}>Start quiz</span>
                  </button>
                )}

                {/* Start Quiz End*/}
              </div>
            ) : (
              <label
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "var(--GilroySemiBold)",
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                You earned {news.earned_ptv}{" "}
                <span className={style.pttTxt}>
                  {/* {news.earned_ptv} */}
                  PTV
                </span>{" "}
                in this quiz
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

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
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.9987 15.1654C11.6806 15.1654 14.6654 12.1806 14.6654 8.4987C14.6654 4.8168 11.6806 1.83203 7.9987 1.83203C4.3168 1.83203 1.33203 4.8168 1.33203 8.4987C1.33203 12.1806 4.3168 15.1654 7.9987 15.1654Z"
          stroke="white"
          stroke-opacity="0.5"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11.1667V8.5"
          stroke="white"
          stroke-opacity="0.5"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 5.83203H8.00667"
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
