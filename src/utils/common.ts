import { successToast } from "@/component/common/toast";

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  successToast({ message: "Copied!" });
};
