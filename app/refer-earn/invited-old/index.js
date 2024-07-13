"use client";
import React, { useState, useEffect } from "react";
import styles from "../style.module.scss";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import { get_user_invitees } from "@/app/services/service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

import DesktopTable from "./components/DesktopTable";
import MobileTable from "./components/MobileTable";
export default function Invited({ isMobileView }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [orderTypeAsc, setOrderTypeAsc] = useState(false);
  const [orderBy, setOrderBy] = useState("date");

  const [TransactionLst, setTransactionLst] = useState([]);
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const { toggleLoader } = useLoader();

  const getValue = async () => {
    toggleLoader(true);
    try {

    const currentDate = new Date();

    let va = await get_user_invitees(
      pageIndex,
      itemPerPage,
      orderBy,
      orderTypeAsc ? "asc" : "desc"
    );
    setTotalLength(va.data.total);

    console.log(va.data);
    let tempLst = [];
    try {
      for (let i = 0; i < va.data.invitees.length; i++) {
        tempLst.push({
          1: truncateText(va.data.invitees[i].email),
          2: va.data.invitees[i].username,
          3: getTimeDifference(va.data.invitees[i].updated, currentDate),
          4: va.data.invitees[i].status == "PENDING" ? "Pending" : "Joined",
          5: va.data.invitees[i].resend,
          6: va.data.invitees[i].email,
          id: va.data.invitees[i].id,
          inviter_user_id: va.data.invitees[i].inviter_user_id,
          email: va.data.invitees[i].email,
        });
      }
      setTransactionLst(tempLst);
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
            {/* <div className={styles.rowCenter}>
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
                Accepted invitations
              </label>
            </div> */}
          </div>
        </div>
        <br />

        {isMobileView ? (
          <MobileTable
            reCallTable={getValue}
            data={TransactionLst}
            pageSize={itemPerPage}
            setData={setTransactionLst}
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
            reCallTable={getValue}
            data={TransactionLst}
            setData={setTransactionLst}
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

function truncateText(text) {
  if (text.length > 10) {
    return text.substring(0, 5) + "..." + text.substring(text.length - 5);
  } else {
    return text;
  }
}
