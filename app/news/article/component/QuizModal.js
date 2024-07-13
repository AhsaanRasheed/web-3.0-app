"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/app/_components/Modal";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { submit_quiz } from "@/app/services/service";
import style from "./style.module.scss";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
export default function QuizModal({
  showQuizModal,
  onClose,
  question,
  options,
  quizId,
}) {
  const { addNotification } = useNotification();
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);

  const [showCWN, setShowCWN] = useState("N");

  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedPTT, setEarnedPTT] = useState(0);
  const { toggleLoader } = useLoader();

  const submitQuizHandle = async () => {
    toggleLoader(true);
    try {
      let resp = await submit_quiz(quizId, selectedOption);
      console.log(resp);
      if (resp.message == "Quiz submitted successfully") {
        setCorrectOption(resp.data.answer);

        setEarnedPTT(resp.data.earned_ptv);
        setEarnedXP(resp.data.earned_xp);
      }
      if (
        resp.message ==
        "You have reached the daily limit for incorrect quiz answers. Please try again tomorrow."
      ) {
        addNotification({
          id: Math.random().toString(36).substr(2, 9),
          type: "fail",
          message: "Wrong attempts limit reached, please try again tomorrow.",
          customProp: null,
        });
        onClose(true)
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const onNextClick = () => {
    if (correctOption == selectedOption) {
      setShowCWN("C");
    } else {
      setShowCWN("W");
    }
  };
  return (
    <Modal showModal={showQuizModal} onClose={() => onClose(true)}>
      <div className={style.ModalContainer}>
        {/* <br /> */}
        {showCWN == "N" ? (
          <>
            <div className={style.topBar}>
              <div className={style.first}></div>
            </div>

            <div className={style.question}>
              <label
              // className="txt_Heading3"
              // style={{ textAlign: "center", maxWidth: "478px" }}
              >
                {question}
              </label>
            </div>
            <div className={style.options}>
              {options.map((item, index) => (
                <div
                  onClick={() => {
                    if (correctOption == null) setSelectedOption(item);
                  }}
                  className={`${style.option} ${
                    correctOption != null && style.noHover
                  } ${
                    selectedOption == item && correctOption == null
                      ? style.selectedOpt
                      : ``
                  }
                ${
                  selectedOption == item &&
                  selectedOption == correctOption &&
                  correctOption !== null
                    ? style.selectedCorrectOpt
                    : ``
                }
                ${
                  selectedOption !== item &&
                  selectedOption !== correctOption &&
                  correctOption == item &&
                  correctOption !== null
                    ? style.CorrectOpt
                    : ``
                }
                ${
                  selectedOption == item &&
                  selectedOption !== correctOption &&
                  correctOption !== null
                    ? style.WrongOpt
                    : ``
                }
                `}
                >
                  <RadioIcon
                    status={
                      selectedOption == item && correctOption == null
                        ? `ch`
                        : selectedOption == item &&
                          selectedOption == correctOption &&
                          correctOption !== null
                        ? `cor`
                        : selectedOption !== item &&
                          selectedOption !== correctOption &&
                          correctOption == item &&
                          correctOption !== null
                        ? `cor`
                        : selectedOption == item &&
                          selectedOption !== correctOption &&
                          correctOption !== null
                        ? `w`
                        : `unc`
                    }
                  />

                  <label className={style.option_lbl} style={{}}>
                    {item}
                  </label>
                </div>
              ))}
            </div>
            {selectedOption != null &&
              (correctOption == null ? (
                <button
                  onClick={() => submitQuizHandle()}
                  disabled={selectedOption == null}
                  className={` ${style.button} ${style.button_active} ${style.change_opacity}`}
                >
                  <span>Check</span>
                </button>
              ) : (
                <button
                  className={` ${style.button} ${style.button_active}`}
                  onClick={() => onNextClick()}
                >
                  <span>Next</span>
                </button>
              ))}
          </>
        ) : showCWN == "C" ? (
          <div className={style.CongratulationsModal}>
            <div style={{ display: "flex" }}>
              <label
                style={{
                  fontFamily: "var(--GilroySemiBold)",
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  letterSpacing: "0em",
                  textAlign: "center",
                  letterSpacing: "1.3px",

                  color: "#D376FF",
                  marginBottom: "7px",
                }}
              >
                {earnedPTT == 0
                  ? "Daily Quiz Limit Reached!"
                  : "Congratulations!"}
              </label>
            </div>
            <div>
              <label
                style={{
                  fontFamily: "var(--GilroyMed)",
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  letterSpacing: "0em",
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {earnedPTT == 0
                  ? "Congratulations you earned the maximum for today"
                  : "You earned"}
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "32px 0",
              }}
            >
              <label
                style={{
                  fontFamily: "var(--GilroySemiBold)",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "23px",
                  letterSpacing: "0em",
                  textAlign: "center",

                  color: "#fff",
                }}
              >
                <label className={style.pttTxt}>PTV </label>
                {earnedPTT == 0 ? 2000 : earnedPTT}
              </label>
              <label
                style={{
                  fontFamily: "var(--Gilroy)",
                  letterSpacing: "1.3px",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "23px",
                  textAlign: "center",

                  color: "#fff",
                  marginLeft: "12px",
                }}
              >
                {earnedXP} <label style={{ color: "#D376FF" }}>XP</label>
              </label>
            </div>

            <button
              className={` ${style.button} ${style.button_active}`}
              onClick={() => onClose(true)}
            >
              <span className={`${style.card_button}`}>
                {earnedPTT == 0 ? "Ok!" : "Great!"}
              </span>
            </button>
          </div>
        ) : (
          <div className={style.CongratulationsModal}>
            <div style={{ display: "flex" }}>
              <label
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  lineHeight: "24px",
                  fontFamily: "var(--GilroySemiBold)",
                  letterSpacing: "1.3px",
                  textAlign: "center",
                  color: "#CD2E54",
                  marginBottom: "7px",
                }}
              >
                Oops!
              </label>
            </div>
            <div>
              <label
                style={{
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  fontFamily: "var(--GilroyMed)",
                  letterSpacing: "1.3px",
                  textAlign: "center",

                  color: "#fff",
                }}
              >
                You earned
              </label>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "32px 0",
              }}
            >
              <label
                style={{
                  fontFamily: "var(--GilroySemiBold)",
                  letterSpacing: "1.3px",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "23px",

                  textAlign: "center",

                  color: "#fff",
                }}
              >
                <label className={style.pttTxt}>PTV</label> 0
              </label>
              <label
                style={{
                  fontFamily: "var(--Gilroy)",
                  letterSpacing: "1.3px",
                  fontSize: "20px",
                  fontWeight: "600",
                  lineHeight: "23px",

                  textAlign: "center",

                  color: "#fff",
                  marginLeft: "12px",
                }}
              >
                {earnedXP} <label style={{ color: "#D376FF" }}>XP</label>
              </label>
            </div>

            <button
              onClick={() => onClose(true)}
              className={` ${style.button} ${style.button_active} ${style.failedBtn}`}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

const RadioIcon = ({ status }) => {
  if (status == "unc") {
    return (
      <div
        style={{
          width: "16px",
          height: "16px",
          maxHeight: "16px",
          maxWidth: "16px",
          minHeight: "16px",
          minWidth: "16px",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7.5" stroke="#D376FF" />
        </svg>
      </div>
    );
  } else if (status == "ch") {
    return (
      <div
        style={{
          width: "16px",
          height: "16px",
          maxHeight: "16px",
          maxWidth: "16px",
          minHeight: "16px",
          minWidth: "16px",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" stroke="#D376FF" stroke-width="2" />
          <circle cx="8" cy="8" r="4" fill="#D376FF" />
        </svg>
      </div>
    );
  } else if (status == "cor") {
    return (
      <div
        style={{
          width: "16px",
          height: "16px",
          maxHeight: "16px",
          maxWidth: "16px",
          minHeight: "16px",
          minWidth: "16px",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="white" />
          <path
            d="M12 5L6.5 10.5L4 8"
            stroke="#2DE761"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  } else if (status == "w") {
    return (
      <div
        style={{
          width: "16px",
          height: "16px",
          maxHeight: "16px",
          maxWidth: "16px",
          minHeight: "16px",
          minWidth: "16px",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="white" />
          <path
            d="M11 5L5 11"
            stroke="#E53030"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 5L11 11"
            stroke="#E53030"
            stroke-width="2"
            stroke-linecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }
};
