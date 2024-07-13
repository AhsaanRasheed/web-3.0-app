"use client";
import React, { useState, useEffect, useRef } from "react";
import style from "./style.module.scss";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ProfileBar from "../../_components/ProfileBar";
import Image from "next/image";
import ArticleMobileView from "./component/ArticleMobileView";
import { useLoader } from "../../_components/global/Loader/loaderContext";
import QuizModal from "./component/QuizModal";
import {
  get_news_detail,
  get_news_quiz,
  news_like_update,
} from "@/app/services/service";
import Link from "next/link";
import ArticleDesktopView from "./component/ArticleDesktopView";
export default function Page() {
  const router = useRouter();
  const { toggleLoader } = useLoader();

  const isVisible = useSelector((state) => state.profileVisibility.isVisible);

  const searchParams = useSearchParams();
  const search = searchParams.get("n");
  const [news, setNews] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const getData = async () => {
    toggleLoader(true);
    try {
    let resp = await get_news_detail(search);
    console.log(resp);
    if (resp.message == "News item retrieved successfully") {
      setNews(resp.data);
      let resp_quiz = await get_news_quiz(search);
      console.log(resp_quiz);
      if (resp_quiz.message == "Quiz retrieved successfully") {
        setQuizId(resp_quiz.data.quiz[0].id);
        setQuestion(resp_quiz.data.quiz[0].question);
        setOptions(resp_quiz.data.quiz[0].options);
      }
    }
  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  const likeToggle = async () => {
    toggleLoader(true);
    try {
    let resp = await news_like_update(search);

    setNews((prevNews) => ({
      ...prevNews,
      liked: !prevNews.liked,
      like_count: prevNews.liked
        ? prevNews.like_count > 0
          ? prevNews.like_count - 1
          : 0
        : prevNews.like_count + 1,
    }));

  } catch (e) {
  } finally {
    toggleLoader(false);
  }
  };
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
      return;
    }
    getData();
  }, [isVisible]);

  const [isMobileView, setIsMobileView] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  // const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1150) {
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
        title="Articles"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
        showBack={true}
        backLink={"/news"}
      />
      {isMobileView ? (
        news != null && (
          <ArticleMobileView
            news={news}
            quizId={quizId}
            likeToggle={likeToggle}
            setShowQuizModal={setShowQuizModal}
          />
        )
      ) : (
        <ArticleDesktopView
          news={news}
          quizId={quizId}
          likeToggle={likeToggle}
          setShowQuizModal={setShowQuizModal}
        />
      )}

      {showQuizModal && (
        <QuizModal
          showQuizModal={showQuizModal}
          onClose={(s) => {
            setShowQuizModal(false);
            if (s) getData();
          }}
          question={question}
          options={options}
          quizId={quizId}
        />
      )}
    </div>
  );
}
