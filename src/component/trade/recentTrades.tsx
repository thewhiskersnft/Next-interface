import Image from "next/image";
import React from "react";

interface TradeInterface {
  time: string;
  type: string;
  price: number;
  size: string;
  value: string; // might change to number
  buyer: string;
  amount: string; //might change to number
  tradeInfo: string;
  statusColor?: string;
}

interface RecentTradeProps {
  trades: Array<TradeInterface>;
}

const RecentTrades = ({ trades }: RecentTradeProps) => {
  return (
    <div className="px-4 bg-brownBG">
      <table
        className="table-auto w-full"
        style={{ borderCollapse: "separate", borderSpacing: "0px 10px" }}
      >
        <thead className="">
          <tr className="font-Orbitron text-xsmall">
            <th className="text-left py-1">
              <span className="flex gap-2">
                Time{" "}
                <Image
                  className="cursor-pointer"
                  src={"/tradeTime.svg"}
                  alt="Time Logo"
                  height={20}
                  width={20}
                  priority
                />
              </span>
            </th>
            <th className="text-left py-1">
              <span className="flex gap-2">
                Type{" "}
                <Image
                  className="cursor-pointer"
                  src={"/tradeFilter.svg"}
                  alt="Filter Logo"
                  height={20}
                  width={20}
                  priority
                />
              </span>
            </th>
            <th className="text-left py-1">Price</th>
            <th className="text-left py-1">
              <span className="flex gap-2">
                Size{" "}
                <Image
                  className="cursor-pointer"
                  src={"/tradeFilter.svg"}
                  alt="Filter Logo"
                  height={20}
                  width={20}
                  priority
                />
              </span>
            </th>
            <th className="text-left py-1">
              <span className="flex gap-2">
                Value{" "}
                <Image
                  className="cursor-pointer"
                  src={"/tradeFilter.svg"}
                  alt="Filter Logo"
                  height={20}
                  width={20}
                  priority
                />
              </span>
            </th>
            <th className="text-left py-1">
              <span className="flex gap-2">
                Buyer{" "}
                <Image
                  className="cursor-pointer"
                  src={"/tradeFilter.svg"}
                  alt="Filter Logo"
                  height={20}
                  width={20}
                  priority
                />
              </span>
            </th>
            <th className="text-left py-1">Amount</th>
            <th className="text-left py-1">TXN</th>
          </tr>
        </thead>
        <tbody style={{ rowGap: "10px" }}>
          {trades.map((trade: TradeInterface, index: number) => {
            const {
              time,
              type,
              price,
              size,
              value,
              buyer,
              amount,
              tradeInfo,
              statusColor,
            } = trade;
            return (
              <tr
                className="text-xsmall font-Oxanium"
                style={{
                  color: statusColor || "white",
                  borderBottom: "2px solid yellow",
                }}
              >
                <td className="border-b-[1px] border-tableBorder">{time}</td>
                <td className="border-b-[1px] border-tableBorder">{type}</td>
                <td className="border-b-[1px] border-tableBorder">{price}</td>
                <td className="border-b-[1px] border-tableBorder">{size}</td>
                <td className="border-b-[1px] border-tableBorder">{value}</td>
                <td className="border-b-[1px] border-tableBorder">{buyer}</td>
                <td className="border-b-[1px] border-tableBorder">{amount}</td>
                <td className="border-b-[1px] border-tableBorder">
                  <Image
                    className="cursor-pointer"
                    src={"/link.svg"}
                    alt="Link Logo"
                    height={20}
                    width={20}
                    priority
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTrades;
