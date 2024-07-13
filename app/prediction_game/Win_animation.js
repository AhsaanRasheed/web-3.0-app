import React from "react";
import Lottie from "react-lottie";
import animationData from "./winAnimation";
import style from "./style.module.scss";
export default function Win_animation({ onComplete }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={style.winAnimationContainer}>

    
    <Lottie
      options={defaultOptions}
     
      eventListeners={[
        {
          eventName: "complete",
          callback: onComplete,
        },
      ]}
    />
    </div>
  );
}
