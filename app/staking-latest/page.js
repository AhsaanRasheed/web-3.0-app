"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../_components/Navbar";
import OldNavbar from "../_components/OldNavbar";
import StakingModal from "./staking/Components/Modal/Modal";
// import Modal from "../_components/Modal";
import ProfileBar from "../_components/ProfileBar";
import menuData from "../data/stakingNavBarData.json";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Claim from "./claim";
import History from "./history";
import OverView from "./overview";
import Staking from "./staking";
import { useSearchParams } from "next/navigation";
import { get_staking } from "@/app/services/service";
import {
  get_bln_info,
  get_coin_info,
  get_staking_info_user,
  post_stake_user_amount,
  post_unstake_user_amount,
  post_claim_user,
  get_stake_history,
} from "@/app/services/new_service";
import { useNotification } from "@/app/_components/global/Notification/notificationContext";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";
export default function StakingLayout() {
  const router = useRouter();
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [isMobileView, setIsMobileView] = useState(false);
  const [claimVal, setClaimVal] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [txHash, setTxHash] = useState(null);

  const [coinInfo, setCoinInfo] = useState({
    total_supply: "",
    symbol: "",
    name: "",
    decimals: "",
    network: "",
    explorer_uri: "",
    address: "",
  });
  const [userBln, setUserBln] = useState({
    salt: "",
    factory: "",
    owner: "",
    address: "",
    balance: -1,
    coin: "",
    network: "",
    explorer_uri: "",
  });
  const [userStakingInfo, setUserStakingInfo] = useState({
    user_data: {
      claim_amount: "0",
      stake_amount: "0",
      last_stake_time: "0",
    },
    total_staked_amount: "0",
    smart_wallet: {
      address: "",
      factory: "",
      owner: "",
      salt: "",
    },
    apr: 120,
  });
  const [stakingHistory, setStakingHistory] = useState([]);
  const [stakingHistoryLen, setStakingHistoryLen] = useState(0);
  const [itemPerPageHistory, setItemPerPageHistory] = useState(25);
  const [pageIndexHistory, setPageIndexHistory] = useState(1);
  const [ActionTypeHistoryTbl, setActionTypeHistoryTbl] = useState("Action");

  const [stakingData, setStakingData] = useState({
    diamond_claimable: 0,
    diamond_claimed: 0,
    gold_claimable: 0,
    gold_claimed: 0,
    silver_claimable: 0,
    silver_claimed: 0,
    total_claimable: 0,
    total_claimed: 0,
  });
  useEffect(() => {
    if (isVisible) {
      router.push("/auth/signin");
    }
  }, [isVisible, router]);
  const { addNotification, userBlnGlobal, setResetClaimTimer } = useNotification();
  
  
  useEffect(() => {
    let temp = userBln;
    temp.balance = userBlnGlobal;
    setUserBln(temp);
    setTimeout(() => {
      get_starting_info();
    }, 2000);
  }, [userBlnGlobal]);
  
  const { toggleLoader } = useLoader();
  const handleAddNotification = (type, msg) => {
    addNotification({
      id: Math.random().toString(36).substr(2, 9),
      type: type,
      message: msg,
      customProp: null,
    });
  };
  const get_starting_info = async () => {
    toggleLoader(true);
    try {
      let coin = await get_coin_info();
      let bln = await get_bln_info(coin.address);
      let stakeInfo = await get_staking_info_user();

      setCoinInfo(coin);
      setUserBln(bln);
      setUserStakingInfo(stakeInfo);
      // let stakeHistory_resp = await get_stake_history(1, 25, "");

      // if (stakeHistory_resp.data != null) {
      //   setStakingHistory(stakeHistory_resp.data);
      //   setStakingHistoryLen(stakeHistory_resp.count);
      // }
      // if (va.code == 200) setStakingData(va.data);
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  const onPageIndexChangeHistory = async (page, itemPerPage, filter) => {
    toggleLoader(true);
    try {
      let stakeHistory_resp = await get_stake_history(
        page,
        itemPerPage,
        filter
      );

      if (stakeHistory_resp?.data != null) {
        setStakingHistory(stakeHistory_resp.data);
        setStakingHistoryLen(stakeHistory_resp.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      toggleLoader(false);
    }
  };
  const StakeUserAmount = async (amount) => {
    if (amount < 50) {
      handleAddNotification("fail", "Minimum Amount to Stake is PTV 50.");

      return false;
    }
    let toReturn = true;
    toggleLoader(true);
    try {
      let stake = await post_stake_user_amount(amount);
      if (stake.message == "UserOp sent to the bundler mempool") {
        // handleAddNotification("success", "Amount Staked");
        setTxHash(stake.tx_hash);
        let bln = await get_bln_info(coinInfo.address);
        let stakeInfo = await get_staking_info_user();

        // setCoinInfo(coin);
        setUserBln(bln);
        setUserStakingInfo(stakeInfo);
        // let stakeHistory_resp = await get_stake_history(1,25);

        // if (stakeHistory_resp.data != null) {
        //   setStakingHistory(stakeHistory_resp.data);
        //   setStakingHistoryLen(stakeHistory_resp.count);
        // }
      } else {
        handleAddNotification("fail", "Fail to Stake Amount");
        toReturn = false;
      }
      console.log(stake);
      // if (va.code == 200) setStakingData(va.data);
    } catch (error) {
      console.log(error);
      handleAddNotification("fail", "Fail to Stake Amount");

      toReturn = false;
    } finally {
      toggleLoader(false);
    }
    return toReturn;
  };
  const UnStakeUserAmount = async (amount) => {
    if (amount < 50) {
      handleAddNotification("fail", "Minimum Amount to Unstake is PTV 50.");

      return false;
    }
    if (amount > Number(userStakingInfo.total_staked_amount)) {
      handleAddNotification("fail", "Insufficient Amount in Staked Balance.");

      return false;
    }
    let toReturn = true;

    toggleLoader(true);
    try {
      let stake = await post_unstake_user_amount(amount);
      if (stake.message == "UserOp sent to the bundler mempool") {
        let bln = await get_bln_info(coinInfo.address);
        let stakeInfo = await get_staking_info_user();
        setTxHash(stake.tx_hash);

        // setCoinInfo(coin);
        setUserBln(bln);
        setUserStakingInfo(stakeInfo);
        // let stakeHistory_resp = await get_stake_history(1,25);

        // if (stakeHistory_resp.data != null) {
        //   setStakingHistory(stakeHistory_resp.data);
        //   setStakingHistoryLen(stakeHistory_resp.count);
        // }
        // handleAddNotification("success", "Amount Unstaked");
      } else {
        handleAddNotification("fail", "Fail to Unstake Amount");
        toReturn = false;
      }
      console.log(stake);
      // if (va.code == 200) setStakingData(va.data);
    } catch (error) {
      console.log(error);
      toReturn = false;
    } finally {
      toggleLoader(false);
    }
    return toReturn;
  };

  const ClaimUserAmount = async () => {
    if (claimVal >= 1) {
      toggleLoader(true);
      let toReturn = true;

      try {
        let stake = await post_claim_user();
        if (stake.message == "UserOp sent to the bundler mempool") {
          let bln = await get_bln_info(coinInfo.address);
          let stakeInfo = await get_staking_info_user();
          setTxHash(stake.tx_hash);

          // setCoinInfo(coin);
          setUserBln(bln);
          setUserStakingInfo(stakeInfo);
          // let stakeHistory_resp = await get_stake_history(1,25);

          // if (stakeHistory_resp.data != null) {
          //   setStakingHistory(stakeHistory_resp.data);
          //   setStakingHistoryLen(stakeHistory_resp.count);
          // }
          // handleAddNotification("success", "Amount Claimed");
        } else {
          handleAddNotification("fail", "Fail to Claim Amount");
          toReturn = false;
        }
        console.log(stake);
        // if (va.code == 200) setStakingData(va.data);
      } catch (error) {
        console.log(error);
        toReturn = false;
      } finally {
        toggleLoader(false);
      }
      return toReturn;
    }
  };
  // useEffect(() => {
  //   // get_staking_data();
  //   get_starting_info();
  // }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
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

  useEffect(() => {
    if (search == "History") onPageIndexChangeHistory(1, 25, "");
  }, [search]);
  const getImageUrlBySearch = (search) => {
    const imageUrlMapping = {
      History: "/profile/dario-hanke.svg",
      Claim: "/profile/dario-hanke.svg",
      Staking: "/profile/dario-hanke.svg",
      Overview: "/profile/dario-hanke.svg",
      default: "/profile/dario-hanke.svg",
    };

    return imageUrlMapping[search] || imageUrlMapping["default"];
  };

  const ActiveSection = () => {
    if (search == "History") {
      return (
        <History
          isMobileView={isMobileView}
          stakingHistory={stakingHistory}
          stakingHistoryLen={stakingHistoryLen}
          onPageIndexChangeHistory={onPageIndexChangeHistory}
          itemPerPageHistory={itemPerPageHistory}
          setItemPerPageHistory={setItemPerPageHistory}
          pageIndexHistory={pageIndexHistory}
          setPageIndexHistory={setPageIndexHistory}
          setActionTypeHistoryTbl={setActionTypeHistoryTbl}
          ActionTypeHistoryTbl={ActionTypeHistoryTbl}
        />
      );
    } else if (search == "Claim") {
      return (
        <Claim
          isMobileView={isMobileView}
          stakingData={stakingData}
          get_staking_data={() => get_staking_data()}
        />
      );
    } else if (search == "Staking") {
      return (
        <Staking
          isMobileView={isMobileView}
          UserBln={userBln}
          CoinInfo={coinInfo}
          userStakingInfo={userStakingInfo}
          StakeUserAmount={(e) => {
            if (e < 50) {
              handleAddNotification(
                "fail",
                "Minimum Amount to Stake is PTV 50."
              );

              return false;
            }
            setSliderValue(e);
            setShowConfirmationModal("stake");
          }}
          UnStakeUserAmount={() => setShowConfirmationModal("unstake")}
          ClaimUserAmount={(val) => {
            setClaimVal(val);
            setShowConfirmationModal("claim");
          }}
          setResetClaimTimer = {setResetClaimTimer}
        />
      );
    } else if (search == "Overview") {
      return <OverView isMobileView={isMobileView} stakingData={stakingData} />;
    } else if (search == null) {
      return (
        <Staking
          isMobileView={isMobileView}
          UserBln={userBln}
          CoinInfo={coinInfo}
          userStakingInfo={userStakingInfo}
          StakeUserAmount={(e) => {
            if (e < 50) {
              handleAddNotification(
                "fail",
                "Minimum Amount to Stake is PTV 50."
              );

              return false;
            }
            setSliderValue(e);
            setShowConfirmationModal("stake");
          }}
          UnStakeUserAmount={() => setShowConfirmationModal("unstake")}
          ClaimUserAmount={(val) => {
            setClaimVal(val);
            setShowConfirmationModal("claim");
          }}
          setResetClaimTimer = {setResetClaimTimer}
        />
      );
    }
  };

  return (
    <>
      <div className="pageContainer">
        <ProfileBar
          title="Staking"
          id="0x85cEakckvk2932b857"
          name="Dario Hanke"
          email="darhnk@gmail.com"
          imgUrl={getImageUrlBySearch(search)}
          isMobileView={isMobileView}
          hideOnMob={true}
        />
        {/* <OldNavbar Data={menuData.data}>
          <ActiveSection />
        </OldNavbar> */}

        <Navbar Data={menuData.data}>
          <ActiveSection />
        </Navbar>
        <br />
      </div>
      {showConfirmationModal != null && (
        <StakingModal
          showModal={true}
          onClose={() => setShowConfirmationModal(null)}
          type={showConfirmationModal}
          onStake={StakeUserAmount}
          onUnstake={UnStakeUserAmount}
          onClaim={ClaimUserAmount}
          stakeAmount={sliderValue}
          txHash={userBln.explorer_uri + "/tx/" + txHash}
          claimAmount={Number(Number(claimVal).toFixed(5))}
          stakedTotalAmount={Number(
            Number(userStakingInfo.user_data.stake_amount).toFixed(4)
          )}
        />
      )}
    </>
  );
}
