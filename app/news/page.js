"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProfileBar from "../_components/ProfileBar";

import { useLoader } from "../_components/global/Loader/loaderContext";
import Pagination from "./components/pagination";
import NewsDropdown from "./components/dropdown";
import { get_all_news, get_news_categories } from "../services/service";
import DesktopView from "./components/DesktopView";
import MobileView from "./components/MobileView";

export default function Page() {
  const router = useRouter();
  const { toggleLoader } = useLoader();
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({
    lbl: "All",
    value: "All",
  });
  const [sortBy, setSortBy] = useState({
    lbl: "Date",
    value: "released_at",
    disable: false,
  });
  const [sortByType, setSortByType] = useState("desc");
  const [audioOnly, setAudioOnly] = useState(false);
  const [unread, setUnread] = useState("all");
  const [unattempted, setUnattempted] = useState("all");
  const [totalNews, setTotalNews] = useState(0);
  const [itemPerPage, setItemPerPage] = useState({ lbl: 25, value: 25 });
  const [pageIndex, setPageIndex] = useState(1);
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);

  const getNextNews = async () => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        pageIndex,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        audioOnly,
        unread,
        unattempted
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setNews(resp.data.news);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    getNextNews();
  }, [pageIndex, itemPerPage]);

  const getCategoriesFilter = async (item) => {
    toggleLoader(true);
    try {
      setSelectedCategories(item);
      let resp = await get_all_news(
        1,
        item.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        audioOnly,
        unread,
        unattempted
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setPageIndex(1);
        setNews(resp.data.news);
        setTotalNews(resp.data.total);
      } else {
        setPageIndex(1);
        setNews([]);
        setTotalNews(0);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const onSortChange = async (_sortBy, _sortByType) => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        pageIndex,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        _sortBy.value,
        _sortByType,
        audioOnly,
        unread,
        unattempted
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setNews(resp.data.news);
        setTotalNews(resp.data.total);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const onAudioChange = async (state) => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        1,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        state,
        unread,
        unattempted
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setNews(resp.data.news);
        setTotalNews(resp.data.total);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const onReadChange = async (state) => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        1,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        audioOnly,
        state,
        unattempted
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setNews(resp.data.news);
        setTotalNews(resp.data.total);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const onAttemptChange = async (state) => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        1,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        audioOnly,
        unread,
        state
      );
      if (
        resp.message == "successfully fetched all news" &&
        resp.data.total > 0
      ) {
        setNews(resp.data.news);
        setTotalNews(resp.data.total);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  const getData = async () => {
    toggleLoader(true);
    try {
      let resp = await get_all_news(
        1,
        selectedCategories.value.toLowerCase(),
        itemPerPage.value,
        sortBy.value,
        sortByType,
        audioOnly,
        unread,
        unattempted
      );
      let cat_resp = await get_news_categories();

      console.log(cat_resp);
      if (resp.message == "successfully fetched all news") {
        if (resp.data.total > 0) setNews(resp.data.news);
        setTotalNews(resp.data.total);
      }
      if (
        cat_resp.message == "News categories retrieved successfully" &&
        cat_resp.data.categories != null
      ) {
        let temp = [];
        temp.push("All");
        if (cat_resp.data.categories.includes("market trends"))
          temp.push("Market Trends");
        if (cat_resp.data.categories.includes("altcoins"))
          temp.push("Altcoins");
        if (cat_resp.data.categories.includes("gaming")) temp.push("Gaming");
        if (cat_resp.data.categories.includes("nfts")) temp.push("NFTs");
        if (cat_resp.data.categories.includes("memecoins"))
          temp.push("Memecoins");
        if (cat_resp.data.categories.includes("regulatory"))
          temp.push("Regulatory");
        if (cat_resp.data.categories.includes("security"))
          temp.push("Security");
        for (let i = 0; i < cat_resp.data.categories.length; i++) {
          if (
            ![
              "market trends",
              "altcoins",
              "gaming",
              "nfts",
              "memecoins",
              "regulatory",
              "security",
            ].includes(cat_resp.data.categories[i])
          ) {
            temp.push(capitalizeFirstLetter(cat_resp.data.categories[i]));
          }
        }
        setCategories(temp);
      }
    } catch (e) {
    } finally {
      toggleLoader(false);
    }
  };
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
    getData();
  }, [isVisible]);

  const [isMobileView, setIsMobileView] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 850) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pageContainer">
      <ProfileBar
        title="News"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      {isMobileView ? (
        <MobileView
          getCategoriesFilter={getCategoriesFilter}
          setSortByType={(e) => {
            setSortByType(e);
            onSortChange(sortBy, e);
          }}
          setAudioOnly={(e) => {
            setAudioOnly(e);
            onAudioChange(e);
          }}
          audioOnly={audioOnly}
          setUnattempted={(e) => {
            setUnattempted(e);
            onAttemptChange(e);
          }}
          unattempted={unattempted}
          setUnread={(e) => {
            setUnread(e);
            onReadChange(e);
          }}
          unread={unread}
          selectedCategories={selectedCategories}
          categories={categories}
          sortByType={sortByType}
          sortBy={sortBy}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
          pageIndex={pageIndex}
          totalNews={totalNews}
          setPageIndex={setPageIndex}
          news={news}
          setSortBy={(e) => {
            setSortBy(e);
            onSortChange(e, sortByType);
          }}
        />
      ) : (
        <DesktopView
          setAudioOnly={(e) => {
            setAudioOnly(e);
            onAudioChange(e);
          }}
          audioOnly={audioOnly}
          setUnattempted={(e) => {
            setUnattempted(e);
            onAttemptChange(e);
          }}
          unattempted={unattempted}
          setUnread={(e) => {
            setUnread(e);
            onReadChange(e);
          }}
          unread={unread}
          getCategoriesFilter={getCategoriesFilter}
          setSortByType={(e) => {
            setSortByType(e);
            onSortChange(sortBy, e);
          }}
          selectedCategories={selectedCategories}
          categories={categories}
          sortByType={sortByType}
          sortBy={sortBy}
          itemPerPage={itemPerPage}
          setItemPerPage={setItemPerPage}
          pageIndex={pageIndex}
          totalNews={totalNews}
          setPageIndex={setPageIndex}
          news={news}
          setSortBy={(e) => {
            setSortBy(e);
            onSortChange(e, sortByType);
          }}
        />
      )}
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
