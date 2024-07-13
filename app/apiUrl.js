export const apiUrl =
  typeof window !== "undefined" &&
  (window.location.host.includes("local") ||
    window.location.host.includes("sandbox") ||
    window.location.host.includes("white-label-app-prime-trader.s3") ||
    window.location.host.includes("s3-website"))
    ? "https://tempapi.primetrader.com"
    : "https://tempprod.primetrader.com";


    // ? "https://tempapi.primetrader.com"
