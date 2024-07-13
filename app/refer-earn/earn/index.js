"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "../style.module.scss";
import { get_user_referrals } from "@/app/services/service";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import DesktopTable from "./components/DesktopTable";
import MobileTable from "./components/MobileTable";
import style from "./style.module.scss";
import Select from "react-dropdown-select";
import Pagination from "@/app/_components/global/Pagination";
import "../../DataTableGlobal.scss";
import StatusChip from "@/app/_components/global/StatusChip";

import { get_earning_data } from "@/app/services/new_service";

export default function Earn({ isMobileView }) {
  // Tbl Start //////////////////////////////////
  const [TransactionLst, setTransactionLst] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(25);
  // Tbl End ///////////////////////////////
  const [orderTypeAsc, setOrderTypeAsc] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const { toggleLoader } = useLoader();

  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const itemPerPageoptions = [
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ];

  const getValue = async () => {
    toggleLoader(true);
    try {
      let va = await get_earning_data(
        pageIndex,
        itemPerPage,
        orderBy,
        orderTypeAsc ? "asc" : "desc"
      );
      setTotalLength(va.data.total);

      console.log(va.data);
      if (va.message == "ok") {
        setTransactionLst(va.data.earnings);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getValue();
  }, [pageIndex, itemPerPage, orderBy, orderTypeAsc]);

  return (
    <>
      <div className={style.mainCardCustom}>
        <div style={{ width: "100%", padding: "0" }}>
          <div className={style.card}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobileView ? "center" : "flex-end",
              }}
            >
              <div>
                <label className={style.headerTitle}>Transactions</label>
                {!isMobileView && (
                  <p className={style.subTitle}>
                    This is a subtitle which describes the block
                  </p>
                )}
              </div>
              <div
                className={style.topBar}
                style={{
                  height: "32px",
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div className={"TblPageViewdropdown"}>
                  <label className={"TblPageViewdropdown_lbl"}>Show</label>
                  <Select
                    style={{
                      fontFamily: "var(--Gilroy)",
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
                    values={[{ value: itemPerPage, label: itemPerPage }]}
                    search={(e) => handleInputChange(e)}
                    onChange={(value) => {
                      const selected = value.length > 0 ? value[0].value : null;
                      setItemPerPage(selected);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="OurCustomTblContainer">
              <div className="OurCustomTblContainer_content">
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>
                        <div className="OurCustomTblContainer_alignRow">
                          <label>Level</label>{" "}
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("level");
                            }}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="OurCustomTblContainer_alignRow">
                          <label> Amount </label>
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("amount");
                            }}
                          />
                        </div>
                      </th>

                      <th className="OurCustomTblContainer_hideOnMobile">
                        <div className="OurCustomTblContainer_alignRow">
                          <label>Timestamp </label>
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("created_at");
                            }}
                          />
                        </div>
                      </th>
                      <th className="OurCustomTblContainer_hideOnMobile">
                        <div className="OurCustomTblContainer_alignRow">
                          <label>Status</label>{" "}
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("status");
                            }}
                          />
                        </div>
                      </th>
                      <th className="OurCustomTblContainer_MobSideArrowModalOpen_th"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {TransactionLst?.map((item) => (
                      <tr>
                        <td>{item.username}</td>
                        <td>Level {item.level}</td>
                        <td>
                          <span className={"highlight"}>PTV</span> {item.amount}
                        </td>
                        <td className="OurCustomTblContainer_hideOnMobile">
                          {convertDateFormat(item.created_at)}
                        </td>
                        <td className="OurCustomTblContainer_hideOnMobile">
                          <StatusChip
                            onClick={() => {
                              window.open(
                                "https://amoy.polygonscan.com" +
                                  "/tx/" +
                                  item.tx_hash
                              );
                            }}
                            status={item.status}
                            tooltipText={item.tx_hash}
                          />
                        </td>
                        <td className="OurCustomTblContainer_MobSideArrowModalOpen_td">
                          <SideMobModalOpenIcon
                            onModalOpen={() => {
                              setShowDetailsModal({
                                username: item.username,
                                amount: item.amount,
                                level: item.level,
                                status: item.status,
                                day: convertDateFormat(item.created_at),
                                tx_hash: item.tx_hash,
                              });
                            }}
                          />
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
                    {totalLength > 0
                      ? pageIndex * itemPerPage + 1 - itemPerPage
                      : 0}
                    -
                    {pageIndex * itemPerPage > totalLength
                      ? totalLength
                      : pageIndex * itemPerPage}
                  </label>{" "}
                  out of {totalLength}
                </label>
                <Pagination
                  className={"paginationbar"}
                  currentPage={pageIndex}
                  totalCount={totalLength}
                  pageSize={itemPerPage}
                  onPageChange={(v) => {
                    setPageIndex(v);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDetailsModal != null && (
        <MobModalRowDetails
          userInfo={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(null);
          }}
        />
      )}
    </>
  );
}

function truncateText(txt) {
  return txt.length > 13
    ? txt.slice(0, 6) + "..." + txt.slice(txt.length - 5, txt.length)
    : txt;
}

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
const SideMobModalOpenIcon = ({ onModalOpen }) => {
  return (
    <svg
      width="21"
      height="16"
      viewBox="0 0 21 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: "21px", minHeight: "16px", cursor: "pointer" }}
      onClick={onModalOpen}
    >
      <path
        d="M9.00006 12L8.06006 11.06L11.1134 8L8.06006 4.94L9.00006 4L13.0001 8L9.00006 12Z"
        fill="white"
      />
    </svg>
  );
};

const MobModalRowDetails = ({ userInfo, onClose }) => {
  // {
  //   username: item.username,
  //   amount: item.amount,
  //   level: item.level,
  //   status: item.status,
  //   day: convertDateFormat(item.created_at),
  //   tx_hash: item.tx_hash,
  // }
  const modalRef = useRef(null);

  const handleClick = (event) => {
    // Check if the click is outside the component-container
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  return (
    <div className={style.MobModalRowDetails} onClick={handleClick}>
      <div className={style.Modal} ref={modalRef}>
        <div className={style.topRow}>
          <div className={style.left}>
            <label>{userInfo.username}</label>
          </div>
          <div className={style.right}>
            <div className={style.levelCon}>
              <label>Level {userInfo.level}</label>
            </div>
            <CloseModalIcon onClick={onClose} />
          </div>
        </div>
        <div className={style.divider} />
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Status</label>
          </div>
          <div className={style.right}>
            <label
              className={
                userInfo.status == "onchain"
                  ? style.onChain
                  : userInfo.status == "offchain"
                  ? style.offChain
                  : style.pendingChain
              }
            >
              {userInfo.status == "onchain"
                ? "Onchain"
                : userInfo.status == "offchain"
                ? "Offchain"
                : "Pending"}
            </label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Amount</label>
          </div>
          <div className={style.right}>
            <label>
              <label className={style.ptvCon}>PTV </label> {userInfo.amount}
            </label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Day</label>
          </div>
          <div className={style.right}>
            <label>{userInfo.day}</label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>TX ID</label>
          </div>
          <div className={style.right}>
            <label className={style.link}>
              {truncateText(userInfo.tx_hash)}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const CloseModalIcon = ({ onClick }) => {
  return (
    <svg
      style={{ minWidth: "24px", minHeight: "25px" }}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M18 6.5L6 18.5"
        stroke="white"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.5L18 18.5"
        stroke="white"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
