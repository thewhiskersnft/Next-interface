import Image from "next/image";
import React from "react";
import { infoToast } from "./toast";

const demoFavs = [
  { icon: "/cat1.svg" },
  { icon: "/cat1.svg" },
  { icon: "/cat1.svg" },
  { icon: "/cat1.svg" },
  { icon: "/cat1.svg" },
];

const FavouriteSidebar = () => {
  return (
    <div className="bg-black pt-4" style={{ borderRight: "2px solid #4D4D4D" }}>
      {demoFavs.map((fav: any, index: number) => {
        return (
          <div
            className="px-2 py-2"
            key={index}
            onClick={() => infoToast({ message: "Coming Soon!" })}
          >
            <Image
              src={fav.icon}
              alt="discord Logo"
              width={40}
              height={40}
              className="cursor-pointer hover:scale-125"
              priority
            />
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteSidebar;
