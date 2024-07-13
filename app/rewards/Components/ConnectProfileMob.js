import {
  get_rewards_claimReward,
  get_rewards_tasksOneTime,
} from "@/app/services/new_service";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import style from "../style.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/app/apiUrl";
import secureLocalStorage from "react-secure-storage";

const ConnectProfileMob = () => {
  const { toggleLoader } = useLoader();
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await get_rewards_tasksOneTime();
        const fetchedTasks = response.data;
        setTasks(response.data);

        // Calculate the progress
        const totalTasks = fetchedTasks.length;
        const completedTasks = fetchedTasks.filter(
          (fetchedTasks) => fetchedTasks.is_completed
        ).length;
        const progressPercentage =
          totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        console.log(
          completedTasks,
          totalTasks,
          progressPercentage,
          fetchedTasks
        );
        setProgress(progressPercentage);
      } catch (error) {
        console.error("Error fetching tasks data:", error);
      } finally {
      }
    };

    fetchTasks();
  }, []);

  const fetchTasksWithoutLoader = async () => {
    try {
      const response = await get_rewards_tasksOneTime();
      const fetchedTasks = response.data;
      setTasks(response.data);

      // Calculate the progress
      const totalTasks = fetchedTasks.length;
      const completedTasks = fetchedTasks.filter(
        (fetchedTasks) => fetchedTasks.is_completed
      ).length;
      const progressPercentage =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      console.log(completedTasks, totalTasks, progressPercentage, fetchedTasks);
      setProgress(progressPercentage);
    } catch (error) {
      console.error("Error fetching tasks data:", error);
    }
  };

  const getIconButton = (taskName) => {
    switch (taskName.toLowerCase()) {
      case "update profile: name and country":
        return <PersonIconBtn />;
      case "connect discord":
        return <DiscordIconBtn />;
      case "connect x":
        return <TwitterIconBtn />;
      case "connect wallet":
        return <WalletIconBtn />;
      default:
        return null;
    }
  };

  const claimOneTimeReward = async (taskId, taskType, xp) => {
    try {
      const response = await get_rewards_claimReward(taskId, taskType);
      if (response.ok) {
        fetchTasksWithoutLoader();
        triggerRefreshStreaks();
        handleAddNotification(
          "success",
          `Successfully claimed the reward of ${xp} XP.`
        );
      } else {
        fetchTasksWithoutLoader();
        triggerRefreshStreaks();
      }
      handleAddNotification(
        "success",
        `Successfully claimed the reward of ${xp} XP.`
      );
    } catch (error) {
      handleAddNotification(
        "error",
        "An error occurred while claiming the reward."
      );
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

  function transformText(text) {
    return text.replace(/ And /g, " and ");
  }

  const getLinkForTask = (taskName) => {
    const lowerCaseTaskName = taskName.toLowerCase();

    if (lowerCaseTaskName === "update profile: name and country") {
      return "/profile/?s=Settings";
    } else {
      return "/";
    }
  };
  const loginWithX = async () => {
    try {
      toggleLoader(true);

      const response = await fetch(`${apiUrl}/api/v1/login/twitter`);
      const data = await response.json();
      console.log("response = ", data);
      toggleLoader(false);
      if (response.status == 200) {
        let tempUser = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("socialUser", tempUser.user_id);
        window.location.replace(data.data);
      } else {
        handleAddNotification("fail", "Error during X login initiation");
      }
    } catch (error) {
      console.error("Error during X login initiation: ", error);
      handleAddNotification("fail", "Error during X login initiation");

      toggleLoader(false);
    }
  };

  return (
    <div className={style.buttonsContainer}>
      {tasks?.map((task) => (
        <Link
          href={getLinkForTask(task.name)}
          onClick={(e) => {
            if (task.name.toLowerCase() == "connect x" && !task.is_completed) {
              e.stopPropagation();
              e.preventDefault();
              loginWithX();
            } else if (task.is_completed) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
        >
          <div
            key={task.id}
            className={task.is_completed ? style.buttonCompleted : style.button}
          >
            <div className={style.body}>
              <div>
                {getIconButton(task.name)}
                <span>{transformText(task.name)}</span>
              </div>
              {task.is_completed ? (
                <CircleCompleteBtn />
              ) : (
                <CircleUnCompleteBtn />
              )}
            </div>
            {task.is_completed && !task.reward_claimed && (
              <div
                className={style.buttonClaim}
                onClick={() => claimOneTimeReward(task.id, task.task_type, task.reward_xp)}
              >
                Claim
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

const CircleUnCompleteBtn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
    >
      <circle
        cx="10.0852"
        cy="10.8801"
        r="8.91528"
        stroke="#D376FF"
        stroke-opacity="0.5"
        stroke-width="2"
      />
    </svg>
  );
};

const CircleCompleteBtn = () => {
  return <img src="/rewardsCenter/icons/checkboxComplete.svg" alt="person" />;
};

const DiscordIconBtn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M20.317 5.03594C18.7873 4.33406 17.147 3.81695 15.4319 3.52077C15.4007 3.51506 15.3695 3.52934 15.3534 3.55791C15.1424 3.93313 14.9087 4.42263 14.7451 4.80737C12.9004 4.5312 11.0652 4.5312 9.25832 4.80737C9.09465 4.41407 8.85248 3.93313 8.64057 3.55791C8.62449 3.5303 8.59328 3.51601 8.56205 3.52077C6.84791 3.816 5.20756 4.33312 3.67693 5.03594C3.66368 5.04166 3.65233 5.05119 3.64479 5.06356C0.533392 9.71192 -0.31895 14.246 0.0991801 18.7239C0.101072 18.7458 0.11337 18.7668 0.130398 18.7801C2.18321 20.2876 4.17171 21.2029 6.12328 21.8095C6.15451 21.819 6.18761 21.8076 6.20748 21.7819C6.66913 21.1514 7.08064 20.4867 7.43348 19.7877C7.4543 19.7467 7.43442 19.6982 7.39186 19.682C6.73913 19.4344 6.1176 19.1325 5.51973 18.7896C5.47244 18.762 5.46865 18.6944 5.51216 18.662C5.63797 18.5677 5.76382 18.4696 5.88396 18.3706C5.90569 18.3525 5.93598 18.3487 5.96153 18.3601C9.88928 20.1534 14.1415 20.1534 18.023 18.3601C18.0485 18.3477 18.0788 18.3516 18.1015 18.3696C18.2216 18.4687 18.3475 18.5677 18.4742 18.662C18.5177 18.6944 18.5149 18.762 18.4676 18.7896C17.8697 19.1391 17.2482 19.4344 16.5945 19.681C16.552 19.6972 16.533 19.7467 16.5538 19.7877C16.9143 20.4857 17.3258 21.1505 17.7789 21.7809C17.7978 21.8076 17.8319 21.819 17.8631 21.8095C19.8241 21.2029 21.8126 20.2876 23.8654 18.7801C23.8834 18.7668 23.8948 18.7468 23.8967 18.7249C24.3971 13.5479 23.0585 9.05101 20.3482 5.06451C20.3416 5.05119 20.3303 5.04166 20.317 5.03594ZM8.02002 15.9974C6.8375 15.9974 5.86313 14.9117 5.86313 13.5784C5.86313 12.2451 6.8186 11.1595 8.02002 11.1595C9.23087 11.1595 10.1958 12.2547 10.1769 13.5784C10.1769 14.9117 9.22141 15.9974 8.02002 15.9974ZM15.9947 15.9974C14.8123 15.9974 13.8379 14.9117 13.8379 13.5784C13.8379 12.2451 14.7933 11.1595 15.9947 11.1595C17.2056 11.1595 18.1705 12.2547 18.1516 13.5784C18.1516 14.9117 17.2056 15.9974 15.9947 15.9974Z"
        fill="white"
      />
    </svg>
  );
};

const TwitterIconBtn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M18.3263 2.78125H21.6998L14.3297 11.2047L23 22.6672H16.2112L10.894 15.7153L4.80995 22.6672H1.43443L9.31743 13.6573L1 2.78125H7.96111L12.7674 9.13558L18.3263 2.78125ZM17.1423 20.648H19.0116L6.94539 4.69438H4.93946L17.1423 20.648Z"
        fill="white"
      />
    </svg>
  );
};

const PersonIconBtn = () => {
  return <img src="/rewardsCenter/icons/person.svg" alt="person" />;
};

const WalletIconBtn = () => {
  return <img src="/rewardsCenter/icons/wallet.svg" alt="wallet" />;
};

export default ConnectProfileMob;
