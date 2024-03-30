import { get } from "lodash";
import React from "react";

function QueueLength({ item }: any) {
  return (
    <div className='flex flex-col mt-4 border-b border-lightGrey font-thin  pb-2'>
      <p className='text-disabledLink text-small text-left font-Oxanium font-normal capitalize'>
        {get(item, "title", "Queue Length")}
      </p>
      <div className='flex mt-4 justify-between items-center divide-x'>
        <p className='text-white text-xsmall text-left font-Oxanium font-light flex-1'>
          {get(item, "length", "-")}
        </p>
        <p className='text-disabledLink text-xsmall text-right font-Oxanium font-light flex-1'>
          {get(item, "size", "-")} bytes
        </p>
      </div>
    </div>
  );
}

export default QueueLength;
