import { useRef } from "react";

export const useThrottle = () => {
  const throatleRef = useRef(null);

  function throttle(func, delay = 1000) {
    if (throatleRef.current === null) {
      func();
      throatleRef.current = setTimeout(() => {
        throatleRef.current = null;
      }, delay);
    }
  }

  return throttle;
};
