import { toBase64 } from "@/utils/pinata";
import { NextAuthRequest } from "./../../../../node_modules/next-auth/src/core/types";
import { AppENVConfig } from "@/global/config/config";
import { getBrowserFileFromMetaplexFile } from "@metaplex-foundation/js";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { get } from "lodash";

// export async function POST(request: any) {
//   const JWT = AppENVConfig.pinata_storage_api_key;
//   const requestBody = await request.json(); // To read request data

//   // const queryParams = url.parse(request.url, true).query;
//   console.log(requestBody, "/////////////////////");
//   // return NextResponse.json({});
//   // const { formData } = requestBody;
//   const { dataToSave, nameToSave, isImage } = requestBody;
//   console.log("-----------================>>>>>>>>>>>>>>>>>>>. ", dataToSave);
//   const formData = new FormData();
//   let convertedFile = {} as any;
//   if (isImage) {
//     // convertedFile = new File([dataToSave], "nft.png", {
//     //   type: "image/png",
//     // });
//     // let imgFile = await getBrowserFileFromMetaplexFile(dataToSave);
//     convertedFile = new File([dataToSave], "nft.png", {
//       type: "image/png",
//     });
//     convertedFile = dataToSave;
//     // convertedFile = toBase64(get(dataToSave, "buffer", []));
//     console.log("cf kjjbkjjnjn", convertedFile);
//   } else {
//     convertedFile = new Blob([JSON.stringify(dataToSave)], {
//       type: "text/plain",
//     });
//   }
//   formData.append("file", convertedFile);

//   const pinataMetadata = JSON.stringify({
//     name: nameToSave,
//   });
//   formData.append("pinataMetadata", pinataMetadata);

//   const pinataOptions = JSON.stringify({
//     cidVersion: 0,
//   });
//   formData.append("pinataOptions", pinataOptions);

//   try {
//     const res = await axios.post(
//       "https://api.pinata.cloud/pinning/pinFileToIPFS",
//       formData,
//       {
//         // maxBodyLength: "Infinity",
//         headers: {
//           "Content-Type": `multipart/form-data;`,
//           Authorization: `Bearer ${JWT}`,
//         },
//       }
//     );
//     const pinataDataURL = `https://gateway.pinata.cloud/ipfs/${res?.data?.IpfsHash}`;
//     // return pinataDataURL;
//     return NextResponse.json({ data: pinataDataURL });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ data: null });
//   }
// }

export async function POST(request: any) {
  const JWT = AppENVConfig.pinata_storage_api_key;
  try {
    const requestBody = await request.formData();
    console.log("Request body : ", requestBody);
    // const { dataToSave, nameToSave, isImage } = requestBody;
    const dataToSave = requestBody.get("dataToSave");
    const nameToSave = requestBody.get("nameToSave");
    const isImage = requestBody.get("isImage");
    console.log(
      dataToSave,
      nameToSave,
      isImage,
      "DS ................................................................."
    );

    const convertedFile = isImage ? dataToSave : dataToSave;

    const formData = new FormData();
    formData.append("file", convertedFile);

    const pinataMetadata = JSON.stringify({
      name: nameToSave,
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        // maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data;`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    const pinataDataURL = `https://gateway.pinata.cloud/ipfs/${res?.data?.IpfsHash}`;

    return NextResponse.json({ data: pinataDataURL });
  } catch {
    return NextResponse.json({ data: false });
  }
}
