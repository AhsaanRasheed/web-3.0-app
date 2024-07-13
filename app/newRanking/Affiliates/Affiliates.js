"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "../style.module.scss";
import "../../DataTableGlobal.scss";
import Select from "react-dropdown-select";
import Pagination from "@/app/_components/global/Pagination";
import { get_ranking_Affiliates } from "@/app/services/new_service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import InputTxtNew from "../_component/InputTxt/InputTxtNew";
export default function Affiliates({ PageHasBeenScroll }) {
  const [pageIndex, setPageIndex] = useState(1);
  const [totalLength, setTotalLength] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(25);
  const [firstScroll, setFirstScroll] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [searchTrader, setSearchTrader] = useState("");

  const itemPerPageoptions = [
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ];
  const [rankingList, setRankingList] = useState([]);
  const [rankFirst, setRankFirst] = useState({
    user_id: "",
    username: "",
    rank: 1,
    level1: 0,
    level2: 0,
    level3: 0,
    total_amount: 0,
  });
  const [rankSec, setRankSec] = useState({
    user_id: "",
    username: "",
    rank: 1,
    level1: 0,
    level2: 0,
    level3: 0,
    total_amount: 0,
  });
  const [rankThird, setRankThird] = useState({
    user_id: "",
    username: "",
    rank: 1,
    level1: 0,
    level2: 0,
    level3: 0,
    total_amount: 0,
  });

  const { toggleLoader } = useLoader();
  useEffect(() => {}, [pageIndex]);
  const getInitialValues = async (pageIndexX, itemPerPageX) => {
    toggleLoader(true);
    try {
      let va = await get_ranking_Affiliates(pageIndexX, itemPerPageX);
      setTotalLength(va.data.total);

      if (va.message == "Data fetched successfully") {
        if (va.data.rankings[0].rank == 1) {
          setRankFirst(va.data.rankings[0]);
          setRankSec(va.data.rankings[1]);
          setRankThird(va.data.rankings[2]);
          va.data.rankings.splice(0, 3);
          setRankingList(va.data.rankings);
        } else {
          setRankingList(va.data.rankings);
        }
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getInitialValues(1, 25);
  }, []);

  return (
    <>
      <div className={style.ConDiv}>
        {pageIndex == 1 && (
          <div
            className={`${style.topRankerConMobile} ${
              PageHasBeenScroll && style.topRankerConMobileAnimation
            }`}
          >
            <div className={`${style.topperCon} ${style.Silver}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar1.png"
                    className={style.avatarIcon}
                  />
                  <IconSliverRank />
                </div>
                <div className={style.positionRankerRow}>
                  <label>{truncateString(rankSec.username)}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankSec.total_amount}
                  </label>
                </div>
              </div>
            </div>
            <div className={`${style.topperCon} ${style.Gold}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar2.png"
                    className={style.avatarIcon}
                  />
                  <IconGoldRank />
                </div>
                <div className={style.positionRankerRow}>
                  <label>{truncateString(rankFirst.username)}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankFirst.total_amount}
                  </label>
                </div>
              </div>
            </div>
            <div className={`${style.topperCon} ${style.Brown}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar3.png"
                    className={style.avatarIcon}
                  />
                  <IconBronzeRank />
                </div>
                <div className={style.positionRankerRow}>
                  <label>{truncateString(rankThird.username)}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankThird.total_amount}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {pageIndex == 1 && (
          <div
            className={`${style.topRankerCon} ${
              PageHasBeenScroll == true
                ? style.topFlowAniamtion
                : PageHasBeenScroll == false
                ? style.topFlowAniamtionReverse
                : ""
            }`}
          >
            <div className={`${style.topperCon} ${style.Silver}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar1.png"
                    className={style.avatarIcon}
                  />
                </div>
                <div className={style.positionRankerRow}>
                  <IconSliverRank />
                  <label>{rankSec.username}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.title}>Total Earned</label>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankSec.total_amount}
                  </label>
                </div>
              </div>
              <div className={style.BtmRow}>
                <TopCoverPositionHolder />
                <div className={style.colValue}>
                  <label className={style.value}>{rankSec.level1}</label>
                  <label className={style.title}>Level 1</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankSec.level2}</label>
                  <label className={style.title}>Level 2</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankSec.level3}</label>
                  <label className={style.title}>Level 3</label>
                </div>
              </div>
            </div>
            <div className={`${style.topperCon} ${style.Gold}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar2.png"
                    className={style.avatarIcon}
                  />
                </div>
                <div className={style.positionRankerRow}>
                  <IconGoldRank />
                  <label>{rankFirst.username}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.title}>Total Earned</label>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankFirst.total_amount}
                  </label>
                </div>
              </div>
              <div className={style.BtmRow}>
                <TopCoverPositionHolder />
                <div className={style.colValue}>
                  <label className={style.value}>{rankFirst.level1}</label>
                  <label className={style.title}>Level 1</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankFirst.level2}</label>
                  <label className={style.title}>Level 2</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankFirst.level3}</label>
                  <label className={style.title}>Level 3</label>
                </div>
              </div>
            </div>
            <div className={`${style.topperCon} ${style.Brown}`}>
              <div className={style.topRow}>
                <div className={style.AvatarIconCon}>
                  <img
                    src="/newRanking/avatar3.png"
                    className={style.avatarIcon}
                  />
                </div>
                <div className={style.positionRankerRow}>
                  <IconBronzeRank />
                  <label>{rankThird.username}</label>
                </div>
                <div className={style.TotalEarnedCol}>
                  <label className={style.title}>Total Earned</label>
                  <label className={style.value}>
                    <label className={style.ptv}>PTV</label>{" "}
                    {rankThird.total_amount}
                  </label>
                </div>
              </div>
              <div className={style.BtmRow}>
                <TopCoverPositionHolder />
                <div className={style.colValue}>
                  <label className={style.value}>{rankThird.level1}</label>
                  <label className={style.title}>Level 1</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankThird.level2}</label>
                  <label className={style.title}>Level 2</label>
                </div>
                <div className={style.colValue}>
                  <label className={style.value}>{rankThird.level3}</label>
                  <label className={style.title}>Level 3</label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={style.topDropDownBar}>
          {/* <InputTxtNew
            value={searchTrader}
            onChange={(e) => {
              setSearchTrader(e);
            }}
            onSearch={() => {}}
          /> */}
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
                getInitialValues(1, selected);
              }}
            />
          </div>
        </div>
        <div>
          <div className="OurCustomTblContainer">
            <div
              className={`OurCustomTblContainer_content ${
                pageIndex == 1 && style.TblContent
              }`}
            >
              <table>
                <thead>
                  <tr>
                    <th className={style.rankNo}>#</th>
                    <th className={style.usernameCol}>
                      <label>Username</label>{" "}
                    </th>
                    <th>
                      <label> Level 1 </label>
                    </th>

                    <th className="OurCustomTblContainer_hideOnMobile">
                      <label> Level 2 </label>
                    </th>
                    <th className="OurCustomTblContainer_hideOnMobile">
                      <label> Level 3 </label>
                    </th>
                    <th>
                      <label> Total Earned </label>
                    </th>

                    <th className="OurCustomTblContainer_MobSideArrowModalOpen_th"></th>
                  </tr>
                </thead>
                <tbody>
                  {rankingList.map((item) => (
                    <tr>
                      <td className={style.rankNo}>{item.rank}</td>
                      <td className={style.usernameCol}>{item.username}</td>
                      <td>{item.level1}</td>
                      <td className="OurCustomTblContainer_hideOnMobile">
                        {item.level2}
                      </td>
                      <td className="OurCustomTblContainer_hideOnMobile">
                        {item.level3}
                      </td>
                      <td>
                        <label className={style.ptv}>PTV</label>{" "}
                        {item.total_amount}
                      </td>
                      <td className="OurCustomTblContainer_MobSideArrowModalOpen_td">
                        <SideMobModalOpenIcon
                          onModalOpen={() => {
                            setShowDetailsModal({
                              username: item.username,
                              rank: item.rank,
                              level1: item.level1,
                              level2: item.level2,
                              level3: item.level3,
                              total_amount: item.total_amount,
                            });
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="OurCustomTblContainer_paginationContainer">
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
                  getInitialValues(v, itemPerPage);
                }}
              />
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

const IconSliverRank = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="none"
    >
      <path
        d="M5.53961 1.90909V8.17045C5.53961 12.6818 9.05815 16.4205 13.4508 16.4545C14.5016 16.462 15.5435 16.2559 16.5164 15.8481C17.4894 15.4403 18.3741 14.8388 19.1198 14.0783C19.8654 13.3178 20.4572 12.4133 20.861 11.417C21.2648 10.4206 21.4727 9.35198 21.4726 8.27273V1.90909C21.4726 1.66799 21.3794 1.43675 21.2134 1.26627C21.0474 1.09578 20.8222 1 20.5875 1H6.42478C6.19002 1 5.96487 1.09578 5.79887 1.26627C5.63287 1.43675 5.53961 1.66799 5.53961 1.90909Z"
        fill="#BEBEBE"
      />
      <path
        d="M21.2734 10.0909H22.3577C23.2968 10.0909 24.1973 9.70779 24.8613 9.02584C25.5253 8.34389 25.8984 7.41897 25.8984 6.45455V4.63636C25.8984 4.39526 25.8051 4.16403 25.6391 3.99354C25.4731 3.82305 25.248 3.72727 25.0132 3.72727H21.4725"
        fill="#BEBEBE"
      />
      <path
        d="M5.76073 10.0909H4.64321C3.70416 10.0909 2.80358 9.70779 2.13958 9.02584C1.47557 8.34389 1.10254 7.41897 1.10254 6.45455V4.63636C1.10254 4.39526 1.1958 4.16403 1.3618 3.99354C1.5278 3.82305 1.75295 3.72727 1.98771 3.72727H5.52838"
        fill="#BEBEBE"
      />
      <path
        d="M9.96545 21H17.0468M13.5061 16.4545V21M21.2734 10.0909H22.3577C23.2968 10.0909 24.1973 9.70779 24.8613 9.02584C25.5253 8.34389 25.8984 7.41897 25.8984 6.45455V4.63636C25.8984 4.39526 25.8051 4.16403 25.6391 3.99354C25.4731 3.82305 25.248 3.72727 25.0132 3.72727H21.4725M5.76073 10.0909H4.64321C3.70416 10.0909 2.80358 9.70779 2.13958 9.02584C1.47557 8.34389 1.10254 7.41897 1.10254 6.45455V4.63636C1.10254 4.39526 1.1958 4.16403 1.3618 3.99354C1.5278 3.82305 1.75295 3.72727 1.98771 3.72727H5.52838M5.53961 1.90909V8.17045C5.53961 12.6818 9.05815 16.4205 13.4508 16.4545C14.5016 16.462 15.5435 16.2559 16.5164 15.8481C17.4894 15.4403 18.3741 14.8388 19.1198 14.0783C19.8654 13.3178 20.4572 12.4133 20.861 11.417C21.2648 10.4206 21.4727 9.35198 21.4726 8.27273V1.90909C21.4726 1.66799 21.3794 1.43675 21.2134 1.26627C21.0474 1.09578 20.8222 1 20.5875 1H6.42478C6.19002 1 5.96487 1.09578 5.79887 1.26627C5.63287 1.43675 5.53961 1.66799 5.53961 1.90909Z"
        stroke="#777777"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.996 14V12.56L13.9 8.576C14.8493 7.62667 15.324 6.80533 15.324 6.112C15.324 5.568 15.1587 5.14667 14.828 4.848C14.508 4.53867 14.0973 4.384 13.596 4.384C12.6573 4.384 11.964 4.848 11.516 5.776L9.964 4.864C10.316 4.11733 10.812 3.552 11.452 3.168C12.092 2.784 12.8013 2.592 13.58 2.592C14.5613 2.592 15.404 2.90133 16.108 3.52C16.812 4.13867 17.164 4.98133 17.164 6.048C17.164 7.18933 16.5293 8.40533 15.26 9.696L12.732 12.224H17.372V14H9.996Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

const IconGoldRank = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="none"
    >
      <path
        d="M5.53961 1.90909V8.17045C5.53961 12.6818 9.05815 16.4205 13.4508 16.4545C14.5016 16.462 15.5435 16.2559 16.5164 15.8481C17.4894 15.4403 18.3741 14.8388 19.1198 14.0783C19.8654 13.3178 20.4572 12.4133 20.861 11.417C21.2648 10.4206 21.4727 9.35198 21.4726 8.27273V1.90909C21.4726 1.66799 21.3794 1.43675 21.2134 1.26627C21.0474 1.09578 20.8222 1 20.5875 1H6.42478C6.19002 1 5.96487 1.09578 5.79887 1.26627C5.63287 1.43675 5.53961 1.66799 5.53961 1.90909Z"
        fill="#FFD43D"
      />
      <path
        d="M21.2734 10.0909H22.3577C23.2968 10.0909 24.1973 9.70779 24.8613 9.02584C25.5253 8.34389 25.8984 7.41897 25.8984 6.45455V4.63636C25.8984 4.39526 25.8051 4.16403 25.6391 3.99354C25.4731 3.82305 25.248 3.72727 25.0132 3.72727H21.4725"
        fill="#FFD43D"
      />
      <path
        d="M5.76073 10.0909H4.64321C3.70416 10.0909 2.80358 9.70779 2.13958 9.02584C1.47557 8.34389 1.10254 7.41897 1.10254 6.45455V4.63636C1.10254 4.39526 1.1958 4.16403 1.3618 3.99354C1.5278 3.82305 1.75295 3.72727 1.98771 3.72727H5.52838"
        fill="#FFD43D"
      />
      <path
        d="M9.96545 21H17.0468M13.5061 16.4545V21M21.2734 10.0909H22.3577C23.2968 10.0909 24.1973 9.70779 24.8613 9.02584C25.5253 8.34389 25.8984 7.41897 25.8984 6.45455V4.63636C25.8984 4.39526 25.8051 4.16403 25.6391 3.99354C25.4731 3.82305 25.248 3.72727 25.0132 3.72727H21.4725M5.76073 10.0909H4.64321C3.70416 10.0909 2.80358 9.70779 2.13958 9.02584C1.47557 8.34389 1.10254 7.41897 1.10254 6.45455V4.63636C1.10254 4.39526 1.1958 4.16403 1.3618 3.99354C1.5278 3.82305 1.75295 3.72727 1.98771 3.72727H5.52838M5.53961 1.90909V8.17045C5.53961 12.6818 9.05815 16.4205 13.4508 16.4545C14.5016 16.462 15.5435 16.2559 16.5164 15.8481C17.4894 15.4403 18.3741 14.8388 19.1198 14.0783C19.8654 13.3178 20.4572 12.4133 20.861 11.417C21.2648 10.4206 21.4727 9.35198 21.4726 8.27273V1.90909C21.4726 1.66799 21.3794 1.43675 21.2134 1.26627C21.0474 1.09578 20.8222 1 20.5875 1H6.42478C6.19002 1 5.96487 1.09578 5.79887 1.26627C5.63287 1.43675 5.53961 1.66799 5.53961 1.90909Z"
        stroke="#D79A40"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.652 2.8H14.252V14H12.412V4.768L10.156 5.408L9.708 3.84L12.652 2.8Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

const IconBronzeRank = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
    >
      <path
        d="M6.03961 1.90909V8.17045C6.03961 12.6818 9.55815 16.4205 13.9508 16.4545C15.0016 16.462 16.0435 16.2559 17.0164 15.8481C17.9894 15.4403 18.8741 14.8388 19.6198 14.0783C20.3654 13.3178 20.9572 12.4133 21.361 11.417C21.7648 10.4206 21.9727 9.35198 21.9726 8.27273V1.90909C21.9726 1.66799 21.8794 1.43675 21.7134 1.26627C21.5474 1.09578 21.3222 1 21.0875 1H6.92478C6.69002 1 6.46487 1.09578 6.29887 1.26627C6.13287 1.43675 6.03961 1.66799 6.03961 1.90909Z"
        fill="#CF906C"
      />
      <path
        d="M21.7734 10.0909H22.8577C23.7968 10.0909 24.6973 9.70779 25.3613 9.02584C26.0253 8.34389 26.3984 7.41897 26.3984 6.45455V4.63636C26.3984 4.39526 26.3051 4.16403 26.1391 3.99354C25.9731 3.82305 25.748 3.72727 25.5132 3.72727H21.9725"
        fill="#CF906C"
      />
      <path
        d="M6.26073 10.0909H5.14321C4.20416 10.0909 3.30358 9.70779 2.63958 9.02584C1.97557 8.34389 1.60254 7.41897 1.60254 6.45455V4.63636C1.60254 4.39526 1.6958 4.16403 1.8618 3.99354C2.0278 3.82305 2.25295 3.72727 2.48771 3.72727H6.02838"
        fill="#CF906C"
      />
      <path
        d="M10.4655 21H17.5468M14.0061 16.4545V21M21.7734 10.0909H22.8577C23.7968 10.0909 24.6973 9.70779 25.3613 9.02584C26.0253 8.34389 26.3984 7.41897 26.3984 6.45455V4.63636C26.3984 4.39526 26.3051 4.16403 26.1391 3.99354C25.9731 3.82305 25.748 3.72727 25.5132 3.72727H21.9725M6.26073 10.0909H5.14321C4.20416 10.0909 3.30358 9.70779 2.63958 9.02584C1.97557 8.34389 1.60254 7.41897 1.60254 6.45455V4.63636C1.60254 4.39526 1.6958 4.16403 1.8618 3.99354C2.0278 3.82305 2.25295 3.72727 2.48771 3.72727H6.02838M6.03961 1.90909V8.17045C6.03961 12.6818 9.55815 16.4205 13.9508 16.4545C15.0016 16.462 16.0435 16.2559 17.0164 15.8481C17.9894 15.4403 18.8741 14.8388 19.6198 14.0783C20.3654 13.3178 20.9572 12.4133 21.361 11.417C21.7648 10.4206 21.9727 9.35198 21.9726 8.27273V1.90909C21.9726 1.66799 21.8794 1.43675 21.7134 1.26627C21.5474 1.09578 21.3222 1 21.0875 1H6.92478C6.69002 1 6.46487 1.09578 6.29887 1.26627C6.13287 1.43675 6.03961 1.66799 6.03961 1.90909Z"
        stroke="#9D5D38"
        stroke-width="2"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.344 7.376C16.1547 7.568 16.8107 7.94667 17.312 8.512C17.824 9.06667 18.08 9.76533 18.08 10.608C18.08 11.728 17.7013 12.608 16.944 13.248C16.1867 13.888 15.2587 14.208 14.16 14.208C13.3067 14.208 12.5387 14.0107 11.856 13.616C11.184 13.2213 10.6987 12.6453 10.4 11.888L11.968 10.976C12.2987 11.936 13.0293 12.416 14.16 12.416C14.8 12.416 15.3067 12.256 15.68 11.936C16.0533 11.6053 16.24 11.1627 16.24 10.608C16.24 10.0533 16.0533 9.616 15.68 9.296C15.3067 8.976 14.8 8.816 14.16 8.816H13.744L13.008 7.712L15.424 4.528H10.736V2.8H17.616V4.368L15.344 7.376Z"
        fill="#0F0F0F"
      />
    </svg>
  );
};

const AvatarGlow = ({ colorName }) => {
  const colorMap = {
    silver: "#D9D9D9",
    bronze: "#CF906C",
    gold: "#D9E26E",
  };

  const colorHex = colorMap[colorName.toLowerCase()] || "#D9D9D9";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="357"
      height="308"
      viewBox="0 0 357 308"
      fill="none"
    >
      <g opacity="0.35" filter="url(#filter0_f_4651_102438)">
        <ellipse
          cx="178.483"
          cy="154.229"
          rx="77.7375"
          ry="53.7715"
          fill={colorHex}
        />
      </g>
      <defs>
        <filter
          id="filter0_f_4651_102438"
          x="0.745117"
          y="0.457031"
          width="355.476"
          height="307.543"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="50"
            result="effect1_foregroundBlur_4651_102438"
          />
        </filter>
      </defs>
    </svg>
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
            <label>
              #{userInfo.rank} {userInfo.username}
            </label>
          </div>
          <div className={style.right}>
            <CloseModalIcon onClick={onClose} />
          </div>
        </div>
        <div className={style.divider} />

        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Total earned</label>
          </div>
          <div className={style.right}>
            <label>
              <label className={style.ptvCon}>PTV </label>{" "}
              {userInfo.total_amount}
            </label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Level 1</label>
          </div>
          <div className={style.right}>
            <label>{userInfo.level1}</label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Level 2</label>
          </div>
          <div className={style.right}>
            <label>{userInfo.level2}</label>
          </div>
        </div>
        <div className={style.btmRow}>
          <div className={style.left}>
            <label>Level 3</label>
          </div>
          <div className={style.right}>
            <label>{userInfo.level3}</label>
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

const TopCoverPositionHolder = () => {
  return (
    <svg
      style={{
        minWidth: "330px",
        minHeight: "200px",
      }}
      width="330"
      height="200"
      viewBox="0 0 330 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={style.TopCoverPositionHolder}
    >
      <mask id="path-1-inside-1_4752_103825" fill="white">
        <rect y="44.5938" width="330" height="154.59" rx="1" />
      </mask>
      <rect
        y="44.5938"
        width="330"
        height="154.59"
        rx="1"
        fill="url(#paint0_linear_4752_103825)"
        stroke="url(#paint1_linear_4752_103825)"
        stroke-opacity="0.15"
        stroke-width="4"
        mask="url(#path-1-inside-1_4752_103825)"
      />
      <path
        d="M0 44.5938H330L280.52 0.589844H49.5299L0 44.5938Z"
        fill="url(#paint2_linear_4752_103825)"
      />
      <path
        d="M49.7199 1.08984L1.31561 44.0938H328.685L280.329 1.08984H49.7199Z"
        stroke="url(#paint3_linear_4752_103825)"
        stroke-opacity="0.15"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4752_103825"
          x1="165"
          y1="44.5938"
          x2="165"
          y2="199.184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0C0915" />
          <stop offset="0.809492" stop-color="#0C0915" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4752_103825"
          x1="165"
          y1="44.5938"
          x2="165"
          y2="199.184"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6F6F6F" />
          <stop offset="0.404977" stop-color="#6F6F6F" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4752_103825"
          x1="165"
          y1="44.5938"
          x2="165"
          y2="0.589844"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#0C0915" />
          <stop offset="0.809492" stop-color="#0C0915" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_4752_103825"
          x1="165"
          y1="44.5938"
          x2="165"
          y2="-48.1938"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#6F6F6F" />
          <stop offset="0.404977" stop-color="#6F6F6F" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
function truncateString(str) {
  // Check if the string length is greater than 10
  if (str.length > 10) {
    // Calculate how many characters to take from the start and the end
    let keepChars = 4; // Number of characters to keep from the start and end
    // Create the truncated string
    return (
      str.substring(0, keepChars) + ".." + str.substring(str.length - keepChars)
    );
  }
  // If the string length is 10 or less, return it as is
  return str;
}
