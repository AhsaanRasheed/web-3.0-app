import React, { useState } from "react";
import style from "./style.module.scss";

export default function TokenSelection() {
  const [tokens, setToken] = useState([
    {
      name: "Bitcoin",
      percentage: "+1.5%",
      amount: "USD 200",
      image: "/tvt/coin/btc.png",
    },
    {
      name: "Ethereum",
      percentage: "-0.5%",
      amount: "USD 250",
      image: "/tvt/coin/eth.png",
    },
    {
      name: "Solana",
      percentage: "-3.15%",
      amount: "USD 500",
      image: "/tvt/coin/sol.png",
    },
    {
      name: "USD Tether",
      percentage: "0%",
      amount: "USD 50",
      image: "/tvt/coin/usdt.png",
    },
  ]);

  const maxTokens = 10;

  // Fill the array with placeholders if there are less than maxTokens items
  const [filledTokens, setFilledTokens] = useState([
    ...tokens,
    ...Array(maxTokens - tokens.length).fill({ placeholder: true }),
  ]);

  return (
    <>
      <div className={style.container}>
        <div className={style.heading}>
          <p>
            My Portfolio
            <span className={style.divider}></span>
            Available Balance :
            <span className={style.gradientTextUsd}>&nbsp; &nbsp;USD</span> 0
          </p>
          <p>
            <span className={style.gradientTextTokens}>{tokens.length}</span>
            /10{" "}
            <span style={{ fontFamily: "var(--GilroyMedium)" }}>Tokens</span>
          </p>
        </div>
        <div
          className="checkBalance"
          style={{
    
          }}
        >
          <div className={style.gridContainer}>
            {filledTokens.map((token, index) => (
              <div key={index} className={style.gridItem}>
                {token.placeholder ? (
                  <div className={style.placeholder}>
                    <button className={style.addButton}></button>
                  </div>
                ) : (
                  <div className={style.coinBalance}>
                    <div className={style.coinImage}>
                      <img src={token.image} alt={`${token.name} icon`} />
                    </div>
                    <div className={style.subtitle}>
                      <label>{token.name}</label>{" "}
                      <span
                        className={` ${style.percentageTitle}
                          ${
                            token.percentage.startsWith("-")
                              ? style.negative
                              : token.percentage.startsWith("+")
                              ? style.positive
                              : style.neutral
                          }`}
                      >
                        {token.percentage}
                      </span>
                    </div>
                    <div className={style.subtitle}>
                      <label className={style.amount}>
                        Amount: {token.amount}
                      </label>
                    </div>
                    <button className={style.button}>
                      <label className={style.buttonLabel}>Trade</label>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
