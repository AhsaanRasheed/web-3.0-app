import React from "react";
import style from "../style.module.scss";

export default function OutlineBtn({ txt, onClick }) {
  return (
    <button type="button" className={`${style.button} ${style.Outlinebutton}`} onClick={onClick}>
      <div className={style.body}>{txt}</div>
    </button>
  );
}
