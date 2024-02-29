import Form from "@/component/form";
import Header from "@/component/header";
import Sidebar from "@/component/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="width-100 flex flex-col h-max"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <Header showPrimaryHeader={true} />
      <div className="width-100 flex flex-row h-full overflow-hidden bg-black">
        <Sidebar />
        <Form />
        {/* <RightSidebar /> */}
      </div>
    </div>
  );
}
