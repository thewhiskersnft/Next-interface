// "use client";
// import React, { useState } from "react";
// import CustomInput from "./customInput";
// import CustomButton from "./customButton";
// import { revokeMintAuthTxBuilder } from "@/solana/txBuilder/revokeMintAuthTxBuilder";
// import { PublicKey } from "@metaplex-foundation/js";
// import { useConnection } from "@solana/wallet-adapter-react";

// type ManageTokenProps = { isBurn?: boolean; formik?: any };

// const ManageToken = ({
//   formik = { errors: {}, values: {}, touched: {} },
// }: ManageTokenProps) => {
//   const { connection } = useConnection();

//   const [showOnLoadClick, setShowOnloadClick] = useState(false);

//   const revokeMintAuth = async () => {
//     try {
//       // handler to mint TOKEns
//       // const amount = "1000000000000"; // multiply with decimal later
//       // const txhash = await createMintTokensTxBuilder(
//       //   connection,
//       //   wallet,
//       //   new PublicKey(tokenAddress),
//       //   amount
//       // );

//       // handler to burn tokens
//       // const amount = "1000000000000";
//       // const txhash = await createBurnTokensTxBuilder(
//       //   connection,
//       //   wallet,
//       //   new PublicKey(tokenAddress),
//       //   amount
//       // );

//       const txhash = await revokeMintAuthTxBuilder(
//         connection,
//         wallet,
//         new PublicKey(formik.values.tokenAddress)
//       );

//       console.log(txhash);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const revokeFreezeAuth = async () => {
//     try {
//       const txhash = await revokeFreezeAuthTxBuilder(
//         connection,
//         wallet,
//         new PublicKey(tokenAddress)
//       );
//       console.log(txhash);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <span className="text-white flex mt-6 w-[375px] justify-between items-center">
//         <span className="w-[320px] flex justify-between">
//           <p className="text-left text-xsmall font-Orbitron w-[160px]">
//             {"Mint Authority"}
//           </p>
//           <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
//         </span>
//         <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
//           {`${formik?.values.mintAuthority ? "Enabled" : "Disabled"}`}
//         </p>
//         <div className="flex justify-left w-[200px]">
//           <CustomButton
//             label="Revoke"
//             onClick={async () => {
//               await revokeMintAuth();
//             }}
//           />
//         </div>
//       </span>
//       <span className="text-white flex mt-6 w-[375px] justify-between items-center">
//         <span className="w-[320px] flex justify-between">
//           <p className="text-left text-xsmall font-Orbitron w-[160px]">
//             {"Freeze Authority"}
//           </p>
//           <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
//         </span>
//         <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
//           {`${freezeAuthority ? "Enabled" : "Disabled"}`}
//         </p>
//         <div className="flex justify-left w-[200px]">
//           <CustomButton
//             label="Revoke"
//             onClick={async () => {
//               await revokeFreezeAuth();
//             }}
//           />
//         </div>
//       </span>
//       <span className="text-white flex mt-6 w-[375px] justify-between items-center">
//         <span className="w-[320px] flex justify-between">
//           <p className="text-left text-xsmall font-Orbitron w-[160px]">
//             {"Mutable Metadata"}
//           </p>
//           <p className="text-left text-xsmall font-Orbitron">{` : `}</p>
//         </span>
//         <p className="w-2/3 text-left text-xsmall font-Orbitron pl-[12px]">
//           {`${mutableMetadata ? "True" : "False"}`}
//         </p>
//         <div className="flex justify-left w-[200px]">
//           <CustomButton
//             label={mutableMetadata ? "Disable" : "Enable"}
//             onClick={() => {
//               dispatch(setMutableMetadata(!mutableMetadata));
//             }}
//           />
//         </div>
//       </span>
//     </>
//   );
// };

// export default ManageToken;
