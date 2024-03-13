import { useEffect } from "react";

// import useLocalStorageItem from '@/hooks/useLocalStorage'
import parseToTransacionHistory from "./parseToTransacionHistory";
// import useTwoStateSyncer from '../../hooks/use2StateSyncer'
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { settxHistory } from "@/redux/slice/txDataSlice";

export default function useSyncTxHistoryWithLocalStorage() {
  // const [rawHistory, setRawHistory] = useLocalStorageItem<TxHistoryStore['alltxHistory']>('RAY_RECENT_TRANSACTIONS')
  const { txHistory, alltxHistory } = useSelector(
    (state: any) => state.txDataSlice
  );
  const dispatch = useDispatch();
  const wallet = useWallet();
  const owner = wallet?.publicKey;

  // useTwoStateSyncer({
  //   state1: rawHistory,
  //   state2: alltxHistory,
  //   onState2Changed: (pairValue) => pairValue && setRawHistory(pairValue),
  //   onState1Changed: (pairValue) => pairValue && useTxHistory.setState({ alltxHistory: pairValue })
  // })

  /**  calc txHistory of {@link useTxHistory} */
  useEffect(() => {
    const parsedResult = parseToTransacionHistory(String(owner), alltxHistory);
    // useTxHistory.setState({ txHistory: parsedResult })
    dispatch(settxHistory(parsedResult));
  }, [alltxHistory, owner]);
}
