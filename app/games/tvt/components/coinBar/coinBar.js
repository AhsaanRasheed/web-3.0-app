import React, { useState } from "react";
import style from "./style.module.scss";

export default function CoinBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const tokens = [
    {
      name: "LINK",
      percentage: "+70.2%",
      image: "/tvt/coin/link.png",
      label: "Chain Link",
      price: "16.050",
    },
    {
      name: "HBAR",
      percentage: "+50.1%",
      image: "/tvt/coin/hbar.png",
      label: "Hedera",
      price: "0.090",
    },
    {
      name: "SHIB",
      percentage: "+40.8%",
      image: "/tvt/coin/shib.png",
      label: "Shiba Inu",
      price: "0.009",
    },
    {
      name: "ADA",
      percentage: "+30.9%",
      image: "/tvt/coin/ada.png",
      label: "Cardano",
      price: "0.440",
    },
    {
      name: "ARB",
      percentage: "+20.5%",
      image: "/tvt/coin/arb.png",
      label: "Arbitrum",
      price: "0.996",
    },
    {
      name: "XMR",
      percentage: "+12%",
      image: "/tvt/coin/xmr.png",
      label: "Monero",
      price: "167.150",
    },
  ];
  return (
    <div
      className={style.sidebar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <>
          <div className={style.pindiv}>
            <img src="/tvt/pin.png" alt="pin" />
          </div>
          <div className={style.pindiv}>
            <img src="/tvt/filter.png" alt="filter" />
          </div>

          {tokens.map((token, index) => (
            <div className={style.selectTokens} key={index}>
              <img
                className={style.imagestyle}
                src={token.image}
                alt={`${token.name} icon`}
              />
              <label className={style.subtitle}>{token.name}</label>
              <label
                className={` ${style.subtitle}
            ${token.percentage.startsWith("-")
                    ? style.negative
                    : token.percentage.startsWith("+")
                      ? style.positive
                      : style.neutral
                  }`}
              >
                {token.percentage}
              </label>
            </div>
          ))}
        </>
      ) : (
        <div className={style.hoverContent}>
          <div className={style.pindiv}>
            <img src="/tvt/pin.png" alt="pin" />
          </div>
          <div className={style.sidebarHoverMenu}>
            <div className={`${style.dropdown} ${isDropdownOpen ? style.dropdownActive : ''}`} onClick={toggleDropdown}>
              <label className={style.dropdownSubtitle}>Best Performers</label>
              <img
                className={style.imagestyle}
                src="/tvt/chevrondown.png"
                alt="chevrondown"
              />
            </div>

            <div className={style.searchBar}>
              <label className={style.searchTitle}>Search</label>
              <img
                className={style.imagestyle}
                src="/tvt/search.png"
                alt="search"
              />
            </div>

            {isDropdownOpen && (
              <div className={style.dropdownContent}>
                <p>Best performers</p>
                <p>Trending</p>
                <p>Memecoins</p>
                <p>Altcoins</p>
                <p>#</p>
              </div>
            )}
          </div>
          <div>

          </div>
          {tokens.map((token, index) => (
            <div className={style.tokenSelection} key={index}>
              <img
                className={style.imagestyle}
                src={token.image}
                alt={`${token.name} icon`}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label className={style.subtitle}>{token.label}</label>
                <label className={style.subtitle}>{token.price}</label>
              </div>
              <label
                className={` ${style.subtitle}
            ${token.percentage.startsWith("-")
                    ? style.negative
                    : token.percentage.startsWith("+")
                      ? style.positive
                      : style.neutral
                  }`}
              >
                {token.percentage}
              </label>
              <button className={style.button}>
                <label className={style.buttonLabel}>Buy</label>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
