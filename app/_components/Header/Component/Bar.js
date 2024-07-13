"use client";
import React from "react";
import style from "../style.module.scss";

export default function Bar() {
  return (
    <div>
      <div className={style.flowrow}>
        <h1>My Profile</h1>
        <div className={style.flowrow}>
          {/* Badge */}
          <div className={style.flowrow}>
            <p>0x85xEa...1b857</p>
            <img
              src={"/icons/Line.png"}
              width={"24px"}
              height={"24px"}
              alt="line"
            />
          </div>
          <div>{/* Divider */}</div>
          {/* Notification Icon */}
          <img
            src={"/icons/bell.png"}
            width={"24px"}
            height={"24px"}
            alt="bell"
          />

          <div className={style.flowrow}>
            {/* Profile Img */}
            <img
              src={"/profile/Photo.png"}
              width={"40px"}
              height={"40px"}
              alt="user"
            />

            <img
              src={"/icons/DownArrow.png"}
              width={"10.68px"}
              height={"6.02px"}
              alt="arrowDown"
            />
          </div>
          <div>
            <h3>Dario Hanke</h3>
            <p>darhnk@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
