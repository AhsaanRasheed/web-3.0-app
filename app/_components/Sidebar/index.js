"use client";
import { useEffect, useState, Fragment } from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import Link from "next/link";
import SignoutIcon from "./Components/Icons/SignoutIcon";
import sidebarDataUser from "../../../app/data/user_sidebar.json";
import sidebarDataLogin from "../../../app/data/sidebar.json";
import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_PROFILE_VISIBILITY } from "@/app/actionTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export default function Sidebar() {
  let router = useRouter();
  const dispatch = useDispatch();
  const [isSidebarCollapsedView, setSidebarCollapsed] = useState(false);
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const [sidebarData, setSidebarData] = useState(
    !isVisible ? sidebarDataUser : sidebarDataLogin
  );

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSidebarData(!isVisible ? sidebarDataUser : sidebarDataLogin);
  }, [isVisible]);

  const handleCollapseToggle = () => {
    setSidebarCollapsed(!isSidebarCollapsedView);
  };

  const [activeItem, setActiveItem] = useState("");
  useEffect(() => {
    const currentPath = window.location.pathname;

    sidebarData.menus.forEach((menu) => {
      menu.list.forEach((item) => {
        if (currentPath.includes(item.itemUrl)) {
          setActiveItem(item.itemName);
        }
      });
    });
  }, [pathname, searchParams, sidebarData]);
if(isVisible){
  return null
}
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={sidebarData.logoUrl}
          alt="PrimeTrader"
          width={80}
          height={30}
        />
      </div>

      <div
        className={`${styles.navbar_container} ${
          isSidebarCollapsedView ? styles.collapsedView : ""
        }`}
      >
        <div className={styles.close_sidebar} onClick={handleCollapseToggle}>
          <Image src="/sidebar/close.svg" alt="Close" width={13} height={13} />
        </div>

        <nav className={styles.sidebar_inner}>
          {/* Upper Menu */}
          <div className={styles.upper_menu}>
            {sidebarData.menus.slice(0, -1).map((menu, index) => (
              <Fragment key={index}>
                <div className={styles.sidebar_title}>
                  <h4 className="sidebar-title-text">{menu.title}</h4>
                </div>
                <ul>
                  {menu.list.map((item, itemIndex) => (
                    <li
                      onClick={() => {
                        router.push(item.itemUrl);
                        // setActiveItem(item.itemName);
                      }}
                      key={itemIndex}
                      className={`${styles.sidebar_item} ${
                        item.itemName === activeItem ? styles.activeItem : ""
                      }`}
                    >
                      <Image
                        src={
                          item.itemName === activeItem
                            ? item.itemIconUrlSelected
                            : item.itemIconUrl
                        }
                        alt={item.itemName}
                        width={24}
                        height={24}
                      />

                      <label className="txt_Title1">{item.itemName}</label>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>

          {/* Lower Menu */}
          <div className={styles.lower_menu}>
            {sidebarData.menus.slice(-1).map((menu, index) => (
              <div key={index}>
                {menu.title != null && (
                  <div className={styles.sidebar_title}>
                    <h4 className="sidebar-title-text">{menu.title}</h4>
                  </div>
                )}

                <ul>
                  {menu.list.map((item, itemIndex) => (
                    <li
                      onClick={() => {
                        router.push(item.itemUrl);
                        // setActiveItem(item.itemName);
                      }}
                      key={itemIndex}
                      className={`${
                        item.itemName === "Sign Out"
                          ? `${styles.sidebar_signout} ${styles.sidebar_item}`
                          : styles.sidebar_item
                      } ${
                        item.itemName === activeItem ? styles.activeItem : ""
                      }`}
                    >
                      {item.itemName === "Sign Out" ? (
                        <div className={styles.signout_icon}>
                          <SignoutIcon fill="#ff9d9d" />
                        </div>
                      ) : (
                        <Image
                          src={
                            item.itemName === activeItem
                              ? item.itemIconUrlSelected
                              : item.itemIconUrl
                          }
                          alt={item.itemName}
                          width={24}
                          height={24}
                        />
                      )}
                      <label className="txt_Title1">{item.itemName}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </div>

      <div
        className={styles.collapse_sidebar_logo}
        
      >
        <BellIcon />
        {/* <Image src="/sidebar/collapse.svg" alt="Menu" width={17} height={12} /> */}
        <MenuIcon onClick={handleCollapseToggle} />
      </div>
    </div>
  );
}

const BellIcon = () => {
  return (
    <div
      style={{
        width: "24px",
        height: "26px",
        minHeight: "26px",
        maxHeight: "26px",
        minWidth: "24px",
        maxWidth: "24px",
        marginRight: "24px",
      }}
    >
      <svg
        width="24"
        height="26"
        viewBox="0 0 24 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 10C18 8.4087 17.3679 6.88258 16.2426 5.75736C15.1174 4.63214 13.5913 4 12 4C10.4087 4 8.88258 4.63214 7.75736 5.75736C6.63214 6.88258 6 8.4087 6 10C6 17 3 19 3 19H21C21 19 18 17 18 10Z"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.7295 23C13.5537 23.3031 13.3014 23.5547 12.9978 23.7295C12.6941 23.9044 12.3499 23.9965 11.9995 23.9965C11.6492 23.9965 11.3049 23.9044 11.0013 23.7295C10.6977 23.5547 10.4453 23.3031 10.2695 23"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16.7992" cy="4.40078" r="3.6" fill="#FF5E5E" />
      </svg>
    </div>
  );
};

const MenuIcon = ({onClick}) => {
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        minHeight: "24px",
        maxHeight: "24px",
        minWidth: "24px",
        maxWidth: "24px",
      }}
      onClick={onClick}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 12H21"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 6H21"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 18H21"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
