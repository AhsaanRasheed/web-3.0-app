"use client";
import React, { useState, useEffect } from "react";
import ProfileBar from "../_components/ProfileBar";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import style from "./style.module.scss";
import MenuCards from "./components/MenuCards";
import PortfolioOverview from "./components/PortfolioOverview";
import { useSearchParams } from "next/navigation";
import ReferEarn from "./components/ReferEarn";
import StakingPools from "./components/StakingPools";
import Ranking from "./components/Ranking";
import {
  get_ranking_affiliates,
  get_ranking_whales,
  get_ranking_xp,
  get_user_referral_code_api,
  get_staking,
  get_balance_api,
  get_stakes,
  get_user_dashboard,
} from "@/app/services/service.js";
import { useLoader } from "@/app/_components/global/Loader/loaderContext";

export default function Page() {
  const isVisible = useSelector((state) => state.profileVisibility.isVisible);
  const router = useRouter();
  const [ActivePage, setActivePage] = useState("portfolio");
  const searchParams = useSearchParams();
  const search = searchParams.get("s");
  const [referralCode, setReferralCode] = useState("");

  const [stakingPoolData, setStakingPoolData] = useState({
    balance: 0,
    claimed: 0,
    pending: 0,
    soontoUnlock: [],
  });
  const [portfolioOverviewData, setPortfolioOverviewData] = useState({
    balance: 0,
  });
  const [topRanker, setTopRanker] = useState({
    xp: [],
    whales: [],
    affiliates: [],
    ranking: {
      whales: 0,
      affiliate: 0,
      xp: 0,
    },
  });
  const [menuData, setMenuData] = useState({
    ranking: {
      whales: 0,
      affiliate: 0,
      xp: 0,
      quizMaster: 0,
    },
    stake: {
      TotalBalanceStaked: 0,
      AvailablePttToStake: 0,
      PendingRewards: 0,
    },
    TotalPortfolioValue: 0,
  });
  const { toggleLoader } = useLoader();

  const getValue = async (forTopthree = false) => {
    toggleLoader(true);
    try {
      let xp = await get_ranking_xp(1, 3);
      let whales = await get_ranking_whales(1, 3);
      let affiliates = await get_ranking_affiliates(1, 3);
      let toUnlock = await get_stakes(1, 5);

      const resp = await get_user_referral_code_api();
      setReferralCode(resp.data?.referral_code);
      const reward = await get_staking();
      const resp_bln = await get_balance_api();
      const resp_dash = await get_user_dashboard();

      // pending: reward.data.total_claimable,
      // claimed: reward.data.total_claimed,
      let temp_xp = [];
      let temp_whales = [];
      let temp_affiliates = [];
      let temp_toUnlock = [];
      let currentDate = new Date();
      if (toUnlock.data?.Total != null) {
        if (toUnlock.data.Total > 0) {
          for (let i = 0; i < toUnlock.data.stakes.length; i++) {
            temp_toUnlock.push({
              pool:
                toUnlock.data.stakes[i].stake_duration_index == 0
                  ? "Silver"
                  : toUnlock.data.stakes[i].stake_duration_index == 1
                  ? "Gold"
                  : toUnlock.data.stakes[i].stake_duration_index == 2
                  ? "Diamond"
                  : "-",
              amount: toUnlock.data.stakes[i].stake_amount,
              unlockin: formatUnlocksDate(
                toUnlock.data.stakes[i].end_time,
                currentDate
              ),
            });
          }
        }
      }
      if (resp_bln.data != null && reward.data != null) {
        setStakingPoolData({
          balance: resp_bln.data.ptt_balance + resp_bln.data.total,
          claimed: reward.data.total_claimed,
          pending: reward.data.total_claimable,
          soontoUnlock: temp_toUnlock,
        });
        setPortfolioOverviewData({
          balance: resp_bln.data.ptt_balance + resp_bln.data.total,
        });
      }
      if (xp.data != null) {
        for (let i = 0; i < xp.data.data.length; i++) {
          temp_xp.push({
            rank: xp.data.data[i].rank,
            username: xp.data.data[i].username,
            game: "0/0",
            sp_score: xp.data.data[i].xp_points,
          });
        }
      }
      if (whales.data != null) {
        for (let i = 0; i < whales.data.data.length; i++) {
          temp_whales.push({
            rank: whales.data.data[i].rank,
            username: whales.data.data[i].username,
            StakedPTT: whales.data.data[i].ptt_balance,
            TotalPTT: whales.data.data[i].ptt_balance,
          });
        }
      }
      if (affiliates.data != null) {
        for (let i = 0; i < affiliates.data.referral_ranking.length; i++) {
          temp_affiliates.push({
            rank: affiliates.data.referral_ranking[i].rank,
            username: affiliates.data.referral_ranking[i].username,
            level1: affiliates.data.referral_ranking[i].level_one_amount,
            level2: affiliates.data.referral_ranking[i].level_two_amount,
            level3: affiliates.data.referral_ranking[i].level_three_amount,
          });
        }
      }
      let my_xp = {
        data: {
          data: [{ rank: 0, username: "-", xp_points: 0 }],
        },
      };

      let my_whales = {
        data: {
          data: [{ rank: 0, username: "-", ptt_balance: 0 }],
        },
      };
      let my_affiliates = {
        data: {
          referral_ranking: [
            {
              rank: 0,
              username: "-",
              level_one_amount: 0,
              level_two_amount: 0,
              level_three_amount: 0,
            },
          ],
        },
      };
      if (resp_dash.data.ranking.xp != 0) {
        my_xp = await get_ranking_xp(resp_dash.data.ranking.xp, 1);
      }
      if (resp_dash.data.ranking.whales != 0) {
        my_whales = await get_ranking_whales(resp_dash.data.ranking.whales, 1);
      }

      if (resp_dash.data.ranking.affiliate != 0) {
        my_affiliates = await get_ranking_affiliates(
          resp_dash.data.ranking.affiliate,
          1
        );
      }

      setTopRanker({
        xp: temp_xp,
        whales: temp_whales,
        affiliates: temp_affiliates,
        ranking: {
          whales: {
            rank: my_whales.data.data[0].rank,
            username: my_whales.data.data[0].username,
            StakedPTT: my_whales.data.data[0].ptt_balance,
            TotalPTT: my_whales.data.data[0].ptt_balance,
          },
          affiliate: {
            rank: my_affiliates.data.referral_ranking[0].rank,
            username: my_affiliates.data.referral_ranking[0].username,
            level1: my_affiliates.data.referral_ranking[0].level_one_amount,
            level2: my_affiliates.data.referral_ranking[0].level_two_amount,
            level3: my_affiliates.data.referral_ranking[0].level_three_amount,
          },
          xp: {
            rank: my_xp.data.data[0].rank,
            username: my_xp.data.data[0].username,
            game: "0/0",
            sp_score: my_xp.data.data[0].xp_points,
          },
        },
      });
      if (resp_bln.data != null) {
        setMenuData({
          ranking: {
            whales: my_whales.data.data[0].rank,
            affiliate: my_affiliates.data.referral_ranking[0].rank,
            xp: my_xp.data.data[0].rank,
            quizMaster: 0,
          },
          stake: {
            TotalBalanceStaked: (resp_bln.data.total * 0.1).toFixed(2),
            AvailablePttToStake: resp_bln.data.ptt_balance.toFixed(2),
            PendingRewards: reward.data.total_claimable.toFixed(2),
          },
          TotalPortfolioValue: resp_bln.data.ptt_balance + resp_bln.data.total,
        });
      }
    } catch (e) {}
    finally{
      toggleLoader(false);

    }
  };

  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobileViewMenu, setIsMobileViewMenu] = useState(false);

  useEffect(() => {
    console.log(search);
    if (search != null) {
      setActivePage(search);
    }
    if (isVisible) {
      router.push("/auth/signin");
    }
    // getValue();
    function handleResize() {
      if (window.innerWidth <= 850) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
      if (window.innerWidth <= 1150) {
        setIsMobileViewMenu(true);
      } else {
        setIsMobileViewMenu(false);
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
        title="Dashboard"
        id="0x85cEakckvk2932b857"
        name="Dario Hanke"
        email="darhnk@gmail.com"
        imgUrl={"/profile/dario-hanke.svg"}
        isMobileView={isMobileView}
      />
      <div className={style.container}>
        <div className={style.mainCard}>
          {!isMobileView && (
            <label className={style.title_semibold_24}>
              Welcome to <label style={{ color: "#5BF4AB" }}>PrimeTrader</label>
            </label>
          )}

          <div
            className={style.cardBody}
            style={{ flexDirection: isMobileViewMenu ? "column" : "row" }}
          >
            <MenuCards
              ActivePage={search == null ? "portfolio" : search}
              isMobileView={isMobileViewMenu}
              menuData={menuData}
            />
            <div className={style.rightBody}>
              {search == null && (
                <PortfolioOverview
                  isMobileView={isMobileView}
                  portfolioOverviewData={portfolioOverviewData}
                />
              )}
              {search == "portfolio" && (
                <PortfolioOverview
                  isMobileView={isMobileView}
                  portfolioOverviewData={portfolioOverviewData}
                />
              )}
              {search == "refer" && (
                <ReferEarn
                  isMobileView={isMobileView}
                  referralCode={referralCode}
                />
              )}
              {search == "stake" && (
                <StakingPools
                  isMobileView={isMobileView}
                  stakingPoolData={stakingPoolData}
                />
              )}
              {search == "rank" && (
                <Ranking isMobileView={isMobileView} topRanker={topRanker} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const formatUnlocksDate = (x, currentDate) => {
  let date = new Date(x * 1000);

  // Calculate the difference in milliseconds
  let differenceInMillis = date - currentDate;

  // Calculate the difference in days
  let differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));

  // Construct the formatted string
  let formattedDate;

  if (differenceInDays === 0) {
    formattedDate = "today";
  } else if (differenceInDays === 1) {
    formattedDate = "tomorrow";
  } else if (differenceInDays > 1) {
    formattedDate = `in ${differenceInDays} days`;
  } else {
    formattedDate = `in ${differenceInDays} days ago`;
  }

  return formattedDate;
};
