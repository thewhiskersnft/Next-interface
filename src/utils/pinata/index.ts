export const pinFileToIPFS = async (
  dataToSave: any,
  nameToSave: string,
  isImage: boolean
) => {
  console.log("-----------================>>>>>>>>>>>>>>>>>>>. ", dataToSave);
  //   const response = await fetch("/api/pinataUpload", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       nameToSave: nameToSave,
  //       dataToSave: dataToSave,
  //       isImage: isImage,
  //     }),
  //   });
  let formData = new FormData();
  const blob = isImage
    ? new File([dataToSave], "nft.png", {
        type: "image/png",
      })
    : new Blob([JSON.stringify(dataToSave)], {
        type: "text/plain",
      });
  formData.append("nameToSave", nameToSave);
  formData.append("dataToSave", blob);
  formData.append("isImage", `${isImage}`);
  const response = await fetch("/api/pinataUpload", {
    method: "POST",
    body: formData,
  });
  const res = await response.json();
  console.log("Resp from pinata : ", res);
  return res?.data;
};

export function toBase64(arr: any) {
  //arr = new Uint8Array(arr) if it's an ArrayBuffer
  //   console.log(arr, "8y7886876678668767677687676");
  //   return btoa(
  //     arr.reduce((data: any, byte: any) => data + String.fromCharCode(byte), "")
  //   );
  const base64String = btoa(
    String.fromCharCode(...(new Uint8Array(arr) as any))
  );
  return `data:image/png;base64,${base64String}`;
}
