"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/app/_components/DataTable";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import styles from "../style.module.scss";
import InputTxt from "@/app/_components/global/Input/InputTxt";
import style_tbl from "../../DataTableGlobal.module.scss";
import Tags from "@/app/_components/global/Tags/Tags";
import Pagination from "@/app/_components/global/Pagination";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

import { get_user_transactions } from "@/app/services/service";
import Link from "next/link";
export default function Transaction({ isMobileView }) {
  const [demo2Lstlbl, setDemo2Lstlbl] = useState([]);
  const [demo2Lst, setDemo2Lst] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [orderTypeAsc, setOrderTypeAsc] = useState(false);
  const [orderBy, setOrderBy] = useState("created");
  const { toggleLoader } = useLoader();

  const getValue = async () => {
    toggleLoader(true);
    try {
    let va = await get_user_transactions(
      pageIndex,
      itemPerPage,
      orderBy,
      orderTypeAsc ? "asc" : "desc"
    );

    // console.log(va.data);

    let tempLst = [];
    try {
      setTotalLength(va.data.total);

      for (let i = 0; i < va.data.transactions.length; i++) {
        tempLst.push({
          1:
            va.data.transactions[i].type.charAt(0) +
            va.data.transactions[i].type.slice(1).toLowerCase(),

          2: shortTextLength(va.data.transactions[i].id),
          3:
            va.data.transactions[i].type == "RECEIVED"
              ? shortTextLength(
                  va.data.transactions[i].from_address.toLowerCase()
                )
              : shortTextLength(
                  va.data.transactions[i].to_address.toLowerCase()
                ),
          4: convertDateFormat(va.data.transactions[i].created),
          5: va.data.transactions[i].transfer_amount,
          6:
            va.data.transactions[i].state === "ONCHAIN" ? "Onchain" : "Pending",
          7: va.data.receiver_initial_balance==null?0:va.data.receiver_initial_balance,
          8: va.data.transactions[i].tx_hash,
        });
      }
      setDemo2Lst(tempLst);
    } catch (error) {
      console.log(error);
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  useEffect(() => {
    
    getValue();
    
  }, [pageIndex, itemPerPage, orderBy, orderTypeAsc]);
  useEffect(() => {
    setDemo2Lstlbl([
      {
        id: "1",
        lbl: "Type",
        sortingAllowed: false,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: false,
        dropdown: true,
        dropdownValue: ["Type", "Received", "Sent"],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "2",
        lbl: "Transaction ID",
        sortingAllowed: false,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "3",
        lbl: "From/To",
        sortingAllowed: false,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "4",
        lbl: "Time stamp",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "5",
        lbl: "Amount",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "6",
        lbl: "Status",
        sortingAllowed: false,
        size: "s",
        btnType: "status",
        avatar: "none",
        overflowHidden: false,
        dropdown: true,
        dropdownValue: ["Status", "Onchain", "Pending"],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "7",
        lbl: "PТT Wallet",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: true,
        isCheckBox: false,
      },
    ]);
  }, []);
  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div className={styles.card}>
        <div
          className={styles.topBar}
          style={{ height: "32px", flexDirection: "row" }}
        >
          <label className="txt_Title1">Transaction</label>

          <div className={styles.rowCenter}>
            <label className="txt_Body3" style={{ marginRight: "15px" }}>
              Showing
            </label>
            <DropDown
              listOfItems={[{ label: 10 }, { label: 20 }, { label: 30 }]}
              onSelect={(v) => {
                setItemPerPage(v);
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
            data={demo2Lst}
            pageSize={itemPerPage}
            currentPage={pageIndex}
            totalCount={totalLength}
            onPageChange={(page) => setPageIndex(page)}
            setOrderBy={(v) => {
              if (v == orderBy) {
                setOrderTypeAsc(!orderTypeAsc);
              } else {
                setOrderBy(v);
              }
            }}
          />
        ) : (
          <DesktopTable
            data={demo2Lst}
            pageSize={itemPerPage}
            currentPage={pageIndex}
            totalCount={totalLength}
            onPageChange={(page) => setPageIndex(page)}
            setOrderBy={(v) => {
              if (v == orderBy) {
                setOrderTypeAsc(!orderTypeAsc);
              } else {
                setOrderBy(v);
              }
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
                  listOfItems={[{ label: "Received" }, { label: "Sent" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Type",
                    label: "Type",
                  }}
                  Custom_width="130px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <TxtTblButton title={"Transaction ID"} width={"130px"} />
              </center>
            </th>
            <th>
              <center>
                <TxtTblButton title={"From/To"} width={"130px"} />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Time stamp"}
                  width={"145px"}
                  onClick={() => {
                    setOrderBy("created");
                  }}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Amount"}
                  width={"130px"}
                  onClick={() => {
                    setOrderBy("transfer_amount");
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
                  style={{
                    color: "var(--primary-Neutrals-medium-color)",
                  }}
                  className="txt_Body3"
                >
                  {item["2"]}
                </label>
              </td>
              <td>
                <label className="txt_Body3">{item["3"]}</label>
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
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  {item["5"]}
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
                      <Tags type={item["6"]} />
                    </Link>
                  ) : (
                    <Tags type={item["6"]} />
                  )}
                </div>
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
                  listOfItems={[{ label: "Received" }, { label: "Sent" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Type",
                    label: "Type",
                  }}
                  Custom_width="138px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <TxtTblButton title={"Transaction ID"} width={"145px"} />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Amount"}
                  width={"145px"}
                  onClick={() => {
                    setOrderBy("transfer_amount");
                  }}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Time stamp"}
                  width={"135px"}
                  onClick={() => {
                    setOrderBy("created");
                  }}
                />
              </div>
            </div>

            <div className={style_tbl.mobth}>
              <div>
                <TxtTblButton title={"From/To"} width={"81px"} />
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
                  Custom_width="85px"
                  Custom_height="32px"
                />
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
            <Tags type={item["6"]} />
          </Link>
        ) : (
          <Tags type={item["6"]} />
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
            Transaction ID
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
            From/To
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
            Time Stamp
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            {item["4"]}
          </label>
        </div>
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
            {item["5"]}
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

function convertDateFormat(dateString) {
  // Convert the provided date string to a Date object
  const date = new Date(dateString);

  // Format the date components as needed
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // Months are zero-indexed
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Create a formatted date string
  const formattedDate = `${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }.${year} ${hours}:${minutes < 10 ? "0" + minutes : minutes} CET`;

  return formattedDate;
}

function shortTextLength(txt) {
  return txt.length > 13
    ? txt.slice(0, 6) + "..." + txt.slice(txt.length - 5, txt.length)
    : txt;
}
