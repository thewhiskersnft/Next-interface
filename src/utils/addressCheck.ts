// const checkAddress = async () => {
//     try {
//       setLoading(true);
//       const mintAccount = await validateAddress(
//         connection,
//         new PublicKey(formik.values.tokenAddress)
//       );
//       // console.log("mintAccount", mintAccount);
//       if (!mintAccount) {
//         errorToast({ message: "Please Check the address" });
//       } else {
//         if (!isBurn && !mintAccount.mintAuthority) {
//           errorToast({ message: "Mint Authority Disabled!" });
//         } else {
//           setShowOnloadClick(true);
//         }
//       }
//       setLoading(false);
//     } catch {
//       errorToast({ message: "Please Check the address" });
//       setLoading(false);
//     }
// //   }
