"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import "../style.css";
export default function DesktopView({ children, Data }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const lineRef = useRef(null);

  // const updateLinePosition = () => {
  //   let activeItem = null;

  //   if (!activeItem) {
  //     activeItem = document.querySelector(".navbar li.active");
  //   }

  //   if (activeItem) {
  //     const line = lineRef.current;
  //     const activeItemOffsetLeft = activeItem.offsetLeft;

  //     line.style.width = (activeItem.clientWidth * 95) / 100 + "px";

  //     if (activeItemOffsetLeft < 50) {
  //       line.style.left =
  //         activeItemOffsetLeft + (activeItem.clientWidth * 2.5) / 100 + "px";
  //     } else {
  //       // requestAnimationFrame(() => {
  //       line.style.left =
  //         activeItemOffsetLeft + (activeItem.clientWidth * 2.5) / 100 + "px";
  //       // });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   updateLinePosition();
  // }, [search]);
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="navbar">
          <ul>
            {Data.map((item, index) => (
              <li
                className={`list-item  ${
                  search == item.title || (index == 0 && search == null)
                    ? "active"
                    : ""
                } ${index == 0 ? "first" : "other"}`}
              >
                <Link
                  // onClick={(e) => {
                  //   e.preventDefault();
                  // }}
                  href={{ pathname: "", query: { s: item.title } }}
                >
                  <label>{item.title}</label>
                  <div className="line"></div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">{children}</div>
      </div>
    </>
  );
}
