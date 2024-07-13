import React, { useEffect, useRef } from "react";

const LottieAnimation = () => {
  const randomNumber = Math.random();

  return (
    <div style={{ maxWidth: "150px", maxHeight: "150px", position:"relative" }}>
      <img
        src={`/predictionGame/loading.gif`}
        alt="success"
        style={{
            width:"100%",
            height:"100%",
            objectFit:"cover"
        }}
      />
    </div>
  );
};

export default LottieAnimation;
