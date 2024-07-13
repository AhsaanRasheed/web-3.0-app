import React from "react";
import style from "../style.module.scss";
export default function Button({ txt, onClick }) {
  return (
    <button type="submit" className={style.button}>
      {txt}
    </button>
  );
}
