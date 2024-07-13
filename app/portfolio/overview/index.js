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
import Button from "@/app/_components/global/Button/Button";
import { get_balance_api } from "@/app/services/service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

export default function Overview({ isMobileView }) {
  const [demo2Lstlbl, setDemo2Lstlbl] = useState([]);
  const [demo2Lst, setDemo2Lst] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(1);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const { toggleLoader } = useLoader();

  const get_balance = async () => {
    toggleLoader(true);
    try {
    const resp = await get_balance_api();
    console.log(resp);
    setCurrentBalance(resp.data.ptt_balance);
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };

  useEffect(() => {
    setDemo2Lstlbl([
      {
        id: "1",
        lbl: "Token",
        sortingAllowed: false,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: false,
        dropdown: true,
        dropdownValue: ["Token", "BTC", "PTT", "ABT"],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "2",
        lbl: "Amount",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: false,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "3",
        lbl: "Price",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "none",
        overflowHidden: false,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "4",
        lbl: "Price Change",
        sortingAllowed: true,
        size: "s",
        btnType: "none",
        avatar: "IT",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
      {
        id: "5",
        lbl: "Total Value",
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
        lbl: "Today’s PnL",
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
        id: "7",
        lbl: "Today’s PnL %",
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
        id: "8",
        lbl: "Allocation",
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
        id: "9",
        lbl: "Action",
        sortingAllowed: false,
        size: "s",
        btnType: "default_Menu",
        avatar: "none",
        overflowHidden: true,
        dropdown: false,
        dropdownValue: [],
        boldlbl: false,
        isCheckBox: false,
      },
    ]);
    setDemo2Lst([
      {
        1: "PTT",
        2: "1,157",
        3: "0,109514",
        4: { lbl: "147.1", img: "U" },
        5: "5,267.21",
        6: "578.67",
        7: "5,24 %",
        8: "0,00348",
        9: "Buy",
      },
      {
        1: "PTT",
        2: "1,157",
        3: "0,109514",
        4: { lbl: "147.1", img: "D" },
        5: "5,267.21",
        6: "578.67",
        7: "5,24 %",
        8: "0,00348",
        9: "Buy",
      },
    ]);
    get_balance();
  }, []);
  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <div className={styles.left}>
            <label className="txt_Title1">Estimated Balance</label>
            <div className={styles.subHeading}>
              <label className="txt_Heading2">PTT {currentBalance}</label>
              <div className={styles.dot}></div>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body"
              >
                ~ € {(currentBalance * 0.1).toFixed(2)}
              </label>
            </div>
          </div>
          <div className={styles.centerSide}>
            <form class={styles.searchForm}>
              <InputTxt
                onChange={() => {}}
                value={""}
                placeHolder={"Search"}
                isSearch={true}
                Custom_width={"100%"}
                Custom_minWidth={"100%"}
                Custom_maxWidth={"100%"}
              />
            </form>
          </div>
          <div className={styles.right}>
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
            <div className={styles.rowCenter}>
              <CheckBox
                checked={hideSmallBalance}
                onChange={() => setHideSmallBalance(!hideSmallBalance)}
              />
              <label
                style={{
                  color: "var(--primary-Neutrals-medium-color)",
                  marginLeft: "15px",
                }}
                className="txt_Caption"
              >
                Hide Small Balance
              </label>
            </div>
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
          />
        ) : (
          <DesktopTable
            data={demo2Lst}
            pageSize={itemPerPage}
            currentPage={pageIndex}
            totalCount={totalLength}
            onPageChange={(page) => setPageIndex(page)}
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
                  listOfItems={[{ label: "PTT" }, { label: "BTC" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Token",
                    label: "Token",
                  }}
                  Custom_width="78px"
                  Custom_height="32px"
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Amount"}
                  width={"90px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Price"}
                  width={"72px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Price Change"}
                  width={"123px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Total Value"}
                  width={"110px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Today’s PnL"}
                  width={"115px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Today’s PnL %"}
                  width={"129px"}
                  onClick={() => {}}
                />
              </center>
            </th>
            <th>
              <center>
                <SortingTblButton
                  title={"Allocation"}
                  width={"103px"}
                  onClick={() => {}}
                />
              </center>
            </th>

            <th>
              <center>
                <TxtTblButton title={"Action"} width={"113px"} />
              </center>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                PTT
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                1,157
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,109514
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <UpArrowIcon />
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  147.1
                </label>
              </div>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,267.21
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                578.67
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,24 %
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,00348
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <label>
                  <Button
                    disable={true}
                    text={"Buy"}
                    Custom_width={"67px"}
                    Custom_minWidth={"67px"}
                    Custom_maxWidth={"67px"}
                    Custom_height={"27px"}
                    Custom_fontFamily={"txt_Caption"}
                  />
                </label>
                <label style={{ marginLeft: "10px", paddingTop: "5px" }}>
                  <MenuIcon />
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                PTT
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                1,157
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,109514
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <UpArrowIcon />
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  147.1
                </label>
              </div>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,267.21
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                578.67
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,24 %
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,00348
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <label>
                  <Button
                    disable={true}
                    text={"Buy"}
                    Custom_width={"67px"}
                    Custom_minWidth={"67px"}
                    Custom_maxWidth={"67px"}
                    Custom_height={"27px"}
                    Custom_fontFamily={"txt_Caption"}
                  />
                </label>
                <label style={{ marginLeft: "10px", paddingTop: "5px" }}>
                  <MenuIcon />
                </label>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                PTT
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                1,157
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,109514
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <UpArrowIcon />
                <label
                  style={{ color: "var(--primary-Neutrals-medium-color)" }}
                  className="txt_Body3"
                >
                  147.1
                </label>
              </div>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,267.21
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                578.67
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                5,24 %
              </label>
            </td>
            <td>
              <label
                style={{ color: "var(--primary-Neutrals-medium-color)" }}
                className="txt_Body3"
              >
                0,00348
              </label>
            </td>
            <td>
              <div className={styles.rowCenterTd}>
                <label>
                  <Button
                    disable={true}
                    text={"Buy"}
                    Custom_width={"67px"}
                    Custom_minWidth={"67px"}
                    Custom_maxWidth={"67px"}
                    Custom_height={"27px"}
                    Custom_fontFamily={"txt_Caption"}
                  />
                </label>
                <label style={{ marginLeft: "10px", paddingTop: "5px" }}>
                  <MenuIcon />
                </label>
              </div>
            </td>
          </tr>
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
                  listOfItems={[{ label: "PTT" }, { label: "BTC" }]}
                  onSelect={(v) => {}}
                  DefaultValue={{
                    value: "Token",
                    label: "Token",
                  }}
                  Custom_width="92px"
                  Custom_height="32px"
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Amount"}
                  width={"92px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Price"}
                  width={"92px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Price Change"}
                  width={"140px"}
                  onClick={() => {}}
                />
              </div>
            </div>

            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Total Value"}
                  width={"140px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Today’s PnL"}
                  width={"140px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Today’s PnL %"}
                  width={"140px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <SortingTblButton
                  title={"Allocation"}
                  width={"140px"}
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className={style_tbl.mobth}>
              <div>
                <TxtTblButton title={"Action"} width={"140px"} />
              </div>
            </div>
          </div>
        </div>
        <div className={style_tbl.mobtbody}>
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
        <label className="txt_Body3">PTT</label>

        <label
          style={{ color: "var(--primary-Neutrals-medium-color)" }}
          className="txt_Body3"
        >
          1,157
        </label>
        <label
          style={{ color: "var(--primary-Neutrals-medium-color)" }}
          className="txt_Body3"
        >
          0,109514
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
            Price change
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            246857ghfhg873
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Total Value
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            0x85cEa...2b857
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Today’s PnL
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            21.12.2023 10:36 CET
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Today’s PnL %
          </label>
          <label
            style={{ color: "var(--primary-Neutrals-medium-color)" }}
            className="txt_Body3"
          >
            240.57
          </label>
        </div>
        <div className={style_tbl.mobtrBottomtbltr}>
          <label
            className="txt_Caption"
            style={{ color: "var(--primary-Neutrals-weak-color)" }}
          >
            Allocation
          </label>
          <label className="txt_Body3">1.354.85</label>
        </div>
        <center>
          <div className={styles.rowCenterTd}>
            <label>
              <Button
                disable={true}
                text={"Buy"}
                Custom_width={"110px"}
                Custom_minWidth={"110px"}
                Custom_maxWidth={"110px"}
                Custom_height={"27px"}
                Custom_fontFamily={"txt_Caption"}
              />
            </label>
            <label style={{ marginLeft: "10px", paddingTop: "5px" }}>
              <MenuIcon />
            </label>
          </div>
        </center>
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

const MenuIcon = () => {
  return (
    <svg
      width="4"
      height="15"
      viewBox="0 0 4 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.99997 14.7688C1.58749 14.7688 1.23438 14.622 0.940625 14.3282C0.646875 14.0345 0.5 13.6814 0.5 13.2689C0.5 12.8564 0.646875 12.5033 0.940625 12.2095C1.23438 11.9158 1.58749 11.7689 1.99997 11.7689C2.41246 11.7689 2.76558 11.9158 3.05933 12.2095C3.35308 12.5033 3.49995 12.8564 3.49995 13.2689C3.49995 13.6814 3.35308 14.0345 3.05933 14.3282C2.76558 14.622 2.41246 14.7688 1.99997 14.7688ZM1.99997 8.99962C1.58749 8.99962 1.23438 8.85274 0.940625 8.55899C0.646875 8.26524 0.5 7.91213 0.5 7.49964C0.5 7.08716 0.646875 6.73404 0.940625 6.44029C1.23438 6.14654 1.58749 5.99967 1.99997 5.99967C2.41246 5.99967 2.76558 6.14654 3.05933 6.44029C3.35308 6.73404 3.49995 7.08716 3.49995 7.49964C3.49995 7.91213 3.35308 8.26524 3.05933 8.55899C2.76558 8.85274 2.41246 8.99962 1.99997 8.99962ZM1.99997 3.23039C1.58749 3.23039 1.23438 3.08352 0.940625 2.78977C0.646875 2.49604 0.5 2.14292 0.5 1.73042C0.5 1.31794 0.646875 0.964819 0.940625 0.671069C1.23438 0.377336 1.58749 0.230469 1.99997 0.230469C2.41246 0.230469 2.76558 0.377336 3.05933 0.671069C3.35308 0.964819 3.49995 1.31794 3.49995 1.73042C3.49995 2.14292 3.35308 2.49604 3.05933 2.78977C2.76558 3.08352 2.41246 3.23039 1.99997 3.23039Z"
        fill="white"
      />
    </svg>
  );
};

const UpArrowIcon = () => {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.24997 4.18654V10.25H6.5V4.18654L3.65191 7.03461L3.125 6.50001L6.87499 2.75002L10.625 6.50001L10.0981 7.03461L7.24997 4.18654Z"
        fill="#128457"
      />
    </svg>
  );
};
