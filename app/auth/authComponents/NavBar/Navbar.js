"use client";
import React from "react";
import style from "../style.module.scss";
import Link from "next/link";

export default function AuthNavbar({ active }) {
  return (
    <div className={style.AuthNavbar}>
      <Link
        href={"/auth/signup/"}
        className={`${style.item} ${active == "signup" && style.active}`}
      >
        <label>Sign Up</label>
        <div className={style.btmBar}></div>
      </Link>
      <Link
        href={"/auth/signin/"}
        className={`${style.item} ${active == "signin" && style.active}`}
      >
        <label>Sign In</label>
        <div className={style.btmBar}></div>
      </Link>
    </div>
  );
}
