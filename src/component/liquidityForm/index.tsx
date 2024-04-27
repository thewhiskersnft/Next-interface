"use client";
import { LiquidityRoutes } from "@/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import RightSidebar from "../common/rightSidebar";
import { useSelector } from "react-redux";
import Loader from "../common/loader";
import CreateOpenBookMarketId from "./createOpenBookMarketId";
import CreateLiquidityPools from "./CreateLiquidityPools";

const LiquidityForm = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const searchParams = useSearchParams();
  const liquidityAction = searchParams.get("action");

  const { appLoading } = useSelector((state: any) => state.appDataSlice);

  const [renderForm, setRenderForm] = useState(false);

  useEffect(() => {
    setRenderForm(true);
    // checkAndUpdateRPC();
  }, []);

  const enableRightSidebar = () => {
    if (
      [LiquidityRoutes.createOpenBookMarketId].includes(liquidityAction || "")
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      {renderForm ? (
        <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth px-4">
          {liquidityAction === LiquidityRoutes.createOpenBookMarketId && (
            <CreateOpenBookMarketId />
          )}
          {liquidityAction === LiquidityRoutes.createLiquidityPool && (
            <CreateLiquidityPools />
          )}
          {enableRightSidebar() && (
            <RightSidebar
              hidePreview={true}
              data={{}}
              logo={""}
              showInfo={true}
              createBtnText={""}
              mediaLinks={{
                website: "",
                twitter: "",
                telegram: "",
                discord: "",
              }}
              formik={null}
              label={""}
              loading={false}
              infoData={[
                "Mint Authority: This is the authority (anaccount) that has the permission to mintnew tokens of a specific type. If a tokenaccount has a mint authority set, thataccount can create more tokens at anytime, increasing the supply.",
                "Freeze Authority: This is the authority that has the capability to freeze and unfreeze token accounts. When a token account is frozen, it can no longer send or receivetokens. This is useful for enforcingcompliance or addressing securityconcerns.",
                "Mutable Metadata: SPL tokens can haveassociated metadata that describes thetoken, like its name, symbol, and otherdetails. If the metadata is mutable, itmeans that the information can bechanged after the token is created.Disabling the mutability makes themetadata permanent and unchangeable.",
              ]}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          {appLoading ? <></> : <Loader visible={true} size={80} />}
        </div>
      )}
    </>
  );
};

export default LiquidityForm;
