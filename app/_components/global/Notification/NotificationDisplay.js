"use client";
import React, { useEffect, useCallback, useState, useRef } from "react";
import { useNotification } from "./notificationContext";
import "../style.css";
export default function NotificationDisplay() {
  const { notifications, removeNotification } = useNotification();

  return (
    <div
      className="notification-container"
      style={{ display: notifications.length == 0 ? "none" : "" }}
    >
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          removeNotification={removeNotification}
        />
      ))}
    </div>
  );
}

const NotificationCard = React.memo(({ notification, removeNotification }) => {
  const [HideSelf, setHideSelf] = useState(false);
  const prevMessageRef = useRef(notification.message);
  const too = async () => {
    if (
      notification?.websocketNotification != null &&
      notification?.websocketNotification === true &&
      notification.removeSelf === false
    ) {
      return;
    }
    await delay(5000);
    removeNotification(notification.id);
  };

  useEffect(() => {
    if (notification.removeSelf === true) {
      too();
    }
  }, [notification.removeSelf]);

  useEffect(() => {
    too();
    return;
  }, []);

  const handleRemoveNotification = useCallback(() => {
    removeNotification(notification.id);
  }, [notification, removeNotification]);

  useEffect(() => {
    const messageTimer = setTimeout(() => {
      if (notification.message === prevMessageRef.current) {
        handleRemoveNotification();
      }
    }, 60000);

    return () => clearTimeout(messageTimer);
  }, [notification.message]);

  return (
    <div
      className={`notification notification-${notification.type}`}
      style={{ display: HideSelf ? "none" : "" }}
    >
      <div className="leftBar">
        {notification?.websocketNotification != null &&
        notification?.websocketNotification === true &&
        notification.removeSelf === false ? (
          <LoadingIcon />
        ) : notification.type === "success" && !notification.isloader ? (
          <SuccusIcon />
        ) : notification?.isloader == true ? (
          <LoadingIcon />
        ) : (
          <FailIcon />
        )}
        <label>{notification.message}</label>
      </div>
      <div style={{ cursor: "pointer" }} onClick={handleRemoveNotification}>
        <CloseIcon />
      </div>
    </div>
  );
});

NotificationCard.displayName = "NotificationCard";

const SuccusIcon = () => {
  return (
    <div className={"notification_success_icon"}>
      <svg
        width="197"
        height="197"
        viewBox="0 0 197 197"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80.8119 108.071C81.2633 112.29 84.6566 115.683 88.8736 116.153C92.0059 116.503 95.2219 116.802 98.5008 116.802C101.78 116.802 104.996 116.503 108.128 116.153C112.345 115.683 115.738 112.29 116.19 108.071C116.523 104.956 116.804 101.759 116.804 98.4989C116.804 95.2389 116.523 92.0413 116.19 88.9268C115.738 84.7077 112.345 81.3143 108.128 80.8443C104.996 80.4952 101.78 80.1953 98.5008 80.1953C95.2219 80.1953 92.0059 80.4952 88.8736 80.8443C84.6566 81.3143 81.2633 84.7077 80.8119 88.9268C80.4787 92.0413 80.1973 95.2389 80.1973 98.4989C80.1973 101.759 80.4787 104.956 80.8119 108.071Z"
          fill="white"
          fill-opacity="0.05"
        />
        <g filter="url(#filter0_ddd_6505_93580)">
          <path
            d="M80.8119 108.071C81.2633 112.29 84.6566 115.683 88.8736 116.153C92.0059 116.503 95.2219 116.802 98.5008 116.802C101.78 116.802 104.996 116.503 108.128 116.153C112.345 115.683 115.738 112.29 116.19 108.071C116.523 104.956 116.804 101.759 116.804 98.4989C116.804 95.2389 116.523 92.0413 116.19 88.9268C115.738 84.7077 112.345 81.3143 108.128 80.8443C104.996 80.4952 101.78 80.1953 98.5008 80.1953C95.2219 80.1953 92.0059 80.4952 88.8736 80.8443C84.6566 81.3143 81.2633 84.7077 80.8119 88.9268C80.4787 92.0413 80.1973 95.2389 80.1973 98.4989C80.1973 101.759 80.4787 104.956 80.8119 108.071Z"
            stroke="#5BF4AB"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <g filter="url(#filter1_ddd_6505_93580)">
          <path
            d="M91.1797 100.328L96.5044 105.819C99.01 98.6211 101.097 95.4628 105.823 91.1758"
            stroke="#5BF4AB"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <filter
            id="filter0_ddd_6505_93580"
            x="0.897263"
            y="0.895309"
            width="195.207"
            height="195.205"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10.95" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6505_93580"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="38.9" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_6505_93580"
              result="effect2_dropShadow_6505_93580"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="21.7728" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_6505_93580"
              result="effect3_dropShadow_6505_93580"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_6505_93580"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_ddd_6505_93580"
            x="11.8797"
            y="11.8758"
            width="173.243"
            height="173.245"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="3.6288" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_6505_93580"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10.95" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_6505_93580"
              result="effect2_dropShadow_6505_93580"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="38.9" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.356863 0 0 0 0 0.956863 0 0 0 0 0.670588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_6505_93580"
              result="effect3_dropShadow_6505_93580"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_6505_93580"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
const LoadingIcon = () => {
  return (
    <div className={"notification_loading_icon"}>
      <img src="/noti_loader.gif" />
    </div>
  );
};
const FailIcon = () => {
  return (
    <div className={"notification_fail_icon"}>
      <svg
        width="152"
        height="153"
        viewBox="0 0 152 153"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_3527_173657)">
          <path
            d="M40.4414 52.6555C43.9224 48.2105 47.6878 44.3165 51.9844 40.7191C54.5969 38.5318 57.7291 38.5461 60.344 40.7191C64.6625 44.3077 68.4195 48.1907 71.8938 52.6555C73.8941 55.2259 73.9075 58.4468 71.8938 61.0149C68.3764 65.5006 64.5681 69.4252 60.2149 73.0504C57.7663 75.0895 54.6442 75.0757 52.1933 73.0504C47.79 69.4114 43.9701 65.4724 40.4414 60.9316C38.4757 58.4022 38.4624 55.1825 40.4414 52.6555Z"
            fill="white"
            fill-opacity="0.05"
          />
          <path
            d="M71.1046 53.2696L71.8938 52.6555L71.1046 53.2696C72.8261 55.4818 72.8342 58.195 71.1069 60.3978C67.6327 64.8284 63.8736 68.7021 59.5749 72.2819C57.5002 74.0097 54.9146 74.0019 52.8304 72.2795C48.4839 68.6875 44.7151 64.8013 41.231 60.318C39.5436 58.1466 39.5356 55.434 41.2287 53.272C44.667 48.8816 48.3838 45.038 52.6263 41.4859C53.7771 40.5223 54.9912 40.0825 56.162 40.084C57.3337 40.0855 58.5506 40.529 59.7049 41.4882L60.344 40.7191L59.7049 41.4882C63.9674 45.0303 67.6742 48.8613 71.1046 53.2696Z"
            stroke="#CD2E54"
            stroke-width="2"
          />
        </g>
        <path
          d="M40.4414 52.6555C43.9224 48.2105 47.6878 44.3165 51.9844 40.7191C54.5969 38.5318 57.7291 38.5461 60.344 40.7191C64.6625 44.3077 68.4196 48.1907 71.8936 52.6555C73.8939 55.2259 73.9076 58.4468 71.8936 61.0149C68.3765 65.5006 64.5681 69.4252 60.2149 73.0504C57.7663 75.0895 54.6442 75.0757 52.1933 73.0504C47.79 69.4114 43.9701 65.4724 40.4414 60.9316C38.4757 58.4022 38.4624 55.1825 40.4414 52.6555Z"
          fill="white"
          fill-opacity="0.05"
          stroke="#CD2E54"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <g filter="url(#filter1_ddd_3527_173657)">
          <path
            d="M56.3635 48.2754V58.5941V48.2754Z"
            fill="white"
            fill-opacity="0.05"
            shape-rendering="crispEdges"
          />
          <path
            d="M56.3635 48.2754V58.5941"
            stroke="#FF5E5E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            shape-rendering="crispEdges"
          />
        </g>
        <g filter="url(#filter2_ddd_3527_173657)">
          <path
            d="M56.3635 63.8633V65.7251V63.8633Z"
            fill="white"
            fill-opacity="0.05"
            shape-rendering="crispEdges"
          />
          <path
            d="M56.3635 63.8633V65.7251"
            stroke="#FF5E5E"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            shape-rendering="crispEdges"
          />
        </g>
        <defs>
          <filter
            id="filter0_dd_3527_173657"
            x="-38.8378"
            y="-38.716"
            width="190.037"
            height="191.091"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="10.95" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.804167 0 0 0 0 0.180937 0 0 0 0 0.330512 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3527_173657"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="38.9" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 0 0.329412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_3527_173657"
              result="effect2_dropShadow_3527_173657"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_3527_173657"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_ddd_3527_173657"
            x="11.8179"
            y="3.72979"
            width="89.0912"
            height="99.41"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.2576" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 0 0.329412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3527_173657"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="21.7728" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 0 0.329412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_3527_173657"
              result="effect2_dropShadow_3527_173657"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.804167 0 0 0 0 0.180937 0 0 0 0 0.330512 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_3527_173657"
              result="effect3_dropShadow_3527_173657"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_3527_173657"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_ddd_3527_173657"
            x="11.8179"
            y="19.3177"
            width="89.0912"
            height="90.953"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="7.2576" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 0 0.329412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_3527_173657"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="21.7728" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 0 0.329412 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_3527_173657"
              result="effect2_dropShadow_3527_173657"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.804167 0 0 0 0 0.180937 0 0 0 0 0.330512 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="effect2_dropShadow_3527_173657"
              result="effect3_dropShadow_3527_173657"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect3_dropShadow_3527_173657"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18 6L6 18"
        stroke="white"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="white"
        stroke-linecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
