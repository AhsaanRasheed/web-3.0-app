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
import InvitedChip from "@/app/_components/global/InvitedChip";
import DtCheckbox from "@/app/_components/global/DtCheckbox";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
 
import {
  get_invitation_data,
  post_users_invitation,
  delete_invites,
} from "@/app/services/new_service";

export default function Invited({ isMobileView }) {
  // Tbl Start //////////////////////////////////
  const [TransactionLst, setTransactionLst] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  // Tbl End ///////////////////////////////
  const [orderTypeAsc, setOrderTypeAsc] = useState(false);
  const [orderBy, setOrderBy] = useState("last_sent_at");
  const [hideSmallBalance, setHideSmallBalance] = useState(false);
  const { toggleLoader } = useLoader();
  const [isAllChecked, setIsAllChecked] = useState(null); // All, Resend, Locked, Pending
  // const [emailCheckLst, setEmailCheckLst] = useState([]);
  const [emailCheckLst, setEmailCheckLst] = useState({});

  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [isIncludeLockorPending, setIsIncludeLockorPending] = useState(false);
  const { addNotification } = useNotification();

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const itemPerPageoptions = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 30, label: 30 },
  ];
  useEffect(() => {
    console.log(emailCheckLst);
  }, [emailCheckLst]);
  const getValue = async () => {
    toggleLoader(true);
    setIsAllChecked(null);
    setEmailCheckLst({});
    try {
      const currentDate = new Date();

      let va = await get_invitation_data(
        pageIndex,
        itemPerPage,
        orderBy,
        orderTypeAsc ? "asc" : "desc"
      );
      if (va?.message == "ok") {
        setTotalLength(va.data.total);
        setTransactionLst(va.data.invitees);
      }

      //             {
      //                 "id": "0edf6d42-c2bd-40c8-a3fe-bd21994fa9e8",
      //                 "user_id": "ff2fc36b-3d64-401a-b777-b92df8cc2dce",
      //                 "joiner_id": "819f4980-edab-4ff3-82ef-02f473ec11d1",
      //                 "level": 1,
      //                 "amount": 5000,
      //                 "status": "onchain",
      //                 "tx_hash": "0x315d9e7de79eeab0552f4cecd3b5871ff5df4f18c173b981f8e600f161f7ed1d",
      //                 "created_at": "2024-05-03T16:16:33.369441Z",
      //                 "username": "tester123"
      //             },
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getValue();
  }, [pageIndex, itemPerPage, orderBy, orderTypeAsc]);
  const customContentRenderer = ({ props, state }) => (
    <CheckBoxDT
      isCheck={isAllChecked != null}
      lbl={""}
      onCheck={() => {
        // if (isAllChecked == null) {
        //   setIsAllChecked("All");
        //   let TempA = {};
        //   TransactionLst.forEach((item) => {
        //     if (item.hasOwnProperty("target")) {
        //       // emailCheckLst.push(item.target);
        //       TempA[item.target] =
        //         item.message_sent_count >= 4 ||
        //         (!item.resend && item.message_sent_count < 4);
        //     }
        //   });
        //   console.log(TempA);
        //   setEmailCheckLst(TempA);
        // }
      }}
      onUncheck={() => {
        setIsAllChecked(null);
        setEmailCheckLst({});
      }}
    />
  );

  const onResendSingle = async (email) => {
    // const send_invites = async (msg, sign, sub) => {
    toggleLoader(true);
    try {
      let referal = await post_users_invitation(null, null, null, [email]);
      console.log(referal);
      if (referal.message == "ok") {
        handleAddNotification("success", "Resend Email has been sent.");
        // setShowInviteSendBox(false);
        // setShowSuccessMsg(true);
        await getValue();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  const onDeleteSingle = async (email) => {
    toggleLoader(true);
    try {
      let referal = await delete_invites([email]);

      if (referal.message == "invitations successfully deleted") {
        handleAddNotification("success", "Invitation successfully deleted.");
        // setShowInviteSendBox(false);
        // setShowSuccessMsg(true);
        await getValue();
      } else {
        handleAddNotification("fail", "Failed to Delete Invite Email.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };

  const onResendAll = async () => {
    toggleLoader(true);
    try {
      const keysWithoutNull = Object.keys(emailCheckLst).filter(
        (key) => emailCheckLst[key] !== null
      );

      let referal = await post_users_invitation(
        null,
        null,
        null,
        keysWithoutNull
      );
      console.log(referal);
      if (referal.message == "ok") {
        handleAddNotification("success", "Resend Email has been sent.");
        await getValue();

        // setShowInviteSendBox(false);
        // setShowSuccessMsg(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  const onDeleteAll = async () => {
    toggleLoader(true);
    try {
      const keysWithoutNull = Object.keys(emailCheckLst).filter(
        (key) => emailCheckLst[key] !== null
      );

      let referal = await delete_invites(keysWithoutNull);
      console.log(referal);
      if (referal.message == "invitations successfully deleted") {
        handleAddNotification("success", "Invitations successfully deleted.");
        await getValue();

        // setShowInviteSendBox(false);
        // setShowSuccessMsg(true);
      } else {
        handleAddNotification("fail", "Failed to Delete Invite Email.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };

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
                      <th
                        className="dropdownTblFilter"
                        style={{ width: "80px", maxWidth: "80px" }}
                      >
                        <div>
                          {" "}
                          <Select
                            style={{ width: "max-content !importent" }}
                            options={[
                              {
                                value: "All",
                                label: "All",
                              },
                              {
                                value: "Resend",
                                label: "Resend",
                              },
                              {
                                value: "Locked",
                                label: "Locked",
                              },
                              {
                                value: "Pending",
                                label: "Pending",
                              },
                            ]}
                            placeholder=""
                            searchable={false}
                            // values={[
                            //   {
                            //     value: ActionTypeHistoryTbl,
                            //     label: ActionTypeHistoryTbl,
                            //   },
                            // ]}
                            contentRenderer={customContentRenderer}
                            onChange={async (value) => {
                              if (value.length > 0) {
                                // setEmailCheckLst([]);
                                let tempA = {};
                                if (value[0].value == "All") {
                                  setIsIncludeLockorPending(false);

                                  TransactionLst.forEach((item) => {
                                    if (item.hasOwnProperty("target")) {
                                      tempA[item.target] =
                                        item.message_sent_count >= 4 ||
                                        (!item.resend &&
                                          item.message_sent_count < 4);
                                    }
                                    // if (
                                    //   (item.hasOwnProperty("target") &&
                                    //     item.message_sent_count >= 4) ||
                                    //   (!item.resend &&
                                    //     item.message_sent_count < 4)
                                    // ) {
                                    //   setIsIncludeLockorPending(true);
                                    // }
                                  });
                                } else if (value[0].value == "Locked") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      item.message_sent_count >= 4
                                    ) {
                                      tempA[item.target] =
                                        item.message_sent_count >= 4 ||
                                        (!item.resend &&
                                          item.message_sent_count < 4);
                                    }
                                  });
                                  // setIsIncludeLockorPending(true);
                                } else if (value[0].value == "Resend") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      item.resend
                                    ) {
                                      tempA[item.target] =
                                        item.message_sent_count >= 4 ||
                                        (!item.resend &&
                                          item.message_sent_count < 4);
                                    }
                                  });
                                  // setIsIncludeLockorPending(false);
                                } else if (value[0].value == "Pending") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      !item.resend &&
                                      item.message_sent_count < 4
                                    ) {
                                      tempA[item.target] =
                                        item.message_sent_count >= 4 ||
                                        (!item.resend &&
                                          item.message_sent_count < 4);
                                    }
                                  });
                                  // setIsIncludeLockorPending(true);
                                }
                                setEmailCheckLst(tempA);
                                setIsAllChecked(value[0].value);
                              }
                            }}
                          />
                        </div>
                      </th>
                      <th
                        colSpan={2}
                        className={`${style.hideitonDesktop} ${
                          Object.keys(emailCheckLst).length > 0
                            ? style.onCheckBoxCheckedMobileToShow
                            : style.onCheckBoxCheckedMobile}`
                        }
                      >
                        <label className={style.mobOptionsBtns}>|</label>
                        <label
                          onClick={() => onDeleteAll()}
                          className={style.mobOptionsBtns}
                        >
                          Delete
                        </label>
                        <label
                          style={{
                            visibility:
                              Object.keys(emailCheckLst).length > 0 &&
                              !Object.values(emailCheckLst).includes(true)
                                ? "visible"
                                : "hidden",
                          }}
                          onClick={() => onResendAll()}
                          className={style.mobOptionsBtns}
                        >
                          Resend
                        </label>
                      </th>
                      <th
                        className={`${style.emailTblCol} ${
                          Object.keys(emailCheckLst).length == 0
                            ? style.onCheckBoxCheckedMobileToShow
                            : style.onCheckBoxCheckedMobile
                        }`}
                      >
                        <div className={style.rowCon}>
                          Email{" "}
                          <div
                            className={style.extraOptionsCon}
                            style={{
                              visibility:
                                Object.keys(emailCheckLst).length > 0
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            <div className={style.divider} />
                            <button
                              className={style.deleteBtn}
                              onClick={() => onDeleteAll()}
                            >
                              Delete
                            </button>
                            <button
                              className={style.resendBtn}
                              style={{
                                visibility:
                                  Object.keys(emailCheckLst).length > 0 &&
                                  !Object.values(emailCheckLst).includes(true)
                                    ? "visible"
                                    : "hidden",
                              }}
                              onClick={() => onResendAll()}
                            >
                              Resend
                            </button>
                          </div>
                        </div>
                      </th>
                      <th
                        className="OurCustomTblContainer_hideOnMobile"
                        style={{ width: "250px", maxWidth: "250px" }}
                      >
                        <div className="OurCustomTblContainer_alignRow">
                          <label>Invitation Date</label>{" "}
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("last_sent_at");
                            }}
                          />
                        </div>
                        
                      </th>
                      <th
                        className={
                          Object.keys(emailCheckLst).length == 0
                            ? style.onCheckBoxCheckedMobileToShow
                            : style.onCheckBoxCheckedMobile
                        }
                      >
                        
                        <div className="OurCustomTblContainer_alignRow">
                          <label>Resend</label>{" "}
                          <SortingIcon
                            onClickSorting={() => {
                              setOrderBy("resend_status");
                            }}
                          />
                        </div>
                      </th>
                      <th
                        className="OurCustomTblContainer_hideOnMobile"
                        style={{ width: "40px" }}
                      ></th>
                      <th className="OurCustomTblContainer_MobSideArrowModalOpen_th">
                        <label></label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TransactionLst.map((item, index) => (
                      <tr
                        className={
                          emailCheckLst[item.target] != null &&
                          "OurCustomTblContainer_content_selectedRow"
                        }
                      >
                        <td>
                          <CheckBoxDT
                            isCheck={emailCheckLst[item.target] != null}
                            onCheck={() => {
                              // setEmailCheckLst([...emailCheckLst, item.target]);
                              setEmailCheckLst((prevState) => ({
                                ...prevState,
                                [item.target]:
                                  item.message_sent_count >= 4 ||
                                  (!item.resend && item.message_sent_count < 4),
                              }));
                            }}
                            onUncheck={() => {
                              // setEmailCheckLst(
                              // emailCheckLst.filter((i) => i !== item.target)

                              const updatedEmailCheckLst = { ...emailCheckLst };
                              delete updatedEmailCheckLst[item.target];
                              setEmailCheckLst(updatedEmailCheckLst);
                              // );
                              if (isAllChecked) {
                                setIsAllChecked(false);
                              }
                            }}
                          />
                        </td>
                        <td className={style.emailTblCol}>{item.target}</td>
                        <td className="OurCustomTblContainer_hideOnMobile">
                          {convertDateFormat(item.last_sent_at)}
                        </td>
                        <td>
                          <InvitedChip
                            // status="resend-inactive"
                            onClick={() => onResendSingle(item.target)}
                            status={
                              item.resend
                                ? "resend"
                                : item.message_sent_count >= 4
                                ? "locked"
                                : "resend-inactive"
                            }
                            tooltipText={
                              item.time_remaining > 0
                                ? secondsToHms(item.time_remaining)
                                : 0
                            }
                          />
                        </td>
                        <td className="OurCustomTblContainer_hideOnMobile">
                          <SideDots
                            onDelete={() => onDeleteSingle(item.target)}
                          />
                        </td>
                        <td className="OurCustomTblContainer_MobSideArrowModalOpen_td">
                          <SideMobModalOpenIcon
                            onModalOpen={() => {
                              setShowDetailsModal({
                                email: item.target,
                                dateInvited: convertDateFormat(
                                  item.last_sent_at
                                ),
                                resend: item.resend,
                                inviteCount: item.message_sent_count,
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
          onDelete={(e) => {
            onDeleteSingle(e);
            setShowDetailsModal(null);
          }}
          onResend={(e) => {
            onResendSingle(e);

            setShowDetailsModal(null);
          }}
        />
      )}
    </>
  );
}

function truncateText(txt) {
  return txt.length > 16
    ? txt.slice(0, 8) + "..." + txt.slice(txt.length - 8, txt.length)
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

const CheckBoxDT = ({ isCheck, onCheck, onUncheck, lbl = null }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "max-content",
        height: "max-content",
      }}
    >
      {" "}
      {isCheck ? (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "16px",
            minHeight: "17px",
          }}
          onClick={() => onUncheck()}
        >
          <rect
            x="0.5"
            y="1"
            width="15"
            height="15"
            rx="3.5"
            fill="#D376FF"
            stroke="#D376FF"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.24786 11.3067C8.24898 11.3055 8.2501 11.3043 8.25122 11.3031L12.9944 6.20711C13.3579 5.81658 13.3579 5.18342 12.9944 4.79289C12.6309 4.40237 12.0416 4.40237 11.6781 4.79289L6.93156 9.89246L4.58892 7.37556C4.22543 6.98504 3.6361 6.98504 3.27262 7.37556C2.90913 7.76609 2.90913 8.39925 3.27261 8.78978L5.6175 11.3091C6.34447 12.0901 7.52313 12.0901 8.2501 11.3091L8.24786 11.3067Z"
            fill="#0E1521"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            minWidth: "16px",
            minHeight: "17px",
          }}
          onClick={() => onCheck()}
        >
          <rect x="0.5" y="1" width="15" height="15" rx="3.5" stroke="white" />
        </svg>
      )}{" "}
      {lbl != null && <label className={style.checkBoxLbl}>{lbl}</label>}
    </div>
  );
};

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? "h " : "h ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return hDisplay + mDisplay;
}
function calculateTimeRemaining(targetTimeO) {
  // Get the current date and time
  // var targetTime = new Date(targetTimeO * 1000).getTime();
  var now = new Date();

  // Calculate the difference between the target time and the current time
  // var difference = targetTimeO

  // Calculate days, hours, minutes, and seconds
  // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
  // var hours = Math.floor(
  //   (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  // );
  // var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  // var seconds = Math.floor((difference % (1000 * 60)) / 1000);
  var hours = targetTimeO / 60;
  // Round down the total hours to get the number of full hours
  var rhours = Math.floor(hours);
  // Calculate the remaining minutes after subtracting the full hours from the total hours
  var minutes = (hours - rhours) * 60;
  // Round the remaining minutes to the nearest whole number
  var rminutes = Math.round(minutes);
  // Format the result
  var result = rhours + "h " + rminutes + "m";

  return result;
}
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
const MobModalRowDetails = ({ userInfo, onClose, onDelete, onResend }) => {
  // email: item.target,
  // dateInvited: convertDateFormat(
  //   item.last_sent_at
  // ),
  // resend: item.resend,
  // inviteCount: item.message_sent_count,
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
          <div className={style.left}></div>
          <div className={style.right}>
            <CloseModalIcon onClick={onClose} />
          </div>
        </div>

        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Email</label>
          </div>
          <div className={style.right}>
            <label>{truncateText(userInfo.email)}</label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Date Invited</label>
          </div>
          <div className={style.right}>
            <label>{userInfo.dateInvited}</label>
          </div>
        </div>

        <div
          className={`${style.ResendBtnModal} ${
            !userInfo.resend && style.disabledBtn
          }`}
          onClick={() => {
            if (userInfo.resend) onResend(userInfo.email);
          }}
        >
          <label>Resend</label>
        </div>
        {!userInfo.resend && (
          <div className={style.notResendLbl}>
            <label>
              You can no longer preform this action. The limit has been reached.
            </label>
          </div>
        )}

        <div
          className={style.deleteLbl}
          onClick={() => onDelete(userInfo.email)}
        >
          <label>Delete</label>
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

const SideDots = ({ onDelete }) => {
  const [isFocused, setIsFocused] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClick = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div
      className={`${style.sideDotsContainer} ${
        isFocused && style.sideDotsContainer_opened
      }`}
      ref={buttonRef}
      onClick={() => {
        setIsFocused(true);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
      >
        <circle cx="10" cy="17.0586" r="1.5" fill="white" />
        <circle cx="10" cy="11.2109" r="1.5" fill="white" />
        <circle cx="10" cy="5.36328" r="1.5" fill="white" />
      </svg>
      {isFocused && (
        <div ref={menuRef} className={style.sideDotsMenu}>
          <label onClick={() => onDelete()}>Delete</label>
        </div>
      )}
    </div>
  );
};
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
/*   onChange={async (value) => {
                              if (value.length > 0) {
                                // setEmailCheckLst([]);
                                let tempA = [];
                                if (value[0].value == "All") {
                                  setIsIncludeLockorPending(false);

                                  TransactionLst.forEach((item) => {
                                    if (item.hasOwnProperty("target")) {
                                      tempA.push(item.target);
                                    }
                                    if (
                                      (item.hasOwnProperty("target") &&
                                        item.message_sent_count >= 4) ||
                                      (!item.resend &&
                                        item.message_sent_count < 4)
                                    ) {
                                      setIsIncludeLockorPending(true);
                                    }
                                  });
                                } else if (value[0].value == "Locked") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      item.message_sent_count >= 4
                                    ) {
                                      tempA.push(item.target);
                                    }
                                  });
                                  setIsIncludeLockorPending(true);
                                } else if (value[0].value == "Resend") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      item.resend
                                    ) {
                                      tempA.push(item.target);
                                    }
                                  });
                                  setIsIncludeLockorPending(false);
                                } else if (value[0].value == "Pending") {
                                  TransactionLst.forEach((item) => {
                                    if (
                                      item.hasOwnProperty("target") &&
                                      !item.resend &&
                                      item.message_sent_count < 4
                                    ) {
                                      tempA.push(item.target);
                                    }
                                  });
                                  setIsIncludeLockorPending(true);
                                }
                                setEmailCheckLst(tempA);
                                setIsAllChecked(value[0].value);
                              }
                            }} */
