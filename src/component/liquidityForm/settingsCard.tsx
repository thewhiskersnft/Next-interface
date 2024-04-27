"use client";
import React from "react";
import Image from "next/image";
import { get } from "lodash";
import QueueLength from "./queueLength";

const data = [
  {
    title: "Event Queue Length",
    length: "2978",
    size: "262108",
  },
  {
    title: "Request Queue Length",
    length: "2978",
    size: "262108",
  },
  {
    title: "Orderbook Length",
    length: "2978",
    size: "262108",
  },
];

function SettingsCard({ item, selected, handleClick }: any) {
  return (
    <div
      className={`flex-1 flex flex-col custom-card-border hover:border-yellow1 min-w-[254px] max-w-[350px] p-5`}
      style={
        selected
          ? {
              borderColor: "#FFC83A",
            }
          : {}
      }
      onClick={handleClick ? handleClick : undefined}
    >
      <div className="flex h-[85px]">
        <Image
          src={get(item, "image", "/oneThirdMoon.svg")}
          alt="paste"
          width={64}
          height={64}
        />
        <div className="flex flex-col ml-3">
          <p className="text-xsmall text-left font-Orbitron font-medium uppercase">
            {get(item, "title", "")}
          </p>
          <p className="text-disabledLink text-xsmall text-left font-Oxanium font-thin text-justify mt-2">
            {get(item, "description", "")}
          </p>
        </div>
      </div>
      {data.map((item, index) => (
        <QueueLength key={index} item={item} />
      ))}
      <div className="flex mt-6 justify-between items-center">
        <p className="text-yellow1 text-xsmall font-Orbitron font-normal flex-1">
          Price
        </p>
        <p className="text-yellow1 text-xsmall text-right font-Orbitron font-normal flex-1 uppercase">
          {get(item, "price", "")} Sol
        </p>
      </div>
    </div>
  );
}

export default React.memo(SettingsCard);
