"use client";
import React from "react";
import "../style.css";
export default function Button({
  text,
  onClick,
  disable = false,
  Custom_width = null,
  Custom_height = null,
  Custom_maxWidth = null,
  Custom_minWidth = null,
  submit = true,
  Custom_fontFamily = null,
  login_default = false,
}) {
  return (
    <div
      style={{
        maxWidth: Custom_maxWidth === null ? "262px" : Custom_maxWidth,
        minWidth: Custom_minWidth === null ? "260px" : Custom_minWidth,
        width: Custom_width === null ? "262px" : Custom_width,
        height: Custom_height === null ? "51px" : Custom_height,
      }}
    >
      {login_default ? (
        <button
          type={submit ? "submit" : "button"}
          className="btn_login txt_Button"
          onClick={() => onClick()}
        >
          <div className="btn_bg">
            <label>CTA</label>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 6.30859V13.6932"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.80859 10H14.1932"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.8077 2H6.19231C4.15311 2 2.5 3.65311 2.5 5.69231V14.3077C2.5 16.347 4.15311 18 6.19231 18H14.8077C16.847 18 18.5 16.347 18.5 14.3077V5.69231C18.5 3.65311 16.847 2 14.8077 2Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className={`btn_primary ${
            Custom_fontFamily == null ? `txt_Button` : `txt_Caption`
          }`}
          onClick={() => onClick()}
          disabled={disable}
        >
          {text}
        </button>
      )}
    </div>
  );
}
