import { useRef } from "react";

export const useDebounce = () => {
  const debounceRef = useRef(null);

  function debounce(func, delay = 1000) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(func, delay);
  }

  return debounce;
};
