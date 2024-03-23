"use client";
import { LiquidityRoutes } from "@/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import RightSidebar from "../common/rightSidebar";
import { useSelector } from "react-redux";
import Loader from "../common/loader";
import CreateOpenBookMarketId from "./createOpenBookMarketId";

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

  console.log("LA : ", liquidityAction);

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
        <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth">
          {liquidityAction === LiquidityRoutes.createOpenBookMarketId && (
            <CreateOpenBookMarketId />
          )}
          {/* {enableRightSidebar() && (
            <RightSidebar
              data={previewData}
              logo={getImageURL()}
              showInfo={true}
              createBtnText={
                liquidityAction === LiquidityRoutes.updateMetadata
                  ? "Update Metadata"
                  : selectedForm === keyPairs.createV1
                  ? "Create v1 SPL Token"
                  : "Create v2 SPL Token"
              }
              mediaLinks={{
                website: formik.values.website,
                twitter: formik.values.twitter,
                telegram: formik.values.telegram,
                discord: formik.values.discord,
              }}
              formik={formik}
              label={
                liquidityAction === LiquidityRoutes.updateMetadata
                  ? "Preview (Old Metadata)"
                  : "Preview"
              }
              loading={buttonClicked}
            />
          )} */}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          {appLoading ? <></> : <Loader visible={true} size={30} />}
        </div>
      )}
    </>
  );
};

export default LiquidityForm;
