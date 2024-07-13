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
export default function DesktopTable({
  data,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  setOrderBy,
}) {
  return (
    <div className={style_tbl.container}>
      <table>
        <thead>
          <tr>
            <th>
              <center>
                <DropDown
                  listOfItems={[{ label: "BradleyGuanto" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Username",
                    label: "Username",
                  }}
                  Custom_width="130px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <DropDown
                  listOfItems={[{ label: "1 level", label: "2 level" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Level",
                    label: "Level",
                  }}
                  Custom_width="130px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Value"}
                  width={"130px"}
                  onClick={() => {
                    setOrderBy("amount");
                  }}
                />
              </center>
            </th>
            <th>
              <center>
                <DropDown
                  listOfItems={[
                    { label: "Onchain", label: "Pending", label: "Offchain" },
                  ]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Status",
                    label: "Status",
                  }}
                  Custom_width="130px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <DropDown
                  listOfItems={[]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Day",
                    label: "Day",
                  }}
                  Custom_width="130px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <TxtTblButton title={"To"} width={"130px"} />
              </center>
            </th>
            <th>
              <center>
                <TxtTblButton title={"PТT Wallet"} width={"130px"} />
              </center>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>
                <label className="txt_Body3">{item["1"]}</label>
              </td>
              <td>
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["2"]}
                </label>
              </td>
              <td>
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["3"]}
                </label>
              </td>
              <td>
                <div>
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
                </div>
              </td>
              <td>
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["5"]}
                </label>
              </td>
              <td>
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["6"]}
                </label>
              </td>
              <td>
                <label className="txt_Body3">
                  <b>{item["7"]}</b>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
