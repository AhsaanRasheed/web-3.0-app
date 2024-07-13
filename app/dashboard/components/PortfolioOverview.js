"use client";
import React, { useEffect, useState } from "react";
import mainStyle from "../style.module.scss";
import style from "./style.module.scss";

export default function PortfolioOverview({
  isMobileView,
  portfolioOverviewData,
}) {
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
        >
          <path
            d="M2.04018 19.7501C1.76408 20.2284 1.92801 20.84 2.40633 21.1161C2.88465 21.3922 3.49622 21.2283 3.77232 20.7499L2.04018 19.7501ZM20.2277 20.7499C20.5038 21.2283 21.1154 21.3922 21.5937 21.1161C22.072 20.84 22.2359 20.2284 21.9598 19.7501L20.2277 20.7499ZM17 9C17 11.7614 14.7614 14 12 14V16C15.866 16 19 12.866 19 9H17ZM12 14C9.23858 14 7 11.7614 7 9H5C5 12.866 8.13401 16 12 16V14ZM7 9C7 6.23858 9.23858 4 12 4V2C8.13401 2 5 5.13401 5 9H7ZM12 4C14.7614 4 17 6.23858 17 9H19C19 5.13401 15.866 2 12 2V4ZM3.77232 20.7499C4.60606 19.3055 5.80535 18.1061 7.24962 17.2722L6.24954 15.5401C4.50121 16.5497 3.04944 18.0016 2.04018 19.7501L3.77232 20.7499ZM7.24962 17.2722C8.69389 16.4382 10.3323 15.9992 12 15.9992V13.9992C9.98115 13.9992 7.99787 14.5306 6.24954 15.5401L7.24962 17.2722ZM12 15.9992C13.6677 15.9992 15.3061 16.4382 16.7504 17.2722L17.7505 15.5401C16.0021 14.5306 14.0189 13.9992 12 13.9992V15.9992ZM16.7504 17.2722C18.1947 18.1061 19.3939 19.3055 20.2277 20.7499L21.9598 19.7501C20.9506 18.0016 19.4988 16.5497 17.7505 15.5401L16.7504 17.2722Z"
            fill="white"
          />
        </svg>
        <label
          className={`${
            isMobileView
              ? mainStyle.body_semibold_16
              : mainStyle.title_semibold_20
          }`}
        >
          Portfolio Overview
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

      <div className={style.portfolioBar}>
        <div>
          {" "}
          <label
            className={mainStyle.body_regular_14}
            style={{ fontSize: isMobileView ? "12px" : "" }}
          >
            Total Portfolio Value
          </label>{" "}
        </div>
        {/* Testtttt */}
        <div className={style.btm}>
          <div className={style.valueBar}>
            <label
              className={mainStyle.title_semibold_24}
              style={{ fontSize: isMobileView ? "20px" : "" }}
            >
              <label style={{ color: "#5BF4AB" }}>PTT</label>{" "}
              {portfolioOverviewData.balance.toFixed(2)}{" "}
            </label>{" "}
            <label
              className={mainStyle.body_medium_16}
              style={{
                color: "#BEBEBE",
                marginLeft: "4px",
                fontSize: isMobileView ? "12px" : "",
              }}
            >
              {" "}
              ~ € {(portfolioOverviewData.balance * 0.1).toFixed(2)}
            </label>
          </div>
          <div className={style.linkBtn}>
            <label className={mainStyle.body_medium_14}>See transactions</label>
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
          minHeight: "16px",
          height: "16px",
          minWidth: "16px",
          width: "16px",
        }}
      ></div>

      <div className={style.PortbodyCardContainer}>
        <div className={style.left}>
          <div className={style.customCardTop}>
            <div className={style.topRow}>
              <label className={mainStyle.body_medium_16}>Top 3 Holdings</label>
              <label
                className={`${mainStyle.body_medium_16} ${style.seeAll}`}
                style={{ fontSize: isMobileView ? "14px" : "" }}
              >
                See All
              </label>
            </div>

            <div className={style.BtmRow}>
              {isMobileView ? (
                <svg
                  style={{
                    minWidth: "116px",
                    width: "116px",
                    maxWidth: "116px",
                    minHeight: "116px",
                    height: "116px",
                    maxHeight: "116px",
                  }}
                  width="116"
                  height="116"
                  viewBox="0 0 116 116"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M115 58.0002C115 45.6866 111.012 33.7041 103.634 23.8458C96.2559 13.9876 85.8836 6.78366 74.0696 3.31215C62.2555 -0.159366 49.6349 0.2882 38.0964 4.58787C26.5579 8.88753 16.7219 16.8081 10.0605 27.1642L31.6332 41.0404C35.2969 35.3445 40.7067 30.9882 47.0529 28.6234C53.399 26.2586 60.3404 26.0124 66.8381 27.9218C73.3359 29.8311 79.0406 33.7932 83.0987 39.2153C87.1567 44.6373 89.3498 51.2277 89.3498 58.0002H115Z"
                    fill="#D79A40"
                    stroke="#2B344F"
                  />
                  <path
                    d="M10.061 27.1641C5.97131 33.5221 3.18725 40.6301 1.87084 48.0744C0.55444 55.5186 0.732003 63.1504 2.39321 70.5254C4.05441 77.9004 7.16607 84.8712 11.547 91.0322C15.928 97.1931 21.4907 102.421 27.9114 106.412C34.3321 110.402 41.4824 113.076 48.9462 114.276C56.41 115.477 64.0381 115.181 71.3864 113.406C78.7347 111.631 85.6565 108.411 91.7488 103.935C97.841 99.4593 102.982 93.8162 106.873 87.3344L84.88 74.1339C82.7402 77.6989 79.9126 80.8026 76.5619 83.2644C73.2111 85.7262 69.4042 87.4969 65.3626 88.4733C61.321 89.4498 57.1256 89.6125 53.0205 88.9521C48.9154 88.2916 44.9827 86.8212 41.4513 84.6264C37.92 82.4316 34.8605 79.5562 32.4509 76.1677C30.0414 72.7792 28.33 68.9452 27.4164 64.889C26.5027 60.8327 26.405 56.6353 27.129 52.5409C27.8531 48.4466 29.3843 44.5371 31.6336 41.0402L10.061 27.1641Z"
                    fill="#A0F7FF"
                    stroke="#2B344F"
                  />
                  <path
                    d="M106.873 87.3344C112.192 78.4738 115.001 68.3341 115.001 58H89.3511C89.3511 63.6838 87.8059 69.2606 84.8809 74.1339L106.873 87.3344Z"
                    fill="#BB2CFF"
                    stroke="#2B344F"
                  />
                </svg>
              ) : (
                <svg
                  style={{
                    minWidth: "190px",
                    width: "190px",
                    maxWidth: "190px",
                    minHeight: "190px",
                    height: "190px",
                    maxHeight: "190px",
                  }}
                  width="190"
                  height="190"
                  viewBox="0 0 190 190"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M189.001 95C189.001 74.6935 182.425 54.9329 170.257 38.6755C158.09 22.418 140.985 10.5379 121.502 4.813C102.019 -0.911931 81.2061 -0.173842 62.1777 6.91682C43.1494 14.0075 26.9288 27.0694 15.9434 44.1479L51.5192 67.0314C57.5612 57.6382 66.4825 50.4541 76.9481 46.5543C87.4136 42.6544 98.8607 42.2484 109.576 45.3972C120.292 48.5459 129.7 55.0799 136.392 64.0215C143.084 72.9631 146.701 83.8314 146.701 95H189.001Z"
                    fill="#D79A40"
                    stroke="#2B344F"
                  />
                  <path
                    d="M15.9426 44.1484C9.19828 54.6336 4.60703 66.3556 2.43612 78.632C0.265219 90.9085 0.558041 103.494 3.29756 115.656C6.03708 127.819 11.1686 139.314 18.3933 149.474C25.618 159.635 34.7916 168.256 45.3801 174.837C55.9685 181.418 67.7603 185.827 80.069 187.807C92.3776 189.787 104.957 189.299 117.075 186.372C129.194 183.444 140.609 178.135 150.655 170.753C160.702 163.372 169.18 154.066 175.596 143.376L139.328 121.607C135.799 127.486 131.136 132.605 125.61 136.665C120.085 140.724 113.807 143.644 107.142 145.255C100.476 146.865 93.5577 147.133 86.7879 146.044C80.0182 144.955 73.5327 142.53 67.709 138.911C61.8854 135.291 56.8399 130.549 52.8663 124.961C48.8927 119.373 46.0704 113.05 44.5637 106.361C43.0569 99.672 42.8959 92.7499 44.0899 85.9979C45.2839 79.2458 47.8091 72.7987 51.5184 67.0319L15.9426 44.1484Z"
                    fill="#A0F7FF"
                    stroke="#2B344F"
                  />
                  <path
                    d="M175.597 143.376C184.367 128.764 189 112.042 189 95H146.7C146.7 104.373 144.152 113.57 139.328 121.607L175.597 143.376Z"
                    fill="#BB2CFF"
                    stroke="#2B344F"
                  />
                </svg>
              )}

              <div className={style.details}>
                <div className={style.DRow}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background: " rgba(160, 247, 255, 1)",
                        borderRadius: "50%",
                        marginRight: "8px",
                        boxShadow:
                          "0px 0px 14.399999618530273px 0px rgba(160, 247, 255, 1), 0px 0px 28.799999237060547px 0px rgba(160, 247, 255, 1), 0px 0px 100.80000305175781px 0px rgba(160, 247, 255, 1), 0px 0px 604.7999877929688px 0px rgba(160, 247, 255, 1), 0px 0px 50px 0px rgba(126, 244, 255, 1)",
                      }}
                    />
                    <label
                      className={mainStyle.body_medium_16}
                      style={{ fontSize: isMobileView ? "14px" : "" }}
                    >
                      PTT
                    </label>
                  </div>
                  <label
                    className={mainStyle.body_medium_16}
                    style={{ fontSize: isMobileView ? "14px" : "" }}
                  >
                    - {"  "} 49%
                  </label>
                </div>
                <div style={{ width: "16px", height: "16px" }}></div>
                <div className={style.DRow}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#FFB13D",
                        borderRadius: "50%",
                        marginRight: "8px",
                        boxShadow:
                          "0px 0px 27.871200561523438px 0px rgba(255, 177, 61, 1), 0px 0px 97.54920196533203px 0px rgba(255, 177, 61, 1), 0px 0px 195px 0px rgba(255, 177, 61, 1)",
                      }}
                    />
                    <label
                      className={mainStyle.body_medium_16}
                      style={{ fontSize: isMobileView ? "14px" : "" }}
                    >
                      BTC
                    </label>
                  </div>
                  <label
                    className={mainStyle.body_medium_16}
                    style={{ fontSize: isMobileView ? "14px" : "" }}
                  >
                    - {"  "} 41%
                  </label>
                </div>
                <div style={{ width: "16px", height: "16px" }}></div>
                <div className={style.DRow}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        background: "#BB2CFF",
                        borderRadius: "50%",
                        marginRight: "8px",
                        boxShadow:
                          "0px 0px 14.399999618530273px 0px rgba(187, 44, 255, 1),  0px 0px 28.799999237060547px 0px rgba(187, 44, 255, 1),  0px 0px 100.80000305175781px 0px rgba(187, 44, 255, 1),  0px 0px 604.7999877929688px 0px rgba(187, 44, 255, 1),  0px 0px 100px 2px rgba(187, 44, 255, 1)",
                      }}
                    />
                    <label
                      className={mainStyle.body_medium_16}
                      style={{ fontSize: isMobileView ? "14px" : "" }}
                    >
                      FTT
                    </label>
                  </div>
                  <label
                    className={mainStyle.body_medium_16}
                    style={{ fontSize: isMobileView ? "14px" : "" }}
                  >
                    - {"  "} 10%
                  </label>
                </div>
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

          <div className={style.customCardBtm}>
            <div>
              <label
                className={mainStyle.body_medium_16}
                style={{ color: "#5BF4AB" }}
              >
                Prime Trader Token
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

            <table className={mainStyle.table}>
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Day</th>
                  <th>Week</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <label
                      className={mainStyle.body_semibold_16}
                      style={{ fontSize: isMobileView ? "12px" : "" }}
                    >
                      <label style={{ color: "#5BF4AB" }}>€ </label> 0.109514
                    </label>
                  </td>
                  <td>
                    <div>
                      <LossIcon />
                      <label
                        style={{
                          color: "#FF9D9D",
                          fontSize: isMobileView ? "12px" : "",
                        }}
                        className={mainStyle.body_regular_14}
                      >
                        0.8%
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <ProfitIcon />
                      <label
                        style={{
                          color: "#5BF4AB",
                          fontSize: isMobileView ? "12px" : "",
                        }}
                        className={mainStyle.body_regular_14}
                      >
                        7.5%
                      </label>
                    </div>
                  </td>
                  <td>
                    <div>
                      <ProfitIcon />
                      <label
                        style={{
                          color: "#5BF4AB",
                          fontSize: isMobileView ? "12px" : "",
                        }}
                        className={mainStyle.body_regular_14}
                      >
                        14.83%
                      </label>
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
          <div className={style.topRow}>
            <label className={mainStyle.body_medium_16}>
              Digital Collectibles
            </label>
            <label
              className={`${mainStyle.body_medium_16} ${style.seeAll}`}
              style={{ fontSize: isMobileView ? "14px" : "" }}
            >
              See All
            </label>
          </div>
          {/* <div style={{ height: "10px", width: "10px" }}></div> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                background: "#3EFFA3",
                borderRadius: "50%",
                marginRight: "10px",
                boxShadow:
                  "0px 0px 14.4px #3EFFA3, 0px 0px 28.8px #3EFFA3, 0px 0px 100.8px #3EFFA3, 0px 0px 604.8px #3EFFA3, 0px 0px 50px #3EFFA3",
              }}
            />

            <label
              className={mainStyle.body_medium_16}
              style={{ fontSize: isMobileView ? "14px" : "" }}
            >
              On Chain
            </label>
          </div>
          {/* <div style={{ height: "10px", width: "10px" }}></div> */}
          <div className={style.avatarContainer}>
            <div className={style.avatarCard}>
              <div className={style.BtmBar}>
                <div>
                  <label className={mainStyle.body_bold_16}>
                    NFT “Men PT1”
                  </label>
                </div>
                {/* <div style={{ height: "8px", width: "8px" }}></div> */}
                <div className={style.lRow}>
                  <div
                    className={style.btnCon}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isMobileView ? "space-between" : "",
                    }}
                  >
                    <div>
                      <label className={mainStyle.body_light_14}>
                        Highest bid
                      </label>
                      <br />
                      <label
                        className={mainStyle.title_semibold_20}
                        style={{ color: "#5BF4AB", marginRight: "4px" }}
                      >
                        PTT
                      </label>
                      <label className={mainStyle.title_semibold_20}>
                        {" "}
                        3000
                      </label>
                    </div>
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                      }}
                    ></div>
                    <div>
                      <label className={mainStyle.body_light_14}>
                        Rarity score
                      </label>
                      <br />

                      <label className={mainStyle.title_semibold_20}>
                        {" "}
                        81.5
                      </label>
                    </div>
                  </div>
                  <div className={style.btnCon}>
                    <button className={`${style.btn} ${style.btn4}`}>
                      <span>View</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

const ProfitIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      style={{
        minWidth: "17px",
        maxWidth: "17px",
        width: "17px",
        minHeight: "17px",
        maxHeight: "17px",
        height: "17px",
        marginRight: "4px",
      }}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2121_46700)">
        <path
          d="M15.8327 4.5L9.49935 10.8333L6.16602 7.5L1.16602 12.5"
          stroke="#5BF4AB"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.834 4.5H15.834V8.5"
          stroke="#5BF4AB"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2121_46700">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const LossIcon = () => {
  return (
    <svg
      width="17"
      height="17"
      style={{
        minWidth: "17px",
        maxWidth: "17px",
        width: "17px",
        minHeight: "17px",
        maxHeight: "17px",
        height: "17px",
        marginRight: "4px",
      }}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_2121_46692)">
        <path
          d="M15.6667 12.5L9.33333 6.16667L6 9.5L1 4.5"
          stroke="#FF9D9D"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.668 12.5H15.668V8.5"
          stroke="#FF9D9D"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2121_46692">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="matrix(1 0 0 -1 0.333984 16.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
