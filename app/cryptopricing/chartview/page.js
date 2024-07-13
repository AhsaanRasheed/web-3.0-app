"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, memo } from "react";
import style from "./style.module.scss";
import ProfileBar from "@/app/_components/ProfileBar";

function TradingViewWidget() {
  const container = useRef();
  const symbolWidgetContainer = useRef();

  const searchParams = useSearchParams();
  const search = searchParams.get("tvwidgetsymbol");

  useEffect(() => {
    const symbolWidget = document.createElement("script");
    symbolWidget.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    symbolWidget.type = "text/javascript";
    symbolWidget.async = true;
    symbolWidget.innerHTML = `{
        "symbol": "${search}",
        "width": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "isTransparent": true
        }`;
    symbolWidgetContainer.current.appendChild(symbolWidget);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
          {
            "width": "90%",
            "autosize": true,
            "symbol": "${search}",
            "interval": "D",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "en",
            "backgroundColor": "rgba(10, 7, 17, 1)",
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com"
          }`;
    container.current.appendChild(script);
  }, [search]);

  return (
    <div className="pageContainer">
      <ProfileBar
        title="Live Graph"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
      />
      <div className={`${style.tradingViewParent}`}>
        <div
          className={`tradingview-widget-container ${style.symbolChart}`}
          ref={symbolWidgetContainer}
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>

        <div
          className={`tradingview-widget-container ${style.advancedChart}`}
          ref={container}
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
