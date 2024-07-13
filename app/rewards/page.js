"use client";
import React, { useState, useEffect } from "react";
import ProfileBar from "../_components/ProfileBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import ActiveStreak from "./Components/ActiveStreak";
import ConnectProfile from "./Components/ConnectProfile";
import DailyTasks from "./Components/DailyTasks";
import WeeklyTasks from "./Components/WeeklyTasks";
import ActiveStreakMob from "./Components/ActiveStreakMob";

// Apis
import { PositionProvider } from "./context/PositionContext";
import Modal from "./Components/LevelModal/LevelModal";
import { useNotification } from "../_components/global/Notification/notificationContext";
export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const router = useRouter();
  const [isMobileView, setIsMobileView] = useState(false);
  const [dailyCollapsed, setDailyCollapsed] = useState(false);
  const [weeklyCollapsed, setWeeklyCollapsed] = useState(true);
  const [refreshStreaks, setRefreshStreaks] = useState(false);
  const { resetRewardCenter, setResetRewardCenter } = useNotification();
  const [refreshData, setRefreshData] = useState(false);

  const triggerRefreshStreaks = () => {
    setRefreshStreaks((prev) => !prev);
  };
  useEffect(() => {
    if (resetRewardCenter == true) {
      setRefreshData(true);
      setResetRewardCenter(false);
    }
  }, [resetRewardCenter]);
  const toggleDailyCollapse = () => {
    setDailyCollapsed(!dailyCollapsed);
    setWeeklyCollapsed(!weeklyCollapsed);
    if (!dailyCollapsed && weeklyCollapsed) {
      setWeeklyCollapsed(false);
    }
  };

  const toggleWeeklyCollapse = () => {
    setWeeklyCollapsed(!weeklyCollapsed);
    setDailyCollapsed(!dailyCollapsed);
    if (!weeklyCollapsed && dailyCollapsed) {
      setDailyCollapsed(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
    // getValue();
    function handleResize() {
      if (window.innerWidth <= 850) {
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

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="pageContainer">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        level={22}
        xp={100}
        ptv={100}
      />
      <ProfileBar
        title="Rewards Center"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      <div className={style.rewardsCenterWrapper}>
        <div className={style.container}>
          <PositionProvider>
            <div className={style.dashboardContainer}>
              {/* Left */}
              <div className={style.leftContainer}>
                <ActiveStreak
                  refreshStreaks={refreshStreaks}
                  triggerLevelUp={openModal}
                />
                <ConnectProfile triggerRefreshStreaks={triggerRefreshStreaks} />
              </div>

              <div className={style.leftContainerMob}>
                <ActiveStreakMob refreshStreaks={refreshStreaks} />
              </div>

              {/* Right */}
              <div className={style.rightContainer}>
                <DailyTasks
                  isCollapsed={dailyCollapsed}
                  toggleCollapse={toggleDailyCollapse}
                  triggerRefreshStreaks={triggerRefreshStreaks}
                  refreshData={refreshData}
                  setRefreshData={setRefreshData}
                />
                <WeeklyTasks
                  isCollapsed={weeklyCollapsed}
                  toggleCollapse={toggleWeeklyCollapse}
                  triggerRefreshStreaks={triggerRefreshStreaks}
                  refreshData={refreshData}
                  setRefreshData={setRefreshData}
                />
              </div>
            </div>
          </PositionProvider>
        </div>
      </div>
    </div>
  );
}
