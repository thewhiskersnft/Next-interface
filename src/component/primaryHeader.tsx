"use client";
import App from "next/app";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import axios from 'axios';

const borderColor: string = "#4D4D4D";








const PrimaryHeader: FC = () => {

  const [price, setPrice] = useState();
  const [Volume, setVolume] = useState();


  useEffect(() => {
    const price = async () => {
    try{
      const soltokenpriceData = await axios.get(
        "https://price.jup.ag/v4/price?ids=SOL"
      );
      const soltokenPrice = soltokenpriceData.data.data["SOL"].price;
      setPrice(parseFloat(soltokenPrice.toFixed(2)) as any)
    }
    catch(e){
         return;
       }
    }
    price();
    const Volume = async () => {
      try{
        const soltokenpriceData = await axios.get(
          "https://cache.jup.ag/stats/day"
        );
        console.log("soltokenPrice", soltokenpriceData.data.lastXVolumeInUSD);
        const a = soltokenpriceData.data.lastXVolumeInUSD
        const language = "en"
        const b=  Intl.NumberFormat(language, {notation: "compact"}).format((parseFloat(a))) //output - "234K"
        setVolume(b as any)

      }
      catch(e){
           return;
         }
      }
      Volume()



  }, []);

  return (
    <div
      className="w-full bg-black flex justify-between py-[5px]"
      style={{ borderTopWidth: "0.2px", borderColor: borderColor }}
    >
      <div className="flex">
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer flex items-center">
            {/* <img
              src={solana}
              alt="settings"
              width={`${16}px`}
              style={{
                height: `${16}px`,
                marginRight: "5px",
              }}
            /> */}
            <Image
              src={"/solana.svg"}
              alt="solana Logo"
              width={16}
              height={16}
              style={{ marginRight: "5px" }}
              priority
            />
            {price} USD
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            TSP: 2.778
          </div>
        </div>
        <div
          className="px-6 flex items-center"
          style={{
            borderRightWidth: "2px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            24h Volume: {Volume} USD
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className="cursor-pointer px-4 flex items-center hover:bg-[]"
          style={{
            borderLeftWidth: "0.5px",
            borderColor: borderColor,
          }}
        >
          {/* <img
            src={setting}
            alt="settings"
            width={`${20}px`}
            style={{
              height: `${20}px`,
            }}
          /> */}
          <Image
            src={"/setting.svg"}
            alt="setting Logo"
            width={20}
            height={20}
            // style={{ marginRight: "5px" }}
            priority
          />
        </div>
        <div
          className="text-white text-xsmall font-Orbitron text-left items-center px-6 flex flex-row"
          style={{
            borderLeftWidth: "0.5px",
            borderColor: borderColor,
          }}
        >
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Lite
          </div>
          <label className="switch text-xsmall mx-4">
            <input
              onClick={() => {
                console.log("Toggle theme");
              }}
              checked={true}
              type="checkbox"
              onChange={() => { }}
            />
            <span className="slider round"></span>
          </label>
          <div className="text-center text-white text-xsmall font-Orbitron w-100 cursor-pointer">
            Pro
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
