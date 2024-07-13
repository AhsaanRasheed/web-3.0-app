"use client";
import React, { useEffect, useState } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";
import Link from "next/link";
export default function Ranking({ isMobileView, topRanker }) {
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
            d="M8.99976 21H14.9998M11.9998 17.25V21M18.5809 12H19.4997C20.2953 12 21.0584 11.6839 21.621 11.1213C22.1836 10.5587 22.4997 9.79565 22.4997 9V7.5C22.4997 7.30109 22.4207 7.11032 22.28 6.96967C22.1394 6.82902 21.9486 6.75 21.7497 6.75H18.7497M5.43711 12H4.49023C3.69458 12 2.93152 11.6839 2.36891 11.1213C1.8063 10.5587 1.49023 9.79565 1.49023 9V7.5C1.49023 7.30109 1.56925 7.11032 1.7099 6.96967C1.85056 6.82902 2.04132 6.75 2.24023 6.75H5.24023M5.24976 5.25V10.4156C5.24976 14.1375 8.23101 17.2219 11.9529 17.25C12.8432 17.2562 13.726 17.0862 14.5504 16.7497C15.3748 16.4133 16.1244 15.917 16.7562 15.2896C17.388 14.6622 17.8893 13.916 18.2315 13.094C18.5736 12.272 18.7498 11.3904 18.7498 10.5V5.25C18.7498 5.05109 18.6707 4.86032 18.5301 4.71967C18.3894 4.57902 18.1987 4.5 17.9998 4.5H5.99976C5.80084 4.5 5.61008 4.57902 5.46943 4.71967C5.32877 4.86032 5.24976 5.05109 5.24976 5.25Z"
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
          Rankings
        </label>
      </div>
      <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>
      <div className={style.RankContainer}>
        <div className={style.left}>
          <div className={style.top}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                className={`${
                  isMobileView
                    ? mainStyle.title_medium_16
                    : mainStyle.title_medium_20
                }`}
              >
                Whales Ranking
              </label>
              <Link href="/ranking/?s=Whales" style={{textDecoration:"none"}}>
              <label
                className={`${
                  isMobileView
                    ? mainStyle.body_light_14
                    : mainStyle.body_medium_16
                } ${style.seeAll}`}
              >
                See All
              </label></Link>
            </div>
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>

            <table className={mainStyle.table}>
              <thead>
                <tr>
                  <th style={{ minWidth: "32px", textAlign: "center" }}>#</th>

                  <th
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    Username
                  </th>
                  <th style={{ textAlign: "center" }}>
                    Staked <label style={{ color: "#5BF4AB" }}>PTT</label>
                  </th>
                  <th style={{ textAlign: "center" }}>
                    Total <label style={{ color: "#5BF4AB" }}>PTT</label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {topRanker.whales.map((item) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.rank}
                      </label>
                    </td>
                    <td
                      style={{
                        paddingLeft: !isMobileView && "12px",
                        textAlign: isMobileView && "center",
                      }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.username}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.StakedPTT}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.TotalPTT}
                      </label>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <div
                      style={{ textAlign: "center" }}
                      className={mainStyle.rank1td}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.whales.rank}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                        style={{
                          paddingLeft: !isMobileView && "12px",
                          textAlign: isMobileView ? "center" : "left",
                        }}
                      >
                        {topRanker.ranking.whales.username}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.whales.StakedPTT}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.rankLtd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.whales.TotalPTT}
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  <div style={{ height: "10px", width: "10px",minHeight: "10px", minWidth: "10px" }}></div>
          <div className={style.btm}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                className={`${
                  isMobileView
                    ? mainStyle.title_medium_16
                    : mainStyle.title_medium_20
                }`}
              >
                Quiz Master
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
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>

            <table className={mainStyle.table}>
              <thead>
                <tr>
                  <th style={{ minWidth: "32px", textAlign: "center" }}>#</th>

                  <th
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    Username
                  </th>
                  <th style={{ textAlign: "center" }}>Quizzed</th>
                  <th style={{ textAlign: "center" }}>Total XP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      1
                    </label>
                  </td>
                  <td
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      John Doe
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      125
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      1250
                    </label>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      2
                    </label>
                  </td>
                  <td
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      Gary
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      112
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      1050
                    </label>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      3
                    </label>
                  </td>
                  <td
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      Stanley
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      86
                    </label>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <label
                      className={`${
                        isMobileView
                          ? mainStyle.body_medium_12
                          : mainStyle.body_medium_14
                      }`}
                    >
                      150
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div
                      style={{ textAlign: "center" }}
                      className={mainStyle.rank1td}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        53
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                        style={{
                          paddingLeft: !isMobileView && "12px",
                          textAlign: isMobileView ? "center" : "left",
                        }}
                      >
                        Dario Hanke
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        21
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.rankLtd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        63
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
<div style={{ height: "10px", width: "10px",minHeight: "10px", minWidth: "10px" }}></div>
        <div className={style.right}>
          <div className={style.top}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                className={`${
                  isMobileView
                    ? mainStyle.title_medium_16
                    : mainStyle.title_medium_20
                }`}
              >
                Affiliates Ranking
              </label>
              <Link href="/ranking/?s=Affiliates" style={{textDecoration:"none"}}>
              <label
                className={`${
                  isMobileView
                    ? mainStyle.body_light_14
                    : mainStyle.body_medium_16
                } ${style.seeAll}`}
              >
                See All
              </label></Link>
            </div>
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>

            <table className={mainStyle.table}>
              <thead>
                <tr>
                  <th style={{ minWidth: "32px", textAlign: "center" }}>#</th>

                  <th
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    Username
                  </th>
                  <th style={{ textAlign: "center" }}>Lvl 1</th>
                  <th style={{ textAlign: "center" }}>Lvl 2</th>
                  <th style={{ textAlign: "center" }}>Lvl 3</th>
                </tr>
              </thead>
              <tbody>
                {topRanker.affiliates.map((item) => (
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.rank}
                      </label>
                    </td>
                    <td
                      style={{
                        paddingLeft: !isMobileView && "12px",
                        textAlign: isMobileView && "center",
                      }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.username}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.level1}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.level2}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.level3}
                      </label>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <div
                      style={{ textAlign: "center" }}
                      className={mainStyle.rank1td}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.affiliate.rank}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                        style={{
                          paddingLeft: !isMobileView && "12px",
                          textAlign: isMobileView ? "center" : "left",
                        }}
                      >
                        {topRanker.ranking.affiliate.username}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.affiliate.level1}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.affiliate.level2}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.rankLtd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.affiliate.level3}
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  <div style={{ height: "10px", width: "10px",minHeight: "10px", minWidth: "10px" }}></div>
          <div className={style.btm}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label
                className={`${
                  isMobileView
                    ? mainStyle.title_medium_16
                    : mainStyle.title_medium_20
                }`}
              >
                XP Ranking
              </label>
              <Link href="/ranking/?s=XP" style={{textDecoration:"none"}}>
              <label
                className={`${
                  isMobileView
                    ? mainStyle.body_light_14
                    : mainStyle.body_medium_16
                } ${style.seeAll}`}
              >
                
                See All
              </label></Link>
            </div>
            <div style={{ minHeight: "16px",height: "16px", minWidth: "16px", width: "16px" }}></div>

            <table className={mainStyle.table}>
              <thead>
                <tr>
                  <th style={{ minWidth: "32px", textAlign: "center" }}>#</th>

                  <th
                    style={{
                      paddingLeft: !isMobileView && "12px",
                      textAlign: isMobileView && "center",
                    }}
                  >
                    Username
                  </th>
                  <th style={{ textAlign: "center" }}>Games W/L</th>
                  <th style={{ textAlign: "center" }}>XP Score</th>
                </tr>
              </thead>
              <tbody>
                {
                  topRanker.xp.map((item)=>(
                    <tr>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.rank}
                      </label>
                    </td>
                    <td
                      style={{
                        paddingLeft: !isMobileView && "12px",
                        textAlign: isMobileView && "center",
                      }}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.username}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.game}
                      </label>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {item.sp_score}
                      </label>
                    </td>
                  </tr>
                  ))
                }
               
                
                <tr>
                  <td>
                    <div
                      style={{ textAlign: "center" }}
                      className={mainStyle.rank1td}
                    >
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.xp.rank}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                        style={{
                          paddingLeft: !isMobileView && "12px",
                          textAlign: isMobileView ? "center" : "left",
                        }}
                      >
                        {topRanker.ranking.xp.username}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.ranktd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.xp.game}
                      </label>
                    </div>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={mainStyle.rankLtd}>
                      <label
                        className={`${
                          isMobileView
                            ? mainStyle.body_medium_12
                            : mainStyle.body_medium_14
                        }`}
                      >
                        {topRanker.ranking.xp.sp_score}
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
