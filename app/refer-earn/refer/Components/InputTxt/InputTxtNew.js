"use client";
import React, { useState, useRef } from "react";
import style from "../../style.module.scss";

export default function InputTxtNew({
  label,
  value,
  onChange,
  errorMsg,
  showError,
  placeHolder,
  disabled=false,
 
  type = "text",
}) { 

  const [inputFouce, setInputFouce] = useState(false);

  return (
    <div className={`${style.InputTxtNew} ${disabled && style.disabledInput}`}>
      <label className={style.InputTitle}>{label}</label>
      <div className={`${style.inputCon} ${showError && style.inputConError} ${inputFouce && !disabled && style.inputConFouce}`}>
        <input
          type={ type}
          value={value}
          placeholder={placeHolder}
          
          onChange={(e) => onChange(e.target.value)}
          onFocus={()=>setInputFouce(true)}
          onBlur={()=>setInputFouce(false)}

        />
       
      </div>
      {showError && <label className={style.errorLbl}>{errorMsg}</label>}
    </div>
  );
}
