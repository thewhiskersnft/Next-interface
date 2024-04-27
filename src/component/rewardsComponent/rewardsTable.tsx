import { numberWithCommas } from "@/utils/common";
import Image from "next/image";
import React from "react";

interface RewardInterface {
  rank?: number;
  user_name: string;
  total_points: number;
  sevenDayPoints: number;
  wallet_address: string;
}

interface RewardsTableProps {
  rewards: Array<RewardInterface>;
}

const RewardsTable = ({ rewards }: RewardsTableProps) => {
  return (
    <div className="px-4 bg-brownBG">
      <table
        className="table-auto w-full"
        style={{ borderCollapse: "separate", borderSpacing: "0px 0px" }}
      >
        <thead className="">
          <tr className="font-Orbitron text-xsmall">
            <th className="text-center py-1">Rank</th>
            <th className="text-center py-1">User/Wallet</th>
            <th className="text-center py-1">Total Moons</th>
            <th className="text-center py-1">7-Day Moons</th>
          </tr>
        </thead>
        <tbody style={{ rowGap: "10px" }}>
          {rewards.map((trade: RewardInterface, index: number) => {
            const { rank, wallet_address, total_points, sevenDayPoints } =
              trade;

            return (
              <tr
                className={`text-xsmall font-Oxanium ${
                  index % 2 === 0 ? "bg-[#333333]" : "bg-[#222222]"
                }`}
                key={index}
              >
                <td className="px-2 py-2 text-center">{index + 1}</td>
                <td className="px-2 py-2 text-center">{wallet_address}</td>
                <td className="px-2 py-2 text-center">
                  {numberWithCommas(total_points)}
                </td>
                <td className="px-2 py-2 text-center">
                  {numberWithCommas(sevenDayPoints)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsTable;
