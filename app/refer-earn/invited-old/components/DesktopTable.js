"use client";
import DataTable from "@/app/_components/DataTable";
import React, { useState, useEffect } from "react";
import styles from "../../style.module.scss";
import style_tbl from "../../../DataTableGlobal.module.scss";
import { get_user_referrals, invite_api } from "@/app/services/service";
import DropDown from "@/app/_components/global/DropDown/DropDown";
import CheckBox from "@/app/_components/global/CheckBox";
import Tags from "@/app/_components/global/Tags/Tags";
import Button from "@/app/_components/global/Button/Button";
import Image from "next/image";
import Pagination from "@/app/_components/global/Pagination";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
export default function DesktopTable({
  data,
  setData,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  reCallTable,
  setOrderBy,
}) {
  const { addNotification } = useNotification();
  const { toggleLoader } = useLoader();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (selected.length > 0) {
      const checkedItems = getCheckedItems();
      console.log("Checked items: ", checkedItems);
    } else {
      console.log("No items are currently selected.");
    }
  }, [selected, data]);

  const handleActionClick = (action) => {
    const checkedItems = getCheckedItems(); // Assuming this returns full item details

    if (action === "delete") {
      console.log("Delete these items:", checkedItems);
      // Additional delete logic here
    } else if (action === "resend") {
      toggleLoader(true);
    try {
      invite_api({
        emails: selected,
        username: "",
        message: "",
      }).then((res) => {
        toggleLoader(false);
        if (res.code == 200) {
          addNotification({
            id: Math.random().toString(36).substr(2, 9),
            type: "success",
            message: "Invites resent.",
            customProp: null,
          });
          setSelected([]);
          reCallTable();
        }
      });
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
      // Additional resend logic here
    }
  };

  function getCheckedItems() {
    return data.filter((item) => selected.includes(item["6"]));
  }

  return (
    <div className={style_tbl.invitedTable}>
      <div className={style_tbl.container}>
        <table>
          <thead className={style_tbl.head}>
            <tr>
              <th>
                <center>
                  <CheckBoxTblButton
                    setSelected={setSelected}
                    setData={setData}
                    data={data}
                    selected={selected}
                    width={"48px"}
                  />
                </center>
              </th>
              <th>
                <center>
                  <DropDown
                    listOfItems={[{ label: "BradleyGua@gmail.com" }]}
                    onSelect={(v) => {}}
                    DefaultValue={{
                      value: "E-mail Address",
                      label: "E-mail Address",
                    }}
                    Custom_width="165px"
                    Custom_height="32px"
                  />
                </center>
              </th>
              <th>
                <center>
                  <DropDown
                    listOfItems={[{ label: "BradleyGuanto" }]}
                    onSelect={(v) => {}}
                    DefaultValue={{
                      value: "Username",
                      label: "Username",
                    }}
                    Custom_width="150px"
                    Custom_height="32px"
                  />
                </center>
              </th>
              <th>
                <center>
                  <SortingTblButton
                    title={"Date"}
                    width={"150px"}
                    onClick={() => {
                      setOrderBy("date");
                    }}
                  />
                </center>
              </th>
              <th>
                <center>
                  <DropDown
                    listOfItems={[{ label: "Pending", label: "Joined" }]}
                    onSelect={(v) => {}}
                    DefaultValue={{
                      value: "Status",
                      label: "Status",
                    }}
                    Custom_width="150px"
                    Custom_height="32px"
                  />
                </center>
              </th>
              <th>
                <center>
                  <TxtTblButton title={"Resend"} width={"150px"} />
                </center>
              </th>
            </tr>
          </thead>
          {selected.length > 0 && (
            <div className={style_tbl.additionalHeader}>
              <div className={style_tbl.flex_row_container}>
                <Image
                  src="/icons/delete.svg"
                  width={24}
                  height={24}
                  alt="Delete"
                  className={style_tbl.checkbutton}
                />
                <button onClick={() => handleActionClick("delete", selected)}>
                  <p className="txt_Body1">Delete</p>
                </button>
              </div>
              <div className={style_tbl.flex_row_container}>
                <Image
                  src="/icons/resend.svg"
                  width={24}
                  height={24}
                  alt="Resend"
                  className={style_tbl.checkbutton}
                />
                <button onClick={() => handleActionClick("resend", selected)}>
                  <p className="txt_Body1">Resend</p>
                </button>
              </div>
            </div>
          )}

          {selected.length > 0 && (
            <thead
              style={{ zIndex: -1, display: "block" }}
              className={style_tbl.spacerHeader}
            >
              <tr>
                <th colSpan="100%"></th>
              </tr>
            </thead>
          )}
          <tbody>
            {data.map((item) => (
              <tr>
                <td>
                  <CheckBox
                    disable={!item["5"]}
                    onChange={(e) => {
                      let temp = selected;
                      setData(
                        data.map((tableItem) => {
                          if (tableItem["6"] == item["6"])
                            if (!temp.includes(item["6"])) {
                              tableItem.selected = true;
                            } else {
                              tableItem.selected = false;
                            }
                          return tableItem;
                        })
                      );
                      if (temp.includes(item["6"])) {
                        setSelected(
                          temp.filter((itemFil) => itemFil != item["6"])
                        );
                      } else {
                        temp.push(item["6"]);
                        setSelected(temp);
                      }
                    }}
                    checked={item.selected}
                  />
                </td>
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
                    <Tags type={item["4"]} />
                  </div>
                </td>
                <td>
                  <label>
                    {item["4"].toLowerCase() == "pending" && (
                      <Button
                        disable={!item["5"]}
                        onClick={() => {
                          invite_api({
                            emails: [item["6"]],
                            username: "",
                            message: "",
                          }).then((res) => {
                            if (res.code == 200) {
                              addNotification({
                                id: Math.random().toString(36).substr(2, 9),
                                type: "success",
                                message: "Invite resent.",
                                customProp: null,
                              });
                              reCallTable();
                            }
                          });
                        }}
                        text={"Resend"}
                        Custom_width={"112px"}
                        Custom_minWidth={"100px"}
                        Custom_height={"27px"}
                        Custom_fontFamily={"txt_Caption"}
                      />
                    )}
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
const CheckBoxTblButton = ({ width, data, selected, setData, setSelected }) => {
  return (
    <div
      style={{
        width: width,
        height: "32px",
        borderRadius: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--primary-Blue-weak-color)",
        border: "none",
        color: "#fff",

        cursor: "pointer",
      }}
    >
      <CheckBox
        onChange={(e) => {
          let temp = [];
          setData(
            data.map((tableItem) => {
              if (tableItem["5"]) {
                temp.push(tableItem["6"]);
                if (e.currentTarget.checked) {
                  setSelected(temp);
                } else {
                  setSelected([]);
                }
                tableItem.selected = e.currentTarget.checked;
              }
              return tableItem;
            })
          );
        }}
        checked={
          selected.length == data.filter((item) => item["5"]).length &&
          data.filter((item) => item["5"]).length > 0
        }
        style={{ marginLeft: "-8px" }}
      />
    </div>
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
