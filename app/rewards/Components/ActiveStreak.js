import style from "../style.module.scss";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import {
  get_rewards_accountLevel,
  get_rewards_activityStreaks,
} from "@/app/services/new_service";
import { useEffect, useState } from "react";
import { usePositionContext } from "../context/PositionContext";
import secureLocalStorage from "react-secure-storage";

const ActiveStreak = ({ refreshStreaks, triggerLevelUp }) => {
  const { toggleLoader } = useLoader();
  const [accountData, setAccountData] = useState({
    traderLevel: 0,
    xpForNextLevel: 0,
    totalXp: 0,
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [streakData, setStreakData] = useState({
    currentDayIndex: 0,
    streaks: [false, false, false, false, false, false, false],
  });
  const [activeStreakCount, setActiveStreakCount] = useState(0);
  const { activeStreakRef } = usePositionContext();

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

  const getactivityStreaks = async () => {
    // toggleLoader(true);
    try {
      let accountStreak = await get_rewards_activityStreaks();
      setStreakData({
        currentDayIndex: accountStreak.data.current_day_index,
        streaks: accountStreak.data.streaks,
      });

      // active streak count
      const { current_day_index, streaks } = accountStreak.data;
      console.log(accountStreak.data, "streaks");

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
    } finally {
      toggleLoader(false);
    }
  };

  const fetchStreaks = async () => {
    try {
      let accountStreak = await get_rewards_activityStreaks();
      setStreakData({
        currentDayIndex: accountStreak.data.current_day_index,
        streaks: accountStreak.data.streaks,
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
    console.log("-- refresh streaks from outside the component");
    fetchStreaks();
    getAccountLevel();
    getactivityStreaks();
  }, [refreshStreaks]);

  useEffect(() => {
    getAccountLevel();
    getactivityStreaks();
  }, []);

  return (
    <div className={style.content}>
      <div class={style.imgContainer}>
        <img
          className={style.rewardChar}
          src="/rewardsCenter/img/avatarIcon.png"
          alt="reward center"
        />
      </div>

      <div className={style.trader}>
        <div className={`${style.contentLevel}`}>
          <h1 className={`${style.level}`}>Trader Level</h1>
          <div className={style.levelTrophy}>
            <StreakLevelIcon />
            <h2 className={`${style.levelCount}`}>{accountData.traderLevel}</h2>
          </div>
        </div>
        <div className={style.levelWrapper}>
          <div className={style.contentLevel}>
            <h1>
              Total <br /> XP
            </h1>
            <h2 ref={activeStreakRef}>
              {accountData.totalXp} &nbsp;
              <span className={style.highlightPurple}>XP</span>
            </h2>
          </div>
          <div className={style.XPDivider}></div>

          <div className={style.contentLevel}>
            <h1>
              XP For <br /> Next Level
            </h1>
            <h2>
              {accountData.xpForNextLevel} &nbsp;
              <span className={style.highlightPurple}>XP</span>
            </h2>
          </div>
        </div>
      </div>

      <div className={style.ActiveStreakContainer}>
        <div className={style.streaks}>
          <div className={style.activeStreaks}>
            <h1 className={style.streakTitle}>Active Streak</h1>
            <div className={style.streakFire}>
              <StreakFireIcon />
              <h2 className={style.streakUnit}>{activeStreakCount}</h2>
            </div>
          </div>

          <div className={style.dailyStreaks}>
            <div className={style.days}>
              {daysOfWeek.map((day, index) => (
                <div
                  key={index}
                  className={
                    index === streakData.currentDayIndex
                      ? `${style.day} ${style.active}`
                      : style.day
                  }
                >
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
                    dayClass += streak
                      ? ` ${style.current}`
                      : ` ${style.empty}`;
                  } else if (index === streakData.currentDayIndex) {
                    icon = streak ? <CompleteStreakIcon /> : null;
                    dayClass += streak
                      ? ` ${style.active}`
                      : ` ${style.current}`;
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
        </div>
      </div>
    </div>
  );
};

const StreakFireIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <g clip-path="url(#clip0_5079_108178)">
        <path
          d="M11.2312 2.54527C11.1345 2.48752 11.024 2.45703 10.9114 2.45703C10.7988 2.45703 10.6883 2.48752 10.5917 2.54527C10.5119 2.60845 10.4581 2.69867 10.4404 2.79886C10.4228 2.89905 10.4424 3.00224 10.4957 3.08889C12.4624 6.49454 12.8781 11.1314 10.1919 13.6896C9.15844 12.8211 8.33795 11.7271 7.79358 10.4918C6.80023 11.0435 5.977 11.8568 5.41325 12.8433C4.8495 13.8299 4.56677 14.952 4.59578 16.0879C4.63634 17.0893 4.87677 18.0724 5.30293 18.9795C5.7291 19.8866 6.33239 20.6991 7.0773 21.3696C7.82221 22.04 8.6937 22.5547 9.64047 22.8833C10.5873 23.2118 11.5902 23.3478 12.5903 23.283C17.7387 23.283 20.4089 20.0852 20.5848 16.0879C20.7927 11.2912 17.387 5.39131 11.2312 2.54527Z"
          stroke="#FFB13D"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_5079_108178">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.59375 0.878906)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const StreakLevelIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
    >
      <path
        d="M9.16187 21.8789H15.1619M12.1619 18.1289V21.8789M18.743 12.8789H19.6618C20.4574 12.8789 21.2205 12.5628 21.7831 12.0002C22.3457 11.4376 22.6618 10.6746 22.6618 9.87891V8.37891C22.6618 8.17999 22.5828 7.98923 22.4421 7.84858C22.3015 7.70792 22.1107 7.62891 21.9118 7.62891H18.9118M5.59922 12.8789H4.65234C3.85669 12.8789 3.09363 12.5628 2.53102 12.0002C1.96841 11.4376 1.65234 10.6746 1.65234 9.87891V8.37891C1.65234 8.17999 1.73136 7.98923 1.87201 7.84858C2.01267 7.70792 2.20343 7.62891 2.40234 7.62891H5.40234M5.41187 6.12891V11.2945C5.41187 15.0164 8.39312 18.1008 12.115 18.1289C13.0053 18.1351 13.8881 17.9651 14.7125 17.6286C15.5369 17.2922 16.2865 16.7959 16.9183 16.1685C17.5501 15.5411 18.0515 14.7949 18.3936 13.9729C18.7358 13.1509 18.9119 12.2693 18.9119 11.3789V6.12891C18.9119 5.92999 18.8328 5.73923 18.6922 5.59858C18.5515 5.45792 18.3608 5.37891 18.1619 5.37891H6.16187C5.96295 5.37891 5.77219 5.45792 5.63154 5.59858C5.49088 5.73923 5.41187 5.92999 5.41187 6.12891Z"
        stroke="url(#paint0_linear_6222_86687)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_6222_86687"
          x1="1.65234"
          y1="13.6289"
          x2="23.793"
          y2="13.6289"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#45D3E8" />
          <stop offset="1" stop-color="#0CF54E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const PrimeTraderIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M11.5205 1.93186C10.8626 1.25107 9.98544 0.878906 9.05561 0.878906H0.529297V4.90916H9.00298C9.22228 4.90916 9.40649 4.71854 9.40649 4.49161C9.40649 4.26468 9.22228 4.07406 9.00298 4.07406H1.33631V1.714H9.0293C10.5118 1.714 11.7311 2.95757 11.7311 4.47346C11.7311 5.21779 11.4591 5.90765 10.9503 6.43413C10.4416 6.9606 9.76614 7.25107 9.05561 7.25107H6.94158V10.4008C6.94158 11.2904 6.2486 12.0257 5.39772 12.0347C4.97667 12.0347 4.58193 11.8713 4.28368 11.5627C3.98544 11.2541 3.81877 10.8456 3.81877 10.419V7.0786H3.01175V10.419C3.01175 11.0726 3.25737 11.6898 3.70474 12.1527C4.1521 12.6157 4.74859 12.8698 5.38017 12.8698H5.38895C6.68719 12.8698 7.74859 11.7533 7.74859 10.3918V8.08617H8.97666C9.97666 8.08617 10.8539 7.714 11.5118 7.03322C12.1696 6.35243 12.5293 5.44472 12.5293 4.48254C12.5293 3.52036 12.1784 2.61264 11.5205 1.93186Z"
        fill="white"
      />
      <path
        d="M9.40553 4.48396C9.40553 4.25703 9.22132 4.06641 9.00202 4.06641H1.34413L0.537109 4.9015H9.00202C9.22132 4.9015 9.40553 4.71996 9.40553 4.48396Z"
        fill="white"
      />
      <path
        d="M6.94154 7.26231V10.4121C6.94154 11.3016 6.24856 12.0369 5.39768 12.046C4.97663 12.046 4.58189 11.8826 4.28365 11.574C3.9854 11.2653 3.81874 10.8569 3.81874 10.4302V7.08984H3.01172V10.4302C3.01172 11.0838 3.25733 11.701 3.7047 12.164C4.15207 12.6269 4.74856 12.8811 5.38014 12.8811H5.38891C6.68716 12.8811 7.74856 11.7646 7.74856 10.403V8.09741L6.94154 7.26231Z"
        fill="white"
      />
      <path
        d="M11.5205 1.93186C10.8626 1.25107 9.98544 0.878906 9.05561 0.878906H0.529297L1.33631 1.714H9.0293C10.5118 1.714 11.7311 2.95757 11.7311 4.47346C11.7311 5.21779 11.4591 5.90765 10.9503 6.43412C10.4416 6.9606 9.76614 7.25107 9.05561 7.25107H6.95035L7.75737 8.08617H9.04684C9.97667 8.08617 10.8539 7.714 11.5118 7.03322C12.1696 6.35243 12.5293 5.44471 12.5293 4.48254C12.5293 3.52036 12.1784 2.61264 11.5205 1.93186Z"
        fill="white"
      />
    </svg>
  );
};

const CompleteStreakIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <path
        d="M12.2591 4.37891L5.84245 10.7956L2.92578 7.87891"
        stroke="#0E1521"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ActiveStreak;
