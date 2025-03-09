const tokenData = [
  {
    tokenName: "SOLX",
    tokenAddress: "4jUjUEn6GhF7mVpP9GqjRz3NdDQvLnMk9Npa3q2uLtG5",
    topHolders: "15%",
    marketCap: "25M",
    volume: "1.2M",
    insiders: "5%",
    devHolds: "6%",
    timeSinceCreation: "1mo",
    bondingCurve: "68%",
  },
  {
    tokenName: "SPRT",
    tokenAddress: "2hT5mN5RzPiTpWdGV68gKqTxXrPbR7CZyMzAeJmG7bB3",
    topHolders: "8%",
    marketCap: "18M",
    volume: "950K",
    insiders: "2%",
    devHolds: "5%",
    timeSinceCreation: "6mo",
    bondingCurve: "42%",
  },
  {
    tokenName: "LUNA",
    tokenAddress: "8fY9wEoH3TvT6Db1B46MuM9MdURx9XWPtkgA7FyRnm5x",
    topHolders: "20%",
    marketCap: "50M",
    volume: "2.2M",
    insiders: "6%",
    devHolds: "6%",
    timeSinceCreation: "1yr",
    bondingCurve: "10%",
  },
  {
    tokenName: "GEM",
    tokenAddress: "A9DjL2UuFJhUcdQoZG1KhY5smnD8FkgcPbXtPbsfjP67",
    topHolders: "12%",
    marketCap: "32M",
    volume: "1.1M",
    insiders: "4%",
    devHolds: "4%",
    timeSinceCreation: "9mo",
    bondingCurve: "90%",
  },
  {
    tokenName: "FLY",
    tokenAddress: "B7hFqT2Pg9WvV8MEuKXzyPxR5TzPZCTrNq3Xg6kT9Y41",
    topHolders: "9%",
    marketCap: "15M",
    volume: "700K",
    insiders: "3%",
    devHolds: "5%",
    timeSinceCreation: "2y",
    bondingCurve: "79%",
  },
  {
    tokenName: "SHIB",
    tokenAddress: "B7hFqT2Pg9WvV8MEuKXzyPxR5TzPZCTrNq3Xg6kT9Y41",
    topHolders: "9%",
    marketCap: "15M",
    volume: "700K",
    insiders: "3%",
    devHolds: "5%",
    timeSinceCreation: "2y",
    bondingCurve: "25%",
  },
];

import React from "react";
import Vertical from "./vertical";
import New from "./asset/new.svg"; // This icon is available in your assets
import Graduate from "./asset/graduate.svg";
import Graduated from "./asset/graduated.svg";
import Block from "./block";

const DashboardGrid = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
      <Vertical title="NEW COINS" icon={New} filterCount={2}>
        <Block data={tokenData} />
      </Vertical>
      <Vertical title="ABOUT TO GRADUATE" icon={Graduate} filterCount={2}>
        <Block data={tokenData} />
      </Vertical>
      <Vertical title="GRADUATED" icon={Graduated} filterCount={2}>
        <Block data={tokenData} />
      </Vertical>
    </div>
  );
};

export default DashboardGrid;
