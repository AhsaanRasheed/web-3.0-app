"use client";
import React, { useState, useRef, useEffect } from "react";
import style from "./MobileView.module.scss";
import Pagination from "./pagination";
import NewsDropdown from "./dropdown";
import Image from "next/image";
import Link from "next/link";
export default function MobileView({
  getCategoriesFilter,
  setSortByType,
  selectedCategories,
  categories,
  sortByType,
  itemPerPage,
  setItemPerPage,
  pageIndex,
  totalNews,
  setPageIndex,
  news,
  sortBy,
  setSortBy,
  audioOnly,
  setAudioOnly,
  setUnattempted,
  unattempted,
  setUnread,
  unread,
}) {
  const [IsScrolled, setIsScrolled] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);
  const [audio, setAudio] = useState(false);
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  });
  const CheckBoxDT = ({ isCheck, onCheck, onUncheck, lbl = null }) => {
    return (
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          width: "max-content",
          height: "max-content",
        }}
      >
        {" "}
        {isCheck ? (
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              minWidth: "16px",
              minHeight: "17px",
            }}
            onClick={() => onUncheck()}
          >
            <rect
              x="0.5"
              y="1"
              width="15"
              height="15"
              rx="3.5"
              fill="#D376FF"
              stroke="#D376FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.24786 11.3067C8.24898 11.3055 8.2501 11.3043 8.25122 11.3031L12.9944 6.20711C13.3579 5.81658 13.3579 5.18342 12.9944 4.79289C12.6309 4.40237 12.0416 4.40237 11.6781 4.79289L6.93156 9.89246L4.58892 7.37556C4.22543 6.98504 3.6361 6.98504 3.27262 7.37556C2.90913 7.76609 2.90913 8.39925 3.27261 8.78978L5.6175 11.3091C6.34447 12.0901 7.52313 12.0901 8.2501 11.3091L8.24786 11.3067Z"
              fill="#0E1521"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              minWidth: "16px",
              minHeight: "17px",
            }}
            onClick={() => onCheck()}
          >
            <rect
              x="0.5"
              y="1"
              width="15"
              height="15"
              rx="3.5"
              stroke="white"
            />
          </svg>
        )}{" "}
        {lbl != null && <label className={style.checkBoxLbl}>{lbl}</label>}
      </div>
    );
  };
  const paragraphRef = useRef();
  const handleScroll = () => {
    const paragraph = paragraphRef.current;
    if (paragraph) {
      if (paragraph.scrollTop > 250 && !IsScrolled) setIsScrolled(true);
      if (paragraph.scrollTop < 250 && IsScrolled) setIsScrolled(false);
    }
  };
  // const handleScrollToTop = () => {
  //   const paragraph = paragraphRef.current;
  //   if (paragraph) {
  //     paragraph.scrollTop = 0;
  //     setIsScrolled(false); // Assuming you want to hide the button after scrolling to the top
  //   }
  // };
  const handleScrollToTop = () => {
    const paragraph = paragraphRef.current;
    if (paragraph) {
      const start = paragraph.scrollTop;
      const startTime = performance.now();

      const scrollToTop = (timestamp) => {
        const progress = (timestamp - startTime) / 600; // 500 milliseconds (0.5 seconds)
        const easeInOutQuad = (progress) =>
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        paragraph.scrollTop = start - start * easeInOutQuad(progress);

        if (progress < 1) {
          window.requestAnimationFrame(scrollToTop);
        } else {
          setIsScrolled(false); // Assuming you want to hide the button after scrolling to the top
        }
      };

      window.requestAnimationFrame(scrollToTop);
    }
  };
  return (
    <div className={style.container} ref={paragraphRef} onScroll={handleScroll}>
      <div style={{ display: "flex" }}>
        <NewsDropdown
          customWidth={"190px"}
          label={"Category:"}
          options={categories.map((item) => ({
            lbl: item,
            value: item,
            disable: false,
          }))}
          onChange={(e) => getCategoriesFilter(e)}
          selectedOtp={selectedCategories}
        />
      </div>
      <div style={{ display: "block", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flex: "auto",
            marginInline:5
          }}
        >
          <CheckBoxDT
            isCheck={audioOnly}
            onCheck={() => {
              setAudioOnly(true);
            }}
            onUncheck={() => {
              setAudioOnly(false);
            }}
          />
          <label
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "var(--GilroySemiBold)",
              fontWeight: "600",
              wordWrap: "break-word",
              letterSpacing: "1.5px",
              marginLeft: 6,
            }}
          >
            Audio
          </label>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flex: "auto",
            marginInline:5
          }}
        >
          <CheckBoxDT
            isCheck={unattempted !== "all"}
            onCheck={() => {
              setUnattempted(false);
            }}
            onUncheck={() => {
              setUnattempted("all");
            }}
          />
          <label
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "var(--GilroySemiBold)",
              fontWeight: "600",
              wordWrap: "break-word",
              letterSpacing: "1.5px",
              marginLeft: 6,
            }}
          >
            Unattempted
          </label>
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flex: "auto",
            marginInline:5
          }}
        >
          <CheckBoxDT
            isCheck={unread !== "all"}
            onCheck={() => {
              setUnread("unread");
            }}
            onUncheck={() => {
              setUnread("all");
            }}
          />
          <label
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "var(--GilroySemiBold)",
              fontWeight: "600",
              wordWrap: "break-word",
              letterSpacing: "1.5px",
              marginLeft: 6,
            }}
          >
            Unread
          </label>
        </div>
      </div>
      <div className={style.mainCard}>
        <div className={style.topRow}>
          <label
            style={{
              fontFamily: "Jura",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "19px",
              letterSpacing: "0em",
              color: "#fff",
            }}
          >
            Read & Play Quizzes
          </label>
          <NewsDropdown
            label={""}
            sortIcon={true}
            sortValue={sortByType}
            onSortChange={(e) => {
              setSortByType(e);
            }}
            customWidth={"170px"}
            options={[
              { lbl: "Date", value: "released_at", disable: false },
              { lbl: "Top 100", value: "top", disable: false },

              { lbl: "# of likes", value: "like_count", disable: false },

              { lbl: "# of views", value: "view_count", disable: false },
              { lbl: "# of shares", value: "share_count", disable: false },
              { lbl: "# of quizzed", value: "quizzed", disable: false },
            ]}
            onChange={(e) => setSortBy(e)}
            selectedOtp={sortBy}
            startPosition={"right"}
          />
        </div>
        <div className={style.body}>
          {news.map((item, index) => (
            <Link
              href={`/news/article?n=${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={style.card}>
                <div className={style.top}>
                  <div className={style.imgContainer}>
                    {/* <Image
                      src={
                        item.image_url == ""
                          ? "https://ai-news-images.s3.eu-west-3.amazonaws.com/pt_news_placeholder_img.png"
                          : item.image_url
                      }
                      alt="news_image"
                      layout="fill"
                      objectFit="cover"
                    /> */}
                    <img
                      src={
                        item.thumbnail_url === "" || item.thumbnail_url == null
                          ? "https://ai-news-images.s3.eu-west-3.amazonaws.com/pt_news_placeholder_img+(1)+Cropped+(1).png"
                          : item.thumbnail_url
                      }
                      alt="news_image"
                    />
                  </div>
                  <div className={style.titleContainer}>
                    <label>
                      {item.title.length > 160
                        ? item.title.slice(0, 160) + "..."
                        : item.title}
                    </label>
                    <label
                      style={{
                        color: "#BEBEBE",
                        display: "block",
                        fontSize: "14px",
                        fontFamily: "var(--Gilroy)",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      {(item?.female_audio_url || item?.male_audio_url) && (
                        <button
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            let tempAudio;
                            if (audio) {
                              audio.pause();
                              audio.currentTime = 0;
                            }
                            if (
                              item?.female_audio_url ||
                              item?.male_audio_url
                            ) {
                              tempAudio = new Audio(item.male_audio_url);
                              tempAudio.addEventListener("ended", function (e) {
                                setAudioPlay(false);
                              });
                              setAudio(tempAudio);
                            }
                            if (audioPlay == item.id) {
                              tempAudio.pause();
                            } else {
                              tempAudio.play();
                            }
                            setAudioPlay(
                              audioPlay == item.id
                                ? false
                                : audioPlay && audioPlay !== item.id
                                ? item.id
                                : !audioPlay
                                ? item.id
                                : false
                            );
                          }}
                        >
                          {/* {audioPlay && <div className={`${style["pulse-ring"]}`}></div>} */}

                          <div>
                            <img
                              style={{
                                height: 25,
                                paddingTop: 4,
                              }}
                              src={
                                audioPlay == item.id
                                  ? "/profile/pause.svg"
                                  : "/profile/play.svg"
                              }
                            />
                          </div>
                        </button>
                      )}
                    </label>
                  </div>
                </div>
                <div className={style.bottom}>
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
                      {timeCalculator(item.released_at)}
                    </label>{" "}
                    ago
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
                      {item.view_count}
                    </label>
                  </div>
                  <div className={style.dot}></div>
                  <div className={style.withicon}>
                    <LikeIcon />
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
                      {item.like_count}
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
                        {" "}
                        {item.quiz_attempt_count}
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
                      {" "}
                      {formatTime(item.read_time)}
                    </label>{" "}
                    read
                  </label>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Pagination
            className={style.paginationbar}
            currentPage={pageIndex}
            totalCount={totalNews}
            pageSize={itemPerPage.value}
            onPageChange={(v) => setPageIndex(v)}
          />
          <br />
          <label
            style={{
              color: "white",
              fontSize: "14px",
              fontFamily: "var(--Gilroy)",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            Showing{" "}
            <label style={{ color: "#D376FF" }}>
              {totalNews > 0
                ? pageIndex * itemPerPage.value + 1 - itemPerPage.value
                : 0}
              -
              {pageIndex * itemPerPage.value > totalNews
                ? totalNews
                : pageIndex * itemPerPage.value}
            </label>{" "}
            out of {totalNews}
          </label>
        </div>
      </div>
      <div
        onClick={handleScrollToTop}
        className={`${style.scrollUpBtn} ${IsScrolled && style.showScroolBtn}`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 15L12 9L6 15"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

const ViewIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "4px" }}
    >
      <path
        d="M8 10.5C9.10457 10.5 10 9.60457 10 8.5C10 7.39543 9.10457 6.5 8 6.5C6.89543 6.5 6 7.39543 6 8.5C6 9.60457 6.89543 10.5 8 10.5Z"
        stroke="black"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.4538 9.77458C0.910275 9.00242 0.910275 7.99823 1.4538 7.22607C2.56432 5.6484 4.81693 3.16699 8.00008 3.16699C11.1832 3.16699 13.4358 5.6484 14.5464 7.22607C15.0899 7.99823 15.0899 9.00242 14.5464 9.77458C13.4358 11.3522 11.1832 13.8337 8.00008 13.8337C4.81693 13.8337 2.56431 11.3522 1.4538 9.77458Z"
        fill="white"
      />
      <path
        d="M8 11C9.38071 11 10.5 9.88071 10.5 8.5C10.5 7.11929 9.38071 6 8 6C6.61929 6 5.5 7.11929 5.5 8.5C5.5 9.88071 6.61929 11 8 11Z"
        fill="white"
        stroke="#28334F"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LikeIcon = () => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: "4px" }}
    >
      <path
        d="M13.8933 3.57333C13.5528 3.23267 13.1485 2.96243 12.7036 2.77805C12.2586 2.59368 11.7817 2.49878 11.3 2.49878C10.8183 2.49878 10.3414 2.59368 9.89643 2.77805C9.45145 2.96243 9.04717 3.23267 8.70666 3.57333C8.31638 3.96361 7.68361 3.96361 7.29333 3.57333C6.60554 2.88553 5.67269 2.49914 4.7 2.49914C3.72731 2.49914 2.79446 2.88553 2.10666 3.57333C1.41887 4.26112 1.03247 5.19397 1.03247 6.16666C1.03247 7.13935 1.41887 8.0722 2.10666 8.76L2.81333 9.46666L7.29289 13.9462C7.68341 14.3367 8.31658 14.3367 8.7071 13.9462L13.1867 9.46666L13.8933 8.76C14.234 8.41949 14.5042 8.01521 14.6886 7.57023C14.873 7.12526 14.9679 6.64832 14.9679 6.16666C14.9679 5.685 14.873 5.20807 14.6886 4.76309C14.5042 4.31812 14.234 3.91383 13.8933 3.57333Z"
        fill="white"
      />
    </svg>
  );
};

function timeCalculator(given) {
  const givenDate = new Date(given);
  const currentDate = new Date();

  const timeDifference = currentDate - givenDate;

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
