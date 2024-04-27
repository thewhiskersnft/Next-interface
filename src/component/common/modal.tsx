//Modal.tsx
import React, { useRef } from "react";
import cn from "classnames";
import Image from "next/image";
// import { useOnClickOutside } from "usehooks-ts";
type Props = {
  children: React.ReactNode;
  open: boolean;
  // add disableClickOutside
  disableClickOutside?: boolean;
  //add onClose event so that we can close the modal from inside the component
  onClose(): void;
};

const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
  const ref = useRef(null);
  //   useOnClickOutside(ref, () => {
  //     if (!disableClickOutside) {
  //       onClose();
  //     }
  //   });

  const modalClass = cn({
    "modal modal-bottom sm:modal-middle ": true,
    "modal-open": open,
  });
  return (
    <dialog className={modalClass}>
      <div
        className="modal-box"
        ref={ref}
        style={{ overflow: "visible", background: "none" }}
      >
        <div className="relative w-max">
          {/* <Image
            src={"/close.svg"}
            alt="Close Logo"
            width={15}
            height={15}
            className="cursor-pointer absolute right-[15px] top-[15px]"
            priority
            onClick={onClose}
          /> */}
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
