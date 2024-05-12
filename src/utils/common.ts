import { successToast } from "@/component/common/toast";

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  successToast({ message: "Copied!" });
};

export function numberWithCommas(x: number) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
}
