"use client";
import React, { useState, useEffect } from "react";
import styles from "../style.module.scss";
import { get_user_referrals } from "@/app/services/service";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import DesktopTable from "./components/DesktopTable";
import MobileTable from "./components/MobileTable";
export default function Earn({ isMobileView }) {
  // Tbl Start //////////////////////////////////
  const [TransactionLst, setTransactionLst] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  // Tbl End ///////////////////////////////
  const [orderTypeAsc, setOrderTypeAsc] = useState(false);
  const [orderBy, setOrderBy] = useState("amount");
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const { toggleLoader } = useLoader();
  const getValue = async () => {
    toggleLoader(true);
    try {
    const currentDate = new Date();

    let va = await get_user_referrals(
      pageIndex,
      itemPerPage,
      orderBy,
      orderTypeAsc ? "asc" : "desc"
    );
    setTotalLength(va.data.total);

    console.log(va.data);
    let tempLst = [];
    try {
      for (let i = 0; i < va.data.referrals.length; i++) {
        tempLst.push({
          1: va.data.referrals[i].username,
          2: va.data.referrals[i].level,
          3: va.data.referrals[i].amount,
          4: "Onchain",
          5: getTimeDifference(va.data.referrals[i].updated, currentDate),
          6: truncateText(va.data.referrals[i].to_address),
          7: "1354.85",
          8: va.data.referrals[i].tx_hash,
        });
      }
      setTransactionLst(tempLst);
    } catch (error) {
      toggleLoader(false);
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

  return (
    <div style={{ width: "100%", padding: "0" }}>
      <div className={styles.card}>
        <div className={styles.topBar}>
          <div className={styles.left}>
            <label className="txt_Title1">Transactions</label>
            <label
              style={{ color: "var(--primary-Neutrals-medium-color)" }}
              className="txt_Body2"
            >
              This is a subtitle which describes this block
            </label>
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
            data={TransactionLst}
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
            data={TransactionLst}
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
function getTimeDifference(dateString, currentDate) {
  const providedDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const differenceMs = currentDate - providedDate;

  // Calculate days and hours difference
  const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (differenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  // Construct the output string
  let output = "";
  if (daysDifference > 0) {
    output += `${daysDifference} ${daysDifference === 1 ? "day" : "days"}`;
    if (hoursDifference > 0) {
      output += `, ${hoursDifference} ${
        hoursDifference === 1 ? "hour" : "hours"
      }`;
    }
  } else {
    output += `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"}`;
  }

  output += " ago";
  return output;
}

function truncateText(txt) {
  return txt.length > 13
    ? txt.slice(0, 6) + "..." + txt.slice(txt.length - 5, txt.length)
    : txt;
}
