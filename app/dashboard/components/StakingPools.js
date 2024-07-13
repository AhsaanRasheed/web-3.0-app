"use client";
import React, { useEffect, useState } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";

export default function StakingPools({ isMobileView, stakingPoolData }) {
  return (
    <div className={style.PageCard}>
      <div className={style.PageCardBody}>
        <div className={style.pageHeadingRow}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              minWidth: "24px",
              maxWidth: "24px",
              width: "24px",
              minHeight: "24px",
              maxHeight: "24px",
              height: "24px",
            }}
          >
            <path
              d="M21.75 9.75C21.75 12.2353 17.3848 14.25 12 14.25M21.75 9.75C21.75 7.26472 17.3848 5.25 12 5.25C6.61522 5.25 2.25 7.26472 2.25 9.75M21.75 9.75V14.25C21.75 16.5 18 18.75 12 18.75M12 14.25C6.61522 14.25 2.25 12.2353 2.25 9.75M12 14.25V18.75M2.25 9.75V14.25C2.25 16.5 6 18.75 12 18.75M18 13.3218V17.8218M6 13.3218V17.8218"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <label
            className={`${
              isMobileView
                ? mainStyle.title_semibold_16
                : mainStyle.title_semibold_20
            }`}
          >
            Staking Pools
          </label>
        </div>
        <div
          style={{
            minHeight: "16px",
            height: "16px",
            minWidth: "16px",
            width: "16px",
          }}
        ></div>

        <div className={style.StakePoolContainer}>
          <div className={style.left}>
            <div className={style.top}>
              <div>
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.body_regular_12
                      : mainStyle.body_regular_14
                  }`}
                >
                  Total Balance
                </label>
              </div>
              <div
                style={{
                  height: "8px",
                  width: "8px",
                  minHeight: "8px",
                  minWidth: "8px",
                }}
              ></div>

              <div className={style.valueBar}>
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.title_semibold_20
                      : mainStyle.title_semibold_24
                  }`}
                >
                  <label style={{ color: "#5BF4AB" }}>PTT</label>{" "}
                  {stakingPoolData.balance.toFixed(2)}{" "}
                </label>{" "}
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.body_medium_12
                      : mainStyle.body_medium_16
                  }`}
                  style={{ color: "#BEBEBE", marginLeft: "4px" }}
                >
                  {" "}
                  ~ € {(stakingPoolData.balance * 0.1).toFixed(2)}
                </label>
              </div>
            </div>
            <div
              style={{
                height: "10px",
                width: "10px",
                minHeight: "10px",
                minWidth: "10px",
              }}
            ></div>
            <div className={style.mid}>
              <div>
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.body_regular_12
                      : mainStyle.body_regular_14
                  }`}
                >
                  Total PTT claimed
                </label>
              </div>
              <div
                style={{
                  height: "8px",
                  width: "8px",
                  minHeight: "8px",
                  minWidth: "8px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: isMobileView ? "flex-start" : "center",
                  flexDirection: isMobileView ? "column" : "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div className={style.valueBar}>
                  <label
                    className={`${
                      isMobileView
                        ? mainStyle.title_semibold_20
                        : mainStyle.title_semibold_24
                    }`}
                  >
                    <label style={{ color: "#5BF4AB" }}>PTT</label>{" "}
                    {stakingPoolData.claimed.toFixed(2)}{" "}
                  </label>{" "}
                  <label
                    className={`${
                      isMobileView
                        ? mainStyle.body_medium_12
                        : mainStyle.body_medium_16
                    }`}
                    style={{ color: "#BEBEBE", marginLeft: "4px" }}
                  >
                    {" "}
                    ~ € {(stakingPoolData.claimed * 0.1).toFixed(2)}
                  </label>
                </div>
                {isMobileView && (
                  <div style={{ width: "16px", height: "16px" }} />
                )}
                <div className={style.linkBtn}>
                  <label className={mainStyle.body_medium_14}>History</label>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9.16667V13.1667C12 13.5203 11.8595 13.8594 11.6095 14.1095C11.3594 14.3595 11.0203 14.5 10.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V5.83333C2 5.47971 2.14048 5.14057 2.39052 4.89052C2.64057 4.64048 2.97971 4.5 3.33333 4.5H7.33333"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2.5H14V6.5"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.66602 9.83333L13.9993 2.5"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "10px",
                width: "10px",
                minHeight: "10px",
                minWidth: "10px",
              }}
            ></div>
            <div className={style.btm}>
              <div>
                <label className={mainStyle.title_medium_20}>
                  Staking Pools
                </label>
              </div>
              {isMobileView && (
                <div style={{ height: "16px", width: "16px" }} />
              )}
              <table className={mainStyle.table}>
                <thead>
                  <tr>
                    <th></th>
                    <th style={{ width: "100%" }}>Pools</th>
                    <th
                      style={{ textAlign: isMobileView ? "center" : "right" }}
                    >
                      APY
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div
                        style={{
                          marginRight: "17px",
                          width: "7px",
                          minHeight: "24px",
                          height: "100%",
                          flexShrink: 0,
                          alignSelf: "stretch",
                          borderRadius: "10px",
                          background: "#A0F7FF",
                          boxShadow:
                            "0px 0px 14.4px 0px #A0F7FF, 0px 0px 28.8px 0px #A0F7FF, 0px 0px 100.8px 0px #A0F7FF, 0px 0px 604.8px 0px #A0F7FF, 0px 0px 50px 0px #7EF4FF",
                        }}
                      ></div>
                    </td>
                    <td>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                      >
                        Silver
                      </label>
                    </td>
                    <td
                      style={{ textAlign: isMobileView ? "center" : "right" }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                        style={{
                          textAlign: isMobileView ? "center" : "right",
                          width: "100%",
                        }}
                      >
                        10%
                      </label>
                    </td>
                    <td>
                      <div>
                        <button className={style.poolBtn}>
                          <span>Select</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        style={{
                          marginRight: "17px",
                          width: "7px",
                          minHeight: "24px",
                          height: "100%",
                          flexShrink: 0,
                          alignSelf: "stretch",
                          borderRadius: "10px",
                          background: "#DE97FF",
                          boxShadow:
                            "0px 0px 14.4px 0px #BB2CFF, 0px 0px 28.8px 0px #BB2CFF, 0px 0px 100.8px 0px #BB2CFF, 0px 0px 604.8px 0px #BB2CFF, 0px 0px 100px 2px #BB2CFF",
                        }}
                      ></div>
                    </td>
                    <td>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                      >
                        Gold
                      </label>
                    </td>
                    <td
                      style={{ textAlign: isMobileView ? "center" : "right" }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                        style={{
                          textAlign: isMobileView ? "center" : "right",
                          width: "100%",
                        }}
                      >
                        100%
                      </label>
                    </td>
                    <td>
                      <div>
                        <button
                          className={style.poolBtn}
                          style={{
                            color: isMobileView ? "#DE97FF" : "",

                            background: isMobileView
                              ? "transparent"
                              : "#DE97FF",
                            boxShadow: isMobileView
                              ? "none"
                              : "0px 4px 18.6px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <span>Select</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        style={{
                          marginRight: "17px",
                          width: "7px",
                          minHeight: "24px",
                          height: "100%",
                          flexShrink: 0,
                          alignSelf: "stretch",
                          borderRadius: "10px",
                          background: "#63FFB4",
                          boxShadow:
                            "0px 0px 14.4px 0px #3EFFA3, 0px 0px 28.8px 0px #3EFFA3, 0px 0px 100.8px 0px #3EFFA3, 0px 0px 604.8px 0px #3EFFA3, 0px 0px 50px 2px #3EFFA3",
                        }}
                      ></div>
                    </td>
                    <td>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                      >
                        Diamond
                      </label>
                    </td>
                    <td
                      style={{ textAlign: isMobileView ? "center" : "right" }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.title_medium_16
                            : mainStyle.title_medium_20
                        }`}
                        style={{
                          textAlign: isMobileView ? "center" : "right",
                          width: "100%",
                        }}
                      >
                        200%
                      </label>
                    </td>
                    <td>
                      <div>
                        <button
                          className={style.poolBtn}
                          style={{
                            color: isMobileView ? "#5BF4AB" : "",
                            background: isMobileView
                              ? "transparent"
                              : "#5BF4AB",
                            boxShadow: isMobileView
                              ? "none"
                              : "0px 4px 18.6px 0px rgba(0, 0, 0, 0.25)",
                          }}
                        >
                          <span>Select</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              height: "10px",
              width: "10px",
              minHeight: "10px",
              minWidth: "10px",
            }}
          ></div>
          <div className={style.right}>
            <div className={style.top}>
              <div>
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.body_regular_12
                      : mainStyle.body_regular_14
                  }`}
                >
                  Pending Rewards
                </label>
              </div>
              <div
                style={{
                  height: "8px",
                  width: "8px",
                  minHeight: "8px",
                  minWidth: "8px",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: isMobileView ? "flex-start" : "center",
                  flexDirection: isMobileView ? "column" : "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div className={style.valueBar}>
                  <label
                    className={`${
                      isMobileView
                        ? mainStyle.title_semibold_20
                        : mainStyle.title_semibold_24
                    }`}
                  >
                    <label style={{ color: "#5BF4AB" }}>PTT</label>{" "}
                    {stakingPoolData.pending.toFixed(2)}{" "}
                  </label>{" "}
                  <label
                    className={`${
                      isMobileView
                        ? mainStyle.body_medium_12
                        : mainStyle.body_medium_16
                    }`}
                    style={{ color: "#BEBEBE", marginLeft: "4px" }}
                  >
                    {" "}
                    ~ € {(stakingPoolData.pending * 0.1).toFixed(2)}
                  </label>
                </div>
                {isMobileView && (
                  <div style={{ width: "16px", height: "16px" }} />
                )}
                <div className={style.linkBtn}>
                  <label className={mainStyle.body_medium_14}>History</label>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 9.16667V13.1667C12 13.5203 11.8595 13.8594 11.6095 14.1095C11.3594 14.3595 11.0203 14.5 10.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V5.83333C2 5.47971 2.14048 5.14057 2.39052 4.89052C2.64057 4.64048 2.97971 4.5 3.33333 4.5H7.33333"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 2.5H14V6.5"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.66602 9.83333L13.9993 2.5"
                      stroke="white"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "10px",
                width: "10px",
                minHeight: "10px",
                minWidth: "10px",
              }}
            ></div>
            <div className={style.btm}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <label className={mainStyle.title_medium_20}>
                  Soon to Unlock
                </label>
                <label
                  className={`${
                    isMobileView
                      ? mainStyle.body_light_14
                      : mainStyle.body_medium_16
                  } ${style.seeAll}`}
                >
                  See All
                </label>
              </div>
              <div
                style={{
                  height: isMobileView ? "16px" : "24px",
                  width: "16px",
                }}
              ></div>

              <table className={mainStyle.table}>
                <thead>
                  <tr>
                    <th
                      style={{
                        paddingLeft: !isMobileView && "24px",
                        textAlign: isMobileView ? "center" : "left",
                      }}
                    >
                      Pools
                    </th>
                    <th style={{ textAlign: "center" }}>Amount</th>
                    <th style={{ textAlign: "center" }}>Unlocks in</th>
                  </tr>
                </thead>
                <tbody>
                  {stakingPoolData.soontoUnlock.map((item) => (
                    <tr>
                      <td
                        style={{
                          paddingLeft: !isMobileView && "24px",
                          textAlign: isMobileView ? "center" : "left",
                        }}
                      >
                        <label className={mainStyle.body_medium_14}>
                          {item.pool}
                        </label>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <label className={mainStyle.body_medium_14}>
                          <label style={{ color: "#5BF4AB" }}>PTT </label>{" "}
                          {item.amount}
                        </label>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <label className={mainStyle.body_medium_14}>
                          {item.unlockin}
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
