import { div } from "./div";

export const mod = (dividendo: number, divisor: number): number => {
  if (divisor === 0) {
    throw new Error("Divisor cannot be zero");
  }
  
  const res=dividendo - (divisor * div(dividendo, divisor));
  return res<0?res+divisor:res;
};
