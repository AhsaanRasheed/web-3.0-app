"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import styles from "../style.module.scss";
export default function DesktopView({ children, Data }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className={styles["navbar"]}>
          <ul>
            {Data.map((item, index, arr) => (
              <>
                <li
                  className={`${
                    search == item.title || (index == 0 && search == null)
                      ? styles["active"]
                      : ""
                  } ${
                    index == 0
                      ? styles["first"]
                      : index === arr.length - 1
                      ? styles["last"]
                      : search == arr[index - 1].title
                  }`}
                >
                  {" "}
                  <b className={styles["left-curve"]}></b>
                  <b className={styles["right-curve"]}></b>
                  <Link href={{ pathname: "", query: { s: item.title } }}>
                    <label
                      className="txt_Title1"
                      style={{
                        color:
                          search == item.title || (index == 0 && search == null)
                            ? "#fff"
                            : "var(--primary-Neutrals-medium-color)",
                      }}
                    >
                      {item.title}
                    </label>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </div>
        <div className={styles["below"]}>{children}</div>
      </div>
    </>
  );
}
