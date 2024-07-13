import React from "react";
import style from "../style.module.scss";
export default function Button({ txt, onClick }) {
  return (
    <button type="button" className={style.button} onClick={() => onClick()}>
      {txt}
    </button>
  );
}