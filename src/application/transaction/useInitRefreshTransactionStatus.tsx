import { useCallback, useEffect } from "react";
import fetchTransitionStatus from "./fetchTransitionStatus";
import { parseDurationAbsolute } from "@/utils/date/parseDuration";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { updateExistingHistoryItem } from "./txHistory";
import { useDispatch, useSelector } from "react-redux";
import { setAlltxHistory } from "@/redux/slice/txDataSlice";

export default function useInitRefreshTransactionStatus() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const dispatch = useDispatch();
  // const transactionHistory = useTxHistory((s) => s.txHistory)
  // const updateExistingHistoryItem = useTxHistory((s) => s.updateExistingHistoryItem)
  const { txHistory, alltxHistory } = useSelector(
    (state: any) => state.txDataSlice
  );

  const initRefreshTransactionStatus = useCallback(async () => {
    console.log("//////////////////////");
    if (!connection) return;
    const pendingTx = txHistory.filter((i: any) => i.status === "pending");
    const results = await fetchTransitionStatus(
      pendingTx.map((i: any) => i.txid),
      connection
    );
    console.log(results, "results in refreshTX");
    results.forEach((result, idx) => {
      const tx = pendingTx[idx];
      console.log("------------------------- >>>>>>>> ", tx);
      if (
        !result &&
        parseDurationAbsolute(Date.now() - Number(tx.time)).minutes > 5
      ) {
        updateExistingHistoryItem(
          tx.txid,
          txHistory,
          alltxHistory,
          (val: any) => {
            dispatch(setAlltxHistory(val));
          },
          wallet,
          { status: "droped", block: 0 }
        );
      } else if (result && !result.err) {
        updateExistingHistoryItem(
          tx.txid,
          txHistory,
          alltxHistory,
          (val: any) => {
            dispatch(setAlltxHistory(val));
          },
          wallet,
          { status: "success", block: result.slot }
        );
      } else if (result && result.err) {
        updateExistingHistoryItem(
          tx.txid,
          txHistory,
          alltxHistory,
          (val: any) => {
            dispatch(setAlltxHistory(val));
          },
          wallet,
          { status: "fail", block: result.slot }
        );
      }
    });
  }, [alltxHistory, connection]);

  useEffect(() => {
    initRefreshTransactionStatus();
  }, []);
}
