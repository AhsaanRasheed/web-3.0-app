"use client";
import React, { useRef, useState, useEffect } from "react";
import "../style.css";
export default function InputTxt({
  placeHolder,
  onChange,
  value = "",
  disable = false,
  Custom_width = null,
  Custom_height = null,
  Custom_maxWidth = null,
  Custom_minWidth = null,
  error_msg = "",
  show_error = false,
  label = "",
  isPwd = false,
  isSearch = false,
  onBlur,
  onFocus,
  inputPrevLbl = "",
  inputTypeNumber = false,
  isPtt = false,
}) {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  useEffect(() => {
    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    if (inputRef.current) {
      inputRef.current.addEventListener("focus", onFocus);
      inputRef.current.addEventListener("blur", onBlur);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("focus", onFocus);
        inputRef.current.removeEventListener("blur", onBlur);
      }
    };
  }, []);
  return (
    <div
      style={{
        maxWidth: Custom_maxWidth === null ? "431px" : Custom_maxWidth,
        minWidth: Custom_minWidth === null ? "430px" : Custom_minWidth,
        width: Custom_width === null ? "431px" : Custom_width,
        height: Custom_height === null ? "40px" : Custom_height,
        position: "relative",
      }}
    >
      {label.length > 0 && (
        <label
          className={`txt_Body2  ${disable ? `inputTxt_lbl_disabled` : ``}`}
        >
          {label}
        </label>
      )}
      <div>
        <div
          className={`inputTxt ${isFocused ? `inputTxt_focus` : ``} ${
            show_error ? `inputTxt_error` : ``
          }  ${disable ? `inputTxt_disabled` : ``}`}
        >
          {isSearch && <SearchBarIcon />}
          {inputPrevLbl.length > 0 && (
            <label className={`txt_Body1 ${isPtt ? "txt_ptt_color" : ""}`}>
              {inputPrevLbl}
            </label>
          )}
          <input
            type={
              isPwd && !showPwd
                ? "password"
                : inputTypeNumber
                ? "number"
                : "text"
            }
            ref={inputRef}
            placeholder={placeHolder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disable}
            onFocus={onFocus}
            onBlur={onBlur}
            className={"txt_Body1"}
          />
          {isPwd && (
            <ShowPwd
              showPwd={showPwd}
              onClick={() => setShowPwd(!showPwd)}
              color={show_error ? "#FF4848" : disable ? "#596170" : "#9EA6BA"}
            />
          )}
        </div>
        {show_error && (
          <>
            <label
              className={`txt_Body2 error_support_txt  ${
                disable ? `inputTxt_lbl_disabled` : ``
              }`}
            >
              {error_msg}
            </label>
          </>
        )}
      </div>
    </div>
  );
}

const ShowPwd = ({ color = "#9EA6BA", onClick, showPwd }) => {
  return (
    <div onClick={() => onClick()} style={{ cursor: "pointer" }}>
      {!showPwd ? (
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.2367 0.448569C17.5413 0.579102 17.6823 0.93183 17.5518 1.23641L17.0003 1.00006C17.5518 1.23641 17.5519 1.23627 17.5518 1.23641L17.5512 1.23775L17.5504 1.23974L17.5478 1.24563L17.5393 1.26489C17.5321 1.281 17.5219 1.30357 17.5086 1.33211C17.4819 1.3892 17.443 1.47025 17.3914 1.57138C17.2883 1.7735 17.1344 2.0566 16.9271 2.38923C16.5867 2.93566 16.0983 3.62218 15.4499 4.3042L16.2246 5.07886C16.4589 5.31318 16.4589 5.69308 16.2246 5.92739C15.9903 6.16171 15.6104 6.16171 15.3761 5.92739L14.5756 5.12693C14.0479 5.56908 13.4426 5.98408 12.7564 6.32504L13.5032 7.47282C13.684 7.75057 13.6053 8.12224 13.3276 8.30297C13.0498 8.48369 12.6781 8.40504 12.4974 8.12729L11.6261 6.78817C11.0026 6.99178 10.3276 7.13015 9.60033 7.17975V8.60006C9.60033 8.93143 9.3317 9.20006 9.00033 9.20006C8.66896 9.20006 8.40033 8.93143 8.40033 8.60006V7.17975C7.69551 7.13168 7.03967 7.00022 6.43225 6.80678L5.57299 8.12734C5.39227 8.40509 5.0206 8.48375 4.74285 8.30302C4.4651 8.1223 4.38644 7.75063 4.56717 7.47288L5.2971 6.35107C4.60559 6.01338 3.99544 5.60019 3.46313 5.15866L2.69434 5.92744C2.46003 6.16176 2.08013 6.16176 1.84582 5.92744C1.6115 5.69313 1.6115 5.31323 1.84582 5.07892L2.58483 4.33991C1.92518 3.65215 1.42859 2.9573 1.08261 2.40379C0.872265 2.06728 0.716067 1.78057 0.611496 1.57581C0.559175 1.47336 0.519673 1.39121 0.492687 1.33337C0.479191 1.30444 0.468815 1.28156 0.461522 1.26524L0.452888 1.24573L0.450293 1.23977L0.449425 1.23776L0.449098 1.237C0.449037 1.23686 0.448843 1.23641 1.00033 1.00006L0.449098 1.237C0.318565 0.932426 0.4594 0.579102 0.763978 0.448569C1.06831 0.318143 1.4207 0.458895 1.55149 0.762953C1.55145 0.762848 1.55154 0.763058 1.55149 0.762953L1.55226 0.764706L1.55712 0.775676C1.56183 0.786233 1.56951 0.803182 1.58017 0.82604C1.6015 0.871767 1.63476 0.941056 1.6802 1.03003C1.77115 1.20813 1.91048 1.46427 2.10017 1.76774C2.48065 2.37644 3.05765 3.16573 3.84488 3.89733C4.5376 4.5411 5.38646 5.1341 6.40171 5.5247C7.1653 5.81848 8.02869 6.00006 9.00033 6.00006C9.9937 6.00006 10.874 5.81027 11.6503 5.50471C12.6594 5.10752 13.5025 4.51065 14.1897 3.86565C14.9653 3.13763 15.5338 2.35618 15.9087 1.75462C16.0956 1.4547 16.2328 1.20187 16.3224 1.02619C16.3672 0.938419 16.3999 0.870111 16.4209 0.825053C16.4314 0.80253 16.439 0.785837 16.4436 0.775449L16.4484 0.764662L16.4488 0.763705C16.4488 0.763783 16.4489 0.763626 16.4488 0.763705M17.2367 0.448569C16.9322 0.318069 16.5795 0.459289 16.4488 0.763705L17.2367 0.448569ZM1.55149 0.762953C1.55145 0.762848 1.55154 0.763058 1.55149 0.762953V0.762953Z"
            fill={color}
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
        <g clip-path="url(#clip0_3249_171318)">
        <path d="M15.4487 15.4487C14.0242 16.5346 12.2896 17.1361 10.4987 17.1654C4.66536 17.1654 1.33203 10.4987 1.33203 10.4987C2.36861 8.56696 3.80631 6.87923 5.5487 5.54872M8.7487 4.03205C9.32231 3.89778 9.90959 3.83067 10.4987 3.83205C16.332 3.83205 19.6654 10.4987 19.6654 10.4987C19.1595 11.4451 18.5562 12.336 17.8654 13.1571M12.2654 12.2654C12.0365 12.511 11.7605 12.708 11.4538 12.8447C11.1472 12.9813 10.8161 13.0548 10.4804 13.0607C10.1448 13.0666 9.81133 13.0049 9.50004 12.8791C9.18875 12.7534 8.90597 12.5662 8.66857 12.3288C8.43117 12.0915 8.24403 11.8087 8.11829 11.4974C7.99255 11.1861 7.9308 10.8527 7.93673 10.517C7.94265 10.1813 8.01612 9.85026 8.15276 9.54359C8.2894 9.23693 8.48641 8.96093 8.73203 8.73205" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"/>
        <path d="M1.33203 1.33203L19.6654 19.6654" stroke="white" stroke-width="2" stroke-linecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_3249_171318">
        <rect width="20" height="20" fill="white" transform="translate(0.5 0.5)"/>
        </clipPath>
        </defs>
        </svg>
        
      )}
    </div>
  );
};

const SearchBarIcon = () => {
  return (
    <div style={{ width: "24px", height: "25px" }}>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5999 5.10039C7.73391 5.10039 4.5999 8.2344 4.5999 12.1004C4.5999 15.9664 7.73391 19.1004 11.5999 19.1004C15.4659 19.1004 18.5999 15.9664 18.5999 12.1004C18.5999 8.2344 15.4659 5.10039 11.5999 5.10039ZM3.3999 12.1004C3.3999 7.57166 7.07117 3.90039 11.5999 3.90039C16.1286 3.90039 19.7999 7.57166 19.7999 12.1004C19.7999 14.1488 19.0488 16.0218 17.807 17.459L20.4242 20.0761C20.6585 20.3104 20.6585 20.6903 20.4242 20.9247C20.1899 21.159 19.81 21.159 19.5756 20.9247L16.9585 18.3075C15.5213 19.5493 13.6483 20.3004 11.5999 20.3004C7.07117 20.3004 3.3999 16.6291 3.3999 12.1004Z"
          fill="white"
        />
      </svg>
    </div>
  );
};
