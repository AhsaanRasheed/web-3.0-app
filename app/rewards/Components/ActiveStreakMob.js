import { useEffect, useRef, useState } from "react";
import style from "../style.module.scss";
import ConnectProfile from "./ConnectProfile";
import ConnectProfileMob from "./ConnectProfileMob";
import { get_rewards_accountLevel, get_rewards_activityStreaks, get_rewards_tasksOneTime } from "@/app/services/new_service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import secureLocalStorage from "react-secure-storage";
import CircularProgressBar from "./CircleProgress/CircleProgress";

const ActiveStreakMob = ({ refreshStreaks }) => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toggleLoader } = useLoader();
  const [accountData, setAccountData] = useState({
    traderLevel: 0,
    xpForNextLevel: 0,
    totalXp: 0
  });
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [streakData, setStreakData] = useState({
    currentDayIndex: 0,
    streaks: [false, false, false, false, false, false, false]
  });
  const [activeStreakCount, setActiveStreakCount] = useState(0);


  const getAccountLevel = async () => {
    // toggleLoader(true);
    try {
      // let accountLevels = await get_rewards_accountLevel();

      // if (accountData.traderLevel < accountLevels.data.level) { // Check for level up
      //   if (triggerLevelUp) {
      //     triggerLevelUp();
      //   }
      // }

      // setAccountData({
      //   traderLevel: accountLevels.data.level,
      //   xpForNextLevel: accountLevels.data.required_xp,
      //   totalXp: accountLevels.data.current_xp,
      // });

      const newLevelData = await get_rewards_accountLevel();

      if (!newLevelData) {
        // Handle potential errors gracefully
        // Display error message, retry logic, etc.
        return;
      }
      if (
        newLevelData.data.level >
        Number(secureLocalStorage.getItem("userLevel"))
      ) {
        secureLocalStorage.setItem("userLevel", newLevelData.data.level);
        triggerLevelUp();
      }
      setAccountData((prevState) => {
        const newState = {
          traderLevel: newLevelData.data.level,
          xpForNextLevel: newLevelData.data.required_xp,
          totalXp: newLevelData.data.current_xp,
        };

        // console.log("--prevState.traderLevel", prevState.traderLevel);
        // console.log("--newLevelData.data.level", newLevelData.data.level);

        // if (prevState.traderLevel < newLevelData.data.level) {
        //   triggerLevelUp();
        // }

        return newState;
      });

      // console.log('--prevState.traderLevel', prevState.traderLevel)
      // console.log('--newLevelData.data.level', newLevelData.data.level)

      // if (prevState.traderLevel < newLevelData.data.level) {
      //   setIsModalOpen(true);
      // }
    } catch (e) {
      console.error(e);
    } finally {
      toggleLoader(false);
    }
  };

  const fetchTasksWithoutLoader = async () => {
    try {
      const response = await get_rewards_tasksOneTime();
      const fetchedTasks = response.data;
      setTasks(response.data);

      // Calculate the progress
      const totalTasks = fetchedTasks.length;
      const completedTasks = fetchedTasks.filter(fetchedTasks => fetchedTasks.is_completed).length;
      const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      console.log(completedTasks, totalTasks, progressPercentage, fetchedTasks)
      setProgress(progressPercentage)
    } catch (error) {
      console.error('Error fetching tasks data:', error);
    }
  };

  const fetchStreaks = async () => {
    try {
      let accountStreak = await get_rewards_activityStreaks();
      setStreakData({
        currentDayIndex: accountStreak.data.current_day_index,
        streaks: accountStreak.data.streaks
      });

      // active streak count
      const { current_day_index, streaks } = accountStreak.data;

      // Calculate the active streak count
      let streakCount = 0;
      for (let i = 0; i < current_day_index; i++) {
        if (streaks[i]) {
          streakCount++;
        } else {
          streakCount = 0;
        }
      }

      // If the activity was performed today
      if (streaks[current_day_index]) {
        streakCount++;
      }
      setActiveStreakCount(streakCount);
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    getAccountLevel();
    fetchTasksWithoutLoader();
    fetchStreaks();
  }, [])

  useEffect(() => {
    fetchStreaks();
  }, [refreshStreaks])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return <div className={style.content}>
    <div className={style.ActiveStreakContainer}>
      <div className={style.streaks}>

        {!isCollapsed && <div className={`${style.avatarSection} ${style.expanded}`}>
          <div className={style.profileImgContainer}>
            <CircularProgressBar progress={progress} />
          </div>
          <div className={style.profile} onClick={toggleCollapse}>
            <h1 className={style.highlight}>{`${progress}%`}</h1>
            <h2>Complete Profile <ArrowIcon className={isCollapsed ? style.rotate180 : style.rotate180} /></h2>
            <div className={style.discordSection}>
              <div className={style.circleWithoutBorder}>
                <DiscordIconBtn />
              </div>
              <h3>Connect Discord</h3>
              <div class={style.blur}></div>
            </div>
          </div>
        </div>
        }

        {isCollapsed &&
          <div className={`${style.avatarSectionFull} ${style.collapsed}`}>
            <img src="/rewardsCenter/img/BG.png" alt="h" style={{ borderRadius: 100, background: 'radial-gradient(179.5% 60.16% at 50% 100%, #6bc2dd 0%, rgba(16, 94, 112, 0.5) 100%), #070b11' }} />
            <div className={style.profile}>
              <h1 className={style.highlight}>{`${progress}%`}</h1>
              <h2>Complete Profile <ArrowIcon className={isCollapsed ? style.rotate280 : style.rotate280} onclick={toggleCollapse} /></h2>
              <ConnectProfileMob />
            </div>
          </div>
        }

        <div className={style.dailyStreaks}>
          <div className={style.days}>
            {daysOfWeek.map((day, index) => (
              <div key={index} className={index === streakData.currentDayIndex ? `${style.day} ${style.active}` : style.day}>
                {day}
              </div>
            ))}
          </div>

          <div className={style.daysStatus}>
            <div className={style.dayStatus}>
              {streakData.streaks.map((streak, index) => {
                let icon;
                let dayClass = `${style.day}`;
                if (index < streakData.currentDayIndex) {
                  icon = streak ? <PrimeTraderIcon /> : null;
                  dayClass += streak ? ` ${style.current}` : ` ${style.empty}`;
                } else if (index === streakData.currentDayIndex) {
                  icon = streak ? <CompleteStreakIcon /> : null;
                  dayClass += streak ? ` ${style.active}` : ` ${style.current}`;
                } else {
                  icon = streak ? <CompleteStreakIcon /> : null;
                  dayClass += streak ? ` ${style.active}` : ` ${style.empty}`;
                }
                return (
                  <div key={index} className={dayClass}>
                    {icon}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={style.trader}>
          <div className={`${style.activeStreaks}`}>
            <h1 className={style.streakTitle}>Active <br /> Streak</h1>
            <div className={style.streakFire} style={{ alignItems: 'flex-end' }}>
              <StreakFireIcon />
              <h2 className={style.streakUnit}>{activeStreakCount}</h2>
            </div>
          </div>
          <div className={`${style.contentLevel}`}>
            <h1>Trader <br /> Level</h1>
            <h2 className={`${style.highlight}`} style={{ marginTop: 5 }}>
              {accountData.traderLevel}
            </h2>
          </div>
          <div className={style.contentLevel}>
            <h1>XP For Next <br /> Level</h1>
            <h2 style={{ marginTop: 5 }}>
              {accountData.xpForNextLevel} &nbsp;
              <span className={style.highlightPurple}>XP</span>
            </h2>
          </div>
          <div className={style.contentLevel}>
            <h1>Total <br /> XP</h1>
            <h2 style={{ marginTop: 5 }}>
              {accountData.totalXp} &nbsp;
              <span className={style.highlightPurple}>XP</span>
            </h2>
          </div>
        </div>

      </div>
    </div>
  </div>
}



const StreakFireIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none"
  >
    <g clip-path="url(#clip0_5079_108178)">
      <path d="M11.2312 2.54527C11.1345 2.48752 11.024 2.45703 10.9114 2.45703C10.7988 2.45703 10.6883 2.48752 10.5917 2.54527C10.5119 2.60845 10.4581 2.69867 10.4404 2.79886C10.4228 2.89905 10.4424 3.00224 10.4957 3.08889C12.4624 6.49454 12.8781 11.1314 10.1919 13.6896C9.15844 12.8211 8.33795 11.7271 7.79358 10.4918C6.80023 11.0435 5.977 11.8568 5.41325 12.8433C4.8495 13.8299 4.56677 14.952 4.59578 16.0879C4.63634 17.0893 4.87677 18.0724 5.30293 18.9795C5.7291 19.8866 6.33239 20.6991 7.0773 21.3696C7.82221 22.04 8.6937 22.5547 9.64047 22.8833C10.5873 23.2118 11.5902 23.3478 12.5903 23.283C17.7387 23.283 20.4089 20.0852 20.5848 16.0879C20.7927 11.2912 17.387 5.39131 11.2312 2.54527Z" stroke="#FFB13D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_5079_108178">
        <rect width="24" height="24" fill="white" transform="translate(0.59375 0.878906)" />
      </clipPath>
    </defs>
  </svg>
}


const PrimeTraderIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M11.5205 1.93186C10.8626 1.25107 9.98544 0.878906 9.05561 0.878906H0.529297V4.90916H9.00298C9.22228 4.90916 9.40649 4.71854 9.40649 4.49161C9.40649 4.26468 9.22228 4.07406 9.00298 4.07406H1.33631V1.714H9.0293C10.5118 1.714 11.7311 2.95757 11.7311 4.47346C11.7311 5.21779 11.4591 5.90765 10.9503 6.43413C10.4416 6.9606 9.76614 7.25107 9.05561 7.25107H6.94158V10.4008C6.94158 11.2904 6.2486 12.0257 5.39772 12.0347C4.97667 12.0347 4.58193 11.8713 4.28368 11.5627C3.98544 11.2541 3.81877 10.8456 3.81877 10.419V7.0786H3.01175V10.419C3.01175 11.0726 3.25737 11.6898 3.70474 12.1527C4.1521 12.6157 4.74859 12.8698 5.38017 12.8698H5.38895C6.68719 12.8698 7.74859 11.7533 7.74859 10.3918V8.08617H8.97666C9.97666 8.08617 10.8539 7.714 11.5118 7.03322C12.1696 6.35243 12.5293 5.44472 12.5293 4.48254C12.5293 3.52036 12.1784 2.61264 11.5205 1.93186Z" fill="white" />
    <path d="M9.40553 4.48396C9.40553 4.25703 9.22132 4.06641 9.00202 4.06641H1.34413L0.537109 4.9015H9.00202C9.22132 4.9015 9.40553 4.71996 9.40553 4.48396Z" fill="white" />
    <path d="M6.94154 7.26231V10.4121C6.94154 11.3016 6.24856 12.0369 5.39768 12.046C4.97663 12.046 4.58189 11.8826 4.28365 11.574C3.9854 11.2653 3.81874 10.8569 3.81874 10.4302V7.08984H3.01172V10.4302C3.01172 11.0838 3.25733 11.701 3.7047 12.164C4.15207 12.6269 4.74856 12.8811 5.38014 12.8811H5.38891C6.68716 12.8811 7.74856 11.7646 7.74856 10.403V8.09741L6.94154 7.26231Z" fill="white" />
    <path d="M11.5205 1.93186C10.8626 1.25107 9.98544 0.878906 9.05561 0.878906H0.529297L1.33631 1.714H9.0293C10.5118 1.714 11.7311 2.95757 11.7311 4.47346C11.7311 5.21779 11.4591 5.90765 10.9503 6.43412C10.4416 6.9606 9.76614 7.25107 9.05561 7.25107H6.95035L7.75737 8.08617H9.04684C9.97667 8.08617 10.8539 7.714 11.5118 7.03322C12.1696 6.35243 12.5293 5.44471 12.5293 4.48254C12.5293 3.52036 12.1784 2.61264 11.5205 1.93186Z" fill="white" />
  </svg>
}


const CompleteStreakIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M12.2591 4.37891L5.84245 10.7956L2.92578 7.87891" stroke="#0E1521" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
}



const ArrowIcon = ({ className, onclick }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={onclick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.5886 12.2559C5.26317 12.5814 4.73553 12.5814 4.41009 12.2559C4.08466 11.9305 4.08466 11.4028 4.41009 11.0774L9.41009 6.07741C9.73553 5.75197 10.2632 5.75197 10.5886 6.07741L15.5886 11.0774C15.914 11.4028 15.914 11.9305 15.5886 12.2559C15.2632 12.5814 14.7355 12.5814 14.4101 12.2559L9.99935 7.84518L5.5886 12.2559Z"
        fill="white"
      />
    </svg>
  );
};


const DiscordIconBtn = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path d="M20.317 5.03594C18.7873 4.33406 17.147 3.81695 15.4319 3.52077C15.4007 3.51506 15.3695 3.52934 15.3534 3.55791C15.1424 3.93313 14.9087 4.42263 14.7451 4.80737C12.9004 4.5312 11.0652 4.5312 9.25832 4.80737C9.09465 4.41407 8.85248 3.93313 8.64057 3.55791C8.62449 3.5303 8.59328 3.51601 8.56205 3.52077C6.84791 3.816 5.20756 4.33312 3.67693 5.03594C3.66368 5.04166 3.65233 5.05119 3.64479 5.06356C0.533392 9.71192 -0.31895 14.246 0.0991801 18.7239C0.101072 18.7458 0.11337 18.7668 0.130398 18.7801C2.18321 20.2876 4.17171 21.2029 6.12328 21.8095C6.15451 21.819 6.18761 21.8076 6.20748 21.7819C6.66913 21.1514 7.08064 20.4867 7.43348 19.7877C7.4543 19.7467 7.43442 19.6982 7.39186 19.682C6.73913 19.4344 6.1176 19.1325 5.51973 18.7896C5.47244 18.762 5.46865 18.6944 5.51216 18.662C5.63797 18.5677 5.76382 18.4696 5.88396 18.3706C5.90569 18.3525 5.93598 18.3487 5.96153 18.3601C9.88928 20.1534 14.1415 20.1534 18.023 18.3601C18.0485 18.3477 18.0788 18.3516 18.1015 18.3696C18.2216 18.4687 18.3475 18.5677 18.4742 18.662C18.5177 18.6944 18.5149 18.762 18.4676 18.7896C17.8697 19.1391 17.2482 19.4344 16.5945 19.681C16.552 19.6972 16.533 19.7467 16.5538 19.7877C16.9143 20.4857 17.3258 21.1505 17.7789 21.7809C17.7978 21.8076 17.8319 21.819 17.8631 21.8095C19.8241 21.2029 21.8126 20.2876 23.8654 18.7801C23.8834 18.7668 23.8948 18.7468 23.8967 18.7249C24.3971 13.5479 23.0585 9.05101 20.3482 5.06451C20.3416 5.05119 20.3303 5.04166 20.317 5.03594ZM8.02002 15.9974C6.8375 15.9974 5.86313 14.9117 5.86313 13.5784C5.86313 12.2451 6.8186 11.1595 8.02002 11.1595C9.23087 11.1595 10.1958 12.2547 10.1769 13.5784C10.1769 14.9117 9.22141 15.9974 8.02002 15.9974ZM15.9947 15.9974C14.8123 15.9974 13.8379 14.9117 13.8379 13.5784C13.8379 12.2451 14.7933 11.1595 15.9947 11.1595C17.2056 11.1595 18.1705 12.2547 18.1516 13.5784C18.1516 14.9117 17.2056 15.9974 15.9947 15.9974Z" fill="white" />
  </svg>
}


export default ActiveStreakMob;