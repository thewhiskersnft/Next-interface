"use client";
import React, { useState, useEffect } from "react";
import RewardsTable from "./rewardsTable";
import RightSidebar from "../common/rightSidebar";
import rewardService from "@/services/rewardService";
import { get } from "lodash";

interface RewardsComponentProps {}

const tabs = {
  myRewards: "My Rewards",
  referals: "Referals",
  earnPoints: "Earn Points",
} as { [key: string]: string };

const dummyRewardsData = [
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "edmefcnndckdslcncmlj",
    totalMoons: 9348,
    sevenDayMoons: 37,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
  {
    rank: 54,
    user: "efcnndckdslcncmldkcm",
    totalMoons: 9887,
    sevenDayMoons: 87,
  },
];

const RewardsComponent = ({}: RewardsComponentProps) => {
  const [selectedTab, setSelectedTab] = useState(tabs.myRewards);
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    console.log("Fetching LeaderBoard : ...................");
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    const leaderboardData = await rewardService.fetchLeaderboard();
    console.log(leaderboardData);
    if (leaderboardData.status) {
      setRewards(get(leaderboardData, "data.data", []));
    }
  };

  return (
    <div className="h-full w-full px-4 py-4 box-border flex gap-4">
      <div className="flex flex-1 flex-col py-2">
        <div className="flex" id="tabs">
          {Object.keys(tabs).map((tabKey: string, index: number) => {
            let tabLabel = tabs[tabKey] as any;
            return (
              <button
                key={index + "button"}
                className={`${
                  selectedTab === tabLabel
                    ? "bg-yellow1 text-black font-semibold"
                    : "bg-black text-white font-light"
                } tracking-wide font-semibold font-Orbitron w-[180px] h-[40px] text-center justify-center text-xsmall border-[1px] border-black flex items-center ${
                  selectedTab === tabLabel
                    ? ""
                    : "hover:border-yellow1 hover:bg-variant1"
                }`}
                onClick={() => {
                  setSelectedTab(tabLabel);
                }}
                style={{
                  border: "1px solid #4D4D4D",
                }}
              >
                {tabLabel}
              </button>
            );
          })}
        </div>
        <div
          id="tab-content"
          className="w-full border-[1px] border-yellow1 box-border px-4 py-6"
          style={{ maxHeight: "calc(100% - 50px)", overflow: "scroll" }}
        >
          {selectedTab === tabs.myRewards && (
            <>
              <section className="w-full mt-4 pl-4">
                <p className="font-Orbitron text-white text-large">
                  Season 1 Leaderboard
                </p>
              </section>
              <section id="rewards-table" className="w-full mt-8">
                <RewardsTable rewards={rewards} />
              </section>
            </>
          )}
        </div>
      </div>
      <div style={{ maxHeight: "calc(100% - 17px)", overflow: "scroll" }}>
        <RightSidebar
          hidePreview={false}
          showRewards={true}
          rewardPoints={77643}
          hideLinks={true}
          data={{
            User: {
              "Wallet Address": "djklcnkldcldllklk348907njk",
              Rank: "# 1345",
              "Total Moons": "432,334",
              "7-day Moons": "432",
              Referals: "-",
              "Moons from Referals": "-",
              "Moons from Engagements": "-",
              "Trading Volume": "-",
            },
          }}
          logo={""}
          showInfo={true}
          createBtnText={""}
          logoContainerStyles={{ height: "104px" }}
          mediaLinks={{
            website: "",
            twitter: "",
            telegram: "",
            discord: "",
          }}
          formik={null}
          label={""}
          loading={false}
          hideCreateBtn={true}
          infoData={[
            "Mint Authority: This is the authority (anaccount) that has the permission to mintnew tokens of a specific type. If a tokenaccount has a mint authority set, thataccount can create more tokens at anytime, increasing the supply.",
            "Freeze Authority: This is the authority that has the capability to freeze and unfreeze token accounts. When a token account is frozen, it can no longer send or receivetokens. This is useful for enforcingcompliance or addressing securityconcerns.",
            "Mutable Metadata: SPL tokens can haveassociated metadata that describes thetoken, like its name, symbol, and otherdetails. If the metadata is mutable, itmeans that the information can bechanged after the token is created.Disabling the mutability makes themetadata permanent and unchangeable.",
          ]}
        />
      </div>
    </div>
  );
};

export default RewardsComponent;
