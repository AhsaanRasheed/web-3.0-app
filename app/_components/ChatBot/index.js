"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function ChatBot() {
  return (
    <div>
      <PT_Chat_Bot />
    </div>
  );
}

function PT_Chat_Bot() {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((state) => state.profileVisibility.user);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className={styles.PT_Chat_Bot}>
      <div
        className={
          styles.floatingdiv +
          (isVisible ? ` ${styles.visible}` : ` ${styles.hidden}`)
        }
      >
        <DemoChat user={user} />
      </div>
      <div className={styles.floatingdiv1}>
        <div
          className={styles.chat + (isVisible && styles.active)}
          onClick={handleToggle}
        >
          <FloatingBtn isVisible={isVisible} />
        </div>
      </div>
    </div>
  );
}

function FloatingBtn(props) {
  return (
    <>
      <div className={styles.background}></div>
      <svg
        style={{ cursor: "pointer", position: "relative" }}
        width="70"
        height="70"
        viewBox="0 0 100 100"
      >
        <g
          style={{
            transformOrigin: "50%",
            transition: "transform 500ms cubic-bezier(0.17, 0.61, 0.54, 0.9)",
            transform: props.isVisible
              ? "translateX(24px) translateY(4px) rotate(45deg)"
              : "",
            backgroundColor: "blue",
          }}
        >
          <path
            style={{
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 2.75,
              strokeLinecap: "round",
              transition:
                "stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              strokeDasharray: "60 90",
              strokeDashoffset: props.isVisible ? 21 : -20,
            }}
            d="M 30.7873,85.113394 30.7873,46.556405 C 30.7873,41.101961 36.826342,35.342 40.898074,35.342 H 59.113981 C 63.73287,35.342 69.29995,40.103201 69.29995,46.784744"
          />
          <path
            style={{
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 2.75,
              strokeLinecap: "round",
              transition:
                "stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1)",
              strokeDasharray: "67 87",
              strokeDashoffset: props.isVisible ? 30 : -18,
            }}
            d="M 13.461999,65.039335 H 58.028684 C 63.483128,65.039335 69.243089,59.000293 69.243089,54.928561 V 45.605853 C 69.243089,40.986964 65.02087,35.419884 58.339327,35.419884"
          />
        </g>
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            transformOrigin: "50%",
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            transform: props.isVisible ? "scale(0)" : "",
          }}
          r="1.9"
          cy="50.7"
          cx="42.5"
        />
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            transformOrigin: "50%",
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            transform: props.isVisible ? "scale(0)" : "",
          }}
          cx="49.9"
          cy="50.7"
          r="1.9"
        />
        <circle
          style={{
            fill: "#ffffff",
            stroke: "none",
            transformOrigin: "50%",
            transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)",
            transform: props.isVisible ? "scale(0)" : "",
          }}
          r="1.9"
          cy="50.7"
          cx="57.3"
        />
      </svg>
    </>
  );
}

function DemoChat({ user }) {
  const [chatLst, setChatLst] = useState([]);
  const [msg, setMsg] = useState("");
  const [chatBotTyping, setChatBotTyping] = useState(false);

  const messagesContainerRef = useRef(null);
  const time = new Date();
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [chatLst]);

  useEffect(() => {
    setChatLst([
      <div key={time} className={`${styles.msg} ${styles.bot}`}>
        <div className={styles.topMsgBar}>
          <img
            src="/chatbot/bot.png"
            width={"33px"}
            height={"33px"}
            alt="chatBot"
          />
          <p>PT Chatbot</p>
        </div>
        <div className={styles.top}>
          <label>
            Hi, I am <b>PT ChatBot</b>. How can i help you today?
          </label>
        </div>
        <div className={styles.seen}>
          <img
            src="/chatbot/Seen.png"
            width={"19px"}
            height={"13px"}
            alt="chatbot-seen"
          />{" "}
          <p>
            {`${time.getHours() % 12 || 12}:${String(
              time.getMinutes()
            ).padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"}`}
          </p>
        </div>
      </div>,
    ]);
  }, []);
  const sendMsg = (e) => {
    e.preventDefault();
    if (msg != "" && msg != null) {
      setChatLst((prevChatLst) => [
        ...prevChatLst,
        <div key={time} className={`${styles.msg} ${styles.sender}`}>
          <div className={styles.topMsgBar}>
            <p>{user?.username ? user?.username : "You"}</p>
            <img
              src="/chatbot/user.png"
              width={"33px"}
              height={"33px"}
              alt="user"
            />
          </div>
          <div className={styles.top}>
            <label>{msg}</label>
            {/* <img src="/chatbot/bot.png" width={"32px"} height={"32px"} /> */}
          </div>
          <div className={styles.seen}>
            <img
              src="/chatbot/SeenWhite.png"
              width={"19px"}
              height={"13px"}
              alt="chatbot-seen"
            />{" "}
            <p>
              {`${time.getHours() % 12 || 12}:${String(
                time.getMinutes()
              ).padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"}`}
            </p>
          </div>
        </div>,
      ]);

      setMsg("");

      sentToBot();
    }
  };
  const sentToBot = async () => {
    setChatBotTyping(true);
    const postData = async () => {
      // const url = "http://16.171.237.253:1244/ask";
      // const url = "http://127.0.0.1:1244/ask";
      const url = "https://devapi.primetrader.com/api/v1/ask_chat_bot";

      const data = {
        question: msg,
      };

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const responseData = await response.json();
        return responseData.data.response;
        // return responseData.response;
      } catch (error) {
        console.error("There was a problem with the request:", error);

        return "There was a problem with the request.";
      }
    };
    const txt = await postData();
    // const updatedList = chatLst;
    // updatedList.pop();
    setChatLst((prevChatLst) => [
      ...prevChatLst,
      <div key={time} className={`${styles.msg} ${styles.bot}`}>
        <div className={styles.topMsgBar}>
          <img
            src="/chatbot/bot.png"
            width={"33px"}
            height={"33px"}
            alt="chatbot"
          />
          <p>PT Chatbot</p>
        </div>
        <div className={styles.top}>
          <label>{txt}</label>
        </div>
        <div className={styles.seen}>
          <img
            src="/chatbot/Seen.png"
            width={"19px"}
            height={"13px"}
            alt="chatbot-seen"
          />{" "}
          <p>
            {`${time.getHours() % 12 || 12}:${String(
              time.getMinutes()
            ).padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"}`}
          </p>
        </div>
      </div>,
    ]);
    // updatedList.push(
    //   <div key={time} className={`${styles.msg} ${styles.bot}`}>
    //     <div className={styles.topMsgBar}>
    //       <img src="/chatbot/bot.png" width={"33px"} height={"33px"} />
    //       <p>PT Chatbot</p>
    //     </div>
    //     <div className={styles.top}>
    //       <label>{txt}</label>
    //     </div>
    //     <div className={styles.seen}>
    //       <img src="/chatbot/Seen.png" width={"19px"} height={"13px"} />{" "}
    //       <p>
    //         {`${time.getHours() % 12 || 12}:${String(
    //           time.getMinutes()
    //         ).padStart(2, "0")} ${time.getHours() >= 12 ? "PM" : "AM"}`}
    //       </p>
    //     </div>
    //   </div>
    // );
    // setChatLst(updatedList);
    setChatBotTyping(false);
  };

  return (
    <div className={styles.chatbox}>
      {/* Top Bar */}
      <div className={styles.topbar}>
        <div className={styles.TopBarAvatar}>
          <img
            src="/chatbot/bot.png"
            width={"32px"}
            height={"32px"}
            alt="chatbot"
          />
          <div className={styles.col0}>
            <label>PT Chatbot</label>
            <p>{chatBotTyping ? "Typing..." : "Active Now"}</p>
          </div>
        </div>
        <div className={styles.neon}></div>
      </div>
      {/* Msg Box */}
      <div className={styles.msgBox} ref={messagesContainerRef}>
        {chatLst}
      </div>
      {/* Typing Bar */}
      <div className={styles.TypingBar}>
        <div>
          <form onSubmit={sendMsg}>
            <input
              type="text"
              placeholder="Write your message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <img
              src="/chatbot/AttachementIcon.png"
              width="32px"
              height="20px"
              alt="attachment"
            />
            <button type="submit">
              <img
                src="/chatbot/SendIcon.png"
                width="28px"
                height="28px"
                alt="send"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
