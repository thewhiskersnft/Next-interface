import Image from "next/image";
import React from "react";

interface LaunchpadDropCardProps {
  name: string;
  imgSrc: string;
}

const LaunpadDropCard = ({ name, imgSrc }: LaunchpadDropCardProps) => {
  return (
    <section className="relative rounded overflow-hidden cursor-pointer border-[1.9px] border-[#666666]">
      <img
        src={imgSrc}
        style={{
          height: "324px",
          width: "320px",
          objectFit: "cover",
          objectPosition: "center",
        }}
        alt="drop card"
      />
      <section className="absolute h-full w-full bg-gradient-to-t from-[rgba(0,0,0,1)] top-0 left-0 flex justify-between px-4 py-4 items-end">
        <div className="flex items-center justify-between w-full">
          <p className="font-Inter font-[400] text-[#E8E8E8] text-[18px]">
            {name}
          </p>
          <span className="flex gap-2">
            <p className="font-Inter font-[400] text-[#FFFFFF] text-[12px]">
              {"Open Edition"}
            </p>
            <Image
              src={"/solana.svg"}
              alt="solana Logo"
              width={12}
              height={12}
              style={{}}
              priority
            />
          </span>
        </div>
      </section>
    </section>
  );
};

export default LaunpadDropCard;
