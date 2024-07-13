"use client";
import DataTable from "@/app/_components/DataTable";
import React, { useState, useEffect } from "react";
import { get_staking_history } from "@/app/services/service";

import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import style from "./style.module.scss";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import "../../DataTableGlobal.scss";
import Tags from "@/app/_components/global/Tags/Tags";
import Pagination from "@/app/_components/global/Pagination";
import Link from "next/link";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import Select from "react-dropdown-select";
import { get_stake_history } from "@/app/services/new_service";
import NewsDropdown from "./_comp/dropdown";
export default function History({
  isMobileView,
  stakingHistory,
  stakingHistoryLen,
  onPageIndexChangeHistory,
  itemPerPageHistory,
  setItemPerPageHistory,
  pageIndexHistory,
  setPageIndexHistory,
  ActionTypeHistoryTbl,
  setActionTypeHistoryTbl,
}) {
  // const [ActionType, setActionType] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const itemPerPageoptions = [
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ];
  const Actionoptions = [
    { value: "Un/Stake", label: "Un/Stake" },
    { value: "Stake", label: "Stake" },
    { value: "Unstake", label: "Unstake" },
    { value: "Claim", label: "Claim" },
  ];
  // useEffect(() => {
  //   onPageIndexChangeHistory(1, 25, "");
  // }, []);
  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div className={style.card}>
        <div
          className={style.topBar}
          style={{ height: "32px", flexDirection: "row" }}
        >
          <label className={style.maintitle}>Staking History</label>
          <div className={"TblPageViewdropdown"}>
            <label className={"TblPageViewdropdown_lbl"}>Show</label>
            <Select
              style={{
                fontFamily: "var(--GilroySemiBold)",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 1)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                //   padding: "12px 12px",
                padding: "4px 8px",
                height: "32px",
                minHeight: "32px",
                width: "52px",
              }}
              options={itemPerPageoptions}
              placeholder=""
              searchable={false}
              values={[
                {
                  value: itemPerPageHistory,
                  label: itemPerPageHistory,
                },
              ]}
              search={(e) => handleInputChange(e)}
              onChange={(value) => {
                const selected = value.length > 0 ? value[0].value : null;
                setItemPerPageHistory(selected);
                setPageIndexHistory(1);
                onPageIndexChangeHistory(1, selected, ActionTypeHistoryTbl);
              }}
            />
          </div>
        </div>
        <div className={style.DropDownOnMobile}>
          <NewsDropdown
            customWidth={"190px"}
            label={"Action:"}
            options={Actionoptions.map((item) => ({
              lbl: item.label,
              value: item.value,
              disable: false,
            }))}
            // onChange={(e) => getCategoriesFilter(e)}
            onChange={async (value) => {
              const selected = value?.value;
              await setActionTypeHistoryTbl(selected);
              //  setItemPerPageHistory(selected);
              setPageIndexHistory(1);
              onPageIndexChangeHistory(1, itemPerPageHistory, selected);
            }}
            selectedOtp={
              ActionTypeHistoryTbl == "Action"
                ? "Un/Stake"
                : ActionTypeHistoryTbl
            }
          />
        </div>
        <div className="OurCustomTblContainer">
          <div className="OurCustomTblContainer_content">
            <table>
              <thead>
                <tr>
                  <th className="OurCustomTblContainer_ShowOnMobile">Action</th>
                  <th className="dropdownTblFilter OurCustomTblContainer_hideOnMobile">
                    {" "}
                    <Select
                      style={{}}
                      options={Actionoptions}
                      placeholder=""
                      searchable={false}
                      values={[
                        {
                          value: ActionTypeHistoryTbl,
                          label: ActionTypeHistoryTbl,
                        },
                      ]}
                      search={(e) => handleInputChange(e)}
                      onChange={async (value) => {
                        const selected =
                          value.length > 0 ? value[0].value : null;
                        await setActionTypeHistoryTbl(selected);
                        //  setItemPerPageHistory(selected);
                        setPageIndexHistory(1);
                        onPageIndexChangeHistory(
                          1,
                          itemPerPageHistory,
                          selected
                        );
                      }}
                    />
                  </th>
                  <th>
                    <div className="OurCustomTblContainer_alignRow">
                      <label>Timestamp</label>{" "}
                      <SortingIcon
                        onClickSorting={() => {
                          setOrderBy("timestamp");
                        }}
                      />
                    </div>
                  </th>
                  <th>Token</th>
                  <th>
                    <div className="OurCustomTblContainer_alignRow">
                      <label>Amount</label>{" "}
                      <SortingIcon
                        onClickSorting={() => {
                          setOrderBy("amount");
                        }}
                      />
                    </div>
                  </th>
                  <th className="statusCol">
                    <div className="OurCustomTblContainer_alignRow">
                      <label>Status</label>{" "}
                      <SortingIcon
                        onClickSorting={() => {
                          setOrderBy("status");
                        }}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {stakingHistory.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.type == "unstake" && (
                        <>
                          <UnStakeIcon /> Unstake
                        </>
                      )}
                      {item.type == "stake" && (
                        <>
                          {" "}
                          <StakeIcon /> Stake
                        </>
                      )}
                      {item.type == "claim" && (
                        <>
                          {" "}
                          <ClaimIcon /> Claim
                        </>
                      )}
                      {item.type == "withdraw" && (
                        <>
                          {" "}
                          <WithdrawIcon /> Withdraw
                        </>
                      )}
                    </td>
                    <td>{convertDateFormat(item.date)}</td>
                    <td>
                      <PTVIcon />
                    </td>
                    <td>
                      {Number(Number(item.amount).toFixed(3)).toLocaleString()}
                    </td>
                    <td
                      className="statusColRow"
                      onClick={() => {
                        window.open(
                          "https://amoy.polygonscan.com" + "/tx/" + item.tx_hash
                        );
                      }}
                    >
                      <div className="OurCustomTblContainer_Status OurCustomTblContainer_OnChain">
                        <label>Onchain</label>
                        <div className="OurCustomTblContainer_Status OurCustomTblContainer_Status_tooltip">
                          <label>{truncateText(item.tx_hash)}</label>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "space-between",
            //   paddingTop: "20px",
            //   paddingRight: "28px",
            // }}
            className="OurCustomTblContainer_paginationContainer"
          >
            <label className="detailValues">
              Showing{" "}
              <label style={{ color: "#D376FF" }}>
                {stakingHistoryLen > 0
                  ? pageIndexHistory * itemPerPageHistory +
                    1 -
                    itemPerPageHistory
                  : 0}
                -
                {pageIndexHistory * itemPerPageHistory > stakingHistoryLen
                  ? stakingHistoryLen
                  : pageIndexHistory * itemPerPageHistory}
              </label>{" "}
              out of {stakingHistoryLen}
            </label>
            <Pagination
              className={"paginationbar"}
              currentPage={pageIndexHistory}
              totalCount={stakingHistoryLen}
              pageSize={itemPerPageHistory}
              onPageChange={(v) => {
                // console.log(v);
                setPageIndexHistory(v);
                onPageIndexChangeHistory(
                  v,
                  itemPerPageHistory,
                  ActionTypeHistoryTbl
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// function convertDateFormat(dateString) {
//   // Convert the provided date string to a Date object
//   const date = new Date(dateString);

//   // Format the date components as needed
//   const day = date.getUTCDate();
//   const month = date.getUTCMonth() + 1; // Months are zero-indexed
//   const year = date.getUTCFullYear();
//   const hours = date.getUTCHours();
//   const minutes = date.getUTCMinutes();

//   // Create a formatted date string
//   const formattedDate = `${day < 10 ? "0" + day : day}.${
//     month < 10 ? "0" + month : month
//   }.${year} ${hours}:${minutes < 10 ? "0" + minutes : minutes} CET`;

//   return formattedDate;
// }
function convertDateFormat(dateString) {
  // Convert the date string to a Date object
  const date = new Date(dateString);

  // Get the day, month, and year
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  // Get the hours and minutes
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Format the date components
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}, ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} CET`;

  return formattedDate;
}
const StakeIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ToHideSvg"
    >
      <path
        d="M12.4609 11.1145C15.5198 11.1145 17.9994 10.0124 17.9994 8.65294C17.9994 7.29347 15.5198 6.19141 12.4609 6.19141C9.40214 6.19141 6.92249 7.29347 6.92249 8.65294C6.92249 10.0124 9.40214 11.1145 12.4609 11.1145Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.92249 8.65234V16.037C6.92249 17.3908 9.38402 18.4985 12.4609 18.4985C15.5379 18.4985 17.9994 17.3908 17.9994 16.037V8.65234"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9994 12.3477C17.9994 13.7015 15.5379 14.8092 12.4609 14.8092C9.38402 14.8092 6.92249 13.7015 6.92249 12.3477"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3391 3.74158C10.9009 2.85403 9.22686 2.42479 7.53907 2.5108C4.47446 2.5108 2.00061 3.6185 2.00061 4.97235C2.00061 5.6985 2.71446 6.35081 3.84676 6.8185"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.84676 14.2034C2.71446 13.7357 2.00061 13.0834 2.00061 12.3573V4.97266"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.84676 10.5102C2.71446 10.0425 2.00061 9.39022 2.00061 8.66406"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const UnStakeIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ToHideSvg"
    >
      <path
        d="M18 12.9609L12.4615 18.4994"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4615 12.9609L18 18.4994"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.76923 7.71846C12.5078 7.71846 15.5385 6.55027 15.5385 5.10923C15.5385 3.6682 12.5078 2.5 8.76923 2.5C5.03068 2.5 2 3.6682 2 5.10923C2 6.55027 5.03068 7.71846 8.76923 7.71846Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5386 11.1155V5.10938"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 5.10938V13.4294C2 14.8694 5.00308 16.0263 8.76923 16.0386"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.76923 11.8788C5.07692 11.8788 2 10.7095 2 9.26953"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const WithdrawIcon = () => {
  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ToHideSvg"
    >
      <path
        d="M14.9286 4.81641H7.07146C6.67698 4.81641 6.35718 5.13621 6.35718 5.53069V18.9235C6.35718 19.318 6.67698 19.6378 7.07146 19.6378H14.9286C15.323 19.6378 15.6429 19.318 15.6429 18.9235V5.53069C15.6429 5.13621 15.323 4.81641 14.9286 4.81641Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0003 14.0128C11.9865 14.0128 12.786 13.2133 12.786 12.2271C12.786 11.2409 11.9865 10.4414 11.0003 10.4414C10.0141 10.4414 9.2146 11.2409 9.2146 12.2271C9.2146 13.2133 10.0141 14.0128 11.0003 14.0128Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.72249 7.07756H2.53163C2.34446 7.07756 2.16497 7.00231 2.03262 6.86836C1.90028 6.73441 1.82593 6.55272 1.82593 6.36328V2.07756C1.82593 1.88813 1.90028 1.70645 2.03262 1.57249C2.16497 1.43854 2.34446 1.36328 2.53163 1.36328H19.4685C19.6556 1.36328 19.835 1.43854 19.9675 1.57249C20.0998 1.70645 20.1742 1.88813 20.1742 2.07756V6.36328C20.1742 6.55272 20.0998 6.73441 19.9675 6.86836C19.835 7.00231 19.6556 7.07756 19.4685 7.07756H18.2776"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0006 7.97433C10.902 7.97433 10.822 7.89439 10.822 7.79576C10.822 7.69714 10.902 7.61719 11.0006 7.61719"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9998 7.97433C11.0984 7.97433 11.1783 7.89439 11.1783 7.79576C11.1783 7.69714 11.0984 7.61719 10.9998 7.61719"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0006 16.9157C10.902 16.9157 10.822 16.8357 10.822 16.7372C10.822 16.6385 10.902 16.5586 11.0006 16.5586"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9998 16.9157C11.0984 16.9157 11.1783 16.8357 11.1783 16.7372C11.1783 16.6385 11.0984 16.5586 10.9998 16.5586"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const ClaimIcon = () => {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ToHideSvg"
    >
      <path
        d="M10.0001 6.80859V14.1932"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.30872 10.5H13.6933"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.3078 2.5H5.69243C3.65323 2.5 2.00012 4.15311 2.00012 6.19231V14.8077C2.00012 16.847 3.65323 18.5 5.69243 18.5H14.3078C16.3471 18.5 18.0001 16.847 18.0001 14.8077V6.19231C18.0001 4.15311 16.3471 2.5 14.3078 2.5Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PTVIcon = () => {
  return (
    <svg
      width="27"
      height="12"
      viewBox="0 0 27 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.78 0.799999C5.78267 0.799999 6.62 1.136 7.292 1.808C7.964 2.48 8.3 3.31733 8.3 4.32C8.3 5.32267 7.964 6.16 7.292 6.832C6.62 7.504 5.78267 7.84 4.78 7.84H1.9V12H0.78V0.799999H4.78ZM4.78 6.784C5.47333 6.784 6.044 6.55467 6.492 6.096C6.95067 5.62667 7.18 5.03467 7.18 4.32C7.18 3.60533 6.95067 3.01867 6.492 2.56C6.044 2.09067 5.47333 1.856 4.78 1.856H1.9V6.784H4.78ZM16.945 0.799999V1.856H13.505V12H12.385V1.856H8.945V0.799999H16.945ZM21.5536 12L17.4256 0.799999H18.6416L22.1296 10.512L25.6176 0.799999H26.8336L22.7056 12H21.5536Z"
        fill="url(#paint0_linear_3736_59714)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3736_59714"
          x1="-0.5"
          y1="7.5"
          x2="70.5132"
          y2="7.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#45D3E8" />
          <stop offset="1" stop-color="#0CF54E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

function truncateText(txt) {
  return txt.length > 11
    ? txt.slice(0, 6) + "..." + txt.slice(txt.length - 5, txt.length)
    : txt;
}

const SortingIcon = ({ onClickSorting }) => {
  return (
    <div
      onClick={onClickSorting}
      style={{
        minWidth: "15px",
        minHeight: "22px",
        cursor: "pointer",
        marginLeft: "4px",
      }}
      className="OurCustomTblContainer_alignRow_sortingIcon"
    >
      <svg
        width="15"
        height="22"
        viewBox="0 0 15 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.90039 8.75L7.40039 5.25L10.9004 8.75"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.90039 13.25L7.40039 16.75L10.9004 13.25"
          stroke="white"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
