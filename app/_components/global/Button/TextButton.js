"use client";

import React from "react";
import "../style.css";
import Link from "next/link";

export default function TextButton({
  text,
  onClick,
  disable = false,
  Custom_width = null,
  Custom_height = null,
  Custom_maxWidth = null,
  Custom_minWidth = null,
  submit = false,
  isLink = false,
  linkAddress = "",
  defaultColor="var(--primary-Neutrals-default-color)"
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
      {isLink ? (
        <Link href="/auth/signin" legacyBehavior>
          <button
            type={submit ? "submit" : "button"}
            className="btn_txt txt_Button"
            // onClick={()=>isLink?onClick():{}}

            disabled={disable}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          type={submit ? "submit" : "button"}
          className="btn_txt txt_Button"
          onClick={() => onClick()}
          disabled={disable}
          style={{color:defaultColor}}
        >
          {text}
        </button>
      )}
    </div>
  );
}
