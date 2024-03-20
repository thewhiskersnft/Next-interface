import ComingSoon from "@/component/comingSoon";
import Header from "@/component/header";
import AirdropChecker from "@/component/airdrop";
import PrimaryHeader from "@/component/primaryHeader";
import Sidebar from "@/component/form/sidebar";
import { Suspense } from "react";
import Loader from "@/component/loader";

export default function Airdrop() {
  return (
    <Suspense
      fallback={
        <div className='flex h-[100vh] w-[100vw] justify-center items-center absolute top-[0]'>
          <Loader visible={true} size={80} />
        </div>
      }
    >
      {/* View for screen smaller than lg (Mobile, Tablets, iPad) */}
      <div className='block lg:hidden'>
        <ComingSoon hideOnWeb={true} />
      </div>
      {/* View for screen bigger or equal to lg size (Laptops, Desktop, etc.) */}
      <div className='hidden lg:block'>
        <div
          className='width-100 flex flex-col h-max'
          style={{ height: "100vh", overflow: "hidden" }}
        >
          <Header selectedLink='TOOLS' />
          <div className='width-100 flex flex-row h-full overflow-hidden bg-black'>
            <Sidebar />
            <AirdropChecker />
          </div>
          <PrimaryHeader />
        </div>
      </div>
    </Suspense>
  );
}
