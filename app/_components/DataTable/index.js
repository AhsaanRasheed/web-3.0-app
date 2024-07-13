"use client";
import { useState, useEffect } from "react";
import style from "./style.module.scss";
// import "./style.css";
import InputTxt from "../global/Input/InputTxt";
//import Pagination from "./Component/Pagination";
import dynamic from 'next/dynamic';

const Pagination = dynamic(
  () => import('./Component/Pagination'),
  { ssr: false }
);
const DesktopViewTbl = dynamic(
  () => import('./Component/DesktopViewTbl'),
  { ssr: false }
);
const MobileViewTbl = dynamic(
  () => import('./Component/MobileViewTbl'),
  { ssr: false }
);
// import DesktopViewTbl from "./Component/DesktopViewTbl";
// import MobileViewTbl from "./Component/MobileViewTbl";
const DataTable = ({
  title,
  header,
  data,
  sublabel = null,
  searchBar = false,
  checkBoxLbl = null,
  pageIndex=1,
  setPageIndex,
  totalLength,
  children,
}) => {
  // const [pageIndex, setPageIndex] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState("6");
  const [checkBoxchecked, setCheckBoxChecked] = useState(false);
  const handleSelectChange = (event) => {
    setItemsPerPage(event.target.value);
  };
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 868) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={`${style.card} ${style.mainCard}`}>
      <div className={style.CardTopbar}>
        {/* Top bar */}
        <div className={style.leftSide}>
          <label className="txt_Title1">
            {/* Heading */}
            {title}
          </label>

          {title == "Estimated Balance" && (
            <div className={style.EstimatedBalanceSubHeading}>
              <label className="txt_Heading2">
                {/* Heading 02 */}
                PTT 3000
              </label>
              <div className={style.dot}></div>
              <label className="txt_Body" style={{color:"var(--primary-Neutrals-medium-color)"}}>~ <b>€</b> 1,209.84</label>
            </div>
          )}
          {sublabel != null && <><label className="txt_Body2" style={{color:"var(--primary-Neutrals-medium-color)"}}>{sublabel}</label></>}
        </div>
        <div className={style.centerSide}>
          {searchBar && (
            <form class={style.searchForm}>
              
              <InputTxt onChange={()=>{}}  value={""} placeHolder={"Search"} isSearch={true} Custom_width={"100%"} Custom_minWidth={"100%"} Custom_maxWidth={"100%"}/>
            </form>
          )}
        </div>
        <div className={style.rightSide}>
          <div className={style.perQty}>
            {/* Showing Qty */}
            <p>Showing</p>
            <select value={itemsPerPage} onChange={handleSelectChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          {checkBoxLbl != null && (
            <div className={style.checkBoxLbl}>
              <Checkbox
                selected={checkBoxchecked}
                onClick={() => setCheckBoxChecked(!checkBoxchecked)}
              />
              <span> {checkBoxLbl} </span>
            </div>
          )}
        </div>
      </div>
      {children}
      <div className={style.tblContainer}>
        {!isMobileView ? (
          <DesktopViewTbl header={header} data={data} />
        ) : (
          <MobileViewTbl header={header} data={data} />
        )}
        <Pagination
          className={style.paginationbar}
          currentPage={pageIndex}
          // totalCount={data.length}
          totalCount={totalLength}

          pageSize={itemsPerPage}
          onPageChange={(page) => setPageIndex(page)}
        />
      </div>
    </div>
  );
};

export default DataTable;

function Checkbox({ selected, onClick, effect = "checkmark" }) {
  const length = 120.36953735351562;

  return (
    <div className={style.wrapper} onClick={onClick}>
      <span className={style.box} />
      <svg
        viewBox="0 0 90 90"
        style={{ height: 20, width: 20, marginBottom: "6px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="#0075FF"
          strokeWidth="14"
          fill="none"
          d="M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16"
          strokeDashoffset={selected ? 0 : length}
          style={{
            strokeLinecap: "round",
            strokeLinejoin: "round",
            transition: "stroke-dashoffset 0.2s ease-in-out",
            strokeDasharray: `${length} ${length}`,
          }}
        />
      </svg>
    </div>
  );
}
