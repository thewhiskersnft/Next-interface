import RecentTrades from "@/component/trade/recentTrades";
import TradeGrapg from "@/component/trade/tradeGrapg";
import React from "react";

const demoTrades = [
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#09A854",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#D93535",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#FFC83A",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#09A854",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#208CEF",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#FFC83A",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#D93535",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#D93535",
  },
  {
    time: "99 min ago",
    type: "buy",
    price: 0.0002,
    size: "large",
    value: "$2323232",
    buyer: "$2000.34",
    amount: "22.22k SOL to 12.34 WHIZ",
    tradeInfo: "https://google.com",
    statusColor: "#FFC83A",
  },
];

const Trade = () => {
  return (
    <div style={{ height: "100vh" }}>
      {/* <RecentTrades trades={demoTrades} /> */}
      <TradeGrapg />
    </div>
  );
};

export default Trade;
