"use client";
import React, { useState } from "react";
import CheckBox from "@/app/_components/CheckBox";

import style from "./style.module.scss";
export default function MobileViewTbl({ header, data }) {
  // console.log(header);
  return (
    <div className={style.tbl_card}>
      <div className={style.header}>
        {/* Header Bar */}
        <div className={style.Row}>
          {/* Overflow Allowed */}
          {header.map((item, index) =>
            item.overflowHidden == false ? (
              <div
                key={index}
                className={`${style.tag} ${
                  item.lbl === "" && !item.isCheckBox ? style.nolbl : ""
                } ${item.size === "l" ? style.large : ""}`}
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
                  <img
                    className={style.updownArrow}
                    src="/icons/updownArrow.png"
                    alt="arrowUpDown"
                  />
                )}
              </div>
            ) : (
              <></>
            )
          )}
        </div>
        <div className={style.Row}>
          {/* Overflow DisAllowed */}
          {header.map(
            (item, index) =>
              item.overflowHidden && (
                <div
                  key={index}
                  className={`${style.tag} ${
                    item.lbl === "" && !item.isCheckBox ? style.nolbl : ""
                  } ${item.size === "l" ? style.large : ""}`}
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
                    <img
                      className={style.updownArrow}
                      src="/icons/updownArrow.png"
                      alt="arrowUpDown"
                    />
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <div className={style.tbody}>
        {data.map((item, index) => (
          <CustumRow key={index} item={item} header={header} />
        ))}
      </div>
    </div>
  );
}

const CustumRow = ({ item, header }) => {
  const [open, setOpen] = useState(false);
  console.log(item);
  return (
    <div className={`${style.TblRow} ${open && style.RowCardSelected}`}>
      {/* Row */}
      <div className={`${style.RowCardTopBar}`} onClick={() => setOpen(!open)}>
        {/* Top Bar */}

        {header.map(
          (item0, index) =>
            !item0.overflowHidden && (
              <div
                key={index}
                className={`${style.TblRowData} ${
                  item0.size === "l" ? style.large : ""
                }`}
              >
                {item0.btnType === "none" &&
                item0.avatar === "none" &&
                !item0.isCheckBox ? (
                  item0.boldlbl ? (
                    <p>
                      <b style={{ color: "#fff" }}>{item[item0.id]}</b>
                    </p>
                  ) : (
                    <p>{item[item0.id]}</p>
                  )
                ) : (
                  ""
                )}
                {item0.isCheckBox && (
                  <CheckBox label="" id={0} isChecked={false} />
                )}
                {item0.btnType === "none" && item0.avatar === "AT" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className={style.AT}
                      src={item.avatar_path}
                      alt="avatar"
                    />
                    <p>{item[item0.id]}</p>
                  </div>
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
                      style={{ width: "10px", height: "10px" }}
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
                          ? style.default_withdraw_btn
                          : style.default_locked_btn
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
                      className={style.default_withdraw_btn}
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
                          ? `${style.status_btn} ${style.status_btn_onchain}`
                          : `${style.status_btn}  ${style.status_btn_pending}`
                      }
                    >
                      {item[item0.id]}
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            )
        )}
        <img
          className={style.updownArrow}
          style={{ marginLeft: "3px", marginRight: "3px" }}
          src="/icons/downArrow.png"
          alt="arrowDown"
        />
      </div>
      {open && <CustumRowOverflowBar item={item} header={header} />}
    </div>
  );
};

const CustumRowOverflowBar = ({ item, header }) => {
  return (
    <div className={style.RowCardOverflowBar}>
      {/* Overflow Bar */}
      {header.map(
        (item0, index) =>
          item0.overflowHidden && (
            <div style={{ width: "100%" }} key={index}>
              {item0.btnType == "none" ? (
                <div className={style.Row}>
                  {item0.btnType == "none" && (
                    <p className={style.tbltitle}>{item0.lbl}</p>
                  )}
                  <div
                    className={`${style.TblRowData} ${
                      item0.size === "l" ? style.large : ""
                    }`}
                  >
                    {item0.btnType === "none" &&
                    item0.avatar === "none" &&
                    !item0.isCheckBox ? (
                      item0.boldlbl ? (
                        <p>
                          <b style={{ color: "#fff" }}>{item[item0.id]}</b>
                        </p>
                      ) : (
                        <p>{item[item0.id]}</p>
                      )
                    ) : (
                      ""
                    )}
                    {item0.btnType === "none" && item0.avatar === "AT" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className={style.AT}
                          src={item.avatar_path}
                          alt="avatar"
                        />
                        <p>{item[item0.id]}</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {item0.btnType === "none" && item0.avatar === "IT" ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={
                            item[item0.id].img === "U"
                              ? "/icons/GreenUpArrow.png"
                              : "/icons/RedDownArrow.png"
                          }
                          style={{
                            width: "10px",
                            height: "12px",
                            marginRight: "5px",
                          }}
                          alt="arrow"
                        />
                        <p>{item[item0.id].lbl}</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",

                    width: "100%",
                  }}
                >
                  {item0.btnType === "default" ? (
                    <>
                      <button
                        type="button"
                        className={
                          item[item0.id] === "Withdraw"
                            ? style.default_withdraw_btn
                            : style.default_locked_btn
                        }
                      >
                        {item[item0.id]}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                  {item0.btnType === "default_Menu" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <button
                        type="button"
                        className={style.default_withdraw_btn}
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
                    </div>
                  ) : (
                    ""
                  )}
                  {item0.btnType === "status" ? (
                    <>
                      <button
                        type="button"
                        className={
                          item[item0.id] === "Onchain"
                            ? `${style.status_btn} ${style.status_btn_onchain}`
                            : `${style.status_btn}  ${style.status_btn_pending}`
                        }
                      >
                        {item[item0.id]}
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          )
      )}
    </div>
  );
};
