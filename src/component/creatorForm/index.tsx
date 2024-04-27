"use client";
import { CreatorRoutes, LiquidityRoutes } from "@/constants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import RightSidebar from "../common/rightSidebar";
import { useSelector } from "react-redux";
import Loader from "../common/loader";
import SnapshotHolder from "./snapshotHolders";
import AirdropHolder from "./airdropHolder";
import { useFormik } from "formik";

const CreatorForm = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const searchParams = useSearchParams();
  const creatorAction = searchParams.get("action");

  const { appLoading } = useSelector((state: any) => state.appDataSlice);

  const [renderForm, setRenderForm] = useState(false);
  const {
    name,
    previewData,
    discord,
    telegram,
    twitter,
    fileData,
    website,
    decimal,
    supply,
    description,
    symbol,
  } = useSelector((state: any) => state.formDataSlice);

  const formik = useFormik({
    initialValues: {
      name: name,
      symbol: symbol,
      description: description,
      supply: supply,
      decimal: decimal,
      website: website,
      twitter: twitter,
      telegram: telegram,
      discord: discord,
      logo: "",
      token: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {},
  });

  useEffect(() => {
    setRenderForm(true);
    // checkAndUpdateRPC();
  }, []);

  const enableRightSidebar = () => {
    if (
      [CreatorRoutes.snapshotHolders, CreatorRoutes.sendAirdrops].includes(
        creatorAction || ""
      )
    ) {
      return true;
    }
    return false;
  };

  const getImageURL = () => {
    if (fileData && fileData.name) return URL.createObjectURL(fileData);
    return "";
  };

  return (
    <>
      {renderForm ? (
        <div className="flex flex-row flex-1 h-full overflow-auto scroll-smooth px-4">
          {creatorAction === CreatorRoutes.snapshotHolders && (
            <SnapshotHolder />
          )}
          {creatorAction === CreatorRoutes.sendAirdrops && (
            <AirdropHolder
              onTokenSubmit={formik.handleSubmit}
              isTokenLoading={formik.isSubmitting}
              tokenValue={formik.values.token}
            />
          )}
          {enableRightSidebar() && (
            <RightSidebar
              hidePreview={CreatorRoutes.sendAirdrops !== creatorAction}
              data={previewData}
              logo={getImageURL()}
              showInfo={true}
              createBtnText={"Create"}
              mediaLinks={{
                website: formik.values.website,
                twitter: formik.values.twitter,
                telegram: formik.values.telegram,
                discord: formik.values.discord,
              }}
              formik={formik}
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
          {appLoading ? <></> : <Loader visible={true} size={30} />}
        </div>
      )}
    </>
  );
};

export default CreatorForm;
