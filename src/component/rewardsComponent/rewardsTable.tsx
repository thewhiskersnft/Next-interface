import { numberWithCommas } from "@/utils/common";
import Image from "next/image";
import React from "react";

interface RewardInterface {
  rank: number;
  user: string;
  totalMoons: number;
  sevenDayMoons: number;
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
            const { rank, user, totalMoons, sevenDayMoons } = trade;

            return (
              <tr
                className={`text-xsmall font-Oxanium ${
                  index % 2 === 0 ? "bg-[#333333]" : "bg-[#222222]"
                }`}
              >
                <td className="px-2 py-2 text-center">{rank}</td>
                <td className="px-2 py-2 text-center">{user}</td>
                <td className="px-2 py-2 text-center">
                  {numberWithCommas(totalMoons)}
                </td>
                <td className="px-2 py-2 text-center">
                  {numberWithCommas(sevenDayMoons)}
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
