import { DateInfo, HexAddress, MayFunction, TxHistoryInfo } from "@/interfaces";
import { shrinkToValue } from "@/utils/shrinkToValue";
import { useWallet } from "@solana/wallet-adapter-react";

type TxHistoryController = {
  updateExistingHistoryItem: typeof updateExistingHistoryItem;
};

export type TxHistoryStore = {
  alltxHistory: Record<
    HexAddress /* wallet publickey */,
    Record<TxHistoryInfo["txid"], TxHistoryInfo>
  >;
  txHistory: TxHistoryInfo[];
  addHistoryItem: typeof addHistoryItem;
  updateExistingHistoryItem: typeof updateExistingHistoryItem;
};

export function addHistoryItem(
  item: TxHistoryInfo,
  txHistory: any,
  updateAlltxHistory: any,
  alltxHistory: any,
  wallet: any
): Promise<any> {
  // const wallet = useWallet();
  const owner = wallet?.publicKey;
  const addedTxHistoryOfOwner = txHistory.slice(0, 18).concat(item);
  updateAlltxHistory({
    // alltxHistory,
    addedTxHistoryOfOwner,
    [String(owner)]: Object.fromEntries(
      addedTxHistoryOfOwner.map((item: any) => [item.txid, item])
    ),
  });

  return Promise.resolve({
    // updateExistingHistoryItem: updateExistingHistoryItem,
    resp: true,
  });
}

export async function updateExistingHistoryItem(
  txid: HexAddress,
  txHistory: any,
  alltxHistory: any,
  updateAlltxHistory: any,
  wallet: any,
  piece: MayFunction<Partial<TxHistoryInfo>, [old: TxHistoryInfo]>
) {
  return new Promise((resolve, reject) => {
    const oldHistoryItem = txHistory[txid];
    if (!oldHistoryItem) {
      reject();
    }
    resolve(
      addHistoryItem(
        { ...oldHistoryItem, ...shrinkToValue(piece, [oldHistoryItem]) },
        txHistory,
        updateAlltxHistory,
        alltxHistory,
        wallet
      )
    );
  });
}
