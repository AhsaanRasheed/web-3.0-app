"use client";
import React from "react";
import "./style.css";
import "./styleBigData.css";

import CheckBox from "@/app/_components/CheckBox";

export default function DesktopViewTbl({ header, data }) {
  return (
    <div>
      {/* Table Start */}
      <div
        className={
          (header && header.length) >= 8 ? "desktop_tbl_bigdata" : "desktop_tbl"
        }
      >
        <table>
          <thead>
            <tr>
              {header.map((item, index) => (
                <th
                  key={index}
                  className={`${item.size === "l" ? "large" : "small"}`}
                >
                  <div
                    className={`${item.size === "l" ? "l" : ""} ${
                      item.lbl === "" ? "nolbl" : ""
                    }`}
                  >
                    {item.dropdown ? (
                      <>
                        <select>
                          {item.dropdownValue.map((opt, index) => (
                            <option key={index} value="opt">
                              {opt}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : item.isCheckBox ? (
                      <CheckBox label="" id={0} isChecked={false} />
                    ) : (
                      <p>{item.lbl}</p>
                    )}

                    {item.sortingAllowed && (
                      <img src="/icons/updownArrow.png" alt="arrowUpDown" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {header.map((item0, index) => (
                  <td key={index}>
                    <div className={`${item0.size === "l" ? "l" : ""}`}>
                      {item0.btnType === "none" &&
                      item0.avatar === "none" &&
                      !item0.isCheckBox ? (
                        item0.boldlbl ? (
                          <b style={{ color: "#fff" }}>{item[item0.id]}</b>
                        ) : (
                          item[item0.id]
                        )
                      ) : (
                        ""
                      )}
                      {item0.isCheckBox && (
                        <CheckBox label="" id={0} isChecked={false} />
                      )}
                      {item0.btnType === "none" && item0.avatar === "AT" ? (
                        <>
                          <img src={item.avatar_path} alt="avatar" />
                          {item[item0.id]}
                        </>
                      ) : (
                        ""
                      )}
                      {item0.btnType === "none" && item0.avatar === "IT" ? (
                        <>
                          <img
                            src={
                              item[item0.id].img === "U"
                                ? "/icons/GreenUpArrow.png"
                                : "/icons/RedDownArrow.png"
                            }
                            style={{ width: "10px", height: "12px" }}
                            alt="arrow"
                          />
                          {item[item0.id].lbl}
                        </>
                      ) : (
                        ""
                      )}
                      {item0.btnType === "default" ? (
                        <>
                          <button
                            type="button"
                            className={
                              item[item0.id] === "Withdraw"
                                ? "default_withdraw_btn"
                                : "default_locked_btn"
                            }
                          >
                            {item[item0.id]}
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                      {item0.btnType === "default_Menu" ? (
                        <>
                          <button
                            type="button"
                            className={"default_withdraw_btn"}
                          >
                            {item[item0.id]}
                          </button>
                          <img
                            src="/icons/MenuDots.png"
                            style={{
                              width: "3px",
                              height: "14px",
                              marginLeft: "8px",
                            }}
                            alt="Menu"
                          />
                        </>
                      ) : (
                        ""
                      )}
                      {item0.btnType === "status" ? (
                        <>
                          <button
                            type="button"
                            className={
                              item[item0.id] === "Onchain"
                                ? "status_btn status_btn_onchain"
                                : "status_btn status_btn_pending"
                            }
                          >
                            {item[item0.id]}
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Tbl End */}
    </div>
  );
}
