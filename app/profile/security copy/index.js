"use client";
import React from "react";
import Factor from "./Components/TwoFactor";
import SignIn from "./Components/SignIn";
import Link from "next/link";
import style from "../style.module.scss";

const Security = (props) => {
  return (
    <>
      <div  className={style.component_container}>
        <SignIn  isMobileView={props.isMobileView}/>
        <br />
        <Factor  isMobileView={props.isMobileView}/>
      </div>
    </>
  );
};

export default Security;
