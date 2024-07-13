"use client";
import DataTable from "@/app/_components/DataTable";
import React, { useState, useEffect } from "react";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import styles from "../../../style.module.scss";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import style_tbl from "@/app/DataTableGlobal.module.scss";
import Tags from "@/app/_components/global/Tags/Tags";
import Pagination from "@/app/_components/global/Pagination";
import { get_stakes } from "@/app/services/service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

import Button from "@/app/_components/global/Button/Button";
export default function Table({ isMobileView }) {
  const [OverviewLstlbl, setOverviewLstlbl] = useState([]);
  const { toggleLoader } = useLoader();

  const [OverviewLst, setOverviewLst] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const get_value = async (page, perpage) => {
    toggleLoader(true);
    try {
    let res = await get_stakes(page, perpage);
    if (res.code == 200) {
      setTotalLength(res.data.Total);
      let currentDate = new Date();

      let tempLst = [];
      if (res.data.stakes)
        for (let i = 0; i < res.data.stakes.length; i++) {
          tempLst.push({
            1:
              res.data.stakes[i].stake_duration_index == 0
                ? "Silver"
                : res.data.stakes[i].stake_duration_index == 1
                ? "Gold"
                : res.data.stakes[i].stake_duration_index == 2
                ? "Diamond"
                : "-",
            2: res.data.stakes[i].stake_amount + " PTT",
            3: formatDate(res.data.stakes[i].start_time),
            4: formatUnlocksDate(res.data.stakes[i].end_time, currentDate),
            withdrawn:
              !res.data.stakes[i].withdrawn &&
              new Date(res.data.stakes[i].end_time) < currentDate,
          });
        }
      setOverviewLst(tempLst);
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };

  const onTblChange = (itemPerChanged, v) => {
    if (itemPerChanged) {
      setPageIndex(1);
      setItemPerPage(v);
      get_value(1, v);
    } else {
      setPageIndex(v);
      get_value(v, itemPerPage);
    }
  };
  useEffect(() => {
    get_value(1,10);
  }, []);
  // useEffect(() => {
  //   setPageIndex(1);
  //   // get_value();
  // }, [itemPerPage]);
  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div
        className={styles.card}
        style={{ minHeight: "calc(100dvh - 630px)" }}
      >
        <div
          className={styles.topBar}
          style={{ height: "32px", flexDirection: "row" }}
        >
          <label className="txt_Title1">Vesting</label>

          <div className={styles.rowCenter}>
            <label className="txt_Body3" style={{ marginRight: "15px" }}>
              Showing
            </label>
            <DropDown
              listOfItems={[{ label: 10 }, { label: 20 }, { label: 30 }]}
              onSelect={(v) => {
                onTblChange(true, v);
              }}
              DefaultValue={{
                value: itemPerPage,
                label: itemPerPage,
              }}
              Custom_width="67px"
              Custom_height="32px"
            />
          </div>
        </div>
        <br />
        {isMobileView ? (
          <MobileTable
            data={OverviewLst}
            pageSize={itemPerPage}
            currentPage={pageIndex}
            totalCount={totalLength}
            onPageChange={(page) => {
              onTblChange(false, page);
            }}
          />
        ) : (
          <DesktopTable
            data={OverviewLst}
            pageSize={itemPerPage}
            currentPage={pageIndex}
            totalCount={totalLength}
            onPageChange={(page) => {
              onTblChange(false, page);
            }}
          />
        )}
      </div>
    </div>
  );
}

function DesktopTable({
  data,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
}) {
  return (
    <div className={style_tbl.container}>
      <table>
        <thead>
          <tr>
            <th>
              <center>
                <DropDown
                  listOfItems={[
                    { label: "Gold" },
                    { label: "Silver" },
                    { label: "Diamond" },
                  ]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Pools",
                    label: "Pools",
                  }}
                  Custom_width="145px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Amount"}
                  width={"145px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Date staked"}
                  width={"145px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Uncloks in"}
                  width={"145px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <label></label>
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
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["4"]}
                </label>
              </td>

              <td>
                <label>
                  <Button
                    text={"Withdraw"}
                    Custom_width={"161px"}
                    Custom_minWidth={"161px"}
                    Custom_maxWidth={"161px"}
                    Custom_height={"27px"}
                    Custom_fontFamily={"txt_Caption"}
                    disable={true}
                  />
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
function MobileTable({
  data,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
}) {
  return (
    <div className={style_tbl.container}>
      <div className={style_tbl.mobtable}>
        <div className={style_tbl.mobthead}>
          <div className={style_tbl.mobtr}>
            <div className={style_tbl.mobth}>
              <div>
                <DropDown
                  listOfItems={[
                    { label: "Gold" },
                    { label: "Silver" },
                    { label: "Diamond" },
                  ]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Pools",
                    label: "Pools",
                  }}
                  Custom_width="135px"
                  Custom_height="32px"
                />
              </div>
            </div>

            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Amount"}
                  width={"135px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Date staked"}
                  width={"135px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Uncloks in"}
                  width={"135px"}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={style_tbl.mobtbody}>
          <MobileTableRow />
          <MobileTableRow />
          <MobileTableRow />
          <MobileTableRow />
          <MobileTableRow />
          <MobileTableRow />
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

const MobileTableRow = () => {
  const [openRow, setOpenRow] = useState(false);
  return (
    <div className={`${style_tbl.mobtr} ${openRow ? style_tbl.mobtrOpen : ""}`}>
      <div className={style_tbl.mobtrTop}>
        <label className="txt_Body3">Gold</label>

        <label>
          <Button
            text={"Withdraw"}
            Custom_width={"130px"}
            Custom_minWidth={"130px"}
            Custom_maxWidth={"130px"}
            Custom_height={"27px"}
            Custom_fontFamily={"txt_Caption"}
          />
        </label>

        <div
          onClick={() => setOpenRow(!openRow)}
          style={{ marginLeft: "3px", marginRight: "3px" }}
        >
          <DownArrowIcon />
        </div>
      </div>
      <MobileTableRowBody />
    </div>
  );
};

const MobileTableRowBody = () => {
  return (
    <div className={`${style_tbl.mobtrBottom}`}>
      <div className={style_tbl.mobtrBottomtbl}>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Amount
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            124 PTT
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Date staked
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            Feb 24, 2022
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Uncloks in
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            in 14 days
          </label>
        </div>
      </div>
    </div>
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
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
        onClick={() => onClick()}
      >
        <label
          className="txt_Body2"
          style={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          {title}
        </label>{" "}
        <SortingIcon />
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

const formatDate = (x) => {
  let date = new Date(x * 1000);
  return date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatUnlocksDate = (x, currentDate) => {
  let date = new Date(x * 1000);

  // Calculate the difference in milliseconds
  let differenceInMillis = date - currentDate;

  // Calculate the difference in days
  let differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

  // Construct the formatted string
  let formattedDate;

  if (differenceInDays === 0) {
    formattedDate = "today";
  } else if (differenceInDays === 1) {
    formattedDate = "tomorrow";
  } else if (differenceInDays > 1) {
    formattedDate = `in ${differenceInDays} days`;
  } else {
    formattedDate = `in ${differenceInDays} days ago`;
  }

  return formattedDate;
};
