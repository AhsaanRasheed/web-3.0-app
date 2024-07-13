"use client";
import React, { useState, useRef } from "react";
import style from "../style.module.scss";

export default function InputTxtNew({
  label,
  value,
  onChange,
  errorMsg,
  showError,
  placeHolder,
  isPwd,
  showErrorCard,
  perror,
  type = "text",
  onBlurPwd = {},
}) {
  const [showPwd, setShowPwd] = useState(true);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
    try {
      onBlurPwd();
    } catch (e) {}
  };

  return (
    <div className={style.InputTxtNew}>
      <label className={style.InputTitle}>{label}</label>
      <div className={`${style.inputCon} ${showError && style.inputConError}`}>
        <input
          type={isPwd && !showPwd ? "password" : type}
          value={value}
          placeholder={placeHolder}
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onChange(e.target.value)}
          id={type == "email" && "email"}
        />
        {isPwd && (
          <div
            onClick={() => setShowPwd(!showPwd)}
            style={{
              paddingLeft: "8px",
              width: "21px",
              height: "21px",
              cursor: "pointer",
            }}
          >
            {showPwd ? <ShowIcon /> : <HideIcon />}
          </div>
        )}
        {showErrorCard && showError && isFocused && (
          <PwdErrorCard perror={perror} />
        )}
      </div>
      {showError && <label className={style.errorLbl}>{errorMsg}</label>}
    </div>
  );
}

const HideIcon = () => {
  return (
    <svg
      style={{ minWidth: "21px", minHeight: "21px" }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_797_66844)">
        <path
          d="M14.976 15.1811C13.5515 16.267 11.817 16.8685 10.026 16.8978C4.19271 16.8978 0.859375 10.2311 0.859375 10.2311C1.89595 8.29939 3.33365 6.61165 5.07604 5.28114M8.27604 3.76447C8.84965 3.63021 9.43693 3.56309 10.026 3.56447C15.8594 3.56447 19.1927 10.2311 19.1927 10.2311C18.6869 11.1775 18.0836 12.0684 17.3927 12.8895M11.7927 11.9978C11.5638 12.2434 11.2878 12.4404 10.9812 12.5771C10.6745 12.7137 10.3435 12.7872 10.0078 12.7931C9.67211 12.799 9.33868 12.7373 9.02738 12.6115C8.71609 12.4858 8.43331 12.2987 8.19591 12.0613C7.95852 11.8239 7.77137 11.5411 7.64563 11.2298C7.5199 10.9185 7.45815 10.5851 7.46407 10.2494C7.46999 9.91372 7.54347 9.58268 7.68011 9.27601C7.81675 8.96935 8.01375 8.69335 8.25938 8.46447"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M0.859375 1.06445L19.1927 19.3978"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_797_66844">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.0273438 0.230469)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
const ShowIcon = () => {
  return (
    <svg
      style={{ minWidth: "21px", minHeight: "21px" }}
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_797_66845)">
        <path
          d="M0.859375 10.2311C0.859375 10.2311 4.19271 3.56445 10.026 3.56445C15.8594 3.56445 19.1927 10.2311 19.1927 10.2311C19.1927 10.2311 15.8594 16.8978 10.026 16.8978C4.19271 16.8978 0.859375 10.2311 0.859375 10.2311Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.0273 12.7305C11.4081 12.7305 12.5273 11.6112 12.5273 10.2305C12.5273 8.84976 11.4081 7.73047 10.0273 7.73047C8.64663 7.73047 7.52734 8.84976 7.52734 10.2305C7.52734 11.6112 8.64663 12.7305 10.0273 12.7305Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_797_66845">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.0273438 0.230469)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const PwdErrorCard = ({ perror }) => {
  return (
    <div className={style.PwdErrorCard0}>
      <label className={style.title}>Password must</label>
      {perror.long && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>be at least 8 characters long.</label>
        </div>
      )}
      {perror.lower && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>contain at least one lower case</label>
        </div>
      )}
      {perror.special && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>
            contain at least one special character
          </label>
        </div>
      )}
      {perror.upper && (
        <div className={style.lirow}>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="4.5" r="4" fill="#FF5E5E" />
          </svg>
          <label className={style.litxt}>contain at least one upper case</label>
        </div>
      )}
    </div>
  );
};
