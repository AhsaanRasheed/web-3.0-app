"use client";

import React from "react";
import "../style.css";

export default function TableButton({
  text,
  onClick,
  disable = false,
  clock = false,
  Custom_width = null,
  Custom_height = null,
  Custom_maxWidth = null,
  Custom_minWidth = null,
  submit = true,
}) {
  return (
    <div
      style={{
        maxWidth: Custom_maxWidth === null ? "112px" : Custom_maxWidth,
        minWidth: Custom_minWidth === null ? "110px" : Custom_minWidth,
        width: Custom_width === null ? "112px" : Custom_width,
        height: Custom_height === null ? "27px" : Custom_height,
      }}
    >
      <button
        type={submit ? "submit" : "button"}
        className={`txt_Caption ${clock ? "btn_clock" : "btn_tbl"}`}
        onClick={()=>onClick()}
        disabled={disable}
      >
        {text}
      </button>
    </div>
  );
}
