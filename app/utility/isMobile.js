// import { useState, useEffect } from "react";

// const useMobileScreen = (maxMobileWidth = 768) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= maxMobileWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= maxMobileWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [maxMobileWidth]); // Dependency on maxMobileWidth

//   return isMobile;
// };

// export default useMobileScreen;

import { useState, useEffect } from "react";

const useMobileScreen = (maxMobileWidth = 768) => {
  // Initialize isMobile state without accessing window object
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Ensure this code runs only on the client side
    const handleResize = () => {
      setIsMobile(window.innerWidth <= maxMobileWidth);
    };

    // Set initial state based on client window
    handleResize(); // Call it initially to set the state correctly on load

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [maxMobileWidth]); // Dependency on maxMobileWidth

  return isMobile;
};

export default useMobileScreen;
