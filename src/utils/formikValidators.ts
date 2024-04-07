import { PublicKey } from "@solana/web3.js";

interface createV1TokenSchema {
  name: string;
  symbol: string;
  description: string;
  supply: number;
  decimal: number;
  logo: string;
}
interface createV2TokenSchema {
  name: string;
  symbol: string;
  description: string;
  supply: number;
  decimal: number;
  logo: string;
}

export const v1TokenValidation = (values: createV1TokenSchema) => {
  let errors = {} as any;
  if (values.name.length < 3) {
    errors.name = "Name must be 3 characters long";
  }
  if (values.supply > 100000000000000) {
    errors.supply = "Supply cannot be more than 100000000000000";
  }
  if (values.supply < 0) {
    errors.supply = "Supply cannot be less than 0";
  }
  if (values.description.length > 500) {
    errors.name = "Description cannot be more than 500 characters";
  }
  if (values.symbol.length > 8) {
    errors.symbol = "Symbol cannot be more than 8 characters";
  }
  if (values.decimal > 10) {
    errors.decimal = "decimal cannot be more than 10";
  }
  return errors;
};

export const v2TokenValidation = async (values: any) => {
  let errors = {} as any;
  console.log(values);
  if (values.name.length < 3) {
    errors.name = "Name must be 3 characters long";
  }
  if (values.supply > 100000000000000) {
    errors.supply = "Supply cannot be more than 100000000000000";
  }
  if (values.supply < 0) {
    errors.supply = "Supply cannot be less than 0";
  }
  if (values.description.length > 500) {
    errors.name = "Description cannot be more than 500 characters";
  }
  if (values.symbol.length > 8) {
    errors.symbol = "Symbol cannot be more than 8 characters";
  }
  if (values.decimal > 10) {
    errors.decimal = "decimal cannot be more than 10";
  }
  if (values.enableExtensions) {
    if (values.transferTax) {
      if (!values.fee) {
        errors.fee = "Please enter fee";
      }
      if (!values.maxFee) {
        errors.maxFee = "Please enter max fee";
      }
      if (values.fee < 0) {
        errors.fee = "Fee should be greater than 0";
      }
      if (values.maxFee < values.fee) {
        errors.maxFee = "Max Fee should be greater than fee";
      }
      if (values.withdrawAuthority) {
        const valAddr = new PublicKey(values.withdrawAuthority);
        const isValidAddress = await PublicKey.isOnCurve(valAddr);
        if (!isValidAddress) {
          errors.withdrawAuthority = "Please enter valid address";
        }
      } else {
        errors.withdrawAuthority = "Please enter valid address";
      }
      if (values.configAuthority) {
        const valAddr = new PublicKey(values.configAuthority);
        const isValidAddress = await PublicKey.isOnCurve(valAddr);
        if (!isValidAddress) {
          errors.configAuthority = "Please enter valid address";
        }
      } else {
        errors.configAuthority = "Please enter valid address";
      }
    }
    if (values.interestBearing) {
      if (!values.rate || values.rate < 0 || values.rate > 100) {
        errors.rate = "Please enter rate between 0 and 100";
      }
    }
    if (values.defaultAccountState) {
      if (!values.defaultAccountStateOption) {
        errors.defaultAccountStateOption = "Please select an option";
      }
    }
    if (values.permanentDelegate) {
      if (!values.delegate) {
        errors.delegate = "Please enter delegate";
      }
    }
  }
  return errors;
};
