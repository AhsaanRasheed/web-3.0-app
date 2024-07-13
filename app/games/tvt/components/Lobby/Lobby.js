"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import MyGamesCheckBox from "./_components/MyGamesCheckBox";
import NewsDropdown from "./_components/Dropdown";
import SearchInputTxtNew from "./_components/SearchTextBox";
import Link from "next/link";
export default function Lobby() {
  const [sortByType, setSortByType] = useState("desc");
  const [searchOpp, setSearchOpp] = useState("");

  const [sortBy, setSortBy] = useState({
    lbl: "Time remaining",
    value: "released_at",
    disable: false,
  });
  return (
    <div className={style.mainCard}>
      <div className={style.topRow}>
        <div className={style.left}>
          <div className={style.title}>
            <label>Lobby Rooms</label>
          </div>
          <MyGamesCheckBox />
        </div>
        <div className={style.right}>
          <NewsDropdown
            label={""}
            sortIcon={true}
            sortValue={sortByType}
            onSortChange={(e) => {
              setSortByType(e);
            }}
            customWidth={"170px"}
            options={[
              { lbl: "Time remaining", value: "released_at", disable: false },
              { lbl: "Entree Fee", value: "released_at", disable: false },
              { lbl: "Duration", value: "released_at", disable: false },
            ]}
            onChange={(e) => setSortBy(e)}
            selectedOtp={sortBy}
            startPosition={"right"}
          />
          <div className={style.sp24}></div>
          <SearchInputTxtNew
            placeHolder={"Search Opponent"}
            value={searchOpp}
            onChange={(e) => setSearchOpp(e)}
          />
        </div>
      </div>
      <div className={style.gameCardsCon}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />


      </div>
    </div>
  );
}

const UserCard = () => {
  return (
    <Link href={'/games/tvt/welcome/'}>
      <div className={style.userCard}>
        <div className={style.loader}>
          <div className={style.bar} />
        </div>
        <div className={style.playerData}>
          <div className={style.avatarImgCon}>
            <div className={style.imgCon}>
              <img src="/tvt/Avatar1.png" />
            </div>
            <div className={style.rankCon}>
              <label>98</label>
            </div>
          </div>
          <div className={style.playname}>
            <label>DuRov</label>
          </div>
          <div className={style.playerWinRate}>
            <label>
              <label className={style.win}>7W</label>/
              <label className={style.draw}>4D</label>/
              <label className={style.lose}>2L</label>
            </label>
          </div>
        </div>
        <div className={style.durationCon}>
          <div className={style.col}>
            <div>
              <label className={style.title}>Entry fee</label>
            </div>
            <div className={style.value}>
              <label>
                1000 <label className={style.ptvCon}>PTV</label>
              </label>
            </div>
          </div>
          <div className={style.col}>
            <div>
              <label className={style.title}>Game Duration</label>
            </div>
            <div className={style.value}>
              <label>5 min</label>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
