import {
  TOKEN_PROGRAM_ID,
  createInitializeAccountInstruction,
} from "@solana/spl-token";
import {
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  TransactionInstruction,
} from "@solana/web3.js";
// @ts-ignore
import BN from "bn.js";

import {
  Base,
  CacheLTA,
  InstructionType,
  MARKET_STATE_LAYOUT_V2,
  TxVersion,
  ZERO,
  generatePubKey,
  splitTxAndSigners,
  struct,
  u16,
  u32,
  u64,
  u8,
} from "@raydium-io/raydium-sdk";

export class MarketV2Updated extends Base {
  static async makeCreateMarketInstructionSimple<T extends TxVersion>({
    connection,
    wallet,
    baseInfo,
    quoteInfo,
    lotSize, // 1
    tickSize, // 0.01
    dexProgramId,
    makeTxVersion,
    lookupTableCache,
    marketBytesData,
  }: {
    makeTxVersion: T;
    lookupTableCache?: CacheLTA;
    connection: Connection;
    wallet: PublicKey;
    baseInfo: {
      mint: PublicKey;
      decimals: number;
    };
    quoteInfo: {
      mint: PublicKey;
      decimals: number;
    };
    lotSize: number;
    tickSize: number;
    dexProgramId: PublicKey;
    marketBytesData: {
      eventQueueBytes: number;
      requestQueueBytes: number;
      OrderbookBytes: number;
    };
  }) {
    const market = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const requestQueue = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const eventQueue = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const bids = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const asks = generatePubKey({
      fromPublicKey: wallet,
      programId: dexProgramId,
    });
    const baseVault = generatePubKey({
      fromPublicKey: wallet,
      programId: TOKEN_PROGRAM_ID,
    });
    const quoteVault = generatePubKey({
      fromPublicKey: wallet,
      programId: TOKEN_PROGRAM_ID,
    });
    const feeRateBps = 0;
    const quoteDustThreshold = new BN(100);

    function getVaultOwnerAndNonce() {
      const vaultSignerNonce = new BN(0);
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const vaultOwner = PublicKey.createProgramAddressSync(
            [
              market.publicKey.toBuffer(),
              vaultSignerNonce.toArrayLike(Buffer, "le", 8),
            ],
            dexProgramId
          );
          return { vaultOwner, vaultSignerNonce };
        } catch (e) {
          vaultSignerNonce.iaddn(1);
          if (vaultSignerNonce.gt(new BN(25555)))
            throw Error("find vault owner error");
        }
      }
    }
    const { vaultOwner, vaultSignerNonce } = getVaultOwnerAndNonce();

    const baseLotSize = new BN(Math.round(10 ** baseInfo.decimals * lotSize));
    const quoteLotSize = new BN(
      Math.round(lotSize * 10 ** quoteInfo.decimals * tickSize)
    );

    if (baseLotSize.eq(ZERO)) throw Error("lot size is too small");
    if (quoteLotSize.eq(ZERO))
      throw Error("tick size or lot size is too small");

    const ins = await this.makeCreateMarketInstruction({
      connection,
      wallet,
      marketInfo: {
        programId: dexProgramId,
        id: market,
        baseMint: baseInfo.mint,
        quoteMint: quoteInfo.mint,
        baseVault,
        quoteVault,
        vaultOwner,
        requestQueue,
        eventQueue,
        bids,
        asks,

        feeRateBps,
        quoteDustThreshold,
        vaultSignerNonce,
        baseLotSize,
        quoteLotSize,
      },
      marketBytesData,
    });

    return {
      address: ins.address,
      innerTransactions: await splitTxAndSigners({
        connection,
        makeTxVersion,
        computeBudgetConfig: undefined,
        payer: wallet,
        innerTransaction: ins.innerTransactions,
        lookupTableCache,
      }),
    };
  }

  static async makeCreateMarketInstruction({
    connection,
    wallet,
    marketInfo,
    marketBytesData,
  }: {
    connection: Connection;
    wallet: PublicKey;
    marketInfo: {
      programId: PublicKey;
      id: { publicKey: PublicKey; seed: string };
      baseMint: PublicKey;
      quoteMint: PublicKey;
      baseVault: { publicKey: PublicKey; seed: string };
      quoteVault: { publicKey: PublicKey; seed: string };
      vaultOwner: PublicKey;

      requestQueue: { publicKey: PublicKey; seed: string };
      eventQueue: { publicKey: PublicKey; seed: string };
      bids: { publicKey: PublicKey; seed: string };
      asks: { publicKey: PublicKey; seed: string };

      feeRateBps: number;
      vaultSignerNonce: BN;
      quoteDustThreshold: BN;

      baseLotSize: BN;
      quoteLotSize: BN;
    };
    marketBytesData: {
      eventQueueBytes: number;
      requestQueueBytes: number;
      OrderbookBytes: number;
    };
  }) {
    const ins1: TransactionInstruction[] = [];
    const accountLamports = await connection.getMinimumBalanceForRentExemption(
      165
    );
    ins1.push(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.baseVault.seed,
        newAccountPubkey: marketInfo.baseVault.publicKey,
        lamports: accountLamports,
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.quoteVault.seed,
        newAccountPubkey: marketInfo.quoteVault.publicKey,
        lamports: accountLamports,
        space: 165,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeAccountInstruction(
        marketInfo.baseVault.publicKey,
        marketInfo.baseMint,
        marketInfo.vaultOwner
      ),
      createInitializeAccountInstruction(
        marketInfo.quoteVault.publicKey,
        marketInfo.quoteMint,
        marketInfo.vaultOwner
      )
    );

    const ins2: TransactionInstruction[] = [];
    ins2.push(
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.id.seed,
        newAccountPubkey: marketInfo.id.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          MARKET_STATE_LAYOUT_V2.span
        ),
        space: MARKET_STATE_LAYOUT_V2.span,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.requestQueue.seed,
        newAccountPubkey: marketInfo.requestQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketBytesData.requestQueueBytes
        ),
        space: marketBytesData.requestQueueBytes,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.eventQueue.seed,
        newAccountPubkey: marketInfo.eventQueue.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketBytesData.eventQueueBytes
        ),
        space: marketBytesData.eventQueueBytes,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.bids.seed,
        newAccountPubkey: marketInfo.bids.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketBytesData.OrderbookBytes
        ),
        space: marketBytesData.OrderbookBytes,
        programId: marketInfo.programId,
      }),
      SystemProgram.createAccountWithSeed({
        fromPubkey: wallet,
        basePubkey: wallet,
        seed: marketInfo.asks.seed,
        newAccountPubkey: marketInfo.asks.publicKey,
        lamports: await connection.getMinimumBalanceForRentExemption(
          marketBytesData.OrderbookBytes
        ),
        space: marketBytesData.OrderbookBytes,
        programId: marketInfo.programId,
      }),
      this.initializeMarketInstruction({
        programId: marketInfo.programId,
        marketInfo: {
          id: marketInfo.id.publicKey,
          requestQueue: marketInfo.requestQueue.publicKey,
          eventQueue: marketInfo.eventQueue.publicKey,
          bids: marketInfo.bids.publicKey,
          asks: marketInfo.asks.publicKey,
          baseVault: marketInfo.baseVault.publicKey,
          quoteVault: marketInfo.quoteVault.publicKey,
          baseMint: marketInfo.baseMint,
          quoteMint: marketInfo.quoteMint,

          baseLotSize: marketInfo.baseLotSize,
          quoteLotSize: marketInfo.quoteLotSize,
          feeRateBps: marketInfo.feeRateBps,
          vaultSignerNonce: marketInfo.vaultSignerNonce,
          quoteDustThreshold: marketInfo.quoteDustThreshold,
        },
      })
    );
    return {
      address: {
        marketId: marketInfo.id.publicKey,
        requestQueue: marketInfo.requestQueue.publicKey,
        eventQueue: marketInfo.eventQueue.publicKey,
        bids: marketInfo.bids.publicKey,
        asks: marketInfo.asks.publicKey,
        baseVault: marketInfo.baseVault.publicKey,
        quoteVault: marketInfo.quoteVault.publicKey,
        baseMint: marketInfo.baseMint,
        quoteMint: marketInfo.quoteMint,
      },
      innerTransactions: [
        {
          instructions: ins1,
          signers: [],
          instructionTypes: [
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.initAccount,
            InstructionType.initAccount,
          ],
        },
        {
          instructions: ins2,
          signers: [],
          instructionTypes: [
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.createAccount,
            InstructionType.initMarket,
          ],
        },
      ],
    };
  }

  static initializeMarketInstruction({
    programId,
    marketInfo,
  }: {
    programId: PublicKey;
    marketInfo: {
      id: PublicKey;
      requestQueue: PublicKey;
      eventQueue: PublicKey;
      bids: PublicKey;
      asks: PublicKey;
      baseVault: PublicKey;
      quoteVault: PublicKey;
      baseMint: PublicKey;
      quoteMint: PublicKey;
      authority?: PublicKey;
      pruneAuthority?: PublicKey;

      baseLotSize: BN;
      quoteLotSize: BN;
      feeRateBps: number;
      vaultSignerNonce: BN;
      quoteDustThreshold: BN;
    };
  }) {
    const dataLayout = struct([
      u8("version"),
      u32("instruction"),
      u64("baseLotSize"),
      u64("quoteLotSize"),
      u16("feeRateBps"),
      u64("vaultSignerNonce"),
      u64("quoteDustThreshold"),
    ]);

    const keys = [
      { pubkey: marketInfo.id, isSigner: false, isWritable: true },
      { pubkey: marketInfo.requestQueue, isSigner: false, isWritable: true },
      { pubkey: marketInfo.eventQueue, isSigner: false, isWritable: true },
      { pubkey: marketInfo.bids, isSigner: false, isWritable: true },
      { pubkey: marketInfo.asks, isSigner: false, isWritable: true },
      { pubkey: marketInfo.baseVault, isSigner: false, isWritable: true },
      { pubkey: marketInfo.quoteVault, isSigner: false, isWritable: true },
      { pubkey: marketInfo.baseMint, isSigner: false, isWritable: false },
      { pubkey: marketInfo.quoteMint, isSigner: false, isWritable: false },
      // Use a dummy address if using the new dex upgrade to save tx space.
      {
        pubkey: marketInfo.authority
          ? marketInfo.quoteMint
          : SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
    ]
      .concat(
        marketInfo.authority
          ? { pubkey: marketInfo.authority, isSigner: false, isWritable: false }
          : []
      )
      .concat(
        marketInfo.authority && marketInfo.pruneAuthority
          ? {
              pubkey: marketInfo.pruneAuthority,
              isSigner: false,
              isWritable: false,
            }
          : []
      );

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        version: 0,
        instruction: 0,
        baseLotSize: marketInfo.baseLotSize,
        quoteLotSize: marketInfo.quoteLotSize,
        feeRateBps: marketInfo.feeRateBps,
        vaultSignerNonce: marketInfo.vaultSignerNonce,
        quoteDustThreshold: marketInfo.quoteDustThreshold,
      },
      data
    );

    return new TransactionInstruction({
      keys,
      programId,
      data,
    });
  }
}
