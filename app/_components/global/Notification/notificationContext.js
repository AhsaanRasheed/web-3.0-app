"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [userBlnGlobal, setUserBlnGlobal] = useState(-1);
  const [isUserLoggedInNow, setIsUserLoggedInNow] = useState(null);
  const [resetClaimTimer, setResetClaimTimer] = useState(false);
  const [resetRewardCenter, setResetRewardCenter] = useState(false);


  const [nextPredictionGame, setNextPredictionGame] = useState({
    type: "prediction_next",
    epoch: "0",
    name: "prediction_next",
    prizePool: "",
    bullPayout: "",
    bullAmount: "",
    bearPayout: "",
    bearAmount: "",
    UserAmount: "",
    userDirection: "",
  });
  const [nextPredictionParticipatedGame, setNextPredictionParticipatedGame] =
    useState({
      type: "prediction_participation",
      amount: "0",
      epoch: "0",
      participated: null,
    });
  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      notification,
    ]);
  };

  const updateNotification = (notifications, notification) => {
    return notifications.map((n) =>
      n.id === notification.id
        ? {
            ...n,
            type: notification.type,
            message: notification.message,
            removeSelf: notification.removeSelf,
          }
        : n
    );
  };
  const addOrUpdateNotification = (notification) => {
    setNotifications((prevNotifications) => {
      const existingNotification = prevNotifications.find(
        (n) => n.id === notification.id
      );
      if (existingNotification) {
        // Update the existing notification
        return updateNotification(prevNotifications, notification);
      } else {
        // Add the new notification
        return [...prevNotifications, notification];
      }
    });
  };

  const removeNotification = (idToRemove) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== idToRemove)
    );
  };
  // Notification websocket
  let notificationSocket;
  let isNotificationWsConnected = false;
  let isNotificationWsCount = 0;
  let keepAliveTimer;

  const connectNotificationWs = () => {
    const random_uuid = uuidv4();
    const token = localStorage.getItem("token");
    if (token) {
      const wsUrl =
        typeof window !== "undefined" &&
        (window.location.host.includes("local") ||
          window.location.host.includes("sandbox") ||
          window.location.host.includes("white-label-app-prime-trader.s3") ||
          window.location.host.includes("s3-website"))
          ? `wss://devwebsocket.primetrader.com/global_user_notif?id=${random_uuid}&token=${token}`
          : `wss://websocket.primetrader.com/global_user_notif?id=${random_uuid}&token=${token}`;
      // addNotification({
      //   id: Math.random().toString(36).substr(2, 9),
      //   type: "success",
      //   message: "Establishing Connection...",
      //   isloader: true,
      //   customProp: null,
      // });
      notificationSocket = new WebSocket(wsUrl);

      notificationSocket.onopen = () => {
        isNotificationWsConnected = true;
        keepAliveTimer = setInterval(() => {
          if (notificationSocket.readyState === WebSocket.OPEN) {
            notificationSocket.send(JSON.stringify({ type: "ping" }));
          }
        }, 10000);
        // addNotification({
        //   id: Math.random().toString(36).substr(2, 9),
        //   type: "success",
        //   message: "Connection Established",
        //   customProp: null,
        // });
        console.log("Notification WebSocket Open");
      };

      notificationSocket.onerror = (error) => {
        console.error("Notification WebSocket error:", error);
        // addNotification({
        //   id: Math.random().toString(36).substr(2, 9),
        //   type: "fail",
        //   message: "Connection Broke",
        //   customProp: null,
        // });
        isNotificationWsConnected = false;
        // const messageTimer = setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        // attemptNotificationWsReconnect();
      };

      notificationSocket.onclose = () => {
        console.log("Notification WebSocket onclose");
        isNotificationWsConnected = false;
        clearInterval(keepAliveTimer);
        // addNotification({
        //   id: Math.random().toString(36).substr(2, 9),
        //   type: "fail",
        //   message: "Connection Broke",
        //   customProp: null,
        // });
        if (notificationSocket.readyState === WebSocket.OPEN)
          notificationSocket.close();
        const messageTimer = setTimeout(() => {
          // window.location.reload();

          attemptNotificationWsReconnect();
        }, 4000);
        // const messageTimer = setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
        // attemptNotificationWsReconnect();
      };

      notificationSocket.onmessage = (event) => {
        console.log("Notification WebSocket event.data", event.data);
        const data = JSON.parse(event.data);
        if (data.type == "prediction_next") {
          // tx_notification
          setNextPredictionGame(data);
        } else if (data.type == "tx_notification") {
          addOrUpdateNotification({
            id: data.notification_id,
            type: data.name == "Error" ? "fail" : "success",
            message: data.message.toLowerCase().includes("internal")
              ? "Transaction failed"
              : data.message,
            websocketNotification: true,
            websocketNotificationName: data.name,
            removeSelf: data.end,
            customProp: null,
          });
          if (data.name !== "Error") {
            setNextPredictionParticipatedGame({ failed: false });
          }
        } else if (data.type == "prediction_participation") {
          setNextPredictionParticipatedGame(data);
        } else if (data.type == "prediction_failure") {
          setNextPredictionParticipatedGame({ failed: true });
        } else if (data.type == "wallet_update") {
          setUserBlnGlobal(data.balance);
        }
      };
    }
  };
  const attemptNotificationWsReconnect = async () => {
    connectNotificationWs();
  };
  useEffect(() => {
    connectNotificationWs();

    return () => {
      notificationSocket.close();
    };
  }, []);
  useEffect(() => {
    if (isUserLoggedInNow == true) connectNotificationWs();
  }, [isUserLoggedInNow]);
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        nextPredictionGame,
        nextPredictionParticipatedGame,
        userBlnGlobal,
        setIsUserLoggedInNow,
        resetClaimTimer,
        setResetClaimTimer,
        resetRewardCenter,
        setResetRewardCenter
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
