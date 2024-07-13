"use client";

import React, { useState, useEffect } from "react";
import "../style.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function MobileView({
  children,
  Data,
  setActiveItemParent,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  useEffect(()=>{
setOpenMenu(false);
  },[searchParams]);
  return (
    <div className="mobile_nav">
      <div
        className={`${openMenu && "dropdown_blur"}`}
        onClick={() => setOpenMenu(false)}
      ></div>
      <div class="dropdown ">
        <button class="dropdown-btn" onClick={() => setOpenMenu(!openMenu)}>
          <label className="txt_Title3">{search==null?Data[0].title:search}</label>
          <span class={`arrow ${openMenu && "arrow-rotate"}`}>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00034 0.33825C6.12086 0.33825 6.23303 0.357483 6.33686 0.39595C6.44071 0.434416 6.53943 0.500442 6.63301 0.594025L11.1272 5.08825C11.2657 5.2267 11.3365 5.40073 11.3397 5.61035C11.343 5.81997 11.2721 5.99721 11.1272 6.14208C10.9824 6.28694 10.8067 6.35937 10.6003 6.35937C10.3939 6.35937 10.2183 6.28694 10.0734 6.14208L6.00034 2.06898L1.92724 6.14208C1.78879 6.28053 1.61476 6.35136 1.40514 6.35458C1.19554 6.35778 1.01831 6.28694 0.87344 6.14208C0.728557 5.99721 0.656115 5.82157 0.656115 5.61515C0.656115 5.40875 0.728557 5.23312 0.87344 5.08825L5.36766 0.594025C5.46125 0.500442 5.55996 0.434416 5.66381 0.39595C5.76765 0.357483 5.87982 0.33825 6.00034 0.33825Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
        <ul
          class={`dropdown-content ${openMenu && "menu-open"}`}
          role="menu"
          id="dropdown-menu"
        >
          {Data.map((item) => (
            <li >
              <Link href={{ pathname: "", query: { s: item.title } }}>
                <label className="txt_Title3">{item.title}</label>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mobile_content">{children}</div>
    </div>
  );
}
