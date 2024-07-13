import { useEffect, useRef, useState } from "react";
import style from "../style.module.scss";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import {
    get_rewards_claimReward,
    get_rewards_tasksWeekly,
} from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { usePositionContext } from "../context/PositionContext";
import Link from "next/link";

const WeeklyTasks = ({
    isCollapsed,
    toggleCollapse,
    triggerRefreshStreaks,
    refreshData,
    setRefreshData,
}) => {
    const { toggleLoader } = useLoader();
    const [tasks, setTasks] = useState([]);
    const { addNotification } = useNotification();
    const [currentWeek, setCurrentWeek] = useState(() => {
        const fromDate = new Date();
        const dayOfWeek = fromDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const lastSunday = new Date(fromDate);
        lastSunday.setDate(fromDate.getDate() - dayOfWeek);

        const toDate = new Date(lastSunday);
        toDate.setDate(lastSunday.getDate() + 6);

        return { from_date: lastSunday, to_date: toDate };
    });
    useEffect(() => {
        if (refreshData == true) {
            setCurrentWeek(() => {
            const fromDate = new Date();
            const dayOfWeek = fromDate.getDay(); // 0 (Sunday) to 6 (Saturday)
            const lastSunday = new Date(fromDate);
            lastSunday.setDate(fromDate.getDate() - dayOfWeek);
    
            const toDate = new Date(lastSunday);
            toDate.setDate(lastSunday.getDate() + 6);
    
            return { from_date: lastSunday, to_date: toDate };
        });
          setRefreshData(false);
        }
      }, [refreshData]);
    const [isNextArrowDisabled, setIsNextArrowDisabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isTimeRemaining, setIsTimeRemaining] = useState(false);
    const [isLoadingClaim, setIsLoadingClaim] = useState(false);

    const handleBackward = async () => {
        const from_date = new Date(currentWeek.from_date);
        from_date.setDate(from_date.getDate() - 7);
        const to_date = new Date(from_date);
        to_date.setDate(to_date.getDate() + 6);
        setCurrentWeek({ from_date, to_date });
        setIsNextArrowDisabled(false);
        await fetchTasks(from_date, to_date);
    };

    const handleForward = async () => {
        const from_date = new Date(currentWeek.from_date);
        from_date.setDate(from_date.getDate() + 7);
        const to_date = new Date(from_date);
        to_date.setDate(to_date.getDate() + 6);
        setCurrentWeek({ from_date, to_date });
        await fetchTasks(from_date, to_date);
    };

    const fetchTasks = async (from_date, to_date) => {
        console.log("Fetch tasks weekly");
        try {
            const today = new Date();
            const isNextWeekToday = to_date >= today;
            setIsNextArrowDisabled(isNextWeekToday);

            const response = await get_rewards_tasksWeekly(
                from_date.toISOString().split("T")[0],
                to_date.toISOString().split("T")[0]
            );
            const activeTasks = (response.data.user_rc_tasks_with_reward || []).filter(
                (task) => task.active
            );
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
        fetchTasks(currentWeek.from_date, currentWeek.to_date);
    }, [currentWeek]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatWeekDate = (from_date, to_date) => {
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
        const fromDay = from_date.getDate();
        const fromMonth = months[from_date.getMonth()];
        const toDay = to_date.getDate();
        const toMonth = months[to_date.getMonth()];
        return `${fromDay} ${fromMonth} - ${toDay} ${toMonth}`;
    };

    const calculateTimeRemaining = (totalSeconds) => {
        const days = Math.floor(totalSeconds / 86400); // 1 day = 86400 seconds
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { days, hours, minutes, seconds };
    };

    const formattedRemainingTime = calculateTimeRemaining(timeRemaining);
    const { days, hours, minutes, seconds } = formattedRemainingTime;

    function formatDate(date) {
        if (date instanceof Date) {
            return date.toISOString().split("T")[0];
        }

        if (typeof date === "string") {
            return date.split("T")[0];
        }

        throw new TypeError("Invalid date format");
    }

    const claimWeeklyReward = async (taskId, taskType, xp, handleClick, setIsLoadingClaim) => {
        setIsLoadingClaim(true);
        console.log("--claimWeeklyReward");

        try {
            setTimeout(async () => {
                const from_date = formatDate(currentWeek.from_date);
                const to_date = formatDate(currentWeek.to_date);

                const response = await get_rewards_claimReward(
                    taskId,
                    taskType,
                    from_date,
                    to_date
                );
                if (response.message === "successfully claimed the reward") {
                    triggerRefreshStreaks();
                    fetchTasks(currentWeek.from_date, currentWeek.to_date);
                    handleAddNotification(
                        "success",
                        `Successfully claimed the reward of ${xp} XP.`
                    );
                    handleClick();
                    console.log("--claimDailyReward", currentWeek);
                }
                console.log("Reward claimed successfully:", response);
            }, 300);
        } catch (error) {
            setIsLoadingClaim(false)
            console.error("Error claiming daily reward:", error);
        } finally {
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
        <div className={style.bottomContent}>
            <div className={style.filters}>
                <div className={style.filter}>
                    <div className={style.dailyFilter}>
                        <ArrowIcon
                            className={isCollapsed ? style.rotate270 : style.rotate180}
                            onclick={toggleCollapse}
                        />
                        Weekly Tasks
                    </div>
                    <div className={style.dayFilter}>
                        <ArrowIcon className={style.rotate270} onclick={handleBackward} />
                        {formatWeekDate(currentWeek.from_date, currentWeek.to_date)}
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
                                style={{ width: 120 }}
                            >{`${days}d ${hours}h ${minutes}m ${seconds}s`}</span>
                        </div>
                    )}
                </div>

                {!isCollapsed && (
                    <div className={style.rewardsList}>
                        {tasks?.map((task) => (
                            <div key={task.id} className={style.rewardsItem}>
                                {task.is_completed ? (
                                    <TaskReadyToClaim
                                        task={task}
                                        claimWeeklyReward={!isLoadingClaim ? claimWeeklyReward : () => { }}
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
        </div>
    );
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

const getIconForTask = (taskName) => {
    const lowerCaseTaskName = taskName.toLowerCase();

    if (lowerCaseTaskName === "take quizzes" || lowerCaseTaskName.includes("quiz")) {
        return "/rewardsCenter/icons/rewardsNewIcons/answer_quiz.svg";
    } else if (lowerCaseTaskName === "correct quizzes" || lowerCaseTaskName.includes("correct")) {
        return "/rewardsCenter/icons/rewardsNewIcons/quiz_correct.svg";
    } else if (lowerCaseTaskName === "play prediction" || lowerCaseTaskName.includes("play prediction")) {
        return "/rewardsCenter/icons/rewardsNewIcons/play_prediction.svg";
    } else if (lowerCaseTaskName === "stake ptv" || lowerCaseTaskName.includes("stake")) {
        return "/rewardsCenter/icons/rewardsNewIcons/stake_ptv.svg";
    } else if (lowerCaseTaskName === "claim ptv" || lowerCaseTaskName.includes("claim")) {
        return "/rewardsCenter/icons/rewardsNewIcons/claim.svg";
    } else if (lowerCaseTaskName === "win prediction" || lowerCaseTaskName.includes("win prediction")) {
        return "/rewardsCenter/icons/rewardsNewIcons/predict_correct.svg";
    } else if (lowerCaseTaskName === "refer a friend" || lowerCaseTaskName.includes("refer")) {
        return "/rewardsCenter/icons/rewardsNewIcons/refer.svg";
    } else if (lowerCaseTaskName === "complete all tasks" || lowerCaseTaskName.includes("tasks")) {
        return "/rewardsCenter/icons/rewardsNewIcons/completeDailyTask.svg";
    } else {
        return "/rewardsCenter/icons/rewardsNewIcons/claim.svg";
    }
};

const getLinkForTask = (taskName) => {
    const lowerCaseTaskName = taskName.toLowerCase();

    if (lowerCaseTaskName === "take quizzes" || lowerCaseTaskName.includes("quiz")) {
        return "/news";
    } else if (lowerCaseTaskName === "correct quizzes" || lowerCaseTaskName.includes("correct")) {
        return "/news";
    } else if (lowerCaseTaskName === "play prediction" || lowerCaseTaskName.includes("prediction")) {
        return "/prediction_game";
    } else if (lowerCaseTaskName === "stake ptv" || lowerCaseTaskName.includes("stake")) {
        return "/staking-latest/?s=Staking";
    } else if (lowerCaseTaskName === "claim ptv" || lowerCaseTaskName.includes("claim")) {
        return "/staking-latest/?s=Staking";
    } else if (lowerCaseTaskName === "win prediction" || lowerCaseTaskName.includes("win")) {
        return "/prediction_game";
    } else if (lowerCaseTaskName === "refer a friend" || lowerCaseTaskName.includes("refer")) {
        return "/refer-earn/?s=Refer";
    } else {
        return "/";
    }
};


const TaskReadyToClaim = ({ task, claimWeeklyReward, setIsLoadingClaim }) => {
    const [animateClaimXP, setAnimateClaimXP] = useState(false);
    const [animateGiftBox, setAnimateGiftBox] = useState(false);
    const [animateIcon, setAnimateIcon] = useState(false);

    const startAnimationSequence = () => {
        console.log("--interval for claim animation started");
        setAnimateClaimXP(true);
        setTimeout(() => {
            setAnimateGiftBox(true);
            setAnimateClaimXP(false)
        }, 2000);
        setTimeout(() => {
            setAnimateGiftBox(false);
            setAnimateClaimXP(false);
            setAnimateIcon(true)
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
                            claimWeeklyReward(task.id, task.task_type, task.reward_xp, handleClick, setIsLoadingClaim);
                        }
                    }}
                    data-claimed={task.reward_claimed}
                >
                    <div ref={dailyTaskRef} className={`${style.XPItem} ${XPanimate ? style.XPitemAnimate : ''}`} data-prefix={`+${task.reward_xp} ${String.fromCharCode(160)}`} data-suffix="XP"></div>
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
                                    {/* {!animateClaimXP && !animateGiftBox && !animateIcon && (
                                        <div className={`${style.title}`}>
                                            Claim <br /> XP
                                        </div>
                                    )} */}
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
                                    {animateClaimXP && (
                                        <div className={`${style.title} ${style.animateClaimXP}`}>
                                            Claim <br /> XP
                                        </div>
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

const CapitalizePTV = (taskName) => {
    const ptvRegex = /ptv\b/gi;
    return taskName.replace(ptvRegex, (match) => match.toUpperCase());
};

const TaskInProgress = ({ task }) => {
    return (
        <>
            <div className={style.circleWithoutBorder}>
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

export default WeeklyTasks;
