"use client";
import DataTable from "@/app/_components/DataTable";
import React, { useState, useEffect } from "react";
import styles from "../../style.module.scss";
import style_tbl from "../../../DataTableGlobal.module.scss";
import { get_user_referrals } from "@/app/services/service";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import Tags from "@/app/_components/global/Tags/Tags";

import Pagination from "@/app/_components/global/Pagination";
import Link from "next/link";
("react");

export default function MobileTable({
  data,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  setOrderBy,
}) {
  return (
    <div className={style_tbl.container}>
      <div className={style_tbl.mobtable}>
        <div className={style_tbl.mobthead}>
          <div className={style_tbl.mobtr}>
            <div className={style_tbl.mobth}>
              <div>
                <DropDown
                  listOfItems={[{ label: "BradleyGuanto" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Username",
                    label: "Username",
                  }}
                  Custom_width="135px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <DropDown
                  listOfItems={[
                    { label: "Onchain", label: "Pending", label: "Offchain" },
                  ]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Status",
                    label: "Status",
                  }}
                  Custom_width="135px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <DropDown
                  listOfItems={[{ label: "1 level", label: "2 level" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Level",
                    label: "Level",
                  }}
                  Custom_width="135px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Value"}
                  width={"135px"}
                  onClick={() => {
                    setOrderBy("amount");
                  }}
                />
              </div>
            </div>

            <div className={style_tbl.mobth}>
              <div>
                <DropDown
                  listOfItems={[]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Day",
                    label: "Day",
                  }}
                  Custom_width="90px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <TxtTblButton title={"To"} width={"85px"} />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <TxtTblButton title={"PТT Wallet"} width={"85px"} />
              </div>
            </div>
          </div>
        </div>
        <div className={style_tbl.mobtbody}>
          {data.map((item) => (
            <MobileTableRow item={item} />
          ))}
        </div>
      </div>

      <Pagination
        className={style_tbl.paginationbar}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={(v) => onPageChange(v)}
      />
    </div>
  );
}

const MobileTableRow = ({ item }) => {
  const [openRow, setOpenRow] = useState(false);
  return (
    <div className={`${style_tbl.mobtr} ${openRow ? style_tbl.mobtrOpen : ""}`}>
      <div className={style_tbl.mobtrTop}>
        <label className="txt_Body3">{item["1"]}</label>

        {item["8"] ? (
          <Link
            href={`https://mumbai.polygonscan.com/tx/${item["8"]}`}
            target="_blank"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <Tags type={item["4"]} />
          </Link>
        ) : (
          <Tags type={item["4"]} />
        )}

        <div
          onClick={() => setOpenRow(!openRow)}
          style={{ marginLeft: "3px", marginRight: "3px" }}
        >
          <DownArrowIcon />
        </div>
      </div>
      <MobileTableRowBody item={item} />
    </div>
  );
};

const MobileTableRowBody = ({ item }) => {
  return (
    <div className={`${style_tbl.mobtrBottom}`}>
      <div className={style_tbl.mobtrBottomtbl}>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Level
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            {item["2"]}
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Value
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            {item["3"]}
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Day
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            {item["5"]}
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            To
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            {item["6"]}
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            PTT Wallet
          </label>
          <label className="txt_Body3">
            <b>{item["7"]}</b>
          </label>
        </div>
      </div>
    </div>
  );
};
const DownArrowIcon = () => {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.99966 6.66175C5.87914 6.66175 5.76697 6.64252 5.66314 6.60405C5.55929 6.56558 5.46057 6.49956 5.36699 6.40597L0.872761 1.91175C0.734294 1.7733 0.663461 1.59927 0.660261 1.38965C0.657044 1.18003 0.727878 1.00279 0.872761 0.857924C1.01763 0.713057 1.19326 0.640625 1.39966 0.640625C1.60606 0.640625 1.78169 0.713057 1.92656 0.857924L5.99966 4.93102L10.0728 0.857924C10.2112 0.719474 10.3852 0.648641 10.5949 0.645424C10.8045 0.642224 10.9817 0.713057 11.1266 0.857924C11.2714 1.00279 11.3439 1.17843 11.3439 1.38485C11.3439 1.59125 11.2714 1.76688 11.1266 1.91175L6.63234 6.40597C6.53875 6.49956 6.44004 6.56558 6.33619 6.60405C6.23235 6.64252 6.12018 6.66175 5.99966 6.66175Z"
        fill="#596170"
      />
    </svg>
  );
};

const SortingTblButton = ({ title, width, onClick }) => {
  return (
    <div style={{ width: width, maxWidth: width }}>
      <button
        type="button"
        style={{
          width: width,
          height: "32px",
          borderRadius: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "var(--primary-Blue-weak-color)",
          border: "none",
          color: "#fff",
          paddingLeft: "10px",
          paddingRight: "5px",
          cursor: "pointer",
        }}
        onClick={() => onClick()}
      >
        <label className="txt_Body2">{title}</label> <SortingIcon />
      </button>
    </div>
  );
};
const TxtTblButton = ({ title, width }) => {
  return (
    <button
      type="button"
      style={{
        width: width,
        height: "32px",
        borderRadius: "48px",

        backgroundColor: "var(--primary-Blue-weak-color)",
        border: "none",
        color: "#fff",

        cursor: "pointer",
      }}
    >
      <label className="txt_Body2">{title}</label>
    </button>
  );
};
const SortingIcon = () => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.90033 13.7675C9.21275 13.4551 9.71928 13.4551 10.0317 13.7675L12.666 16.4018L15.3003 13.7675C15.6127 13.4551 16.1193 13.4551 16.4317 13.7675C16.7441 14.0799 16.7441 14.5865 16.4317 14.8989L13.2317 18.0989C12.9193 18.4113 12.4127 18.4113 12.1003 18.0989L8.90033 14.8989C8.58791 14.5865 8.58791 14.0799 8.90033 13.7675Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.4317 9.56647C16.1193 9.87889 15.6127 9.87889 15.3003 9.56647L12.666 6.93215L10.0317 9.56647C9.71928 9.87889 9.21275 9.87889 8.90033 9.56647C8.58791 9.25405 8.58791 8.74752 8.90033 8.4351L12.1003 5.2351C12.4127 4.92268 12.9193 4.92268 13.2317 5.2351L16.4317 8.4351C16.7441 8.74751 16.7441 9.25405 16.4317 9.56647Z"
        fill="white"
      />
    </svg>
  );
};
