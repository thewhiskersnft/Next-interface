interface createV1TokenSchema {
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
  // console.log("Errors : ", errors);
  return errors;
};
