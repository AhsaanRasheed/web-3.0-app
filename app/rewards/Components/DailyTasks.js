import { useEffect, useRef, useState } from "react";
import style from "../style.module.scss";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import {
  get_rewards_claimReward,
  get_rewards_tasksDaily,
} from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { usePositionContext } from "../context/PositionContext";
import Link from "next/link";

const DailyTasks = ({
  isCollapsed,
  toggleCollapse,
  triggerRefreshStreaks,
  refreshData,
  setRefreshData,
}) => {
  const { toggleLoader } = useLoader();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isNextArrowDisabled, setIsNextArrowDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimeRemaining, setIsTimeRemaining] = useState(false);
  const { addNotification } = useNotification();
  const [isLoadingClaim, setIsLoadingClaim] = useState(false);
  useEffect(() => {
    if (refreshData == true) {
      setCurrentDate(new Date());
      setRefreshData(false);
    }
  }, [refreshData]);
  const handleBackward = async () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
    setIsNextArrowDisabled(false);
    await fetchTasks(prevDate);
  };

  const handleForward = async () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
    await fetchTasks(nextDate);
  };

  const fetchTasks = async (date) => {
    console.log("--fetchTasks", date);
    try {
      // disable
      const today = new Date();
      const isNextDayToday = date.toDateString() === today.toDateString();
      setIsNextArrowDisabled(isNextDayToday);

      const response = await get_rewards_tasksDaily(
        date.toISOString().split("T")[0]
      );
      console.log(response, "-- data daily");
      const activeTasks = (
        response.data.user_rc_tasks_with_reward || []
      ).filter((task) => task.active);
      setTasks(activeTasks);
      if (response.data.time_remaining > 0) {
        setIsTimeRemaining(true);
        setTimeRemaining(response.data.time_remaining);
      } else {
        setIsTimeRemaining(false);
      }
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchTasks(currentDate);
  }, [currentDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };

  const calculateTimeRemaining = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const formattedRemainingTime = calculateTimeRemaining(timeRemaining);
  const { hours, minutes, seconds } = formattedRemainingTime;

  function mockResponse(ok = true) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ok: ok });
      }, 4000);
    });
  }

  const claimDailyReward = async (
    taskId,
    taskType,
    xp,
    handleClick,
    setIsLoadingClaim
  ) => {
    setIsLoadingClaim(true);
    console.log("--claimDailyReward");

    try {
      setTimeout(async () => {
        const fromDate = new Date(currentDate).toISOString().split("T")[0];
        const toDate = new Date(currentDate).toISOString().split("T")[0];

        const response = await get_rewards_claimReward(
          taskId,
          taskType,
          fromDate,
          toDate
        );
        console.log(response, "-- claimDailyRewards");
        if (response.message === "successfully claimed the reward") {
          triggerRefreshStreaks();
          fetchTasks(currentDate);
          handleAddNotification(
            "success",
            `Successfully claimed the reward of ${xp} XP.`
          );
          handleClick();
          console.log("--claimDailyReward", currentDate);
        }
        console.log("Reward claimed successfully:", response);
      }, 300);
    } catch (error) {
      handleAddNotification(
        "error",
        "An error occurred while claiming the reward."
      );
      console.error("Error claiming daily reward:", error);
    } finally {
      setIsLoadingClaim(false);
    }
  };

  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };

  return (
    <div className={style.topContent}>
      <div className={style.filters}>
        <div className={style.filter}>
          <div className={style.dailyFilter}>
            <ArrowIcon
              className={isCollapsed ? style.rotate270 : style.rotate180}
              onclick={toggleCollapse}
            />
            Daily Tasks
          </div>
          <div className={style.dayFilter}>
            <ArrowIcon className={style.rotate270} onclick={handleBackward} />
            {formatDate(currentDate)}
            <ArrowIcon
              className={style.rotate90}
              onclick={handleForward}
              disabled={isNextArrowDisabled}
            />
          </div>
        </div>

        <div className={style.taglinesFilter}>
          <div className={style.dailyFilter}>Finish Your Tasks to win XP</div>
          {isTimeRemaining && (
            <div className={style.dayFilter}>
              Ends in{" "}
              <span
                className={style.highlightPurple}
              >{`${hours}h ${minutes}m ${seconds}s`}</span>
            </div>
          )}
        </div>
      </div>

      {!isCollapsed && (
        <div className={style.rewardsList}>
          {tasks?.map((task) => (
            <div key={task.id} className={style.rewardsItem}>
              {task.is_completed ? (
                <TaskReadyToClaim
                  task={task}
                  claimDailyReward={
                    !isLoadingClaim ? claimDailyReward : () => {}
                  }
                  setIsLoadingClaim={setIsLoadingClaim}
                />
              ) : (
                <TaskInProgress task={task} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getIconForTask = (taskName) => {
  const lowerCaseTaskName = taskName.toLowerCase();

  if (
    lowerCaseTaskName === "take quizzes" ||
    lowerCaseTaskName.includes("quiz")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/answer_quiz.svg";
  } else if (
    lowerCaseTaskName === "correct quizzes" ||
    lowerCaseTaskName.includes("correct")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/quiz_correct.svg";
  } else if (
    lowerCaseTaskName === "play prediction" ||
    lowerCaseTaskName.includes("play prediction")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/play_prediction.svg";
  } else if (
    lowerCaseTaskName === "stake ptv" ||
    lowerCaseTaskName.includes("stake")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/stake_ptv.svg";
  } else if (
    lowerCaseTaskName === "claim ptv" ||
    lowerCaseTaskName.includes("claim")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/claim.svg";
  } else if (
    lowerCaseTaskName === "win prediction" ||
    lowerCaseTaskName.includes("win prediction")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/predict_correct.svg";
  } else if (
    lowerCaseTaskName === "refer a friend" ||
    lowerCaseTaskName.includes("refer")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/refer.svg";
  } else if (
    lowerCaseTaskName === "complete all tasks" ||
    lowerCaseTaskName.includes("tasks")
  ) {
    return "/rewardsCenter/icons/rewardsNewIcons/completeDailyTask.svg";
  } else {
    return "/rewardsCenter/icons/rewardsNewIcons/claim.svg";
  }
};

const getLinkForTask = (taskName) => {
  const lowerCaseTaskName = taskName.toLowerCase();

  if (
    lowerCaseTaskName === "take quizzes" ||
    lowerCaseTaskName.includes("quiz")
  ) {
    return "/news";
  } else if (
    lowerCaseTaskName === "correct quizzes" ||
    lowerCaseTaskName.includes("correct")
  ) {
    return "/news";
  } else if (
    lowerCaseTaskName === "play prediction" ||
    lowerCaseTaskName.includes("prediction")
  ) {
    return "/prediction_game";
  } else if (
    lowerCaseTaskName === "stake ptv" ||
    lowerCaseTaskName.includes("stake")
  ) {
    return "/staking-latest/?s=Staking";
  } else if (
    lowerCaseTaskName === "claim ptv" ||
    lowerCaseTaskName.includes("claim")
  ) {
    return "/staking-latest/?s=Staking";
  } else if (
    lowerCaseTaskName === "win prediction" ||
    lowerCaseTaskName.includes("win")
  ) {
    return "/prediction_game";
  } else if (
    lowerCaseTaskName === "refer a friend" ||
    lowerCaseTaskName.includes("refer")
  ) {
    return "/refer-earn/?s=Refer";
  } else {
    return "/";
  }
};

const TaskReadyToClaim = ({ task, claimDailyReward, setIsLoadingClaim }) => {
  const [animateClaimXP, setAnimateClaimXP] = useState(false);
  const [animateGiftBox, setAnimateGiftBox] = useState(false);
  const [animateIcon, setAnimateIcon] = useState(false);

  const startAnimationSequence = () => {
    console.log("--interval for claim animation started");
    setAnimateClaimXP(true);
    setTimeout(() => {
      setAnimateGiftBox(true);
      setAnimateClaimXP(false);
    }, 2000);
    setTimeout(() => {
      setAnimateGiftBox(false);
      setAnimateClaimXP(false);
      setAnimateIcon(true);
    }, 3500);
    setTimeout(() => {
      setAnimateGiftBox(false);
      setAnimateIcon(false);
      setAnimateClaimXP(false);
    }, 4500);
    setTimeout(() => {
      setAnimateGiftBox(false);
      setAnimateIcon(false);
      setAnimateClaimXP(true);
    }, 5000);
  };

  useEffect(() => {
    startAnimationSequence();
    const interval = setInterval(startAnimationSequence, 8000);

    return () => clearInterval(interval);
  }, []);

  // Animation of XP
  const [XPanimate, setXPAnimate] = useState(false);
  const { calculateTargetPosition } = usePositionContext();
  const dailyTaskRef = useRef(null);

  const handleClick = () => {
    calculateTargetPosition(dailyTaskRef.current);

    setXPAnimate(true);
    setTimeout(() => {
      setXPAnimate(false);
    }, 1500);
  };

  return (
    <>
      <div className={style.rewardsItem}>
        <div
          className={style.circleWithBorder}
          onClick={() => {
            if (task.is_completed && !task.reward_claimed) {
              claimDailyReward(
                task.id,
                task.task_type,
                task.reward_xp,
                handleClick,
                setIsLoadingClaim
              );
            }
          }}
          data-claimed={task.reward_claimed}
        >
          <div
            ref={dailyTaskRef}
            className={`${style.XPItem} ${
              XPanimate ? style.XPitemAnimate : ""
            }`}
            data-prefix={`+${task.reward_xp} ${String.fromCharCode(160)}`}
            data-suffix="XP"
          ></div>
          <div className={style.bg}>
            <div className={style.fill}>
              {task.reward_claimed && (
                <>
                  <img src={getIconForTask(task.name)} alt="checkbox" />
                  <div className={style.checkbox}></div>
                </>
              )}
              {!task.reward_claimed && (
                <>
                  {/* {!animateClaimXP && !animateGiftBox && (
                                        <div className={`${style.title}`}>
                                            Claim <br /> XP
                                        </div>
                                    )} */}
                  {animateClaimXP && (
                    <div className={`${style.title} ${style.animateClaimXP}`}>
                      Claim <br /> XP
                    </div>
                  )}
                  {animateGiftBox && (
                    <img
                      className={`${style.animateGiftbox}`}
                      src={getIconForTask(task.name)}
                      alt="checkbox"
                    />
                  )}
                  {animateIcon && (
                    <img
                      className={`${style.animateIcon}`}
                      src={getIconForTask(task.name)}
                      alt="checkbox"
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <p>{CapitalizePTV(task.name)}</p>
        <p>
          {task.total_count ? (
            <span className={style.highlightPurple}>
              {task.activity_count > task.total_count
                ? task.total_count
                : task.activity_count}
            </span>
          ) : null}
          {task.total_count ? `/${task.total_count}` : null} -{" "}
          <span className={style.highlight}>{task.reward_xp} XP</span>
        </p>
      </div>
    </>
  );
};

const TaskInProgress = ({ task }) => {
  // const [XPanimate, setXPAnimate] = useState(false);
  // const { calculateTargetPosition } = usePositionContext();
  // const dailyTaskRef = useRef(null);

  // const handleClick = () => {
  //     calculateTargetPosition(dailyTaskRef.current);

  //     setXPAnimate(true);
  //     setTimeout(() => {
  //         setXPAnimate(false);
  //     }, 1500);
  // };

  return (
    <>
      <div className={`${style.circleWithoutBorder}`}>
        <Link href={getLinkForTask(task.name)}>
          <img src={getIconForTask(task.name)} alt="checkbox" />
        </Link>
      </div>
      <p>{CapitalizePTV(task.name)}</p>
      <p>
        {task.total_count ? (
          <span className={style.highlightPurple}>
            {task.activity_count > task.total_count
              ? task.total_count
              : task.activity_count}
          </span>
        ) : null}
        {task.total_count ? `/${task.total_count}` : null} -{" "}
        <span className={style.highlight}>{task.reward_xp} XP</span>
      </p>
    </>
  );
};

const CapitalizePTV = (taskName) => {
  const ptvRegex = /ptv\b/gi;
  return taskName.replace(ptvRegex, (match) => match.toUpperCase());
};

const ArrowIcon = ({ className, onclick, disabled }) => {
  return (
    <svg
      className={`${className} ${disabled ? style.disabled : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      onClick={!disabled ? onclick : undefined}
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

export default DailyTasks;
